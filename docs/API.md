# API Document for RabiJump

## Admin

All operations need admin token in header like `Authorization: Bearer <token>`. And redirect name is not case sensitive.

### Create or update redirect

Endpoint: `POST /api/redirect/:name`

URL parameters:

- `name`: Name of the redirect.

Boby:

```json
{
    "name": "Blog",
    "desc": "null or desc",
    "target": "https://www.lirui.tech",
    "mobile_target": null,
    "status_code": null,
    "active": true,
    "allow_parameters": true
}
```

Response:

```json
{
    "active": true,
    "allow_parameters": true,
    "desc": "null or desc",
    "last_modified": "2022-08-23T07:06:38.421909928Z",
    "mobile_target": null,
    "name": "Blog",
    "status_code": null,
    "target": "https://www.lirui.tech"
}
```

### Get redirect

Endpoint: `GET /api/redirect/:name`

URL parameters:

- `name`: Name of the redirect.

Response:

```json
{
    "active": true,
    "allow_parameters": true,
    "desc": "null or desc",
    "last_modified": "2022-08-23T07:06:38.421909928Z",
    "mobile_target": null,
    "name": "Blog",
    "status_code": null,
    "target": "https://www.lirui.tech"
}
```

### Get redirect visits

Endpoint: `GET /api/redirect/:name/count`

URL parameters:

- `name`: Name of the redirect.

Response:

```json
{
    "count": 0
}
```

### Delete redirect

Endpoint: `DELETE /api/redirect/:name`

URL parameters:

- `name`: Name of the redirect.

Response:

```json
{
    "status": "ok"
}
```

### List redirects

Endpoint: `GET /api/redirect;list`

Query parameters:

- `count`: Number of redirects to return. Default is 10.
- `skip`: Number of redirects to skip. Default is 0.

Response (some records omitted):

```json
{
    "data": [
        {
            "active": true,
            "allow_parameters": true,
            "desc": null,
            "last_modified": "2022-08-23T03:04:51.603903508Z",
            "mobile_target": null,
            "name": "--Jw9Io63D",
            "status_code": null,
            "target": "https://www.lirui.tech"
        }
    ],
    "total": 10001
}
```

### Search redirects by prefix

Endpoint: `GET /api/redirect;search`

Query parameters:

- `prefix`: Prefix of the redirect name.
- `count`: Number of redirects to return. Default is 10.
- `skip`: Number of redirects to skip. Default is 0.

Response (some records omitted):

```json
{
    "data": [
        {
            "active": true,
            "allow_parameters": true,
            "desc": null,
            "last_modified": "2022-08-23T03:04:51.603903508Z",
            "mobile_target": null,
            "name": "--Jw9Io63D",
            "status_code": null,
            "target": "https://www.lirui.tech"
        }
    ],
    "total": 10001
}
```