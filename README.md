Calorie Tracker API

This repository contains a Node.js-based RESTful API for tracking food calorie and nutritional profiles. The API leverages Express and MongoDB (via Mongoose) to provide endpoints that allow users to search for food items by name or category, track nutritional intake based on consumption, and add new food items to the database.

Features:

Search Functionality:
Supports partial and case-insensitive searches for food items, making it easier to find the right food even if the name isn't perfectly spelled.
Nutrient Tracking:
Scale nutritional values based on serving quantity and compare the results against recommended daily allowances (RDA).
Data Management:
Easily add new food items to the database, with a flexible schema supporting various nutritional metrics.
MongoDB Integration:
Uses MongoDB Atlas for storing and querying a large collection of food nutritional data.
Tech Stack:

Node.js & Express for the API server
MongoDB Atlas for the database
Mongoose for ODM
Getting Started:

Clone the repository.
Install dependencies using npm install.
Set up your environment variables (e.g., MONGODB_URI) in a .env file.
Run the API locally with node api/index.js to test the endpoints.
