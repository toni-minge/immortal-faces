import { useEffect, useState } from 'react'

import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import Cross from '../components/elements/cross'
import CommunitySegment from '../components/community-segment'
import HowDoesItWorkSegment from '../components/how-does-it-work-segment'
import RoadmapSegment from '../components/roadmap-segment'
import FaqSegment from '../components/faq-segment'
import MailchimpSubscribeWrapper from '../components/template/mailchimp-subscribe'

import Properties from '../components/imf/properties'
import Camera from '../components/imf/camera'
import MintArea from '../components/imf/mintArea'
import ProgressOverlay from '../components/imf/progress-overlay'

import { MenuOverlay, BurgerMenu } from '../components/template/menu'

import { useNffContext } from '../services/context/nff-context'

import {
  checkWalletIsConnected,
  connectWalletHandler,
  addWalletListener,
  initContract,
  getContractData,
  checkIfWhitelisted,
} from '../services/actions/nff-functions'

var mobile = require('is-mobile');

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
  const [isMobile, setIsMobile] = useState(false)
  const [menuActive, setMenuActive] = useState(false)

  useEffect(() => setIsMobile(mobile()))

  const {
    auth,
    is_prelaunch,
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


  // wallet listener
    useEffect(() => {
      addWalletListener(nff.dispatch)
    }, [])

    // get contract
    useEffect(() => {
      if (contract !== null){
        getContractData(nff.dispatch, contract)
      }
    }, [contract])

    // init contract
    useEffect(() => {
      _initContract(is_light_mode)
    }, [account])

    // current supply
    useEffect(() => {
      if (account !== null){
        checkIfWhitelisted(nff.dispatch, contract, account)
      }
    }, [current_supply])

    // check if whitelisted
    useEffect(() => {
      if (account !== null && contract !== null){
        checkIfWhitelisted(nff.dispatch, contract, account)
      }
    }, [account, contract])

    function connectWallet(){
      connectWalletHandler(nff.dispatch)
    }

    function getSubstring(string){
      const a = string.substring(0, 4);
      const b = '...'
      const c = string.substring(string.length - 4, string.length)
      return a + b + c
    }

    function toggleMode(){
      _initContract(!is_light_mode)
      nff.dispatch({type: 'TOGGLE_MODE'})
    }

    function _initContract(_is_light){
      if (account !== null){
        initContract(nff.dispatch, _is_light)
      }
    }

  return (
    <div className="w-screen">
      <Head>
        <title>Ethernal Faces - NFT</title>
        <meta name="description" content="Immortal Faces is an NFT project which let you become immortal on the blockchain." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ProgressOverlay
        dispatch={nff.dispatch}
        loading={loading}
        error={error}
        txHash={transaction_hash}
        status={status}/>

      <MenuOverlay active={menuActive} setActive={setMenuActive}/>

      <div className="p-4">
        <section>
          <Cross pos='tl'/>
          <div className={`col-start-3`}>
            <BurgerMenu active={menuActive} setActive={setMenuActive}/>
          </div>
          <div className="section-content">
            <div className="flex flex-col text-center gap-4">
              <img className="h-16 mx-auto mb-4 logo-hover  cromatic-aberration-effect-sm" src="/elements/imf_logo.svg"/>
              <img className="h-14 mx-auto cromatic-aberration-effect-sm" src="/elements/ethf_logo.svg"/>
              <span className="green-glow">Become immortal on <br/>the blockchain</span>
              <small className="opacity-60">pre-launch begins Q4</small>
              <a href="#about" className="no-underline w-48 rounded-tl-xl rounded-br-xl mt-8 mx-auto py-1 px-1 bg-white text-dark cromatic-aberration-effect-sm"> Become Immortal </a>

              <Link href="/payout"><a className="no-underline w-48 border rounded-tl-xl rounded-br-xl mx-auto py-1 px-1">Get your Payouts</a></Link>
            </div>
          </div>
        </section>

        <section id="about">
          <Crosses />
          <div className="section-content">
            <div className="flex gap-8 flex-col md:flex-row items-center">
              <div className="md:w-5/12 w-full">
                <img className="h-24 -ml-2 -mb-6 cromatic-aberration-effect-sm" src="./elements/symbol_02.png"/>
                <h2 className="mb-4">What is <br/> Ethernal Faces NFT?</h2>
                <p>With Ethernal Faces NFT you can become immortal as an NFT. Not only that, as a member of the Ethernal Society you become part of something bigger, part of a complex work of art. And in addition, you can earn some money, since all proceeds go back into the community.</p>
                <a href="#mintingArea" className="no-underline mb-8 w-48 block rounded-tl-xl rounded-br-xl mt-8 text-center py-1 px-1 bg-white text-dark cromatic-aberration-effect-sm">
                  Become Immortal
                </a>
              </div>
              <div className="md:w-7/12 w-full">
                <video className="border " poster="./img/header_video_test.jpg" playsInline controls>
                  <source src="./elements/ethernal_promo_compressed.mp4"></source>
                </video>
              </div>
            </div>
          </div>

          <div className="section-icon-container">
            <div className="flex gap-4">
              <a target="_blank" rel="noreferrer" href="https://twitter.com/ethernal_faces">
                <img className="h-8" src="./elements/icons8-twitter.svg" />
              </a>
              <a target="_blank" rel="noreferrer" href="https://discord.gg/va5DwNPSvf">
                <img className="h-8" src="./elements/icons8-discord-logo.svg" />
              </a>
            </div>
          </div>
        </section>

        <section id="howDoesItWork">
          <Crosses />
          <div className="section-content text-center">
            <HowDoesItWorkSegment />
          </div>

        </section>

        <section id="mintingArea">
          <Crosses />
          <div className="section-content text-center">
            <div id="mintArea" className="w-full z-40 relative">
              {/* Remove when pre-launch is over */}
              {!is_whitelisted || true && <div className="absolute z-50 top-20 h-full w-full backdrop-blur"></div> }
              <div className="flex flex-wrap items-start items-center text-left">
                <div className="w-full flex ">
                  <h2 className="mb-2 inline-block">Minting Area</h2>
                    <button
                      onClick={() => connectWallet()}
                      className={`px-4 mx-4 h-10 py-0`}>
                        { account === null ? 'connect wallet' : getSubstring(account) }
                    </button>
                </div>
                <small className="inline-block opacity-50">
                  {account === null ?
                    "(Currently only availiable for pre-launch members)" :
                    "(You are not whitelisted)"
                  }

                </small>
              </div>

              <div className="flex flex-wrap justify-center md:justify-start md:gap-16 gap-0 gap-y-8 text-left mt-4 scale-95">
                <div className="relative md:w-5/12 w-full">
                  <div className="sticky top-8 w-full">
                    <div className="max-w-md w-full md:px-0 mx-auto">
                      <div className="w-full">
                        <h3 className="md:text-2xl text-xl text-white nff-font">1. Take a picture</h3>
                        <Camera isMobile={isMobile}/>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="md:w-6/12 w-full">
                  <div className="max-w-md w-full mx-auto">
                    <Properties />
                  </div>

                  <div className="flex justify-center">
                    <div className="max-w-md w-full">
                      <div className="rounded-xl max-w-md">
                        <h3 className="md:text-2xl text-xl text-white nff-font mt-8">7. Become Immortal</h3>
                        <MintArea />
                      </div>

                      {max_supply !== 0 && max_supply - current_supply === 0 ?
                        <div className="bg-red-200 rounded-xl p-4 shadow-xl">
                          <p className="text-center">
                            No slots left.
                          </p>
                        </div>
                        : null }

                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </section>

        <section id="memberArea">
          <Crosses />
          <div className="section-content">
            <div>
              <img className="h-24 -ml-2 -mb-8 cromatic-aberration-effect-sm" src="./elements/symbol_03.png"/>
              <div className="flex flex-col sm:flex-row sm:items-center mb-6">
                <h2 className="inline-block mb-1">
                  Our Latest Members
                </h2>
                <span className="inline-block sm:ml-4 underline green-glow cursor-pointer">
                  <a target="_blank" rel="noreferrer" href="https://opensea.io/collection/ethernal-faces">See more on OpenSea</a>
                </span>
              </div>

              <CommunitySegment nffState={nff.state}/>
            </div>
          </div>
          <div className="section-icon-container">
          </div>
        </section>

        <section id="roadmap">
          <Crosses />
          <div className="section-content text-center">
            <div>
              <RoadmapSegment />
            </div>
          </div>
          <div className="section-icon-container">
          </div>
        </section>

        <section id="faq">
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
              <h2 className="mb-4">Newsletter</h2>
              <MailchimpSubscribeWrapper />
            </div>
        </section>

        <div className="footer w-full border-t white p-4 flex-col flex gap-2">
          <div>
            <Link href="/imprint">Imprint</Link>

          </div>
          <div>
            ??2022 ??? Toni Minge ??? All Rights Reserved.
          </div>

        </div>
      </div>
    </div>
  )
}
