import Link from 'next/link';
import { css } from '@emotion/css';
import { Avatar, Button, Dropdown, Menu } from 'antd';
import { useAuth } from '@/contexts/AuthContext';

export default function CurrentUser({ user }) {
  const { signOut } = useAuth();

  const menu = (
    <Menu>
      <Menu.Item key="settings">
        <Link href="/settings">Settings</Link>
      </Menu.Item>
      <Menu.Item key="logout" onClick={signOut}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger="click" className={dropdownClass}>
      <Button size="large" type="text" className={buttonClass}>
        <Avatar size={28} src={user.image_url} />
        <span>{user.name}</span>
      </Button>
    </Dropdown>
  );
}

const dropdownClass = css`
  cursor: pointer;
`;

const buttonClass = css`
  display: flex;
  align-items: center;
  padding-top: 0;
  padding-bottom: 0;
`;
