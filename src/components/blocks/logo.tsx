import Image from 'next/image'
import Link from 'next/link'

interface LogoProps {
  height?: number
  width?: number
}
export const Logo = ({ height, width }: LogoProps) => {
  return (
    <Link href={'/'} className="flex items-center gap-2 hover:cursor-pointer">
      <Image src={'/logo.svg'} alt="logo" height={height} width={width} className="dark:invert " />
    </Link>
  )
}
