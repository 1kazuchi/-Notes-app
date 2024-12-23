/* eslint-disable react/prop-types */
import { Check, Trash2 } from "lucide-react";
import { useEffect } from "react";

const Toast = ({ isShow, message, type, onClose }) => {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onClose();
    }, 3000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [onClose]);

  return (
    <div
      className={`fixed top-20 right-6 transition-opacity duration-400 ${
        isShow ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`min-w-52 bg-white shadow-2xl rounded-md relative after:w-[5px] after:h-full ${
          type === "delete" ? "after:bg-red-500" : "after:bg-green-500"
        } after:absolute after:left-0 after:top-0 after:rounded-l-lg`}
      >
        <div className="flex items-center gap-3 py-2 px-4">
          <div
            className={`w-10 h-10 flex items-center justify-center rounded-full ${
              type === "delete" ? "bg-red-50" : "bg-green-50"
            }`}
          >
            {type === "delete" ? (
              <Trash2 className="text-xl text-red-500" />
            ) : (
              <Check className="text-xl text-green-500" />
            )}
          </div>
          <p className="text-sm text-slate-800">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default Toast;
