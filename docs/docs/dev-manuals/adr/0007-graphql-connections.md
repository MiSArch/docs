---
sidebar_position: 8
---

# Offset based connection pagination

## Context and Problem Statement

APIs should support some kind of pagination when accessing a list of entities, to allow limiting API results to a managable size.
In GraphQL, two approaches are popular: offset based pagination, where one specifies an offset in the list, and cursor based pagination, where a string serves as cursor to some element in the list.

## Considered Options

- cursor-based pagination (according to connection specification) with totalCount support
- cursor-based pagination (according to connection specification) without totalCount support
- offset-based pagination with totalCount support
- offset-based pagination without totalCount support

## Decision Outcome

Chosen option: "offset-based pagination with totalCount support",
because easier to implement, and we need totalCount support for the frontend.

### Consequences

A typical GraphQL schema will look like this:

```graphql
type Query {
  "Get a list of entities"
  entities(
    "Number of items to skip"
    skip: Int
    "Number of items to return"
    first: Int
    "Ordering"
    orderby: EntityOrder
  ): EntityConnection!
}

"A connection to a list of Entity values."
type EntityConnection {
  "Whether this connection has a next page"
  hasNextPage: Boolean!
  "The resulting entities."
  nodes: [Entity!]!
  "The total amount of items in this connection"
  totalCount: Int!
}

"Entity order"
input EntityOrderInput {
  "The field to order by"
  field: EntityOrderField
  "The direction to order by"
  direction: OrderDirection
}

"Order direction"
enum OrderDirection {
  "Ascending order"
  ASC
  "Descending order"
  DESC
}

"Entity order fields"
enum EntityOrderField {
  "Order entities by their id"
  ID
}
```

If the entity type of the connection is managed by a different service, knowledge of the entities is limited (typically only the id of the referenced entity is available).
Thus, ordering support is limited to ID.
To prevent conflicts between GraphQL type names, the following types MUST be used instead of `EntityOrderInput`:

```graphql
"Common order"
input CommonOrderInput {
  "The field to order by"
  field: CommonOrderField
  "The direction to order by"
  direction: OrderDirection
}

"Common order fields"
enum CommonOrderField {
  "Order entities by their id"
  ID
}
```

## Pros and Cons of the Options

### cursor-based pagination (according to connection specification) with totalCount support

- Good, because hides away technical implementation (can be offset based or different)
- Good, because standardized: https://relay.dev/graphql/connections.htm
- Good, because includes totalCount support, allowing clients to display the amount of pages
- Bad, because difficult to implement: cursors have to encode values of all fields used in ordering
- Bad, because does not easily allow to start at an arbitrary offset

### cursor-based pagination (according to connection specification) without totalCount support

- Good, because hides away technical implementation (can be offset based or different)
- Good, because standardized: https://relay.dev/graphql/connections.htm
- Bad, because difficult to implement: cursors have to encode values of all fields used in ordering
- Bad, because does not easily allow to start at an arbitrary offset
- Bad, because clients cannot fetch the total amount of elements, which is necessary for some frontend designs

### offset-based pagination with totalCount support

- Good, because allows to start at arbitrary offset
- Good, because easier to implement compared to cursor-based pagination (in particular with SQL databases)
- Good, because includes totalCount support, allowing clients to display the amount of pages
- Bad, because less flexible than cursor-based pagination
- Bad, because non-standard

### offset-based pagination without totalCount support

- Good, because allows to start at arbitrary offset
- Good, because easiest to implement (in particular with SQL databases), due to missing totalCount support
- Bad, because clients cannot fetch the total amount of elements, which is necessary for some frontend designs
- Bad, because less flexible than cursor-based pagination
- Bad, because non-standard
