import { Loader2 } from 'lucide-react'

export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Loader2 className="h-16 w-16 animate-spin text-primary" />
      <p className="text-muted-foreground mt-4 text-lg font-medium">
        Loading...
      </p>
    </div>
  )
}
