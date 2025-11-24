import { NotFound } from '@/components/shared/NotFound';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/dashboard/$')({
  component: NotFound,
});