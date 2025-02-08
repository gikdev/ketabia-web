import pb from "@/lib/pb"
import { useCallback, useEffect, useState } from "react"

export function useLogout() {
  const logout = useCallback((cb?: () => void) => {
    pb.authStore.clear()
    cb?.()
  }, [])

  return logout
}

export function useLogin() {
  const [isLoading, setLoading] = useState(false)

  const login = (
    email: string,
    pw: string,
    onSuccessCallback?: () => void,
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    onError?: (err?: any) => void,
  ) => {
    setLoading(true)

    pb.collection("users")
      .authWithPassword(email, pw)
      .then(() => onSuccessCallback?.())
      .catch(onError)
      .finally(() => setLoading(false))
  }

  return { login, isLoading }
}

export function useForceUpdate() {
  const [, setVal] = useState(0)

  const forceUpdate = useCallback(() => setVal(p => p + 1), [])

  return forceUpdate
}

export function useFetchCollection<TData>(collectionKey: string) {
  const [collection, setCollection] = useState<TData[]>([])

  const fetchIt = useCallback(() => {
    pb.collection(collectionKey)
      .getFullList({ sort: "name" })
      .then(collec => setCollection(collec as TData[]))
      .catch(err => console.error("ERROR: ", err))
  }, [collectionKey])

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(fetchIt, [collectionKey])

  return [collection, fetchIt] as const
}

export function useFetchCollectionItem<TData>(collectionKey: string, itemId: string) {
  const [item, setItem] = useState<TData>()

  const fetchIt = useCallback(() => {
    pb.collection(collectionKey)
      .getOne(itemId)
      .then(item => setItem(item as TData))
      .catch(err => console.error("ERROR: ", err))
  }, [collectionKey, itemId])

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(fetchIt, [collectionKey, itemId])

  return [item, fetchIt] as const
}

// Made by ChatGPT, DO NOT TOUCH IT!
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export function useObjectState<ObjectType extends Record<string, any>>(initialState?: ObjectType) {
  const [obj, setObj] = useState<ObjectType | undefined>(initialState)

  const alterObj = useCallback(<K extends keyof ObjectType>(key: K, value: ObjectType[K]) => {
    setObj(prevObj => {
      if (!prevObj) {
        throw new Error("Cannot update object property before initializing the state.")
      }
      return {
        ...prevObj,
        [key]: value,
      }
    })
  }, [])

  return [obj, alterObj, setObj] as [
    typeof initialState extends undefined ? ObjectType | undefined : ObjectType,
    typeof alterObj,
    React.Dispatch<
      React.SetStateAction<
        typeof initialState extends undefined ? ObjectType | undefined : ObjectType
      >
    >,
  ]
}
