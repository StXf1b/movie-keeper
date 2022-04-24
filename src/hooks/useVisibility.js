import { useEffect, useState } from 'react'
import { projectFirestore } from '../firebase/config'
import { useAuthContext } from './useAuthContext'

export const useVisibility = (movieId) => {
  const [isCancelled, setIsCancelled] = useState(false)
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch } = useAuthContext()
  
  const editVisibility = async (visibility) => {
    setError(null)
    setIsPending(true)

    try {

      await projectFirestore.collection('movies').doc(movieId).update({ visibility: visibility });
      
      // dispatch logout action
      dispatch({ type: 'SET_VISIBILITY' })

      // update state
      if (!isCancelled) {
        setIsPending(false)
        setError(null)
      } 
    } 
    catch(err) {
      if (!isCancelled) {
        setError(err.message)
        setIsPending(false)
      }
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { editVisibility, error, isPending }
}