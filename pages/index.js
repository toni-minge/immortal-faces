import { useEffect } from 'react'

import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import Cross from '../components/elements/cross'
import CommunitySegment from '../components/community-segment'
import HowDoesItWorkSegment from '../components/how-does-it-work-segment'
import RoadmapSegment from '../components/roadmap-segment'
import FaqSegment from '../components/faq-segment'

import { useNffContext } from '../services/context/nff-context'

import {
  checkWalletIsConnected,
  connectWalletHandler,
  addWalletListener,
  initContract,
  getContractData,
  checkIfWhitelisted,
} from '../services/actions/nff-functions'

const Crosses = () => {
  return (
    <>
      <Cross pos='tl'/>
      <Cross pos='tr'/>
    </>
  )
}

const is_light_mode = true

export default function Home() {
  const nff = useNffContext()

  const {
    auth,
    is_light_mode,
    account,
    transaction_hash,
    error,
    status,
    loading,
    contract,
    max_supply,
    current_supply,
    is_whitelisted,
    whitelist_cost,
    public_cost
  } = nff.state


  // init contract
  useEffect(() => {
    _initContract(is_light_mode)
  }, [account])

  // get contract
  useEffect(() => {
    if (contract !== null){
      getContractData(nff.dispatch, contract)
    }
  }, [contract])

  function _initContract(_is_light){
    if (contract === null){
      initContract(nff.dispatch, _is_light)
    }
  }

  return (
    <div className="">
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
        </section>

        <section>
          <Crosses />
          <div className="section-content">
            <div className="grid grid-cols-12 gap-8 items-center">
              <div className="col-span-5">
                <img className="h-24 -ml-3 -mb-6 opacity-80 cromatic-aberration-effect-sm" src="./elements/symbol_02.png"/>
                <h2 className="">What is <br/> Immortal Faces NFT?</h2>
                <p>Immortal Faces is a NFT project with which you can become immortal in the blockchain. Be a part not only of the art project, be part but of something bigger. And in addition: All proceeds go back to the owners.  </p>
              </div>
              <div className="col-span-7">
                <img src="./img/header_video_test.jpg"/>
              </div>
            </div>
          </div>

          <div className="section-icon-container">
            <div className="flex gap-4">
              <img className="h-8" src="./elements/icons8-twitter.svg" />
              <img className="h-8" src="./elements/icons8-discord-logo.svg" />
            </div>
          </div>
        </section>

        <section>
          <Crosses />
          <div className="section-content text-center">
            <HowDoesItWorkSegment />
          </div>

        </section>

        <section>
          <Crosses />
          <div className="section-content">
            <div>
              <img className="h-24 -ml-2 -mb-8 opacity-80 cromatic-aberration-effect-sm" src="./elements/symbol_03.png"/>
              <div className="flex items-center mb-6">
                <h2 className="inline-block mb-1">
                  Our Latest Members
                </h2>
                <span className="inline-block ml-4 underline green-glow cursor-pointer">
                  <a target="_blank" rel="noopener" href="https://opensea.io/collection/non-fungible-faces-off-chain">See more on OpenSea</a>
                </span>
              </div>

              <CommunitySegment nffState={nff.state}/>
            </div>
          </div>
          <div className="section-icon-container">
          </div>
        </section>

        <section>
          <Crosses />
          <div className="section-content text-center">
            <RoadmapSegment />
          </div>
          <div className="section-icon-container">
          </div>
        </section>

        <section>
          <Crosses />
          <div className="section-content text-center">
            <FaqSegment />
          </div>
          <div className="section-icon-container">

          </div>
        </section>

        <section>
          <Crosses />
            <div className="section-content text-center">
              <h2>Newsletter</h2>
            </div>
        </section>

    </div>
  )
}
