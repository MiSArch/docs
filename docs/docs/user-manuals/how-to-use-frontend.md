---
sidebar_position: 1
---

import CustomImage from "@site/src/components/CustomImage";

# How to Use the Frontend

## Version to which this Document Refers

To be precise, [v0.0.4](https://github.com/MiSArch/frontend/releases/tag/v0.0.4) is the latest version of the Frontend at the time of writing this document.
This guide might not completely apply to newer versions.

## Purpose of this Document

This document is mainly a step-by-step guide detailing how to **use** the Frontend. If you have just deployed the system and do not know where to start, this guide is for you. It tells you step by step how to manage the online store and how to use it.
Screenshots are provided in the final section of this document. Why? Because we recommend using this document alongside the actual frontend, side by side, when following the steps. We believe that inserting screenshots within the text would be distracting and unnecessarily bloat the document.

## Disclaimer

The Frontend is still in development and therefore this document refers to exactly one explicit version of the Frontend. It may happen that the document becomes outdated because the Frontend has advanced in the meantime. Ideally, with each new feature or bug fix, this document is updated accordingly.

## Where to Find the Frontend

If we deploy the MiSArch system — the whole infrastructure — on our local machine using Docker, we will find the Frontend at the following URL: `http://localhost:4000`.

## Step-by-step User Guide

This section primarily describes step-by-step how to operate the Frontend so that each feature can be tried out. This is because some features are only available if you have executed something else previously.
For example, you must have created a product before you can order it in the online store.
Let's start with user management.
This is where Keycloak comes into play.
Once we know how to register a user and assign them permission to manage the online store, we move on to managing the online store — how do we add products? How do we restock the products? How do we create tax rates? In the third subsection, we then use the frontend from the customer's perspective.
We note that some steps need to be taken before you can simply visit the online store to try out features from the customer's perspective. The three subsections represent the three superordinate roles that you can or even have to take on in the meantime when operating the frontend:

- Keycloak administrator
- Online store administrator
- Online store customer

### User Management

1. At the beginning, there are no users in the system. Consequently, when we navigate to the online store, we are not logged in as a user and in the top right corner it says "LOGIN".
2. Clicking on "LOGIN" will redirect us to Keycloak. Here we have two options: We could try to log in with an existing user via username and password — this is impossible because there are no users yet — or we register a new user. To do this, we click on the "Register" link at the bottom of the dialog.
3. We fill out the registration form and submit it by pressing the "Register" button.
4. Keycloak redirects us or returns us to the online store. Now we are logged in.
5. By default, we only have the permissions of a customer. That means we still can't do anything because there are no products in the online store yet.
6. Therefore, we need to add additional permissions to our new user so that we can manage the online store. To do this, we navigate to Keycloak: http://localhost:4000/keycloak/
7. We click on "Administration Console" and log in with the username "admin" and password "admin" (or if we changed the password, use whatever has been configured).
8. In the top left corner, there is a dropdown menu. There you can select the so-called _realm_. We switch to "Misarch".
9. Then we navigate to "Users" in the side menu. Now, the URL should look like this: http://localhost:4000/keycloak/admin/master/console/#/Misarch/users
10. The user we created should now be listed under Users.
11. We click on the user or its username.
12. This takes us to the "User details".
13. We go to the "Role mapping" tab.
14. We click on the blue "Assign role" button. A dialog opens.
15. We check the roles `admin` and `employee` and confirm the dialog with "Assign".
16. Now the user has all available roles in the system, so the user can both administer the online store and shop in the online store.
17. We navigate back to the online store. We should still be logged in. The view has changed because now we are logged in not as a customer but as a store `admin` and `employee`. If not, just reload the page.
18. Now the main menu is on the right instead of the left side, and it points to pages that allow store management.
19. Very important! If we wanted to change the current user role, we could do so. In the top right corner, there is a button labeled "SWITCH USER ROLE". Clicking on it opens a dialog.
20. In the dropdown, we can select one of the available roles. The selection takes effect immediately, and we must explicitly close the dialog by clicking "CANCEL".
21. Clicking "LOGOUT" logs out the currently logged-in user.

### Managing the Online Store

To manage the online store, we need to log in with a user who has the `employee` role. In the previous section, we created such a user using Keycloak.
Preferably, our user should even have `admin` capabilities to manage further configurations.

1. We now proceed by ensuring that we are logged in with such a user.
2. If necessary, we need to switch the user role to either `admin` or `employee`. See Step 19 in the previous section.
3. On the right side, you'll now find the menu. First, navigate to "Manage Tax Rates".
4. The page that now appears has a toolbar at the top. In the top right corner, you'll find a button labeled "ADD TAX RATE". Click on it.
5. A dialog will open. Now we can create a tax rate, with a name, description, and the percentage to be applied.
6. Click "SAVE" to request the creation of the tax rate.
7. Now the tax rate will also be listed on the "Manage Tax Rates" page.
8. Clicking on the tax rate will take us to a detailed view or to the page for the tax rate.
9. If the percentage of the tax rate ever changes, we can create a new version.
10. Click on the toolbar button "ADD TAX RATE VERSION".
11. A dialog opens with only one input field for the new percentage.
12. Saving the new input will directly update the page and thus also the version history of the current tax rate.
13. It's important to know that the system absolutely needs at least one tax rate in order to create a product.
14. Now navigate in the menu to "Manage Categories".
15. The page is structured analogously to the "Manage Tax Rates" page: In the top right corner, you'll find a toolbar button labeled "ADD CATEGORY". Click on it to open a dialog to create a new product category.
16. Categories are optional. That means they are not mandatory in order to create products. We decided to organize the online store's products into categories. A product can be part of multiple categories. For instance, a CD could be part of a category named `CDs` and at the same time be part of category named `Music`. There are no relationships between categories. Each and every category stands for itself. In particular, we cannot nest categories such as saying `CDs` are a subcategory of `Music`
17. The dialog represents a form; we can give the category a name and a description.
18. On the right side of the dialog, you'll find an action button with a plus symbol. Clicking on it expands the dialog, allowing us to create as many so-called characteristics of this category as we want. We can select the type of characteristic and add the name and a description. Additionally, there's a possibility to remove a characteristic at the bottom left. Regarding the type of characteristics, product catgories can have filterable characteristics and these can be categorical (i.e. genre of music) or numerical (i.e. publishing year).
19. In the top right corner, there's a "SAVE" button to initiate the creation of the category in the backend.
20. Very important: Even if the creation of the category has been successful on the service side, the category is not listed on the "Manage Categories" page -- this feature is still missing.
21. Now navigate through the menu to "Manage Products" to finally create a product.
22. Click on "ADD PRODUCT" and the "Add Product" dialog will appear.
23. Now, let's briefly discuss the available input options: from top to bottom.
24. With the slider at the top, you can hide a product from customers.
25. The "internal product name" is not visible to customers, only to users logged in with a role in store management. This is also described in the hint text below the input field once you've navigated into it.
26. Next, we can select the categories to which the product should belong.
27. A product always needs a product variant. We add one by clicking the action button with the plus on the right side.
28. We can add as many variants as we want.
29. For each variant, the dialog displays a tab with the UI elements for entering the information.
30. Individual variants can also be "hidden" with a slider.
31. Each variant has its own name. Note that it's not checked whether the variants actually have different names.
32. A product description can be added for each variant. This description must not exceed 200 characters.
33. The "Retail Price" must be specified in cents. For example, 1000 if the product variant should cost 10 EUR.
34. It's essential to select a "Tax Rate". Here, we can choose the tax rate we created earlier.
35. We also need to specify the weight of a single product variant, in kilograms. This field is also mandatory, as the weight is needed for calculating the shipping costs.
36. Once we've added all our variants, we must select the default variant (further up in the dialog). We do this by selecting a variant from the dropdown.
37. Now, we can close the dialog and finish creating the product by clicking "SAVE".
38. Just like for the "Manage Categories" page, the page actually doesn't list any products.
39. If no error message appears, the product creation should have been successful. We can verify this by navigating to the homepage.
40. Now click on the product to go to the product page.
41. Since we're active in one of the store management roles, we see the product detail view for these roles.
42. Good to know: Products cannot be modified, and in the frontend, the feature to add more product variants, delete existing ones, or define new versions for variants is still missing.
43. In the toolbar, you'll find the "RESTOCK" button. The feature behind it allows us to replenish the stock of products. When we click "RESTOCK", a dialog appears.
44. In the dialog, we can select the product variant for which new items should be added to the inventory. We can also select the quantity ("Amount") of product items.
45. The difference between the "RESTOCK" and "RESTOCK AND CLOSE" buttons is that the latter closes the dialog. The former allows us to manage the individual product variants consecutively.
46. As a result, the product page also indicates that the product is in stock.
47. The lower half of the product view shows what the customer would see if they visited the product page. More on this in the next subsection.

#### Adding a Shipment Method to Allow Users to Checkout

Before we can place an order as customers in the online store, at least one shipping method must be added to the system. In the long term, the frontend should provide users with the roles of `admin` or `employee` with a way to do this. Currently, however, it is necessary to execute the GraphQL mutation intended for the shipment methods via GraphiQL in order to add a shipment method. Here's how it works:

1. Navigate to GraphiQL; the URL is: `http://localhost:8080/graphql`
2. In the lower part of the editor, we find two tabs: "Variables" and "Headers"
3. Switch to "Headers"
4. We intend to set the "Authorization" header so that we are authorized for the GraphQL operations.
5. We need a token. We obtain this by switching back to the frontend, logging in with a user who has one of the two roles: `admin` or `employee`, opening the JavaScript console, and searching for the logged token. We copy this token completely. [Also, see this screenshot.](#retrieving-the-authorization-token)
6. Then we can (back in GraphiQL) set the header:

```json
{
  "Authorization": "Bearer TOKEN"
}
```

Replace _TOKEN_ with the actual token we copied earlier. 7. Now we can execute the GraphQL mutation `createShipmentMethod` to create a shipment method; for example, with the following inputs:

```graphql
mutation MyMutation {
  createShipmentMethod(
    input: {
      baseFees: 5
      description: "DHL rules the world."
      externalReference: ""
      feesPerItem: 1
      feesPerKg: 5
      name: "DHL"
    }
  ) {
    id
  }
}
```

[Executing the GraphQL operation should look like this.](#adding-a-shipment-method-to-allow-users-to-checkout)

8. Now we have defined a shipping method. This is now available to customers or buyers during checkout.

### Being a Customer

If we are logged in with a user who has multiple user roles, then we need to switch to the `buyer` role in order to actually be a customer or potential buyer in the store. Alternatively, we could simply register another user, but not assign the `admin` or `employee` roles to them in Keycloak. A registered user only has the default `buyer` role, as long as we do not assign more roles in Keycloak. Without a logged-in user, you can still see what a customer is supposed to see, but some features are not accessible then.

#### Navigation

On the left side, we find the menu. There, we can navigate to the individual categories or to our wishlists. The link "All Products" leads to the list of all products, across categories. The same goes for the link behind the name or logo of the online store.

#### Adding Something to the Shopping Cart

1. To do this, we navigate to a product page by clicking on a listed product.
2. Before clicking on the "ADD TO CART" button, we should enter how many times the product variant should be added to the shopping cart.
3. Then, we click on "ADD TO CART".
4. Once the product is in the shopping cart (also in the backend), we receive a green message at the bottom of the screen. We can close this by clicking on the close button of the individual message or by clicking on "CLOSE ALL". Note that clicking back into the online store somewhere in the screen also closes the message, but currently, there is a bug that prevents the next message from being displayed until we completely reload the page.
5. We can ensure that the product has indeed been added to the shopping cart by navigating to the shopping cart. To do this, simply click on the "SHOPPING CART" button in the top right corner.
6. Now, we should see the product listed in the shopping cart.

#### Creating a Wishlist

1. To create a wishlist, we navigate to the "Wishlists" menu item.
2. In the top right corner, we find the "ADD WISHLIST" button. We click on it.
3. A dialog opens; here, we can only enter the name of our new wishlist.
4. We confirm the creation of the wishlist by clicking "SAVE".
5. The wishlist should now be listed.
6. When we click on the wishlist, we are taken to the wishlist page. As expected, it is empty because no product has been added yet.

#### Adding Something to a Wishlist

1. To do this, we navigate back to a product page.
2. Below the "ADD TO CART" button, we find the "ADD TO WISHLIST" button.
3. When we click on it, a dialog opens.
4. In said dialog, we can check the wishlists to which the product should be added.
5. Additionally, we could navigate to the wishlist overview page via "GO TO WISHLISTS" to create another wishlist.
6. We confirm the assignment of the wishlists by clicking "SAVE".
7. The product has been added to the wishlist. However, there is no green message displayed. If we wanted to make sure, we would need to navigate to the wishlists and check if the product is listed there.

#### The Checkout / Making an Order

1. We make sure that we have added something to the shopping cart and navigate to the shopping cart.
2. We click on "PROCEED TO CHECKOUT".
3. First of all, we have to specify the delivery address. If we had already added one to the system, we could select that one from the dropdown that says "Delivery Address".
4. We click on "USE DIFFERENT ADDRESS" in order to add a new address.
5. An input form appears that lets us specify the information of the address: name, street, city, postal code, and country -- to name the most important fields.
6. By clicking on "SAVE ADDRESS" we request the backend to save the address. If successful, we get a green success notification.
7. After having added a new address, the new one gets selected automatically from the dropdown.
8. If we want the billing address to be a different one from the delivery address, we can check the checkbox that says "The billing address differs from the billing address", right below the card displaying information regarding the delivery address.
9. By checking the checkbox, a second card for the billing address is added to the screen.
10. By clicking "PROCEED" we can continue with our checkout and move on to specifying shipment information.
11. On the Shipment page we can choose a shipment method for each product that we want to order.
12. If we have selected one for each product we can proceed to the Payment page.
13. The Payment page has radio buttons for each available payment method.
14. When selecting credit card, one can select one from their existing credit cards or add a new one, just like with the addresses before.
15. After having selected a payment method, we can click on "CREATE ORDER" to create the order and therefore reserve the order items for an hour.
16. That means the status of the order is "Pending". We have yet to place the order.
17. To do so, we just have to click on "Place Order Now".
18. A dialog pops up asking us to confirm our action.
19. If we click "CONFIRM", the order gets placed.
20. That means, the order summary is displayed and a success notification if the placement was successful.

## Known Issues and Bugs

- The manage-categories page does not list any categories.
- In the "Add Product" dialog, there is no indication that the product description may be a maximum of 200 characters long.
- In the "Add Product" dialog, there is no indication that the retail price must be entered in cents.
- Products cannot be changed via the front end. The features that should allow a user to manage product variants or define a new version of a variant are still missing.
- If a message is displayed, you must close it by clicking either on "CLOSE ALL" or on the close button of the individual message. But not by simply clicking somewhere outside the message center. Because then the next message would no longer be displayed until you reload the page. This is a bug.

## Screenshots

### At the Beginning We See an empty Store

<CustomImage
    path="/images/frontend-screenshots/screenshot-first-visit"
    extension="webp"
    height="2112"
    width="3248"
/>

### Assigning Roles to a User in Keycloak

<CustomImage
    path="/images/frontend-screenshots/screenshot-assigning-roles-in-keycloak"
    extension="webp"
    height="2112"
    width="3248"
/>
Note that a user always has the `buyer` role, even when the corresponding checkbox has not been checked in the dialog. The reason for that is that the `buyer` role is part of the default roles that every user has.

### Switching the User Role

<CustomImage
    path="/images/frontend-screenshots/screenshot-switching-user-role"
    extension="webp"
    height="2112"
    width="3248"
/>

### Adding a Category

<CustomImage
    path="/images/frontend-screenshots/screenshot-adding-category"
    extension="webp"
    height="2112"
    width="3248"
/>

### Adding a Product

<CustomImage
    path="/images/frontend-screenshots/screenshot-adding-product"
    extension="webp"
    height="2112"
    width="3248"
/>

### Restocking a Product

<CustomImage
    path="/images/frontend-screenshots/screenshot-restocking-product"
    extension="webp"
    height="2112"
    width="3248"
/>

### Retrieving the Token

<CustomImage
    path="/images/further-screenshots/screenshot-token-retrieval"
    extension="webp"
    height="2112"
    width="3248"
/>

### Creating a Shipment Method via GraphiQL Mesh

<CustomImage
    path="/images/further-screenshots/screenshot-graphiql-create-shipment-method"
    extension="webp"
    height="2112"
    width="3248"
/>

### A Product — What the Customer Sees

<CustomImage
    path="/images/frontend-screenshots/screenshot-product-customer"
    extension="webp"
    height="2112"
    width="3248"
/>

### The Shopping Cart

<CustomImage
    path="/images/frontend-screenshots/screenshot-shopping-cart"
    extension="webp"
    height="2112"
    width="3248"
/>

### The Wishlists

<CustomImage
    path="/images/frontend-screenshots/screenshot-wishlists"
    extension="webp"
    height="2112"
    width="3248"
/>

### Retrieving the Authorization Token

<CustomImage
    path="/images/further-screenshots/screenshot-token-retrieval"
    extension="png"
    height="2112"
    width="3248"
/>

### Creating a Shipment Method via GraphiQL Mesh

<CustomImage
    path="/images/further-screenshots/screenshot-graphiql-create-shipment-method"
    extension="png"
    height="2112"
    width="3248"
/>

### Selecting a Delivery Address

<CustomImage
    path="/images/frontend-screenshots/screenshot-delivery-address-selected"
    extension="png"
    height="2112"
    width="3248"
/>

### Order Summary (order has yet to be placed)

<CustomImage
    path="/images/frontend-screenshots/screenshot-order-summary-pending"
    extension="png"
    height="2112"
    width="3248"
/>

### Order has been Placed successfully

<CustomImage
    path="/images/frontend-screenshots/screenshot-order-successful"
    extension="png"
    height="2112"
    width="3248"
/>
