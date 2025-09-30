"use client";
import React, { useState } from "react";

const CollectionComponent = ({ cl, addToCollection, deleteCollection }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this collection?"))
      return;
    try {
      setIsDeleting(true);
      await deleteCollection(cl._id);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleAdd = async () => {
    try {
      setIsAdding(true);
      await addToCollection(cl._id);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
      <span>{cl.title}</span>

      <div className="flex gap-2">
        <button
          onClick={handleAdd}
          disabled={isAdding}
          className="px-3 py-1 text-sm bg-amber-600 hover:bg-amber-700 rounded disabled:opacity-50 hover:cursor-pointer"
        >
          {isAdding ? "Adding..." : "Add"}
        </button>
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="px-3 py-1 text-sm bg-red-600 hover:bg-red-700 rounded disabled:opacity-50 hover:cursor-pointer"
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  );
};

export default CollectionComponent;
