
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function About() {
  return (
    <>
      <Header />
      <main className="recipe-container py-16">
        <h1 className="font-display text-4xl font-bold mb-8">About Culinary Chronicles</h1>
        
        <div className="prose prose-lg max-w-none">
          <p>
            Welcome to Culinary Chronicles, where we blend modern cooking techniques with timeless recipes
            in a sleek, retro-inspired digital cookbook. Our mission is to make cooking accessible,
            enjoyable, and visually inspiring for home chefs of all skill levels.
          </p>
          
          <h2>Our Story</h2>
          <p>
            Culinary Chronicles was born from a passion for both exceptional food and exceptional design.
            We believe that cooking instructions should be as beautiful as they are functional—each recipe
            a perfect balance of clarity and visual appeal.
          </p>
          
          <h2>Our Approach</h2>
          <p>
            Every recipe on Culinary Chronicles is thoughtfully presented with:
          </p>
          <ul>
            <li>Clean, minimalist layout for distraction-free cooking</li>
            <li>Step-by-step instructions with clear visual hierarchy</li>
            <li>Precise ingredient measurements and preparation times</li>
            <li>Beautiful food photography that accurately represents the final dish</li>
          </ul>
          
          <h2>Join Our Community</h2>
          <p>
            Cooking is more than following instructions—it's about sharing experiences and creating memories.
            Connect with us on social media to share your culinary creations, ask questions, and join a
            community of food enthusiasts who appreciate the art of beautiful cooking.
          </p>
          
          <h2>Design Principles</h2>
          <p>
            Our design philosophy embraces:
          </p>
          <ul>
            <li><strong>Minimalism:</strong> Focusing on what matters most—the food and instructions</li>
            <li><strong>Retro inspiration:</strong> Borrowing the charm of vintage cookbooks with modern execution</li>
            <li><strong>Purposeful typography:</strong> Using font pairings that enhance readability and visual appeal</li>
            <li><strong>Strategic color:</strong> Employing a restrained palette with targeted accents</li>
          </ul>
          
          <p>
            Thank you for visiting Culinary Chronicles. We hope our recipes inspire you to create
            beautiful meals with confidence and style.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
