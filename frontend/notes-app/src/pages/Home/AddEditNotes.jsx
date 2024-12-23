/* eslint-disable react/prop-types */
import { useState } from "react";
import TagInput from "../../components/Input/TagInput";
import { X } from "lucide-react";
import axiosInstance from "../../utils/axiosInstance";

const AddEditNotes = ({
  notesData,
  type,
  onClose,
  getAllNotes,
  showToastMessage,
}) => {
  const [title, setTitle] = useState(notesData?.title || "");
  const [content, setContent] = useState(notesData?.content || "");
  const [tags, setTags] = useState(notesData?.tags || []);
  const [error, setError] = useState(null);

  //add new note
  const addNewNote = async () => {
    try {
      const response = await axiosInstance.post("/add-note", {
        title,
        content,
        tags,
      });
      if (response.data && response.data.note) {
        showToastMessage("Note added successfully", "add");
        getAllNotes();
        onClose();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      }
    }
  };

  //edit note
  const editNote = async () => {
    const id = notesData?._id;
    try {
      const response = await axiosInstance.put("/edit-note/" + id, {
        title,
        content,
        tags,
      });
      if (response.data && response.data.note) {
        showToastMessage("Note updated successfully", "edit");
        getAllNotes();
        onClose();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        console.log("An unexpected error occurred.Please try again later.");
      }
    }
  };

  const handleAddNote = () => {
    if (!title) {
      setError("please enter title");
      return;
    }
    if (!content) {
      setError("please enter content");
      return;
    }

    setError("");

    if (type === "edit") {
      editNote();
    } else {
      addNewNote();
    }
  };
  return (
    <div className="relative">
      <button
        className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-50"
        onClick={onClose}
      >
        <X size={24} className="text-xl text-slate-400" />
      </button>
      <div className="flex flex-col gap-2">
        <label className="input-label">TITLE</label>
        <input
          type="text"
          className="text-2xl text-slate-950 outline-none"
          placeholder="Go To Gym At 5"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div className="flex flex-col gap-2 mt-4">
        <label className="input-label">CONTENT</label>
        <textarea
          type="text"
          className="text-sm text-slate-950 outline-none gb-slate-50 p-3 rounded"
          placeholder="content"
          rows={10}
          value={content}
          onChange={({ target }) => setContent(target.value)}
        />
        <div className="mt-3">
          <label className="input-label">TAGS</label>
          <TagInput tags={tags} setTags={setTags} />
        </div>

        {error && <p className="text-red-500 text-xs pt-4">{error}</p>}

        <button
          className="btn-primary font-medium mt-5"
          onClick={handleAddNote}
        >
          {type === "edit" ? "UPDATE" : "ADD"}
        </button>
      </div>
    </div>
  );
};
export default AddEditNotes;
