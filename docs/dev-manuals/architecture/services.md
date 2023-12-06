# Services

1. Product
    - stores concrete product information - name, description, image locations, and product variants, i.e. XXL T-Shirt in red - for each product
    - does not store individual instances but the overall descriptions of an item. For that see `inventory`
    - basepath `/products`
    - CRUD on `/products`, CRUD on `/products/<product>/variants`
1. Account
    - Handles session information for a user, including login/registration
    - In our case, most likely a Keycloak
    - basepath `/account`
    - routes `/account/register`, `/account/login`, \<TODO: Path to query JWT token of a user\>
1. User
    - user settings (whenJoined, birthday, gender)
    - CRUD on `/user/<username>/settings`
1. Notification
    - Provides notfications to show a user
    - mail replacement
    - supposed to cover everything found under a typical bell icon
    - basepath `/notifications`
    - routes `/user/<username>/notifications?state=<state>`, `/user/<username>/notifications/<notification>/change-read`
1. Address
    - Stores possible addresses, and to which user they belong
    - routes `/user/<username>/addresses`
1. Media
    - file/object storage/db
    - seller can upload images and retrieve URL of / delete the uploaded image
    - basepath `/media`
    - routes: CRUD on `/media/<file>`
1. Discount
    - Stores available discounts per user and/or product
    - basepath: `/discounts`
    - routes: CRUD on `/discounts`, `/user/<username>/order-discounts`
1. Cart
    - stores items that are in the pending order (the next one to be bought)
    - basepath: `/cart`
    - routes: CRUD on `/user/<username>/cart/items`
1. Wishlist
    - stores items that the user wants to buy at some later point in time
    - wishlist is a shopping cart with two exceptions: it does not store an amount of items to buy, and items on a wishlist will not be bought with the next order
    - any user can have multiple wishlists
    - wishlists can potentially be used for recommendations
    - basepath: `/wishlist`
    - routes: CRUD on `/user/<username>/wishlist/items`
1. Review
    - associates a user review with a product
    - provides summary data
    - routes:
        - CRUD on `/product/<product>/reviews` - _list_ return all reviews on this product, no matter the variant. _Create_ needs the precise product variant too.
        - `/variant/<product variant>/review` - all reviews for this specific variant
1. Category
    - stores the available categories of items
    - routes: CRUD on `/categories`
1. Inventory
    - stores each available product digitally
    - handles state of item (blocked when sold but not yet delivered)
    - routes: CRUD on `/inventory/<product variant>`, `/inventory/<product variant>/(un)block`
1. Tax
    - stores the tax to subtract from any product variant
    - routes: CRUD on `/taxes`
1. Invoice
    - Generates an invoice for an order
    - routes: CRUD on `/invoices/<order>`
1. Order
    - stores items that have been ordered simultaneously
    - routes: CRUD on `/user/<username>/orders`
1. Payment
    - handles payment of any order
    - routes: CRUD on `/payment/providers`, CRUD on `/user/<username>/payments`, `/payments/<payment>/receipt`
1. Shipping
    - any order is sent in x shipments ("boxes")
    - stores the delivery status for every order and where it should be delivered to
    - routes: CRUD on `/user/<username>/shipments`, update using `/user/<username>/shipments/<shipment>/status`
1. Return
    - stores the items that have been returned
    - routes: CRUD on `/user/<username>/returns`
