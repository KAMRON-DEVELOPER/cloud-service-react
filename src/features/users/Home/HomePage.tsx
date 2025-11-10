import Footer from './Footer';
import LaserAnimation from './LaserAnimation';
import Stats from './Stats';
import PricingCalculator from './PricingCalculator';
import Hero from './Hero';
import Navbar from './Navbar';

const HomePage = () => {
  return (
    <div className='min-h-screen bg-background'>
      {/* Navbar */}
      <Navbar />

      <main>
        {/* Hero */}
        <Hero />

        {/* Laser Animation & Preview */}
        <LaserAnimation />

        {/* Stats */}
        <Stats />

        {/* Price calculator */}
        <PricingCalculator />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
