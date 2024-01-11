---
sidebar_position: 10
---

# Check Entity Consitency

## Context and Problem Statement

When creating a relation between entities of different services, we need to check if the referenced related entities managed by a different service are valid to use.
Most importantly, does the given ID actually refer to an entity.

## Considered Options

- import related entities into service by listening to dapr creation events created by the owning service
- send a request to the owning service to verify that the entity with a given ID is valid

## Decision Outcome

Chosen option: "import related entities into service by listening to dapr creation events created by the owning service", because
results in more loose coupling, as we don't have synchronous requests between services when creating the relations.
Note that there might be exceptions in cases where this approach is not applicable.

## Pros and Cons of the Options

### import related entities into service by listening to dapr creation events created by the owning service

- Good, because more loosely coupled: no requests sent when creating the relation, instead async notifications via the event bus when entities are created
- Neutral, because potentially more/less events/requests: reduces communication overhead when related entity is on average used more than once, otherwise increases overhead
- Bad, because less enforced consistency: e.g. deletion events might be delayed, can cause temporary inconsistencies (as usual with loose coupling)

### send a request to the owning service to verify that the entity with a given ID is valid

- Good, because results in stricter consistency: always validates current state
- Neutral, because potentially more/less events/requests: reduces communication overhead when related entity is on average used less than once, otherwise increases overhead
- Bad, because results in tight coupling between services: relation to foreign entity can only be created if synchronous request to other service is successful
