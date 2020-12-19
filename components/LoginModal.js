import { useState } from 'react';
import { css } from '@emotion/css';
import { Button, Form, Input, Modal, Typography } from 'antd';

const { Title } = Typography;

export default function LoginModal({ visible, onSubmit, onCancel }) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleFinish = async (values) => {
    setLoading(true);
    await onSubmit(values);
  };

  return (
    <Modal
      visible={visible}
      width={420}
      closable={false}
      keyboard={!loading}
      maskClosable={!loading}
      footer={null}
      onCancel={onCancel}
    >
      <Title level={5} className={titleClass}>
        Login to your account
      </Title>

      <Form layout="vertical" form={form} preserve={false} onFinish={handleFinish}>
        <Form.Item label="Email" name="email" rules={[{ required: true }]}>
          <Input type="email" disabled={loading} />
        </Form.Item>

        <Form.Item label="Password" name="password" rules={[{ required: true }]}>
          <Input type="password" disabled={loading} />
        </Form.Item>

        <Form.Item noStyle>
          <Button type="primary" loading={loading} htmlType="submit">
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
