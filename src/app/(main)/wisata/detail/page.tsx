'use client'

import { useState, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import VirtualTour from "@/components/shared/virtual-tour";
import Map from "@/components/shared/map/map";

gsap.registerPlugin(useGSAP);

type SlideData = {
    id: number;
    category: string;
    number: string;
    title: string;
    headline: string;
    descCol1: string;
    descCol2: string;
    image: string;
};

const SLIDES: SlideData[] = [
    {
        id: 0,
        category: "Flora",
        number: "01",
        title: "Grammatophyllum speciosum",
        headline: "Orkid raksasa ini memunculkan ratusan bunga kuning bercorak cokelat sekaligus-magnet foto utama di rumah kaca.",
        descCol1: "Rumah Kaca Khusus Dengan Sistem Kendali Suhu Dan Kelembapan Canggih Memastikan Padma Raksasa Dapat Mekar Sempurna Sepanjang Tahun.",
        descCol2: "Koleksi Orkid Raksasa Ini Juga Menjadi Fokus Penelitian Botani Internasional, Membantu Ilmuwan Mempelajari Adaptasi Tanaman Di Iklim Tropis.",
        image: "/images/orkid.png",
    },
    {
        id: 1,
        category: "Fauna",
        number: "02",
        title: "Kakatua Jambul Kuning",
        headline: "Simbol keanekaragaman fauna yang hidup harmonis di dalam ekosistem konservasi Kebun Raya.",
        descCol1: "Burung cerdas ini sering terlihat bertengger di pohon-pohon tinggi sekitar area konservasi, menarik perhatian pengunjung dengan jambul khasnya.",
        descCol2: "Upaya penangkaran dan perlindungan habitat dilakukan secara ketat untuk memastikan populasi Kakatua ini tetap terjaga dari ancaman kepunahan.",
        image: "/images/kakatua.png",
    },
    {
        id: 2,
        category: "Sejarah",
        number: "03",
        title: "Sejarah Kebun Raya",
        headline: "Menelusuri jejak kolonial dan botani yang menjadi fondasi berdirinya pusat konservasi tanaman tertua.",
        descCol1: "Didirikan pada tahun 1817 oleh Caspar Georg Carl Reinwardt, kebun ini awalnya merupakan halaman percobaan untuk tanaman perkebunan.",
        descCol2: "Kini, tempat ini tidak hanya menjadi destinasi wisata, tetapi juga pusat edukasi sejarah yang menyimpan ribuan cerita masa lampau.",
        image: "/images/sejarah-bogor.png",
    },
    {
        id: 3,
        category: "Flora",
        number: "04",
        title: "Amorphophallus titanum",
        headline: "Bunga bangkai raksasa yang mekar langka, menyebarkan aroma khas untuk menarik serangga penyerbuk.",
        descCol1: "Tanaman endemik Sumatera ini memiliki siklus hidup yang unik dengan fase vegetatif dan generatif yang bergantian dalam periode lama.",
        descCol2: "Saat mekar, tinggi bunga majemuk ini bisa mencapai lebih dari 3 meter, menjadikannya salah satu atraksi paling dinanti di dunia botani.",
        image: "/images/bunga-bangkai.png",
    },
    {
        id: 4,
        category: "Flora",
        number: "05",
        title: "Victoria amazonica",
        headline: "Teratai raksasa dengan daun lebar yang mampu menahan beban hingga puluhan kilogram di permukaan air.",
        descCol1: "Berasal dari perairan dangkal sungai Amazon, tanaman ini telah berhasil diaklimatisasi di kolam utama Kebun Raya sejak era kolonial.",
        descCol2: "Struktur bawah daunnya yang berduri dan berongga memberikan daya apung luar biasa sekaligus perlindungan dari pemangsa air.",
        image: "https://plus.unsplash.com/premium_photo-1725408113146-395acf2e2870",
    },
];

const galleryItems = [
    {
        id: 1,
        src: "https://images.unsplash.com/photo-1704948211410-007f7d5f4355",
        alt: "Alam 1",
        className: "md:col-span-1 md:row-span-1",
    },
    {
        id: 2,
        src: "https://images.unsplash.com/photo-1537996194471-e657df975ab4",
        alt: "Sungai Alami Bogor",
        className: "md:col-span-1 md:row-span-1",
    },
    {
        id: 3,
        src: "https://images.unsplash.com/photo-1695306441929-0082158cfc27",
        alt: "Penari Tradisional",
        className: "md:col-span-1 md:row-span-2",
    },
    {
        id: 4,
        src: "https://images.unsplash.com/photo-1642762205001-aada86f9dbe2",
        alt: "Hutan Tropis Lebar",
        className: "md:col-span-2 md:row-span-1",
    },
    {
        id: 5,
        src: "https://images.unsplash.com/photo-1683602860321-76b30ad09a07",
        alt: "Penari Bali/Sunda",
        className: "md:col-span-1 md:row-span-2",
    },
    {
        id: 6,
        src: "https://images.unsplash.com/photo-1654180467459-cb1948a82073",
        alt: "Raflesia",
        className: "md:col-span-1 md:row-span-1",
    },
    {
        id: 7,
        src: "https://plus.unsplash.com/premium_photo-1664297926110-7cf2385f8280",
        alt: "Rusa Istana Bogor",
        className: "md:col-span-1 md:row-span-1",
    },
    {
        id: 8,
        src: "https://images.unsplash.com/photo-1505820013142-f86a3439c5b2?q=80&w=1200&auto=format&fit=crop",
        alt: "Pemandangan Kebun Raya",
        className: "md:col-span-2 md:row-span-1",
    },
];

export default function WisataDetailPage() {
    const [activeIndex, setActiveIndex] = useState(0);

    const containerRef = useRef<HTMLDivElement>(null); // Scope untuk useGSAP
    const textContainerRef = useRef<HTMLDivElement>(null);
    const sliderRef = useRef<HTMLDivElement>(null);

    const handleNext = () => {
        setActiveIndex((prev) => (prev + 1) % SLIDES.length);
    };

    const handlePrev = () => {
        setActiveIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
    };

    const handleCardClick = (index: number) => {
        setActiveIndex(index);
    };

    useGSAP(() => {
        const slider = sliderRef.current;
        const textCtx = textContainerRef.current;

        if (!slider || !textCtx) return;

        const cards = slider.children;
        if (cards.length > 0) {
            const cardWidth = (cards[0] as HTMLElement).offsetWidth;

            gsap.to(slider, {
                x: -(activeIndex * cardWidth),
                duration: 0.8,
                ease: "power3.inOut",
            });
        }

        const tl = gsap.timeline();
        tl.fromTo(
            textCtx.children,
            { y: 20, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.5,
                stagger: 0.05,
                ease: "power2.out",
            }
        );

    }, {
        scope: containerRef,
        dependencies: [activeIndex]
    });

    const activeSlide = SLIDES[activeIndex];

    return (
        <div ref={containerRef} className="min-h-screen container mx-auto px-6 md:px-12 lg:px-16 py-24">
            {/* HERO */}
            <div className="flex flex-col text-center gap-4">
                <h1 className="text-3xl md:text-5xl font-bethany font-extralight">Kebun Raya Bogor</h1>
                <div className="flex justify-center items-center">
                    <p className="text-sm md:text-base max-w-2xl opacity-90">
                        Terhampar di atas 87 hektar, Kebun Raya Bogor menyuguhkan paduan keindahan alam tropis dan jejak sejarah lebih dari dua abad. Jelajahi jalur setapak, zona koleksi tanaman, dan suasana sejuk yang menenangkan setiap langkah Anda.
                    </p>
                </div>

                <div className="relative w-full aspect-square md:aspect-21/9 overflow-hidden shadow-sm my-8 md:my-12">
                    <Image src="/images/wisata-detail-hero.png" alt="Kebun Raya Bogor" fill className="object-cover" />
                </div>
            </div>

            {/* CONTENT */}
            <section className="w-full overflow-hidden">
                <div ref={textContainerRef} className="mb-12">
                    <h2 className="text-2xl md:text-4xl lg:text-5xl font-bethany font-extralight leading-tight mb-4 md:mb-8 text-justify">
                        {activeSlide.headline}
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
                        <div className="md:col-span-4 text-sm md:text-base leading-relaxed opacity-90">
                            <p>{activeSlide.descCol1}</p>
                        </div>
                        <div className="md:col-span-4 text-sm md:text-base leading-relaxed opacity-90">
                            <p>{activeSlide.descCol2}</p>
                        </div>

                        <div className="md:col-span-4 flex justify-start md:justify-end items-end h-full gap-4 mt-4 md:mt-0">
                            <button
                                onClick={handlePrev}
                                className="w-12 h-12 rounded-full border border-[#2D1C04] flex items-center justify-center transition-colors duration-300 hover:bg-[#3E382A] hover:text-[#E8E8E0] active:scale-95"
                                aria-label="Previous Slide"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M15 18l-6-6 6-6" />
                                </svg>
                            </button>
                            <button
                                onClick={handleNext}
                                className="w-12 h-12 rounded-full bg-[#2D1C04] text-[#E8E8E0] flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
                                aria-label="Next Slide"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M9 18l6-6-6-6" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="relative w-full mt-8">
                    <div className="absolute right-0 top-0 bottom-0 w-12 md:w-32 z-10 pointer-events-none bg-linear-to-l from-[#ddddd1] to-transparent" />

                    <div
                        ref={sliderRef}
                        className="flex will-change-transform"
                    >
                        {SLIDES.map((slide, index) => (
                            <div
                                key={slide.id}
                                onClick={() => handleCardClick(index)}
                                className={`
                                    relative shrink-0 
                                    w-70 md:w-md lg:w-lg 
                                    aspect-square cursor-pointer group overflow-hidden
                                    transition-opacity duration-500
                                `}
                            >
                                <Image
                                    src={slide.image}
                                    alt={slide.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />

                                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

                                <div className="absolute top-6 left-6 right-6 flex justify-between items-start text-[#E8E8E0] font-bethany font-extralight">
                                    <span className="text-lg font-medium tracking-widest">{slide.category}</span>
                                    <span className="text-lg opacity-80">{slide.number}</span>
                                </div>

                                <div className="absolute bottom-8 left-6 right-6 text-[#E8E8E0]">
                                    <h3 className="text-2xl md:text-3xl font-bethany font-extralight leading-tight">
                                        {slide.title}
                                    </h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Virtual Tour */}
            <section className="flex flex-col text-center py-28">
                <h2 className="text-2xl md:text-5xl font-bethany font-extralight mb-12">Selamat Datang di <br /> Virtual Tour Kebun Raya Bogor</h2>
                <VirtualTour panoramaImage="/images/panorama.jpg" previewImage="/images/panorama.jpg" />
            </section>

            {/* MAP */}
            <section className="flex flex-col gap-12">
                <div className="flex flex-col md:flex-row gap-4 justify-between md:items-center">
                    <h2 className="text-3xl md:text-5xl font-bethany font-extralight md:w-1/2">Rute Menuju Kebun Raya Bogor</h2>
                    <div className="md:w-1/2 flex justify-end max-w-sm">
                        <p className="text-sm md:text-base opacity-90">
                            Kebun Raya Bogor menyimpan lebih dari 15.000 spesies tanaman dan menjadi tempat untuk menikmati keindahan alam serta belajar tentang keanekaragaman hayati.
                        </p>
                    </div>
                </div>
                <Map
                    start={[-6.619341068741454, 106.82138063302006]}
                    destination={[-6.5976821823144745, 106.79953224453664]}
                    info={{
                        title: "Kebun Raya Bogor",
                        address: "Jl. Otto Iskandardinata No.13, Paledang, Kecamatan Bogor Tengah",
                        rating: 4.7,
                        reviewCount: 102.624
                    }}
                />
            </section>

            {/* Gallery */}

            <section className="w-full py-24">
                {/* Header Text */}
                <div className="text-center mb-12">
                    <h2 className="text-2xl md:text-5xl font-bethany font-extralight mb-12">Jelajahi Galeri Di<br />Kebun Raya Bogor </h2>
                </div>

                {/* Grid Container */}
                <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[250px]">

                    {galleryItems.map((item) => (
                        <div
                            key={item.id}
                            className={`relative group overflow-hidden rounded-sm ${item.className} min-h-62.5`}
                        >
                            <Image
                                src={item.src}
                                alt={item.alt}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                                priority={item.id <= 3}
                            />
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}