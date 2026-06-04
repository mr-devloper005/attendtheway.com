import type { ReactNode } from 'react'
import { EditableNavbar } from '@/editable/shell/EditableNavbar'
import { EditableFooter } from '@/editable/shell/EditableFooter'
import { editableDesignContract as dc } from '@/editable/layouts/design-contract'

export function EditableSiteShell({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`${dc.shell.page} relative flex min-h-screen flex-col overflow-x-clip ${className}`}>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(circle_at_top_left,rgba(77,93,255,0.08),transparent_48%),radial-gradient(circle_at_top_right,rgba(242,105,167,0.08),transparent_42%)]" />
      <EditableNavbar />
      <div className="relative min-h-0 flex-1">{children}</div>
      <EditableFooter />
    </div>
  )
}
