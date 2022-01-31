import React, { useRef, useEffect } from 'react'
import LoadingBar from 'react-top-loading-bar'

const LoaderBar = () => {
  const ref = useRef(null)

  useEffect(() => {
    setTimeout(() => ref.current.continuousStart(10, 200), 0)
    setTimeout(() => ref.current.complete(), 850)
  }, [])

  return (
    <div>
      <LoadingBar color="white" ref={ref} />
    </div>
  )
}

export default LoaderBar
