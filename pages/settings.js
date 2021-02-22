import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Col, Row, List, Typography } from 'antd';
import { css } from '@emotion/css';
import base64url from 'base64url';
import TFACard from '@/components/TFACard';
import { AUTH_STATE, useAuth } from '@/contexts/AuthContext';

const { Title } = Typography;

async function setupAuthenticator(type, token) {
  const responseGET = await fetch(`/api/credentials/create?type=${type}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  const { attestation, token: newToken } = await responseGET.json();
  attestation.challenge = base64url.toBuffer(attestation.challenge);
  attestation.user.id = base64url.toBuffer(attestation.user.id);
  attestation.excludeCredentials = attestation.excludeCredentials.map((credential) => ({
    ...credential,
    id: base64url.toBuffer(credential.id),
  }));

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
  return responsePOST.json();
}

async function getCredentials(token) {
  const response = await fetch('/api/credentials/list', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
}

export default function Settings() {
  const [type, setType] = useState(null);
  const [credentials, setCredentials] = useState([]);
  const { token } = useAuth();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      if (token) {
        const response = await getCredentials(token);
        setCredentials(response);
      }
    })();
  }, [token]);

  if (token === AUTH_STATE.UNKNOWN) {
    return null;
  } else if (token === AUTH_STATE.UNAUTHENTICATED) {
    router.push('/');
    return null;
  }

  const setupSecurityKey = async () => {
    try {
      setType('cross-platform');
      const response = await setupAuthenticator('cross-platform', token);
      setCredentials([...credentials, response]);
    } catch (error) {
      console.error(error);
    } finally {
      setType(null);
    }
  };

  const setupBiometricKey = async () => {
    try {
      setType('platform');
      const response = await setupAuthenticator('platform', token);
      setCredentials([...credentials, response]);
    } catch (error) {
      console.error(error);
    } finally {
      setType(null);
    }
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
            loading={type === 'cross-platform'}
            onClick={setupSecurityKey}
          />
        </Col>
        <Col span={24} sm={12}>
          <TFACard
            title="Setup platform authenticator"
            subtitle="E.g.: Apple Touch/Face ID, Android fingerprint, etc."
            loading={type === 'platform'}
            onClick={setupBiometricKey}
          />
        </Col>
      </Row>

      <List
        header={<Title level={5}>Your authenticators</Title>}
        dataSource={credentials}
        bordered
        renderItem={(item) => <List.Item className={listItemClass}>{item.id}</List.Item>}
      />
    </main>
  );
}

const listItemClass = css`
  word-break: break-all;
`;
