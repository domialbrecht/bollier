import {motion, AnimatePresence} from 'framer-motion'
import {useState, useRef, useEffect, useCallback} from 'react'

export default function GalleryPresence({data}: {data: any[]}) {
  const [width, setWidth] = useState(0)
  const carousel = useRef<HTMLDivElement>(null)
  const scaleCarousel = useCallback(() => {
    setWidth(carousel.current?.scrollWidth || 0)
  }, [carousel])
  useEffect(() => {
    window.addEventListener('resize', scaleCarousel)
    return () => {
      window.removeEventListener('resize', scaleCarousel)
    }
  }, [carousel])
  return (
    <motion.div className="cursor-grab overflow-hidden min-h-[500px]">
      <motion.div
        drag="x"
        ref={carousel}
        dragConstraints={{
          right: 0,
          left: -(width - carousel.current?.clientWidth || 0),
        }}
        whileTap={{cursor: 'grabbing'}}
        onLoad={scaleCarousel}
        className="flex gap-5"
      >
        <AnimatePresence exitBeforeEnter>
          {data.map((p, i) => (
            <motion.div
              className="flex flex-col gap-4"
              initial={{y: 200, opacity: 0}}
              animate={{y: 0, opacity: 1}}
              transition={{duration: 0.2, delay: i * 0.05}}
              key={p.src}
            >
              <img
                alt="image"
                src={p.src}
                loading="lazy"
                className="max-w-none object-cover w-auto pointer-events-none"
                decoding="async"
              />
              <p>
                {p.title} - {p.description}
              </p>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}
