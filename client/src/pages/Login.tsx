import { useState, useEffect } from 'react';
import ModalLogin from '../components/modals/ModalLogin';

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const Login = ({ isOpen, setIsOpen }: Props) => {
  const [isInitialMount, setIsInitialMount] = useState(true);

  useEffect(() => {
    if (isInitialMount) {
      setIsOpen(true);
      setIsInitialMount(false);
    }
  }, [isInitialMount, setIsOpen]);

  return (
    <div>
      <ModalLogin isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default Login;
