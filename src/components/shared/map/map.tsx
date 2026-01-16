// src/components/Map.tsx
"use client";

import dynamic from "next/dynamic";

const Map = dynamic(() => import("./map-inner"), {
    ssr: false,
    loading: () => <div className="w-full h-125 bg-gray-100 animate-pulse rounded-lg flex items-center justify-center text-gray-400">Loading Map...</div>
});

export default Map;