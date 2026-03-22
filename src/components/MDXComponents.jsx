/**
 * Custom components injected into every MDX file via MDXProvider.
 * These replace the default HTML elements with styled versions.
 */

function CodeBlock({ className, children, ...props }) {
  const isInline = !className
  if (isInline) {
    return <code className={className} {...props}>{children}</code>
  }
  return <code className={className} {...props}>{children}</code>
}

function Callout({ type = 'info', children }) {
  const styles = {
    info:    { border: 'border-ink/20', bg: 'bg-surface', icon: 'ℹ' },
    warning: { border: 'border-amber-400/50', bg: 'bg-amber-50/30 dark:bg-amber-900/10', icon: '⚠' },
    tip:     { border: 'border-emerald-500/40', bg: 'bg-emerald-50/30 dark:bg-emerald-900/10', icon: '💡' },
    danger:  { border: 'border-red-500/40', bg: 'bg-red-50/30 dark:bg-red-900/10', icon: '🚫' },
  }
  const s = styles[type] || styles.info
  return (
    <div className={`border-l-4 ${s.border} ${s.bg} p-4 my-6 rounded-r`}>
      <span className="mr-2">{s.icon}</span>
      {children}
    </div>
  )
}

function Step({ number, title, children }) {
  return (
    <div className="flex gap-5 my-6">
      <div className="flex-shrink-0 w-8 h-8 border border-ink flex items-center justify-center
                      font-display text-xs font-700 text-ink">{number}</div>
      <div className="flex-1 pt-1">
        {title && <p className="font-display font-700 text-sm text-ink mb-2">{title}</p>}
        {children}
      </div>
    </div>
  )
}

export const MDXComponents = {
  code: CodeBlock,
  Callout,
  Step,
}
