## OpenAPI

http://localhost:8080/api/v1/description

## Setup PROD

Installing all packages

```bash
npm i
```

Creation of docker containers (nestjs, pgadmin, postgresql) in accordance with
docker-compose

```bash
docker compose up -d
```

Synchronize PRISMA schema with postgresql

```bash
docker exec -ti nestjs sh
```

```bash
npx prisma db push --force-reset
```

```bash
exit
```

```bash
docker ps
```

All containers are UP (red) and the port to access the backend is localhost:8080
(green)

![docker](/docs/docker.png)

A simple request to create a user

![signup](/docs/signup.png)

## DEBUG -- Docker hard reset

Stop all containers

```bash
docker stop $(docker ps -aq)
```

Remove all containers

```bash
docker rm $(docker ps -aq)
```

Remove all volumes

```bash
docker volume rm $(docker volume ls -q)
```

Remove all images

```bash
docker image rm $(docker images -q)
```
