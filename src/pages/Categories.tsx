
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RecipeCard } from "@/components/RecipeCard";
import { useEffect, useState } from "react";
import { Recipe, getRandomRecipes } from "@/services/recipeApi";
import { Button } from "@/components/ui/button";

export default function Categories() {
  const [categoriesData, setCategories] = useState<{ [key: string]: Recipe[] }>({
    "Breakfast": [],
    "Main Course": [],
    "Dessert": []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryRecipes = async () => {
      setLoading(true);
      
      // Get 4 recipes for each category
      const breakfast = await getRandomRecipes(4);
      const mainCourse = await getRandomRecipes(4);
      const dessert = await getRandomRecipes(4);
      
      setCategories({
        "Breakfast": breakfast,
        "Main Course": mainCourse,
        "Dessert": dessert
      });
      
      setLoading(false);
    };

    fetchCategoryRecipes();
  }, []);

  return (
    <>
      <Header />
      <main className="recipe-container py-16">
        <h1 className="font-display text-3xl md:text-4xl font-bold mb-6">Recipe Categories</h1>
        <p className="text-muted-foreground mb-12 max-w-2xl">
          Browse our recipes by category. From quick breakfasts to elaborate main courses and sweet desserts, 
          we have something delicious for every occasion.
        </p>

        {Object.entries(categoriesData).map(([category, recipes]) => (
          <section key={category} className="mb-16">
            <h2 className="font-display text-2xl font-bold mb-8 border-b pb-2">{category}</h2>
            
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 min-h-[300px]">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="bg-muted animate-pulse rounded-md aspect-square"></div>
                ))}
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {recipes.map((recipe) => (
                    <RecipeCard key={recipe.id} recipe={recipe} />
                  ))}
                </div>
                <div className="mt-6 text-right">
                  <Button variant="outline" size="sm">
                    See more {category.toLowerCase()} recipes
                  </Button>
                </div>
              </>
            )}
          </section>
        ))}
      </main>
      <Footer />
    </>
  );
}
