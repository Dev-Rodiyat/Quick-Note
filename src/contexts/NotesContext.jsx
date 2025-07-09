import { createContext, useContext, useState } from "react";

const NotesContext = createContext();

export const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);

  const addNote = (note) => setNotes([note, ...notes]);
  const updateNote = (id, updated) => {
    setNotes(notes.map(n => (n.id === id ? { ...n, ...updated } : n)));
  };
  const deleteNote = (id) => setNotes(notes.filter(n => n.id !== id));

  return (
    <NotesContext.Provider value={{ notes, addNote, updateNote, deleteNote }}>
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = () => useContext(NotesContext);
