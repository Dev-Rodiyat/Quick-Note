import { toast } from "react-toastify";
import NoteForm from "./NoteForm";

const CreateNoteModal = ({ isOpen, onClose, onSave }) => {
    if (!isOpen) return null;

    const handleSave = (note) => {
        onSave(note);
        toast.success("Note created successfully!");
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/30 dark:bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-zinc-900 rounded-lg p-6 w-full max-w-md shadow-lg">
                <h2 className="text-lg font-semibold mb-4 text-zinc-800 dark:text-white">New Note</h2>
                <NoteForm onSubmit={handleSave} onClose={onClose} mode="create" />
            </div>
        </div>
    );
};

export default CreateNoteModal;