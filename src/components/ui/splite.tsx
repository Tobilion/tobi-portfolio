
import React, { Suspense, lazy, useState, useEffect } from 'react'

const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
  offlineFallback?: string
}

/** Offline / error fallback — uses <picture> for WebP with JPEG fallback */
function FallbackImage({ src, className }: { src: string; className?: string }): React.JSX.Element {
  // Derive a WebP sibling path: /Images/hero-3d.jpeg → /Images/hero-3d.webp
  const webp = src.replace(/\.(jpe?g|png)$/i, '.webp')

  return (
    <picture>
      <source srcSet={webp} type="image/webp" />
      <img
        src={src}
        alt="3D Scene Preview"
        width={480}
        height={480}
        decoding="async"
        className={`object-cover object-center rounded-3xl w-full h-full ${className ?? ''}`}
      />
    </picture>
  )
}

function SplineWithFallback({ scene, className, offlineFallback }: SplineSceneProps): React.JSX.Element {
  const [hasError, setHasError] = useState(false)

  if (hasError && offlineFallback) {
    return <FallbackImage src={offlineFallback} className={className} />
  }

  return (
    <Spline
      scene={scene}
      className={className}
      onError={() => setHasError(true)}
    />
  )
}

export function SplineScene({ scene, className, offlineFallback }: SplineSceneProps): React.JSX.Element {
  // Show the fallback image immediately on first paint.
  // Only attempt to mount the heavy Spline bundle after the browser is idle
  // so the rest of the page finishes painting first.
  const [canMount, setCanMount] = useState(false)

  useEffect(() => {
    let mounted = true;
    if ('requestIdleCallback' in window) {
      const id = requestIdleCallback(() => { if (mounted) setCanMount(true); }, { timeout: 3000 });
      return () => { mounted = false; cancelIdleCallback(id); };
    } else {
      const id = setTimeout(() => { if (mounted) setCanMount(true); }, 1500);
      return () => { mounted = false; clearTimeout(id); };
    }
  }, [])

  // While waiting for idle time, show the fallback image (looks great, zero cost)
  if (!canMount) {
    return offlineFallback
      ? <FallbackImage src={offlineFallback} className={className} />
      : <div className="w-full h-full flex items-center justify-center"><span className="loader" /></div>
  }

  return (
    <Suspense fallback={offlineFallback ? <FallbackImage src={offlineFallback} className={className} /> : <span className="loader" />}>
      <SplineWithFallback scene={scene} className={className} offlineFallback={offlineFallback} />
    </Suspense>
  )
}
