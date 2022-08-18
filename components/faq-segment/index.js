import {useState} from 'react'

const faq_elements = [
  {
    'question': 'Who is behind Immortal Faces NFT?',
    'answer': '1 answer /answer /answer'
  },
  {
    'question': 'How much is one mint?',
    'answer': ' 2 answer /answer /answer'
  },
  {
    'question': 'What is a Metaface?',
    'answer': '3 answer /answer /answer'
  },
  {
    'question': 'How will my image be stored?',
    'answer': '5 answer /answer /answer'
  },
  {
    'question': 'Why am I immortal after mint?',
    'answer': ' 6 answer /answer /answer'
  },
  {
    'question': 'Why should I sell an NFT of me?',
    'answer': 'answer /answer /answer'
  },
  {
    'question': 'How will earnings be distributed?',
    'answer': 'All earnings, including OpenSea royalities and metaface sells, will be sent to a smart contract. / In the beginning payouts will be held round based. Which means that owners of the first round can go to the payout website to claim their share of the first Metaface proceeds. After that, owners of the second round can claim their share of the second metaface. And so on. /After all rounds are complete, royalties from OpenSea resales can be claimed on a pro-rata basis. /So someone who owns 10 NFF NFTs gets 10 times as much of the proceeds as someone who owns only one NFT. Payouts are expected to be open only on a monthly or quarterly basis. Of all the proceeds (metafaces and royalities), 80% will go back to the community. The remaining 20% will be used to maintain the project. '
  },
  {
    'question': 'What will happen after mint is over?',
    'answer': 'answer /answer /answer'
  },
  {
    'question': 'Is the NFF Smart Contract verified?',
    'answer': 'answer /answer /answer'
  }
]

export default function FaqSegment() {
  const [activeIndex, setActiveIndex] = useState(0)

  const selectQuestion = (index) => {
    setActiveIndex(index)
  }

  return (
    <div className="w-full text-left">
      <div className="">
        <img className="h-24 -ml-2 -mb-8  cromatic-aberration-effect-sm" src="./elements/symbol_05.png"/>
        <h2 className="mb-12">Frequently Asked Questions</h2>
      </div>
      <div className="grid grid-cols-12 gap-8">
        <div className="md:col-span-5 col-span-12 flex flex-col gap-4">
          {faq_elements.map((d, i) =>
            <div className="w-full text-left ">
              <button key={'question' + i} onClick={() => selectQuestion(i)} className={`text-left w-full ${i === activeIndex ? 'active-button mb-4 md:mb-0' : 'inactive-button'}`}>
                {i+1}. {d.question}
              </button>
              {faq_elements[activeIndex].answer.split('/').map((d, j) => <p key={j} className={`mb-4 md:mb-0 md:hidden display:block ${i !== activeIndex && 'hidden'}`}>{d}</p>)}
            </div>
          )}
        </div>
        <div className="md:col-span-7 col-span-12 hidden md:block">
          <h3 className="green-glow">{faq_elements[activeIndex].question}</h3>
          {faq_elements[activeIndex].answer.split('/').map((d, i) => <p key={i} className="mb-4">{d}</p>)}
        </div>

      </div>
    </div>
  )
}
