import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getRecipeById, RecipeDetail as RecipeDetailType } from '@/services/recipeApi';
import { Clock, Users, Printer, Share2, Bookmark, Heart, ChefHat, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { RecipeImage } from '@/components/RecipeImage';

export default function RecipeDetail() {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<RecipeDetailType | null>(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const fetchRecipe = async () => {
      setLoading(true);
      if (id) {
        const data = await getRecipeById(parseInt(id));
        if (data) {
          setRecipe(data);
        }
      }
      setLoading(false);
    };

    fetchRecipe();
  }, [id]);

  if (loading) {
    return (
      <>
        <Header />
        <div className="recipe-container py-16 min-h-[50vh] flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading recipe...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!recipe) {
    return (
      <>
        <Header />
        <div className="recipe-container py-16 min-h-[50vh] flex items-center justify-center">
          <div className="text-center">
            <h2 className="font-display text-2xl mb-4">Recipe Not Found</h2>
            <p className="text-muted-foreground">The recipe you're looking for doesn't exist or has been removed.</p>
            <Button asChild className="mt-6">
              <a href="/">Back to Home</a>
            </Button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="bg-muted/30 min-h-screen">
        <Button 
          variant="ghost" 
          size="sm" 
          className="ml-4 mt-4 lg:ml-8 lg:mt-8" 
          asChild
        >
          <a href="/" className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft size={16} />
            <span>Back to recipes</span>
          </a>
        </Button>
        
        <main className="recipe-container py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left column - Hero image and info */}
            <motion.div 
              className="lg:col-span-7 lg:sticky lg:top-24 lg:self-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative">
                {/* Image with gradient overlay and decorative elements */}
                <div className="rounded-xl overflow-hidden shadow-lg relative">
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 via-transparent to-accent/20 mix-blend-overlay z-10 rounded-xl"></div>
                  
                  {/* Decorative circle */}
                  <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-accent/30 rounded-full blur-2xl"></div>
                  
                  <div className="h-[300px] sm:h-[400px] lg:h-[500px] w-full relative">
                    {recipe.image ? (
                      <RecipeImage
                        src={recipe.image}
                        alt={recipe.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-secondary flex items-center justify-center">
                        <ChefHat size={48} className="text-primary/40" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Quick action buttons */}
                <div className="flex justify-end -mt-16 relative z-20 mr-4">
                  <motion.button 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setLiked(!liked)}
                    className={cn(
                      "mr-2 w-12 h-12 rounded-full shadow-lg flex items-center justify-center bg-white", 
                      liked ? "text-primary" : "text-muted-foreground"
                    )}
                  >
                    <Heart size={20} fill={liked ? "currentColor" : "none"} />
                  </motion.button>
                  
                  <motion.button 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 rounded-full shadow-lg flex items-center justify-center bg-white text-muted-foreground"
                  >
                    <Bookmark size={20} />
                  </motion.button>
                </div>
              </div>

              {/* Recipe summary */}
              <Card className="mt-6 border-none shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-primary/5 to-accent/5 p-6">
                  <div className="flex flex-wrap gap-3 mb-3">
                    <span className="pill-badge bg-primary/80 text-white">
                      <Clock size={12} className="mr-1" />
                      {recipe.readyInMinutes} min
                    </span>
                    <span className="pill-badge bg-background/90">
                      <Users size={12} className="mr-1" />
                      {recipe.servings} servings
                    </span>
                  </div>
                  
                  <h1 className="font-display text-3xl md:text-4xl font-bold mb-4 text-balance">
                    {recipe.title}
                  </h1>
                  
                  <div className="prose prose-sm md:prose-base" dangerouslySetInnerHTML={{ __html: recipe.summary }} />
                </div>
              </Card>

              {/* Action buttons */}
              <div className="flex flex-wrap gap-3 mt-6 mb-8 lg:mb-0">
                <Button variant="outline" size="sm" className="gap-2 border-primary/20 hover:bg-primary/5">
                  <Share2 size={16} />
                  <span>Share</span>
                </Button>
                <Button variant="outline" size="sm" className="gap-2 border-primary/20 hover:bg-primary/5">
                  <Printer size={16} />
                  <span>Print</span>
                </Button>
              </div>
            </motion.div>

            {/* Right column - Ingredients and Instructions */}
            <motion.div 
              className="lg:col-span-5"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Ingredients */}
              <Card className="mb-8 border-none shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-accent/10 to-transparent p-6">
                  <h2 className="font-display text-2xl font-bold mb-6 inline-block">
                    <span className="recipe-highlight">Ingredients</span>
                  </h2>
                  
                  <ul className="space-y-4">
                    {recipe.extendedIngredients?.map((ingredient, index) => (
                      <motion.li 
                        key={index} 
                        className="flex items-start gap-3 bg-white/80 backdrop-blur-sm p-3 rounded-md shadow-sm"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + (index * 0.05) }}
                      >
                        <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                        <div>
                          <span className="font-medium">{ingredient.amount} {ingredient.unit}</span>
                          <span className="ml-1 capitalize">{ingredient.name}</span>
                        </div>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </Card>

              {/* Instructions */}
              <Card className="border-none shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-primary/5 to-transparent p-6">
                  <h2 className="font-display text-2xl font-bold mb-6 inline-block">
                    <span className="recipe-highlight">Instructions</span>
                  </h2>
                  
                  {recipe.analyzedInstructions && recipe.analyzedInstructions.length > 0 ? (
                    <ol className="space-y-6">
                      {recipe.analyzedInstructions[0].steps.map((step, stepIndex) => (
                        <motion.li 
                          key={step.number} 
                          className="relative"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 + (stepIndex * 0.1) }}
                        >
                          <div className="flex gap-4">
                            <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold shadow-md">
                              {step.number}
                            </div>
                            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-sm flex-1">
                              <p className="mb-2">{step.step}</p>
                              
                              {(step.ingredients && step.ingredients.length > 0) && (
                                <div className="mt-3 pt-3 border-t border-neutral-100">
                                  <p className="text-xs text-muted-foreground mb-1">Ingredients for this step:</p>
                                  <div className="flex flex-wrap gap-2">
                                    {step.ingredients.map((ingredient) => (
                                      <span key={ingredient.id} className="tag-badge bg-accent/20 text-xs">
                                        {ingredient.name}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                          
                          {/* Connecting line between steps */}
                          {stepIndex < recipe.analyzedInstructions[0].steps.length - 1 && (
                            <div className="absolute left-5 top-10 bottom-0 w-0.5 bg-primary/20 h-6"></div>
                          )}
                        </motion.li>
                      ))}
                    </ol>
                  ) : (
                    <div className="prose prose-sm md:prose-base bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-sm" 
                      dangerouslySetInnerHTML={{ __html: recipe.instructions || 'No instructions available' }} 
                    />
                  )}
                </div>
              </Card>
            </motion.div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
