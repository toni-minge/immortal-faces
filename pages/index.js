import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import Cross from '../components/elements/cross'
import CommunitySegment from '../components/community-segment'

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
        <div className="section-icon-container"> Sub Content</div>
      </section>

      <section>
        <Crosses />
        <div className="section-content">
          <h1 className="text-2xl">Our Latest Members</h1>
          <CommunitySegment />
        </div>
      </section>


    </div>
  )
}
