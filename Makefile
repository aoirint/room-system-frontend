ROOT_DIR = $(dir $(realpath $(firstword $(MAKEFILE_LIST))))

docker-build:
	docker build . \
		--build-arg HTTP_PROXY \
		--build-arg HTTPS_PROXY \
		-t aoirint/room-system-frontend

build: docker-build
	docker run --rm \
		-u node \
		-e HTTP_PROXY \
		-e HTTPS_PROXY \
		--env-file "$(ROOT_DIR)/.env" \
		-v "$(ROOT_DIR)/src:/code/src" \
		-v "$(ROOT_DIR)/public:/code/public" \
		-v "$(ROOT_DIR)/build:/code/build" \
		aoirint/room-system-frontend \
		npm run build

start: docker-build
	docker run --rm \
			-u node \
			-p 3000:3000 \
			-e HTTP_PROXY \
			-e HTTPS_PROXY \
			--env-file "$(ROOT_DIR)/.env" \
			-v "$(ROOT_DIR)/src:/code/src" \
			-v "$(ROOT_DIR)/public:/code/public" \
			-v "$(ROOT_DIR)/build:/code/build" \
			aoirint/room-system-frontend \
			npm start
