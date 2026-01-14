"use client";
import { usePathname } from "next/navigation";
import Footer from "@/components/layouts/footer";
import Header from "@/components/layouts/header";

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    return (
        <div key={pathname} className="flex flex-col min-h-screen">
            <Header />
            <main>
                {children}
            </main>
            <Footer />
        </div>
    );
}