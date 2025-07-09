import NoteCard from "./Notecard";

const NotesList = ({ notes, onEdit, onDelete, onTagClick }) => {
    if (notes.length === 0) {
        return (
            <p className="text-center text-gray-500 dark:text-gray-400 mt-10">
                No notes yet. Create one!
            </p>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {notes.map(note => (
                <NoteCard
                    key={note.id}
                    note={note}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onTagClick={onTagClick}
                />
            ))}
        </div>
    );
};

export default NotesList;