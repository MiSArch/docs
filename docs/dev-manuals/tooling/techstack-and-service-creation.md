---
sidebar_position: 3
---

import CustomImage from "@site/src/components/CustomImage";

# Techstack and service creation

### Techstack pverview

This is a general overview of some of the technologies used in MiSArch and which services / components they involve.

<CustomImage path="/images/techstack-overview" width="2803" height="2341" />

A user client sends a request to Nginx to retrieve the frontend. The frontend then communicates with the backend through Nginx. Nginx acts both as a web-server and reverse proxy. The frontend creates requests in GraphQL. The GraphQL gateway resolves the request by querying the respective services.

Dapr acts as a middleware abstracting communication between services. This enables metric and trace collection via Open Telemetry. Services communicate via Dapr sidecars. Each sidecar is associated with one service and known by the Dapr placement / master service, also known as Dapr Operator Service. The Dapr Operator feeds the Open Telemetry collector with metrics and traces.

A full Zipkin stack stores and displays traces, while metrics are collected by Grafana / Prometheus. Each Service involved in GraphQL queries needs to expose a GraphQL Federation 2 compatible API. Services involved in GraphQL queries need to be registered in the GraphQL gateway.

### Infastructure (as Code)

The current plan is to support two deployments:

1. Kubernetes

   - State-of-the-art container orchestration. Widely used for microservices in science and the industry. Powerful but tedious to set up (without infrastructure as code tools). Supports multi-node deployments, key stores, load balancing, auto scaling, etc.

2. Docker Compose
   - Single-node deployments. Good portability + easy setup. Declarative multi-container app tool. Packaged with Docker

**Why two deployments?**

Docker Compose assists development by enabling faster code + deployment iterations than Kubernetes. Kubernetes is a requirement and therefore MiSArch needs to be deployed with Kubernetes from time-to-time. We do not want to big-bang port MiSArch to Kubernetes at the end of the project. Incremental ports help to detect deployment difficulties early on.

**(as Code)?**

We plan on using Terraform for Kubernetes to deploy in a declarative way, which enables to version our deployments according to the infrastructure as code paradigm.

# Creating a service

A developer needs to take the following steps when writing a new service for MiSArch.
This is due to the extensive tech-stack that the project supports.

Services can be written in the language of choice if the languages ecosystem supports:

- GraphQL Federation 2 support: https://www.apollographql.com/docs/federation/building-supergraphs/supported-subgraphs/

### Writing a new service step by step

1. Expose services GraphQL API
1. Integrate the service with Docker Compose & Kubernetes
   1. Containerize the service
   1. Set up service container Dapr sidecar
1. Implement service logic
1. Add service to GraphQL gateway

TODO: Secret store guide, Keycloak guide, code examples, ...

# Persistent state in MiSArch

Dapr only abstracts key-value stores. Those do not replace arbitrary databases. Databases are handled similar to services, except they need to be persistent and only connected to their respective service.
