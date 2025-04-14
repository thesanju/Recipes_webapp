import axios from 'axios';

// This is a placeholder API key - in a real application you would use an environment variable
const API_KEY = 'a44d3fbe00bd4baea2f5d9ecc4d1de19';
const BASE_URL = 'https://api.spoonacular.com';

export interface Recipe {
  id: number;
  title: string;
  image: string;
  imageType: string;
  readyInMinutes: number;
  servings: number;
  summary: string;
}

export interface RecipeDetail extends Recipe {
  instructions: string;
  extendedIngredients: Ingredient[];
  analyzedInstructions: AnalyzedInstruction[];
}

export interface Ingredient {
  id: number;
  name: string;
  amount: number;
  unit: string;
  originalString: string;
}

export interface AnalyzedInstruction {
  name: string;
  steps: InstructionStep[];
}

export interface InstructionStep {
  number: number;
  step: string;
  ingredients: { id: number; name: string; image: string }[];
  equipment: { id: number; name: string; image: string }[];
}

// Expanded dummy data for when API calls fail
const dummyRecipes: Recipe[] = [
  {
    id: 1,
    title: "Spaghetti Carbonara",
    image: "https://images.unsplash.com/photo-1588013273468-315fd88ea34c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    imageType: "jpg",
    readyInMinutes: 30,
    servings: 4,
    summary: "A classic Italian pasta dish with eggs, cheese, pancetta, and black pepper."
  },
  {
    id: 2,
    title: "Vegetable Curry",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    imageType: "jpg",
    readyInMinutes: 45,
    servings: 6,
    summary: "A flavorful vegetable curry with coconut milk and aromatic spices."
  },
  {
    id: 3,
    title: "Chocolate Chip Cookies",
    image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    imageType: "jpg",
    readyInMinutes: 25,
    servings: 24,
    summary: "Classic homemade chocolate chip cookies, chewy in the middle and crisp on the edges."
  },
  {
    id: 4,
    title: "Chicken Fajitas",
    image: "public/chicl.jpg",
    imageType: "jpg",
    readyInMinutes: 35,
    servings: 4,
    summary: "Sizzling chicken fajitas with bell peppers and onions, served with warm tortillas."
  },
  {
    id: 5,
    title: "Greek Salad",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    imageType: "jpg",
    readyInMinutes: 15,
    servings: 4,
    summary: "Fresh Greek salad with tomatoes, cucumbers, olives, and feta cheese."
  },
  {
    id: 6,
    title: "Beef Stir Fry",
    image: "public/beef.jpg",
    imageType: "jpg",
    readyInMinutes: 25,
    servings: 4,
    summary: "Quick and easy beef stir fry with colorful vegetables and savory sauce."
  },
  {
    id: 7,
    title: "Banana Bread",
    image: "public/banana.webp",
    imageType: "jpg",
    readyInMinutes: 60,
    servings: 10,
    summary: "Moist and delicious banana bread, perfect for using up overripe bananas."
  },
  {
    id: 8,
    title: "Mushroom Risotto",
    image: "https://images.unsplash.com/photo-1541516160071-4bb0c5af65ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    imageType: "jpg",
    readyInMinutes: 40,
    servings: 4,
    summary: "Creamy mushroom risotto with Arborio rice and freshly grated Parmesan cheese."
  },
  {
    id: 9,
    title: "Homemade Pizza",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    imageType: "jpg",
    readyInMinutes: 45,
    servings: 4,
    summary: "Delicious homemade pizza with your favorite toppings on a crispy crust."
  },
  {
    id: 10,
    title: "Strawberry Smoothie",
    image: "public/str.jpg",
    imageType: "jpg",
    readyInMinutes: 5,
    servings: 2,
    summary: "Refreshing strawberry smoothie with yogurt and honey."
  },
  {
    id: 11,
    title: "Lasagna",
    image: "https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    imageType: "jpg",
    readyInMinutes: 90,
    servings: 8,
    summary: "Classic Italian lasagna with layers of pasta, meat sauce, and cheese."
  },
  {
    id: 12,
    title: "Avocado Toast",
    image: "public/ava.jpg",
    imageType: "jpg",
    readyInMinutes: 10,
    servings: 2,
    summary: "Simple and nutritious avocado toast with various toppings."
  },
  {
    id: 13,
    title: "Grilled Salmon with Asparagus",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    imageType: "jpg",
    readyInMinutes: 25,
    servings: 2,
    summary: "Perfectly grilled salmon filets with fresh asparagus, lemon, and herbs."
  },
  {
    id: 14,
    title: "Beef Tacos",
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    imageType: "jpg",
    readyInMinutes: 30,
    servings: 4,
    summary: "Savory ground beef tacos with fresh toppings and warm tortillas."
  },
  {
    id: 15,
    title: "Mushroom Soup",
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    imageType: "jpg",
    readyInMinutes: 35,
    servings: 6,
    summary: "Creamy mushroom soup with herbs and a touch of white wine."
  },
  {
    id: 16,
    title: "Caprese Salad",
    image: "https://images.unsplash.com/photo-1498579687545-d5a4fffb0a9e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    imageType: "jpg",
    readyInMinutes: 10,
    servings: 4,
    summary: "Classic Italian Caprese salad with ripe tomatoes, fresh mozzarella, and basil."
  },
  {
    id: 17,
    title: "Chicken Parmesan",
    image: "https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    imageType: "jpg",
    readyInMinutes: 45,
    servings: 4,
    summary: "Breaded chicken cutlets topped with marinara sauce and melted mozzarella."
  },
  {
    id: 18,
    title: "Vegetable Stir Fry",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    imageType: "jpg",
    readyInMinutes: 20,
    servings: 4,
    summary: "Quick and colorful vegetable stir fry with a savory soy sauce."
  },
  {
    id: 19,
    title: "Blueberry Pancakes",
    image: "https://images.unsplash.com/photo-1506084868230-bb9d95c24759?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    imageType: "jpg",
    readyInMinutes: 20,
    servings: 4,
    summary: "Fluffy pancakes studded with fresh blueberries and drizzled with maple syrup."
  },
  {
    id: 20,
    title: "Beef Stew",
    image: "https://images.unsplash.com/photo-1608500218890-c4a9464560a3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    imageType: "jpg",
    readyInMinutes: 120,
    servings: 6,
    summary: "Hearty beef stew with vegetables and herbs, slow-cooked to perfection."
  },
  {
    id: 21,
    title: "Fish Tacos",
    image: "https://images.unsplash.com/photo-1562967915-92ae0c330dde?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    imageType: "jpg",
    readyInMinutes: 25,
    servings: 4,
    summary: "Fresh fish tacos with cabbage slaw, avocado, and lime crema."
  },
  {
    id: 22,
    title: "Pad Thai",
    image: "https://images.unsplash.com/photo-1559314809-0d155014e29e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    imageType: "jpg",
    readyInMinutes: 30,
    servings: 4,
    summary: "Classic Thai noodle dish with peanuts, bean sprouts, and tamarind sauce."
  },
  {
    id: 23,
    title: "Roast Chicken",
    image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    imageType: "jpg",
    readyInMinutes: 90,
    servings: 6,
    summary: "Simple and delicious whole roast chicken with herbs and lemon."
  },
  {
    id: 24,
    title: "Tiramisu",
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    imageType: "jpg",
    readyInMinutes: 30,
    servings: 8,
    summary: "Classic Italian dessert with layers of coffee-soaked ladyfingers and mascarpone cream."
  },
  {
    id: 25,
    title: "Garlic Breadsticks",
    image: "https://images.unsplash.com/photo-1619535860434-cf9b542b0c19?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    imageType: "jpg",
    readyInMinutes: 25,
    servings: 8,
    summary: "Warm and buttery garlic breadsticks, perfect alongside pasta or soup."
  },
  {
    id: 26,
    title: "French Onion Soup",
    image: "https://images.unsplash.com/photo-1582576163090-08196c847050?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    imageType: "jpg",
    readyInMinutes: 60,
    servings: 4,
    summary: "Rich and flavorful onion soup topped with crusty bread and melted cheese."
  },
  {
    id: 27,
    title: "Mango Sticky Rice",
    image: "https://images.unsplash.com/photo-1621236471704-25d8c6c3380f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    imageType: "jpg",
    readyInMinutes: 40,
    servings: 4,
    summary: "Sweet Thai dessert with glutinous rice, coconut milk, and fresh mango."
  },
  {
    id: 28,
    title: "Chicken Alfredo",
    image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    imageType: "jpg",
    readyInMinutes: 30,
    servings: 4,
    summary: "Creamy Alfredo pasta with grilled chicken and Parmesan cheese."
  },
  {
    id: 29,
    title: "Tomato Soup",
    image: "https://images.unsplash.com/photo-1578020190125-f4f7c18bc9cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    imageType: "jpg",
    readyInMinutes: 25,
    servings: 4,
    summary: "Comforting tomato soup with a touch of cream and fresh basil."
  },
  {
    id: 30,
    title: "Caesar Salad",
    image: "https://images.unsplash.com/photo-1550304041-d8d9f4e4e7f7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    imageType: "jpg",
    readyInMinutes: 15,
    servings: 4,
    summary: "Classic Caesar salad with crisp romaine, Parmesan, croutons, and Caesar dressing."
  },
  {
    id: 31,
    title: "Beef Bulgogi",
    image: "https://images.unsplash.com/photo-1583952336763-467a047d12a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    imageType: "jpg",
    readyInMinutes: 35,
    servings: 4,
    summary: "Korean marinated beef with a sweet and savory flavor, served with rice."
  },
  {
    id: 32,
    title: "Pumpkin Pie",
    image: "https://images.unsplash.com/photo-1570275239925-4af0aa11e6fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    imageType: "jpg",
    readyInMinutes: 70,
    servings: 8,
    summary: "Traditional pumpkin pie with warm spices in a flaky crust."
  },
  {
    id: 33,
    title: "Falafel Wrap",
    image: "https://images.unsplash.com/photo-1530469912745-a215c6b256ea?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    imageType: "jpg",
    readyInMinutes: 30,
    servings: 4,
    summary: "Crispy falafel wrapped in warm pita with tahini sauce and vegetables."
  },
  {
    id: 34,
    title: "Grilled Cheese Sandwich",
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    imageType: "jpg",
    readyInMinutes: 15,
    servings: 1,
    summary: "Classic grilled cheese sandwich with melted cheese on golden toasted bread."
  },
  {
    id: 35,
    title: "Chocolate Mousse",
    image: "https://images.unsplash.com/photo-1511715112108-9acc5fa7a8de?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    imageType: "jpg",
    readyInMinutes: 15,
    servings: 4,
    summary: "Light and airy chocolate mousse with a rich chocolate flavor."
  },
  {
    id: 36,
    title: "Vegetable Biryani",
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    imageType: "jpg",
    readyInMinutes: 45,
    servings: 6,
    summary: "Aromatic Indian rice dish with vegetables, spices, and herbs."
  }
];

// Dummy recipe detail
const dummyRecipeDetail: RecipeDetail = {
  id: 1,
  title: "Spaghetti Carbonara",
  image: "https://images.unsplash.com/photo-1588013273468-315fd88ea34c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  imageType: "jpg",
  readyInMinutes: 30,
  servings: 4,
  summary: "Spaghetti Carbonara is a classic Italian pasta dish from Rome made with eggs, hard cheese, cured pork, and black pepper. It's simple to make with just a few ingredients yet full of flavor.",
  instructions: "Bring a large pot of salted water to boil and cook spaghetti according to package directions until al dente. Meanwhile, heat olive oil in a large skillet over medium heat. Add pancetta and cook until crispy. In a bowl, whisk together eggs, cheese, and pepper. Drain pasta, reserving 1/2 cup of pasta water. Immediately add hot pasta to the skillet with pancetta. Remove from heat and quickly pour in egg mixture, stirring constantly. Add pasta water as needed to create a creamy sauce. Serve immediately with extra cheese and freshly ground black pepper.",
  extendedIngredients: [
    { id: 1, name: "spaghetti", amount: 1, unit: "pound", originalString: "1 pound spaghetti" },
    { id: 2, name: "pancetta", amount: 8, unit: "ounces", originalString: "8 ounces diced pancetta" },
    { id: 3, name: "eggs", amount: 4, unit: "", originalString: "4 large eggs" },
    { id: 4, name: "Parmesan cheese", amount: 1, unit: "cup", originalString: "1 cup grated Parmesan cheese" },
    { id: 5, name: "black pepper", amount: 1, unit: "teaspoon", originalString: "1 teaspoon freshly ground black pepper" },
    { id: 6, name: "olive oil", amount: 2, unit: "tablespoons", originalString: "2 tablespoons olive oil" }
  ],
  analyzedInstructions: [
    {
      name: "",
      steps: [
        {
          number: 1,
          step: "Bring a large pot of salted water to boil.",
          ingredients: [{ id: 101, name: "water", image: "" }],
          equipment: [{ id: 201, name: "pot", image: "" }]
        },
        {
          number: 2,
          step: "Cook spaghetti according to package directions until al dente.",
          ingredients: [{ id: 1, name: "spaghetti", image: "" }],
          equipment: []
        },
        {
          number: 3,
          step: "Meanwhile, heat olive oil in a large skillet over medium heat.",
          ingredients: [{ id: 6, name: "olive oil", image: "" }],
          equipment: [{ id: 202, name: "skillet", image: "" }]
        },
        {
          number: 4,
          step: "Add pancetta and cook until crispy.",
          ingredients: [{ id: 2, name: "pancetta", image: "" }],
          equipment: []
        },
        {
          number: 5,
          step: "In a bowl, whisk together eggs, cheese, and pepper.",
          ingredients: [
            { id: 3, name: "eggs", image: "" },
            { id: 4, name: "Parmesan cheese", image: "" },
            { id: 5, name: "black pepper", image: "" }
          ],
          equipment: [{ id: 203, name: "bowl", image: "" }]
        },
        {
          number: 6,
          step: "Drain pasta, reserving 1/2 cup of pasta water.",
          ingredients: [],
          equipment: []
        },
        {
          number: 7,
          step: "Immediately add hot pasta to the skillet with pancetta.",
          ingredients: [],
          equipment: [{ id: 202, name: "skillet", image: "" }]
        },
        {
          number: 8,
          step: "Remove from heat and quickly pour in egg mixture, stirring constantly.",
          ingredients: [],
          equipment: []
        },
        {
          number: 9,
          step: "Add pasta water as needed to create a creamy sauce.",
          ingredients: [{ id: 101, name: "water", image: "" }],
          equipment: []
        },
        {
          number: 10,
          step: "Serve immediately with extra cheese and freshly ground black pepper.",
          ingredients: [
            { id: 4, name: "Parmesan cheese", image: "" },
            { id: 5, name: "black pepper", image: "" }
          ],
          equipment: []
        }
      ]
    }
  ]
};

// Function to generate more detailed dummy recipe data
function generateDummyRecipeDetail(recipe: Recipe): RecipeDetail {
  const cuisines = ['Italian', 'Mexican', 'Asian', 'American', 'Mediterranean', 'Indian', 'French', 'Thai'];
  const dishTypes = ['main course', 'breakfast', 'dessert', 'appetizer', 'salad', 'soup', 'snack', 'side dish'];
  const randomCuisine = cuisines[Math.floor(Math.random() * cuisines.length)];
  const randomDishType = dishTypes[Math.floor(Math.random() * dishTypes.length)];
  
  // Generate random ingredients based on recipe ID to ensure consistency
  const ingredientCount = 3 + (recipe.id % 7); // Between 3-9 ingredients
  const ingredients: Ingredient[] = [];
  
  const commonIngredients = [
    { name: "salt", unit: "teaspoon" },
    { name: "pepper", unit: "teaspoon" },
    { name: "olive oil", unit: "tablespoon" },
    { name: "garlic", unit: "clove" },
    { name: "onion", unit: "medium" },
    { name: "butter", unit: "tablespoon" },
    { name: "flour", unit: "cup" },
    { name: "milk", unit: "cup" },
    { name: "eggs", unit: "" },
    { name: "chicken broth", unit: "cup" },
    { name: "tomatoes", unit: "" },
    { name: "carrots", unit: "" },
    { name: "potatoes", unit: "" },
    { name: "rice", unit: "cup" },
    { name: "pasta", unit: "ounce" },
    { name: "cheese", unit: "cup" },
    { name: "basil", unit: "tablespoon" },
    { name: "thyme", unit: "teaspoon" },
    { name: "rosemary", unit: "sprig" },
    { name: "lemon", unit: "" }
  ];
  
  // Main ingredient based on title
  ingredients.push({
    id: 1000 + recipe.id,
    name: recipe.title.toLowerCase().split(' ')[0],
    amount: 1 + (recipe.id % 3),
    unit: recipe.title.includes("Soup") ? "cup" : recipe.title.includes("Salad") ? "cup" : "pound",
    originalString: `${1 + (recipe.id % 3)} ${recipe.title.includes("Soup") ? "cup" : recipe.title.includes("Salad") ? "cup" : "pound"} ${recipe.title.toLowerCase().split(' ')[0]}`
  });
  
  // Add random ingredients (with consistent randomness based on recipe ID)
  for (let i = 0; i < ingredientCount; i++) {
    const seedIndex = (recipe.id + i) % commonIngredients.length;
    const ingredient = commonIngredients[seedIndex];
    
    ingredients.push({
      id: 100 + i,
      name: ingredient.name,
      amount: (recipe.id + i) % 5 + 0.5,
      unit: ingredient.unit,
      originalString: `${(recipe.id + i) % 5 + 0.5} ${ingredient.unit} ${ingredient.name}`
    });
  }
  
  // Generate instruction steps
  const stepCount = 3 + (recipe.id % 5); // Between 3-7 steps
  const steps: InstructionStep[] = [];
  
  const commonSteps = [
    "Preheat the oven to 350°F (175°C).",
    "Heat oil in a large skillet over medium heat.",
    "Chop all vegetables into small pieces.",
    "Mix all ingredients in a large bowl.",
    "Bring water to a boil in a large pot.",
    "Season with salt and pepper to taste.",
    "Cook until golden brown, about 5 minutes per side.",
    "Bake for 30 minutes or until cooked through.",
    "Let rest for 5 minutes before serving.",
    "Garnish with fresh herbs before serving."
  ];
  
  // Create steps with consistent randomness based on recipe ID
  for (let i = 0; i < stepCount; i++) {
    const stepIndex = (recipe.id + i) % commonSteps.length;
    const stepIngredients = [];
    const stepEquipment = [];
    
    // Add 1-2 ingredients to this step
    for (let j = 0; j < (1 + (recipe.id + i) % 2); j++) {
      if (ingredients[j % ingredients.length]) {
        stepIngredients.push({
          id: 100 + j,
          name: ingredients[j % ingredients.length].name,
          image: ""
        });
      }
    }
    
    // Add equipment
    const equipmentNames = ["pan", "pot", "bowl", "oven", "knife", "cutting board", "whisk"];
    stepEquipment.push({
      id: 200 + i,
      name: equipmentNames[(recipe.id + i) % equipmentNames.length],
      image: ""
    });
    
    steps.push({
      number: i + 1,
      step: i === 0 ? `First, ${commonSteps[stepIndex].toLowerCase()}` : 
             i === stepCount - 1 ? `Finally, ${commonSteps[stepIndex].toLowerCase()}` : 
             commonSteps[stepIndex],
      ingredients: stepIngredients,
      equipment: stepEquipment
    });
  }
  
  return {
    ...recipe,
    instructions: steps.map(s => s.step).join(" "),
    extendedIngredients: ingredients,
    analyzedInstructions: [{
      name: "",
      steps: steps
    }]
  };
}

export const getRandomRecipes = async (number = 12): Promise<Recipe[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/recipes/random`, {
      params: {
        apiKey: API_KEY,
        number,
      },
    });
    return response.data.recipes;
  } catch (error) {
    console.error('Error fetching random recipes:', error);
    console.log('Returning dummy recipes instead');
    
    // If we have fewer dummy recipes than requested, let's duplicate and modify some
    if (dummyRecipes.length < number) {
      const extendedRecipes = [...dummyRecipes];
      
      while (extendedRecipes.length < number) {
        // Take a random recipe and modify it slightly to create a new one
        const baseRecipe = dummyRecipes[Math.floor(Math.random() * dummyRecipes.length)];
        const newId = extendedRecipes.length + 100;
        const variations = ['Spicy', 'Vegan', 'Quick', 'Homestyle', 'Gourmet', 'Easy', 'Classic'];
        const variation = variations[Math.floor(Math.random() * variations.length)];
        
        extendedRecipes.push({
          ...baseRecipe,
          id: newId,
          title: `${variation} ${baseRecipe.title}`,
          readyInMinutes: baseRecipe.readyInMinutes + (newId % 15),
          servings: baseRecipe.servings + (newId % 3) - 1
        });
      }
      
      return extendedRecipes.slice(0, number);
    }
    
    // Return a slice of dummy recipes based on the requested number
    return dummyRecipes.slice(0, number);
  }
};

export async function getRecipeById(id: number): Promise<RecipeDetail> {
  try {
    console.log(`Fetching recipe with ID: ${id}`);
    
    // Try to fetch from API
    try {
      const response = await axios.get(`${BASE_URL}/recipes/${id}/information`, {
        params: {
          apiKey: API_KEY,
          includeNutrition: false,
        },
      });
      return response.data;
    } catch (apiError) {
      console.error('API error, falling back to dummy data:', apiError);
      
      // Find the recipe in our dummy data
      const dummyRecipe = dummyRecipes.find(recipe => recipe.id === id);
      
      if (dummyRecipe) {
        // Return full detail for the matching dummy recipe
        const recipeDetail = generateDummyRecipeDetail(dummyRecipe);
        
        // Preserve the original image path
        recipeDetail.image = dummyRecipe.image;
        
        return recipeDetail;
      }
      
      // If we can't find that specific ID, return the default dummy recipe with modified ID
      return {
        ...dummyRecipeDetail,
        id: id,
        title: `Recipe ${id}`,
        image: `https://picsum.photos/seed/${id}/500/500`,
      };
    }
  } catch (error) {
    console.error("Error fetching recipe:", error);
    // Return default dummy recipe to avoid white screen
    return dummyRecipeDetail;
  }
}

export const searchRecipes = async (query: string, number = 10): Promise<Recipe[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/recipes/complexSearch`, {
      params: {
        apiKey: API_KEY,
        query,
        number,
        addRecipeInformation: true,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error searching recipes:', error);
    console.log('Returning filtered dummy recipes instead');
    
    // Return filtered dummy recipes that match the query
    const filteredRecipes = dummyRecipes.filter(recipe => 
      recipe.title.toLowerCase().includes(query.toLowerCase()) || 
      recipe.summary.toLowerCase().includes(query.toLowerCase())
    );
    
    return filteredRecipes.slice(0, number);
  }
};