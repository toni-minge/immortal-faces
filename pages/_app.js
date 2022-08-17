import '../styles/globals.css'

import { NffProvider } from '../services/context/nff-context'
import { ToastContainer } from "react-toastify";

function MyApp({ Component, pageProps }) {
  return (
    <NffProvider>
      <Component {...pageProps} />
      <ToastContainer
        position="top-right"
        autoClose={8000}
        hideProgressBar={false}
        newestOnTop={false}
        draggable={false}
        pauseOnVisibilityChange
        closeOnClick
        pauseOnHover
      />
    </NffProvider>
  )
}

export default MyApp
