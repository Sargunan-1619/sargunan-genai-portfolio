import { useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { architectureNodes } from '@/data/profile'

const NODE_COLORS: Record<string, string> = {
  documents: '#8B92A3',
  embeddings: '#5B7CFA',
  'vector-db': '#5B7CFA',
  rag: '#8B7CF6',
  llm: '#4FD1E8',
  agent: '#4FD1E8',
  automation: '#8B7CF6',
}

// Layout positions for each node in the pipeline, arranged as a gentle
// vertical arc so it reads as a system rather than a straight technical list.
const NODE_POSITIONS: [number, number, number][] = [
  [-2.6, 3.0, -1.5], // documents
  [-1.6, 1.6, -0.4], // embeddings
  [-0.3, 0.5, 0.5], // vector-db
  [1.0, 1.3, -0.3], // rag
  [2.2, 2.4, -1.2], // llm
  [1.6, 0.0, 1.0], // agent
  [-0.4, -1.8, 0.2], // automation
]

interface PipelineSceneProps {
  activeNodeId: string | null
  mouse: React.MutableRefObject<{ x: number; y: number }>
  particleCount: number
  reducedMotion: boolean
}

function Node({
  position,
  color,
  active,
}: {
  position: [number, number, number]
  color: string
  active: boolean
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const targetScale = active ? 1.6 : 1

  useFrame(() => {
    if (!meshRef.current) return
    const s = meshRef.current.scale.x
    const next = THREE.MathUtils.lerp(s, targetScale, 0.08)
    meshRef.current.scale.setScalar(next)
  })

  return (
    <group position={position}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[0.14, 1]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={active ? 1.4 : 0.35}
          roughness={0.35}
          metalness={0.2}
        />
      </mesh>
      {active && (
        <pointLight color={color} intensity={2.2} distance={2.5} decay={2} />
      )}
    </group>
  )
}

function ConnectionSegment({
  start,
  end,
  active,
}: {
  start: [number, number, number]
  end: [number, number, number]
  active: boolean
}) {
  const points = useMemo(
    () => [new THREE.Vector3(...start), new THREE.Vector3(...end)],
    [start, end],
  )

  return (
    <line>
      <bufferGeometry attach="geometry">
        <bufferAttribute
          attach="attributes-position"
          count={points.length}
          array={new Float32Array(points.flatMap((p) => [p.x, p.y, p.z]))}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial
        attach="material"
        color={active ? '#4FD1E8' : '#2A303F'}
        transparent
        opacity={active ? 0.8 : 0.35}
      />
    </line>
  )
}

function Connections({ activeIndex }: { activeIndex: number }) {
  return (
    <>
      {NODE_POSITIONS.slice(0, -1).map((pos, i) => {
        const isActive = i === activeIndex || i === activeIndex - 1
        return (
          <ConnectionSegment
            key={i}
            start={pos}
            end={NODE_POSITIONS[i + 1]}
            active={isActive}
          />
        )
      })}
    </>
  )
}

function DataParticles({
  count,
  activeIndex,
  reducedMotion,
}: {
  count: number
  activeIndex: number
  reducedMotion: boolean
}) {
  const groupRef = useRef<THREE.Group>(null)
  const progressRef = useRef<number[]>(
    Array.from({ length: count }, (_, i) => i / count),
  )

  const pathLength = NODE_POSITIONS.length - 1

  useFrame((_, delta) => {
    if (reducedMotion || !groupRef.current) return
    const speed = 0.12

    groupRef.current.children.forEach((child, i) => {
      progressRef.current[i] = (progressRef.current[i] + delta * speed) % 1
      const t = progressRef.current[i] * pathLength
      const segIndex = Math.min(Math.floor(t), pathLength - 1)
      const localT = t - segIndex

      const a = new THREE.Vector3(...NODE_POSITIONS[segIndex])
      const b = new THREE.Vector3(...NODE_POSITIONS[segIndex + 1])
      const pos = a.clone().lerp(b, localT)
      child.position.copy(pos)

      const mesh = child as THREE.Mesh
      const mat = mesh.material as THREE.MeshBasicMaterial
      const nearActive = segIndex === activeIndex
      mat.opacity = nearActive ? 1 : 0.45
    })
  })

  return (
    <group ref={groupRef}>
      {Array.from({ length: count }).map((_, i) => (
        <mesh key={i}>
          <sphereGeometry args={[0.02, 6, 6]} />
          <meshBasicMaterial color="#4FD1E8" transparent opacity={0.6} />
        </mesh>
      ))}
    </group>
  )
}

export default function PipelineScene({
  activeNodeId,
  mouse,
  particleCount,
  reducedMotion,
}: PipelineSceneProps) {
  const groupRef = useRef<THREE.Group>(null)
  const { viewport } = useThree()

  const activeIndex = useMemo(
    () => architectureNodes.findIndex((n) => n.id === activeNodeId),
    [activeNodeId],
  )

  useFrame(() => {
    if (!groupRef.current) return
    // Gentle response to mouse position — no aggressive spin.
    const targetY = mouse.current.x * 0.25
    const targetX = -mouse.current.y * 0.12
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetY,
      0.03,
    )
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      targetX,
      0.03,
    )
  })

  const scale = Math.min(viewport.width / 8, 1)

  return (
    <group ref={groupRef} scale={scale}>
      <ambientLight intensity={0.4} />
      <directionalLight position={[3, 5, 4]} intensity={0.6} />

      <Connections activeIndex={activeIndex} />

      {architectureNodes.map((node, i) => (
        <Node
          key={node.id}
          position={NODE_POSITIONS[i]}
          color={NODE_COLORS[node.id]}
          active={node.id === activeNodeId}
        />
      ))}

      {!reducedMotion && (
        <DataParticles
          count={particleCount}
          activeIndex={activeIndex}
          reducedMotion={reducedMotion}
        />
      )}
    </group>
  )
}
