"use client";

import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import React from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";

interface DestinationCardProps {
    image: string;
    description: string;
}

export default function DestinationCard({ image, description }: DestinationCardProps) {
    return (
        <CardContainer className="inter-var">
            <CardBody className="shrink-0 w-87.5 md:w-100 cursor-pointer border-none p-0 bg-transparent">

                {/* Bagian Gambar */}
                <CardItem translateZ="50" className="w-full">
                    <div className="relative aspect-3/4 mb-4">
                        <Image
                            src={image}
                            alt="Destination"
                            sizes="(max-width: 768px) 350px, 400px"
                            fill
                            className="w-full h-full object-cover"
                        />

                        {/* Tombol Arrow / Icon */}
                        <CardItem
                            translateZ="100"
                            className="absolute bottom-0 right-0 bg-[#ddddd1] p-4 z-20"
                        >
                            <ArrowUpRight className="w-6 h-6" />
                        </CardItem>
                    </div>
                </CardItem>

                {/* Deskripsi */}
                <CardItem
                    as="p"
                    translateZ="40"
                    className="text-sm md:text-base leading-relaxed font-light pr-8 text-left"
                >
                    {description}
                </CardItem>

            </CardBody>
        </CardContainer>
    );
};