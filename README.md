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

## Endpoints

### Sign Up

-   **URL:** `/api/v1/auth/signup`
-   **Method:** `POST`
-   **Description:** Endpoint for a user to sign up.
-   **Request Body Parameters:**
    -   `username`: User's username. _(Type: String)_
    -   `email`: User's email. _(Type: String)_
    -   `password`: User's password. _(Type: String)_
    -   `firstname`: User's first name. _(Type: String)_
    -   `lastname`: User's last name. _(Type: String)_

### Sign In

-   **URL:** `/api/v1/auth/signin`
-   **Method:** `POST`
-   **Description:** Endpoint for a user to sign in.
-   **Request Body Parameters:**
    -   `email`: User's email. _(Type: String)_
    -   `password`: User's password. _(Type: String)_


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