import { Link } from '@chakra-ui/react'

type CustomLinkProps = {
  children?: React.ReactNode
  to: string
  className?: string
}

const CustomLink = ({ children, to, className }: CustomLinkProps) => {
  return (
    <Link className={className} href={to} color="purple.500">
      {children}
    </Link>
  )
}

export default CustomLink
