---
sidebar_position: 11
---

# Service Health Endpoint

## Context and Problem Statement

Every service should have a health endpoint indicating how healthy the service is.
This URL and response schema should be consistent across services.

## Considered Options

- `GET /health`, response `200 OK` or `5XX`, response body: JSON object
- `GET /liveness` & `GET /readiness`, response `200 OK` or `5XX`, response body: JSON object

## Decision Outcome

Chosen option: "`GET /health`, response `200 OK` or `5XX`, response body: JSON object" as
it is easier to implement and the difference between the two routes is not relevant enough.

## Pros and Cons of the Options

### `GET /health 200 OK response: "{…}"`

- Good, easier to implement
- Good, follows industry standard as for example in Spring Boot
- Neutral, distinction between liveness and readiness can still be added using the JSON body

### `GET /liveness & GET /readiness 200 OK responses: "{…}"`

- Good, follows K8s convention
- Bad, harder to implement
