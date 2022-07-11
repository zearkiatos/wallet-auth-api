docker-dev-db-mysql:
	docker compose -f docker-compose.develop.yml up --build
	make docker-dev-mysql

docker-build:
	docker compose up --build

docker-down:
	docker compose down

docker-dev-mysql:
	docker exec -it wallet-auth-db sh /docker/mysql-entrypoint.sh