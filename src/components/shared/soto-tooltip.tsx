/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Html } from "@react-three/drei";
import { useState, useEffect } from "react";
import Image from "next/image";

export function SotoTooltip({ data, isVisible }: any) {
    const [isHovered, setIsHovered] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const isTooHigh = data.position[1] > 0.5;

    const getHorizontalClass = () => {
        if (!isMobile) return "-translate-x-1/2 left-1/2";
        if (data.position[0] < -0.3) return "left-0 translate-x-2";
        if (data.position[0] > 0.3) return "right-0 -translate-x-2";
        return "-translate-x-1/2 left-1/2";
    };

    return (
        <Html
            position={data.position}
            center
            zIndexRange={[100, 0]}
            style={{
                pointerEvents: isVisible ? "auto" : "none",
                transition: 'opacity 0.5s',
                opacity: isVisible ? 1 : 0,
                transform: ` scale(${isMobile ? 0.8 : 1})`,
            }}
        >
            <div
                className="relative flex items-center justify-center"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={() => isMobile && setIsHovered(!isHovered)}
            >
                {/* --- 1. HOTSPOT (Lingkaran Bulat Sempurna) --- */}
                <div className={`
                    aspect-square w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-transform duration-300 relative z-10
                    ${isVisible ? 'scale-100' : 'scale-0'}
                    ${isHovered ? 'bg-white scale-110' : 'bg-[#2D1C04]'}
                `}>
                    <div className={`w-2 h-2 rounded-full ${isHovered ? 'bg-[#2D1C04]' : 'bg-white animate-ping'}`} />
                </div>

                {/* --- 2. CARD CONTENT --- */}
                <div className={`
                    absolute p-4 bg-white rounded-xl shadow-2xl z-30
                    transition-all duration-500 ease-out 
                    w-55 md:w-70
                    
                    ${getHorizontalClass()}

                    ${/* Reset Line-Clamp & Height */ ""}
                    h-auto min-h-0 flex flex-col
                    
                    ${isTooHigh
                        ? 'top-full mt-4 origin-top'
                        : 'bottom-full mb-4 origin-bottom'
                    }

                    ${isHovered
                        ? 'opacity-100 scale-100 translate-y-0'
                        : `opacity-0 scale-90 pointer-events-none ${isTooHigh ? '-translate-y-4' : 'translate-y-4'}`
                    }
                `}>
                    {/* Image */}
                    <div className="w-full aspect-21/9 relative mb-3 overflow-hidden rounded-lg bg-gray-100 shrink-0">
                        <Image
                            src={data.image}
                            alt={data.label}
                            fill
                            className="object-cover sepia-[0.3]"
                        />
                    </div>

                    <div className="text-left grow">
                        <h3 className="font-serif text-sm md:text-base font-bold mb-1 leading-tight text-gray-900">
                            {data.label}
                        </h3>
                        <div className="h-0.5 w-8 bg-yellow-600 mb-2"></div>

                        <div className="block h-auto overflow-visible">
                            <p className="text-[11px] md:text-xs text-gray-600 leading-relaxed whitespace-normal wrap-break-word">
                                {data.desc}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Html>
    );
}