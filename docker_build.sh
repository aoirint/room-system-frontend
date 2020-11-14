#!/bin/bash

docker build . \
  --build-arg HTTP_PROXY \
  --build-arg HTTPS_PROXY \
  -t aoirint/room-system-frontend
