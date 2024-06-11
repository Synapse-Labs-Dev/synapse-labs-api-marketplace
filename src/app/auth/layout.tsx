import TermsFooter from '@/components/blocks/termsfooter'
import { ThemeToggle } from '@/components/ui/theme-toggle'

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen p-8">
      <div className="flex items-center justify-end">
        <ThemeToggle />
      </div>
      <div className="flex flex-col items-center justify-between min-h-[92vh]">
        {children}
        <TermsFooter />
      </div>
    </div>
  )
}
