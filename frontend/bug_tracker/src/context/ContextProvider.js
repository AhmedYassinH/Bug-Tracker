import { createContext, useReducer,useContext,useState } from 'react'

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
    case 'SET_PROJECTS': 
    return {
      projects: action.payload
    }
    case 'CREATE_PROJECT':
      return {
        projects: [action.payload, ...state.projects]
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

  const [showModal,setShowModal]=useState(false);
  const [projects , setProjects] = useState(null);


  return (
    <Context.Provider
     value={{showModal,setShowModal,
            projects , setProjects}}>
      { children }
    </Context.Provider>
  )
}

export const useStateContext = () => useContext(Context) ;