import { Col, Row, Typography } from 'antd';
import TFACard from '@/components/TFACard';

const { Title } = Typography;

export default function Settings() {
  const setupSecurityKey = () => {
    console.log('Setting up security key');
  };

  const setupBiometricKey = () => {
    console.log('Setting up biometric key');
  };

  return (
    <main>
      <Title level={4}>Two-Factor Authentication</Title>
      <p>
        Protect your account by setting up an extra layer of security to ensure that you're the only person who can
        access your account, even if someone knows your password.
      </p>

      <Row gutter={16}>
        <Col span={12}>
          <TFACard
            title="Setup security key"
            subtitle="For example: YubiKey, Titan Security Key, etc."
            onClick={setupSecurityKey}
          />
        </Col>
        <Col span={12}>
          <TFACard
            title="Setup biometric key"
            subtitle="For example: Apple Touch ID or Face ID, etc."
            onClick={setupBiometricKey}
          />
        </Col>
      </Row>
    </main>
  );
}
