import { createContext, useReducer, useEffect } from 'react'
import { projectAuth } from '../firebase/config'

export const AuthContext = createContext()

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload }
    case 'LOGOUT':
      return { ...state, user: null }
    case 'SET_VISIBILITY':
      return { ...state, visibility: action.payload }
    case "SET_GENER":
      return { ...state, gener: action.payload }
    case "SET_TITLE":
      return { ...state, title: action.payload }
    case "DESC":
      return { ...state, desc: action.payload }
    case "LINK":
      return { ...state, link: action.payload }
    case "WHERE":
      return { ...state, where: action.payload }
    case "RELEASE_YEAR":
      return { ...state, releaseYear: action.payload }
    case 'AUTH_IS_READY':
      return { user: action.payload, authIsReady: true }
    default:
      return state
  }
}

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { 
    user: null,
    authIsReady: false
  })

  useEffect(() => {
    const unsub = projectAuth.onAuthStateChanged(user => {
      dispatch({ type: 'AUTH_IS_READY', payload: user })
      unsub()
    })
  }, [])

  console.log('AuthContext state:', state)
  
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      { children }
    </AuthContext.Provider>
  )

}