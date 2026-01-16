'use client';

import ArticleCard from "@/components/shared/card/article-card";
import PaginationComponent from "@/components/shared/pagination";
import SearchFilter from "@/components/shared/search-filter";
import Image from "next/image"
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const ALL_DATA = Array.from({ length: 64 }).map((_, i) => ({
    id: i,
    title: i % 2 === 0 ? `Ayam Betutu ${i + 1}` : `Soto Betawi ${i + 1}`,
    image: i % 3 === 0
        ? "https://images.unsplash.com/photo-1501785888041-af3ef285b470"
        : i % 3 === 1
            ? "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&q=80&w=600"
            : "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&q=80&w=600",
    date: `${Math.floor(Math.random() * 28) + 1} August 2023`,
    description: i % 2 === 0 ? `Pemkot Bogor Terapkan Sistem Satu Arah Dan Rambu Elektronik Untuk Mengurai Kemacetan., ${i + 1}` :
        `Dinas Perhubungan melakukan pemantauan intensif di titik-titik rawan kemacetan selama libur panjang. ${i + 1}`,
}));

const ITEMS_PER_PAGE = 9;

export default function KulinerPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(ALL_DATA.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentData = ALL_DATA.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    return (
        <div className="relative w-full overflow-x-hidden flex flex-col">
            <section className="w-full flex items-center overflow-hidden pt-24 md:py-0">
                <div className="container mx-auto px-6 md:px-12">
                    <div className="flex flex-col md:flex-row items-center">
                        {/* --- LEFT SIDE: TEXT CONTENT --- */}
                        <div className="w-full md:w-1/2 flex flex-col justify-center z-10">
                            <h1 className="text-4xl md:text-6xl font-bethany leading-[1.1] mb-4">
                                Menyelami Setiap Sudut Cerita Nusantara 🇮🇩
                            </h1>

                            <p className="text-[#4A4A3A] text-sm md:text-lg leading-relaxed max-w-lg font-light tracking-wide">
                                Sebuah kurasi kisah dari ribuan pulau. Temukan inspirasi perjalanan melalui warisan budaya yang adiluhung, surga alam yang tersembunyi, hingga cita rasa kuliner yang menghangatkan jiwa.
                            </p>
                        </div>

                        {/* --- RIGHT SIDE: POLAROID STACK IMAGES --- */}
                        <div className="w-full md:w-1/2 relative h-100 md:h-150 flex justify-center items-center">
                            <div className="relative w-full h-full overflow-hidden">
                                <Image
                                    src="/images/hero-article.png"
                                    alt="Polaroid"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="content" className="container mx-auto px-6 md:px-12 lg:px-16 py-20">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
                    <div className="max-w-md">
                        <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                            Mau Baca Apa <br /> Kita Hari Ini ?
                        </h2>
                    </div>
                    <SearchFilter />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                    {currentData.map((item) => (
                        <ArticleCard
                            key={item.id}
                            title={item.title}
                            image={item.image}
                            date={item.date}
                            description={item.description}
                        />
                    ))}
                </div>

                <PaginationComponent
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={(page) => setCurrentPage(page)}
                />
            </section>
        </div >
    );
}