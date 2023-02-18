import { Server } from "socket.io";
import { noteModel } from "../models/notes.model.js";

export const socket = (server) => {
  const io = new Server(server);

  io.on("connection", (socket) => {
    console.log(`usuario conectado: ${socket.id}`);

    const getNotes = async () => {
      const notes = await noteModel.find();
  
      io.emit("server:getNotes", notes);
    };

    getNotes();

    socket.on("client:addNote", async (note) => {
      await noteModel.create(note);
      getNotes();
    });

    socket.on("client:updateNote", async (note) => {
      await noteModel.findByIdAndUpdate({_id: note._id }, note);
      getNotes();
    });
    socket.on("client:deleteNote", async (id) => {
      await noteModel.findByIdAndDelete(id);
      getNotes();
    });

    socket.on("client:getNote", async (id) => {
      const note = await noteModel.findById(id);
      io.emit("server:getNote", note);
    });

    socket.on("disconnect", () => {
      console.log(`usuario desconectado ${socket.id}`);
    });
  });
};
