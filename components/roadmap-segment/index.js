const roadmap_elements = [
  {
    'title': 'Round Start',
    'text': 'Each round is limited 1024 faces. No whitelist - first in line, first in time.'
  },
  {
    'title': 'Round Finish',
    'text': 'After 1024 faces are generated the mint will be closed until the next round starts.'
  },
  {
    'title': 'Immortal Society',
    'text': 'An image of the Immortal Society will be generated containing all faces of one round.'
  },
  {
    'title': 'New Round',
    'text': 'In total 8 rounds will be held. So the supply is limited to 8192 faces.'
  },
  {
    'title': 'Payout',
    'text': 'Earnings will go back to the community, including royalities and Immortal Society sells.'
  },
  {
    'title': 'Project End',
    'text': 'The Project is completed after all faces are generated.'
  },
  {
    'title': 'Time After',
    'text': 'Payouts of royalities will be controlled by a smart contract, forever.'
  },
  {
    'title': 'Conclusion',
    'text': 'Findings of this project will be used for a real-life exhibiton. '
  }
]

export default function RoadmapSegment() {
  return (
    <div className="w-full">
      <img className="h-24 -mb-6 opacity-80 mx-auto cromatic-aberration-effect-sm" src="./elements/symbol_04.png"/>
      <h2 className="-mt-8 mb-12">Roadmap</h2>
      <div className="grid grid-cols-4 gap-8">
        {roadmap_elements.map((d, i) =>
          <div key={'roadmap_' + i} className="max-w-xs">
            <h3 className="text-2xl mb-4 green-glow">{i+1}. {d.title}</h3>
            <p className="opacity-80">{d.text}</p>
          </div>
        )}
      </div>
    </div>
  )
}
