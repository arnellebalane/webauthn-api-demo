import { useContext, useState } from 'react';
import { css } from '@emotion/css';
import { Button, Card } from 'antd';
import RegisterModal from './RegisterModal';
import LoginModal from './LoginModal';
import AuthContext from '@/contexts/AuthContext';

const modals = {
  REGISTER: 'register',
  LOGIN: 'login',
};

export default function AuthButtons() {
  const { setUser } = useContext(AuthContext);

  const [modal, setModal] = useState(null);
  const closeModal = () => setModal(null);

  const handleRegister = async (data) => {
    const response = await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const { user, token } = await response.json();

    closeModal();
    setTimeout(() => setUser(user), 300);
    console.log(token);
  };

  const handleLogin = async (data) => {
    const response = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const { user, token } = await response.json();

    closeModal();
    setTimeout(() => setUser(user), 300);
    console.log(token);
  };

  return (
    <Card className={cardClass}>
      <p>
        It looks like you're not authenticated. Please login to your account first, or create a new account if you don't
        have one already.
      </p>

      <Button type="primary" className={buttonClass} onClick={() => setModal(modals.REGISTER)}>
        Register
      </Button>
      <Button type="primary" className={buttonClass} onClick={() => setModal(modals.LOGIN)}>
        Login
      </Button>

      <RegisterModal visible={modal === modals.REGISTER} onSubmit={handleRegister} onCancel={closeModal} />
      <LoginModal visible={modal === modals.LOGIN} onSubmit={handleLogin} onCancel={closeModal} />
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
