/** @format */

import React from "react";
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { ArrowLeftIcon } from "lucide-react";
import toast from "react-hot-toast";
import api from "../lib/axios";
const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast.error("Please fill in all fields");
      return;
    }
    // Call API to create a new note
    setLoading(true);
    try {
      await api.post("/notes", {
        title,
        content,
      });
      toast.success("Note created successfully");
      navigate("/");
    } catch (error) {
      console.log("Error creating note", error);
      toast.error("Failed to create note! please try again later");
    }
  };
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-lg mx-auto">
          <Link to="/" className="btn btn-ghost mb-6">
            <ArrowLeftIcon className="size-5" />
            Back to NoteBoard
          </Link>
          <div className="card bg-base-100">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Create new note</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-control mb-4">
                  <label htmlFor="" className="label">
                    <span className="label-text">Title</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Note title"
                    className="input input-bordered"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="form-control mb-4">
                  <label htmlFor="" className="label">
                    <span className="label-text">Content</span>
                  </label>
                  <textarea
                    type="text"
                    placeholder="Note content"
                    className="input input-bordered h-32"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>
                <div className="card-actions justify-end">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}>
                    {loading ? "Creating..." : "Create note"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
