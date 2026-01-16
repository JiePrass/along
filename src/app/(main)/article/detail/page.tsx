import Image from 'next/image';
import ArticleCard from '@/components/shared/card/article-card';

export default function DetailArticle() {
    const recommendedArticles = [
        {
            image: "/images/article-1.png",
            date: "24 Jan 2026",
            title: "Tim Along Meraih Juara Utama Dalam KBOF 2025",
            description: "Website Along berhasil menjadi Website Terbaik untuk KBOF 2025."
        },
        {
            image: "/images/article-3.png",
            date: "21 Jan 2026",
            title: "Lomba Kuliner Tradisional di Puncak Bogor Kembali Digelar",
            description: "Kompetisi Soto Bogor, Tauge Goreng, dan Laksa Priangan dengan hadiah Rp 50 juta."
        },
        {
            image: "/images/article-4.png",
            date: "16 Jan 2026",
            title: "Rekayasa Lalu Lintas di Jalan Pajajaran Resmi Diberlakukan",
            description: "Pemkot Bogor terapkan sistem satu arah dan rambu elektronik untuk mengurai kemacetan."
        }
    ];

    return (
        <div className="min-h-screen container mx-auto px-6 md:px-12 lg:px-16 py-32">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <h1 className="text-4xl md:text-5xl font-bethany font-extralight leading-[1.1] text-justify tracking-tight">
                    Penangkaran Rusa Istana Bogor Cetak Rekor Populasi Baru
                </h1>
                <div className="flex justify-end items-start">
                    <p className="text-sm md:text-base leading-relaxed max-w-sm text-justify">
                        Tim Konservasi Istana Bogor Berhasil Menambah 15 Ekor Rusa Dalam Setahun Terakhir,
                        Sekaligus Memperkuat Upaya Pelestarian Satwa Di Kawasan Bersejarah Ini.
                    </p>
                </div>
            </div>

            {/* Main Hero Image */}
            <div className="relative w-full aspect-21/7 mb-16 overflow-hidden">
                <Image
                    src="/images/article-detail-hero.png"
                    alt="Rusa Istana Bogor"
                    fill
                    className="object-cover"
                />
            </div>

            {/* Article Body */}
            <div className="max-w-2xl mx-auto space-y-12 text-lg leading-relaxed text-justify">
                <section>
                    <p>
                        <span className="text-3xl font-extralight font-bethany mr-2">Program</span>
                        Penangkaran Rusa di area Istana Bogor Resmi Mencapai Rekor Populasi Baru.
                        Setelah Tim Konservasi Berhasil Menambah 15 Ekor Rusa Dalam Satu Tahun Terakhir.
                        Inisiatif ini dimulai pada 2023 dengan seleksi induk rusa berkualitas tinggi dan penataan ulang kandang agar menyerupai habitat alami.
                        Luas lahan seluas 10 Hektar menyediakan ruang jelajah memadai bagi rusa-rusa muda untuk tumbuh dan berkembang.
                    </p>
                </section>

                <section>
                    <p>
                        <span className="text-3xl font-extralight font-bethany mr-2">Setiap</span>
                        Rusa menjalani pemeriksaan kesehatan berkala oleh Dokter Hewan dan UPT dan IPB.
                        Termasuk vaksinasi lengkap dan pemantauan gizi. Pakan yang diberikan berupa rumput pilihan serta suplemen nutrisi khusus
                        diformulasikan untuk mendukung pertumbuhan tulang dan tanduk.
                    </p>
                </section>

                <section>
                    <p>
                        <span className="text-3xl font-extralight font-bethany mr-2">Program</span>
                        ini tidak hanya fokus pada kuantitas, tetapi juga edukasi publik melalui sesi Feeding Interaktif dan tur terpemandu di zona penangkaran.
                        Pengunjung diajak belajar langsung tentang perilaku rusa, teknik konservasi, dan pentingnya keanekaragaman hayati.
                    </p>
                </section>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-4 mt-16 mb-24">
                <button className="px-6 py-2 border border-[#2c1e1d] hover:bg-[#2c1e1d] hover:text-white transition-colors text-sm uppercase tracking-widest">
                    Bagikan Berita
                </button>
                <button className="px-6 py-2 border border-[#2c1e1d] hover:bg-[#2c1e1d] hover:text-white transition-colors text-sm uppercase tracking-widest">
                    Baca Berita Lain
                </button>
            </div>

            {/* Author Section */}
            <div className="flex flex-col w-full justify-center mb-24">
                <div className="flex gap-8 items-center">
                    <div className="w-1/2 h-[0.5px] bg-[#2c1e1d] opacity-70" />
                    <div className="flex flex-col items-center">
                        <div className="relative w-24 h-24 rounded-full overflow-hidden">
                            <Image src="https://images.unsplash.com/photo-1615109398623-88346a601842?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Author" fill className="object-cover" />
                        </div>
                    </div>
                    <div className="w-1/2 h-[0.5px] bg-[#2c1e1d] opacity-70" />
                </div>
                <div className="flex flex-col text-center mt-4">
                    <span className="font-bold text-sm uppercase tracking-widest">Muhamad Ikbal Abdillah</span>
                    <span className="text-xs italic opacity-70">Penulis Berita Istana</span>
                </div>
            </div>

            {/* Recommendation Section */}
            <section>
                <h2 className="text-3xl font-serif mb-12">Rekomendasi Artikel</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {recommendedArticles.map((art, index) => (
                        <ArticleCard
                            key={index}
                            image={art.image}
                            date={art.date}
                            title={art.title}
                            description={art.description}
                        />
                    ))}
                </div>
            </section>
        </div>
    );
}