import { css } from '@emotion/css';
import { Button, Card } from 'antd';

export default function AuthButtons() {
  return (
    <Card className={cardClass}>
      <p>
        It looks like you're not authenticated. Please login to your account first, or create a new account if you don't
        have one already.
      </p>

      <Button type="primary" className={buttonClass}>
        Register
      </Button>
      <Button type="primary" className={buttonClass}>
        Login
      </Button>
    </Card>
  );
}

const cardClass = css`
  text-align: center;
`;

const buttonClass = css`
  margin: 4px 8px;
`;
