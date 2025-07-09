import CardNote from "./CardNote";

const NotesList = ({ notes, onEdit, onDelete, onTagClick }) => {
    if (notes.length === 0) {
        return (
            <p className="text-center text-gray-500 dark:text-gray-400 mt-10">
                No notes yet. Create one!
            </p>
        );
    }

    return (
        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
            {notes.map(note => (
                <CardNote
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