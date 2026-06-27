import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/40 disabled:pointer-events-none disabled:opacity-50 cursor-pointer',
  {
    variants: {
      variant: {
        default:
          'bg-brown text-pearl shadow-md hover:bg-brown-light hover:shadow-lg active:scale-[0.98]',
        outline:
          'border border-taupe-light/80 bg-transparent text-brown hover:border-gold hover:bg-pearl',
        ghost: 'text-brown hover:bg-beige/80',
        champagne:
          'bg-gradient-to-r from-champagne/40 to-gold-light/30 text-brown border border-champagne/50 hover:from-champagne/55',
        whatsapp:
          'bg-emerald text-pearl shadow-md hover:bg-emerald/90 hover:shadow-lg active:scale-[0.98]',
      },
      size: {
        default: 'h-11 px-6 py-2 text-sm tracking-wide rounded-full',
        sm: 'h-9 px-4 text-xs rounded-full',
        lg: 'h-12 px-8 text-sm rounded-full',
        icon: 'h-10 w-10 rounded-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
