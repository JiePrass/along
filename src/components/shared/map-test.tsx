"use client";
import { useState } from 'react';
import Indonesia from '@svg-country-maps/indonesia';

export default function IndonesiaMapNative() {
    const [tooltip, setTooltip] = useState({ display: false, name: "", x: 0, y: 0 });

    if (!Indonesia || !Indonesia.locations) {
        return <div>Memuat peta...</div>;
    }

    return (
        <div className="relative w-full max-w-4xl mx-auto p-10 bg-white rounded-xl shadow-sm">
            {tooltip.display && (
                <div
                    className="fixed z-50 pointer-events-none bg-slate-800 text-white px-2 py-1 rounded text-xs shadow-md transform -translate-x-1/2 -translate-y-full transition-all duration-75"
                    style={{ top: tooltip.y - 12, left: tooltip.x }}
                >
                    {tooltip.name}
                </div>
            )}

            <svg
                viewBox={Indonesia.viewBox}
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-auto"
            >
                {Indonesia.locations.map((loc) => (
                    <path
                        key={loc.id}
                        d={loc.path}
                        name={loc.name}
                        id={loc.id}
                        className="fill-slate-300 stroke-white stroke-[1.5] hover:fill-blue-500 transition-colors duration-200 cursor-pointer outline-none"
                        onMouseEnter={(e) => setTooltip({
                            display: true,
                            name: loc.name,
                            x: e.clientX,
                            y: e.clientY
                        })}
                        onMouseMove={(e) => setTooltip((prev) => ({
                            ...prev,
                            x: e.clientX,
                            y: e.clientY
                        }))}
                        onMouseLeave={() => setTooltip({ ...tooltip, display: false })}
                    />
                ))}
            </svg>
        </div>
    );
}