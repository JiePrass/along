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
                    className="relative w-70 md:w-87.5 py-24 md:py-32 px-8 flex items-center justify-center origin-center"
                >
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
                    <div ref={textRef}>
                        <h1 className="text-white text-3xl md:text-5xl uppercase text-center font-serif tracking-widest leading-tight">
                            Langkah <br /> Kecil <br /> Untuk
                        </h1>
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