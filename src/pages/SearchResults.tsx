
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchRecipes, Recipe } from '@/services/recipeApi';
import { RecipeCard } from '@/components/RecipeCard';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SearchX } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      if (query) {
        const results = await searchRecipes(query);
        setRecipes(results);
      }
      setLoading(false);
    };

    fetchResults();
  }, [query]);

  return (
    <>
      <Header />
      <main className="recipe-container py-16">
        <h1 className="font-display text-3xl font-bold mb-2">
          {query ? `Search Results for "${query}"` : 'Search Results'}
        </h1>
        <p className="text-muted-foreground mb-8">
          {recipes.length} recipes found
        </p>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 min-h-[400px]">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="bg-muted animate-pulse rounded-md aspect-square"></div>
            ))}
          </div>
        ) : recipes.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <SearchX size={64} className="mx-auto mb-4 text-muted-foreground" />
            <h2 className="font-display text-2xl font-bold mb-2">No recipes found</h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              We couldn't find any recipes matching your search. Try using different keywords or browse our categories.
            </p>
            <Button asChild>
              <a href="/">Back to Home</a>
            </Button>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
