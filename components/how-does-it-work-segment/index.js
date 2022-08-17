const how_does_it_work_elements = [
  {
    'img': './elements/a_how_to_01.png',
    'title': 'You',
    'text': 'Sit down in front of your webcam and prepare yourself. This will be a special moment.'
  },
  {
    'img': './elements/a_how_to_02.png',
    'title': 'Pixels',
    'text': 'Your Image will be pixelated. Pixels are very important to show that you’re an NFT.'
  },
  {
    'img': './elements/a_how_to_03.png',
    'title': 'Metadata',
    'text': 'Add Metadata to yourself. How’s your name? What’s your mood? Tell the world about you.'
  },
  {
    'img': './elements/a_how_to_04.png',
    'title': 'Mint',
    'text': 'Connect your Metamask and make it official. This is the only way to verify you as a human.'
  },
  {
    'img': './elements/a_how_to_05.png',
    'title': 'Immortal Society',
    'text': 'Help us to complete the Immortal Society, a combination of 1024 individuals. 8 rounds each.'
  }
]

export default function HowDoesItWorkSegment() {
  return (
    <div className="w-full">
      <img className="h-24 -mb-6 opacity-80 mx-auto cromatic-aberration-effect-sm" src="./elements/symbol_01.png"/>
      <h2 className="-mt-8 mb-12">How does it work?</h2>
      <div className="grid grid-cols-5 gap-8">
        {how_does_it_work_elements.map((d, i) =>
          <div key={'hdiw_' + i} className="max-w-xs">
            <img className="mx-auto w-24" src={d.img}/>
            <h3 className="text-2xl mb-4 green-glow">{d.title}</h3>
            <p className="opacity-80">{d.text}</p>
          </div>
        )}
      </div>
    </div>
  )
}
