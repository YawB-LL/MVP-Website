// Web Worker for LandLedger - Performance Optimization
// Handles heavy computations to reduce main thread blocking

// Listen for messages from the main thread
self.addEventListener('message', function(e) {
  const { type, data, id } = e.data
  
  switch (type) {
    case 'CALCULATE_INVESTMENT_RETURNS':
      const result = calculateInvestmentReturns(data)
      self.postMessage({ type: 'CALCULATION_COMPLETE', data: result, id })
      break
      
    case 'PROCESS_IMAGE_DATA':
      const processedImage = processImageData(data)
      self.postMessage({ type: 'IMAGE_PROCESSED', data: processedImage, id })
      break
      
    case 'ANALYZE_PERFORMANCE':
      const analysis = analyzePerformance(data)
      self.postMessage({ type: 'ANALYSIS_COMPLETE', data: analysis, id })
      break
      
    case 'GENERATE_CHART_DATA':
      const chartData = generateChartData(data)
      self.postMessage({ type: 'CHART_DATA_READY', data: chartData, id })
      break
      
    default:
      console.warn('Unknown message type:', type)
  }
})

// Calculate investment returns with complex calculations
function calculateInvestmentReturns(data) {
  const { principal, rate, time, compounding } = data
  
  // Simulate complex financial calculations
  let result = 0
  
  if (compounding === 'monthly') {
    const monthlyRate = rate / 12 / 100
    const months = time * 12
    result = principal * Math.pow(1 + monthlyRate, months)
  } else if (compounding === 'quarterly') {
    const quarterlyRate = rate / 4 / 100
    const quarters = time * 4
    result = principal * Math.pow(1 + quarterlyRate, quarters)
  } else {
    // Annual compounding
    result = principal * Math.pow(1 + rate / 100, time)
  }
  
  // Calculate additional metrics
  const totalReturn = result - principal
  const annualizedReturn = (Math.pow(result / principal, 1 / time) - 1) * 100
  
  return {
    finalAmount: Math.round(result * 100) / 100,
    totalReturn: Math.round(totalReturn * 100) / 100,
    annualizedReturn: Math.round(annualizedReturn * 100) / 100,
    principal,
    rate,
    time,
    compounding
  }
}

// Process image data for optimization
function processImageData(data) {
  const { imageData, width, height, operations } = data
  
  // Simulate image processing operations
  const processed = {
    width,
    height,
    operations: operations || [],
    processedAt: Date.now()
  }
  
  // Apply filters and transformations
  if (operations.includes('resize')) {
    processed.resized = true
    processed.newWidth = Math.floor(width * 0.8)
    processed.newHeight = Math.floor(height * 0.8)
  }
  
  if (operations.includes('optimize')) {
    processed.optimized = true
    processed.compressionRatio = 0.7
  }
  
  if (operations.includes('format')) {
    processed.format = 'webp'
    processed.quality = 85
  }
  
  return processed
}

// Analyze performance metrics
function analyzePerformance(data) {
  const { metrics, thresholds } = data
  
  const analysis = {
    score: 0,
    recommendations: [],
    issues: [],
    passed: []
  }
  
  // Analyze Core Web Vitals
  if (metrics.fcp) {
    if (metrics.fcp < 1800) {
      analysis.score += 25
      analysis.passed.push('FCP')
    } else {
      analysis.issues.push('FCP is too slow')
      analysis.recommendations.push('Optimize critical rendering path')
    }
  }
  
  if (metrics.lcp) {
    if (metrics.lcp < 2500) {
      analysis.score += 25
      analysis.passed.push('LCP')
    } else {
      analysis.issues.push('LCP is too slow')
      analysis.recommendations.push('Optimize largest contentful paint')
    }
  }
  
  if (metrics.fid) {
    if (metrics.fid < 100) {
      analysis.score += 25
      analysis.passed.push('FID')
    } else {
      analysis.issues.push('FID is too high')
      analysis.recommendations.push('Reduce JavaScript execution time')
    }
  }
  
  if (metrics.cls) {
    if (metrics.cls < 0.1) {
      analysis.score += 25
      analysis.passed.push('CLS')
    } else {
      analysis.issues.push('CLS is too high')
      analysis.recommendations.push('Prevent layout shifts')
    }
  }
  
  // Generate overall score
  analysis.score = Math.min(100, analysis.score)
  
  if (analysis.score >= 90) {
    analysis.grade = 'A'
    analysis.status = 'Excellent'
  } else if (analysis.score >= 80) {
    analysis.grade = 'B'
    analysis.status = 'Good'
  } else if (analysis.score >= 70) {
    analysis.grade = 'C'
    analysis.status = 'Fair'
  } else {
    analysis.grade = 'D'
    analysis.status = 'Poor'
  }
  
  return analysis
}

// Generate chart data for visualizations
function generateChartData(data) {
  const { type, points, options } = data
  
  let chartData = []
  
  switch (type) {
    case 'line':
      chartData = generateLineChartData(points, options)
      break
    case 'bar':
      chartData = generateBarChartData(points, options)
      break
    case 'pie':
      chartData = generatePieChartData(points, options)
      break
    default:
      chartData = generateDefaultChartData(points, options)
  }
  
  return {
    type,
    data: chartData,
    generatedAt: Date.now(),
    options: options || {}
  }
}

function generateLineChartData(points, options) {
  return points.map((point, index) => ({
    x: point.x || index,
    y: point.y || Math.random() * 100,
    label: point.label || `Point ${index + 1}`
  }))
}

function generateBarChartData(points, options) {
  return points.map((point, index) => ({
    category: point.category || `Category ${index + 1}`,
    value: point.value || Math.random() * 100,
    color: point.color || `hsl(${index * 30}, 70%, 50%)`
  }))
}

function generatePieChartData(points, options) {
  return points.map((point, index) => ({
    name: point.name || `Slice ${index + 1}`,
    value: point.value || Math.random() * 100,
    color: point.color || `hsl(${index * 60}, 70%, 50%)`
  }))
}

function generateDefaultChartData(points, options) {
  return points.map((point, index) => ({
    id: point.id || index,
    value: point.value || Math.random() * 100,
    label: point.label || `Item ${index + 1}`
  }))
}

// Handle errors gracefully
self.addEventListener('error', function(e) {
  console.error('Worker error:', e)
  self.postMessage({
    type: 'ERROR',
    error: {
      message: e.message,
      filename: e.filename,
      lineno: e.lineno
    }
  })
})

// Handle unhandled promise rejections
self.addEventListener('unhandledrejection', function(e) {
  console.error('Unhandled promise rejection:', e)
  self.postMessage({
    type: 'ERROR',
    error: {
      message: 'Unhandled promise rejection',
      reason: e.reason
    }
  })
})
