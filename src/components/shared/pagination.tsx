"use client";

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { useEffect, useState } from "react";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function PaginationComponent({
    currentPage,
    totalPages,
    onPageChange,
}: PaginationProps) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);

        checkMobile();

        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const getPageNumbers = () => {
        const pages = [];

        const leftSide = isMobile ? 0 : 2;
        const rightSide = isMobile ? 0 : 1;

        pages.push(1);

        if (currentPage - leftSide > 2) {
            pages.push("ellipsis-start");
        }

        const start = Math.max(2, currentPage - leftSide);
        const end = Math.min(totalPages - 1, currentPage + rightSide);

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        if (currentPage + rightSide < totalPages - 1) {
            pages.push("ellipsis-end");
        }

        if (totalPages > 1) {
            pages.push(totalPages);
        }

        return pages;
    };

    const handlePageClick = (e: React.MouseEvent, page: number) => {
        e.preventDefault();
        if (page >= 1 && page <= totalPages) {
            onPageChange(page);
        }
    };

    return (
        <Pagination>
            <PaginationContent className="gap-2 md:gap-4 w-full justify-center flex-wrap">

                <PaginationItem>
                    <PaginationPrevious
                        href="#"
                        onClick={(e) => handlePageClick(e, currentPage - 1)}
                        className={`h-9 w-9 md:h-10 md:w-10 p-0 rounded-none flex items-center justify-center 
                        bg-[#333] text-white hover:bg-black hover:text-white transition-colors
                        ${currentPage === 1 ? "opacity-50 cursor-not-allowed pointer-events-none" : ""}`}
                    />
                </PaginationItem>

                {getPageNumbers().map((page, index) => {
                    if (page === "ellipsis-start" || page === "ellipsis-end") {
                        return (
                            <PaginationItem key={`ellipsis-${index}`}>
                                <PaginationEllipsis className="text-stone-400 w-4 md:w-9 h-9 flex justify-center items-center" />
                            </PaginationItem>
                        );
                    }

                    const pageNum = page as number;
                    return (
                        <PaginationItem key={pageNum}>
                            <PaginationLink
                                href="#"
                                isActive={currentPage === pageNum}
                                onClick={(e) => handlePageClick(e, pageNum)}
                                className={`rounded-none border-none shadow-none hover:bg-transparent 
                                text-xs md:text-sm h-9 w-6 md:h-10 md:w-10 px-0 md:px-4
                                ${currentPage === pageNum
                                        ? "font-bold text-[#333] scale-110"
                                        : "font-medium text-stone-400 hover:text-[#333]"
                                    }`}
                            >
                                {pageNum}
                            </PaginationLink>
                        </PaginationItem>
                    );
                })}

                <PaginationItem>
                    <PaginationNext
                        href="#"
                        onClick={(e) => handlePageClick(e, currentPage + 1)}
                        className={`h-9 w-9 md:h-10 md:w-10 p-0 rounded-none flex items-center justify-center 
                        bg-[#333] text-white hover:bg-black hover:text-white transition-colors
                        ${currentPage === totalPages ? "opacity-50 cursor-not-allowed pointer-events-none" : ""}`}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}