import { useState, useEffect } from "react";

const NoteForm = ({ onSubmit, onClose, initialData = {}, mode = "create" }) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [tags, setTags] = useState("");

    useEffect(() => {
        setTitle(initialData.title || "");
        setContent(initialData.content || "");
        setTags(initialData.tags || "");
    }, [initialData]);

    const isDisabled =
        mode === "create"
            ? title.trim() === "" && content.trim() === ""
            : title === initialData.title &&
            content === initialData.content &&
            tags === initialData.tags;

    const handleSubmit = (e) => {
        e.preventDefault();
        const note = {
            ...initialData,
            id: initialData.id || Date.now(),
            title,
            content,
            tags: tags
                .split(",")
                .map((t) => t.trim())
                .filter(Boolean),
            timestamp: Date.now(),
        };
        onSubmit(note);
    };

    return (
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
                    disabled={isDisabled}
                    className={`px-4 py-1 rounded text-sm text-white ${isDisabled
                            ? "bg-orange-300 cursor-not-allowed"
                            : "bg-orange-500 hover:bg-orange-600"
                        }`}
                >
                    {mode === "create" ? "Save" : "Update"}
                </button>
            </div>
        </form>
    );
};

export default NoteForm;