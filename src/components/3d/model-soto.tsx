/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { Group } from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SotoTooltip } from "../shared/soto-tooltip";

gsap.registerPlugin(ScrollTrigger);

const TOOLTIPS = [
    {
        label: 'Sejarah Kuliner Soto',
        desc: 'Sejarah soto berakar dari akulturasi budaya Tionghoa di pesisir utara Jawa pada abad ke-19, berasal dari hidangan sup jeroan Tionghoa (chau tu), yang kemudian diadaptasi dengan bahan lokal seperti ayam, sapi, atau kerbau.',
        image: '/images/sejarah-soto.png',
        position: [-0.9, 0.5, 0] as [number, number, number]
    },
    {
        label: 'Resep Kuliner Soto',
        desc: 'Bumbu soto pada umumnya terdiri dari campuran rempah-rempah yang dihaluskan dan bumbu aromatik, meskipun ada sedikit perbedaan tergantung jenis sotonya (ayam, daging, bening, atau santan).',
        image: '/images/rempah.png',
        position: [0.8, 0.3, 0.3] as [number, number, number]
    },
    {
        label: 'Resep Kuliner Soto',
        desc: 'Bumbu soto pada umumnya terdiri dari campuran rempah-rempah yang dihaluskan dan bumbu aromatik, meskipun ada sedikit perbedaan tergantung jenis sotonya (ayam, daging, bening, atau santan).',
        image: '/images/rempah.png',
        position: [0, 0.72, -0.5] as [number, number, number]
    },
];

export function ModelSoto(props: any) {
    const { scene } = useGLTF("/3d/soto.glb");
    const groupRef = useRef<Group>(null);
    const [showTooltips, setShowTooltips] = useState(false);

    useLayoutEffect(() => {
        if (!groupRef.current) return;
        const group = groupRef.current;

        const ctx = gsap.context(() => {
            // ... (KODE ANIMASI KAMU YANG SUDAH BAGUS TETAP DISINI, TIDAK BERUBAH) ...

            // --- SETUP POSISI AWAL ---
            gsap.set(group.position, { x: -9, y: 0, z: 0 });

            gsap.set(group.rotation, {
                x: Math.PI / 2,
                y: 0,
                z: 0
            });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: "#kuliner-section",
                    start: "top top",
                    end: "+=300%",
                    pin: true,
                    scrub: 1,
                    onUpdate: (self) => {
                        // Tooltip muncul di akhir
                        setShowTooltips(self.progress > 0.85);
                    }
                }
            });

            // --- FASE 1 ---
            tl.to(group.position, {
                x: -2.5,
                ease: "power1.out",
                duration: 2.5
            }, "masuk")
                .to(group.rotation, {
                    z: 0,
                    y: -Math.PI * 2,
                    ease: "power1.out",
                    duration: 2.5
                }, "masuk");

            // --- JEDA ---
            tl.to({}, { duration: 0.5 });

            // --- FASE 2 ---
            tl.to("#section-2", {
                yPercent: -100,
                ease: "power2.inOut",
                duration: 3
            }, "pindah")
                .to(group.position, {
                    x: 0,
                    y: -1,
                    z: 2,
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
        });

        return () => ctx.revert();
    }, []);

    return (
        <group ref={groupRef} {...props}>
            <primitive object={scene} />

            {/* Render Tooltip menggunakan Component Terpisah */}
            {TOOLTIPS.map((item, index) => (
                <SotoTooltip
                    key={index}
                    data={item}
                    isVisible={showTooltips}
                />
            ))}
        </group>
    );
}