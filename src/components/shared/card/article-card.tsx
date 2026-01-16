import React from 'react';
import Image from 'next/image';
import TrasitionLink from '../../layouts/transition-link';

interface ArticleProps {
    image: string;
    date: string;
    title: string;
    description: string;
}

export default function ArticleCard({ image, date, title, description }: ArticleProps) {
    return (
        <article className="flex flex-col group cursor-pointer overflow-hidden">
            <TrasitionLink href="/article/detail" className="flex flex-col h-full">

                <div className="relative w-full aspect-5/3 overflow-hidden">
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, 350px"
                    />
                </div>

                {/* Content Section */}
                <div className="grow flex flex-col mt-4">
                    <time className="text-sm font-medium mb-1">
                        {date}
                    </time>

                    <h2 className="text-2xl font-serif mb-2 font-bold leading-tight line-clamp-2">
                        {title}
                    </h2>

                    <p className="text-[15px] leading-relaxed line-clamp-3">
                        {description}
                    </p>
                </div>

            </TrasitionLink>
        </article>
    );
};
