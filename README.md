## Shopify

Project is hosted at: https://svetreact.netlify.app

Implements Firebase as BAAS & Cloud Firestore SDK.

## Idea
Shopify app is an application that allows authorized users to create new products. Authorized users can create, edit and delete their owned products. Each use has access to his own shopping cart. Users can add items to their shopping carts, only if they are not created by themselves.

## Public part
* Unauthorized user
  * User has access to Home page - lists 5 most recently added products..
  * User has access to Register page.
  * User has access to Login page.
  * User has access to Catalog page (with no edit/delete functionalities, which are ownerbound).
  * User has access to product Details page.
  
## Private part
* Authorized user
  * User could add a new product.
  * User has edit/delete access to all created products by themselves.
  * User has access to profile page, where username or password can be changed.
  * Each user has his own shopping cart, where not owned products are added by clicking "Add to Cart".
    
## Functionality
* All input fields error-handling.
* API error-handling.

## Client Project setup
```
npm install
```

```
npm run dev
```

