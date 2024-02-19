ARG SEM_VERSION
ARG GIT_SHA

FROM node:20.4.0-slim as base

RUN mkdir /app
WORKDIR /app

RUN apt update && apt install -y curl \
    && apt-get clean \
    && apt-get purge -y --auto-remove -o APT::AutoRemove::RecommendsImportant=false \
    && rm -rf /var/lib/apt/lists/*

COPY package.json /app
COPY yarn.lock /app

RUN yarn install --frozen-lockfile

COPY .eslintignore .
COPY .eslintrc .
COPY .prettierrc .
COPY tsconfig.json .
COPY public/ ./public/
COPY src/ ./src/

FROM base as development
ENTRYPOINT ["yarn", "start"]

FROM base as static-build
ARG SEM_VERSION
ARG GIT_SHA
ARG REACT_APP_API_URL
ENV REACT_APP_SEM_VERSION=${SEM_VERSION}
ENV REACT_APP_GIT_SHA=${GIT_SHA}
ENV REACT_APP_API_URL=${REACT_APP_API_URL}
RUN yarn build

FROM bash:5.2.15 as static
RUN mkdir /app
WORKDIR /app
COPY --from=static-build /app/build /app/build