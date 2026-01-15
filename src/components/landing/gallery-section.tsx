/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const galleryData = [
    { src: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2", alt: "Wayang Kulit", speed: -120, t: "5%", l: "2%", wl: "20vw", wm: "40vw", w: 800, h: 1200 },
    { src: "https://images.unsplash.com/photo-1505993597083-3bd19fb75e57", alt: "Bromo", speed: -200, t: "10%", r: "4%", wl: "15vw", wm: "35vw", w: 1200, h: 800 },
    { src: "https://images.unsplash.com/photo-1537996194471-e657df975ab4", alt: "Candi", speed: -150, t: "12%", l: "12%", wl: "22vw", wm: "45vw", w: 800, h: 1200 },
    { src: "https://images.unsplash.com/photo-1755077012428-cf36fee31c1c", alt: "Tari Kecak", speed: -100, t: "15%", r: "25%", wl: "18vw", wm: "40vw", w: 1200, h: 900 },
    { src: "https://images.unsplash.com/photo-1654180467459-cb1948a82073", alt: "Raflessia Arnoldi", speed: -220, t: "18%", l: "70%", wl: "18vw", wm: "40vw", w: 800, h: 1200 },
    { src: "https://images.unsplash.com/photo-1529563021893-cc83c992d75d", alt: "Sate", speed: -230, t: "22%", l: "28%", wl: "15vw", wm: "35vw", w: 800, h: 1000 },
    { src: "https://images.unsplash.com/photo-1685704111590-258e65cde02a", alt: "Rumah Gadang", speed: -280, t: "25%", r: "16%", wl: "20vw", wm: "38vw", w: 800, h: 1200 },
    { src: "https://images.unsplash.com/photo-1704948211410-007f7d5f4355", alt: "Pink Beach Labuan Bajo", speed: -190, t: "30%", l: "5%", wl: "24vw", wm: "50vw", w: 1200, h: 800 },
    { src: "https://images.unsplash.com/photo-1501179691627-eeaa65ea017c", alt: "Pemandangan Alam", speed: -180, t: "35%", l: "40%", wl: "25vw", wm: "50vw", w: 1200, h: 800 },
    { src: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62", alt: "Candi 2", speed: -150, t: "38%", r: "8%", wl: "20vw", wm: "40vw", w: 800, h: 1000 },
    { src: "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8", alt: "Pulau Flores", speed: -130, t: "42%", l: "10%", wl: "15vw", wm: "35vw", w: 800, h: 1200 },
    { src: "https://plus.unsplash.com/premium_photo-1664297926110-7cf2385f8280", alt: "Komodo", speed: -250, t: "45%", r: "30%", wl: "16vw", wm: "35vw", w: 1200, h: 800 },
    { src: "https://images.unsplash.com/photo-1703769605297-cc74106244d9", alt: "Raja Ampat", speed: -220, t: "50%", r: "4%", wl: "22vw", wm: "42vw", w: 1200, h: 800 },
    { src: "https://images.unsplash.com/photo-1683602860321-76b30ad09a07", alt: "Dieng", speed: -170, t: "54%", l: "25%", wl: "20vw", wm: "45vw", w: 1200, h: 900 },
    { src: "https://plus.unsplash.com/premium_photo-1713251454153-8b913826482f", alt: "Pencak Silat", speed: -140, t: "59%", l: "8%", wl: "18vw", wm: "40vw", w: 600, h: 1000 },
    { src: "https://images.unsplash.com/photo-1695306441929-0082158cfc27", alt: "Batik", speed: -210, t: "60%", r: "38%", wl: "18vw", wm: "40vw", w: 800, h: 1200 },
    { src: "https://images.unsplash.com/photo-1621118209138-de12f6a48d5e", alt: "Masakan Nusantara", speed: -300, t: "65%", r: "10%", wl: "15vw", wm: "35vw", w: 1000, h: 1000 },
    { src: "https://images.unsplash.com/photo-1642762205001-aada86f9dbe2", alt: "Danau Toba", speed: -170, t: "70%", l: "35%", wl: "18vw", wm: "40vw", w: 1200, h: 800 },
    { src: "https://images.unsplash.com/photo-1670179716382-42dfa4f0d5b4", alt: "Desa Toraja", speed: -110, t: "72%", l: "5%", wl: "20vw", wm: "45vw", w: 1200, h: 900 },
    { src: "https://static.uc.ac.id/htb/2019/01/portal-bisnis-wisata.jpg", alt: "Reog Ponorogo", speed: -240, t: "75%", r: "20%", wl: "17vw", wm: "38vw", w: 800, h: 1000 },
    { src: "https://images.unsplash.com/photo-1691229219602-f3634d8ff4b0", alt: "Angklung", speed: -240, t: "78%", r: "2%", wl: "16vw", wm: "38vw", w: 800, h: 1200 },
    { src: "https://images.unsplash.com/photo-1698267703889-06c41f9acba5", alt: "Gunung Rinjani", speed: -190, t: "86%", l: "15%", wl: "22vw", wm: "45vw", w: 1200, h: 800 },
    { src: "https://images.unsplash.com/photo-1533632368662-0cdf02790f17", alt: "Hutan Mati", speed: -140, t: "80%", l: "50%", wl: "22vw", wm: "40vw", w: 800, h: 1000 },
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
            style={{ minHeight: "600vh" }}
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
                        className="parallax-item absolute shadow-2xl bg-gray-200"
                        data-speed={item.speed}
                        style={{
                            top: item.t,
                            left: item.l || "auto",
                            right: item.r || "auto",
                            width: `var(--responsive-w-${index})`,
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

                        <div className="w-full relative">
                            <Image
                                src={`${item.src}?auto=format&fit=crop&q=80&w=800`}
                                alt={item.alt}
                                width={item.w || 800}
                                height={item.h || 600}
                                className="w-full h-auto object-cover block"
                                sizes="(max-width: 768px) 50vw, 30vw"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}