
# Stock Quote API

This project is a API with Node.js to allow users to get stock quotes. It consists of two separate services:

1.  **API Service**: Handles user requests for stock quotes and manages user registration, authentication, stats and history tracking.
2.  **Stock Service**: Fetch an external API to retrieve stock information.

## Requirements

-   [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/) installed on your machine.

## Usage

### Starting the Services with Docker

1.  Build and start the services using Docker Compose:

    `docker-compose up --build` 
    
2.  The service will be available at:
    -   API Service: `http://localhost:3003`
   
### Environment Variables

Both the API service and the Stock service require environment variables to be set for configuration.
All the environment files will be sent in the e-mail of challenge delivering 

### API Endpoints

#### User Registration

-   **Endpoint:** `POST /register`
    
-   **Description:** Registers a new user with the provided email and role.
    
-   **Request Body:**
   
    `{
      "email": "peterparker@spiderman.com",
      "role": "user"
    }` 
    
-   **Response Body:**
    
    `{
      "email": "peterparker@spiderman.com",
      "password": "tehr23jl"
    }` 
    

#### Get Stock Quote

-   **Endpoint:** `GET /stock?q={stock_code}`
    
-   **Description:** Retrieves the stock quote for the specified stock code.
    
-   **Query Parameters:** Replace `{stock_code}` with the desired stock code.
    
-   **Response Body Example:**

    `{
      "name": "APPLE",
      "symbol": "AAPL.US",
      "open": 123.66,
      "high": 123.66,
      "low": 122.49,
      "close": 123
    }` 
    

#### User Query History

-   **Endpoint:** `GET /history`
    
-   **Description:** Retrieves the user's stock quotes history.
    
-   **Response Body Example:**

    `[
      {
        "date": "2021-04-01T19:20:30Z",
        "name": "APPLE",
        "symbol": "AAPL.US",
        "open": 123.66,
        "high": 123.66,
        "low": 122.49,
        "close": 123
      },
      {
        "date": "2021-03-25T11:10:55Z",
        "name": "APPLE",
        "symbol": "AAPL.US",
        "open": 121.10,
        "high": 123.66,
        "low": 122,
        "close": 122
      }
    ]` 
    

#### Statistics (Super User Only)

-   **Endpoint:** `GET /stats`
    
-   **Description:** Retrieves the top 5 most requested stocks.
    
-   **Response Body Example:**
    
    `[
      { "stock": "AAPL.US", "times_requested": 5 },
      { "stock": "MSFT.US", "times_requested": 2 }
    ]` 
    

#### Password Reset

-   **Endpoint:** `POST /reset-password`
    
-   **Description:** Resets the user's password and sends the new password via email.
    
-   **Request Body:**
    
    `{
      "email": "brucewayne@batman.com"
    }` 

### Running Tests

To run the unit and integration tests:

1.  Ensure the services are running.
    
2.  Execute the tests using npm:
    
    `cd api-service
    npm test`
    
    `cd ../stock-service
    npm test` 
    

### Swagger Documentation

The API documentation is available at `http://localhost:3003/api-docs` once the services are running.