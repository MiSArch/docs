---
sidebar_position: 4
---

# Merge Category and Product Service

## Context and Problem Statement

Category and product service are tightly coupled:
The majority of endpoints of each services needs to either invoke the other service or duplicate the others services data:
A product variant holds a characteristic value, this needs to be either saved in the product or category service. It is valuable to know if product variants with specific characteristic actually exist, when displaying the product categories in the frontend with each category characteristic. This prevents the user from running into empty queries. We only want to show characteristics to filter by, if product variants of the specific characteristic exists. Therefore the category service needs to know about the current product variants.
Similarly, displaying a product variant includes its characteristic value, for example: size M for a t-shirt. Each product variant request depends on the characteristic value.

A category can only be deleted if no product points to it. Should a category automatically be deleted if the last product referencing the category is deleted?

## Considered Options

- Save characteristic values of product variants in product service and let category service request the needed information
- Save characteristic values of product variants in category service and let product service request the needed information
- Data duplication in both services
- Merge category and product service
- ~Shared database~ (not up to discussion)

## Decision Outcome

Chosen option: "Merge category and product service", because

we have enough services to fulfill our requirement of 15 services. We do not see a clear cut that would still allow us to implement the functionality we want out of the system.

## Pros and Cons of the Options

### Save characteristic values of product variants in product service and let category service request the needed information

- Good, querying products / product variants does not require querying the category service
- Bad, vice versa
- Bad, queries induce overhead

### Save characteristic values of product variants in category service and let product service request the needed information

- Good, filtering products / product variants for categories does not require querying the product service
- Bad, vice versa
- Bad, queries induce overhead

### Data duplication

- Bad, can lead to consistency problems
- Good, sync might create less overhead than just queries
- Bad, data duplications requires more memory

### Merge category and product service

- Bad, merging services reduces separation of concerns
- Good, prevents significant network overhead
- Neutral, one service less in total
