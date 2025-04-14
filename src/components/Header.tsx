
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <header className="bg-background/95 backdrop-blur-sm sticky top-0 z-50 border-b border-border">
      <div className="recipe-container">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu}>
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
            <Link to="/" className="flex items-center">
              <span className="font-display text-2xl font-bold text-primary">Culinary</span>
              <span className="font-display text-2xl font-bold">Chronicles</span>
            </Link>
          </div>

          <nav className={`${isMenuOpen ? 'flex' : 'hidden'} md:flex absolute md:relative top-16 md:top-0 left-0 right-0 bg-background md:bg-transparent flex-col md:flex-row items-start md:items-center p-4 md:p-0 border-b md:border-0 border-border gap-4 md:gap-8`}>
            <Link to="/" className="font-medium hover:text-primary transition-colors">Home</Link>
            <Link to="/categories" className="font-medium hover:text-primary transition-colors">Categories</Link>
            <Link to="/about" className="font-medium hover:text-primary transition-colors">About</Link>
          </nav>

          <div className="flex items-center">
            <form onSubmit={handleSearch} className="relative hidden md:block mr-4">
              <input
                type="search"
                placeholder="Search recipes..."
                className="w-48 bg-secondary px-3 py-1.5 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button type="submit" variant="ghost" size="icon" className="absolute right-0 top-0 bottom-0">
                <Search size={16} />
              </Button>
            </form>
            <Button size="sm" className="bg-primary text-primary-foreground">
              Subscribe
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
