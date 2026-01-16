/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import screenfull from "screenfull";
import "pannellum/build/pannellum.css";
import { HeadVR } from "../icons/head-vr"; // Pastikan path ini benar

// --- Imports Baru untuk Menu Lengkung ---
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Camera, ChevronLeft, ScanFace } from "lucide-react";

// Registrasi Plugin GSAP
gsap.registerPlugin(useGSAP);

// =========================================================
// SUB-COMPONENT: Curved Controls (Menu Melengkung)
// =========================================================
type CurvedControlsProps = {
    onClose: () => void;
    onScreenshot: () => void;
};

const CurvedControls = ({ onClose, onScreenshot }: CurvedControlsProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const timeline = useRef<GSAPTimeline | null>(null);
    const centerBtnRef = useRef<HTMLButtonElement>(null);
    const leftBtnRef = useRef<HTMLButtonElement>(null);
    const rightBtnRef = useRef<HTMLButtonElement>(null);

    useGSAP(() => {
        const leftBtn = leftBtnRef.current;
        const rightBtn = rightBtnRef.current;
        const centerBtn = centerBtnRef.current;

        // Setup posisi awal (tersembunyi di belakang)
        gsap.set([leftBtn, rightBtn], {
            x: 0, y: 0, rotation: 0, scale: 0.5, opacity: 0, zIndex: 0
        });

        const tl = gsap.timeline({
            paused: true,
            defaults: { duration: 0.5, ease: "back.out(1.7)" }
        });

        tl.to(leftBtn, {
            x: -140, // Jarak ke kiri
            y: 20,   // Turun sedikit (efek lengkung)
            rotation: -10,
            scale: 1,
            opacity: 1,
            zIndex: 10,
            transformOrigin: "center right",
        }, 0)
            .to(rightBtn, {
                x: 140, // Jarak ke kanan
                y: 20,  // Turun sedikit
                rotation: 10,
                scale: 1,
                opacity: 1,
                zIndex: 10,
                transformOrigin: "center left",
            }, 0)
            .to(centerBtn, {
                scale: 1.1,
                backgroundColor: "#10b981", // Emerald 500
                color: "#ffffff",
                borderColor: "#34d399",
                duration: 0.3
            }, 0);

        timeline.current = tl;
    }, { scope: containerRef });

    const handleToggle = () => {
        if (isOpen) {
            timeline.current?.reverse();
        } else {
            timeline.current?.play();
        }
        setIsOpen(!isOpen);
    };

    const sideBtnClass = "absolute flex items-center gap-2 bg-black/60 backdrop-blur-md text-white px-5 py-3 rounded-2xl border border-white/10 shadow-lg pointer-events-auto hover:bg-black/80 transition-colors";

    return (
        <div ref={containerRef} className="absolute bottom-10 left-0 right-0 z-30 flex justify-center items-end h-32 pointer-events-none">
            <div className="relative flex items-center justify-center pointer-events-auto">

                {/* TOMBOL KIRI (KEMBALI) */}
                <button ref={leftBtnRef} onClick={onClose} className={sideBtnClass}>
                    <ChevronLeft size={20} />
                    <span className="text-sm font-medium">Kembali</span>
                </button>

                {/* TOMBOL TENGAH (SIMULATOR) */}
                <button
                    ref={centerBtnRef}
                    onClick={handleToggle}
                    className="relative z-20 flex flex-col items-center justify-center w-20 h-20 rounded-full 
                    border-4 border-white/10 bg-black/60 backdrop-blur text-white shadow-2xl 
                    transition-all hover:scale-105 active:scale-95"
                >
                    <ScanFace size={30} />
                    <span className="text-[10px] font-bold mt-1 uppercase tracking-wider">
                        {isOpen ? 'Tutup' : 'Menu'}
                    </span>
                </button>

                {/* TOMBOL KANAN (SCREENSHOT) */}
                <button ref={rightBtnRef} onClick={onScreenshot} className={sideBtnClass}>
                    <Camera size={20} />
                    <span className="text-sm font-medium">Capture</span>
                </button>

            </div>
        </div>
    );
};