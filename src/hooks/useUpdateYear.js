import { useEffect, useState } from 'react'
import { projectFirestore } from '../firebase/config'
import { useAuthContext } from './useAuthContext'

export const useUpdateYear = (movieId) => {
  const [isCancelled, setIsCancelled] = useState(false)
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch } = useAuthContext()
  
  const editYear = async (releaseYear) => {
    setError(null)
    setIsPending(true)

    try {

      await projectFirestore.collection('movies').doc(movieId).update({ releaseYear: releaseYear });
      
      dispatch({ type: 'RELEASE_YEAR' })

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

  return { editYear, error, isPending }
}