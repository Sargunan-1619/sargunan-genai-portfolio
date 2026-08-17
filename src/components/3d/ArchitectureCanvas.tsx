import { Suspense, useEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import PipelineScene from './PipelineScene'
import { useDeviceCapability } from '@/hooks/useDeviceCapability'
import StaticPipelineFallback from './StaticPipelineFallback'

interface ArchitectureCanvasProps {
  activeNodeId: string | null
  className?: string
}

export default function ArchitectureCanvas({
  activeNodeId,
  className,
}: ArchitectureCanvasProps) {
  const { prefersReducedMotion, isMobile, supportsWebGL } = useDeviceCapability()
  const mouse = useRef({ x: 0, y: 0 })

  useEffect(() => {
    if (prefersReducedMotion) return
    const handleMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [prefersReducedMotion])

  if (!supportsWebGL) {
    return <StaticPipelineFallback activeNodeId={activeNodeId} className={className} />
  }

  const particleCount = isMobile ? 3 : 8
  const dpr: [number, number] = isMobile ? [1, 1.5] : [1, 2]

  return (
    <div className={className} aria-hidden="true" style={{ width: '100%', height: '100%' }}>
      <Suspense fallback={<StaticPipelineFallback activeNodeId={activeNodeId} />}>
        <Canvas
          camera={{ position: [0, 0, 6], fov: 45 }}
          dpr={dpr}
          gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
          style={{ width: '100%', height: '100%' }}
        >
          <PipelineScene
            activeNodeId={activeNodeId}
            mouse={mouse}
            particleCount={particleCount}
            reducedMotion={prefersReducedMotion}
          />
        </Canvas>
      </Suspense>
    </div>
  )
}
