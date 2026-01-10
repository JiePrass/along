"use client"

import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { MainLogo } from "../logos/main-logo";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube, FaTiktok } from 'react-icons/fa';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <footer className="text-white bg-[#322410] py-8 overflow-hidden">
            <div className="container mx-auto px-6 flex flex-col md:flex-row md:justify-between md:items-center gap-6">
                <div className="flex-none">
                    <MainLogo width={120} height={40} className="cursor-pointer" />
                </div>
            </div>

            <div className="container mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-64">
                <div className="flex flex-col justify-between">
                    <h1 className="text-4xl md:text-5xl font-semibold">
                        Menjelajahi Keindahan Indonesia bersama Along
                    </h1>

                    <p className="text-xs mt-12 text-white hidden md:flex">
                        &copy; {currentYear} Along - Semua hak cipta dilindungi.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
                    <div className="flex flex-col gap-2">
                        <h2 className="text-white text-lg font-semibold">Lokasi</h2>
                        <p>Jl. Raya Tajur, Kp. Buntar, Kel. Muara sari, Kec. Bogor Selatan</p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h2 className="text-white text-lg font-semibold">Email</h2>
                        <p>info@along.com</p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h2 className="text-white text-lg font-semibold">Kontak</h2>
                        <p>+62 857 7025 3015</p>
                        <p>+62 838 7963 0647</p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h2 className="text-white text-lg font-semibold">Media Sosial</h2>
                        <div className="flex gap-2">
                            <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                                <FaFacebookF className="text-foreground hover:opacity-80 transition inline-block" />
                            </Link>
                            <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                                <FaInstagram className="text-foreground hover:opacity-80 transition inline-block" />
                            </Link>
                            <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                                <FaTwitter className="text-foreground hover:opacity-80 transition inline-block" />
                            </Link>
                            <Link href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                                <FaYoutube className="text-foreground hover:opacity-80 transition inline-block" />
                            </Link>
                            <Link href="https://tiktok.com" target="_blank" rel="noopener noreferrer">
                                <FaTiktok className="text-foreground hover:opacity-80 transition inline-block" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4">
                <div className="flex justify-center items-center">
                    <h1 className="text-[133px] md:text-[323px] cursor-default mb-8 md:mb-16 leading-none font-semibold text-center">
                        Along
                    </h1>
                </div>

                <button
                    onClick={scrollToTop}
                    className="w-full rounded-xl px-4 md:px-8 py-4 flex items-center justify-between gap-4 bg-[#DDDDD1] text-sm hover:bg-[#DDDDD1] transition cursor-pointer"
                >
                    <span className="text-left text-[#322410]">
                        Kembali Ke<br /> Halaman Paling Atas
                    </span>
                    <div className="bg-white text-[#322410] rounded-full p-2">
                        <ArrowUp className="w-4 h-4" />
                    </div>
                </button>
            </div>

            <p className="text-xs text-center text-subtle md:hidden mt-4">
                &copy; {currentYear} Along - Semua hak cipta dilindungi.
            </p>
        </footer>
    );
}
