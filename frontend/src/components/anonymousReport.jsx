import React, { useState } from "react";
import axios from "axios";

export default function AnonymousReport() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Store the file object
  };

  const handleReport = async (e) => {
    e.preventDefault();

    // Create a new FormData object to handle file uploads and form data
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image);

    try {
      // Use axios to send the FormData to the backend
      const response = await axios.post("/api/report", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Set multipart headers
        },
      });
      console.log("Submitted:", response.data);

      // Clear form fields after submission
      setImage(null);
      setDescription("");
      setTitle("");
    } catch (error) {
      console.error("Error submitting report:", error);
    }
  };

  return (
    <div className="flex justify-center items-start flex-col">
      <h1 className="w-full text-left text-2xl font-bold">Anonymous Report</h1>

      <form onSubmit={handleReport} className="w-3/4 text-left">
        <div className="mb-5 mt-10">
          <label
            htmlFor="title"
            className="block mb-2 text-sm text-left font-medium text-gray-900 dark:text-white"
          >
            Coordinates
          </label>
          <input
            type="text"
            id="title"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="description"
            className="block mb-2 text-sm text-left font-medium text-gray-900 dark:text-white"
          >
            Description
          </label>
          <input
            type="text"
            id="description"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            required
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="upload"
            className="block mb-2 text-sm text-left font-medium text-gray-900 dark:text-white"
          >
            Upload
          </label>
          <input
            type="file"
            id="upload"
            onChange={handleImageChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          className="text-white bg-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-left dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
