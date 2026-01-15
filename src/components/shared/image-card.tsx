import Image from "next/image";
import TransitionLink from "../transition-link";

interface WisataCardProps {
    title: string;
    image: string;
    link?: string;
}

export default function ImageCard({ title, image, link = "#" }: WisataCardProps) {
    return (
        <div className="group relative w-full aspect-3/4 overflow-hidden rounded-sm shadow-sm cursor-pointer">
            {/* Background Image */}
            <Image
                src={image}
                alt={title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />

            {/* Gradient Overlay (Agar teks terbaca) */}
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-90" />

            {/* Content */}
            <div className="absolute bottom-0 left-0 w-full p-5 flex flex-col items-start gap-3">
                <h3 className="text-white text-2xl font-serif font-medium leading-tight drop-shadow-md">
                    {title}
                </h3>

                <TransitionLink
                    href={link}
                    className="px-4 py-1.5 border border-white/70 text-white text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors duration-300 rounded-sm backdrop-blur-sm"
                >
                    Jelajahi
                </TransitionLink>
            </div>
        </div>
    );
};
