import React, { useEffect, useState } from "react";
import { useGenres } from "../../contexts/GenreContext";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { useParams, Link } from "react-router-dom";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

const EditGenre = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const [error, setError] = useState(null);
  const { editGenre, showGenre } = useGenres();
  const { id } = useParams();
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    const fetchGenre = async () => {
      try {
        const genre = await showGenre(id);
        setFormData({
          name: genre.name,
          description: genre.description,
        });
        console.log(genre);
      } catch (error) {
        console.error("Could not fetch genre!", error);
        setError("Could not fetch genre data.");
      }
    };
    console.log([id])
    fetchGenre();
  }, [id]); // Ensure dependencies are correct

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await editGenre(id, formData);
      setError(null);
      setSuccess("Genre updated successfully!");
    } catch (error) {
      console.error("Could not update genre!", error);
      const errorMessage =
        error.response?.data?.message || "An unexpected error occurred!";
      setError(errorMessage);
      setSuccess(null);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-sm rounded-lg py-8  font-public-sans dark:bg-[#22242B]">
      <div className=" border-b  dark:border-b-neutral-500 p-3 py-2 flex-shrink w-full ">
                <h2 className="text-2xl font-bold labelStyle animate-bounce duration-100">Edit Review</h2>
            </div>
      <form onSubmit={handleSubmit} className="flex flex-col p-8">
        <div className="flex flex-col mb-4">
          <label htmlFor="name" className="block mb-2 labelStyle">
            Name
          </label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border inputStyle rounded p-2 focus:outline-none focus:ring-0 focus:border-yellow-500"
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="description" className="block mb-2 labelStyle">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            className="border inputStyle rounded p-2 focus:outline-none focus:ring-0 focus:border-yellow-500"
          />
        </div>
        {error && <span className="text-red-500 mb-4">{error}</span>}
        {success && <span className="text-green-500 mb-4">{success}</span>}
        <div className="flex items-center gap-14 justify-center mx-16">
          <button
            type="submit"
            className="flex w-28 my-4 items-center justify-center gap-1 text-white bg-yellow-500 hover:bg-white hover:text-yellow-600 hover:border-yellow-600 border rounded-md p-2 px-4"
          >
            <EditOutlinedIcon fontSize="small" />
            Edit
          </button>
          <Link
            to="/admin/genres"
            className="w-24 m-6 rounded-md border p-2 border-red-500 text-red-500 text-base flex items-center justify-center hover:bg-red-50 hover:text-red-700"
          >
            <CancelOutlinedIcon fontSize="small" />
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};

export default EditGenre;
