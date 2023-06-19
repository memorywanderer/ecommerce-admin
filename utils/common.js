export const errorHandler = (data, res, code = 400) => {
  res.status(code).json({
    hasError: true,
    errorMessage: data
  })
}

export const validateAllOnce = (fields) => {
  for (let key in fields) {
    if (fields[key].trim() === "") {
      throw `${key} required`
    }
  }
}

export const responseHandler = (data, res, code = 200) => {
  res.status(code).json({
    hasError: false,
    body: data
  })
}