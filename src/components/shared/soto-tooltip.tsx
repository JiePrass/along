"use client";

import { Html } from "@react-three/drei";
import { useState } from "react";
import Image from "next/image";

interface TooltipProps {
    data: {
        label: string;
        desc: string;
        image: string;
        position: [number, number, number];
    };
    isVisible: boolean;
}

export function SotoTooltip({ data, isVisible }: TooltipProps) {
    const [isHovered, setIsHovered] = useState(false);

    // --- LOGIKA OTOMATIS ---
    // Cek sumbu Y (index ke-1 dari array position).
    // Jika Y > 0.5 (posisi tinggi), maka tooltip harus muncul di BAWAH titik agar tidak kepotong.
    const isTooHigh = data.position[1] > 0.5;

    return (
        <Html
            position={data.position}
            center
            zIndexRange={[100, 0]}
            style={{
                pointerEvents: isVisible ? "auto" : "none",
                transition: 'opacity 0.5s',
                opacity: isVisible ? 1 : 0
            }}
        >
            <div
                className="relative flex items-center justify-center"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* --- 1. HOTSPOT (Titik Kuning) --- */}
                <div className={`
                    w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-transform duration-300 relative z-20
                    ${isVisible ? 'scale-100' : 'scale-0'}
                    ${isHovered ? 'bg-white scale-125' : 'bg-[#2D1C04]'}
                `}>
                    <div className={`w-2 h-2 rounded-full ${isHovered ? 'bg-[#2D1C04]' : 'bg-white animate-ping'}`} />
                </div>

                {/* --- 2. CARD CONTENT --- */}
                <div className={`
                    absolute left-1/2 -translate-x-1/2 p-4 w-72 bg-white rounded-lg shadow-2xl overflow-hidden z-10
                    transition-all duration-500 ease-out
                    
                    ${/* LOGIKA POSISI KARTU */ ""}
                    ${isTooHigh
                        ? 'top-full mt-4 origin-top'     // Jika tinggi: Muncul di bawah (top-full), margin-top
                        : 'bottom-full mb-4 origin-bottom' // Jika rendah: Muncul di atas (bottom-full), margin-bottom
                    }

                    ${/* LOGIKA ANIMASI MASUK */ ""}
                    ${isHovered
                        ? 'opacity-100 scale-100 translate-y-0'
                        : `opacity-0 scale-90 pointer-events-none ${isTooHigh ? '-translate-y-4' : 'translate-y-4'}`
                    }
                `}>

                    <div className="w-full aspect-20/9 relative mb-4 overflow-hidden rounded-md bg-gray-100">
                        <Image
                            src={data.image}
                            alt={data.label}
                            fill
                            sizes="(max-width: 768px) 100vw, 256px"
                            className="object-cover sepia-[0.3]"
                        />
                    </div>

                    {/* Konten Teks */}
                    <div className="text-left">
                        <h3 className="font-serif text-lg font-bold text-gray-800 mb-1 leading-tight">
                            {data.label}
                        </h3>
                        <div className="h-0.5 w-10 bg-yellow-500 mb-2"></div>
                        <p className="font-sans text-xs text-gray-500 leading-relaxed">
                            {data.desc}
                        </p>
                    </div>

                    <div className={`
                        absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45 transform
                        ${isTooHigh
                            ? '-top-2'
                            : '-bottom-2'
                        }
                    `} />
                </div>
            </div>
        </Html>
    );
}