import { Icon } from '@iconify/react/dist/iconify.js';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
    const navItems = [
        { name: 'Home', href: '/' },
        { name: 'Tours', href: '/tours' },
        { name: 'Destinations', href: '/destinations' },
        { name: 'About', href: '/about' },
        { name: 'Contact', href: '/contact' },
    ];

    const [isNavOpen, setIsNavOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isModalSearchOpen, setIsModalSearch] = useState(false);
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const toggleNav = () => setIsNavOpen(!isNavOpen);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 0);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleBookNowClick = () => {
        const token = localStorage.getItem("token");

        if (token) {
            navigate("/tours");
        } else {
            navigate("/login");
        }
    };

    const handleAccount = () =>{
        const token = localStorage.getItem("token");

        if (token) {
            navigate("/account");
        } else {
            navigate("/login");
        }
    }

    return (
        <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-white ${isScrolled ? 'shadow-md' : ''}`}>
            <div className="container mx-auto px-6 flex justify-between items-center py-4">
                {/* Logo */}
                <Link to="/" className="text-3xl font-bold">Travelo</Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex gap-8">
                    {navItems.map((item) => (
                        <Link key={item.name} to={item.href} className={`relative group ${pathname === item.href ? 'font-bold' : ''}`}>
                            {item.name}
                            <span className="absolute left-0 bottom-0 w-full h-0.5 bg-gray-900 transition-all transform scale-x-0 group-hover:scale-x-100"></span>
                        </Link>
                    ))}
                </nav>

                {/* "Book Now" Button */}
                <div className="hidden md:flex items-center gap-4">
                    <button
                        onClick={handleBookNowClick}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold"
                    >
                        Book Now
                    </button>

                    <button onClick={handleAccount}>
                        <Icon icon="mdi:account-outline" width="24" height="24" />
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <button onClick={toggleNav} className="md:hidden">
                    <Icon icon={isNavOpen ? "mdi:close" : "mdi:menu"} width="24" height="24" />
                </button>
            </div>

            {/* Mobile Menu */}
            <div className={`fixed top-0 right-0 w-2/3 h-full bg-white shadow-md z-50 transform transition-transform duration-500 ${isNavOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <ul className="p-6">
                    {navItems.map((item) => (
                        <li key={item.name} className="py-2">
                            <Link to={item.href} onClick={() => setIsNavOpen(false)}>{item.name}</Link>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Overlay */}
            {(isNavOpen || isModalSearchOpen) && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => { setIsNavOpen(false); setIsModalSearch(false); }}></div>
            )}
        </header>
    );
};

export default Header;
