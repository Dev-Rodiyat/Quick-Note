import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import ReactMarkdown from 'react-markdown';
import remarkGfm from "remark-gfm";

const CardNote = ({ note, onEdit, onDelete, onTagClick }) => {
    const { title, content, tags, timestamp } = note;
    const [expanded, setExpanded] = useState(false);

    const toggleExpand = () => setExpanded((prev) => !prev);

    const formatOptions = {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    };

    return (
        <div
            className="relative bg-white dark:bg-zinc-900 break-inside-avoid rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow group"
        >
            <div className="absolute top-3 right-3 flex gap-2">
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onEdit(note);
                    }}
                    className="text-zinc-500 dark:text-zinc-300 hover:text-orange-500 dark:hover:text-orange-400 transition"
                    title="Edit"
                >
                    <MdEdit size={18} />
                </button>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete(note.id);
                    }}
                    className="text-red-500 hover:text-red-600 transition"
                    title="Delete"
                >
                    <FaTrash size={16} />
                </button>
            </div>

            <div>
                <h3 className="text-lg font-semibold text-zinc-800 dark:text-white mb-2">
                    {title}
                </h3>

                <div
                    className={`text-sm prose dark:prose-invert prose-p:my-1 text-zinc-700 dark:text-zinc-300 transition-all ${expanded ? "" : "line-clamp-5"
                        }`}
                >
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
                </div>

                {content.length > 300 && (
                    <button
                        onClick={toggleExpand}
                        className="mt-2 text-xs text-orange-500 hover:underline cursor-pointer"
                    >
                        {expanded ? "See less" : "See more"}
                    </button>
                )}

                {tags?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                        {note.tags.map((tag, i) => (
                            <span
                                key={i}
                                onClick={() => onTagClick(tag)}
                                className="text-xs cursor-pointer bg-orange-100 dark:bg-orange-500/10 dark:text-orange-300 text-orange-600 px-2 py-0.5 rounded-full hover:bg-orange-200 dark:hover:bg-orange-500/20 transition"
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>
                )}

                <p className="text-[11px] text-zinc-400 mt-4">
                    {new Date(timestamp).toLocaleString(undefined, formatOptions)}
                </p>
            </div>
        </div>
    );
};

export default CardNote;