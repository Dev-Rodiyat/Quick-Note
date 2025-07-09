import { toast } from "react-toastify";
import NoteForm from "./NoteForm";

const EditNoteModal = ({ isOpen, onClose, onSave, note }) => {
    if (!isOpen || !note) return null;

    const handleUpdate = (updatedNote) => {
        onSave(updatedNote);
        toast.success("Note updated successfully!");
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/30 dark:bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-zinc-900 rounded-lg p-6 w-full max-w-md shadow-lg">
                <h2 className="text-lg font-semibold mb-4 text-zinc-800 dark:text-white">Edit Note</h2>
                <NoteForm
                    onSubmit={handleUpdate}
                    onClose={onClose}
                    initialData={{
                        title: note.title,
                        content: note.content,
                        tags: note.tags?.join(", ") || "",
                        id: note.id,
                    }}
                    mode="edit"
                />
            </div>
        </div>
    );
};

export default EditNoteModal;