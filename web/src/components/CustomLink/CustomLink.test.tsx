import { render } from '@redwoodjs/testing/web'

import CustomLink from './CustomLink'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('CustomLink', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CustomLink />)
    }).not.toThrow()
  })
})
