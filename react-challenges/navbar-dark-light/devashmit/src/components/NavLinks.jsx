const LINKS = [
  { href: "#home",     label: "Home" },
  { href: "#about",    label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#contact",  label: "Contact" },
];

export default function NavLinks({ onLinkClick }) {
  return (
    <>
      {LINKS.map(({ href, label }) => (
        <li key={href}>
          <a href={href} onClick={onLinkClick}>{label}</a>
        </li>
      ))}
    </>
  );
}
