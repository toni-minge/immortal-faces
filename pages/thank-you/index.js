import Head from 'next/head'
import Link from 'next/link'

export default function ThankYou(){
  return (
    <div className="w-screen max-w-7xl mx-auto">
      <Head>
        <title>Thank you! - Immortal Faces - NFT</title>
        <meta name="description" content="Immortal Faces is an NFT project which let you become immortal on the blockchain." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="p-4 grid h-screen items-center">
        <div className="text-center">

            <Link href="/">
              <img className="h-12 mx-auto mb-4 logo-hover  cromatic-aberration-effect-sm" src="/elements/imf_logo.svg"/>
            </Link>
            <Link href="/">
              <img className="h-10 mx-auto cromatic-aberration-effect-sm mb-10" src="/elements/imf_logo_font.svg"/>
            </Link>


          <h2 className="mb-2">Thank you!</h2>
          <p className="mb-8">You subscribed to <br/>our newsletter.</p>

          <Link href="/"><button>Back to Homepage</button></Link>
        </div>

      </div>

      <div className="footer w-full border-t white p-4 flex-col flex gap-2">
        <div className="flex gap-4">
          <Link href="/">Home</Link>
          <Link href="/imprint">Imprint</Link>
        </div>
        <div>
          ©2022 – Toni Minge – All Rights Reserved.
        </div>

      </div>
    </div>
  )
}
