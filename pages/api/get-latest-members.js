import axios from 'axios'
const MAINNET_CONTRACT = "0x29674B7feD83a3D0Ca54Bf9A6426f3f4212C8Bbb"

export default async function handler(req, res) {
  const { limit, start_token} = req.query

  console.log(req.query)

  const getNFTs = async() => {
    const base_uri = "https://eth-mainnet.g.alchemy.com/nft/v2"
    const api_key = process.env.ALCHEMY_API_KEY
    const function_name = "getNFTsForCollection"

    const data = await axios
      .get(`${base_uri}/${api_key}/${function_name}?contractAddress=${MAINNET_CONTRACT}&withMetadata=true&limit=${limit}&startToken=${start_token}`)
      console.log(data)
    return data.data
  }

  try {
    const results = await getNFTs()
    res.status(200).json({ nfts: results.nfts })
  } catch (err){
    console.log(err)
    res.status(500).json({ err: err })
  }

}
