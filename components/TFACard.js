import { css } from '@emotion/css';
import { Card, Spin, Typography } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const { Title } = Typography;

const LoadingIndicator = <LoadingOutlined style={{ fontSize: 24 }} spin />;

export default function TFACard({ title, subtitle, loading, onClick }) {
  return (
    <Spin spinning={loading} indicator={LoadingIndicator}>
      <Card className={cardClass} onClick={onClick}>
        <Title level={5}>{title}</Title>
        <p className={subtitleClass}>{subtitle}</p>
      </Card>
    </Spin>
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
