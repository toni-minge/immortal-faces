import { useEffect, useState } from 'react';
import axios from 'axios'

import Spinner from '../elements/spinner'

const development_mode = false
const members_shown = 12

const TESTNET_CONTRACT = "0xfEbEE5055956265EA2e56ad879ca45400c966399"
const MAINNET_CONTRACT = "0x29674B7feD83a3D0Ca54Bf9A6426f3f4212C8Bbb"

const contract_address = development_mode ? TESTNET_CONTRACT : MAINNET_CONTRACT

export default function CommunitySegment({nffState}) {
  const [latestMembers, setLatestMembers] = useState([])
  const [loading, setLoading] = useState(true)

  const {
    current_supply,
    max_supply
  } = nffState

  useEffect(() => {
    if (current_supply !== 0 && latestMembers.length === 0){
      const start_token = current_supply - 1 < members_shown ? 0 : current_supply - 1 - members_shown
      console.log(start_token)
      getNFTs(start_token)
    }
  },[current_supply])

  const getNFTs = async(start_token) => {
    setLoading(true)
    try {
      const data = await axios.post(`api/get-latest-members?limit=${members_shown}&start_token=${start_token}`)
      setLatestMembers(data.data.nfts.reverse())
    } catch (err){
      console.log(err)
    }
    setLoading(false)
  }


  return (
    <div className="w-full grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-8">
      {!loading && latestMembers.map((d,i) => {
        const mood = d.metadata?.attributes?.find(a => a.trait_type === 'mood')?.value
        const gender = d.metadata?.attributes?.find(a => a.trait_type === 'gender')?.value
        const age = d.metadata?.attributes?.find(a => a.trait_type === 'age')?.value

        return (
          <div className="" key={'face_' + i}>
            <div style={{paddingBottom: '100%'}} className="relative w-full mb-3">
              <img className="mb-2 absolute w-full" src={d.media[0].raw}/>
            </div>
            <span className="text-xl mb-2 block">{d.metadata?.name}, {age}</span>
            <p className="mb-1">{d.metadata?.description}</p>
            <span className="community-badge">{mood}</span>
          </div>
          )
        }
      )}
      {loading &&
        <div className="w-full col-span-6">
          <Spinner />
        </div>
      }
    </div>
  )
}
