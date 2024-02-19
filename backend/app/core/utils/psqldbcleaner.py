from collections import defaultdict
from typing import Collection, Iterable

from sqlalchemy import bindparam, delete, table, text
from sqlalchemy.ext.asyncio import AsyncConnection, AsyncEngine

# todo: move to a separate library


async def cleanup_database(
    engine: AsyncEngine,
    only_tables: Iterable[str] | None = None,
    exclude_tables: Iterable[str] = ("alembic_version",),
    table_schemas: Collection[str] = ("public",),
) -> None:
    """Clean up all dirty tables.

    This function will delete all rows from all tables in the database.
    It is useful for cleaning up the database between tests.
    Cleans only tables that are not empty to improve performance.

    :param engine: The DB engine to use
    :param only_tables: A collection of tables names on which deletion
        should be attempted.
    :param exclude_tables: A collection of tables names on which deletion
        should not be attempted.
    :param table_schemas: A collection of table schemas on which deletion
        should be attempted.
    """
    only_tables = None if only_tables is None else set(only_tables)
    exclude_tables = set(exclude_tables)
    table_schemas = set(table_schemas)
    connection: AsyncConnection
    async with engine.begin() as connection:
        dirty_tables = await get_filled_tables(connection)
        # Disable Foreign Key checks so that we can delete tables in any order.
        await connection.execute(
            text('SET session_replication_role = replica;'),
        )

        for dirty_table, dirty_schemas in dirty_tables.items():
            if only_tables is not None and dirty_table not in only_tables:
                continue

            if dirty_table in exclude_tables:
                continue

            for dirty_schema in dirty_schemas:
                if dirty_schema not in table_schemas:
                    continue

                await connection.execute(
                    delete(
                        table(dirty_table, schema=dirty_schema),
                    ),
                )

        await connection.execute(
            text('SET session_replication_role = origin;'),
        )
        await connection.commit()


async def get_filled_tables(
    connection: AsyncConnection,
    table_schemas: Collection[str] = ("public",),
) -> dict[str, set[str]]:
    """Return not empty tables."""
    execution = await connection.execute(
        text(
            """
            SELECT table_name, table_schema
            FROM (SELECT table_schema,
                         table_name,
                         pg_relation_size(
                             table_schema || '.' || table_name
                         ) AS table_size
                  FROM information_schema.tables
                  WHERE table_schema IN :table_schemas) AS t
            WHERE table_size > 0;
            """,
        ).bindparams(
            bindparam("table_schemas", expanding=True),
        ),
        {"table_schemas": table_schemas},
    )

    rows = execution.fetchall()

    result = defaultdict(set)
    for table_name, table_schema in rows:
        result[table_name].add(table_schema)

    return result
