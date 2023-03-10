import { useState, useEffect } from "react"
import firestore from "@react-native-firebase/firestore"
import auth from "@react-native-firebase/auth"

export function useFirestore<T>(collectionPath: string): {
  data: T[]
  loading: boolean
  error: Error | null
} {
  const [data, setData] = useState<T[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    // Get a reference to the collection

    const db = firestore()
    const collectionRef = db.collection(collectionPath)
    const userId = auth().currentUser.uid

    // Listen to changes on the collection and update local state accordingly
    const unsubscribe = collectionRef.where("userId", "==", userId).onSnapshot(
      (snapshot) => {
        setData(
          snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          })) as unknown as T[],
        )
        setLoading(false)
      },
      (error: any) => {
        setLoading(false)
        setError(error)
      },
    )

    return () => {
      // Unsubscribe from the listener when the component unmounts
      unsubscribe()
    }
  }, [collectionPath])

  return { data, loading, error }
}
