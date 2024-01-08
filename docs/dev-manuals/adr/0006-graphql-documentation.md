---
sidebar_position: 7
---

# Document the GraphQL API fully

## Context and Problem Statement

GraphQL allows to document both output and input fields.
As documentation is optional, we need to decide to which extend we want to enforce documenting the API.

## Considered Options

- document everything
- only add documentation when it provides additional value

## Decision Outcome

Chosen option: "document everything"

### Consequences

- Good, because allows us to skip regular code documentation where it is already available as GraphQL documentation (e.g. via annotations)

## Pros and Cons of the Options

### document everything

- Good, because can be checked easily as part of the definition of done
- Good, because ensures that parts of the API that seem simple, but may be more complex to external users are still documented
- Bad, because more effort writing documentation not providing benefits

### only add documentation when it provides additional value

- Good, because allows us to skip documentation text not providing any new information
- Bad, because risk of missing important documentation
- Bad, because forgotten documentation is hard to distinguish from purposefully omitted documentation
