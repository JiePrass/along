/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import L, { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { Star } from "lucide-react";
import "leaflet-routing-machine";

interface LocationInfo {
    title: string;
    address: string;
    rating: number;
    reviewCount: number;
}

interface MapProps {
    start: [number, number];
    destination: [number, number];
    info: LocationInfo;
}


const RoutingMachine = ({ start, destination }: { start: [number, number], destination: [number, number] }) => {
    const map = useMap();

    useEffect(() => {
        if (!map) return;

        const routingControl = L.Routing.control({
            waypoints: [
                L.latLng(start[0], start[1]),
                L.latLng(destination[0], destination[1])
            ],
            routeWhileDragging: false,
            lineOptions: {
                styles: [{ color: "#2D1C04", opacity: 0.9, weight: 6 }],
                extendToWaypoints: true,
                missingRouteTolerance: 0,
            },
            show: false,
            addWaypoints: false,
            fitSelectedRoutes: true,
            showAlternatives: false,
            collapsible: false,
            createMarker: function () { return null; }
        } as any).addTo(map);

        return () => {
            try {
                const container = routingControl.getContainer();
                if (container) {
                    container.parentNode?.removeChild(container);
                }

                if (map && map.removeControl) {
                    map.removeControl(routingControl);
                }
            } catch (e) {
                console.warn("Routing control cleanup skipped", e);
            }
        };
    }, [map, start, destination]);

    return null;
};

export default function MapInner({ start, destination, info }: MapProps) {
    const centerPoint: LatLngExpression = destination;

    return (
        <div className="flex flex-col md:block relative w-full overflow-hidden shadow-sm [&_.leaflet-routing-container]:hidden bg-white">

            {/* BAGIAN MAP */}
            <div className="relative h-87.5 md:h-125 w-full order-1 md:order-0 z-0">
                <MapContainer
                    center={centerPoint}
                    zoom={13}
                    scrollWheelZoom={true}
                    className="w-full h-full"
                    zoomControl={false}
                >
                    <TileLayer
                        attribution='&copy; OpenStreetMap contributors'
                        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                    />
                    <RoutingMachine start={start} destination={destination} />
                </MapContainer>
            </div>

            <div className="
                relative w-full order-2 bg-white p-5
                md:absolute md:top-6 md:left-6 md:z-20 md:w-auto md:max-w-[320px] md:shadow-xl
            ">
                <h2 className="text-xl font-medium mb-1">{info.title}</h2>
                <p className="text-xs mb-3 leading-relaxed opacity-90">{info.address}</p>
                <div className="flex items-center gap-2">
                    <span className="opacity-90 text-sm font-medium">{info.rating.toFixed(1)}</span>

                    <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                                key={star}
                                size={14}
                                fill={star <= Math.round(info.rating) ? "#ffd725" : "none"}
                                strokeWidth={0}
                                className={star <= Math.round(info.rating) ? "text-[#ffd725]" : "text-gray-300"}
                            />
                        ))}
                    </div>

                    <span className="opacity-90 text-sm font-medium">({info.reviewCount})</span>
                </div>
            </div>
        </div>
    );
};