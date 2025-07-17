'use client';

import Link from 'next/link';

export default function NeonLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <Link href={href} className="relative group inline-block text-white hover:cursor-none">
            <span className="relative z-10 group-hover:text-fuchsia-900 transition-colors duration-500">{children}</span>

            {/* Ligne animée */}
            <span
                className="w-0 rounded-xl group-hover:w-full transition-all duration-500 absolute left-0 bottom-[-10px] h-[4px] bg-gradient-to-r from-white via-fuchsia-500 to-fuchsia-800 shadow-[0_0_6px_#f0f,0_0_12px_#f0f] origin-left"
            />
        </Link>
    );
}
