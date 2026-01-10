"use client";
import { useGLTF } from "@react-three/drei";

useGLTF.preload("/3d/kristal.glb");

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ModelKristal(props: any) {
    const { scene } = useGLTF("/3d/kristal.glb");

    return (
        <primitive
            object={scene}
            scale={3}
            {...props}
        />
    );
}