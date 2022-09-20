import {useState} from 'react'
import MobileCollapseItem from './mobile-collapse-item'

const faq_elements = [
  {
    'question': 'Who is behind Ethernal Faces NFT?',
    'answer': <><p>The project was initiated by Toni Minge, painter and programmer from Berlin.  </p><p><a target="_blank" rel="noreferrer" href="https://toniminge.de">Toni Minge</a>, born in a cold summer in 1995, was raised in a small village in the desert of Germany – so-called Saxony-Anhalt. From there he found his way to Leipzig where he studied fine arts at <a target="_blank" rel="noreferrer" href="https://www.hgb-leipzig.de/">Hochschule für Grafik und Buchkunst</a>. After then everything changed: Berlin has become his new home.</p><p>Since 2019, he leads his own agency <a target="_blank" rel="noreferrer" href="https://minge-schmidt.com">Minge+Schmidt</a> as founder and head of programming with his good friend and co-founder Johannes Schmidt. Together they have worked with a wide range of clients including Native Instruments, Arte, TU Berlin, yoona.ai and many more.</p><p>A crucial theme for Toni Minge&apos;s artistic work is the investigation of non-esoteric aura and its reproducibility. The capitalization and digitalization of social structures play an essential role in this, which is also the origin of Toni Minge&apos;s latest project: &quot;Ethernal Faces&quot;. An attempt to investigate the influence of capital and digitality in human interaction through NFTs. </p></>
  },
  {
    'question': 'What is an NFT?',
    'answer': <p>As described on Wikipedia: &quotA non-fungible token (NFT) is a financial security consisting of digital data stored in a blockchain, a form of distributed ledger. The ownership of an NFT is recorded in the blockchain, and can be transferred by the owner, allowing NFTs to be sold and traded. NFTs can be created by anybody, and require few or no coding skills to create. NFTs typically contain references to digital files such as photos, videos, and audio. Because NFTs are uniquely identifiable assets, they differ from cryptocurrencies, which are fungible.&quot</p>
  },
  {
    'question': 'When will the pre-launch take place?',
    'answer': <p>The pre-launch will take place in mid-September.</p>
  },
  {
    'question': 'How much is one mint?',
    'answer': <p>The price of one mint will be 0.1 ETH, exluding gas fees.</p>
  },
  {
    'question': 'What do I need to join?',
    'answer': <p>To join, all you need is a MetaMask wallet, a webcam, a Desktop PC and enough ETH funds.</p>
  },
  {
    'question': 'How many NFTs can I mint?',
    'answer': <p>Everyone can mine as many NFTs of themselves as they want.</p>
  },
  {
    'question': 'How many people can participate in the project?',
    'answer': <p>Ethernal Faces is divided into 8 rounds of 1024 participants each. This means that in the end a maximum of 8192 people can participate.</p>
  },
  {
    'question': 'What is an Ethernal Society?',
    'answer': <><p>The Ethernal Society is a community of 1024 participants in the Ethernal Faces project.</p><p>Every society will get their own large NFT, which will be auctioned off. Similar to the big Beeple NFT. The proceeds go back to the Cummunity.</p><p> There will be 8 rounds in total.</p></>
  },
  {
    'question': 'How will my image be stored?',
    'answer': <p>The image is stored decentrally using the IPFS method. This means that there is no dependency on central servers, which could lead to the file no longer being accessible at your NFT.</p>
  },
  {
    'question': 'Why am I immortal after mint?',
    'answer': <p>In particular, the Ethereum Blockchain (which is what this project is running on) is designed to store information in the most decentralized and transparent way possible in a tamper-proof way. Thus, it will never be possible to delete your NFT. Which means that as long as the Ethereum blockchain exists, the proof of your NFT can never be lost.</p>
  },
  {
    'question': 'Why would I create an NFT of myself with Ethernal Faces and not create my own NFT without Ethernal Faces?',
    'answer': <p>Only those who own an Ethernal Faces NFT will be entitled to receive proceeds from the resales of the individual NFTs and Ethernal Society NFTs.</p>
  },
  {
    'question': 'Why should I sell an NFT of me?',
    'answer': <><p>That is the question this project seeks to answer.</p><p>What is the price for your person? Does it take $100, $2,000 or $50,000 for you to sell your image? This is also why the number of participants is limited to 8192. Because this is the only way to create demand for already occupied participant places. Only those who own an NFT from this project are entitled to receive shares from the proceeds.</p></>
  },
  {
    'question': 'How will earnings be distributed?',
    'answer': <><p>All earnings, including OpenSea royalities and metaface sells, will be sent to a smart contract.</p><p>After all rounds are complete, royalties from OpenSea resales can be claimed on a pro-rata basis. </p><p>So someone who owns 10 NFF NFTs gets 10 times as much of the proceeds as someone who owns only one NFT. Payouts are expected to be open only on a monthly or quarterly basis. Of all the proceeds (metafaces and royalities), 80% will go back to the community. The remaining 20% will be used to maintain the project.</p></>
  },
  {
    'question': 'What will happen after mint is over?',
    'answer': <><p>All proceeds from resales will continue to go to a Smart Contract that allows Ethernal Faces NFT owners to cash out their pro-rated proceeds on a regular basis, forever.</p><p>Finally, there will be a large physical exhibition showcasing the results from this project.</p></>
  },
  {
    'question': 'Is the NFF Smart Contract verified?',
    'answer': <p>Yes! You can look it up on <a target="_blank" rel="noreferrer" href="https://etherscan.io/address/0x29674B7feD83a3D0Ca54Bf9A6426f3f4212C8Bbb#code">etherscan.</a></p>
  }
]

export default function FaqSegment() {
  const [activeIndex, setActiveIndex] = useState(0)

  const selectQuestion = (index) => {
    setActiveIndex(index)
  }

  return (
    <div id="faq" className="w-full text-left">
      <div className="">
        <img className="h-24 -ml-2 -mb-8  cromatic-aberration-effect-sm" src="./elements/symbol_05.png"/>
        <h2 className="mb-12">Frequently Asked Questions</h2>
      </div>
      <div className="flex gap-8">
        <div className="md:w-5/12 w-full flex flex-col gap-0 md:gap-4">
          {faq_elements.map((d, i) =>
            <div key={"element_" + i} className="w-full text-left ">
              <button key={'question' + i} onClick={() => selectQuestion(i)} className={`hidden md:block text-left w-full ${i === activeIndex ? 'active-button md:mb-0' : 'inactive-button'}`}>
                {i+1}. {d.question}
              </button>
              <div className={`pt-4 md:pt-0 md:hidden display:block flex-col gap-4`}>
                <div>
                  <MobileCollapseItem index={i} question={faq_elements[i].question} lastClicked={activeIndex} content={faq_elements[i].answer} />
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="md:w-7/12 w-full hidden md:block">
          <div className="sticky top-4">
            <h3 className="green-glow mb-4">{faq_elements[activeIndex].question}</h3>
            <div className="flex flex-col gap-4">
                {faq_elements[activeIndex].answer}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
