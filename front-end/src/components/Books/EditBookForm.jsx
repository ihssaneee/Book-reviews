import React, { useEffect } from "react";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import AddIcon from "@mui/icons-material/Add";
import { Link, useParams } from "react-router-dom";
import { useBooks } from "../../contexts/BookContext";
import { useGenres } from "../../contexts/GenreContext";

export default function EditBookForm() {
    const [formData, setFormData] = useState({
        author: "",
        title: "",
        description: "",
        image: null,
        link: "",
        genre_id: "",
        year: "",
    });
    const commonLanguages = [
        { code: "en", name: "English" },
        { code: "es", name: "Spanish" },
        { code: "fr", name: "French" },
        { code: "de", name: "German" },
        { code: "zh", name: "Chinese" },
    ];
    const inputStyle =
        "rounded-lg p-2 border-neutral-300  focus:ring-yellow-400 focus:outline-yellow-400 inputStyle";
    const labelStyle="labelStyle";
    const divStyle = "flex flex-col  p-4 w-full gap-1 flex-shrink ";
    const { updateBook,showBook } = useBooks();
    const {id}=useParams();
    const { genres } = useGenres();
    const [currentPicture,setCurrentPicture]=useState(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const onDrop = (acceptedFiles) => {
        setFormData({
            ...formData,
            image: acceptedFiles[0],
        });
    };
    
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': []
        },
        multiple: false,
        noClick: false,
        noKeyboard: false,
        preventDropOnDocument: false  // Try changing this to false
    });
    //file preview
    const filePreview = formData.image ? (
        <div>
            <p className="">Selected Image: </p>
            <img
                alt="Book image"
                src={URL.createObjectURL(formData.image)}
                className="w-24 h-auto mt-2"
            />
        </div>
    ) : null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    useEffect (()=>{
        const fetchBook= async()=>{
            try{
                const book = await showBook(id);
                setFormData({
                    "author":book.author,
                    "description":book.description,
                    "genre_id":book.genre_id,
                    "image":null,
                    "language":book.language,
                    "link":book.link,
                    "title":book.title,
                    "year":book.year,
                });
                setCurrentPicture(book.image);
                console.log(book.image);
                console.log('book fetched successfully.')

            }
            catch(error){
                console.error('book could not be fetched',error)
            }
        } 
        fetchBook();
    },[id])
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formDataToSend = new FormData();
            formDataToSend.append("author", formData.author);
            formDataToSend.append("description", formData.description);
            formDataToSend.append("genre_id", formData.genre_id);
            formDataToSend.append("link", formData.link);
            formDataToSend.append("language",formData.language);
            formDataToSend.append("title", formData.title);
            formDataToSend.append("year", formData.year);
            if (formData.image){
                formDataToSend.append("image", formData.image);
            }
            await updateBook(id,formDataToSend);
            console.log("book updated successfully.");
            
            setSuccess("Book updated successfully.");
            setError(null);
        } catch (error) {
            console.error("book could not be updated.", error);
            const errorMessage =
                error.response?.data?.message ||
                "an unexpected error happened!";
            setError(errorMessage);
            setSuccess(null);
        }
    };

    return (
        <div className="flex flex-col w-full  bg-white border dark:bg-[#22242B]  dark:border-none  lg:max-w-lg m-auto my-5 rounded-md shadow  font-public-sans lg:text-base text-base">
            <div className="border-b p-5 my-4 flex-shrink">
                <h2 className="text-2xl font-medium labelStyle">Edit book </h2>
            </div>
            <form onSubmit={handleSubmit} className="p-4">
                <div className={divStyle}>
                    <label htmlFor="author name" className={labelStyle}>Author</label>
                    <input
                        type="text"
                        name="author"
                        onChange={handleChange}
                        value={formData.author}
                        className={inputStyle}
                    />
                </div>
                <div className={divStyle}>
                    <label htmlFor="description" className={labelStyle}>Description</label>
                    <textarea
                        name="description"
                        rows={4}
                        value={formData.description}
                        onChange={handleChange}
                        className={inputStyle}
                    />
                </div>
                <div className={divStyle}>
                    <label htmlFor="genre_id" className={labelStyle}>Select Genre</label>
                    <select
                        name="genre_id"
                        value={formData.genre_id}
                        onChange={handleChange}
                        className={inputStyle}
                    >
                        <option value="">Select Genre</option>
                        {genres.map((genre) => (
                            <option key={genre.id} value={genre.id}>
                                {genre.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className={divStyle}>
                    <label htmlFor="book title" className={labelStyle}>Title</label>
                    <input
                        type="text"
                        name="title"
                        onChange={handleChange}
                        value={formData.title}
                        className={inputStyle}
                    />
                </div>
                <div className={divStyle}>
                    <label htmlFor="language" className={labelStyle}>Language</label>
                    <select
                        name="language"
                        onChange={handleChange}
                        value={formData.language}
                        className={inputStyle}
                    >
                        <option value="">Select Language</option>
                        {commonLanguages.map((language) => (
                            <option key={language.code} value={language.code}>
                                {language.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className={divStyle}>
                    <label htmlFor="link" className={labelStyle}>Link</label>
                    <input
                        type="text"
                        name="link"
                        onChange={handleChange}
                        value={formData.link}
                        className={inputStyle}
                    />
                </div>
                <div className={divStyle}>
                    <label htmlFor="year" className={labelStyle}>Year</label>
                    <input
                        type="text"
                        name="year"
                        onChange={handleChange}
                        value={formData.year}
                        className={inputStyle}
                    />
                </div>
                {currentPicture &&
                <div className={divStyle} >
                    <h2 className={labelStyle}>Book Image</h2>
                    <img src={currentPicture} 
                    className="w-40 h-auto" />
                </div>
                }
                <div className={divStyle}>
                    <label htmlFor="image" className={labelStyle}>Update Book Image</label>
                    <div
                        {...getRootProps()}
                        className={`border-dashed border-2 p-8 rounded-lg text-center cursor-pointer ${
                        isDragActive ? "border-yellow-400 bg-yellow-50" : ""
                        }`}>
                        <input {...getInputProps()} />
                        <FileUploadOutlinedIcon
                            fontSize="large"
                            className="text-gray-500 bg-neutral-200 mb-4"
                        />
                        <p className={`text sm ${labelStyle}`}>
                            Drag and drop your picture here, or click to select
                            file
                        </p>
                    </div>
                    <aside > {filePreview} </aside>
                </div>
                {error && (
                    <span className="text-red-600 text-base">{error}</span>
                )}
                {success && (
                    <span className="bg-green-500 text-base">{success}</span>
                )}
                <div className="flex items-center justify-center">
                    <button
                        type="submit"
                        className="w-24 m-6  text-base p-2 rounded-md bg-yellow-300 flex items-center justify-center gap-2 hover:bg-yellow-400"
                    >
                        
                        Save
                    </button>
                    <Link
                        to="/admin/books"
                        className="w-24 m-6 rounded-md border p-2 border-red-500 text-red-500 text-base flex items-center justify-center hover:bg-red-50"
                    >
                        Cancel
                    </Link>
                </div>
            </form>
        </div>
    );
}
