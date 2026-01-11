import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export default function CTASection() {
    return (
        <section
            id="cta"
            className="relative min-h-screen py-24 w-full flex items-center justify-center overflow-hidden"
        >
            <div
                className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: "url('/images/cta.png')",
                }}
            />

            {/* Content Container */}
            <div className="relative z-10 max-w-4xl px-6 py-20 text-center">

                {/* Quote Icons (Decorative) */}
                <div className="absolute top-0 left-0 text-[16rem] leading-none select-none opacity-50 -translate-y-4 -translate-x-12 font-serif">
                    “
                </div>
                <div className="absolute top-0 right-0 text-[16rem] leading-none select-none opacity-50 -translate-y-4 translate-x-12 font-serif">
                    ”
                </div>

                {/* Main Text */}
                <h2 className="text-4xl md:text-6xl font-serif leading-tight tracking-tight mb-12">
                    Tanah ini, air ini, udara ini, <br />
                    planet ini, itu adalah {" "}
                    <span className="bg-[#2D1C04] font-normal text-stone-100 px-4 py-1 rotate-1 inline-block shadow-lg">
                        Warisan
                    </span>
                    <br /> kita bagi anak kita.
                </h2>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
                    <Link
                        href="/explore"
                        className="group flex items-center gap-2 border border-[#2D1C04] px-6 py-2 text-lg font-medium transition-all hover:bg-[#2D1C04] hover:text-white"
                    >
                        Jelajahi Sekarang
                        <ArrowUpRight size={20} />
                    </Link>

                    <Link
                        href="/mission"
                        className="text-lg font-medium hover:text-white"
                    >
                        Lihat Misi Saya
                    </Link>
                </div>

            </div>
        </section>
    );
}