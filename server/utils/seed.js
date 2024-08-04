const mongoose = require('mongoose');
const User = require('../models/User');
const Recipe = require('../models/Recipe');
const bcrypt = require('bcryptjs');
const connectDB = require('../config/db')

const users = [
    {
        username: "jimmyd",
        email: "jimmyd@example.com",
        password: "password123"
    },
    {
        username: "janeyd",
        email: "janeyd@example.com",
        password: "password123"
    },
    {
        username: "jimbob",
        email: "jimbob@example.com",
        password: "password123"
    },
    {
        username: "robertbobert",
        email: "robertbobert@example.com",
        password: "password123"
    },
    {
        username: "foodfan4",
        email: "foodfan4@example.com",
        password: "password123"
    },
    {
        username: "chefgoldblum",
        email: "chefgoldblum@example.com",
        password: "password123"
    },
    {
        username: "sir_ieatalot",
        email: "sir_ieatalot@example.com",
        password: "password123"
    },
    {
        username: "cookincookies",
        email: "cookincookies@example.com",
        password: "password123"
    },
    {
        username: "burgerbuilder",
        email: "burgerbuilder@example.com",
        password: "password123"
    },
    {
        username: "criscodrinker",
        email: "criscodrinker@example.com",
        password: "password123"
    }
];

const recipes = [
    {
        title: "Spaghetti Carbonara",
        ingredients: [
            { name: "Spaghetti", quantity: "6oz" },
            { name: "Pancetta", quantity: "2oz" },
            { name: "Eggs", quantity: "2" },
            { name: "Parmesan cheese", quantity: "1/4 cup" },
            { name: "Black pepper", quantity: "to taste" },
            { name: "Salt", quantity: "to taste" },
        ],
        instructions: "Cook spaghetti according to directions on box. Fry the pancetta in a pan. Beat the eggs and cheese together. Save 1/2 cup of hot pasta water and drain pasta when it's finished cooking. Remove pancetta from heat once crispy and brown. Combine the pasta, pancetta, pepper, salt, and egg and cheese mixture. Add hot pasta water if the sauce is too thick. Enjoy!",
        author: "chefgoldblum"
    },
    {
        title: "Chicken Curry",
        ingredients: [
            { name: "Chicken", quantity: "500g" },
            { name: "Onion", quantity: "1" },
            { name: "Garlic", quantity: "3 cloves" },
            { name: "Ginger", quantity: "1 inch" },
            { name: "Tomatoes", quantity: "2" },
            { name: "Coconut Milk", quantity: "200ml" },
            { name: "Curry Powder", quantity: "2 tbsp" },
            { name: "Salt", quantity: "to taste" }
        ],
        instructions: "Saute onions, garlic, and ginger. Add chicken and cook. Add tomatoes and curry powder. Stir in coconut milk and simmer.",
        author: "sir_ieatalot"
    },
    {
        title: "Vegetable Stir Fry",
        ingredients: [
            { name: "Broccoli", quantity: "1 head" },
            { name: "Carrot", quantity: "2" },
            { name: "Bell Pepper", quantity: "1" },
            { name: "Soy Sauce", quantity: "3 tbsp" },
            { name: "Garlic", quantity: "2 cloves" },
            { name: "Olive Oil", quantity: "2 tbsp" },
            { name: "Salt", quantity: "to taste" },
            { name: "Black Pepper", quantity: "to taste" }
        ],
        instructions: "Chop vegetables. Heat oil in a pan and saute garlic. Add vegetables and stir fry. Add soy sauce, salt, and pepper.",
        author: "foodfan4"
    },
    {
        title: "Pancakes",
        ingredients: [
            { name: "Flour", quantity: "200g" },
            { name: "Milk", quantity: "300ml" },
            { name: "Egg", quantity: "1" },
            { name: "Sugar", quantity: "2 tbsp" },
            { name: "Baking Powder", quantity: "1 tbsp" },
            { name: "Salt", quantity: "1/2 tsp" }
        ],
        instructions: "Mix all ingredients to form a batter. Heat a pan and pour batter to form pancakes. Cook until golden brown.",
        author: "janeyd"
    },
    {
        title: "Beef Tacos",
        ingredients: [
            { name: "Ground Beef", quantity: "500g" },
            { name: "Taco Seasoning", quantity: "2 tbsp" },
            { name: "Tortillas", quantity: "8" },
            { name: "Lettuce", quantity: "1 cup, shredded" },
            { name: "Tomato", quantity: "1, diced" },
            { name: "Cheddar Cheese", quantity: "1 cup, shredded" },
            { name: "Sour Cream", quantity: "1/2 cup" },
            { name: "Salsa", quantity: "1/2 cup" }
        ],
        instructions: "Cook ground beef with taco seasoning. Warm tortillas. Assemble tacos with beef, lettuce, tomato, cheese, sour cream, and salsa.",
        author: "jimmyd"
    },
    {
        title: "Caesar Salad",
        ingredients: [
            { name: "Romaine Lettuce", quantity: "1 head" },
            { name: "Caesar Dressing", quantity: "1/2 cup" },
            { name: "Parmesan Cheese", quantity: "1/4 cup, grated" },
            { name: "Croutons", quantity: "1 cup" },
            { name: "Chicken Breast", quantity: "1, grilled and sliced" }
        ],
        instructions: "Chop lettuce. Toss with dressing, cheese, and croutons. Top with grilled chicken.",
        author: "jimbob"
    },
    {
        title: "Chocolate Chip Cookies",
        ingredients: [
            { name: "Butter", quantity: "1 cup" },
            { name: "Sugar", quantity: "1 cup" },
            { name: "Brown Sugar", quantity: "1 cup" },
            { name: "Eggs", quantity: "2" },
            { name: "Vanilla Extract", quantity: "2 tsp" },
            { name: "Flour", quantity: "3 cups" },
            { name: "Baking Soda", quantity: "1 tsp" },
            { name: "Salt", quantity: "1/2 tsp" },
            { name: "Chocolate Chips", quantity: "2 cups" }
        ],
        instructions: "Cream butter and sugars. Add eggs and vanilla. Mix in dry ingredients. Stir in chocolate chips. Drop by spoonfuls onto baking sheet. Bake at 350°F for 10-12 minutes.",
        author: "cookincookies"
    },
    {
        title: "Vegetable Soup",
        ingredients: [
            { name: "Carrot", quantity: "2, sliced" },
            { name: "Celery", quantity: "2 stalks, sliced" },
            { name: "Potato", quantity: "2, diced" },
            { name: "Onion", quantity: "1, diced" },
            { name: "Garlic", quantity: "2 cloves, minced" },
            { name: "Vegetable Broth", quantity: "4 cups" },
            { name: "Tomatoes", quantity: "2, diced" },
            { name: "Green Beans", quantity: "1 cup, chopped" },
            { name: "Salt", quantity: "to taste" },
            { name: "Black Pepper", quantity: "to taste" }
        ],
        instructions: "Saute onion and garlic. Add remaining vegetables and broth. Bring to a boil, then simmer until vegetables are tender. Season with salt and pepper.",
        author: "chefgoldblum"
    },
    {
        title: "Chicken Alfredo",
        ingredients: [
            { name: "Fettuccine", quantity: "200g" },
            { name: "Chicken Breast", quantity: "2, sliced" },
            { name: "Butter", quantity: "1/4 cup" },
            { name: "Heavy Cream", quantity: "1 cup" },
            { name: "Parmesan Cheese", quantity: "1 cup, grated" },
            { name: "Garlic", quantity: "2 cloves, minced" },
            { name: "Salt", quantity: "to taste" },
            { name: "Black Pepper", quantity: "to taste" }
        ],
        instructions: "Cook fettuccine. Saute chicken and garlic in butter. Add cream and cheese, stirring until thickened. Toss with pasta. Season with salt and pepper.",
        author: "chefgoldblum"
    },
    {
        title: "Mango Smoothie",
        ingredients: [
            { name: "Mango", quantity: "1, peeled and diced" },
            { name: "Banana", quantity: "1" },
            { name: "Greek Yogurt", quantity: "1/2 cup" },
            { name: "Orange Juice", quantity: "1 cup" },
            { name: "Honey", quantity: "1 tbsp" }
        ],
        instructions: "Blend all ingredients until smooth. Serve chilled.",
        author: "janeyd"
    },
    {
        title: "Shrimp Scampi",
        ingredients: [
            { name: "Shrimp", quantity: "500g" },
            { name: "Butter", quantity: "1/4 cup" },
            { name: "Garlic", quantity: "3 cloves, minced" },
            { name: "Lemon Juice", quantity: "1/4 cup" },
            { name: "White Wine", quantity: "1/4 cup" },
            { name: "Parsley", quantity: "2 tbsp, chopped" },
            { name: "Spaghetti", quantity: "200g" },
            { name: "Salt", quantity: "to taste" },
            { name: "Black Pepper", quantity: "to taste" }
        ],
        instructions: "Cook spaghetti. Saute garlic in butter. Add shrimp, lemon juice, and wine. Cook until shrimp is done. Toss with pasta and parsley. Season with salt and pepper.",
        author: "foodfan4"
    },
    {
        title: "BBQ Chicken Pizza",
        ingredients: [
            { name: "Pizza Dough", quantity: "1" },
            { name: "BBQ Sauce", quantity: "1/2 cup" },
            { name: "Chicken Breast", quantity: "1, cooked and shredded" },
            { name: "Mozzarella Cheese", quantity: "1 cup, shredded" },
            { name: "Red Onion", quantity: "1/2, thinly sliced" },
            { name: "Cilantro", quantity: "2 tbsp, chopped" }
        ],
        instructions: "Roll out dough. Spread BBQ sauce over dough. Top with chicken, cheese, and onion. Bake at 425°F for 15-20 minutes. Sprinkle with cilantro.",
        author: "chefgoldblum"
    },
    {
        title: "Garlic Bread",
        ingredients: [
            { name: "Baguette", quantity: "1" },
            { name: "Butter", quantity: "1/2 cup, softened" },
            { name: "Garlic", quantity: "3 cloves, minced" },
            { name: "Parsley", quantity: "2 tbsp, chopped" },
            { name: "Parmesan Cheese", quantity: "1/4 cup, grated" }
        ],
        instructions: "Mix butter, garlic, parsley, and cheese. Spread on sliced baguette. Bake at 350°F for 10-15 minutes until golden.",
        author: "sir_ieatalot"
    },
    {
        title: "Blueberry Muffins",
        ingredients: [
            { name: "Flour", quantity: "2 cups" },
            { name: "Sugar", quantity: "1 cup" },
            { name: "Baking Powder", quantity: "2 tsp" },
            { name: "Salt", quantity: "1/2 tsp" },
            { name: "Egg", quantity: "1" },
            { name: "Milk", quantity: "1 cup" },
            { name: "Vegetable Oil", quantity: "1/4 cup" },
            { name: "Blueberries", quantity: "1 cup" }
        ],
        instructions: "Mix dry ingredients. Add egg, milk, and oil. Fold in blueberries. Spoon into muffin tin. Bake at 375°F for 20-25 minutes.",
        author: "foodfan4"
    },
    {
        title: "crisco",
        ingredients: [
            { name: "crisco", quantity: "1 cup" },
            { name: "crisco", quantity: "1 cup" }
        ],
        instructions: "add crisco to crisco. drink.",
        author: "criscodrinker"
    }
];

const seedDB = async () => {
    try {
        // connect to db
        await connectDB();

        // clear db of any previously seeded data
        await User.deleteMany({});
        await Recipe.deleteMany({});

        // create users in db with below function
        const userPromises = users.map(async (user) => {
            // hash passwords using bcrypt
            const hashedPassword = await bcrypt.hash(user.password, 10);
            return User.create({ ...user, password: hashedPassword });
        });

        // create users in db with above function
        const createdUsers = await Promise.all(userPromises);

        // mapping users to their IDs to use for the below recipe author seeding
        const userMap = createdUsers.reduce((accumulator, user) => {
            accumulator[user.username] = user._id;
            return accumulator;
        }, {});

        // create recipes in db with below function
        const recipePromises = recipes.map((recipe) => {
            return Recipe.create({ ...recipe, author: userMap[recipe.author] });
        });

        // create recipes in db with above function
        await Promise.all(recipePromises);

        // display that seeding was successful
        console.log('Database seeded successfully!');
        process.exit(0);

    // catching and displaying errors
    } catch (err) {
        console.error('Error seeding the database', err);
        process.exit(1);
    }
};

seedDB();