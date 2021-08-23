import { useState } from 'react'
import { useEffect } from 'react'
import { ResizableBox, ResizableBoxProps } from 'react-resizable'
import './resizeable.css'

interface ResizableProps {
  direction: 'horizontal' | 'vertical'
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  let resizableProps: ResizableBoxProps
  const [innerWidth, setInnerWidth] = useState(window.innerWidth)
  const [innerHeight, setInnerHeight] = useState(window.innerHeight)
  const [width, setWidth] = useState(window.innerHeight * 0.75)
  useEffect(() => {
    let timer: any
    const listener = () => {
      if (timer) {
        clearTimeout(timer)
      }

      timer = setTimeout(() => {
        setInnerWidth(window.innerWidth)
        setInnerHeight(window.innerHeight)
        if (window.innerWidth * 0.5 < width) {
          setWidth(window.innerWidth * 0.75)
        }
      }, 100)
    }
    window.addEventListener('resize', listener)

    return () => {
      window.removeEventListener('resize', listener)
    }
  }, [width])

  if (direction === 'horizontal') {
    resizableProps = {
      onResizeStop: (event, data) => {
        setWidth(data.size.width)
      },
      className: 'resize-horizontal',
      minConstraints: [innerWidth * 0.2, Infinity],
      maxConstraints: [innerWidth * 1.75, Infinity],
      height: Infinity,
      width,
      resizeHandles: ['e'],
    }
  } else {
    resizableProps = {
      maxConstraints: [Infinity, innerHeight * 0.9],
      minConstraints: [Infinity, 48],
      height: 300,
      width: Infinity,
      resizeHandles: ['s'],
    }
  }

  return <ResizableBox {...resizableProps}>{children}</ResizableBox>
}

export default Resizable
