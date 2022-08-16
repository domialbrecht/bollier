import {motion, AnimatePresence} from 'framer-motion'
import {useState, useRef, useEffect, useCallback} from 'react'

export default function GalleryPresence({data}: {data: any[]}) {
  const [width, setWidth] = useState(0)
  const carousel = useRef<HTMLDivElement>(null)
  const scaleCarousel = useCallback(() => {
    setWidth(carousel.current?.scrollWidth || 0)
  }, [carousel])
  useEffect(() => {
    scaleCarousel()
    window.addEventListener('resize', scaleCarousel)
    return () => {
      window.removeEventListener('resize', scaleCarousel)
    }
  }, [carousel])
  return (
    <motion.div className="cursor-grab md:overflow-hidden min-h-[500px]">
      <motion.div
        drag="x"
        ref={carousel}
        dragConstraints={{
          right: 0,
          left: -(width - carousel.current?.clientWidth || 0),
        }}
        whileTap={{cursor: 'grabbing'}}
        onLoad={scaleCarousel}
        className="sm:block md:flex gap-5 pointer-events-none md:pointer-events-auto"
      >
        <AnimatePresence exitBeforeEnter>
          {data.map((p, i) => (
            <motion.div
              className="sm:block mb-6 md:mb-0 md:flex flex-col gap-4"
              initial={{y: 200, opacity: 0}}
              animate={{y: 0, opacity: 1}}
              transition={{duration: 0.2, delay: i * 0.05}}
              key={p.src}
            >
              <img
                alt="image"
                src={p.src}
                loading="lazy"
                className="max-w-full md:max-w-none object-cover w-auto pointer-events-none mx:min-h-[500px]"
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
