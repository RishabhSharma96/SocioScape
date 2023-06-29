# Social Media Web Application

This is a full-stack web application built with the MERN stack (MongoDB, Express.js, React, Node.js) for food delivery services. Customers can browse and order
food items from various restaurants and can order it.

## Installation

Before running the application, make sure you have the following tools installed:

- Node.js
- MongoDB

To install the dependencies, run the following command in the root directory of the project:


```npm install```


## Configuration

Create a `.env` file in the root directory and add the following environment variables:

```MONGO_DB_URI = <your_mongo_db_uri>```
  
```PORT = 5000```
  
```ITEM_COLLECTION_NAME = food_items```
  
```ITEM_CATEGORY_NAME = food_categories```
  
```AUTH_KEY = <JWT_secret_key>```


## Running the Application

To start the server, run the following command in the backend directory:

```npm run dev```

To start the client, run the following command in a new terminal window inside the client directory:

```npm start```
  
  
The server will be running on `http://localhost:5000` and the client will be running on `http://localhost:3000`.

## Populating the Database

The application uses MongoDB as the database. To populate the database with sample data, import the JSONs in client/JSONs as food_items and food_categories

  
## Testing

To run the unit tests, run the following command in the root directory:

```npm test```
  
  
  
## Contributing

If you want to contribute to this project, please fork this repository and create a pull request with your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.



