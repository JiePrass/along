"use client";

import { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { Group } from "three";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ModelSotoKuliner(props: any) {
    const { scene } = useGLTF("/3d/soto.glb");
    const groupRef = useRef<Group>(null);

    useGSAP(() => {
        if (!groupRef.current) return;
        const group = groupRef.current;

        const tl = gsap.timeline({
            defaults: { ease: "power2.inOut", duration: 3 }
        });

        gsap.set(group.position, { x: 10, y: 0, z: 0 });
        gsap.set(group.rotation, {
            x: 0,
            y: -Math.PI * 2,
        });
        gsap.set(group.scale, { x: 3, y: 3, z: 3 });

        tl.to(group.position, {
            x: 0,
            y: 0
        })
            .to(group.rotation, {
                y: Math.PI * 3,
                x: 0,
            }, "<");

    }, { scope: groupRef });

    return (
        <group ref={groupRef} {...props}>
            <primitive object={scene} />
        </group>
    );
}