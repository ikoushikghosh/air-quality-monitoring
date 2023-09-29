# AirQualityMonitoring

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

✨ **This workspace has been generated by [Nx monorepo](https://nx.dev). This is a full-statck application is developed using NestJs as back-end framework and Next.js 13 front-end framework.**✨

## Requirements
- Node 18
- Yarn
- Docker Desktop
- Kubernetes (Using Docker Desktop)
- Mongo DB cloud or local mongodb (using docker)

## Local DB Setup
For local mongodb: Open up a Terminal session and run:

`docker run --name mongo -p 27017:27017 -d mongo`. MongoDB should be running.

create a collection named `air-quality-monitor` and use the DB Dump is included in the repository `/db-dump/air_info.json` and `/db-dump/user.json`. Please import this for related data.

## Cloud DB Setup
Please sign up and login into [Mongodb Atlas](https://www.mongodb.com/atlas/database) and create a collection named `air-quality-monitor` and use the DB Dump is included in the repository `/db-dump/air_info.json` and `/db-dump/user.json`. Please import this for related data.
## Start all the application in VSCode


To start the development server run `yarn nx run-many --target=serve` in the root directory of the application. Open your browser and navigate to http://localhost:4200/.

## Start all the application in Docker
To spin up all apps in one go in docker run `docker-compose up` in the root directory of the application. Open your browser and navigate to http://localhost:4200/.


## Running tasks

To execute all tests for monitioring-api:

```
yarn nx test monitoring-api --watch
```

To execute test for any specific test file of monitioring-api:

```
nx test monitoring-api --testFile=<fileName> --watch
```

Targets can be defined in the `package.json` or `projects.json`. Learn more [in the docs](https://nx.dev/core-features/run-tasks).

## Run application using Kubernetes.

Just run `kubectl apply -f client-deployment.yaml` and then `kubectl apply -f service-node.yaml` in the root directory of the application to run the application in local kubernetes.
