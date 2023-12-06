---
sidebar_position: 3
---

import CustomImage from "@site/src/components/CustomImage";

# Services and their Interaction

Our services are built based on the domain models bounded contexts.

## Domain-specific services and their dependencies

This diagram depicts the mandatory and optional service dependencies, resulting in upstream and downstream connections defining service interaction. An upstream service call the API of a downstream service.
Mandatory dependencies are marked with solid-line connections and optional dependencies with dotted-line connections.

Mandatory connections imply that a specific service requires mandatory services to its functionality. Optional connections imply that a specific service can service its functionality without its optional dependencies.

The diagram does not include non-domain services such as the API-gateway.

<CustomImage path="/images/webshop-dependencies-bounded-contexts" width="2803" height="2341" />

## Submitting a purchase

This is a sequence diagram modelling the interaction between services when a purchase is submitted. The process consists of several steps reserving product items, calculating tax and discounts and creating necessary artifacts as invoice and receipt. The interaction is part of the "buy" business process and leaves out shipping for readability reasons.

```mermaid
sequenceDiagram
    actor Human User
    Human User ->>+ Frontend: "Complete purchase"
    Frontend ->>+ Order: Create order
    Order ->>+ User: Get relevant user information
    User -->>- Order: Returns user information
    Order ->>+ Inventory: Reserve product items in inventory
    Inventory -->> Order: Returns Confirmation: Items in stock and reserved
    alt One or more items not in stock
        Inventory -->>- Order: Items X, Y, Z not in stock
        Order -->> Frontend: Returns exception + details
        Frontend --> Human User: Communicates: Purchase unsuccessful + details
    end
    Order ->> Order: Creates order X in own database + set payment status to pending
    Order ->>+ Discount: Get discount information for product variant versions with discount codes X, Y, Z
    Discount ->>+ Category: Get category information of product variant versions
    Category -->>- Discount: Returns category information of product variant versions
    Discount ->> Discount: Calculate discount
    Discount -->>- Order: Returns order items with calculated discounts
    Order ->> Order: Save order items to own database for order X
    Order ->>+ Tax: Get tax information for order items
    Tax -->>- Order: Returns tax information
    Order -->>- Frontend: Returns order X is created
    Frontend ->>+ Invoice: Create invoice for order X
    Invoice ->>+ Order: Get information about order X
    Order -->>- Invoice: Returns information about order X
    Invoice ->> Invoice: Creates invoice in own database
    Invoice -->>- Frontend: Returns invoice of order X
    Frontend ->>+ Payment: Pay invoice of order X
    Payment ->> Payment: Applies payment procedure
    alt Payment of invoice of order X unsuccessful
        Payment -->> Frontend: Returns payment of invoice of order X unsuccessful
        Frontend -->> Human User: Communicates: Purchase unsuccesful + details
    end
    Payment ->> Order: Payment status for order X to successful
    activate Order
    Order ->> Order: Sets payment status for order X to successful
    Order -->> Payment: Acknowledgement
    deactivate Order
    Payment -->> Payment: Create receipt
    Payment -->>- Frontend: Returns payment of invoice of order X successful + receipt
    Frontend -->>- Human User: Communicates: Purchase succesful + receipt
    box Backend Services
    participant User
    participant Order
    participant Inventory
    participant Tax
    participant Discount
    participant Category
    participant Invoice
    participant Payment
    end
```
