import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ReactNode } from "react"

interface EmptyStateProps {
  icon: ReactNode
  title: string
  description: string
  action?: {
    label: string
    onClick: () => void
  }
  className?: string
}

export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <Card className={className}>
      <CardContent className="flex flex-col items-center justify-center p-8 text-center">
        <div className="mb-4 text-muted-foreground">{icon}</div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground mb-6 max-w-sm">{description}</p>
        {action && (
          <Button onClick={action.onClick} className="bg-tracky-primary hover:bg-tracky-primary/90">
            {action.label}
          </Button>
        )}
      </CardContent>
    </Card>
  )
}