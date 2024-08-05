const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./schemas/typeDefs');
const resolvers = require('./schemas/resolvers');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors');
const { authMiddleware } = require('./middleware/authMiddleware');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
        const token = req.headers.authorization || '';
        const user = authMiddleware(token);
        return { user };
    },
});

server.start()
    .then(() => {
        server.applyMiddleware({ app });

        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}${server.graphqlPath}`);
        });
    });