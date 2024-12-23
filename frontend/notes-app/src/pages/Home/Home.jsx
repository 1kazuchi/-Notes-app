import NoteCard from "../../components/Card/NoteCard";
import Navbar from "../../components/Navbar/navbar";
import { Plus } from "lucide-react";
import AddEditNotes from "./AddEditNotes";
import { useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

const Home = () => {
  const [openModal, setOpenModal] = useState({
    isShow: false,
    type: "add",
    data: null,
  });

  return (
    <>
      <Navbar />

      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          <NoteCard
            title="Hi"
            date="3 may 1996"
            content="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"
            tags="#test"
            isPinned={true}
            onEdit={() => {}}
            onDelete={() => {}}
            onPinNote={() => {}}
          />
        </div>
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
        />
      </Modal>
    </>
  );
};
export default Home;
