import { useState } from "react";
import ModalLogin from "../components/modals/ModalLogin";

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};
const Login = ({ isOpen, setIsOpen, setIsLoggedIn }: Props) => {
  const handleClick = () => {
    if (!isOpen) setIsOpen(true);
  };

  return (
    <div>
      <button onClick={handleClick}>Login Page!</button>
      <ModalLogin
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setIsLoggedIn={setIsLoggedIn}
      />
    </div>
  );
};

export default Login;
