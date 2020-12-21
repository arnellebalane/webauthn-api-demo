import { useState } from 'react';
import Link from 'next/link';
import { Avatar, Button, Drawer, Menu } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { css } from '@emotion/css';
import { useAuth } from '@/contexts/AuthContext';

export default function CurrentUserDrawer({ user }) {
  const { signOut } = useAuth();
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Button type="text" icon={<MenuOutlined />} onClick={() => setVisible(true)} />

      <Drawer placement="left" visible={visible} closable={false} onClose={() => setVisible(false)}>
        <div className={currentUserClass}>
          <Avatar size={28} src={user.image_url} className={avatarClass} />
          <span>{user.name}</span>
        </div>

        <Menu className={menuClass}>
          <Menu.Item key="settings">
            <Link href="/settings">Settings</Link>
          </Menu.Item>
          <Menu.Item key="logout" onClick={signOut}>
            Logout
          </Menu.Item>
        </Menu>
      </Drawer>
    </>
  );
}

const currentUserClass = css`
  display: flex;
  align-items: center;
  padding-top: 0;
  padding-bottom: 0;
`;

const avatarClass = css`
  margin-right: 12px;
`;

const menuClass = css`
  border-right: none;
  margin: 24px -24px;

  .ant-menu-item {
    padding-left: 24px;
    padding-right: 24px;

    &:hover,
    &:focus-within {
      background-color: #fafafa;
    }
  }
`;
