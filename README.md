# Jlabs Basic Assessment - Intern Developer

## Name

## Installation Setup

### client_side folder

1. Install below npm packages

   ```
   npm i @fortawesome/react-fontawesome axios bootstrap-icons react react-dom react-icons react-router-dom

   ```

2. run the client side using

   ```
   npm run dev
   ```

3. create **.env** file that contains
   VITE_API_URL = http://localhost:8080

### server_side folder

1. Install below npm packages

   ```
   npm i -D nodemon
   npm i bcrypt cors dotenv express jsonwebtoken mongoose

   ```

2. run the server side using

   ```
   npm run dev
   ```

3. create **.env** file that contains

   PORT = 8080
   MONGO*URI = \_Input your here MongoDB atlas link here*
   JWT*SECRET = \_Input your here*

### endpoints

**Postman endpoints reference**_see file below_
myjournal_app.postman_collection.json

**User**

- POST [Register User](http://localhost:8080/api/v1/users/register)
- POST [Login User](http://localhost:8080/api/v1/users/login)
- GET _For Backend testing Only_ [View all User](http://localhost:8080/api/v1/users/)

- As a User, I can register
  - All fields must be filled out
  - name must be unique;
  - email must be unique and valid email address with **@** and **.**
  - Password must have at least 8 characters, uppercase, lowercase, number, and special characters
  - Password and ConfirmPassword must be match _For Front end checking only_
- As a User, I can login
  - email and password must be valid and found in the database
