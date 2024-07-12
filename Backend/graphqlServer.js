const { ApolloServer, gql } = require('apollo-server-express');
const Customer = require('./models/customerModel');
const Ticket = require('./models/ticketModel');

// The GraphQL schema
const typeDefs = gql`
  type Customer {
    id: ID!
    name: String!
    email: String!
  }

  type Ticket {
    id: ID!
    customerId: ID!
    description: String!
    status: String!
  }

  type Query {
    customers: [Customer]
    customer(id: ID!): Customer
    tickets: [Ticket]
    ticket(id: ID!): Ticket
  }

  type Mutation {
    addCustomer(name: String!, email: String!): Customer
    updateCustomer(id: ID!, name: String, email: String): Customer
    deleteCustomer(id: ID!): Boolean

    addTicket(customerId: ID!, description: String!, status: String!): Ticket
    updateTicket(id: ID!, description: String, status: String): Ticket
    deleteTicket(id: ID!): Boolean
  }
`;

// Define the resolvers
const resolvers = {
  Query: {
    customers: async () => await Customer.find(),
    customer: async (_, { id }) => await Customer.findById(id),
    tickets: async () => await Ticket.find(),
    ticket: async (_, { id }) => await Ticket.findById(id),
  },
  Mutation: {
    addCustomer: async (_, { name, email }) => {
      const customer = new Customer({ name, email });
      return await customer.save();
    },
    updateCustomer: async (_, { id, name, email }) => {
      return await Customer.findByIdAndUpdate(id, { name, email }, { new: true });
    },
    deleteCustomer: async (_, { id }) => {
      await Customer.findByIdAndDelete(id);
      return true;
    },
    addTicket: async (_, { customerId, description, status }) => {
      const ticket = new Ticket({ customerId, description, status });
      return await ticket.save();
    },
    updateTicket: async (_, { id, description, status }) => {
      return await Ticket.findByIdAndUpdate(id, { description, status }, { new: true });
    },
    deleteTicket: async (_, { id }) => {
      await Ticket.findByIdAndDelete(id);
      return true;
    },
  },
};

const apolloServer = new ApolloServer({ typeDefs, resolvers });

module.exports = apolloServer;
