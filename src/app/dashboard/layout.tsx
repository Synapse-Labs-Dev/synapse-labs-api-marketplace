import Sidebar from '@/components/blocks/sidebar'
import { Separator } from '@/components/ui/separator'
import { getSignedInUser } from '@/lib/auth/helper'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getSignedInUser()

  return (
    <div className="flex md:h-screen  md:p-8 p-3">
      <Sidebar />
      <Separator orientation="vertical" className="h-[current]" />
      <div className="xl:px-24 lg:px-6 py-12  w-full flex justify-center">{children}</div>
    </div>
  )
}
