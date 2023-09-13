import React from "react";
import { UserOutlined, HomeOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import type { MenuProps } from "antd/es/menu";
import "../styles/sidebar.css";
import "../logo.svg";
import { useNavigate } from "react-router-dom";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("User Management", "1", <UserOutlined />),
  getItem("Home", "2", <HomeOutlined />),
];

const SideBar = () => {
  const navigate = useNavigate();
  const handleClick = (e: any) => {
    switch (e.key) {
      case "1":
        navigate("/");
        break;
      case "2":
        navigate("/home");

        break;
      default:
        break;
    }
    console.debug(e);
  };

  return (
    <Menu
      defaultSelectedKeys={["1"]}
      defaultOpenKeys={["sub1"]}
      mode="inline"
      theme="dark"
      items={items}
      className="sidebar"
      onClick={handleClick}
    />
  );
};

export default SideBar;
