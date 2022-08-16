const position = {
  'tl': 'col-start-1 row-start-1',
  'tr': 'col-start-3 row-start-1',
  'bl': 'col-start-1 row-start-3',
  'br': 'col-start-3 row-start-3'
}

export default function Cross({pos}) {
  return (
    <div className={`w-full h-full ${position[pos]} relative opacity-80`}>
      <span className="absolute h-full w-full border-r-2 translate -translate-x-1/2 cromatic-aberration-effect"></span>
      <span className="absolute h-full w-full border-b-2 translate -translate-y-1/2 cromatic-aberration-effect"></span>
    </div>
  )
}
