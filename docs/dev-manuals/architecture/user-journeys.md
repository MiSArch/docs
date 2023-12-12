---
sidebar_position: 7
---

# User Journeys

As things stand, "user" refers to a normal visitor of the online shop who may buy something. User journeys for the administrator and the employee of the online shop will follow in the near future.

Note, that this list of user journeys is not complete when considering all of the requirements and the domain model.

## Browsing the online shop

```mermaid
journey
    title Browsing the online shop
    section Enter online shop
        Visit website : 5
        Log in (optional) : 3
    section Browse online shop
        Scroll through start page : 5
        Check out categories : 3
        Go to category : 3
        Apply filter to category : 3
        Scroll through products : 3
        Go to product : 5
        Read review : 1
        Read another review : 5
        Check out product variants : 3
        Add product to shopping cart : 5
```

## Making an order

```mermaid
journey
    title Making an order
    section Inspect shopping cart
        Go to shopping cart : 4
        Change quantity : 3
        Remove item : 2
        Proceed to checkout : 4
    section Provide information
        Choose delivery address : 4
        Select shipping method : 3
        Select payment method : 3
        Confirm order : 4
```

## Checking my order's status

```mermaid
journey
    title Checking my order's status
    section Enter online shop
        Visit website : 4
        Log in : 3
    section Check order status
        Go to my orders : 4
        Go to order in question : 4
        Check status : 4
```

## Returning an ordered item

```mermaid
journey
    title Returning an ordered item
    section Enter online shop
        Visit website : 3
        Log in : 2
    section Initiate return
        Go to my orders : 3
        Go to order in question : 3
        Select items to return : 3
        Create return request : 3
        Wait for confirmation : 3
        Check return instructions : 3
        Print shipping label : 2
        Receive refund : 4
```

## Writing a review

```mermaid
journey
    title Writing a review
    section Enter online shop
        Visit website : 4
        Log in : 3
    section Go to ordered item
        Go to my orders : 3
        Go to order in question : 3
        Select item to review : 3
    section Write review
        Choose title : 4
        Write text : 4
        Submit review : 5
```

## Writing a review (Alternativ 1)

```mermaid
journey
    title Writing a review (Alternativ 1)
    section Enter online shop
        Visit website : 4
        Log in : 3
    section Go to product
        Navigate to product : 4
        Go to Reviews section : 4
        Click on "Review" : 4
    section Write review
        Choose title : 4
        Write text : 4
        Submit review : 5
```

## Looking for a specific product

```mermaid
journey
    title Looking for a specific product
    section Enter online shop
        Visit website : 4
        Log in (optional) : 3
    section Look for specific product
        Check out categories : 4
        Go to promising category : 4
        Apply filter to category : 4
        Scroll through products : 4
        Go to promising product : 5
        Read product description : 4
        Check out product variants : 4
        Read reviews : 4
        Decide if product found : 4
```

## Looking for a specific product (Alternative 1)

```mermaid
journey
    title Looking for a specific product (Alternative 1)
    section Enter online shop
        Visit website : 4
        Log in (optional) : 3
    section Look for specific product
        Go to search : 4
        Search with text input : 4
        Apply filter to search results : 4
        Scroll through (filtered) search results : 4
        Go to promising product : 5
        Read product description : 4
        Check out product variants : 4
        Read reviews : 4
        Decide if product found : 4
```

## Adding a new wishlist

```mermaid
journey
    title Adding a new wishlist
    section Enter online shop
        Visit website : 4
        Log in : 3
    section Add wishlist
        Go to my wishlists : 4
        Click on "Add wishlist" : 4
        Choose name : 4
        Confirm creation : 5
```

## Adding an item to the wishlist

```mermaid
journey
    title Adding an item to the wishlist
    section Enter online shop
        Visit website : 5
        Log in (optional) : 3
    section Browse online shop
        Scroll through start page : 5
        Check out categories : 3
        Go to category : 3
        Apply filter to category : 3
        Scroll through products : 3
        Go to product : 5
        Read review : 1
        Read another review : 5
        Check out product variants : 3
        Click on "Add to wishlist" : 5
        Choose wishlist : 5
```

## Adding a new product that only has one variant

```mermaid
journey
    title Adding a new product that only has one variant
    section Enter online shop
        Visit website somehow: 4: Employee
        Log in as employee: 3: Employee
    section Add new product
        Click "Add Product": Content Manager : 4: Employee
        Provide name: 4: Employee
        Set visibility: 4: Employee
        Write description: 4: Employee
        Set retail price: 4: Employee
        Set current price (optional): 4: Employee
        Add images: 4: Employee
        Add product to categories: 4: Employee
        Click "Submit": 4: Employee
```

## Adding a new product that has multiple variants

```mermaid
journey
    title Adding a new product that has multiple variants
    section Enter online shop
        Visit website somehow: 4: Employee
        Log in as employee: 3: Employee
    section Add new product
        Click "Add Product": 4: Employee
        Click "Add Variant": 4: Employee
    section Add variant (iteratively)
        Provide name: 4: Employee
        Set visibility: 4: Employee
        Write description: 4: Employee
        Set retail price: 4: Employee
        Set current price (optional): 4: Employee
        Add images: 4: Employee
    section Finish adding product
        Select default variant: 4: Employee
        Add product to categories: 4: Employee
        Click "Submit": 4: Employee
```

### Remarks

- The section "Add variant (iteratively)" can be repeated _n_ times depending on how many variants should be added.
- It might be that the user (Employee) can also put the various variants in a specific order.
