'use client'

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Map from "@/components/shared/map/map";

gsap.registerPlugin(useGSAP);

type SlideData = {
    id: number;
    category: string;
    number: string;
    title: string;
    headline: string;
    descCol1: string;
    descCol2: string;
    image: string;
};

const SLIDES: SlideData[] = [
    {
        id: 0,
        category: "Kuah",
        number: "01",
        title: "Kaldu Sapi Autentik",
        headline: "Rahasia kelezatan Soto Mie Bogor terletak pada kuah merahnya yang kaya rempah dan kaldu sapi murni yang gurih.",
        descCol1: "Proses perebusan tulang dan daging sapi dilakukan selama berjam-jam untuk mengekstraksi rasa gurih yang mendalam dan tekstur kuah yang sedikit berminyak.",
        descCol2: "Campuran bumbu halus seperti bawang merah, putih, kemiri, dan cabai merah memberikan warna khas yang menggugah selera tanpa rasa pedas yang berlebihan.",
        image: "https://plus.unsplash.com/premium_photo-1706003920144-ca73554a6801",
    },
    {
        id: 1,
        category: "Isian",
        number: "02",
        title: "Karoket Renyah",
        headline: "Tekstur kontras antara lembutnya mie dan garingnya Karoket memberikan sensasi unik di setiap gigitan.",
        descCol1: "Karoket berisi bihun digoreng hingga mencapai tingkat kematangan sempurna, lalu dipotong-potong dan disiram kuah panas agar sedikit melunak namun tetap renyah.",
        descCol2: "Keberadaan Karoket inilah yang membedakan Soto Mie Bogor dengan varian soto lainnya di Indonesia, menjadikannya ikon kuliner kota hujan.",
        image: "/images/karoket.jpg",
    },
    {
        id: 2,
        category: "Sejarah",
        number: "03",
        title: "Warisan Kuliner Bogor",
        headline: "Menelusuri jejak akulturasi budaya yang melahirkan salah satu hidangan mie paling populer di tanah Pasundan.",
        descCol1: "Lahir dari perpaduan pengaruh kuliner Tionghoa dan lokal, Soto Mie telah menjadi santapan wajib warga Bogor sejak puluhan tahun silam.",
        descCol2: "Awalnya dijajakan dengan gerobak pikul, kini Soto Mie telah naik kelas ke restoran-restoran besar namun tetap mempertahankan resep asli leluhur.",
        image: "/images/sejarah-soto-mie.png",
    },
    {
        id: 3,
        category: "Bahan",
        number: "04",
        title: "Daging & Kikil Sapi",
        headline: "Irisan daging sapi sandung lamur dan kikil yang empuk menjadi sumber protein utama yang memanjakan lidah.",
        descCol1: "Daging dipilih dari bagian yang memiliki sedikit lemak agar memberikan tekstur juicy saat bertemu dengan kuah kaldu yang panas.",
        descCol2: "Kikil dimasak dengan teknik khusus agar memiliki kekenyalan yang pas—tidak terlalu keras namun juga tidak hancur saat dimakan.",
        image: "https://plus.unsplash.com/premium_photo-1726725646345-7eefd0263ac4",
    },
    {
        id: 4,
        category: "Penyajian",
        number: "05",
        title: "Pelengkap Sempurna",
        headline: "Segarnya perasan jeruk nipis, sambal rawit merah, dan taburan emping melengkapi simfoni rasa soto ini.",
        descCol1: "Tambahan potongan tomat segar, kol iris, dan daun bawang memberikan keseimbangan rasa segar di tengah pekatnya kaldu sapi.",
        descCol2: "Bagi pecinta rasa kuat, kecap manis dan cuka kayu sering ditambahkan untuk menciptakan profil rasa asam, manis, dan gurih yang kompleks.",
        image: "https://images.unsplash.com/photo-1572656631137-7935297eff55?q=80&w=2070&auto=format&fit=crop",
    },
];

const TESTIMONIALS = [
    {
        id: 1,
        text: "“Kuah Lembut, Risol Renyah, Dan Emping Yang Kriuk Menciptakan Harmoni Tekstur Yang Susah Dilupakan.”",
        name: "Andi Prasetya",
        role: "Travel Blogger",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop"
    },
    {
        id: 2,
        text: "“Kuahnya Kaya Bumbu, Gurihnya Pas Tanpa Membuat Eneg. Setiap Suapan Terasa Hangat Dan Memanjakan Lidah Di Udara Dingin Bogor.”",
        name: "Dewi Ramadan",
        role: "Pecinta Alam",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop"
    },
    {
        id: 3,
        text: "“Penambahan Jeruk Nipis Dan Sambal Rawit Di Setiap Mangkuk Bikin Segar Sekali. Dan Pedasnya Mantap Untuk Sarapan Maupun Makan Siang.”",
        name: "Siti Maharani",
        role: "Guru Biologi",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop"
    },
    {
        id: 4,
        text: "“Soto Mie paling autentik yang pernah saya coba. Risolnya tetap garing meski sudah terendam kuah cukup lama.”",
        name: "Budi Santoso",
        role: "Food Enthusiast",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop"
    }
];

export default function KulinerDetailPage() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [testiIndex, setTestiIndex] = useState(0);

    const containerRef = useRef<HTMLDivElement>(null);
    const textContainerRef = useRef<HTMLDivElement>(null);
    const sliderRef = useRef<HTMLDivElement>(null);
    const extendedTestimonials = [...TESTIMONIALS, TESTIMONIALS[0]];

    const testimonialTrackRef = useRef<HTMLDivElement>(null);

    const handleNext = () => setActiveIndex((prev) => (prev + 1) % SLIDES.length);
    const handlePrev = () => setActiveIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
    const handleCardClick = (index: number) => setActiveIndex(index);

    useGSAP(() => {
        const slider = sliderRef.current;
        const textCtx = textContainerRef.current;
        if (!slider || !textCtx) return;

        const cards = slider.children;
        if (cards.length > 0) {
            const cardWidth = (cards[0] as HTMLElement).offsetWidth;
            gsap.to(slider, {
                x: -(activeIndex * cardWidth),
                duration: 0.8,
                ease: "power3.inOut",
            });
        }

        gsap.fromTo(textCtx.children,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, stagger: 0.05, ease: "power2.out" }
        );
    }, { scope: containerRef, dependencies: [activeIndex] });

    useEffect(() => {
        const interval = setInterval(() => {
            setTestiIndex((prev) => prev + 1);
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    // 2. PENGATUR SEBERAPA CEPAT GESERNYA (TRANSITION SPEED)
    useGSAP(() => {
        const track = testimonialTrackRef.current;
        if (!track) return;

        const firstCard = track.children[0] as HTMLElement;
        const cardWidth = firstCard.offsetWidth;
        const gap = window.innerWidth >= 768 ? 64 : 32;
        const moveAmount = cardWidth + gap;

        // Animasi geser
        gsap.to(track, {
            x: -(testiIndex * moveAmount),
            duration: 1.2, // Kecepatan geser (1.2 detik)
            ease: "power3.inOut",
            onComplete: () => {
                // LOGIKA INFINITE: 
                // Jika sudah sampai di slide bayangan (paling akhir)
                if (testiIndex === TESTIMONIALS.length) {
                    gsap.set(track, { x: 0 }); // Lompat ke awal secara instan
                    setTestiIndex(0); // Reset index ke 0 tanpa animasi
                }
            }
        });
    }, { dependencies: [testiIndex], scope: containerRef });

    const activeSlide = SLIDES[activeIndex];

    return (
        <div ref={containerRef} className="min-h-screen container mx-auto px-6 md:px-12 lg:px-16 py-24">
            {/* HERO */}
            <div className="flex flex-col text-center gap-4">
                <h1 className="text-3xl md:text-5xl font-bethany font-extralight uppercase tracking-widest">Soto Mie Bogor</h1>
                <div className="flex justify-center items-center">
                    <p className="text-sm md:text-base max-w-2xl opacity-90 leading-relaxed">
                        Nikmati kehangatan semangkuk soto mie dengan kuah kaldu sapi merah yang ikonik. Perpaduan mie kuning, daging sapi berkualitas, dan Karoket renyah yang telah menjadi identitas kuliner kebanggaan Kota Bogor selama lintas generasi.
                    </p>
                </div>

                <div className="relative w-full aspect-square md:aspect-21/7 overflow-hidden shadow-sm my-8 md:my-12">
                    <Image src="/images/hero-soto.png" alt="Soto Mie Bogor Hero" fill className="object-cover" />
                </div>
            </div>

            {/* CONTENT */}
            <section className="w-full overflow-hidden">
                <div ref={textContainerRef} className="mb-12">
                    <h2 className="text-2xl md:text-4xl lg:text-5xl font-bethany font-extralight leading-tight mb-4 md:mb-8 text-justify">
                        {activeSlide.headline}
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
                        <div className="md:col-span-4 text-sm md:text-base leading-relaxed opacity-90">
                            <p>{activeSlide.descCol1}</p>
                        </div>
                        <div className="md:col-span-4 text-sm md:text-base leading-relaxed opacity-90">
                            <p>{activeSlide.descCol2}</p>
                        </div>

                        <div className="md:col-span-4 flex justify-start md:justify-end items-end h-full gap-4 mt-4 md:mt-0">
                            <button
                                onClick={handlePrev}
                                className="w-12 h-12 rounded-full border border-[#2D1C04] flex items-center justify-center transition-colors duration-300 hover:bg-[#3E382A] hover:text-[#E8E8E0] active:scale-95"
                                aria-label="Previous Slide"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M15 18l-6-6 6-6" />
                                </svg>
                            </button>
                            <button
                                onClick={handleNext}
                                className="w-12 h-12 rounded-full bg-[#2D1C04] text-[#E8E8E0] flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
                                aria-label="Next Slide"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M9 18l6-6-6-6" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="relative w-full mt-8">
                    <div className="absolute right-0 top-0 bottom-0 w-12 md:w-32 z-10 pointer-events-none bg-linear-to-l from-[#ddddd1] to-transparent" />

                    <div
                        ref={sliderRef}
                        className="flex will-change-transform"
                    >
                        {SLIDES.map((slide, index) => (
                            <div
                                key={slide.id}
                                onClick={() => handleCardClick(index)}
                                className={`
                                    relative shrink-0 
                                    w-70 md:w-md lg:w-lg 
                                    aspect-square cursor-pointer group overflow-hidden
                                    transition-opacity duration-500
                                `}
                            >
                                <Image
                                    src={slide.image}
                                    alt={slide.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />

                                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

                                <div className="absolute top-6 left-6 right-6 flex justify-between items-start text-[#E8E8E0] font-bethany font-extralight">
                                    <span className="text-lg font-medium tracking-widest">{slide.category}</span>
                                    <span className="text-lg opacity-80">{slide.number}</span>
                                </div>

                                <div className="absolute bottom-8 left-6 right-6 text-[#E8E8E0]">
                                    <h3 className="text-2xl md:text-3xl font-bethany font-extralight leading-tight">
                                        {slide.title}
                                    </h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* COMMENT */}
            <section className="my-16">
                <h2 className="text-3xl md:text-5xl font-bethany font-extralight mb-8 md:mb-16 text-[#2D1C04]">
                    Kata Mereka Tentang Wisata Ini
                </h2>

                <div className="relative overflow-hidden">
                    <div className="absolute right-0 top-0 bottom-0 w-12 md:w-32 z-10 pointer-events-none bg-linear-to-l from-[#ddddd1] to-transparent" />
                    {/* Track Container */}
                    <div className="flex" ref={testimonialTrackRef}>
                        {extendedTestimonials.map((item, idx) => (
                            <div
                                key={`${item.id}-${idx}`}
                                className="w-[85vw] md:w-125 shrink-0 flex flex-col gap-8 mr-8 md:mr-16"
                            >
                                <p className="text-lg md:text-2xl font-bethany italic opacity-85">
                                    "{item.text}"
                                </p>

                                <div className="flex items-center gap-4">
                                    <div className="relative w-14 h-14 rounded-full overflow-hidden grayscale">
                                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="font-bethany text-lg">{item.name}</p>
                                        <p className="text-[10px] uppercase tracking-widest opacity-50">{item.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Indikator Progress (Opsional) */}
                    <div className="flex gap-3 mt-16">
                        {TESTIMONIALS.map((_, idx) => (
                            <div
                                key={idx}
                                className={`h-0.5 transition-all duration-700 ${(testiIndex % TESTIMONIALS.length) === idx
                                    ? "w-16 bg-[#2D1C04]"
                                    : "w-4 bg-[#2D1C04]/20"
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* MAP */}
            <section className="flex flex-col gap-12 mt-24">
                <div className="flex flex-col md:flex-row gap-4 justify-between md:items-center">
                    <h2 className="text-3xl md:text-5xl font-bethany font-extralight md:w-1/2">Temukan Kelezatan Autentik</h2>
                    <div className="md:w-1/2 flex justify-end max-w-sm">
                        <p className="text-sm md:text-base opacity-90">
                            Jelajahi sudut-sudut kota Bogor untuk menemukan kedai soto mie legendaris yang tetap mempertahankan cita rasa tradisional sejak masa kolonial.
                        </p>
                    </div>
                </div>
                <Map
                    start={[-6.619341068741454, 106.82138063302006]}
                    destination={[-6.6113234543716874, 106.81448125884633]}
                    info={{
                        title: "Kedai Soto Ibu Rahayu",
                        address: "Jl. Pajajaran Indah V No.38, RT.01/RW.11, Baranangsiang, Kec. Bogor Timur",
                        rating: 4.4,
                        reviewCount: 7.062
                    }}
                />
            </section>

        </div>
    )
}