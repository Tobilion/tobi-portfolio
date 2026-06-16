'use client'

import { Suspense, lazy, useState } from 'react'

const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
  offlineFallback?: string
}

function SplineWithFallback({
  scene,
  className,
  offlineFallback,
}: SplineSceneProps) {
  const [hasError, setHasError] = useState(false)

  if (hasError && offlineFallback) {
    return (
      <img
        src={offlineFallback}
        alt="3D Scene Preview"
        className={`object-cover object-center rounded-3xl ${className ?? ''}`}
      />
    )
  }

  return (
    <Spline
      scene={scene}
      className={className}
      onError={() => setHasError(true)}
    />
  )
}

export function SplineScene({ scene, className, offlineFallback }: SplineSceneProps) {
  return (
    <Suspense
      fallback={
        offlineFallback ? (
          <img
            src={offlineFallback}
            alt="3D Scene Preview"
            className={`object-cover object-center rounded-3xl ${className ?? ''}`}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="loader"></span>
          </div>
        )
      }
    >
      <SplineWithFallback
        scene={scene}
        className={className}
        offlineFallback={offlineFallback}
      />
    </Suspense>
  )
}
