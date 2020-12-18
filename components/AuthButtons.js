import { Button, Card } from 'antd';
import style from './AuthButtons.module.css';

export default function AuthButtons() {
  return (
    <Card>
      <p>
        It looks like you're not authenticated. Please login to your account first, or create a new account if you don't
        have one already.
      </p>

      <Button type="primary" className={style.button}>
        Register
      </Button>
      <Button type="primary" className={style.button}>
        Login
      </Button>
    </Card>
  );
}
