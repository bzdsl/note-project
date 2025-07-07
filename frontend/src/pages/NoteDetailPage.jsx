/** @format */

import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { useState } from "react";
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react";
import toast from "react-hot-toast";
import api from "../lib/axios";

const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();

  const { id } = useParams();
  console.log("id param from useParams:", id);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        console.log(`/notes/${id}`);
        setNote(res.data);
      } catch (error) {
        console.log("Error fetching note", error);
        toast.error("Failed to fetch note! please try again later");
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [id]);
  console.log({ note });

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;
    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted successfully");
      navigate("/");
    } catch (error) {
      console.log("Error deleting note", error);
      toast.error("Failed to delete note! please try again later");
    }
  };
  const handleSave = async () => {
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("Please fill in all fields");
      return;
    }
    setSaving(true);

    try {
      await api.put(`/notes/${id}`, note);
      toast.success("Note updated successfully");
    } catch (error) {
      console.log("Error updating note", error);
      toast.error("Failed to update note! please try again later");
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="size-10 animate-spin" />
      </div>
    );
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* BUTTONS BACK AND DELETE */}
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="btn btn-ghost mb-6">
              <ArrowLeftIcon className="h-5 w-5" />
              Back to NoteBoard
            </Link>
            <button
              onClick={handleDelete}
              className="btn btn-error btn-outline">
              <Trash2Icon className="h-5 w-5" /> Delete Note
            </button>
          </div>
          {/* FORM */}
          <div className="card bg-base-200">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Notes details</h2>
              <form action="">
                <div className="form-control mb-4">
                  <label htmlFor="" className="label">
                    <span className="label-text">Title</span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered"
                    value={note.title}
                    onChange={(e) =>
                      setNote({ ...note, title: e.target.value })
                    }
                  />
                </div>
                <div className="form-control mb-4">
                  <label htmlFor="" className="label">
                    <span className="label-text">Content</span>
                  </label>
                  <textarea
                    type="text"
                    className="textarea textarea-bordered h-32"
                    value={note.content}
                    onChange={(e) => setNote(e.target.value)}
                  />
                </div>
              </form>
              {/* BUTTON HANDLE FUNCTION */}
              <div className="card-actions justify-end">
                <button
                  className="btn btn-primary"
                  disabled={saving}
                  onClick={handleSave}>
                  {saving ? "Saving..." : "Save changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailPage;
