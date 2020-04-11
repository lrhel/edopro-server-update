# Installation

In all case

```sh
git clone https://github.com/lrhel/edopro-server-update.git
cd edopro-server-update/
```

## System

```sh
npm i
node main.js
```

## Docker

```sh
docker build -t server-update .
docker container run --name server-update -d --rm -p 3000:3000 server-update:latest
```

# Environment variable

```
HOST //Host IP of the application - Default: 0.0.0.0
PORT //Port of the application - Default 3000
CACHE_DIR //Directory of the cache - Default cache/
```

# Cache directory

```
CACHE_DIR/
├── Linux
├── Mac
└── Windows
```