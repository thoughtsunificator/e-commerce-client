# https://docs.docker.com/develop/develop-images/multistage-build/#stop-at-a-specific-build-stage
# https://docs.docker.com/compose/compose-file/#target


# https://docs.docker.com/engine/reference/builder/#understand-how-arg-and-from-interact
ARG NODE_VERSION=13
ARG NGINX_VERSION=1.17


# "development" stage
FROM node:${NODE_VERSION}-alpine AS api_platform_client_development

WORKDIR /usr/src/client

RUN npm i -g @api-platform/client-generator

# prevent the reinstallation of node modules at every changes in the source code
COPY package.json package-lock.json ./
RUN set -eux; \
	npm install

COPY . ./

VOLUME /usr/src/client/node_modules

ENV HTTPS true

CMD ["npm", "start"]


# "build" stage
# depends on the "development" stage above
FROM api_platform_client_development AS api_platform_client_build

ARG REACT_APP_API_ENTRYPOINT

RUN set -eux; \
	npm run build


# "nginx" stage
# depends on the "build" stage above
FROM nginx:${NGINX_VERSION}-alpine AS api_platform_client_nginx

COPY docker/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf

WORKDIR /usr/src/client/build

COPY --from=api_platform_client_build /usr/src/client/build ./
