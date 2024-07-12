Customer Support Automation
Overview

This project is a Customer Support Automation system designed to manage customer data and support tickets using Node.js, Express.js, MongoDB, GraphQL, and Dialogflow.
Features

    Customer Management: Add, update, view, and delete customer details.
    Ticket Management: Create, update, view, and delete support tickets.
    GraphQL Integration: Streamlines data querying and management with GraphQL endpoints.
    Dialogflow Integration: Enhances user interactions with AI-driven responses and automated support.

Technology Stack

    Backend: Node.js, Express.js
    Database: MongoDB
    API: GraphQL
    AI Integration: Dialogflow

Prerequisites

    Node.js
    MongoDB
    Dialogflow credentials

Installation

    Clone the repository:

    sh

git clone https://github.com/RachitSrivastava12/AutomateCustomer.git
cd AutomateCustomer/Backend

Install dependencies:

sh

npm install

Configure environment variables:

    Create a .env file in the Backend directory with the following content:

    env

    MONGODB_URI=your_mongodb_uri

    Place your Dialogflow credentials in Backend/dialogflowCredentials.json.

Start the server:

sh

    npm run dev

Usage
REST API Endpoints

    Customers:
        GET /api/customers: Get all customers.
        GET /api/customers/:id: Get a customer by ID.
        POST /api/customers: Create a new customer.
        PUT /api/customers/:id: Update a customer by ID.
        DELETE /api/customers/:id: Delete a customer by ID.

    Tickets:
        GET /api/tickets: Get all tickets.
        GET /api/tickets/:id: Get a ticket by ID.
        POST /api/tickets: Create a new ticket.
        PUT /api/tickets/:id: Update a ticket by ID.
        DELETE /api/tickets/:id: Delete a ticket by ID.

GraphQL API

    Endpoint: /graphql

    Queries:

    graphql

{
  customers {
    id
    name
    email
  }
  customer(id: ID!) {
    id
    name
    email
  }
  tickets {
    id
    customerId
    description
    status
  }
  ticket(id: ID!) {
    id
    customerId
    description
    status
  }
}

Mutations:

graphql

    mutation {
      addCustomer(name: String!, email: String!) {
        id
        name
        email
      }
      updateCustomer(id: ID!, name: String, email: String) {
        id
        name
        email
      }
      deleteCustomer(id: ID!) {
        id
      }
      addTicket(customerId: ID!, description: String!, status: String!) {
        id
        customerId
        description
        status
      }
      updateTicket(id: ID!, description: String, status: String) {
        id
        customerId
        description
        status
      }
      deleteTicket(id: ID!) {
        id
      }
    }

Dialogflow Integration

    Endpoint: /webhook
    Usage: Send a POST request with query and sessionId to receive AI-driven responses.

Testing

Test all endpoints using Postman for smooth API performance.
Contributing

Feel free to fork the repository and submit pull requests.
