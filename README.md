# Personal API

A simple Node.js Express API for Stage 1 deployment.

## What this project is

This repo contains a minimal API with three endpoints:

- `GET /` - returns `{ "message": "API is running" }`
- `GET /health` - returns `{ "message": "healthy" }`
- `GET /me` - returns user details

## Local setup

1. Install dependencies:

```bash
npm install
```

2. Run locally:

```bash
npm start
```

3. The server will listen on port `3000` by default. To override the port:

```bash
PORT=3000 npm start
```

## Endpoints

### GET /

Response:

```json
{
  "message": "API is running"
}
```

### GET /health

Response:

```json
{
  "message": "healthy"
}
```

### GET /me

Response:

```json
{
  "name": "Oluwatofunmi Akinola",
  "email": "akinolatofunmi.tech@gmail.com",
  "github": "https://github.com/carvanino"
}
```

All endpoints return `Content-Type: application/json` and HTTP status `200`.

## Deployment notes

The API should run on a non-public internal port and be exposed through Nginx reverse proxy.

### Nginx reverse proxy example

```nginx
server {
  listen 80;
  server_name your-domain.com;

  location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}
```

### Keep the app running

Use a process manager such as `pm2` or `systemd`.

#### PM2

```bash
npm install -g pm2
pm install
pm start
pm2 start server.js --name personal-api --watch --interpreter node
pm2 save
```

#### Systemd example

Create `/etc/systemd/system/personal-api.service` with:

```ini
[Unit]
Description=Personal API
After=network.target

[Service]
WorkingDirectory=/home/your-user/Projects
ExecStart=/usr/bin/node /home/your-user/Projects/server.js
Restart=always
User=your-user
Environment=PORT=3000

[Install]
WantedBy=multi-user.target
```

Then enable and start it:

```bash
sudo systemctl daemon-reload
sudo systemctl enable personal-api
sudo systemctl start personal-api
```

## Live deployment URL

> Replace this with your actual live URL once deployed: `https://your-domain.com`
