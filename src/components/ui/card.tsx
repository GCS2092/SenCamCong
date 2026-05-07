import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const cardVariants = cva(
  'bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden transition-all duration-300 group',
  {
    variants: {
      status: {
        'a-venir': 'hover:border-green-500 hover:shadow-green-500/20',
        'passe': 'hover:border-gray-500 hover:shadow-gray-500/20',
        'complet': 'hover:border-red-500 hover:shadow-red-500/20',
      },
      hover: {
        true: 'hover:-translate-y-1 hover:shadow-2xl',
        false: '',
      },
    },
    defaultVariants: {
      status: 'a-venir',
      hover: true,
    },
  }
)

export interface CardProps extends VariantProps<typeof cardVariants> {
  className?: string
  children: React.ReactNode
}

export function Card({ className, status, hover, children }: CardProps) {
  return (
    <div className={cn(cardVariants({ status, hover }), className)}>
      {children}
    </div>
  )
}

const badgeVariants = cva(
  'text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-black/80 backdrop-blur-sm',
  {
    variants: {
      status: {
        'a-venir': 'text-green-500',
        'passe': 'text-gray-500',
        'complet': 'text-red-500',
      },
    },
    defaultVariants: {
      status: 'a-venir',
    },
  }
)

export interface BadgeProps extends VariantProps<typeof badgeVariants> {
  className?: string
  children: React.ReactNode
}

export function Badge({ className, status, children }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ status }), className)}>
      {children}
    </span>
  )
}

const buttonVariants = cva(
  'px-4 py-3 font-semibold rounded-full transition-all duration-300 text-sm',
  {
    variants: {
      variant: {
        primary: 'bg-white text-black hover:bg-green-500 hover:text-white hover:scale-105',
        secondary: 'border-2 border-white text-white hover:bg-white hover:text-black hover:scale-105',
      },
      size: {
        full: 'flex-1 text-center',
        auto: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'auto',
    },
  }
)

export interface ButtonProps extends VariantProps<typeof buttonVariants> {
  className?: string
  children: React.ReactNode
  href?: string
  onClick?: () => void
  target?: string
  rel?: string
}

export function Button({ className, variant, size, children, href, onClick, target, rel }: ButtonProps) {
  const baseClassName = cn(buttonVariants({ variant, size }), className)

  if (href) {
    return (
      <a href={href} className={baseClassName} target={target} rel={rel}>
        {children}
      </a>
    )
  }

  return (
    <button onClick={onClick} className={baseClassName}>
      {children}
    </button>
  )
}
