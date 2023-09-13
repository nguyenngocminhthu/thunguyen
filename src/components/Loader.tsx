import "../styles/loader.css";
import { Spin } from "antd";

const Loader = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <div style={{ display: isLoading ? "flex" : "none" }} className="loader">
      <Spin />
    </div>
  );
};

export default Loader;
