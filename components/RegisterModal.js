import { useState } from 'react';
import { css } from '@emotion/css';
import { Button, Form, Input, Modal, Typography } from 'antd';
import omit from 'lodash/omit';
import map from 'lodash/map';
import { UNIQUE_CONSTRAINT_VALIDATION_ERROR } from '@/lib/errors';
import { useAuth } from '@/contexts/AuthContext';

const { Title, Text } = Typography;

export default function RegisterModal({ visible, onFinish, onCancel }) {
  const { setAuth } = useAuth();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFinish = async (values) => {
    setLoading(true);
    setError(null);

    values = omit(values, ['passwordConfirmation']);

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();

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

    if (error.error_code === UNIQUE_CONSTRAINT_VALIDATION_ERROR) {
      form.setFields(
        map(error.fields, (value, field) => ({
          name: field,
          errors: [value],
        }))
      );
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
        Register new account
      </Title>

      <Form layout="vertical" form={form} preserve={false} onFinish={handleFinish}>
        <Form.Item label="Name" name="name" rules={[{ required: true }]}>
          <Input disabled={loading} />
        </Form.Item>

        <Form.Item label="Email" name="email" rules={[{ required: true }]}>
          <Input type="email" disabled={loading} />
        </Form.Item>

        <Form.Item label="Password" name="password" rules={[{ required: true }]}>
          <Input type="password" disabled={loading} />
        </Form.Item>

        <Form.Item
          label="Confirm password"
          name="passwordConfirmation"
          rules={[
            { required: true },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject('The two passwords you entered must match!');
              },
            }),
          ]}
        >
          <Input type="password" disabled={loading} />
        </Form.Item>

        {error && (
          <Form.Item>
            <Text type="danger">{error}</Text>
          </Form.Item>
        )}

        <Form.Item noStyle>
          <Button type="primary" loading={loading} htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

const titleClass = css`
  margin-bottom: 24px !important;
`;
