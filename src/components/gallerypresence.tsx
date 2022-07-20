import {motion, AnimatePresence} from 'framer-motion'
import {useState} from 'react'
const images = [
  '/assets/2011/1.jpg',
  '/assets/2011/2.jpg',
  '/assets/2011/3.jpg',
  '/assets/2011/4.jpg',
  '/assets/2011/5.jpg',
  '/assets/2011/6.jpg',
  '/assets/2011/7.jpg',
  '/assets/2011/8.jpg',
  '/assets/2013/1.jpg',
  '/assets/2013/2.jpg',
  '/assets/2013/3.jpg',
  '/assets/2013/4.jpg',
  '/assets/2013/5.jpg',
  '/assets/2013/6.jpg',
  '/assets/2013/7.jpg',
  '/assets/2013/8.jpg',
]
const years = [
  {
    year: '2011',
    title: 'Räberstöckli 2011',
  },
  {
    year: '2013',
    title: 'Räberstöckli 2013',
  },
  {
    year: '2015',
    title: 'Räberstöckli 2015',
  },
  {
    year: '2017',
    title: 'Räberstöckli 2017',
  },
]
function Gallery({images}: {images: string[]}) {
  return (
    <div className="gap-8 columns-1 md:columns-3 xl:columns-5 relative min-h-[1000px]">
      <AnimatePresence exitBeforeEnter initial={false}>
        {images.map((p, i) => (
          <motion.div
            className="mb-8"
            key={p}
            style={{
              minHeight: '200px',
            }}
            initial={{y: 200, opacity: 0}}
            exit={{y: -200, opacity: 0}}
            animate={{y: 0, opacity: 1}}
            transition={{duration: 0.2, delay: i * 0.05}}
          >
            <img
              alt="image"
              src={p}
              loading="lazy"
              className="w-full md:w-auto"
              decoding="async"
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
export default function GalleryPresence() {
  const [currentYear, setCurrentYear] = useState(0)
  return (
    <div>
      <div className="grid grid-cols-3 sticky top-4 z-10">
        <div className="flex">
          {currentYear - 1 >= 0 && (
            <div
              className="flex items-center text-xl hover:text-orange-500 hover:translate-x-2 cursor-pointer transition"
              onClick={() => setCurrentYear(currentYear - 1)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="1"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              <span>{years[currentYear - 1].title}</span>
            </div>
          )}
        </div>
        <div className="text-2xl flex justify-center">
          <h3>{years[currentYear].title}</h3>
        </div>
        <div className="flex justify-end">
          {currentYear + 1 < years.length && (
            <div
              className="flex items-center text-xl hover:text-orange-500 hover:translate-x-2 cursor-pointer transition"
              onClick={() => setCurrentYear(currentYear + 1)}
            >
              <span>{years[currentYear + 1].title}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="1"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </div>
          )}
        </div>
      </div>
      <div className="mt-10 relative">
        <Gallery
          images={images.filter(i => i.includes(years[currentYear].year))}
        />
      </div>
    </div>
  )
}
