// Apollo Server
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const app = require("./app");

// Graphql
const typeDefs = require("./graphql/typeDefs");
const Query = require("./graphql/resolvers/Query");
const Mutation = require("./graphql/resolvers/Mutation");

// Mongoose
const mongoose = require("mongoose");

const startApolloServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers: {
      Query,
      Mutation,
    },
  });

  await server.start();

  app.use("/graphql", expressMiddleware(server));
};

mongoose
  .connect("mongodb://127.0.0.1:27017/tasks")
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log(err));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  startApolloServer();
  console.log(`Listening on PORT: ${PORT}`);
});

// 32 ka na
