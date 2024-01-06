---
sidebar_position: 2
---

# Use GraphQL API Gateway

## Context and Problem Statement

The frontend needs to be able to send requests to the backend.
As such requests need to be instrumented with tracing metadata, and authentication needs to be performed, an API gateway should be provided.
However, different API technologies exist, and we need to decide which one to use

## Considered Options

- GraphQL
- REST
- gRPC Web

## Decision Outcome

Chosen option: "GraphQL", because

- allows frontend to use one unified API to fetch data from the backend

### Consequences

- Good, because allows frontend to easily fetch and combine data from different sources in the backend
- Neutral, because requires us to find a way how to combine API of different services into one unified GraphQL API

## Pros and Cons of the Options

### GraphQL

- Good, because allows frontend to easily fetch and combine data from different sources in the backend
- Good, because built-in strict type system
- Good, because GraphiQL allows users to explore the API, including with a graphical interface to build requests
- Good, because allows client to define which data should be fetched, reducing overfetching
- Good, because allows to solve N+1 problem of requests, as instead of multiple consecutive requests, a single request can define all data which needs to be fetched
- Bad, because more difficult to implement, in particular regarding authorization

### REST

- Good, because easiest to implement, in particular regarding authentication
- Good, because easy to use for users of the reference architecture
- Good, because good for browser caching
- Neutral, because no built-in typing, but could be provided via OpenAPI
- Bad, because more difficult to combine data from different sources: combine in gateway? have all routes from services in gateway?
- Bad, because does not allow frontend to define which data should be fetched

### gRPC Web

- Good, because allows streaming
- Good, because built-in type system
- Good, because binary protocol is more efficient
- Neutral, because binary format is more difficult to understand in web environment, in particular form users of the reference architecture, but text-based protocol could also be used. JSON could also be used, but it is non-standard.
- Bad, because less common in web environments compared to other options
- Bad, because compared to GraphQL, does not provide unified way for client to define which data should be fetched
