---
sidebar_position: 3
---

# Use GraphQL Federation for API Gateway

## Context and Problem Statement

As we decided to use GraphQL for the API gateway, we need a technology which allows us to combine the API of different services into one unified GraphQL API.

## Considered Options

* GraphQL Mesh / Schema stichting
* GraphQL Federation

## Decision Outcome

Chosen option: "GraphQL Federation", because
- Combining different GraphQL APIs simpler than combinding non-GraphQL APIs (in particular regarding type merging), and GraphQL federation is easier to use in this case
- Flexibility of GraphQL Mesh not required when using GraphQL Federation compatible GraphQL APIs

### Consequences

* Neutral, because requires us to setup a GraphQL Federation compatiple API gateway (router)
* Neutral, because requires each service to provide a GraphQL Federation compatible GraphQL API

## Pros and Cons of the Options

### GraphQL Mesh / Schema stichting

GraphQL Mesh is a library allowing to combine multiple data sources into one unified GraphQL API.
Supported data formats include other GraphQL APIs, REST APIs, gRPC APIs, and more.

* Good, because flexible: allows to combine different data sources
* Good, because allows to transform API schemas before combining them
* Neutral, because only provides significant benefits when used with non-GraphQL APIs, but e.g. using REST APIs results in challenges, in particular with respect to combining types
* Bad, because more complex to use compared to GraphQL federation
* Bad, because combining the same type from one service only partially supported, however this is often required when using REST, e.g. because same service provides a `Product` and `ProductWithDetails`

### GraphQL Federation

Also known as Apollo Federation, allows to combine multiple GraphQL APIs (subgraphs) into one unified GraphQL API (supergraph)

* Good, because integration into GraphQL libraries for different programming languages widely available
* Good, because API gateway easy to set-up and configure: only requires schemas of combined subgraphs
* Good, because can still be used with GraphQL Mesh if required
* Neutral, because forces each service to provide a GraphQL API: while limiting flexibility, also enforces some uniformity in the backend architecture