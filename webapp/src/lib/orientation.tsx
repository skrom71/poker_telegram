// import { useEffect, useState } from 'react'

// const useScreenOrientation = (): 'portrait' | 'landscape' => {
//   const getOrientation = () => (window.matchMedia('(orientation: portrait)').matches ? 'portrait' : 'landscape')

//   const [orientation, setOrientation] = useState<'portrait' | 'landscape'>(getOrientation())

//   useEffect(() => {
//     const handleOrientationChange = () => {
//       setOrientation(getOrientation())
//     }

//     const mediaQuery = window.matchMedia('(orientation: portrait)')
//     mediaQuery.addEventListener('change', handleOrientationChange)

//     return () => {
//       mediaQuery.removeEventListener('change', handleOrientationChange)
//     }
//   }, [])

//   return orientation
// }

// export default useScreenOrientation
