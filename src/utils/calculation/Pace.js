function Pace (meters = 0, lastPace) {
  let km = meters / 1000

  if (isNaN(km) || km === 0) {
    return lastPace !== null ? lastPace : `0'00"`
  }

  let seg = 0 * 1
  seg = seg + 1 * 60 + 0 * 60 * 60
  let ritSeg = seg / km / 60
  let paceMin = ritSeg - ritSeg % 1
  let paceSeg = ritSeg % 1 * 0.6 * 100
  paceSeg = paceSeg - paceSeg % 1

  return `${paceMin}'${paceSeg}"`
}

export default Pace
