/* eslint-disable react-hooks/exhaustive-deps */
import NoteCard from "../../components/Card/NoteCard";
import Navbar from "../../components/Navbar/navbar";
import { Plus } from "lucide-react";
import AddEditNotes from "./AddEditNotes";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import Toast from "../../components/Toast/Toast";
import EmptyCard from "../../components/EmptyCard/EmptyCard";
import AddNotes from "../../assets/images/add-note.svg";
import NoData from "../../assets/images/no-data.svg";

Modal.setAppElement("#root");

const Home = () => {
  const [openModal, setOpenModal] = useState({
    isShow: false,
    type: "add",
    data: null,
  });

  const [notes, setNotes] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [isSearch, setIsSearch] = useState(false);

  const [showToastMsg, setShowToastMsg] = useState({
    isShow: false,
    message: "",
    type: "",
  });

  const navigate = useNavigate();

  const EditNote = (noteDetails) => {
    setOpenModal({ isShow: true, type: "edit", data: noteDetails });
  };

  const showToastMessage = (message, type) => {
    setShowToastMsg({
      isShow: true,
      message,
      type,
    });
  };

  const handleCloseToast = () => {
    setShowToastMsg({
      isShow: false,
      message: "",
    });
  };

  //get user info
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");

      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  //get all notes
  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get("/get-notes");

      if (response.data && response.data.notes) {
        setNotes(response.data.notes);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //delete note
  const deleteNote = async (data) => {
    const id = data?._id;
    try {
      const response = await axiosInstance.delete("/delete-note/" + id);
      if (response.data && !response.data.error) {
        showToastMessage("Note deleted successfully", "delete");
        getAllNotes();
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

  //search note
  const onSearchNote = async (query) => {
    try {
      const response = await axiosInstance.get("/search-notes?", {
        params: { query },
      });
      if (response.data && response.data.notes) {
        setIsSearch(true);
        setNotes(response.data.notes);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //update pinned
  const updateIsPinned = async (notesData) => {
    const id = notesData?._id;
    try {
      const response = await axiosInstance.put("/update-note-pinned/" + id, {
        isPinned: !notesData.isPinned,
      });
      if (response.data && response.data.note) {
        showToastMessage("Note updated successfully", "edit");
        getAllNotes();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClearSearch = () => {
    setIsSearch(false);
    getAllNotes();
  };

  useEffect(() => {
    getAllNotes();
    getUserInfo();
    return () => {};
  }, []);

  return (
    <>
      <Navbar
        userInfo={userInfo}
        onSearchNote={onSearchNote}
        handleClearSearch={handleClearSearch}
      />
      <div className="container mx-auto">
        {notes.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
            {notes.map((note, index) => (
              <NoteCard
                key={index}
                title={note.title}
                date={note.createdAt}
                content={note.content}
                tags={note.tags}
                isPinned={note.isPinned}
                onEdit={() => {
                  EditNote(note);
                }}
                onDelete={() => {
                  deleteNote(note);
                }}
                onPinNote={() => {
                  updateIsPinned(note);
                }}
              />
            ))}
          </div>
        ) : (
          <EmptyCard
            imgSrc={isSearch ? NoData : AddNotes}
            message={
              isSearch
                ? `Oops! No notes found matching your search.`
                : `Start creating your first notes! Click 'ADD' button to jot down your thoughts, ideas, and reminders. Let's get start`
            }
          />
        )}
      </div>
      <button
        className="w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10"
        onClick={() => {
          setOpenModal({ isShow: true, type: "add", data: null });
        }}
      >
        <Plus className="text-[32px] text-white" />
      </button>
      <Modal
        isOpen={openModal.isShow}
        onSequenceClose={() => {}}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
          },
        }}
        contentLabel=""
        className="w-[80%] lg:w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5"
      >
        <AddEditNotes
          type={openModal.type}
          notesData={openModal.data}
          onClose={() => {
            setOpenModal({ isShow: false, type: "add", data: null });
          }}
          getAllNotes={getAllNotes}
          showToastMessage={showToastMessage}
        />
      </Modal>
      <Toast isShow={showToastMsg.isShow} message={showToastMsg.message} />
      type={showToastMsg.type}
      onClose = {handleCloseToast}
    </>
  );
};
export default Home;
