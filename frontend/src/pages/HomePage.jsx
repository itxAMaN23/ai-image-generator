import Hero from '../components/Hero';
import Features from '../components/Features';
import Footer from '../components/Footer';

const HomePage = () => {
    return (
        <div className="bg-[#202142] text-white">
            <main>
                <Hero />
                <Features />
            </main>
            <Footer />
        </div>
    );
};

export default HomePage;