import { FaGithub, FaTwitter, FaDribbble } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-black/20 border-t border-white/10">
            <div className="mx-auto max-w-7xl overflow-hidden px-6 py-12 lg:px-8">
                <div className="flex justify-center space-x-6">
                    <a href="#" className="text-gray-400 hover:text-[#8A4FFF] transition-colors"><FaGithub className="h-6 w-6" /></a>
                    <a href="#" className="text-gray-400 hover:text-[#8A4FFF] transition-colors"><FaTwitter className="h-6 w-6" /></a>
                    <a href="#" className="text-gray-400 hover:text-[#8A4FFF] transition-colors"><FaDribbble className="h-6 w-6" /></a>
                </div>
                <p className="mt-8 text-center text-xs leading-5 text-gray-400 font-['JetBrains_Mono']">
                    &copy; {new Date().getFullYear()} ImagiVerse. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;