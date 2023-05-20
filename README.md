# Project Discription
This project is a e-commerce website which showcase the frontend and backend of an standard ecommerce shop.
This project uses various dependences such as react-router-dom,axios,redux-toolkit and stripe to name a few.
It includes 2 main component which would be the client site, and backend server which will be discussed in detailed below.

# Features

# Frontend Site(Client)
## Routing
Browser Router is used to navigate within the site such as Home,Login,Register,Cart,Product(category and individual).

## Redux toolkit
Redux toolkit is used to mainly to used for the following:
* User-Store user login data,and state of the registration/login(e.g start,error,success).
* Cart-To store the product details(id,size,color,quantity) and compute the total unique product quantity and price.
* Persist-The redux state is persisted to ensure that the data is still present when refreshed.

## Cart Features
* Once the product is added to cart, the product is grouped together if it contains the same id,size and color and the quantity will be adjusted accordingly.
* The quatity of the product could be adjusted and removed completed from the cart pages by adjusting the redux state through reducers.

## MongoDB
* MongoDB is used as the database to store data such as product,user and orders. The website loads and display the data dynamically using features like .map .

## Axios
* Axios is used to upload post and get data from MongoDB.

## Stripe
* Stripe is used to manage the payment from the customer. The values from the payment could be retrived and stored in MongoDB(not done as of yet). You can use 4242 4242 4242 4242 for the successful payment and be directed to the success payment page.

## Responsive Mobile CSS
The CSS is modified for mobile users with screen width  lesser than 380px.(Source:Client/src/responsive.js)

## Improvements
### Styled-component
* In this project, styled-component is used for ease of programming. In future projects, className and CSS should be used for better documenting and identification when inspecting the element.

### Adding of Wishlist
* Currently the wishlist function is not available due to lack of time for the project. 

### Sync Cart with database
* Sync Cart(redux) with Cart(database) for better user experience and consistency when user uses different computer/tabs.

### Newsletter and searchbar
* Currently the newsletter,wishlist and searchbar is not functional. On future development of the project, I would add these functions.

# Backend Site(API)

## Express & Axios
* Express.js backend framework is used for this project.
* Routes and Models are created put,post and get data from the backend server.

## Login Authentication
* JsonWebToken(JWT) is used to authenticate the user.

## Security
* User password is encrypted using crypto-js and store in MongoDB to protect user password.
* process.env is used to store sensitive data such at Stripe Key, MongoDB URL, JWT Secret Key and CryptoJS Key.
* userRequest require a accesstoken given by JWT(used in payment).


Feel free to contact me at mohd.firhat@hotmail.com for enquiries on the project.
