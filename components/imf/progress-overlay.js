import { useEffect } from 'react'

import {
  FaCheck,
} from "react-icons/fa";

const statusText = {
  'init': 'The process is being initialized.',
  'mining': 'Your face is being minted. This could take a while.',
  'success': 'You just became immortal. It can take some minutes until you see your face in your wallet.',
}

const Progress = ({dispatch, error, status, loading, txHash}) => {

  useEffect(() => {
    toggleBodyScroll(status !== null)
  }, [status])

  function toggleBodyScroll(bool){
    if (bool === true) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
  }

  function getTransactionLink(){
    const env = process.env.NODE_ENV
    const link = env === "development" ? "https://rinkeby.etherscan.io" : "https://etherscan.io"

    return `${link}/tx/${txHash}`
  }

  function closeOverlay(){
    dispatch({type: 'SET_ERROR', payload: null})
    dispatch({type: 'SET_STATUS', payload: null})
  }


  return (
    <div className="overlay">
      {status !== null ?
        <div
          style={{backgroundColor: 'rgba(0,0,0,0.7)'}}
          className="fixed w-screen h-screen z-50 flex items-center justify-center p-8">
          <div style={{maxHeight: '300px'}} className="max-w-md max-h-xl w-full h-full bg-white p-8 flex gap-8 items-center justify-center flex-col">
            <div className="flex-grow text-dark flex flex-col justify-center text-center">
              {loading ?
                <div className="">
                  <svg className="spinner" viewBox="0 0 50 50">
                    <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
                  </svg>
                </div> : null}
              {status === 'success' ?
                <div className="w-full flex justify-center">
                  <FaCheck size={36} className="text-green-500 mb-8"/>
                </div>
              : null}
              {error ?
                <p className="text-red-500">An Error occured. Please try again later</p>
                : null }
              {error === null ?
                <p className="text-dark">{statusText[status]}</p>
                : null }
              {status === 'success' ?
                <p className="mt-4">See your transaction <a className="underline" rel="noreferrer" target="_blank" href={getTransactionLink()}>here.</a></p>
                : null}
            </div>
            <div className="flex-shrink-0">
              { error || status === 'success' ?
                <button
                  onClick={() => closeOverlay()}
                  className="bg-white py-2 px-5 border-2 border-dark font-semibold px-4 color-dark text-dark">
                  close
                </button>
                : null }
            </div>
          </div>
        </div>
      : null }
    </div>
  )
}

export default Progress
