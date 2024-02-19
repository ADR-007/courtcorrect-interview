run-all:
	docker compose --profile dev up --build

destroy-all:
	docker compose down --volumes --remove-orphans
