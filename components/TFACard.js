import { css } from '@emotion/css';
import { Card, Typography } from 'antd';

const { Title } = Typography;

export default function TFACard({ title, subtitle, onClick }) {
  return (
    <Card className={cardClass} onClick={onClick}>
      <Title level={5}>{title}</Title>
      <p className={subtitleClass}>{subtitle}</p>
    </Card>
  );
}

const cardClass = css`
  cursor: pointer;
  transition: background-color 300ms ease;

  &:hover {
    background-color: #fafafa;
  }
`;

const subtitleClass = css`
  margin: 0;
`;
