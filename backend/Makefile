# Makefile for backend

SHELL := /bin/bash

compose := DOCKER_BUILDKIT=1 BUILDKIT_INLINE_CACHE=1 docker compose -f ../docker-compose.yaml

# Check that the virtual env is active and error if not.
check-venv:
ifndef VIRTUAL_ENV
	$(error Not in a virtual environment. Activate your venv using "poetry shell" and try again)
endif

setup-dot-env:
	[ ! -f .env ] && cp .env.example .env || true

setup-venv: setup-dot-env
	python3.11 -m venv .venv

init-crud-app: setup-dot-env
	python -m app.crudapp.generate ${ENTITY_NAME} ${ENTITY_NAME_PLURAL}

run-api: check-venv
	python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

run-local: check-venv
	APP_ENV=local python -m uvicorn app.main:app --reload --port 8000

test: check-venv
	APP_ENV=test pytest app

test-cov: check-venv
	mkdir -p ./reports
	APP_ENV=test coverage run -m pytest --junitxml=./reports/test-results.xml app
	coverage report --skip-empty
	coverage html -d ./reports/htmlcov --omit="*/test_*,*/tests.py"
	coverage xml -o ./reports/coverage.xml --omit="*/test_*,*/tests.py"

lint-fast: check-venv
	ruff check app # Ruff is cool but not all the functions are implemented yet

lint: check-venv lint-fast
	# Stop on first error; Fix the path in the output
	flake8 app
	mypy app
	pautoflake app -rc --quiet
	@if command -v poetry >/dev/null 2>&1; then \
		poetry check --lock; \
	else \
		echo "poetry is not installed."; \
	fi

lint-fix: check-venv
	ruff check app --fix
	pautoflake app -r --in-place --quiet

format: check-venv
	ruff format app

install-dependencies: check-venv
	poetry install --no-root

db-gen-revision-local: check-venv
	@if [ -z "${MESSAGE}" ]; then echo 'MESSAGE is not set' && exit 1; fi
	APP_ENV=local alembic revision --autogenerate -m "${MESSAGE}"


db-migrate: check-venv
	alembic upgrade head

db-migrate-local: check-venv
	APP_ENV=local alembic upgrade head

gen-openapi: check-venv
	APP_ENV=local python -m scripts.gen_openapi > openapi.yaml

populate-db: check-venv
	python -m scripts.populate_db

# Docker Composer commands:

docker-build-dev: setup-dot-env
	${compose} build --progress plain api-dev

docker-run: setup-dot-env
	${compose} up --wait --build api-dev

docker-lint: setup-dot-env
	${compose} up --build api-lint --exit-code-from api-lint

docker-test: setup-dot-env
	${compose} up --build api-test --exit-code-from api-test

docker-test-cov: setup-dot-env
	${compose} up --build api-test-cov --exit-code-from api-test-cov

docker-down:
	${compose} down --remove-orphans

docker-up-db: setup-dot-env
	${compose} up --wait -d --build db db-migration

docker-down-db:
	${compose} stop db db-migration && \
	${compose} rm -f db db-migration


docker-recreate-db: docker-down-db docker-up-db

docker-up-dev-db: setup-dot-env
	${compose} up --wait -d --build db-dev
	${compose} run --build db-dev-migration

docker-down-dev-db:
	${compose} stop db-dev db-dev-migration && \
	${compose} rm -f db-dev db-dev-migration


docker-recreate-dev-db: docker-down-dev-db docker-up-dev-db


docker-up-test-db:
	${compose} up --wait -d --build db-test
	${compose} run --build db-test-migration


docker-down-test-db:
	${compose} stop db-test db-test-migration && \
	${compose} rm -f db-test db-test-migration


docker-recreate-test-db: docker-down-test-db docker-up-test-db

docker-up-all-sidecars: setup-dot-env
	${compose} up --wait -d --build \
		db-dev db-dev-migration \
		db-test db-test-migration
	${compose} up --build db-dev-populate

docker-recreate-all-sidecars: docker-down docker-up-all-sidecars


install-githooks:
	@cd .git/hooks; \
	ln -sf ../../githooks/pre-push .; \
	ln -sf ../../githooks/pre-commit .;
