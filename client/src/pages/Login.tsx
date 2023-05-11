import { useState } from 'react';
import ModalLogin from '../components/modals/ModalLogin';

const Login: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div>
      <button onClick={handleClick}>Login Page!</button>
      <ModalLogin isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default Login;
