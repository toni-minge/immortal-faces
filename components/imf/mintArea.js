import Link from 'next/link'

import { useNffContext } from '../../services/context/nff-context'
import { mintNffHandler, connectWalletHandler, mintNffHandlerLight } from '../../services/actions/nff-functions'

const MintArea = () => {
  const nff = useNffContext()
  const {
    properties,
    is_whitelisted,
    video_ref,
    canvas_ref,
    image,
    image_settings,
    svg_ref,
    base64,
    account,
    contract,
    max_supply,
    current_supply,
    public_cost,
    public_cost_dark,
    whitelist_cost,
    is_light_mode
  } = nff.state

  const pc = is_light_mode ? public_cost : public_cost_dark
  const cost = is_whitelisted ? whitelist_cost : pc

  function mint(){
    if (is_light_mode){
      mintNffHandlerLight(nff.dispatch, properties, image, contract, cost, is_whitelisted)
    } else {
      mintNffHandler(nff.dispatch, properties, base64, contract, cost)
    }
  }

  function connectWallet(){
    connectWalletHandler(nff.dispatch)
  }

  function getSubstring(string){
    const a = string.substring(0, 4);
    const b = '...'
    const c = string.substring(string.length - 4, string.length)
    return a + b + c
  }

  const can_mint = properties.name !== '' &&
  properties.gender !== null &&
  properties.mood !== null &&
  properties.description !== '' &&
  properties.age !== '' &&
  image !== null &&
  account !== null &&
  max_supply - current_supply !== 0

  return (
    <div className="h-full flex justify-end w-full">
      <div className="flex w-full gap-4 flex-cols">
        <div className="w-full">
          {account === null ?
            <button
              onClick={() => connectWallet()}
              className="border border-white py-3 mb-4 font-semibold px-4 text-white w-full">
                { account === null ? 'connect wallet' : getSubstring(account) }
            </button>
            : null }

          <button
            onClick={() => mint(cost)}
            disabled={!can_mint}
            className={`${!is_light_mode? 'nff-dark-border' : 'nff-light-border'} px-2 py-3 text-white w-full ${can_mint ? 'opacity-100' : 'opacity-20 cursor-not-allowed'}`}>
              mint for {cost} ETH
          </button>
          <p className="text-xs text-white opacity-50 mt-2 text-center">
            {max_supply === 0 ?
              <span>You need to connect your wallet</span> :
              <span>{max_supply - current_supply} spots left</span>
            }

          </p>
          {!is_light_mode ?
            <p className="text-center text-white opacity-50 mt-8">
              Becoming immortal on-chain has its price. <br/> Read more <Link passHref href="/nff/considerations"><a className="underline">here.</a></Link>
            </p>
            : null }
        </div>
      </div>
    </div>
  )
}

export default MintArea;
