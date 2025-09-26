import { type DependencyList, useEffect, useState } from 'react'

type AsyncState<T> =
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: Error }

export default function useQuery<T>(
  fn: () => Promise<T>,
  deps: DependencyList = []
): AsyncState<T> {
  const [status, setStatus] = useState<AsyncState<T>>({ status: 'loading' })

  useEffect(() => {
    // Reset cancellation flag for new request
    let isCancelled = false

    const executeQuery = async () => {
      setStatus({ status: 'loading' })

      try {
        const response = await fn()

        // Check if request was cancelled while waiting
        if (!isCancelled) {
          setStatus({ status: 'success', data: response })
        }
      } catch (error) {
        if (!isCancelled) {
          setStatus({ status: 'error', error: error as Error })
        }
      }
    }

    executeQuery()

    // Cleanup: mark current request as cancelled
    return () => {
      isCancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return status
}
