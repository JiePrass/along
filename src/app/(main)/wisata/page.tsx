"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SearchFilter from "@/components/shared/search-filter";
import WisataCard from "@/components/shared/wisata-card";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

gsap.registerPlugin(ScrollTrigger);

const IMAGES = [
    "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=500",
    "https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&q=80&w=500",
    "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&q=80&w=500",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?auto=format&fit=crop&q=80&w=500",
    "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&q=80&w=500",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?auto=format&fit=crop&q=80&w=500",
    "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&q=80&w=500",
];

const ALL_DATA = Array.from({ length: 64 }).map((_, i) => ({
    id: i,
    title: i % 2 === 0 ? `Curug Cilember ${i + 1}` : `Taman Safari ${i + 1}`,
    image: i % 3 === 0
        ? "https://images.unsplash.com/photo-1596401057633-565652b5e260?auto=format&fit=crop&q=80&w=600"
        : i % 3 === 1
            ? "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&q=80&w=600"
            : "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&q=80&w=600"
}));

const ITEMS_PER_PAGE = 8;

export default function WisataPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const containerRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    // --- LOGIC PAGINATION DATA ---
    const totalPages = Math.ceil(ALL_DATA.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentData = ALL_DATA.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    // --- LOGIC PAGINATION UI GENERATOR (Untuk membuat "1 2 3 ... 24 25") ---
    const getPageNumbers = () => {
        const delta = 2; // Berapa banyak angka di kiri/kanan current page
        const range = [];
        const rangeWithDots = [];
        let l;

        range.push(1);
        for (let i = currentPage - delta; i <= currentPage + delta; i++) {
            if (i < totalPages && i > 1) {
                range.push(i);
            }
        }
        range.push(totalPages);

        for (const i of range) {
            if (l) {
                if (i - l === 2) {
                    rangeWithDots.push(l + 1);
                } else if (i - l !== 1) {
                    rangeWithDots.push("...");
                }
            }
            rangeWithDots.push(i);
            l = i;
        }

        return rangeWithDots;
    };

    useEffect(() => {
        const ctx = gsap.context(() => {
            const cards = cardsRef.current.filter((el) => el !== null);

            const cardWidth = 240;
            const speed = 20;
            const spacing = cardWidth + speed;
            const totalWidth = spacing * cards.length;
            const centerIndex = (cards.length - 1) / 2;

            const proxy = { value: spacing * centerIndex };

            // Semakin BESAR radius, semakin landai/datar lengkungannya.
            // Semakin KECIL radius, semakin ekstrem melengkungnya.
            const radius = 1200;

            // Max Arc Angle: Seberapa lebar sudut penyebaran kartu dari tengah.
            const maxArcAngle = 65;


            const updateCards = () => {
                cards.forEach((card, i) => {
                    const rawPosition = (i * spacing) - proxy.value;

                    const linearXPos = gsap.utils.wrap(
                        -totalWidth / 2,
                        totalWidth / 2,
                        rawPosition
                    );

                    const progress = linearXPos / (totalWidth / 2);
                    const currentAngleDeg = progress * maxArcAngle;
                    const currentAngleRad = currentAngleDeg * (Math.PI / 180);
                    const posX = radius * Math.sin(currentAngleRad);
                    const posZ = (radius * Math.cos(currentAngleRad)) - radius;
                    const rotateY = -currentAngleDeg * 1.1;
                    const distFromCenterAbs = Math.abs(progress);
                    const scale = gsap.utils.interpolate(1.1, 0.8, distFromCenterAbs);
                    const opacity = gsap.utils.interpolate(1, 0.5, distFromCenterAbs);
                    const zIndex = cards.length - Math.floor(distFromCenterAbs * cards.length);

                    gsap.set(card, {
                        x: posX,
                        y: 0,
                        z: posZ,
                        scale: scale,
                        opacity: opacity,
                        rotateY: -rotateY,
                        zIndex: zIndex,
                        transformOrigin: "center center",
                        filter: `brightness(${gsap.utils.interpolate(1, 0.7, distFromCenterAbs)})`
                    });
                });
            };

            const nextSlide = () => {
                gsap.to(proxy, {
                    value: proxy.value + spacing,
                    duration: 1.5,
                    ease: "power4.inOut",
                    onUpdate: updateCards,
                    onComplete: () => {
                        gsap.delayedCall(2, nextSlide); // Delay sebelum slide berikutnya
                    }
                });
            };

            updateCards();
            gsap.delayedCall(1, nextSlide);

            gsap.from(cards, {
                y: 500,
                opacity: 0,
                duration: 1.5,
                stagger: 0.05,
                ease: "power3.out",
                onUpdate: updateCards
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div
            ref={containerRef}
            className="min-h-screen w-full overflow-hidden flex flex-col"
        >
            <main className="grow flex flex-col items-center justify-center relative pt-10 w-full">
                <div className="text-center z-10 px-4 relative mt-10">
                    <h1 className="hero-text text-3xl md:text-5xl leading-tight mb-4 font-bethany font-extralight">
                        Temukan Berbagai Wisata<br /> Menakjubkan Di Indonesia
                    </h1>
                    <p className="hero-text max-w-lg mx-auto text-sm md:text-base font-medium leading-relaxed">
                        Platform kami membantu Anda menjelajahi destinasi wisata terbaik di Indonesia dengan mudah dan cepat.
                    </p>
                </div>

                {/* 3D Container */}
                <div
                    className="relative w-full h-125 flex items-center justify-center"
                    style={{
                        perspective: "1200px",
                    }}
                >
                    <div className="relative w-full h-full flex items-center justify-center" style={{ transformStyle: "preserve-3d" }}>
                        {IMAGES.map((src, index) => (
                            <div
                                key={index}
                                ref={(el) => { if (el) cardsRef.current[index] = el }}
                                className="absolute bg-gray-200 overflow-hidden"
                                style={{
                                    width: "260px",
                                    height: "380px",
                                    left: "50%",
                                    top: "50%",
                                    marginLeft: "-130px",
                                    marginTop: "-190px",
                                    willChange: "transform, opacity",
                                }}
                            >
                                <Image
                                    src={src}
                                    alt="Wisata"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* CONTENT */}
                <section className="w-full py-20 px-6 md:px-12 lg:px-16 container mx-auto min-h-screen">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
                        <div className="max-w-md">
                            <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                                Pergi Kemana <br /> Kita Hari Ini ?
                            </h2>
                        </div>
                        <SearchFilter />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                        {currentData.map((item) => (
                            <WisataCard
                                key={item.id}
                                title={item.title}
                                image={item.image}
                            />
                        ))}
                    </div>

                    <Pagination>
                        <PaginationContent className="gap-4">

                            <PaginationItem>
                                <PaginationPrevious
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        if (currentPage > 1) setCurrentPage((p: number) => p - 1);
                                    }}
                                    className={`
                    h-10 w-10 p-0 rounded-none flex items-center justify-center 
                    bg-[#333] text-white hover:bg-black hover:text-white transition-colors
                    ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}
                `}
                                />
                            </PaginationItem>

                            {/* Loop Nomor Halaman */}
                            {getPageNumbers().map((page, index) => (
                                <PaginationItem key={index}>
                                    {page === "..." ? (
                                        <PaginationEllipsis className="text-stone-400" />
                                    ) : (
                                        <PaginationLink
                                            href="#"
                                            isActive={currentPage === page}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setCurrentPage(Number(page));
                                            }}
                                            className={`
                        rounded-none border-none shadow-none hover:bg-transparent text-sm
                        ${currentPage === page
                                                    ? "font-bold text-[#333] scale-110"
                                                    : "font-medium text-stone-400 hover:text-[#333]"
                                                }
                    `}
                                        >
                                            {page}
                                        </PaginationLink>
                                    )}
                                </PaginationItem>
                            ))}

                            <PaginationItem>
                                <PaginationNext
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        if (currentPage < totalPages) setCurrentPage((p: number) => p + 1);
                                    }}
                                    className={`
                    h-10 w-10 p-0 rounded-none flex items-center justify-center 
                    bg-[#333] text-white hover:bg-black hover:text-white transition-colors
                    ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}
                `}
                                />
                            </PaginationItem>

                        </PaginationContent>
                    </Pagination>

                </section>
            </main>
        </div>
    );
}