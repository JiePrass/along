"use client";
import { useRef, useState, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import { Observer } from 'gsap/Observer';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import DestinationCard from '../shared/destination-card';

if (typeof window !== "undefined") {
    gsap.registerPlugin(Observer);
}

const initialDestinations = [
    {
        image: "/images/destination.png",
        description: "Langkahkan Kaki Di Halaman Bersejarah, Dengarkan Kisah Tiap Sudut Istana."
    },
    {
        image: "/images/destination2.png",
        description: "Jelajahi Arsitektur Kolonial Dan Kebun Berpagar Klasik."
    },
    {
        image: "/images/destination3.png",
        description: "Taman Botani Legendaris Dengan Ribuan Koleksi Tanaman Tropis."
    },
];

const loopDestinations = [...initialDestinations, ...initialDestinations, ...initialDestinations];

export default function DestinationSection() {
    const sliderRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [currentIndex, setCurrentIndex] = useState(initialDestinations.length);
    const isAnimating = useRef(false);
    const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

    const getMoveDistance = () => {
        if (!sliderRef.current) return 440;
        const firstCard = sliderRef.current.firstElementChild as HTMLElement;
        const style = window.getComputedStyle(sliderRef.current);
        const gap = parseInt(style.gap) || 40;
        return firstCard.offsetWidth + gap;
    };

    const slide = useCallback((direction: 'next' | 'prev') => {
        if (!sliderRef.current || isAnimating.current) return;

        isAnimating.current = true;
        const moveDistance = getMoveDistance();
        const nextIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;

        gsap.to(sliderRef.current, {
            x: -(nextIndex * moveDistance),
            duration: 0.8,
            ease: "power3.inOut",
            onComplete: () => {
                let finalIndex = nextIndex;
                if (nextIndex >= initialDestinations.length * 2) {
                    finalIndex = nextIndex - initialDestinations.length;
                    gsap.set(sliderRef.current, { x: -(finalIndex * moveDistance) });
                } else if (nextIndex < initialDestinations.length) {
                    finalIndex = nextIndex + initialDestinations.length;
                    gsap.set(sliderRef.current, { x: -(finalIndex * moveDistance) });
                }
                setCurrentIndex(finalIndex);
                isAnimating.current = false;
            }
        });
    }, [currentIndex]);


    const stopAutoPlay = useCallback(() => {
        if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    }, []);

    // Setup Auto-play
    const startAutoPlay = useCallback(() => {
        stopAutoPlay();
        autoPlayRef.current = setInterval(() => {
            slide('next');
        }, 5000);
    }, [slide, stopAutoPlay]);

    useEffect(() => {
        if (sliderRef.current) {
            gsap.set(sliderRef.current, { x: -(currentIndex * getMoveDistance()) });
        }

        const observer = Observer.create({
            target: containerRef.current,
            type: "touch,pointer",
            onLeft: () => {
                slide('next');
                startAutoPlay();
            },
            onRight: () => {
                slide('prev');
                startAutoPlay();
            },
            tolerance: 50,
            preventDefault: false
        });

        startAutoPlay();

        const handleResize = () => {
            gsap.set(sliderRef.current, { x: -(currentIndex * getMoveDistance()) });
        };
        window.addEventListener('resize', handleResize);

        return () => {
            observer.kill();
            stopAutoPlay();
            window.removeEventListener('resize', handleResize);
        };
    }, [currentIndex, slide, startAutoPlay, stopAutoPlay]);

    return (
        <section
            className="py-12 md:py-20 overflow-hidden"
            onMouseEnter={stopAutoPlay}
            onMouseLeave={startAutoPlay}
        >
            <div className="px-6 container mx-auto">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 md:mb-12 gap-6">
                    <div className="flex items-center gap-4 md:gap-8 flex-1">
                        <h2 className="text-3xl md:text-5xl font-serif whitespace-nowrap">
                            Temukan Destinasi Anda
                        </h2>
                        <div className="h-1 bg-[#2d1c04] w-full hidden md:block" />
                    </div>

                    <div className="hidden md:flex gap-4">
                        <NavButtons slide={slide} resetTimer={startAutoPlay} />
                    </div>
                </div>

                <div className="relative touch-pan-y" ref={containerRef}>
                    <div
                        ref={sliderRef}
                        className="flex gap-6 md:gap-10"
                        style={{ cursor: 'grab' }}
                    >
                        {loopDestinations.map((dest, index) => (
                            <div key={index} className="w-[85vw] md:w-100 shrink-0 select-none">
                                <DestinationCard
                                    image={dest.image}
                                    description={dest.description}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex justify-center mt-10 md:hidden">
                    <NavButtons slide={slide} resetTimer={startAutoPlay} />
                </div>
            </div>
        </section>
    );
};

const NavButtons = ({ slide, resetTimer }: { slide: (d: 'next' | 'prev') => void, resetTimer: () => void }) => (
    <div className="flex gap-4">
        <button
            onClick={() => { slide('prev'); resetTimer(); }}
            className="p-4 rounded-full text-white bg-[#2d1c04] active:scale-90 transition-transform cursor-pointer"
        >
            <ChevronLeft size={24} />
        </button>
        <button
            onClick={() => { slide('next'); resetTimer(); }}
            className="p-4 rounded-full text-white bg-[#2d1c04] active:scale-90 transition-transform cursor-pointer"
        >
            <ChevronRight size={24} />
        </button>
    </div>
);