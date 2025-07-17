FROM node:24-bullseye as build

ARG BRANCH="development"

RUN git clone https://github.com/hypericum-ai/doodl /srv/www/doodl

RUN cd /srv/www/doodl && git checkout $BRANCH

# COPY ../../.. /srv/www/doodl

WORKDIR /srv/www/doodl/doodl/docs

RUN rm -rf node_modules
RUN rm -rf package-lock.json


# Install all the dependencies
RUN npm install 

RUN npm run docs:build || true

FROM nginx:stable-perl

# Copy the build output to replace the default nginx contents.
COPY --from=build /srv/www/doodl/doodl/docs/.vitepress/dist /usr/share/nginx/html

# create directories for doodl assets i.e. css, js, etc.
RUN mkdir -p /usr/share/nginx/html/assets/doodl
RUN mkdir -p /usr/share/nginx/html/assets/doodl/css
RUN mkdir -p /usr/share/nginx/html/assets/doodl/js
RUN mkdir -p /usr/share/nginx/html/images

COPY --from=build /srv/www/doodl/doodl/css /usr/share/nginx/html/assets/doodl/css
COPY --from=build /srv/www/doodl/doodl/ts/dist /usr/share/nginx/html/assets/doodl/js

COPY --from=build /srv/www/doodl/doodl/docs/images/*.{png,svg} /usr/share/nginx/html/images


EXPOSE 80