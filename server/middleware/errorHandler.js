export function errorHandler(err, req, res, next) {
  console.error('Error:', err)
  
  // Default error
  let error = {
    success: false,
    error: 'Internal server error',
    message: 'Something went wrong'
  }
  
  // Specific error types
  if (err.name === 'ValidationError') {
    error = {
      success: false,
      error: 'Validation error',
      message: err.message
    }
    res.status(400)
  } else if (err.name === 'TimeoutError') {
    error = {
      success: false,
      error: 'Request timeout',
      message: 'The request took too long to process'
    }
    res.status(408)
  } else {
    res.status(500)
  }
  
  res.json(error)
}
