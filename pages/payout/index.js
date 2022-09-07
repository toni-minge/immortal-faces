import Head from 'next/head'
import Link from 'next/link'
import PayoutCurrencyContainer from '../../components/template/payout-currency-container'
import PayoutDataContainer from '../../components/template/payout-data-container'

export default function Payout(){
  return (
    <div className="w-screen">
      <Head>
        <title>ETHF - Ethernal Payouts</title>
        <meta name="description" content="Ethernal Faces is an NFT project which let you become immortal on the blockchain." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="p-4">
        <div className="nff-container">
          <div className="nff-header flex justify-between items-center">
            <div className="">
              <Link href="/">
                <div className="flex items-center cursor-pointer">
                  <img className="h-8 mr-4" src="/elements/imf_logo.svg"/>
                  <h1 className="text-xl sm:block hidden">Ethernal Payouts</h1>
                </div>
              </Link>
            </div>
            <button disabled>connect wallet</button>
          </div>

          <h3 className=" mt-8">Stats</h3>
          <div className="grid grid-cols-12 gap-4">
            <div className="md:col-span-6 col-span-12">
              <PayoutCurrencyContainer
                title="Total Payouts"
                amount={"0.00"}
                convertedAmount={"0.00"}/>
            </div>
            <div className="md:col-span-6 col-span-12">
              <PayoutCurrencyContainer
                title="Current Balance"
                amount={"0.00"}
                convertedAmount={"0.00"}/>
            </div>
            <div className="md:col-span-2 col-span-6">
              <PayoutDataContainer title="Interval" data="#0"/>
            </div>
            <div className="md:col-span-2 col-span-6">
              <PayoutDataContainer title="Automated" data="off"/>
            </div>
            <div className="md:col-span-4 sm:col-span-6 col-span-12">
              <PayoutDataContainer title="Payout open until" data="0d 0h 0m 0s"/>
            </div>
            <div className="md:col-span-4 sm:col-span-6 col-span-12">
              <PayoutDataContainer title="Next Payout in" data="tba"/>
            </div>
          </div>

          <h3 className=" mt-8">Your Payout</h3>
          <button className="mb-2" disabled>connect wallet</button>
          <small className="opacity-50 block">Payout will open when at least <br/>1024 people became immortal.</small>

          <h3 className=" mt-8">About Ethernal Payouts</h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div className="">
              <h4 className="mb-2">Who can get payouts?</h4>
              <p className="opacity-70">As a member of the Ethernal Society, you are eligible to participate in Ethernal Payouts. This means that you have the opportunity to receive your share of the proceeds from the project. Forever.</p>
            </div>
            <div className="">
              <h4 className="mb-2">From which money?</h4>
              <p className="opacity-70">What are the proceeds? All royalties from OpenSea resales and all proceeds from the sales of Ethernal Society NFTs, which are auctioned every 1024 members. Read more about the Ethernal Society <Link href="/#faq"><a className="underline">here</a></Link>.</p>
            </div>
            <div className="">
              <h4 className="mb-2">How is this calculated?</h4>
              <p className="opacity-70">Your share is calculated as follows: Number of your NFTs by the number of all owners times total credits times 0.8. That means, if you own 10 Ethernal Faces NFTs you are entitled to Ξ8 out of a total balance of Ξ8124.</p>
            </div>
            <div className="">
              <h4 className="mb-2">Why only 80%?</h4>
              <p className="opacity-70">The remaining 20% is used for the running costs of the project. That means: marketing, exhibitions, community management, etc.</p>
            </div>
          </div>

          <div className="footer w-full border-t white py-2 flex-col flex gap-2 mt-8">
            <div>
              <Link href="/imprint">Imprint</Link>

            </div>
            <div>
              ©2022 – Toni Minge – All Rights Reserved.
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
