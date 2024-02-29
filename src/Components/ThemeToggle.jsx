import "../Styles/ThemeToggle.css";
import { IoCloudyNightSharp } from "react-icons/io5";
import { useState } from "react";

const ThemeToggle = () => {
  const [isNightMode, setIsNightMode] = useState(false);
  return (
    <div className="themediv">
      <IoCloudyNightSharp className="darkthemeicon" />
    </div>
  );
};

export default ThemeToggle;
