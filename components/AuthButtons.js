import { useState } from 'react';
import { css } from '@emotion/css';
import { Button, Card } from 'antd';
import RegisterModal from './RegisterModal';
import LoginModal from './LoginModal';

const modals = {
  REGISTER: 'register',
  LOGIN: 'login',
};

export default function AuthButtons({ onRegister, onLogin }) {
  const [modal, setModal] = useState(null);

  const closeModal = () => setModal(null);

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

      <RegisterModal visible={modal === modals.REGISTER} onSubmit={onRegister} onCancel={closeModal} />
      <LoginModal visible={modal === modals.LOGIN} onSubmit={onLogin} onCancel={closeModal} />
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
