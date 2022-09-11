import { createContext } from 'react'

export interface IProfilePageContext {
  pageCount: number
  setPageCount?: (count: number) => void
}

export const ProfilePageContext = createContext<IProfilePageContext>({
  pageCount: 1,
})
