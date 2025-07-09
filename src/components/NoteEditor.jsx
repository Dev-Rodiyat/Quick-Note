import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const NoteEditor = ({ isOpen, onClose, onSave, existingNote }) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [tags, setTags] = useState("");

    const [initialData, setInitialData] = useState({ title: "", content: "", tags: "" });

    useEffect(() => {
    if (isOpen) {
        if (existingNote) {
            const initialTags = existingNote.tags?.join(", ") || "";
            setTitle(existingNote.title);
            setContent(existingNote.content);
            setTags(initialTags);
            setInitialData({
                title: existingNote.title,
                content: existingNote.content,
                tags: initialTags,
            });
        } else {
            setTitle("");
            setContent("");
            setTags("");
            setInitialData({ title: "", content: "", tags: "" });
        }
    }
}, [isOpen, existingNote]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title.trim() === "" && content.trim() === "") return;

        const newNote = {
            id: existingNote?.id || Date.now(),
            title,
            content,
            tags: tags.split(",").map((tag) => tag.trim()).filter(Boolean),
            timestamp: Date.now(),
        };

        onSave(newNote);
        onClose();
        toast.success(`Note ${existingNote ? "updated" : "created"} successfully!`);
    };

    const isUnchanged =
        title === initialData.title &&
        content === initialData.content &&
        tags === initialData.tags;

    const isCreateDisabled = title.trim() === "" && content.trim() === "";
    const isEditDisabled = existingNote && isUnchanged;

    const isSaveDisabled = existingNote ? isEditDisabled : isCreateDisabled;

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/30 dark:bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-zinc-900 rounded-lg p-6 w-full max-w-md shadow-lg">
                <h2 className="text-lg font-semibold mb-4 text-zinc-800 dark:text-white">
                    {existingNote ? "Edit Note" : "New Note"}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Title"
                        className="w-full p-2 rounded bg-gray-100 dark:bg-zinc-800 text-zinc-800 dark:text-white outline-none"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <input
                        type="text"
                        placeholder="Tags (comma separated)"
                        className="w-full p-2 rounded bg-gray-100 dark:bg-zinc-800 text-zinc-800 dark:text-white outline-none"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                    />

                    <textarea
                        rows={6}
                        placeholder="Write your note..."
                        className="w-full p-2 rounded bg-gray-100 dark:bg-zinc-800 text-zinc-800 dark:text-white outline-none"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />

                    <div className="flex justify-end gap-2 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-1 rounded bg-gray-200 dark:bg-zinc-700 text-sm"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSaveDisabled}
                            className={`px-4 py-1 rounded text-white text-sm transition ${
                                isSaveDisabled
                                    ? "bg-orange-300 cursor-not-allowed"
                                    : "bg-orange-500 hover:bg-orange-600"
                            }`}
                        >
                            {existingNote ? "Update" : "Save"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NoteEditor;