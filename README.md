# Cornflakes List

![Cornflakes Node.js CI](https://github.com/tmillich/cornflakes/workflows/Cornflakes%20Node.js%20CI/badge.svg)


This project is an attempt to create a 3-Tier webserver with **Firebase**, **Angular 8** and a simple **node.js backend server**.

## Architecture
The architecture looks as follows:

![Alt text](.resources/architecture.png?raw=true "Software-Architecture")

I also tried to use no Framework for backend (only for firebase operations).

## Technical Achievements
- **Firebase**
- **Angular Framework:**
- **Backend: Written in Node.JS**
	- InputValidation: CornflakeInput will be checked in the Backend as well
	- Database Communication
	- Using a EventEmitter
	- Return multiple status codes to secify the response to the user.
	- **Used no Framework for Backend** (only for Firebase operations)
- **Swagger:**
	- Show all the HTTPRequest which can be send to the backend
- **Normal Login**
    - Integrate Email and password login for signed up User
    - Use tokens to validate User
- **Google Login**

## Getting Started

1. First of all creat an `.env`-File in root. 

    You need to set the following environement variables:
    ```yml
    FIREBASE_PROJECT_ID=""
    FIREBASE_DATABASE_URL=""
    FIREBASE_STORAGE_BUCKET=""
    
    FIREBASE_ADMIN_TYPE=""
    FIREBASE_ADMIN_PRIVATE_KEY_ID=""
    FIREBASE_ADMIN_PRIVATE_KEY=""
    FIREBASE_CLIENT_EMAIL=""
    FIREBASE_CLIENT_ID=""
    FIREBASE_CLIENT_X509_CERT_URL=""
    
    FIREBASE_APP_API_KEY=""
    FIREBASE_APP_AUTH_DOMAIN=""
    FIREBASE_APP_MESSAGING_SENDER_ID=""
    FIREBASE_APP_ID=""
    FIREBASE_APP_MEASUREMENT_ID=""
    ```
2.  Build all different compontens of your Project by executing in root:
    ```bash
    npm run heroku-postbuild
    ```
3.  Start the application (Per default it started on Port 8080)
    ```bash
    npm run start
    ```
    
## License

This project is under MIT Licensing terms.
