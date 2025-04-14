
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-secondary mt-16 py-12">
      <div className="recipe-container">
        <div className="flex flex-col md:flex-row justify-between mb-8">
          <div className="mb-8 md:mb-0">
            <Link to="/" className="inline-block">
              <span className="font-display text-2xl font-bold text-primary">Culinary</span>
              <span className="font-display text-2xl font-bold">Chronicles</span>
            </Link>
            <p className="mt-2 text-muted-foreground max-w-md">
              A modern, retro-inspired recipe blog showcasing delicious meals with clear, step-by-step instructions.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-display text-lg font-bold mb-4">Navigate</h4>
              <ul className="space-y-2">
                <li><Link to="/" className="text-muted-foreground hover:text-primary transition-colors">Home</Link></li>
                <li><Link to="/categories" className="text-muted-foreground hover:text-primary transition-colors">Categories</Link></li>
                <li><Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">About</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-display text-lg font-bold mb-4">Categories</h4>
              <ul className="space-y-2">
                <li><Link to="/category/breakfast" className="text-muted-foreground hover:text-primary transition-colors">Breakfast</Link></li>
                <li><Link to="/category/lunch" className="text-muted-foreground hover:text-primary transition-colors">Lunch</Link></li>
                <li><Link to="/category/dinner" className="text-muted-foreground hover:text-primary transition-colors">Dinner</Link></li>
                <li><Link to="/category/desserts" className="text-muted-foreground hover:text-primary transition-colors">Desserts</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-display text-lg font-bold mb-4">Connect</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <Instagram size={20} />
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <Twitter size={20} />
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <Facebook size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Culinary Chronicles. All rights reserved.</p>
          <p className="mt-1">Created for UI Design Hackathon 2025</p>
        </div>
      </div>
    </footer>
  );
}
