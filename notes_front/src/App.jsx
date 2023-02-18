import { useCallback, useEffect, useState } from "react";
import { useSocket } from "./hooks/useSocket";
import { FaTrash, FaPenAlt } from "react-icons/fa";

const initialState = {
  title: "",
  description: "",
};

function App() {
  const { socket } = useSocket("http://localhost:4000");
  const [note, setNote] = useState(initialState);
  const [notes, setNotes] = useState([]);
  const [isEdit, setIsEdit] = useState(false);

  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = useCallback(() => {
    socket.on("server:getNotes", (notes) => {
      setNotes(notes);
    });
  }, []);

  const deleteNote = (id) => {
    socket.emit("client:deleteNote", id);
  };

  const actions = (e) => {
    e.preventDefault();
    isEdit
      ? socket.emit("client:updateNote", note)
      : socket.emit("client:addNote", note);

    clean();
  };

  const edit = (note) => {
    setIsEdit(true);
    setNote(note);
  };

  const clean = () => {
    setIsEdit(false);
    setNote(initialState);
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-4">
          <div className="card">
            <div className="card-title text-center">Notas</div>
            <div className="card-body">
              <form onSubmit={actions}>
                <div className="mb-3">
                  <label className="form-label">Titulo</label>
                  <input
                    type="text"
                    name="title"
                    className="form-control"
                    autoFocus
                    required
                    value={note.title}
                    onChange={(e) => handleChange(e)}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <input
                    type="text"
                    name="description"
                    className="form-control"
                    required
                    value={note.description}
                    onChange={(e) => handleChange(e)}
                  />
                </div>

                <button className="btn btn-primary " type="submit">
                  {isEdit ? "Editar" : "Guardar"}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/*inicio listar notas */}
        <div className="col-8">
          <ol className="list-group list-numered">
            {notes.map((note) => (
              <li
                key={note._id}
                className="list-group-item d-flex justify-content-between align-item-start"
              >
                <div className="ms-2 me-auto">
                  <div className="fw-bold">{note.title}</div>
                  {note.description}
                </div>
                <button
                  className="btn btn-danger me-2"
                  onClick={() => deleteNote(note._id)}
                >
                  <FaTrash />
                </button>

                <button className="btn btn-warning" onClick={() => edit(note)}>
                  <FaPenAlt />
                </button>
              </li>
            ))}
          </ol>
        </div>

        {/*fin listar notas */}
      </div>
    </div>
  );
}

export default App;
