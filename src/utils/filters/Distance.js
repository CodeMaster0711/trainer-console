function Distance (value) {
  const distance = parseFloat(value).toFixed(2)

  return `${(distance / 1000).toFixed(2)} KM`
}

export default Distance
