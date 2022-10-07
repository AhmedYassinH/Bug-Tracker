import { createContext, useReducer,useContext } from 'react'

export const Context = createContext()

export const contextReducer = (state, action) => {
  switch (action.type) {
    case 'show_modal': 
      return {
        showModal: true
      }
    case 'close_modal': 
    return {
    showModal: false
    }
    case 'CREATE_WORKOUT':
      return {
        workouts: [action.payload, ...state.workouts]
      }
    case 'DELETE_WORKOUT':
      return {
        workouts: state.workouts.filter((w) => w._id !== action.payload._id)
      }
    default:
      return state
  }
}

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(contextReducer, {
    showModal: false,
    
  })

  return (
    <Context.Provider value={{...state, dispatch}}>
      { children }
    </Context.Provider>
  )
}

export const useStateContext = () => useContext(Context) ;