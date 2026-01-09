'use client'

import { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoMdClose } from 'react-icons/io';
import Link from 'next/link';
import Image from 'next/image';
import { LogoIcon } from "../logos/logo-only";
import { MainLogo } from "../logos/main-logo";

// Data Menu Pariwisata
const navItems = [
    {
        label: 'BERANDA',
        href: '#beranda',
        src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'
    },
    {
        label: 'WISATA',
        href: '#wisata',
        src: 'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&w=800&q=80'
    },
    {
        label: 'KULINER',
        href: '#kuliner',
        src: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80'
    },
    {
        label: 'GALERI',
        href: '#galeri',
        src: 'https://images.unsplash.com/photo-1552168324-d612d77725e3?auto=format&fit=crop&w=800&q=80'
    },
];

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
        setHoveredIndex(null);
    };

    return (
        <>
            <header
                className={`fixed top-0 left-0 w-full z-100 transition-colors delay-200 duration-300 
                ${menuOpen ? 'bg-white text-black' : 'bg-transparent text-white'}`}
            >
                <div className="container mx-auto px-6 h-24 flex items-center justify-between">
                    <div className="flex-1 flex justify-start">
                        <LogoIcon size={32} className="cursor-pointer" />
                    </div>

                    <div className="flex-none">
                        <MainLogo width={120} height={40} className="cursor-pointer" />
                    </div>

                    <div className="flex-1 flex justify-end items-center">
                        <button
                            className="p-2 flex items-center gap-2 group transition-all"
                            onClick={toggleMenu}
                            aria-label="Toggle Menu"
                        >
                            <span className={`text-lg font-medium transition-opacity hidden md:block duration-300 ${menuOpen ? 'opacity-100' : 'opacity-0'}`}>
                                {menuOpen ? 'close' : ''}
                            </span>

                            <div className="relative w-8 h-8 flex items-center justify-center">
                                <IoMdClose
                                    size={30}
                                    className={`absolute transition-all duration-300 transform ${menuOpen ? 'scale-100 opacity-100 rotate-0' : 'scale-50 opacity-0 -rotate-90'}`}
                                />
                                <GiHamburgerMenu
                                    size={30}
                                    className={`absolute transition-all duration-300 transform ${menuOpen ? 'scale-50 opacity-0 rotate-90' : 'scale-100 opacity-100 rotate-0'}`}
                                />
                            </div>
                        </button>
                    </div>
                </div>
            </header>

            <div
                className={`fixed top-0 left-0 w-full bg-white z-90 overflow-hidden transition-[max-height,opacity] duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]
                ${menuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-100'}`}
            >
                <div className="container mx-auto px-6 pt-28 pb-10 h-screen flex flex-col justify-start lg:justify-start lg:pt-32 overflow-y-auto">

                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 lg:gap-10 h-auto lg:h-auto pb-20 lg:pb-0">

                        <ul className="flex flex-col gap-4 w-full lg:w-1/2">
                            {navItems.map((item, index) => (
                                <li key={index} className="relative">
                                    <Link
                                        href={item.href}
                                        onMouseEnter={() => setHoveredIndex(index)}
                                        onMouseLeave={() => setHoveredIndex(null)}
                                        onClick={toggleMenu}
                                        className={`
                                            text-5xl md:text-7xl lg:text-8xl font-bold uppercase transition-all duration-500 block w-fit
                                            ${hoveredIndex !== null && hoveredIndex !== index
                                                ? 'blur-sm opacity-30 scale-95 origin-left'
                                                : 'blur-0 opacity-100 scale-100 text-black'
                                            }
                                        `}
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        <div className="
                            block 
                            w-full h-64 
                            lg:w-125 lg:h-87.5 
                            mt-4 lg:mt-0
                            relative rounded-xl overflow-hidden bg-gray-100 shadow-lg shrink-0
                        ">
                            <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 z-10 ${hoveredIndex === null ? 'opacity-100' : 'opacity-0'}`}>
                                <span className="text-gray-400 text-lg tracking-widest uppercase">Explore Indonesia</span>
                            </div>

                            {navItems.map((item, index) => (
                                <div
                                    key={index}
                                    className={`absolute inset-0 transition-opacity duration-500 ease-in-out
                                        ${hoveredIndex === index ? 'opacity-100' : 'opacity-0'}
                                    `}
                                >
                                    <Image
                                        src={item.src}
                                        alt={item.label}
                                        fill
                                        sizes="(max-width: 1024px) 100vw, 500px"
                                        priority={index === 0}
                                        className="object-cover transform scale-105 transition-transform duration-1000"
                                    />
                                    <div className="absolute inset-0 bg-black/10"></div>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </div>

            <div
                onClick={toggleMenu}
                className={`fixed inset-0 bg-black/60 z-80 transition-opacity duration-700 
                ${menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}
            />
        </>
    );
}