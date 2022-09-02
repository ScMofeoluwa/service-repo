FROM node:16-alpine3.15 as dev




RUN mkdir service-repo
# Docker working directory
WORKDIR /service-repo


COPY . /service-repo/
# Copying file into APP directory of docker
COPY ./package.json ./yarn.lock /service-repo/

# Then install the NPM module
RUN yarn install

# Copy current directory to APP folder



ENV NODE_ENV=development



COPY . .


CMD ["yarn", "run", "dev"]