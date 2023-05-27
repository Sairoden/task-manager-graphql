const typeDefs = `#graphql
  type Query {
    getAllTasks: [Task],
    getTask(id: ID!): Task,
  }

  type Character {
    firstName: String,
    lastName: String
  }

  type Mutation {
    createTask(name: String!, completed: Boolean): Task,
    updateTask(id: ID!, name: String, completed: Boolean): Task,
    deleteTask(id: ID!): Task
  }

  type Task {
    id: ID
    name: String!
    completed: Boolean
  }
`;

module.exports = typeDefs;
