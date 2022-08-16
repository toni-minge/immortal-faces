import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import Cross from '../components/elements/cross'
import CommunitySegment from '../components/community-segment'
import HowDoesItWorkSegment from '../components/how-does-it-work-segment'
import RoadmapSegment from '../components/roadmap-segment'
import FaqSegment from '../components/faq-segment'

const Crosses = () => {
  return (
    <>
      <Cross pos='tl'/>
      <Cross pos='tr'/>
      <Cross pos='bl'/>
      <Cross pos='br'/>
    </>
  )
}


export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Immortal Faces - NFT</title>
        <meta name="description" content="Immortal Faces is an NFT project which let you become immortal on the blockchain." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section>
        <Crosses />
        <div className="section-content">
          <h1 className="text-8xl">Hallo Welt, ich sehe ja fast wie TikTok aus</h1>
        </div>
        <div className="section-icon-container">
          content
        </div>
      </section>

      <section>
        <Crosses />
        <div className="section-content">
          <div className="grid grid-cols-12 gap-8 items-center">
            <div className="col-span-5">
              <h2 className="">What is <br/> Immortal Faces NFT?</h2>
              <p>Immortal Faces is a NFT project with which you can become immortal in the blockchain. Be a part not only of the art project, be part but of something bigger. And in addition: All proceeds go back to the owners.  </p>
            </div>
            <div className="col-span-7">
              <img src="./img/header_video_test.jpg"/>
            </div>
          </div>
        </div>

        <div className="section-icon-container">
          <img className="h-32 cromatic-aberration-effect opacity-80" src="./elements/symbol_02.png"/>
        </div>
      </section>

      <section>
        <Crosses />
        <div className="section-content text-center">
          <HowDoesItWorkSegment />
        </div>
        <div className="section-icon-container">
          <img className="h-32 cromatic-aberration-effect opacity-80" src="./elements/symbol_01.png"/>
        </div>
      </section>

      <section>
        <Crosses />
        <div className="section-content">
          <h1 className="text-2xl">Our Latest Members</h1>
          <CommunitySegment />
        </div>
        <div className="section-icon-container">
          <img className="h-32 cromatic-aberration-effect opacity-80" src="./elements/symbol_03.png"/>
        </div>
      </section>

      <section>
        <Crosses />
        <div className="section-content text-center">
          <RoadmapSegment />
        </div>
        <div className="section-icon-container">
          <img className="h-32 cromatic-aberration-effect opacity-80" src="./elements/symbol_04.png"/>
        </div>
      </section>

      <section>
        <Crosses />
        <div className="section-content text-center">
          <FaqSegment />
        </div>
        <div className="section-icon-container">
          <img className="h-32 cromatic-aberration-effect opacity-80" src="./elements/symbol_05.png"/>
        </div>
      </section>


    </div>
  )
}
