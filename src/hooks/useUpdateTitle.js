import { useEffect, useState } from 'react'
import { projectFirestore } from '../firebase/config'
import { useAuthContext } from './useAuthContext'

export const useUpdateTitle = (movieId) => {
  const [isCancelled, setIsCancelled] = useState(false)
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch } = useAuthContext()
  
  const editTitle = async (title) => {
    setError(null)
    setIsPending(true)

    try {

      await projectFirestore.collection('movies').doc(movieId).update({ title: title });
      
      // dispatch logout action
      dispatch({ type: 'SET_TITLE' })

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

  return { editTitle, error, isPending }
}