FROM node:24-bullseye as build


RUN apt-get update && apt-get install -y \
    make \
    build-essential \
 && rm -rf /var/lib/apt/lists/*


ARG BRANCH="main"
ARG TOKEN

RUN git clone https://github.com/hypericum-ai/doodl /srv/www/doodl


RUN cd /srv/www/doodl && git checkout $BRANCH

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

COPY --from=build /srv/www/doodl/web/docs/images /usr/share/nginx/html/images

RUN git clone https://${TOKEN}@github.com/hypericum-ai/doodl-charts /srv/www/doodl-charts

RUN cd /srv/www/doodl-charts && git checkout $BRANCH

WORKDIR /srv/www/doodl-charts/lib

RUN make force

COPY --from=build /srv/www/doodl-charts/dist /usr/share/nginx/html/assets/doodl/js

EXPOSE 80