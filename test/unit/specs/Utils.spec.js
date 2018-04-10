import Pace from '@/utils/calculation/Pace'

describe('Calculation - Pace', () => {
  it('should return `3:20` when pass parameter meters 300', () => {
    expect(Pace(300)).to.be.equal('3:20')
  })
})
