import {motion, AnimatePresence} from 'framer-motion'
import {useState} from 'react'
import library from '../../images.json'

function Gallery({images}: {images: any[]}) {
  return (
    <motion.div className="cursor-grab overflow-hidden">
      <motion.div drag="x" className="flex gap-5">
        <AnimatePresence exitBeforeEnter>
          {images.map((p, i) => (
            <motion.div
              className="flex flex-col gap-4"
              initial={{y: 200, opacity: 0}}
              exit={{y: -200, opacity: 0}}
              animate={{y: 0, opacity: 1}}
              transition={{duration: 0.2, delay: i * 0.05}}
              key={p.title}
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
export default function GalleryPresence() {
  const [currentYear, setCurrentYear] = useState(0)
  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 sticky bg-primary top-[57px] z-10">
        <div className="flex">
          {currentYear - 1 >= 0 && (
            <div
              className="flex items-center text-xl hover:text-secondary hover:translate-x-2 cursor-pointer transition"
              onClick={() => setCurrentYear(currentYear - 1)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              <span>{library[currentYear - 1].title}</span>
            </div>
          )}
        </div>
        <div className="text-2xl flex justify-center col-span-2 md:col-span-1 order-first md:order-none">
          <h3>{library[currentYear].title}</h3>
        </div>
        <div className="flex justify-end">
          {currentYear + 1 < library.length && (
            <div
              className="flex items-center text-xl hover:text-secondary hover:translate-x-2 cursor-pointer transition"
              onClick={() => setCurrentYear(currentYear + 1)}
            >
              <span>{library[currentYear + 1].title}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </div>
          )}
        </div>
      </div>
      <div className="mt-10 relative">
        <Gallery images={library[currentYear].images.map(l => l)} />
      </div>
    </div>
  )
}
