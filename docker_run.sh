#!/bin/bash

docker run --rm -it \
  -u node \
  -p 3000:3000 \
  -e HTTP_PROXY \
  -e HTTPS_PROXY \
  --env-file "$PWD/.env" \
  -v "$PWD:/code" \
  aoirint/room-system-frontend \
  "$@"
