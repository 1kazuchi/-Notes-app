/* eslint-disable react/prop-types */
import { Plus, X } from "lucide-react";
import { useState } from "react";

const TagInput = ({ tags, setTags }) => {
  const [inputValue, setInputValue] = useState("");

  const handlerInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const addNewTag = () => {
    if (inputValue.trim() !== "") {
      setTags([...tags, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addNewTag();
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div>
      {tags?.length > 0 && ( // Fixed typo here
        <div className="flex flex-wrap items-center gap-2 mt-3">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="flex items-center gap-2 text-sm text-slate-900 bg-slate-100 px-3 py-1 rounded"
            >
              # {tag}
              <button onClick={() => removeTag(tag)}>
                <X size={17} />
              </button>
            </span>
          ))}
        </div>
      )}
      <div className="flex items-center gap-4 mt-3">
        <input
          type="text"
          className="text-sm bg-transparent border px-3 py-2 rounded outline-none"
          placeholder="Add tags"
          onChange={handlerInputChange}
          onKeyDown={handleKeyDown}
          value={inputValue}
        />
        <button
          className="w-8 h-8 flex items-center justify-center rounded border border-blue-500 hover:bg-blue-700"
          onClick={addNewTag}
        >
          <Plus className="text-2xl text-blue-700 hover:text-white" />
        </button>
      </div>
    </div>
  );
};

export default TagInput;
