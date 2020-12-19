import { useState } from 'react';
import { css } from '@emotion/css';
import { Button, Form, Input, Modal, Typography } from 'antd';
import omit from 'lodash/omit';

const { Title } = Typography;

export default function RegisterModal({ visible, onSubmit, onCancel }) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleFinish = async (values) => {
    setLoading(true);
    const data = omit(values, ['passwordConfirmation']);
    await onSubmit(data);
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
