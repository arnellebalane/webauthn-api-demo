import { css } from '@emotion/css';
import { Button, Form, Input, Modal, Typography } from 'antd';

const { Title } = Typography;

export default function RegisterModal({ visible, onCancel }) {
  const [form] = Form.useForm();

  const handleFinish = (values) => {
    console.log(values);
  };

  return (
    <Modal visible={visible} width={420} closable={false} footer={null} onCancel={onCancel}>
      <Title level={5} className={titleClass}>
        Register new account
      </Title>

      <Form layout="vertical" form={form} preserve={false} onFinish={handleFinish}>
        <Form.Item label="Full name" name="fullname" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Email" name="email" rules={[{ required: true }]}>
          <Input type="email" />
        </Form.Item>

        <Form.Item label="Password" name="password" rules={[{ required: true }]}>
          <Input type="password" />
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
          <Input type="password" />
        </Form.Item>

        <Form.Item noStyle>
          <Button type="primary" htmlType="submit">
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
