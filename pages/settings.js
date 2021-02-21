import { useRouter } from 'next/router';
import { Col, Row, Typography } from 'antd';
import base64url from 'base64url';
import TFACard from '@/components/TFACard';
import { AUTH_STATE, useAuth } from '@/contexts/AuthContext';

const { Title } = Typography;

export default function Settings() {
  const { token } = useAuth();
  const router = useRouter();

  if (token === AUTH_STATE.UNKNOWN) {
    return null;
  } else if (token === AUTH_STATE.UNAUTHENTICATED) {
    router.push('/');
    return null;
  }

  const setupSecurityKey = async () => {
    const responseGET = await fetch('/api/credentials/create', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const { attestation, token: newToken } = await responseGET.json();
    attestation.challenge = base64url.toBuffer(attestation.challenge);
    attestation.user.id = base64url.toBuffer(attestation.user.id);

    const credential = await navigator.credentials.create({
      publicKey: attestation,
    });
    const credentialJSON = {
      id: credential.id,
      rawId: base64url(credential.rawId),
      response: {
        attestationObject: base64url(credential.response.attestationObject),
        clientDataJSON: base64url(credential.response.clientDataJSON),
      },
      type: credential.type,
    };

    const responsePOST = await fetch('/api/credentials/create', {
      method: 'POST',
      body: JSON.stringify(credentialJSON),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${newToken}`,
      },
    });
    console.log(await responsePOST.json());
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

      <Row gutter={[16, 16]}>
        <Col span={24} sm={12}>
          <TFACard
            title="Setup roaming authenticator"
            subtitle="E.g.: YubiKey, Titan Security Key, etc."
            onClick={setupSecurityKey}
          />
        </Col>
        <Col span={24} sm={12}>
          <TFACard
            title="Setup platform authenticator"
            subtitle="E.g.: Apple Touch/Face ID, Android fingerprint, etc."
            onClick={setupBiometricKey}
          />
        </Col>
      </Row>
    </main>
  );
}
