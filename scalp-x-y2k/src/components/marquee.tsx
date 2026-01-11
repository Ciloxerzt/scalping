export function Marquee({ text, direction = 'left' }: { text: string; direction?: 'left' | 'right' }) {
    return (
        <div className="w-full bg-y2k-silver border-y border-black overflow-hidden py-2 whitespace-nowrap bg-[#E5E5E5] text-xs">
            <div className="animate-marquee inline-block font-mono uppercase font-bold tracking-widest">
                <span className="mx-4">{text}</span>
                <span className="mx-4">{text}</span>
                <span className="mx-4">{text}</span>
                <span className="mx-4">{text}</span>
            </div>
        </div>
    );
}
