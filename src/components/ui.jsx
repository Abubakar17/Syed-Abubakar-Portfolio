// Small shared primitives used across sections.

// Renders confirmed text, or a visibly marked placeholder for content still to be supplied.
export function Fact({ value, as: Tag = "span" }) {
  if (value && typeof value === "object" && "todo" in value) {
    return <Tag className="todo">[To confirm: {value.todo}]</Tag>;
  }
  return <Tag>{value}</Tag>;
}

export function SectionHead({ id, index, eyebrow, title, children }) {
  return (
    <header className="section-head" data-reveal>
      <p className="eyebrow">
        <span className="eyebrow-index">{index}</span>
        {eyebrow}
      </p>
      <h2 id={id}>{title}</h2>
      {children && <div className="section-lede">{children}</div>}
    </header>
  );
}

export function Tags({ items, label = "Technologies" }) {
  return (
    <ul className="tags" aria-label={label}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

const isExternal = (href) => /^https?:/.test(href);

export function ArrowUpRight() {
  return (
    <svg className="arrow" viewBox="0 0 12 12" width="10" height="10" aria-hidden="true" focusable="false">
      <path d="M3 9 9 3M4 3h5v5" fill="none" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

export function TextLink({ href, children, className = "text-link" }) {
  const external = isExternal(href);
  return (
    <a
      className={className}
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
      {external && (
        <>
          <ArrowUpRight />
          <span className="sr-only"> (opens in a new tab)</span>
        </>
      )}
    </a>
  );
}

export function LinkRow({ links }) {
  if (!links?.length) return null;
  return (
    <ul className="link-row">
      {links.map((link) => (
        <li key={link.label}>
          <TextLink href={link.href}>{link.label}</TextLink>
        </li>
      ))}
    </ul>
  );
}
