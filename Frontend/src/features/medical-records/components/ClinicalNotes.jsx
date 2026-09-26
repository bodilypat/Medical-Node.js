/* **************************************************************** */
/* File: #src/features/medical-records/components/ClinicalNotes.jsx */ 
/* **************************************************************** */

import { useState } from "react";

import Button from "../../../components/ui/Button";

const ClinicalNotes = ({
  notes = [],
  onAdd,
  loading = false,
}) => {
  const [content, setContent] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const value = content.trim();

    if (!value) {
      return;
    }

    await onAdd?.({
      content: value,
    });

    setContent("");
  };

  return (
    <section className="clinical-notes">
      <header>
        <h3>Clinical Notes</h3>
      </header>

      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(event) =>
            setContent(event.target.value)
          }
          placeholder="Add clinical note..."
          rows={5}
        />

        <Button
          type="submit"
          disabled={loading || !content.trim()}
        >
          {loading ? "Adding..." : "Add Note"}
        </Button>
      </form>

      <div className="clinical-notes__list">
        {notes.map((note) => (
          <article
            key={note.id}
            className="clinical-note"
          >
            <p>{note.content}</p>

            <small>
              {note.createdAt || ""}
            </small>
          </article>
        ))}
      </div>
    </section>
  );
};

export default ClinicalNotes;
