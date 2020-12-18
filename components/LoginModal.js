import { css } from '@emotion/css';
import { Button, Form, Input, Modal, Typography } from 'antd';

const { Title } = Typography;

export default function LoginModal({ visible, onCancel }) {
  const [form] = Form.useForm();

  const handleFinish = (data) => {
    console.log(data);
  };

  return (
    <Modal visible={visible} width={420} closable={false} footer={null} onCancel={onCancel}>
      <Title level={5} className={titleClass}>
        Login to your account
      </Title>

      <Form layout="vertical" form={form} preserve={false} onFinish={handleFinish}>
        <Form.Item label="Username" name="username" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Password" name="password" rules={[{ required: true }]}>
          <Input type="password" />
        </Form.Item>

        <Form.Item noStyle>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

const titleClass = css`
  margin-bottom: 24px !important;
`;
