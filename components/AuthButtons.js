import { useContext, useState } from 'react';
import { css } from '@emotion/css';
import { Button, Card } from 'antd';
import RegisterModal from './RegisterModal';
import LoginModal from './LoginModal';
import AuthContext from '@/contexts/AuthContext';

const MODALS = {
  REGISTER: 'register',
  LOGIN: 'login',
};

export default function AuthButtons() {
  const { setUser, setToken } = useContext(AuthContext);

  const [modal, setModal] = useState(null);
  const closeModal = () => setModal(null);

  const handleAuthResponse = ({ user, token }) => {
    closeModal();
    setTimeout(() => {
      setUser(user);
      setToken(token);
    }, 300);
  };

  const handleRegister = async (data) => {
    const response = await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    handleAuthResponse(await response.json());
  };

  const handleLogin = async (data) => {
    const response = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    handleAuthResponse(await response.json());
  };

  return (
    <Card className={cardClass}>
      <p>
        It looks like you're not authenticated. Please login to your account first, or create a new account if you don't
        have one already.
      </p>

      <Button type="primary" className={buttonClass} onClick={() => setModal(MODALS.REGISTER)}>
        Register
      </Button>
      <Button type="primary" className={buttonClass} onClick={() => setModal(MODALS.LOGIN)}>
        Login
      </Button>

      <RegisterModal visible={modal === MODALS.REGISTER} onSubmit={handleRegister} onCancel={closeModal} />
      <LoginModal visible={modal === MODALS.LOGIN} onSubmit={handleLogin} onCancel={closeModal} />
    </Card>
  );
}

const cardClass = css`
  margin-bottom: 50px;
  text-align: center;
`;

const buttonClass = css`
  margin: 4px 8px;
`;
