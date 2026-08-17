import { useRef, useState, type ReactNode, type MouseEvent } from 'react'

interface MagneticButtonProps {
  children: ReactNode
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'secondary'
  className?: string
  ariaLabel?: string
  target?: string
  rel?: string
  download?: boolean
}

export default function MagneticButton({
  children,
  href,
  onClick,
  variant = 'primary',
  className = '',
  ariaLabel,
  target,
  rel,
  download,
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null)
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: MouseEvent) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const relX = e.clientX - rect.left - rect.width / 2
    const relY = e.clientY - rect.top - rect.height / 2
    setOffset({ x: relX * 0.2, y: relY * 0.3 })
  }

  const handleMouseLeave = () => setOffset({ x: 0, y: 0 })

  const base =
    'inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-body text-sm font-medium transition-colors duration-300 whitespace-nowrap'
  const styles =
    variant === 'primary'
      ? 'bg-paper-100 text-ink-950 hover:bg-cyan'
      : 'border border-ink-600 text-paper-100 hover:border-cyan hover:text-cyan'

  const style = {
    transform: `translate(${offset.x}px, ${offset.y}px)`,
    transition: offset.x === 0 && offset.y === 0 ? 'transform 0.4s cubic-bezier(0.16,1,0.3,1)' : 'transform 0.1s ease-out',
  }

  if (href) {
    return (
      <a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        target={target}
        rel={rel}
        download={download}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={style}
        className={`${base} ${styles} ${className}`}
        aria-label={ariaLabel}
      >
        {children}
      </a>
    )
  }

  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={style}
      className={`${base} ${styles} ${className}`}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  )
}
