"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";

export default function HeroSection() {
    const containerRef = useRef(null);
    const borderRef = useRef(null);
    const textRef = useRef(null);
    const bgRef = useRef(null);
    const leftWayangRef = useRef(null);
    const rightWayangRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline();

            gsap.set(leftWayangRef.current, { xPercent: -100, rotation: -30 });
            gsap.set(rightWayangRef.current, { xPercent: 100, rotation: 30 });
            gsap.set(bgRef.current, { scale: 1.1 });

            tl.fromTo(borderRef.current,
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
                    ease: "back.out(1.2)"
                }, "-=0.5");

            const handleMouseMove = (e: MouseEvent) => {
                const { clientX, clientY } = e;
                const xPos = (clientX / window.innerWidth) - 0.5;
                const yPos = (clientY / window.innerHeight) - 0.5;

                gsap.to(bgRef.current, {
                    x: xPos * 100,
                    y: yPos * 100,
                    duration: 2.5,
                    ease: "power2.out"
                });

                gsap.to(leftWayangRef.current, {
                    x: xPos * 60,
                    y: Math.abs(xPos) * -25,
                    rotation: xPos * 15,
                    duration: 1.8,
                    ease: "power2.out"
                });

                gsap.to(rightWayangRef.current, {
                    x: xPos * 60,
                    y: Math.abs(xPos) * -25,
                    rotation: xPos * 15,
                    duration: 2.2,
                    ease: "power2.out"
                });
            };

            window.addEventListener("mousemove", handleMouseMove);
            return () => window.removeEventListener("mousemove", handleMouseMove);

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative h-screen w-full overflow-hidden bg-black"
        >
            <div ref={bgRef} className="absolute inset-0 z-0 scale-115">
                <Image
                    src="/images/hero-bg.png"
                    alt="Background"
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            <div className="relative z-30 flex items-center justify-center h-full">
                <div className="relative w-70 md:w-87.5 py-24 md:py-32 px-8 flex items-center justify-center">
                    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <rect ref={borderRef} x="0" y="0" width="100" height="100" fill="none" stroke="white" strokeWidth="0.5" vectorEffect="non-scaling-stroke" />
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