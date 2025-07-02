/** @format */
import Note from "../models/Notes.js";
import mongoose from "mongoose";

export async function getAllNotes(req, res) {
  try {
    const notes = await Note.find();
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error in getAllNotes controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function createNewNote(req, res) {
  try {
    console.log("Received body:", req.body);

    const { title, content } = req.body;
    const note = new Note({ title, content });

    const savedNote = await note.save();
    res
      .status(201)
      .json({ message: "Note created successfully", note: savedNote });
  } catch (error) {
    console.error("Error in createNewNote controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function updateNote(req, res) {
  try {
    const { id } = req.params;

    // Kiểm tra ID có hợp lệ không
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid note ID" });
    }
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(req.params.id, {
      title,
      content,
    });

    if (!updateNote) return res.status(404).json({ message: "Note not found" });
    res.status(200).json({ message: "Note updated successfully" }, updatedNote);
  } catch (error) {
    console.error("Error in updateNote controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function deleteNote(req, res) {
  try {
    const { id } = req.params;
    const deletedNote = await Note.findByIdAndDelete(id);
    if (!deletedNote)
      return res.status(404).json({ message: "Note not found" });
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error("Error in deleteNote controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
