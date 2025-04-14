import { useState } from 'react';
import { ChefHat } from 'lucide-react';

interface RecipeImageProps {
  src: string;
  alt: string;
  className?: string;
}

export function RecipeImage({ src, alt, className }: RecipeImageProps) {
  const [error, setError] = useState(false);
  
  // Function to handle image loading errors
  const handleError = () => {
    setError(true);
  };
  
  // If image fails to load, show a fallback
  if (error) {
    return (
      <div className={`w-full h-full bg-secondary flex items-center justify-center ${className}`}>
        <ChefHat size={48} className="text-primary/40" />
      </div>
    );
  }
  
  // Determine if the image is local or external
  let imageSrc = src;
  
  // Handle images with public/ prefix
  if (src && src.startsWith('public/')) {
    imageSrc = `/${src.substring(7)}`;  // Remove 'public/' and add leading slash
  }
  
  return (
    <img
      src={imageSrc}
      alt={alt}
      className={className}
      onError={handleError}
    />
  );
}
