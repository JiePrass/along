"use client";

import { createContext, useContext, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const TransitionContext = createContext({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    triggerTransition: (href: string) => { },
});

export const usePageTransition = () => useContext(TransitionContext);

export default function PageTransitionProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const pathname = usePathname();
    const overlayRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const [isTransitioning, setIsTransitioning] = useState(false);

    useGSAP(() => {
        gsap.set(overlayRef.current, { yPercent: 100, autoAlpha: 1 });
        gsap.set(textRef.current, { y: 50, autoAlpha: 0 });
    }, { scope: overlayRef });

    const triggerTransition = (href: string) => {
        if (href === pathname || isTransitioning) return;
        setIsTransitioning(true);
        console.log("🎬 Animasi START (Layar Menutup)");

        const tl = gsap.timeline({
            onComplete: () => {
                console.log("🚀 Animasi SELESAI -> Pindah Route sekarang!");
                router.push(href);
            },
        });

        tl.to(overlayRef.current, {
            yPercent: 0,
            duration: 0.8,
            ease: "power4.inOut",
        })
            .to(textRef.current, {
                y: 0,
                autoAlpha: 1,
                duration: 0.4,
                ease: "power2.out"
            }, "-=0.4");
    };

    useGSAP(() => {
        if (!isTransitioning) return;
        const tl = gsap.timeline({
            onComplete: () => {
                setIsTransitioning(false);
                gsap.set(textRef.current, { y: 50, autoAlpha: 0 });
                gsap.set(overlayRef.current, { yPercent: 100 });
            }
        });

        tl.to(textRef.current, {
            y: -50,
            autoAlpha: 0,
            duration: 0.3,
            delay: 0.2
        })
            .to(overlayRef.current, {
                yPercent: -100,
                duration: 0.8,
                ease: "power4.inOut",
            }, "-=0.1");

    }, [pathname]);

    return (
        <TransitionContext.Provider value={{ triggerTransition }}>
            <div
                ref={overlayRef}
                className="fixed inset-0 z-999 flex items-center bg-white justify-center pointer-events-none w-screen h-screen"
            >
                <div ref={textRef} className="opacity-0 translate-y-10">
                    <h2 className="text-4xl md:text-6xl font-bold tracking-widest">
                        LOADING...
                    </h2>
                </div>
            </div>

            <main className="relative z-1">{children}</main>
        </TransitionContext.Provider>
    );
}