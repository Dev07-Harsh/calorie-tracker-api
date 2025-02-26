const express = require('express');
const mongoose = require('mongoose');
const app = express();


app.use(express.json());


mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on('error', err => console.error('MongoDB connection error:', err));
mongoose.connection.once('open', () => console.log('Connected to MongoDB'));


const foodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  serving_size: { type: String, required: true },
  calories: Number,
  protein: Number,
  carbohydrates: Number,
  fat: Number,
  fiber: Number,
  sugars: Number,
  sodium: Number,
  calcium: Number,
  iron: Number,
  vitamin_c: Number,
  potassium: Number
});

foodSchema.index({ name: 'text' });


const Food = mongoose.model('Food_Data', foodSchema, 'Food_nutrition');


const RDA = {
  calories: 2000,
  protein: 50,
  carbohydrates: 275,
  fat: 70,
  fiber: 30,
  sugars: 50,
  sodium: 2300,
  calcium: 1000,
  iron: 18,
  vitamin_c: 90,
  potassium: 3500
};


app.get('/api/foods', async (req, res) => {
  try {
    const foods = await Food.find({});
    res.json(foods);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching foods' });
  }
});


app.get('/api/search', async (req, res) => {
  try {
    const query = req.query.q;
    if (!query) return res.json(await Food.find({}));
    
 
    const regex = new RegExp(query, 'i');
    const results = await Food.find({
      $or: [
        { name: { $regex: regex } },
        { category: { $regex: regex } }
      ]
    });
    
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: 'Error searching food items' });
  }
});

app.post('/api/track', async (req, res) => {
  try {
    const { foodId, quantity } = req.body;
    if (!foodId || !quantity) {
      return res.status(400).json({ error: 'foodId and quantity are required' });
    }
    
    const food = await Food.findById(foodId);
    if (!food) {
      return res.status(404).json({ error: 'Food item not found' });
    }
    
  
    const nutrientKeys = ['calories', 'protein', 'carbohydrates', 'fat', 'fiber', 'sugars', 'sodium', 'calcium', 'iron', 'vitamin_c', 'potassium'];
    const scaledNutrients = {};
    nutrientKeys.forEach(key => {
      scaledNutrients[key] = (food[key] || 0) * quantity;
    });
    

    const nutrientComparison = {};
    nutrientKeys.forEach(key => {
      if (RDA[key]) {
        nutrientComparison[key] = {
          amount: scaledNutrients[key],
          RDA: RDA[key],
          percentage: ((scaledNutrients[key] / RDA[key]) * 100).toFixed(2)
        };
      } else {
        nutrientComparison[key] = {
          amount: scaledNutrients[key],
          RDA: null,
          percentage: null
        };
      }
    });
    
    res.json({
      food: food.name,
      quantity,
      scaledNutrients,
      nutrientComparison,
    });
  } catch (error) {
    res.status(500).json({ error: 'Error processing track request' });
  }
});


app.post('/api/foods', async (req, res) => {
  try {
    const { name, category, serving_size, calories, protein, carbohydrates, fat, fiber, sugars, sodium, calcium, iron, vitamin_c, potassium } = req.body;
    if (!name || !category || !serving_size) {
      return res.status(400).json({ error: 'name, category, and serving_size are required' });
    }
    
    const newFood = new Food({
      name,
      category,
      serving_size,
      calories,
      protein,
      carbohydrates,
      fat,
      fiber,
      sugars,
      sodium,
      calcium,
      iron,
      vitamin_c,
      potassium
    });
    const savedFood = await newFood.save();
    res.status(201).json(savedFood);
  } catch (error) {
    res.status(500).json({ error: 'Error adding new food item' });
  }
});

module.exports = app;
