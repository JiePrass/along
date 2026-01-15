/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRef, useState, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { Group } from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SotoTooltip } from "../shared/soto-tooltip";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const TOOLTIPS = [
    {
        label: 'Sejarah Kuliner Soto',
        desc: 'Sejarah soto berakar dari akulturasi budaya Tionghoa di pesisir utara Jawa pada abad ke-19, berasal dari hidangan sup jeroan Tionghoa (chau tu), yang kemudian diadaptasi dengan bahan lokal seperti ayam, sapi, atau kerbau.',
        image: '/images/sejarah-soto.png',
        position: [-0.9, 0.5, 0] as [number, number, number],
        mobilePosition: [-0.6, 0.1, 0.2] as [number, number, number]
    },
    {
        label: 'Resep Kuliner Soto',
        desc: 'Bumbu soto pada umumnya terdiri dari campuran rempah-rempah yang dihaluskan dan bumbu aromatik, meskipun ada sedikit perbedaan tergantung jenis sotonya (ayam, daging, bening, atau santan).',
        image: '/images/rempah.png',
        position: [0.8, 0.3, 0.3] as [number, number, number],
        mobilePosition: [0.4, 0.1, 0.4] as [number, number, number]
    },
    {
        label: 'Detail Rempah',
        desc: 'Bumbu soto pada umumnya terdiri dari campuran rempah-rempah yang dihaluskan dan bumbu aromatik, meskipun ada sedikit perbedaan tergantung jenis sotonya (ayam, daging, bening, atau santan).',
        image: '/images/rempah.png',
        position: [0, 0.72, -0.5] as [number, number, number],
        mobilePosition: [0, 0.8, -0.2] as [number, number, number]
    },
];

export function ModelSoto(props: any) {
    const { scene } = useGLTF("/3d/soto.glb");
    const groupRef = useRef<Group>(null);
    const [showTooltips, setShowTooltips] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Deteksi mobile tetap menggunakan useEffect biasa
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // Migrasi ke useGSAP
    useGSAP(() => {
        if (!groupRef.current) return;
        const group = groupRef.current;

        const config = {
            scale: isMobile ? 1.2 : 2.5,
            fase1X: isMobile ? 0 : -2.5,
            fase2Y: isMobile ? -0.5 : -1,
            fase2Z: isMobile ? 3 : 2,
        };

        gsap.set(group.scale, { x: config.scale, y: config.scale, z: config.scale });
        gsap.set(group.position, { x: -9, y: 0, z: 0 });
        gsap.set(group.rotation, { x: Math.PI / 2, y: 0, z: 0 });
        gsap.set("#section-2", { yPercent: 100 });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: "#kuliner-section",
                start: "top top",
                end: "+=300%",
                pin: true,
                scrub: 1,
                invalidateOnRefresh: true,
                onUpdate: (self) => {
                    setShowTooltips(self.progress > 0.85);
                }
            }
        });

        tl.to(group.position, {
            x: config.fase1X,
            ease: "power1.out",
            duration: 2
        }, "masuk")
            .to(group.rotation, {
                z: 0,
                y: -Math.PI * 2,
                ease: "power1.out",
                duration: 2
            }, "masuk");

        tl.to({}, { duration: 0.5 });

        tl.to("#section-2", {
            yPercent: 0.1,
            ease: "power2.inOut",
            duration: 3
        }, "pindah");
        tl.to(group.position, {
            x: 0,
            y: config.fase2Y,
            z: config.fase2Z,
            ease: "power2.inOut",
            duration: 3
        }, "pindah")
            .to(group.rotation, {
                x: 0.5,
                y: -Math.PI * 4,
                z: 0.15,
                ease: "power2.inOut",
                duration: 3
            }, "pindah");

        ScrollTrigger.refresh();

    }, { dependencies: [isMobile], revertOnUpdate: true });

    return (
        <group ref={groupRef} {...props}>
            <primitive object={scene} />

            {TOOLTIPS.map((item, index) => {
                const finalPosition = isMobile ? item.mobilePosition : item.position;

                return (
                    <SotoTooltip
                        key={index}
                        data={{
                            ...item,
                            position: finalPosition
                        }}
                        isVisible={showTooltips}
                    />
                );
            })}
        </group>
    );
}