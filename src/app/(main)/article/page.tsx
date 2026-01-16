'use client';

import ArticleCard from "@/components/shared/card/article-card";
import PaginationComponent from "@/components/shared/pagination";
import SearchFilter from "@/components/shared/search-filter";
import Image from "next/image"
import { useState } from "react";

const ALL_DATA = [
    {
        id: 1,
        title: "Eksplorasi Keajaiban Bawah Laut Raja Ampat",
        image: "https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?auto=format&fit=crop&q=80&w=800",
        date: "12 January 2026",
        description: "Raja Ampat menawarkan kekayaan biodiversitas laut tertinggi di dunia, menjadi surga bagi para penyelam mancanegara.",
    },
    {
        id: 2,
        title: "Pesona Matahari Terbit di Puncak Gunung Bromo",
        image: "https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&q=80&w=800",
        date: "15 February 2026",
        description: "Menikmati fenomena 'sea of sand' dan kawah aktif Bromo saat fajar menyingsing adalah pengalaman tak terlupakan di Jawa Timur.",
    },
    {
        id: 3,
        title: "Wisata Budaya dan Sejarah di Candi Borobudur",
        image: "https://plus.unsplash.com/premium_photo-1700955004555-900a9733ee14?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Ym9yb2J1ZHVyfGVufDB8fDB8fHww",
        date: "05 March 2026",
        description: "Sebagai candi Buddha terbesar di dunia, Borobudur tetap menjadi destinasi religi dan sejarah paling ikonik di Indonesia.",
    },
    {
        id: 4,
        title: "Kemewahan Alam di Pulau Komodo dan Padar",
        image: "https://plus.unsplash.com/premium_photo-1664297926110-7cf2385f8280",
        date: "20 April 2026",
        description: "Melihat langsung habitat asli naga purba Komodo dan mendaki bukit Pulau Padar untuk pemandangan tiga warna pantai.",
    },
    {
        id: 5,
        title: "Ketenangan Desa Wisata Wae Rebo di Atas Awan",
        image: "https://images.unsplash.com/photo-1621252179027-94459d278660?auto=format&fit=crop&q=80&w=800",
        date: "10 May 2026",
        description: "Desa adat di Flores ini menawarkan arsitektur rumah Mbaru Niang yang unik di tengah hamparan pegunungan hijau.",
    },
    {
        id: 6,
        title: "Menjelajahi Tebing Karang Pantai Kelingking",
        image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&q=80&w=800",
        date: "18 June 2026",
        description: "Landmark terkenal di Nusa Penida yang berbentuk seperti T-Rex ini menjadi spot foto paling populer bagi wisatawan.",
    },
    {
        id: 7,
        title: "Keindahan Danau Toba dari Bukit Holbung",
        image: "https://images.unsplash.com/photo-1642762205001-aada86f9dbe2",
        date: "22 July 2026",
        description: "Menikmati hamparan luas Danau Toba, danau vulkanik terbesar di dunia, dari ketinggian bukit yang hijau dan asri.",
    },
    {
        id: 8,
        title: "Relaksasi di Kawasan Ubud yang Menenangkan",
        image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=800",
        date: "30 August 2026",
        description: "Ubud menyajikan perpaduan antara terasering sawah yang indah, hutan kera, dan pusat seni budaya Bali.",
    },
    {
        id: 9,
        title: "Gili Trawangan: Surga Tropis Tanpa Polusi",
        image: "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?auto=format&fit=crop&q=80&w=800",
        date: "12 September 2026",
        description: "Nikmati kebebasan bersepeda mengelilingi pulau tanpa kendaraan bermotor dengan pemandangan air laut kristal.",
    },
];

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