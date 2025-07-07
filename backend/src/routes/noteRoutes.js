/** @format */

import express from "express";
import {
  getAllNotes,
  createNewNote,
  updateNote,
  deleteNote,
  getNote,
} from "../controllers/notesController.js";
const router = express.Router();

router.get("/", getAllNotes);

router.post("/", createNewNote);

router.put("/:id", updateNote);
router.get("/:id", getNote);
router.delete("/:id", deleteNote);
export default router;
