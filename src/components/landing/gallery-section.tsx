/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const galleryData = [
    { src: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2", alt: "Wayang Kulit", speed: -120, t: "20%", l: "12%", lm: "5%", wm: "45vw", wl: "20vw", w: 800, h: 1200 },
    { src: "https://images.unsplash.com/photo-1505993597083-3bd19fb75e57", alt: "Bromo", speed: -200, t: "25%", r: "8%", rm: "5%", wm: "40vw", wl: "15vw", w: 1200, h: 800 },
    { src: "https://images.unsplash.com/photo-1537996194471-e657df975ab4", alt: "Candi", speed: -150, t: "29%", l: "6%", lm: "5%", tm: "32%", wm: "45vw", wl: "22vw", w: 800, h: 1200 },
    { src: "https://images.unsplash.com/photo-1755077012428-cf36fee31c1c", alt: "Tari Kecak", speed: -100, t: "29%", r: "25%", rm: "5%", tm: "35%", wm: "45vw", wl: "18vw", w: 1200, h: 900 },
    { src: "https://images.unsplash.com/photo-1529563021893-cc83c992d75d", alt: "Sate", speed: -230, t: "38%", l: "25%", lm: "8%", tm: "42%", wm: "40vw", wl: "15vw", w: 800, h: 1000 },
    { src: "https://images.unsplash.com/photo-1685704111590-258e65cde02a", alt: "Rumah Gadang", speed: -280, t: "38%", r: "12%", rm: "8%", tm: "45%", wm: "42vw", wl: "20vw", w: 800, h: 1200 },
    { src: "https://images.unsplash.com/photo-1704948211410-007f7d5f4355", alt: "Pink Beach", speed: -190, t: "50%", l: "5%", lm: "5%", tm: "52%", wm: "55vw", wl: "24vw", w: 1200, h: 800 },
    { src: "https://images.unsplash.com/photo-1501179691627-eeaa65ea017c", alt: "Alam", speed: -180, t: "50%", l: "40%", rm: "5%", tm: "55%", wm: "50vw", wl: "25vw", w: 1200, h: 800 },
    { src: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62", alt: "Candi 2", speed: -150, t: "52%", r: "8%", lm: "5%", tm: "60%", wm: "45vw", wl: "20vw", w: 800, h: 1000 },
    { src: "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8", alt: "Flores", speed: -130, t: "60%", l: "11%", rm: "5%", tm: "65%", wm: "40vw", wl: "15vw", w: 800, h: 1200 },
    { src: "https://plus.unsplash.com/premium_photo-1664297926110-7cf2385f8280", alt: "Komodo", speed: -250, t: "61%", r: "30%", lm: "5%", tm: "68%", wm: "40vw", wl: "16vw", w: 1200, h: 800 },
    { src: "https://images.unsplash.com/photo-1703769605297-cc74106244d9", alt: "Raja Ampat", speed: -220, t: "67%", r: "4%", rm: "5%", tm: "74%", wm: "45vw", wl: "22vw", w: 1200, h: 800 },
    { src: "https://images.unsplash.com/photo-1683602860321-76b30ad09a07", alt: "Dieng", speed: -170, t: "65%", l: "35%", lm: "5%", tm: "78%", wm: "50vw", wl: "20vw", w: 1200, h: 900 },
    { src: "https://plus.unsplash.com/premium_photo-1713251454153-8b913826482f", alt: "Silat", speed: -140, t: "73%", l: "5%", rm: "5%", tm: "82%", wm: "45vw", wl: "18vw", w: 600, h: 1000 },
    { src: "https://images.unsplash.com/photo-1695306441929-0082158cfc27", alt: "Batik", speed: -210, t: "75%", l: "32%", lm: "8%", tm: "86%", wm: "45vw", wl: "18vw", w: 800, h: 1200 },
    { src: "https://images.unsplash.com/photo-1654180467459-cb1948a82073", alt: "Raflessia", speed: -300, t: "80%", r: "20%", rm: "5%", tm: "90%", wm: "40vw", wl: "15vw", w: 1000, h: 1000 },
    { src: "https://images.unsplash.com/photo-1642762205001-aada86f9dbe2", alt: "Toba", speed: -170, t: "83%", r: "12%", lm: "25%", tm: "94%", wm: "50vw", wl: "18vw", w: 1200, h: 800 },
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
                y: isMobile ? speed * 0.3 : speed,
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
            style={{ minHeight: "400vh" }}
        >
            <div className="sticky top-0 h-screen w-full flex items-center justify-center z-50 pointer-events-none mix-blend-difference">
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-bethany text-center leading-[0.85] text-white px-6">
                    Jelajahi Galeri Indonesia
                </h2>
            </div>

            <div className="absolute top-0 left-0 w-full h-full z-10">
                {galleryData.map((item: any, index) => (
                    <div
                        key={index}
                        className="parallax-item absolute shadow-2xl bg-gray-200"
                        data-speed={item.speed}
                        style={{
                            // Menggunakan CSS Variable untuk posisi
                            top: `var(--responsive-top-${index})`,
                            left: `var(--responsive-left-${index})`,
                            right: `var(--responsive-right-${index})`,
                            width: `var(--responsive-w-${index})`,
                            zIndex: Math.floor(Math.abs(item.speed) / 5),
                        } as any}
                    >
                        {/* INI KUNCI AGAR DESKTOP TETAP SAMA TAPI MOBILE BERUBAH */}
                        <style dangerouslySetInnerHTML={{
                            __html: `
                            :root {
                                --responsive-w-${index}: ${item.wm};
                                /* Mobile Defaults (Zig-Zag Pattern) */
                                --responsive-top-${index}: ${item.tm || item.t}; 
                                --responsive-left-${index}: ${item.lm ? item.lm : 'auto'};
                                --responsive-right-${index}: ${item.rm ? item.rm : 'auto'};
                            }
                            
                            @media (min-width: 768px) {
                                :root {
                                    /* Desktop (Original Values) - Tidak berubah */
                                    --responsive-w-${index}: ${item.wl};
                                    --responsive-top-${index}: ${item.t};
                                    --responsive-left-${index}: ${item.l || 'auto'};
                                    --responsive-right-${index}: ${item.r || 'auto'};
                                }
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