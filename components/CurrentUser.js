import { Avatar, Button, Dropdown, Menu } from 'antd';
import style from './CurrentUser.module.css';

export default function CurrentUser({ user }) {
  const menu = (
    <Menu>
      <Menu.Item key="settings">Settings</Menu.Item>
      <Menu.Item key="logout">Logout</Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger="click">
      <Button size="large" type="text" className={style.button}>
        <Avatar size={28} src={user.avatar} />
        <span>{user.name}</span>
      </Button>
    </Dropdown>
  );
}
