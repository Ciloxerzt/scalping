import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    isLoading?: boolean;
    variant?: 'primary' | 'market';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, children, isLoading, variant = 'primary', ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(
                    "y2k-btn flex items-center justify-center gap-2",
                    variant === 'market' && "w-full py-4 text-xl tracking-widest uppercase",
                    className
                )}
                disabled={isLoading}
                {...props}
            >
                {isLoading && <Loader2 className="animate-spin h-4 w-4" />}
                {children}
            </button>
        );
    }
);
Button.displayName = "Button";

export { Button };
