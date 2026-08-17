import { useEffect, useState } from 'react'

export interface DeviceCapability {
  prefersReducedMotion: boolean
  isMobile: boolean
  supportsWebGL: boolean
}

function detectWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas')
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    )
  } catch {
    return false
  }
}

export function useDeviceCapability(): DeviceCapability {
  const [capability, setCapability] = useState<DeviceCapability>({
    prefersReducedMotion: false,
    isMobile: false,
    supportsWebGL: true,
  })

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const mobileQuery = window.matchMedia('(max-width: 768px)')

    const update = () => {
      setCapability({
        prefersReducedMotion: motionQuery.matches,
        isMobile: mobileQuery.matches,
        supportsWebGL: detectWebGL(),
      })
    }

    update()
    motionQuery.addEventListener('change', update)
    mobileQuery.addEventListener('change', update)

    return () => {
      motionQuery.removeEventListener('change', update)
      mobileQuery.removeEventListener('change', update)
    }
  }, [])

  return capability
}
