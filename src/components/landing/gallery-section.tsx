/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const galleryData = [
    { src: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2", alt: "Wayang", speed: -120, t: "5%", l: "2%", wl: "20vw", wm: "40vw" },
    { src: "https://images.unsplash.com/photo-1505993597083-3bd19fb75e57", alt: "Borobudur", speed: -200, t: "10%", r: "2%", wl: "15vw", wm: "35vw" },
    { src: "https://images.unsplash.com/photo-1537996194471-e657df975ab4", alt: "Tari Bali", speed: -150, t: "20%", l: "12%", wl: "22vw", wm: "45vw" },
    { src: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5", alt: "Prambanan", speed: -100, t: "15%", r: "25%", wl: "18vw", wm: "40vw" },
    { src: "https://images.unsplash.com/photo-1537944434965-cf4679d1a598", alt: "Penari", speed: -280, t: "28%", r: "8%", wl: "20vw", wm: "38vw" },
    { src: "https://images.unsplash.com/photo-1501179691627-eeaa65ea017c", alt: "Pemandangan", speed: -180, t: "35%", l: "3%", wl: "25vw", wm: "50vw" },
    { src: "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8", alt: "Bromo", speed: -130, t: "42%", l: "35%", wl: "15vw", wm: "35vw" },
    { src: "https://images.unsplash.com/photo-1570729732313-2d12fc223075", alt: "Raja Ampat", speed: -220, t: "50%", r: "4%", wl: "22vw", wm: "42vw" },
    { src: "https://images.unsplash.com/photo-1516690561799-46d8f74f9abf", alt: "Komodo", speed: -140, t: "58%", l: "18%", wl: "18vw", wm: "40vw" },
    { src: "https://images.unsplash.com/photo-1512058560366-cd2429fb5c6c", alt: "Kuliner", speed: -300, t: "65%", r: "15%", wl: "15vw", wm: "35vw" },
    { src: "https://images.unsplash.com/photo-1540324153951-8716b085f441", alt: "Toraja", speed: -110, t: "72%", l: "2%", wl: "20vw", wm: "45vw" },
    { src: "https://images.unsplash.com/photo-1615486511484-92e172cc4fe0", alt: "Batik", speed: -240, t: "78%", r: "5%", wl: "16vw", wm: "38vw" },
    { src: "https://images.unsplash.com/photo-1555400038-63f5ba517a47", alt: "Ubud", speed: -140, t: "84%", l: "45%", wl: "22vw", wm: "40vw" },
    { src: "https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272", alt: "Rinjani", speed: -190, t: "88%", l: "8%", wl: "18vw", wm: "42vw" },
    { src: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62", alt: "Flores", speed: -150, t: "35%", r: "2%", wl: "20vw", wm: "40vw" },
    { src: "https://images.unsplash.com/photo-1604938828690-6be3f044957e", alt: "Candi", speed: -230, t: "25%", l: "28%", wl: "15vw", wm: "35vw" },
    { src: "https://images.unsplash.com/photo-1596401057633-565652b5e260", alt: "Danau Toba", speed: -170, t: "70%", r: "30%", wl: "18vw", wm: "40vw" },
];

export default function GallerySection() {
    const containerRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        if (!containerRef.current) return;
        const items = gsap.utils.toArray<HTMLElement>(".parallax-item");

        items.forEach((item) => {
            const speed = parseFloat(item.getAttribute("data-speed") || "0");
            const isMobile = window.innerWidth < 768;

            gsap.to(item, {
                y: isMobile ? speed * 0.4 : speed,
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1,
                }
            });
        });
    }, { scope: containerRef });

    return (
        <section
            ref={containerRef}
            className="relative w-full"
            style={{ minHeight: "480vh" }}
        >
            <div className="sticky top-0 h-screen w-full flex items-center justify-center z-50 pointer-events-none mix-blend-difference">
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-bethany text-center leading-[0.85] text-white px-6">
                    Jelajahi Galeri Indonesia
                </h2>
            </div>

            <div className="absolute top-0 left-0 w-full h-full z-10">
                {galleryData.map((item, index) => (
                    <div
                        key={index}
                        className="parallax-item absolute overflow-hidden shadow-2xl bg-gray-200"
                        data-speed={item.speed}
                        style={{
                            top: item.t,
                            left: item.l || "auto",
                            right: item.r || "auto",
                            width: `var(--responsive-w-${index})`,
                            aspectRatio: "3/4",
                            zIndex: Math.floor(Math.abs(item.speed) / 5),
                        } as any}
                    >
                        <style dangerouslySetInnerHTML={{
                            __html: `
                            :root { --responsive-w-${index}: ${item.wm}; }
                            @media (min-width: 768px) {
                                :root { --responsive-w-${index}: ${item.wl}; }
                            }
                        `}} />

                        <div className="w-full h-full relative">
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