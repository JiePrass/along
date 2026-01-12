"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const galleryData = [
    {
        src: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2",
        alt: "Wayang",
        className: "w-[60vw] md:w-[20vw] h-[30vh] md:left-[5%] md:top-[5%]",
        speed: -150
    },
    {
        src: "https://images.unsplash.com/photo-1505993597083-3bd19fb75e57",
        alt: "Borobudur Stupa",
        className: "w-[50vw] md:w-[15vw] h-[25vh] md:right-[10%] md:top-[10%] z-10",
        speed: -350
    },
    {
        src: "https://images.unsplash.com/photo-1537996194471-e657df975ab4",
        alt: "Tari Bali",
        className: "w-[70vw] md:w-[22vw] h-[40vh] md:left-[15%] md:top-[35%]",
        speed: -200
    },
    {
        src: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5",
        alt: "Prambanan",
        className: "w-[50vw] md:w-[18vw] h-[35vh] md:left-[45%] md:top-[25%] z-0",
        speed: -100
    },
    {
        src: "https://images.unsplash.com/photo-1537944434965-cf4679d1a598",
        alt: "Penari Tradisional",
        className: "w-[60vw] md:w-[20vw] h-[30vh] md:right-[15%] md:top-[50%] z-20",
        speed: -400
    },
    {
        src: "https://images.unsplash.com/photo-1501179691627-eeaa65ea017c",
        alt: "Pemandangan",
        className: "w-[80vw] md:w-[25vw] h-[30vh] md:left-[10%] md:top-[70%]",
        speed: -250
    },
    {
        src: "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8",
        alt: "Gunung Bromo",
        className: "w-[50vw] md:w-[15vw] h-[25vh] md:left-[40%] md:top-[80%] z-10",
        speed: -180
    },
];

export default function GallerySection() {
    const containerRef = useRef(null);
    const imagesRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Efek Parallax untuk setiap gambar
            imagesRef.current.forEach((img, i) => {
                if (!img) return;

                const speed = galleryData[i].speed;

                gsap.to(img, {
                    y: speed, // Bergerak ke atas (nilai negatif)
                    ease: "none",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top bottom", // Mulai saat section masuk viewport
                        end: "bottom top",   // Berhenti saat section keluar
                        scrub: 1,            // Smooth scrubbing
                    }
                });
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={containerRef}
            // 1. Background HARUS terang (putih atau cream muda)
            className="relative w-full"
            style={{ minHeight: "250vh" }}
        >
            {/* 2. Pasang mix-blend-difference di pembungkus teks */}
            <div className="sticky top-0 h-screen w-full flex items-center justify-center z-30 pointer-events-none mix-blend-difference">

                <h2 className="text-5xl md:text-7xl lg:text-8xl font-bethany text-center leading-[0.9] text-white">
                    Jelajahi Galeri Indonesia
                </h2>
            </div>

            <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
                {galleryData.map((item, index) => (
                    <div
                        key={index}
                        ref={(el) => { imagesRef.current[index] = el; }}
                        // Hapus sepia agar warna negatifnya lebih "tajam" dan jelas
                        className={`absolute rounded-lg overflow-hidden shadow-xl ${item.className}`}
                        style={{
                            top: `${(index * 15) + 10}%`,
                        }}
                    >
                        <div className={`w-full h-full relative block md:absolute md:inset-0`}>
                            <Image
                                src={`${item.src}?auto=format&fit=crop&q=80&w=800`}
                                alt={item.alt}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 50vw, 30vw"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}