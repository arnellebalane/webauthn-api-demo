import { useState } from 'react';
import { css } from '@emotion/css';
import { Button, Form, Input, Modal, Typography } from 'antd';
import { INCORRECT_CREDENTIALS_ERROR } from '@/lib/errors';
import { useAuth } from '@/contexts/AuthContext';

const { Title, Text } = Typography;

const sendRequest = async (payload) => {
  const response = await fetch('/api/login', {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  return { response, data };
};

export default function LoginModal({ visible, onFinish, onCancel }) {
  const { setAuth } = useAuth();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFinish = async (values) => {
    setLoading(true);
    setError(null);

    try {
      const { response, data } = await sendRequest(values);

      if (response.status >= 400 && response.status <= 599) {
        return handleError(data);
      }

      setAuth(data);
      onFinish();
    } catch (error) {
      handleError(error);
    }
  };

  const handleError = (error) => {
    setLoading(false);

    if (error.error_code === INCORRECT_CREDENTIALS_ERROR) {
      setError(error.message);
    } else {
      setError('Something went wrong, please try again.');
    }
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

        {error && (
          <Form.Item>
            <Text type="danger">{error}</Text>
          </Form.Item>
        )}

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
