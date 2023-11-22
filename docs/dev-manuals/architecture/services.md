# Services
1. Product
    - stores concrete product information - name, description, image locations, and product variants, i.e. XXL T-Shirt in red - for each product
    - does not store individual instances but the overall descriptions of an item. For that see `inventory`
    - APIs: CRUD for products
1. Inventory
    - stores each available product digitally
    - handles state of item (blocked when sold but not yet delivered)
    - APIs: CRUD per instance of any product, (un-)blocking an item
    - Depends on `Product` service
1. Shipping
    - any order is sent in x shipments ("cartons")
    - stores the delivery status for every order and where it should be delivered to
    - CRUD to register/manage arbitrary shipment provider
    - Dependency on `Order` and `User` service
1. Order
    - stores items that have been ordered simultaneously
    - Dependency on `Product` and `Inventory` service
1. Cart
    - stores items that are in the pending order (the next one to be bought)
    - Depends on `Product` service
    - Might depend on `Inventory` service (displaying if the item is actually available at the moment)
1. Media
    - file/object storage/db
    - seller can upload images and retrieve URL of / delete the uploaded image
1. Payment
    - CRUD to register/manage arbitrary payment provider
    - handles payment of any order
    - handles discounts as well
1. Search
    - search for items
        - by text
        - by category
        - by category-specific filters
    - order items
        - by relevance
        - by price
        - by search text match
1. User
    - user settings (address, billing)
    - Dependency on `Payment` service
1. Auth (Keycloak)
    - authenticates users and manages their sessions
1. Notification
    - mail replacement
    - everything user should be notified about
    - each user has notifications
    - potentially boolean flag read/unread
1. Rating
    - associates a user review with a product
    - provides summary data
    - Depends on `User` and `Product` service
1. Wishlist
    - APIs: CRUD for items on a wishlist, CRUD for wishlists themself
    - wishlist is a shopping cart with two exceptions: it does not store an amount of items to buy, and items on a wishlist will not be bought with the next order
    - any user can have multiple wishlists
    - wishlists can potentially be used for recommendations
    - Depends on `Product` service
    - Might depend on `Inventory` service (displaying if the item is actually available at the moment)

# Optional services
1. Support
    - initial stage: simple chatbot, i.e. using botlibre
    - recommendations
1. Newsletter
    - would be sent as notification
    - could be done via pdf
1. Misc microfrontend components
    - microfrontend components which are required and stateless, but do not fit into another service
    - e.g. terms and conditions, ...
    - TODO: ask supervisors if they are ok with that
1. Recommendation
    - e.g. via k-nearest-neighbors
    - Leon: very complex
    - Kilian: volumnteers
1. Reward
    - unclear what do do precisely
1. Category
    - create categories
    - assign categories to products
    - could also be done directly in product service
1. Homepage
    - maybe part of misc microfrontend
    - maybe just recommendations and thus part of host
    - maybe a separate frontend only service
1. Seller/Shop profile / Admin console
    - mostly frontend stuff
    - lots of effort

# Non-functional services
1. API Gateway
1. System monitoring
1. Configuration management
    - Responsible for sending events regarding the configuration of services
        - e.g. deterministic memory leak, etc.
    - Should probably use dapr configuration stuff internally
    - Want to save this as the service, to prevent requesting this data always (and thus introduce a lot of overhead)
1. Auth
    - Keycloak
    - if we have it separate from the user service

# Problematic services
1. Service Discovery
    - done by Kubernetes/dapr
    - we don't want to do SOAP/WSDL/Web service discovery/...
1. Load balancer
    - Dapr/Kubernetes thing, not our problem
1. Caching
    - See below (what can be cached, do we want to do caching)
1. Return
    - part of shipment service
1. Advertisement
    - not applicable with non-platform
1. Terms and conditions
    - would be done in the misc service
1. Discount
    - part of order/payment
1. Currency
    - Would be another fake service or external dependency
1. Often buyed together
    - done by recommendation service
1. shop ratings
    - if platform: we are not platform
    - if product: already planned
1. Analyze customer behavior
    - part of recommendation
    - everything else too complex
    - could remember what the user visisted/clicked on
1. User profile
    - user part part of user service

# Micro-Frontend:
- Header/Footer Backdrop
- Product List View (Search)
- Product View (Detail)
  - Reviews View
  - Similar Products View (User might also like...)
- Home View
- User Settings View
- Orders View
- Wishlist View
- Chat Assistant View
- Category Filter View
- Shopping Cart View
- Order Checkout View
- Delivery Details View
- Login View
- Register View

# Potential Problems
- where to have image files
    - at service which needs it
        - workaround in regular db, or in dedicated object storage (minio)
    - at dedicated service
- shipping
    - do we do the regular shipping stuff?
        - problem: can only be faked, shitty
    - alternative: only keep state of shipment (in progress, delivered, ...)
        - part of order service or own service?
        - would require some fake functionality
            - url to set it
            - maybe service which does is automatically
- payment
    - what does it do
    - has state of a payment
    - probably supports different payment types
    - do we block the amount of money, or compoenstation on delivery failure
- system monitoring
    - what do we build on our own
    - what can we simply reuse
        - is this simply the telemetry solution
    - TODO: find out how to use from domain point of view
- OpenTelementry
    - we should provide some dashboard by default
        - e.g. Grafana (would this count as a functional service?)
- Caching
    - what could be cached
        - probably only catalogue
        - REST caching?
        - how does it interact with API gateway
    - we don't want to cache between user and API gateway
    - if we do caching, based on event bus / after API gateway
    - we probably should cache images
- Do we need a user service for data besides Keycloak
    - Keycloak can have custom (simple) attributes
    - More complex stuff needs to be saved in a dedicated service, or somewhere else
    - User data
        - Addresses
        - Payment information
            - Own service?
            - Probably payment service
        - Demographic information (could be in Keycloak)
        - User profile
            - probably not single service, but microfrontend composed of different sources (last orders, wishlist, recommendations)
- at which point in time do we block an instance
    - put into cart? => would require time restriction
    - start of payment process
        - probably this one
    - start of order
- how to do search
    - technically
        - Elastic not an option due to license changes
        - Open search
        - Lucene?
        - db with included seach index (Neo4j, Postgres)
        - research required
            - TODO: find out if opensearch is sufficient
    - domain
        - categories?
        - filter criteria?
        - sort criteria
            - order by price
            - problem: algorithm gives you basically everything as result
- domain: are we a platform?
    - pro
        - we can do more stuff
            - seller portal
            - advertisement
    - con
        - it is waaaaaaaay more complex
- microfrontend: what to do with components which to not really fit well into a service
    - e.g. terms and conditions
    - have in host?
    - have a service for all this stuff
- microfrontend
    - do we need a store
- media service
    - how to to this technically
    - consider alternatives to minio
    - can we do it without a known hostname
        - problem: presigned URLs
        - probably required in any case for K8
        - but maybe we can avoid it for docker compose

# ADR

## No dedicated user service
We do not dedicated user service until we realize we really need one.
Currently all relevant user information is distributed at the respective service.

## We are a single shop and not a platform
We have decided to not have the capacity to do at as a platform.
This also simplifies role management for non-customers

## Translations
We have it in English to reduce meaningless complexity.
(Only if required by supervisors)

## No currency service
We have no currency service to reduce external dependencies.
Thus, it is sufficient to use euro as currency.

## No read permissions on media
We don't really need it, and it simplifies the implementation.
