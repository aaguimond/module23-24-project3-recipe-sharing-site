<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#link-to-deployed-application">Link to Deployed Application</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project
Recipe Sharing (The Charcuterie Board) Demo

![Recipe Sharing (The Charcuterie Board) Demo](/assets/weatherDashboardDemo.gif)

The Recipe Sharing App is a web application that allows users to share their favorite recipes, browse through others' recipes, and leave reviews. It is built using the MERN stack (MongoDB, Express.js, React, and Node.js) and utilizes GraphQL for data querying and mutations.

Features:
- User authentication (registration and login)
- Recipe submission with images and detailed steps
- Search and filter recipes by ingredients or categories
- Rating and review system for recipes
- Personal collections for saving favorite recipes

Technologies Used:
- Frontend: React, Apollo Client
- Backend: Node.js, Express.js, GraphQL, Apollo Server, MongoDB, Mongoose
- Authentication: JSON Web Tokens (JWT), bcrypt
- Styling: CSS-in-JS with styled-components (optional)

Deployment: 
- Render
- MongoDB Atlas

<!-- GETTING STARTED -->
## Getting Started

Please follow these steps if you'd like to clone the repo so you can can see the files yourself

### Prerequisites

Please have a GitHub account and set up your SSH key so you may git pull the latest changes to the repository. It's
reccomended to install Visual Studio code as well.

### Installation

1. Clone the repository:
   ```sh
   git clone git@github.com:aaguimond/module23-24-project3-recipe-sharing-site.git
   ```
2. Install dependencies for both backend and frontend:
   ```sh
    cd recipe-sharing-app
    npm install
    cd frontend
    npm install
   ```
3. Create a .env file in the root directory and add your MongoDB connection string and JWT secret:
   ```sh
    MONGODB_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret
   ```
4. Run the backend server:
   ```sh
    cd backend
    npm run dev
   ```
5. Run the frontend development server:
   ```sh
    cd frontend
    npm start
   ``` 

<!-- USAGE EXAMPLES -->
## Link to Deployed Application

_Here is a link to our [Deployed Site](https://stvrmrz.github.io/Challenge-06-Weather-Dashboard/)_

<!-- ROADMAP -->
## Roadmap

GIVEN a weather dashboard with form inputs
- [x] WHEN I search for a city
      THEN I am presented with current and future conditions for that city and that city is added to the search history
- [x] WHEN I view current weather conditions for that city
      THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed
- [x] WHEN I view future weather conditions for that city
      THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
- [x] WHEN I click on a city in the search history
      THEN I am again presented with current and future conditions for that city

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<!-- CONTACT -->
## Contacts

Steve Ramirez - stevearamirez@gmail.com
Aidan Guimond - 
Sam Kachergius - skachergius@gmail.com

Project Link: [https://github.com/aaguimond/module23-24-project3-recipe-sharing-site](https://github.com/aaguimond/module23-24-project3-recipe-sharing-site)

<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

Here are some of the resources that I used that I want to give credit to:

* [othneildrew Best-README-Template](https://github.com/othneildrew/Best-README-Template)
* [BCS Support Tutor](https://2u-20.wistia.com/medias/trfd1jx6o2)
* [coding boot camp](https://coding-boot-camp.github.io/full-stack/apis/how-to-use-api-keys)
* [AskBCS Learning Assistant]