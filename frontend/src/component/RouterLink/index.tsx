import { useMatch, useResolvedPath, Link } from "react-router-dom";
import type { LinkProps } from "react-router-dom";

interface RouterLinkProps extends LinkProps {
  activeClass?: string;
}

function RouterLink({ children, to, activeClass, ...props }: RouterLinkProps) {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });

  return (
    <Link to={to} {...props} className={match ? activeClass : ""}>
      {children}
    </Link>
  );
}
export default RouterLink;
