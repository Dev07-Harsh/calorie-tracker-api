# Calorie Tracker API

A RESTful API built with Node.js, Express, and MongoDB to track food calories and nutritional intake.

## Features

- **Search Foods**: Find food items by name or category with case-insensitive and partial matching.
- **Track Nutrients**: Calculate nutritional intake based on serving size and compare with recommended daily allowances (RDA).
- **Add New Foods**: Insert new food items into the database with detailed nutritional information.
- **MongoDB Integration**: Stores and queries food nutritional data using MongoDB Atlas.

## Tech Stack

- **Node.js & Express**: Backend server and API handling.
- **MongoDB & Mongoose**: Database and object data modeling.

## Getting Started

### Prerequisites

- **Node.js**
- **MongoDB Atlas Account**
- **Git**

### Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/Dev07-Harsh/calorie-tracker-api.git
   cd calorie-tracker-api
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Set Up Environment Variables:**

   - Create a `.env` file in the root directory:
     ```
     MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/food_db?retryWrites=true&w=majority
     ```
   - Replace `<username>` and `<password>` with your MongoDB Atlas credentials.

### Running the API Locally

Start the server:

```bash
node api/index.js
```

The API will be accessible at `http://localhost:3000`.

## API Endpoints

### Food Endpoints

- **GET /api/foods**: Retrieve all food items.
- **GET /api/search?q=**: Search food items by name or category.
- **POST /api/foods**: Add a new food item.
- **POST /api/track**: Track nutrient intake based on food consumption.

---

**Developed with ❤️ by [Harsh]**

