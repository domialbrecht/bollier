import {useRef} from 'react'

export default function Gallery({
  images,
  children,
}: {
  images: string[]
  children?: JSX.Element
}) {
  const ref = useRef(null)
  return (
    <div
      className="gap-8 columns-1 md:columns-3 xl:columns-5 relative"
      ref={ref}
    >
      {children && <div className="mb-8 relative z-10">{children}</div>}
      {images.map((p, i) => (
        <div
          className={`mb-8 ${i > 5 ? 'hidden md:block' : 'block'}`}
          key={p}
          style={{
            minHeight: '200px',
            transition: `all 1s cubic-bezier(0.17, 0.55, 0.55, 1) ${i * 0.1}s`,
          }}
        >
          <img
            alt="image"
            src={p}
            loading="lazy"
            className="w-full md:w-auto"
            decoding="async"
          />
        </div>
      ))}
    </div>
  )
}
