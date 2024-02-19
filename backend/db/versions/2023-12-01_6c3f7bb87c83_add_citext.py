"""Add CIText

Revision ID: 6c3f7bb87c83
Revises: 
Create Date: 2023-12-01 18:10:10.613663

"""
from alembic import op

# revision identifiers, used by Alembic.
revision = '6c3f7bb87c83'
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.execute('CREATE EXTENSION IF NOT EXISTS citext')


def downgrade() -> None:
    op.execute('DROP EXTENSION IF EXISTS citext')
