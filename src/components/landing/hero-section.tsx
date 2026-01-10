"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
    const containerRef = useRef(null);
    const borderRef = useRef(null);
    const textRef = useRef(null);
    const centerBoxRef = useRef(null);
    const bgRef = useRef(null);
    const leftWayangRef = useRef(null);
    const rightWayangRef = useRef(null);

    useEffect(() => {
        document.body.style.overflow = "hidden";
        const ctx = gsap.context(() => {
            const introTl = gsap.timeline();

            gsap.set(leftWayangRef.current, { xPercent: -100, rotation: -30 });
            gsap.set(rightWayangRef.current, { xPercent: 100, rotation: 30 });
            gsap.set(bgRef.current, { scale: 1.1 });

            introTl
                .fromTo(borderRef.current,
                    { strokeDasharray: 2000, strokeDashoffset: 2000 },
                    { strokeDashoffset: 0, duration: 3, ease: "power3.inOut" }
                )
                .fromTo(textRef.current,
                    { opacity: 0, x: -30 },
                    { opacity: 1, x: 0, duration: 1 },
                    "-=1"
                )
                .to([leftWayangRef.current, rightWayangRef.current], {
                    xPercent: 0,
                    rotation: 0,
                    duration: 2,
                    ease: "back.out(1.2)",
                    onComplete: () => {
                        document.body.style.overflow = "auto";

                        initScrollAnimations();
                    }
                }, "-=0.5");

            const initScrollAnimations = () => {
                const scrollTl = gsap.timeline({
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top top",
                        pin: true,
                        pinSpacing: false,
                        end: "+=150%",
                        scrub: 1,
                    }
                });

                scrollTl.to(leftWayangRef.current, {
                    xPercent: -200,
                    opacity: 0,
                    ease: "power1.in"
                }, 0);

                scrollTl.to(rightWayangRef.current, {
                    xPercent: 200,
                    opacity: 0,
                    ease: "power1.in"
                }, 0);

                scrollTl.to(centerBoxRef.current, {
                    scale: 50,
                    duration: 1,
                    ease: "power2.in",
                }, 0);

                scrollTl.to(textRef.current, {
                    opacity: 0,
                    duration: 0.2,
                }, 0);

                scrollTl.to(borderRef.current, {
                    strokeWidth: 0.1,
                    opacity: 0,
                    duration: 0.8
                }, 0);

                scrollTl.to(bgRef.current, {
                    scale: 2,
                    opacity: 0,
                    ease: "power2.in"
                }, 0);

                scrollTl.to(containerRef.current, {
                    autoAlpha: 0,
                    duration: 0.2
                }, 0.8);
            };

            const handleMouseMove = (e: MouseEvent) => {
                const { clientX, clientY } = e;
                const xPos = (clientX / window.innerWidth) - 0.5;
                const yPos = (clientY / window.innerHeight) - 0.5;

                gsap.to(bgRef.current, {
                    x: xPos * 50,
                    y: yPos * 50,
                    duration: 2.5,
                    ease: "power2.out",
                    overwrite: "auto"
                });

                gsap.to(leftWayangRef.current, {
                    x: xPos * 60,
                    y: Math.abs(xPos) * -25,
                    rotation: xPos * 15,
                    duration: 1.8,
                    ease: "power2.out",
                    overwrite: "auto"
                });

                gsap.to(rightWayangRef.current, {
                    x: xPos * 60,
                    y: Math.abs(xPos) * -25,
                    rotation: xPos * 15,
                    duration: 2.2,
                    ease: "power2.out",
                    overwrite: "auto"
                });
            };

            window.addEventListener("mousemove", handleMouseMove);
            return () => window.removeEventListener("mousemove", handleMouseMove);

        }, containerRef);

        return () => {
            document.body.style.overflow = "auto";
            ctx.revert();
        };
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative h-screen w-full overflow-hidden bg-background"
        >
            <div ref={bgRef} className="absolute inset-0 z-0 scale-110">
                <Image
                    src="/images/hero-bg.png"
                    alt="Background"
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            <div className="relative z-30 flex items-center justify-center h-full pointer-events-none">
                <div
                    ref={centerBoxRef}
                    className="relative w-full max-w-78 mb-32 mt-0 md:mt-4 md:mb-0 md:max-w-sm p-6 md:p-8 flex flex-col justify-between origin-center bg-transparent"
                >
                    {/* SVG Border (Tetap sama) */}
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <rect
                            ref={borderRef}
                            x="0" y="0" width="100" height="100"
                            fill="none"
                            stroke="white"
                            strokeWidth="0.5"
                            vectorEffect="non-scaling-stroke"
                        />
                    </svg>

                    <div ref={textRef} className="relative z-10 flex flex-col justify-between h-full gap-12">

                        <div className="flex flex-col gap-6 text-left">
                            <h1 className="text-white text-3xl md:text-5xl font-serif leading-[0.95] tracking-tight">
                                Jelajahi <br />
                                Indonesia Secara <br />
                                Langsung <br />
                                Bersama ALONG
                            </h1>

                            <p className="text-white/90 font-sans font-medium leading-relaxed max-w-sm">
                                GreenFlow adalah aplikasi untuk memantau jejak karbon dan berpartisipasi
                            </p>
                        </div>

                        {/* Bagian Bawah: Tombol (Pojok Kanan Bawah) */}
                        <div className="flex justify-end pointer-events-auto">
                            <button className="group border border-white px-6 py-3 text-white text-sm md:text-base uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300 flex items-center gap-3">
                                Jelajahi Sekarang
                                <span className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300 text-lg">↗</span>
                            </button>
                        </div>

                    </div>
                </div>
            </div>

            <div ref={leftWayangRef} className="absolute -left-[10%] bottom-0 z-40 w-[50%] h-[95%] pointer-events-none">
                <div className="relative w-full h-full origin-bottom-right">
                    <Image src="/images/wayang-kiri.svg" alt="Wayang Kiri" fill className="object-contain object-bottom" />
                </div>
            </div>

            <div ref={rightWayangRef} className="absolute -right-[10%] bottom-0 z-40 w-[50%] h-[95%] pointer-events-none">
                <div className="relative w-full h-full origin-bottom-left">
                    <Image src="/images/wayang-kanan.svg" alt="Wayang Kanan" fill className="object-contain object-bottom" />
                </div>
            </div>
        </section>
    );
}