import { architectureNodes } from '@/data/profile'

interface Props {
  activeNodeId: string | null
  className?: string
}

/**
 * Beautiful 2D fallback for when WebGL is unavailable.
 * Same information, no Three.js dependency.
 */
export default function StaticPipelineFallback({ activeNodeId, className }: Props) {
  return (
    <div
      className={`${className ?? ''} flex items-center justify-center`}
      aria-hidden="true"
    >
      <div className="flex flex-col items-center gap-3">
        {architectureNodes.map((node, i) => {
          const isActive = node.id === activeNodeId
          return (
            <div key={node.id} className="flex flex-col items-center">
              <div
                className={`w-3 h-3 rounded-full transition-all duration-500 ${
                  isActive
                    ? 'bg-cyan scale-150 shadow-[0_0_12px_2px_rgba(79,209,232,0.6)]'
                    : 'bg-paper-700'
                }`}
              />
              {i < architectureNodes.length - 1 && (
                <div className="w-px h-6 bg-ink-600" />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
