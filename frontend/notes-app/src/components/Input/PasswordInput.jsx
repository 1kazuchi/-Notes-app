/* eslint-disable react/prop-types */
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const PasswordInput = ({ value, onChange, placeholder }) => {
  const [showPassword, setShowPassword] = useState(false); 

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex items-center bg-transparent border-[1.5px] px-5 rounded mb-3">
      <input
        value={value}
        onChange={onChange}
        type={showPassword ? "text" : "password"}
        placeholder={placeholder || "Password"}
        className="w-full bg-transparent text-sm py-3 mr-3 outline-none"
      />
      {showPassword ? (
        <Eye
          size={22}
          className="text-primary cursor-pointer"
          onClick={toggleShowPassword} // Corrected here
        />
      ) : (
        <EyeOff
          size={22}
          className="text-slate-400 cursor-pointer"
          onClick={toggleShowPassword} // Corrected here
        />
      )}
    </div>
  );
};

export default PasswordInput;
