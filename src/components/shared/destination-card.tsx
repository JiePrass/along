import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';

interface DestinationCardProps {
    image: string;
    description: string;
}

export default function DestinationCard({ image, description }: DestinationCardProps) {
    return (
        <div className="shrink-0 w-87.5 md:w-100 group cursor-pointer">
            <div className="relative aspect-3/4 overflow-hidden mb-6">
                <Image
                    src={image}
                    alt="Destination"
                    sizes="(max-width: 768px) 350px, 400px"
                    fill
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute bottom-0 right-0 bg-[#ddddd1] p-4 transition-colors">
                    <ArrowUpRight className="w-6 h-6 group-hover:scale-120 transition-all" />
                </div>
            </div>

            {/* Deskripsi */}
            <p className="text-sm md:text-base leading-relaxed font-light pr-8">
                {description}
            </p>
        </div>
    );
};
