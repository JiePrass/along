"use client";
import { useRef } from "react";
import { useGLTF, Center } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import * as THREE from "three";

useGLTF.preload("/3d/kristal.glb");

interface CrystalProps {
    triggerRef: React.RefObject<HTMLElement | null>;
}

export function ModelKristal({ triggerRef }: CrystalProps) {
    const groupRef = useRef<THREE.Group>(null);
    const { scene } = useGLTF("/3d/kristal.glb");
    const { viewport } = useThree();

    useGSAP(() => {
        if (!triggerRef.current || !groupRef.current) return;

        const startY = -viewport.height * 0.1;
        const startX = 0;

        gsap.set(groupRef.current.scale, { x: 1.5, y: 1.5, z: 1.5 });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: triggerRef.current,
                start: "top top",
                end: "bottom bottom",
                scrub: 1,
                invalidateOnRefresh: true,
            }
        });

        // 1. Animasi Rotasi (Mulai dari 0 ke Putaran penuh)
        tl.fromTo(groupRef.current.rotation,
            { y: 0, z: 0, x: 0 },
            {
                y: Math.PI * 2,
                z: -Math.PI / 12,
                x: Math.PI / 12,
                ease: "power1.inOut",
                duration: 10
            }, 0);

        tl.fromTo(groupRef.current.position,
            { x: startX, y: startY },
            {
                x: -viewport.width * 0.25,
                y: viewport.height * 0.05,
                ease: "power1.inOut",
                duration: 5
            }, 0);

        tl.to(groupRef.current.position, {
            x: viewport.width * 0.25,
            y: -viewport.height * 0.0001,
            ease: "power1.inOut",
            duration: 5
        }, ">");

    }, { dependencies: [viewport], scope: groupRef });

    return (
        <group ref={groupRef}>
            <Center>
                <primitive object={scene} scale={3} />
            </Center>
        </group>
    );
}