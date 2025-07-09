import { useEffect, useState } from "react";
import Header from "./components/Header";
import NoteEditor from "./components/NoteEditor";
import NotesList from "./components/NoteList";
import Footer from "./components/Footer";
import { toast } from "react-toastify";

const LOCAL_KEY = "notes-app-data";

function App() {
  const [notes, setNotes] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_KEY);
    if (saved) {
      setNotes(JSON.parse(saved));
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      console.log("Saving notes to localStorage:", notes);
      localStorage.setItem(LOCAL_KEY, JSON.stringify(notes));
    }
  }, [notes, isLoaded]);

  const handleSaveNote = (newNote) => {
    setNotes((prev) => {
      const exists = prev.find((n) => n.id === newNote.id);
      if (exists) {
        return prev.map((n) => (n.id === newNote.id ? newNote : n));
      } else {
        const noteWithMeta = {
          ...newNote,
          id: Date.now(),
          timestamp: new Date().toISOString(),
        };
        return [noteWithMeta, ...prev];
      }
    });
  };

  const filteredNotes = notes.filter((note) => {
    const q = searchQuery.toLowerCase();
    return (
      note.title.toLowerCase().includes(q) ||
      note.content.toLowerCase().includes(q) ||
      note.tags?.some((tag) => tag.toLowerCase().includes(q))
    );
  });

  const handleDeleteNote = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this note?");
    if (!confirmDelete) return;

    try {
      setNotes((prev) => prev.filter((note) => note.id !== id));
      toast.success("Note deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete note.");
    }
  };

  const handleEdit = (note) => {
    setEditingNote(note);
    setIsEditorOpen(true);
  };

  const handleCreate = () => {
    setEditingNote(null);
    setIsEditorOpen(true);
  };

  return (
    <>
      <div className="flex flex-col min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 pt-24 transition-colors duration-300">
        <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        <main className="flex-grow p-4">
          <button
            onClick={handleCreate}
            className="mb-4 px-4 py-2 rounded bg-orange-500 text-white hover:bg-orange-600 transition"
          >
            + New Note
          </button>

          <NotesList
            notes={filteredNotes}
            onEdit={handleEdit}
            onDelete={handleDeleteNote}
            onTagClick={setSearchQuery}
          />
        </main>

        <Footer />
      </div>

      <NoteEditor
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        onSave={handleSaveNote}
        existingNote={editingNote}
        onTagClick={setSearchQuery}
      />
    </>
  );
}

export default App;