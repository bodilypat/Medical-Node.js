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
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const value = content.trim();

    if (!value) {
      return;
    }

    setError("");

    try {
      await onAdd?.({ content: value });
      setContent("");
    } catch {
      setError("Unable to add the clinical note. Please try again.");
    }
  };

  return (
    <section className="clinical-notes">
      <header>
        <h3>Clinical Notes</h3>
      </header>

      <form onSubmit={handleSubmit} aria-busy={loading}>
        <textarea
          id="clinical-note-content"
          value={content}
          onChange={(event) =>
            setContent(event.target.value)
          }
          aria-label="Clinical note"
          aria-describedby={error ? "clinical-note-error" : undefined}
          placeholder="Add clinical note..."
          rows={5}
          disabled={loading}
        />

        <Button
          type="submit"
          disabled={loading || !content.trim()}
        >
          {loading ? "Adding..." : "Add Note"}
        </Button>

        {error && (
          <p id="clinical-note-error" role="alert">
            {error}
          </p>
        )}
      </form>

      <div className="clinical-notes__list">
        {notes.length ? (
          notes.map((note, index) => (
            <article
              key={note.id ?? `clinical-note-${index}`}
              className="clinical-note"
            >
              <p>{note.content}</p>

              {note.createdAt && (
                <small>
                  {note.createdAt}
                </small>
              )}
            </article>
          ))
        ) : (
          <p className="clinical-notes__empty">No clinical notes yet.</p>
        )}
      </div>
    </section>
  );
};

export default ClinicalNotes;
