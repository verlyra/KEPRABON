import { NotFoundPublic } from '@/components/shared/NotFoundPublic'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_public/$')({
  component: NotFoundPublic,
})
