
import { useEffect, useState } from 'react';
import { getRandomRecipes, Recipe } from '@/services/recipeApi';
import { RecipeCard } from '@/components/RecipeCard';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bone, Coffee, Drumstick, Fish, Pizza, Salad, Search, Soup } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CATEGORIES = [
  { id: 'all', label: 'All', icon: Pizza },
  { id: 'main', label: 'Main', icon: Drumstick },
  { id: 'salad', label: 'Salads', icon: Salad },
  { id: 'soup', label: 'Soups', icon: Soup },
  { id: 'seafood', label: 'Seafood', icon: Fish },
  { id: 'dessert', label: 'Desserts', icon: Coffee },
  { id: 'snack', label: 'Snacks', icon: Bone },
];

export default function Index() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [featured, setFeatured] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      const allRecipes = await getRandomRecipes(12);
      setRecipes(allRecipes);
      
      // Set a random recipe as featured
      const randomIndex = Math.floor(Math.random() * allRecipes.length);
      setFeatured(allRecipes[randomIndex]);
      
      setLoading(false);
    };

    fetchRecipes();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pb-12">
        {/* Top search bar */}
        <div className="sticky top-0 z-30 bg-background/80 backdrop-blur-sm border-b border-border shadow-sm">
          <div className="recipe-container flex justify-between items-center py-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-muted-foreground" />
              </div>
              <input
                type="text"
                placeholder="Search recipes..."
                className="pl-10 px-4 py-2 w-full md:w-72 bg-background border border-border rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            
            <Tabs defaultValue="all" className="w-auto" onValueChange={setActiveCategory}>
              <TabsList className="hide-scrollbar overflow-x-auto flex w-auto h-auto bg-transparent space-x-1 p-0">
                {CATEGORIES.map((category) => {
                  const Icon = category.icon;
                  return (
                    <TabsTrigger
                      key={category.id}
                      value={category.id}
                      className="recipe-tab-trigger data-[state=active]:bg-primary data-[state=active]:text-white"
                    >
                      <Icon size={14} className="mr-1" />
                      {category.label}
                    </TabsTrigger>
                  );
                })}
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* Main recipe grid */}
        <div className="recipe-container mt-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Featured recipe */}
            {featured && !loading && (
              <div className="md:col-span-5 lg:col-span-4 xl:col-span-3">
                <div className="sticky top-24">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h2 className="font-display text-2xl font-bold mb-4 flex items-center">
                      <span className="recipe-highlight">Today's Pick</span>
                    </h2>
                    <RecipeCard recipe={featured} featured />
                  </motion.div>
                </div>
              </div>
            )}
            
            {/* Recipe grid */}
            <div className={`${featured ? 'md:col-span-7 lg:col-span-8 xl:col-span-9' : 'md:col-span-12'}`}>
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-display text-2xl font-bold">
                  {activeCategory === 'all' ? 'All Recipes' : `${CATEGORIES.find(c => c.id === activeCategory)?.label}`}
                </h2>
                
                <Button variant="ghost" size="sm" className="text-sm">
                  View all recipes
                </Button>
              </div>

              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="bg-muted animate-pulse rounded-xl aspect-[3/4]"></div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recipes.map((recipe, index) => (
                    <RecipeCard key={recipe.id} recipe={recipe} index={index} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
