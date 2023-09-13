import { DeleteFilled, EditFilled, PlusOutlined } from "@ant-design/icons";
import { Avatar, Space, Table, Button } from "antd";
import type { ColumnsType } from "antd/es/table";
import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import ModalConfirm from "../../components/ModalConfirm";
import "./style.css";
import ModalEdit from "./ModalEdit";

export interface DataType {
  id: string;
  name: string;
  email: string;
  avatar: string;
  createdAt: string;
  username: string;
  role: string;
  password: string;
}

const UserManagement = () => {
  const [data, setData] = useState<DataType[]>([]);
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState("");
  const [selectedUser, setSelectedUser] = useState<DataType>({
    id: "",
    name: "",
    email: "",
    avatar: "",
    createdAt: "",
    username: "",
    role: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const fetchUsers = () => {
    setIsLoading(true);
    axios
      .get("https://650147b6736d26322f5b74e3.mockapi.io/api/v1/users")
      .then((repos) => {
        const allRepos = repos.data;
        setData(allRepos);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = (id: string) => {
    setIsLoading(true);
    axios
      .delete(`https://650147b6736d26322f5b74e3.mockapi.io/api/v1/users/${id}`)
      .then(() => {
        fetchUsers();
        setOpen(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (_, record) => (
        <Space>
          <Avatar size={48} src={record.avatar} /> {_}
        </Space>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <EditFilled
            onClick={() => {
              setOpenEdit("Edit");
              setSelectedUser(record);
            }}
          />
          <DeleteFilled
            onClick={() => {
              setSelectedUser(record);
              setOpen(true);
            }}
          />
        </Space>
      ),
    },
  ];

  return (
    <>
      {" "}
      <div className="user-management">
        <h1>User Management</h1>
        <Button className="add-btn" onClick={() => setOpenEdit("Create")}>
          Add User <PlusOutlined />
        </Button>
        <Table columns={columns} dataSource={data} />
        <ModalConfirm
          isModalOpen={open}
          handleOk={() => handleDelete(selectedUser.id)}
          handleCancel={() => setOpen(false)}
          title="Confirm Delete"
          content={`Do you want to delete user ${selectedUser?.name}`}
        />
      </div>
      <ModalEdit
        isModalOpen={openEdit}
        handleOk={() => setOpenEdit("")}
        handleCancel={() => setOpenEdit("")}
        data={selectedUser}
        fetchUsers={fetchUsers}
      />
      <Loader isLoading={isLoading} />
    </>
  );
};

export default UserManagement;
