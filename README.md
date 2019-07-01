# NODEJS-BOILERPLATE 2.0 #

[![Travis CI badge](https://travis-ci.org/studiohyperdrive/nodejs-boilerplate.png?branch=master)](https://travis-ci.org/studiohyperdrive/nodejs-boilerplate)
[![Codecov badge](https://img.shields.io/codecov/c/gh/studiohyperdrive/nodejs-boilerplate.svg)](https://codecov.io/gh/studiohyperdrive/nodejs-boilerplate)
[![Greenkeeper badge](https://badges.greenkeeper.io/studiohyperdrive/nodejs-boilerplate.svg)](https://greenkeeper.io)
[![License badge](https://img.shields.io/badge/license-ISC-yellow.svg)](https://opensource.org/licenses/ISC)

Studio Hyperdrive Node.js 2.0 boilerplate

## Setup ##

### System requirements ###

* [Docker](https://docs.docker.com/engine/installation/)
* [Node.js](https://nodejs.org/en/) (LTS)

Node.js is optional and only required if you want to run the linters in your IDE. Running them inside Docker works without Node.js.

### Installation ###

Update the values (if needed) of the local config file inside `./server/.env/local.env`.

Start the Docker container:

```bash
$ docker-compose up
```

_Optional_: Install the Node.js packages locally:

```bash
$ npm install
```

## Getting started ##

Once your Docker container is running, your application is accessible on [localhost:3000](http://localhost:3000) (assuming you did not change the port in the local config file).

### Running linter ###

Running TSlint inside Docker:

```bash
$ docker-compose exec server npm run lint
```

### Running tests ###

Running tests inside Docker:

```bash
$ docker-compose exec server npm test
```

## Bugs ##

In case of bugs, issues, questions, ... check the [issues](https://github.com/studiohyperdrive/nodejs-boilerplate/issues) on Github.

## Contributions ##

Contributions through pull requests are more than welcome. Make sure you respect the current tools, guidelines and flow to get your improved version accepted.

## License ##

See [LICENSE](LICENSE).
