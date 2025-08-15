FROM node:24-bullseye as build


RUN apt-get update && apt-get install -y \
    make \
    build-essential \
 && rm -rf /var/lib/apt/lists/*


ARG BRANCH="main"

RUN git clone https://github.com/hypericum-ai/doodl /srv/www/doodl

RUN cd /srv/www/doodl && git checkout $BRANCH


WORKDIR /srv/www/doodl/web/ts

RUN npm install 


WORKDIR /srv/www/doodl/web/ts/modules


RUN make all

WORKDIR /srv/www/doodl/web/docs

RUN rm -rf node_modules
RUN rm -rf package-lock.json


# Install all the dependencies
RUN npm install 

RUN npm run docs:build || true

FROM nginx:stable-perl


# Copy the build output to replace the default nginx contents.
COPY --from=build /srv/www/doodl/web/docs/.vitepress/dist /usr/share/nginx/html

# create directories for doodl assets i.e. css, js, etc.
RUN mkdir -p /usr/share/nginx/html/assets/doodl
RUN mkdir -p /usr/share/nginx/html/assets/doodl/css
RUN mkdir -p /usr/share/nginx/html/assets/doodl/js
RUN mkdir -p /usr/share/nginx/html/images

COPY --from=build /srv/www/doodl/web/css /usr/share/nginx/html/assets/doodl/css
COPY --from=build /srv/www/doodl/web/ts/dist /usr/share/nginx/html/assets/doodl/js

COPY --from=build /srv/www/doodl/web/docs/images /usr/share/nginx/html/images


EXPOSE 80