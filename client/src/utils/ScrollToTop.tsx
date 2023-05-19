import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface ScrollToTopProps {
  children: React.ReactNode;
}

export default function ScrollToTop(props: ScrollToTopProps) {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return <>{props.children}</>;
}
