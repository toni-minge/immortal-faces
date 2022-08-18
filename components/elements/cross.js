const position = {
  'tl': 'col-start-1 row-start-1',
  'tr': 'col-start-3 row-start-1',
  'bl': 'col-start-1 row-start-3',
  'br': 'col-start-3 row-start-3'
}

export default function Cross({pos}) {
  return (
    <div className={`w-full h-full ${position[pos]} relative`}>
      <span className="absolute h-full w-full md:border-r-2 border-r translate -translate-x-1/2 md:cromatic-aberration-effect"></span>
      <span className="absolute h-full w-full md:border-b-2 border-b translate -translate-y-1/2 md:cromatic-aberration-effect"></span>
    </div>
  )
}
