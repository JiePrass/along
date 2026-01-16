"use client";

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoMdClose } from 'react-icons/io';
import Image from 'next/image';
import { LogoIcon } from "../icons/logo-only";
import { MainLogo } from "../icons/main-logo";
import TransitionLink from './transition-link';

const navItems = [
    { label: 'BERANDA', href: '/', src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80' },
    { label: 'WISATA', href: '/wisata', src: 'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&w=800&q=80' },
    { label: 'KULINER', href: '/kuliner', src: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80' },
    { label: 'ARTIKEL', href: '/article', src: 'https://images.unsplash.com/photo-1552168324-d612d77725e3?auto=format&fit=crop&w=800&q=80' },
];

const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80";

export default function Header() {
    const pathname = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [isVisible, setIsVisible] = useState(true);
    const [isScrolled, setIsScrolled] = useState(false);
    const lastScrollY = useRef(0);

    // Daftar halaman yang memiliki background gambar/gelap
    const pagesWithHero = ['/'];

    const isPlainPage = !pagesWithHero.includes(pathname);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
        if (menuOpen) setHoveredIndex(null);
    };

    useEffect(() => {
        if (menuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [menuOpen]);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setIsScrolled(currentScrollY > 50);

            if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }
            lastScrollY.current = currentScrollY;
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const isBlackText = menuOpen || isScrolled || isPlainPage;

    return (
        <>
            <header
                className={`fixed top-0 left-0 w-full z-100 transition-all duration-500 transform
                ${isVisible ? 'translate-y-0' : '-translate-y-full'}
                ${isScrolled ? 'bg-transparent backdrop-blur-xs' : ''}
                ${menuOpen ? 'bg-white' : ''}`}
            >
                <div className="container mx-auto px-6 md:px-12 lg:px-16 h-16 md:h-20 flex items-center justify-between">
                    <div className="flex-1">
                        <LogoIcon size={32} className={`transition-colors duration-300 ${isBlackText ? 'text-black' : 'text-white'}`} />
                    </div>
                    <div className="flex-none">
                        <MainLogo width={120} height={40} className={`transition-colors duration-300 ${isBlackText ? 'text-black' : 'text-white'}`} />
                    </div>
                    <div className="flex-1 flex justify-end">
                        <button onClick={toggleMenu} className={`p-2 transition-all ${isBlackText ? 'text-black' : 'text-white'}`}>
                            <div className="relative w-8 h-8 flex cursor-pointer items-center justify-center">
                                <IoMdClose size={30} className={`absolute transition-all duration-300 transform ${menuOpen ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`} />
                                <GiHamburgerMenu size={30} className={`absolute transition-all duration-300 transform ${menuOpen ? 'scale-50 opacity-0' : 'scale-100 opacity-100'}`} />
                            </div>
                        </button>
                    </div>
                </div>
            </header>

            <div
                className={`fixed top-0 left-0 w-full h-screen bg-white z-90 transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]
                ${menuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}
            >
                <div className="container mx-auto px-6 md:px-12 lg:px-16 pt-16 h-full flex flex-col lg:flex-row lg:justify-between items-center gap-12">
                    <ul className="flex flex-col gap-4 w-full lg:w-1/2">
                        {navItems.map((item, index) => (
                            <li key={index}>
                                <TransitionLink
                                    href={item.href}
                                    onMouseEnter={() => setHoveredIndex(index)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                    onClick={toggleMenu}
                                    className={`text-5xl md:text-7xl lg:text-8xl font-bold uppercase transition-all duration-500 block w-fit
                                        ${hoveredIndex !== null && hoveredIndex !== index ? 'blur-sm opacity-50' : 'text-black opacity-100 scale-105'}`}
                                >
                                    {item.label}
                                </TransitionLink>
                            </li>
                        ))}
                    </ul>

                    <div className="w-full h-64 lg:w-125 lg:h-87.5 relative rounded-2xl overflow-hidden shadow-2xl bg-gray-200">
                        <Image
                            src={DEFAULT_IMAGE}
                            alt="Default View"
                            fill
                            className={`object-cover transition-opacity duration-500 ${hoveredIndex === null ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
                        />
                        {navItems.map((item, index) => (
                            <Image
                                key={index}
                                src={item.src}
                                alt={item.label}
                                fill
                                className={`object-cover transition-all duration-500 
                                    ${hoveredIndex === index ? 'opacity-100 scale-100' : 'opacity-0 scale-110'}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}