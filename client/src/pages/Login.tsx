import { useState, useEffect } from "react";
import ModalLogin from "../components/modals/ModalLogin";

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

const Login = ({ isOpen, setIsOpen, setIsLoggedIn }: Props) => {
  const [isInitialMount, setIsInitialMount] = useState(true);

  useEffect(() => {
    if (isInitialMount) {
      setIsOpen(true);
      setIsInitialMount(false);
    }
  }, [isInitialMount, setIsOpen]);

  return (
    <div>
      <ModalLogin
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setIsLoggedIn={setIsLoggedIn}
      />
    </div>
  );
};

export default Login;
