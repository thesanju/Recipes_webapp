import { Link } from 'react-router-dom';
import { Recipe } from '@/services/recipeApi';
import { Clock, ChefHat, ArrowRight, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { RecipeImage } from '@/components/RecipeImage';

interface RecipeCardProps {
  recipe: Recipe;
  featured?: boolean;
  index?: number;
}

export function RecipeCard({ recipe, featured = false, index = 0 }: RecipeCardProps) {
  const isEven = index % 2 === 0;
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  
  // Force image visibility after a short delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsImageLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className={`group relative ${featured ? 'h-[400px]' : 'h-[320px]'} overflow-hidden rounded-xl`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Link to={`/recipe/${recipe.id}`} className="block h-full">
        {/* Card wrapper with shadow and border */}
        <div className="absolute inset-0 bg-white border-2 border-neutral-200 rounded-xl shadow-md transition-all duration-300 group-hover:shadow-xl"></div>
        
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70 z-10 rounded-xl" />
        
        {/* Accent shape */}
        <div className={`absolute ${isEven ? '-right-20 rotate-45' : '-left-20 -rotate-45'} -top-20 w-40 h-40 bg-accent opacity-30 rounded-full blur-xl z-0 transition-all duration-500 group-hover:opacity-50 group-hover:scale-125`} />
        
        {/* Image */}
        <div className="h-full w-full rounded-xl overflow-hidden">
          {recipe.image ? (
            <>
              <RecipeImage 
                src={recipe.image} 
                alt={recipe.title} 
                className={cn(
                  "h-full w-full object-cover transition-transform duration-700",
                  "!opacity-100 !visible !block", // Force visibility with !important
                  isImageLoaded ? "opacity-100" : "opacity-0", // Additional conditional classes
                  "group-hover:scale-110"
                )}
              />
              {/* Fallback background color while image loads */}
              {!isImageLoaded && (
                <div className="absolute inset-0 bg-muted"></div>
              )}
            </>
          ) : (
            <div className="h-full w-full bg-muted pattern-dots-sm flex items-center justify-center">
              <ChefHat size={32} className="text-muted-foreground/40" />
            </div>
          )}
        </div>

        {/* Like button */}
        <motion.button
          className={cn(
            "absolute top-3 right-3 z-30 w-9 h-9 rounded-full flex items-center justify-center bg-white/90 shadow-md backdrop-blur-sm",
            isLiked ? "text-primary" : "text-muted-foreground"
          )}
          onClick={handleLike}
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.1 }}
        >
          <Heart size={16} fill={isLiked ? "currentColor" : "none"} />
        </motion.button>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-4 z-20 transform transition-all duration-300 group-hover:translate-y-[-5px]">
          <div className="flex items-center gap-2 mb-2">
            <span className="pill-badge bg-primary/90 text-white backdrop-blur-sm">
              <Clock size={12} className="mr-1" />
              {recipe.readyInMinutes || '30'} min
            </span>
            <span className="pill-badge bg-background/90 backdrop-blur-sm">
              {recipe.servings || '4'} servings
            </span>
          </div>
          
          <h3 className={`font-display ${featured ? 'text-2xl' : 'text-xl'} font-bold leading-tight text-white text-balance mb-2`}>
            {recipe.title}
          </h3>
          
          <motion.div 
            className="flex items-center text-white/90 text-sm font-medium"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
            transition={{ duration: 0.2 }}
          >
            <span>View recipe</span>
            <ArrowRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
          </motion.div>
        </div>
      </Link>
    </motion.div>
  );
}
