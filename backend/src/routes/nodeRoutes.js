/** @format */

import express from "express";
import {
  getAllNotes,
  createNewNote,
  updateNote,
  deleteNote,
} from "../controllers/notesController.js";
const router = express.Router();

router.get("/", getAllNotes);

router.post("/", createNewNote);

router.put("/:id", updateNote);

router.delete("/:id", deleteNote);
export default router;
