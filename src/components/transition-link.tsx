"use client";

import { usePageTransition } from "./page-transition";
import { AnchorHTMLAttributes, forwardRef } from "react";

interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
    href: string;
    children: React.ReactNode;
}

const TransitionLink = forwardRef<HTMLAnchorElement, Props>(
    ({ href, children, className, onClick, ...props }, ref) => {
        const { triggerTransition } = usePageTransition();

        const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
            if (onClick) {
                onClick(e);
            }

            e.preventDefault();
            triggerTransition(href);
        };

        return (
            <a
                ref={ref}
                href={href}
                onClick={handleClick}
                className={`cursor-pointer inline-block ${className || ""}`}
                {...props}
            >
                {children}
            </a>
        );
    }
);

// Wajib beri display name untuk debugging di React DevTools
TransitionLink.displayName = "TransitionLink";

export default TransitionLink;