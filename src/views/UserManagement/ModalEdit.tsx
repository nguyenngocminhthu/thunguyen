import { Button, Form, Input, Select, Modal, message } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { DataType } from ".";
import Loader from "../../components/Loader";

const ModalEdit = ({
  isModalOpen,
  handleOk,
  handleCancel,
  data,
  fetchUsers,
}: {
  isModalOpen: string;
  handleOk: () => void;
  handleCancel: () => void;
  data: DataType;
  fetchUsers: () => void;
}) => {
  const [roles, setRoles] = useState<{ id: string; role: string }[]>([]);
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("https://650147b6736d26322f5b74e3.mockapi.io/api/v1/roles")
      .then((rs) => {
        setRoles(rs.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
    if (isModalOpen === "Edit") {
      form.setFieldsValue(data);
    }
  }, [data]);

  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };

  /* eslint-disable no-template-curly-in-string */
  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
      number: "${label} is not a valid number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };

  const onFinish = (values: any) => {
    if (isModalOpen === "Edit") {
      axios
        .put(
          `https://650147b6736d26322f5b74e3.mockapi.io/api/v1/users/${data.id}`,
          { ...values }
        )
        .then(() => {
          fetchUsers();
        })
        .finally(() => {
          setIsLoading(false);
          messageApi.open({
            type: "success",
            content: "Update user successfully!",
          });
        })
        .catch((err) => {
          messageApi.open({
            type: "error",
            content: err.message,
          });
        });
    } else {
      axios
        .post("https://650147b6736d26322f5b74e3.mockapi.io/api/v1/users", {
          ...values,
        })
        .then(() => {
          fetchUsers();
        })
        .finally(() => {
          setIsLoading(false);
          messageApi.open({
            type: "success",
            content: "Create user successfully!",
          });
        })
        .catch((err) => {
          messageApi.open({
            type: "error",
            content: err.message,
          });
        });
    }
    form.resetFields();

    handleOk();
  };
  return (
    <Modal
      footer={null}
      title={isModalOpen === "Create" ? "Create User" : "Edit User"}
      open={isModalOpen !== ""}
      onCancel={() => {
        handleCancel();
        form.resetFields();
      }}
      closeIcon
    >
      {contextHolder}
      <Form
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        style={{ maxWidth: 600 }}
        validateMessages={validateMessages}
        form={form}
      >
        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[{ type: "email", required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="username"
          label="Username"
          rules={[{ type: "string", required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item name="role" label="Role" rules={[{ required: true }]}>
          <Select>
            {roles.map((role) => (
              <Select.Option value={role.role}>{role.role}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 20 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      <Loader isLoading={isLoading} />
    </Modal>
  );
};

export default ModalEdit;
