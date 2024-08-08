const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./schemas/typeDefs');
const resolvers = require('./schemas/resolvers');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors');
const authMiddleware = require('./middleware/authMiddleware');
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT;

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, '../client/public')));

// Logging middleware to log each request
app.use((req, res, next) => {
    console.log(`Received request for ${req.url}`);
    next();
});

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
        const token = req.headers.authorization || '';
        const user = await authMiddleware(token);
        console.log('User in context:', user);
        return { user };
    },
});

server.start()
    .then(() => {
        server.applyMiddleware({ app });

        app.use(express.static(path.join(__dirname, '../client/dist')));

        // Handle API route for fetching recipes
        app.get('/recipes', async (req, res) => {
            try {
                const recipes = await Recipe.find().populate('author', 'username');
                res.status(200).json(recipes);
            } catch (err) {
                console.error('Error fetching recipes:', err);
                res.status(500).json({ message: 'Error fetching recipes' });
            }
        });

        // The "catchall" handler: for any request that doesn't match one above, send back React's index.html file.
        app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, '../client/dist/index.html'));
        });

        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}${server.graphqlPath}`);
        });
    });
