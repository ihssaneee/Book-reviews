import React, { useState } from "react";
import { useGenres } from "../../contexts/GenreContext";
import AddIcon from "@mui/icons-material/Add";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { Link } from "react-router-dom";

const AddGenreForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
    });
    const [error, setError] = useState(null);
    const { addGenre } = useGenres();
    const [success, setSuccess] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validateForm = () => {
        if (!formData.name.trim() || !formData.description.trim()) {
            setError("All fields are required!");
            return false;
        }
        setError(null);
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }
        try {
            await addGenre(formData);
            setFormData({
                name: "",
                description: "",
            });
            setError(null);
            setSuccess("Genre added successfully!");
        } catch (error) {
            console.error("Could not add genre!", error);
            const errorMessage =
                error.response?.data?.message ||
                "An unexpected error occurred!";
            setError(errorMessage);
            setSuccess(null);
        }
    };

    return (
        <div className="max-w-md  mx-auto bg-white shadow-sm rounded-lg py-8 font-public-sans dark:bg-[#22242B]">
             <div className=" border-b dark:border-b-neutral-500 p-3 flex-shrink w-full">
                <h2 className="text-2xl font-bold labelStyle">Add New Genre</h2>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col p-8 p">
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
                        className="border rounded inputStyle p-2 focus:outline-none focus:ring-0 focus:border-yellow-500"
                        required
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
                        placeholder="Genre Description"
                        className="border inputStyle rounded p-2 focus:outline-none focus:ring-0 focus:border-yellow-500"
                        required
                    />
                </div>
                {error && <span className="text-red-500 mb-4">{error}</span>}
                {success && (
                    <span className="text-green-500 mb-4">{success}</span>
                )}
                <div className="flex items-center  gap-10 justify-center ">
                    <button
                        type="submit"
                      className="w-24 m-6  text-base p-2 rounded-md bg-yellow-300 flex items-center justify-center gap-2 hover:bg-yellow-400"
                    >
                        <AddIcon fontSize="small" />
                        Add
                    </button>
                    <Link
                        to="/admin/genres"
                        className="w-24 m-6 rounded-md border p-2 border-red-500 text-red-500 text-base flex items-center justify-center hover:bg-red-50 hover:text-red-400"
                    >
                        <CancelOutlinedIcon fontSize="small" />
                        Cancel
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default AddGenreForm;
