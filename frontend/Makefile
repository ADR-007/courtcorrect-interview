compose := DOCKER_BUILDKIT=1 docker compose -f ../docker-compose.yaml
compose_prod := DOCKER_BUILDKIT=1 docker compose -f ../docker-compose.prod.yaml


gen-api:
	@echo "Regenerating API based on the latest changes in the backend"
	@(cd ../backend && make gen-openapi)
	yarn run openapi-rq -i ../backend/openapi.yaml --exportSchemas=true -o src/api

lint:
	yarn lint

lint-fix:
	yarn lint --fix

docker-build-dev:
	${compose} build --progress plain ui-dev

docker-build-prod:
	${compose_prod} build --progress plain ui-static

docker-build-ci:
	if [ -z "$(PARAM_SEM_VER)" ]; then \
		echo "PARAM_SEM_VER must be set when calling make"; \
		exit 1; \
	else \
		if [ -z "$(PARAM_GIT_SHA)" ]; then \
			echo "PARAM_GIT_SHA must be set when calling make"; \
			exit 1; \
		else \
			${compose_prod} build --build-arg SEM_VERSION=$(PARAM_SEM_VER) --build-arg GIT_SHA=$(PARAM_GIT_SHA) --progress plain ui-static; \
		fi \
	fi

docker-lint:
	${compose} up --build ui-lint --exit-code-from ui-lint

docker-run:
	${compose} up --wait --build ui-dev