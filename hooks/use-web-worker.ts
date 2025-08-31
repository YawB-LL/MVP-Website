import { useCallback, useRef, useEffect, useState } from 'react'

interface WorkerMessage {
  type: string
  data: any
  id: string
}

interface WorkerResponse {
  type: string
  data: any
  id: string
}

export function useWebWorker() {
  const workerRef = useRef<Worker | null>(null)
  const [isReady, setIsReady] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Initialize worker
  useEffect(() => {
    if (typeof window !== 'undefined' && 'Worker' in window) {
      try {
        workerRef.current = new Worker('/worker.js')
        
        workerRef.current.onmessage = (event: MessageEvent<WorkerResponse>) => {
          const { type, data, id } = event.data
          
          if (type === 'ERROR') {
            setError(data.message || 'Worker error occurred')
            setIsProcessing(false)
          } else {
            // Handle successful responses
            setIsProcessing(false)
          }
        }
        
        workerRef.current.onerror = (event) => {
          console.error('Worker error:', event)
          setError('Worker error occurred')
          setIsProcessing(false)
        }
        
        setIsReady(true)
      } catch (err) {
        console.error('Failed to create worker:', err)
        setError('Failed to initialize worker')
      }
    }
    
    return () => {
      if (workerRef.current) {
        workerRef.current.terminate()
      }
    }
  }, [])

  // Send message to worker
  const sendMessage = useCallback((type: string, data: any): Promise<any> => {
    return new Promise((resolve, reject) => {
      if (!workerRef.current || !isReady) {
        reject(new Error('Worker not ready'))
        return
      }

      const messageId = Math.random().toString(36).substr(2, 9)
      
      // Set up response handler
      const handleResponse = (event: MessageEvent<WorkerResponse>) => {
        const { type: responseType, data: responseData, id } = event.data
        
        if (id === messageId) {
          if (responseType === 'ERROR') {
            reject(new Error(responseData.message || 'Worker error'))
          } else {
            resolve(responseData)
          }
          
          // Remove the handler
          workerRef.current?.removeEventListener('message', handleResponse)
        }
      }
      
      workerRef.current.addEventListener('message', handleResponse)
      
      // Send message
      workerRef.current.postMessage({
        type,
        data,
        id: messageId
      })
      
      setIsProcessing(true)
      setError(null)
    })
  }, [isReady])

  // Calculate investment returns
  const calculateInvestmentReturns = useCallback(async (data: {
    principal: number
    rate: number
    time: number
    compounding: 'monthly' | 'quarterly' | 'annual'
  }) => {
    try {
      const result = await sendMessage('CALCULATE_INVESTMENT_RETURNS', data)
      return result
    } catch (err) {
      console.error('Investment calculation failed:', err)
      throw err
    }
  }, [sendMessage])

  // Process image data
  const processImageData = useCallback(async (data: {
    imageData: any
    width: number
    height: number
    operations: string[]
  }) => {
    try {
      const result = await sendMessage('PROCESS_IMAGE_DATA', data)
      return result
    } catch (err) {
      console.error('Image processing failed:', err)
      throw err
    }
  }, [sendMessage])

  // Analyze performance metrics
  const analyzePerformance = useCallback(async (data: {
    metrics: {
      fcp?: number
      lcp?: number
      fid?: number
      cls?: number
    }
    thresholds?: any
  }) => {
    try {
      const result = await sendMessage('ANALYZE_PERFORMANCE', data)
      return result
    } catch (err) {
      console.error('Performance analysis failed:', err)
      throw err
    }
  }, [sendMessage])

  // Generate chart data
  const generateChartData = useCallback(async (data: {
    type: 'line' | 'bar' | 'pie'
    points: any[]
    options?: any
  }) => {
    try {
      const result = await sendMessage('GENERATE_CHART_DATA', data)
      return result
    } catch (err) {
      console.error('Chart data generation failed:', err)
      throw err
    }
    }, [sendMessage])

  // Terminate worker
  const terminate = useCallback(() => {
    if (workerRef.current) {
      workerRef.current.terminate()
      workerRef.current = null
      setIsReady(false)
      setIsProcessing(false)
    }
  }, [])

  return {
    isReady,
    isProcessing,
    error,
    calculateInvestmentReturns,
    processImageData,
    analyzePerformance,
    generateChartData,
    terminate,
    sendMessage
  }
}
