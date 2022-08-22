import * as React from 'react'

const NffContext = React.createContext()

const resetProps = {
  name: '',
  gender: null,
  mood: null,
  description: '',
  age: '',
}

const initState = {
  properties: {
    name: '',
    gender: null,
    mood: null,
    description: '',
    age: '',
  },
  transaction_hash: '',
  contract: null,
  auth: false,
  is_light_mode: true,
  account: null,
  is_whitelisted: false,
  public_cost: "0.08",
  public_cost_dark: "0.16",
  whitelist_cost: "0.01",
  video_ref: null,
  canvas_ref: null,
  svg_ref: null,
  image: null,
  svg: null,
  base64: null,
  error: null,
  loading: false,
  status: null,
  max_supply: 0,
  current_supply: 0,
  image_settings: {
    blocks: 32,
    height: 1000,
    width: 1000,
    block_size: 10,
  }
}

function nffReducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_MODE': {
      return {...state, is_light_mode: !state.is_light_mode}
    }
    case 'SET_MODE': {
      return {...state, is_light_mode: action.payload}
    }
    case 'SET_AUTH': {
      return {...state, auth: action.payload}
    }
    case 'SET_TRANSACTION_HASH': {
      return {...state, transaction_hash: action.payload}
    }
    case 'INCREASE_SUPPLY': {
      return {...state, current_supply: state.current_supply + 1}
    }
    case 'SET_PUBLIC_COST': {
      return {...state, public_cost: action.payload}
    }
    case 'SET_WHITELIST_COST': {
      return {...state, whitelist_cost: action.payload}
    }
    case 'SET_IS_WHITELISTED': {
      return {...state, is_whitelisted: action.payload}
    }
    case 'SET_MAX_SUPPLY': {
      return {...state, max_supply: action.payload}
    }
    case 'SET_CURRENT_SUPPLY': {
      return {...state, current_supply: action.payload}
    }
    case 'SET_ERROR': {
      return {...state, error: action.payload}
    }
    case 'SET_CONTRACT': {
      return {...state, contract: action.payload}
    }
    case 'SET_LOADING': {
      return {...state, loading: action.payload}
    }
    case 'SET_STATUS': {
      return {...state, status: action.payload}
    }
    case 'SET_ACCOUNT': {
      return {...state, account: action.payload}
    }
    case 'SET_PROPERTIES': {
      return {...state, properties: action.payload}
    }
    case 'SET_VIDEO_REF': {
      return {...state, video_ref: action.payload}
    }
    case 'SET_CANVAS_REF': {
      return {...state, canvas_ref: action.payload}
    }
    case 'RESET_STATE': {
      return {
        ...state,
        properties: resetProps,
        image: null,
        svg: null,
        base64: null,
      }
    }
    case 'SET_SVG_REF': {
      return {...state, svg_ref: action.payload}
    }
    case 'SET_SVG': {
      // console.log(action.payload)
      return {...state, svg: action.payload}
    }
    case 'SET_BASE64': {
      // console.log(action.payload)
      return {...state, base64: action.payload}
    }
    case 'SET_IMAGE': {
      return {...state, image: action.payload}
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

function NffProvider({children}) {
  const [state, dispatch] = React.useReducer(nffReducer, initState)
  // NOTE: you *might* need to memoize this value
  // Learn more in http://kcd.im/optimize-context
  const value = {state, dispatch}
  return <NffContext.Provider value={value}>{children}</NffContext.Provider>
}

function useNffContext() {
  const context = React.useContext(NffContext)
  if (context === undefined) {
    throw new Error('useNffContex must be used within a NffProvider')
  }
  return context
}

export {NffProvider, useNffContext}
