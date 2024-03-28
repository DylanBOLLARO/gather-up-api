## Overview

#### setup local dev

```bash
npm version : 10.5.0
node version : 20.12.0
docker version : 26.0.0
docker compose version : 2.23.0
```

install all packages

```bash
npm i
```

init database

```bash
docker compose up -d
```

sync schema database

```bash
npx prisma db push
```

start nest server

```bash
npm run dev
```

## Endpoints

### Sign Up

-   **URL:** `http://localhost:3001/auth/signup`
-   **Method:** `POST`
-   **Description:** Endpoint for a user to sign up.
-   **Request Body Parameters:**
    -   `username`: User's username. _(Type: String)_
    -   `email`: User's email. _(Type: String)_
    -   `password`: User's password. _(Type: String)_
    -   `firstName`: User's first name. _(Type: String)_
    -   `lastName`: User's last name. _(Type: String)_

### Sign In

-   **URL:** `http://localhost:3001/auth/signin`
-   **Method:** `POST`
-   **Description:** Endpoint for a user to sign in.
-   **Request Body Parameters:**
    -   `email`: User's email. _(Type: String)_
    -   `password`: User's password. _(Type: String)_
