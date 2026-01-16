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
import { SimulatorIcon } from "../icons/vr";

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
                x: 140,
                y: 20,
                rotation: 10,
                scale: 1,
                opacity: 1,
                zIndex: 10,
                transformOrigin: "center left",
            }, 0)
            .to(centerBtn, {
                scale: 1.1,
                backgroundColor: "#10b981",
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
                    <SimulatorIcon size={30} />
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


// =========================================================
// MAIN COMPONENT: VirtualTour
// =========================================================

type VirtualTourProps = {
    panoramaImage: string;
    previewImage: string;
};

export default function VirtualTour({ panoramaImage, previewImage }: VirtualTourProps) {
    const [isTourActive, setIsTourActive] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const pannellumInstance = useRef<any>(null);

    const handleStartTour = () => {
        setIsTourActive(true);
        if (screenfull.isEnabled && containerRef.current) {
            screenfull.request(containerRef.current);
        }
    };

    const handleCloseTour = () => {
        setIsTourActive(false);
        if (screenfull.isEnabled && screenfull.isFullscreen) {
            screenfull.exit();
        }
    };

    // Fungsi Screenshot Canvas Pannellum
    const handleScreenshot = () => {
        const canvas = containerRef.current?.querySelector('.pnlm-render-container canvas') as HTMLCanvasElement;
        if (canvas) {
            try {
                // Konversi canvas ke image URL
                const imgUrl = canvas.toDataURL('image/png');
                // Buat link download palsu
                const link = document.createElement('a');
                link.download = `tour-screenshot-${Date.now()}.png`;
                link.href = imgUrl;
                link.click();
            } catch (err) {
                console.error("Gagal mengambil screenshot (CORS restriction mungkin terjadi):", err);
                alert("Gagal mengambil screenshot. Pastikan gambar panorama dari domain yang sama atau izinkan CORS.");
            }
        }
    };

    useEffect(() => {
        if (isTourActive) {
            const initPannellum = async () => {
                await import("pannellum");
                const pannellum = (window as any).pannellum;

                if (!pannellum) return;

                if (pannellumInstance.current) {
                    try { pannellumInstance.current.destroy(); } catch (e) { }
                }

                pannellumInstance.current = pannellum.viewer("panorama-container", {
                    type: "equirectangular",
                    panorama: panoramaImage,
                    autoLoad: true,
                    showControls: false, // Kontrol default disembunyikan agar UI kita yang tampil
                    compass: false,
                    pitch: 0,
                    yaw: 0,
                    hfov: 110,
                });
            };
            setTimeout(initPannellum, 100);
        }
        return () => {
            if (pannellumInstance.current && typeof pannellumInstance.current.destroy === 'function') {
                pannellumInstance.current.destroy();
            }
        };
    }, [isTourActive, panoramaImage]);

    useEffect(() => {
        const handleFullscreenChange = () => {
            if (!screenfull.isFullscreen) setIsTourActive(false);
        };
        if (screenfull.isEnabled) screenfull.on('change', handleFullscreenChange);
        return () => {
            if (screenfull.isEnabled) screenfull.off('change', handleFullscreenChange);
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="relative w-full aspect-square md:aspect-21/11 bg-black overflow-hidden shadow-2xl group"
        >
            {/* --- Overlay Awal (Start Screen) --- */}
            <div
                className={`
                    absolute inset-0 z-10 transition-opacity duration-1000 
                    ${isTourActive ? 'opacity-0 pointer-events-none' : 'opacity-100'}
                `}
            >
                <div className="relative w-full h-full">
                    <Image
                        src={previewImage}
                        alt="Tour Preview"
                        fill
                        className="object-cover transition-transform duration-1000 group-hover:scale-105"
                        priority
                        quality={75}
                    />
                </div>

                <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px]" />

                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="max-w-76 bg-black/20 backdrop-blur-md border border-white/10 p-6 text-center shadow-2xl transform transition-transform group-hover:scale-105 duration-500">
                        <h3 className="text-white md:text-2xl font-medium mb-12 drop-shadow-md">Selamat Datang di Tur Wisata Virtual Kebun Raya Bogor</h3>
                        <div className="mb-8 flex justify-center text-white opacity-90">
                            <HeadVR size={100} className="text-white" />
                        </div>
                        <button
                            onClick={handleStartTour}
                            className="w-full mt-4 cursor-pointer bg-[#2D1C04] text-white hover:text-[#2D1C04] px-6 py-2.5 font-medium text-sm md:text-base tracking-wide shadow-lg hover:bg-white transition-colors"
                        >
                            Mulai Jelajah
                        </button>
                    </div>
                </div>
            </div>

            {/* --- Container Pannellum --- */}
            <div id="panorama-container" className="w-full h-full bg-gray-900" />

            {isTourActive && (
                <CurvedControls
                    onClose={handleCloseTour}
                    onScreenshot={handleScreenshot}
                />
            )}
        </div>
    );
}