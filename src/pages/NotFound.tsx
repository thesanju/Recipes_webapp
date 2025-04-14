import { Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="recipe-container py-16 flex flex-col items-center justify-center min-h-[50vh]">
        <h1 className="font-display text-5xl font-bold mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-8">Page not found</p>
        <Button asChild>
          <Link to="/">Return to Home</Link>
        </Button>
      </main>
      <Footer />
    </>
  );
}
