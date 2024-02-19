# Create runtime stage that will be used for running the application
FROM python:3.11.6-slim as runtime

ENV VIRTUAL_ENV=/opt/venv
ENV PATH="$VIRTUAL_ENV/bin:$PATH"
ENV PYTHONPATH=/app/
ENV RUNTIME_PACKAGES="pkg-config curl make"

# Install runtime packages
RUN apt-get update \
    && apt-get install -y --no-install-recommends $RUNTIME_PACKAGES \
    && apt-get clean \
    && apt-get purge -y --auto-remove -o APT::AutoRemove::RecommendsImportant=false \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Create builder stage that is used to prepare the virtual enveriopment
FROM runtime as builder

ENV BUILD_PACKAGES="ssh git curl cmake pkg-config libxml2-dev libxmlsec1-dev libxmlsec1-openssl \
                    build-essential libssl-dev uuid-dev libcurl4-openssl-dev python3-cffi" \
    POETRY_HOME=/opt/poetry \
    POETRY_NO_INTERACTION=1 \
    POETRY_VERSION=1.7.0 \
    PATH=/opt/poetry/bin:${PATH:+:${PATH}}

# Install poetry and create a venv
RUN apt-get update \
    && apt-get install -y --no-install-recommends $BUILD_PACKAGES \
    && apt-get clean \
    && curl -sSL https://install.python-poetry.org | python3 - --yes \
    && python3 -m venv $VIRTUAL_ENV

COPY poetry.lock pyproject.toml ./
RUN --mount=type=ssh ssh-keyscan github.com > /etc/ssh/ssh_known_hosts
RUN --mount=type=ssh poetry install --only main --no-root --sync


# Create builder for develop stage
FROM builder AS builder-dev

RUN --mount=type=ssh poetry install --no-root --sync


# Create develop stage
FROM runtime AS develop

# Install docker to allow to communicate with docker daemon inside CircleCI
RUN apt-get update && apt-get install -y docker.io

COPY --from=builder-dev $VIRTUAL_ENV $VIRTUAL_ENV
COPY app /app/app
COPY pyproject.toml /app/
COPY alembic.ini /app/
COPY db/ /app/db/
COPY Makefile /app/
ENV PORT=8000

EXPOSE ${PORT}

# Create production-ready stage
FROM runtime AS production

COPY --from=builder $VIRTUAL_ENV $VIRTUAL_ENV
COPY app /app/app
COPY pyproject.toml /app/
COPY alembic.ini /app/
COPY db/ /app/db/
COPY Makefile /app/
ENV PORT=8000

EXPOSE ${PORT}
CMD python -m gunicorn -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000 --log-level info app.main:app
