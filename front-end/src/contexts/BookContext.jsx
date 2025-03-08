import React, { useState, useEffect, createContext, useContext } from "react";
import { useAuth } from "./AuthContext";
import { axiosInstance } from "../api/axiosConfig";

const BookContext = createContext();

export const useBooks = () => {
    return useContext(BookContext);
};

export const BookProvider = ({ children }) => {
    const [books, setBooks] = useState([]);
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);

    const fetchBooks = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get("/books");
            setBooks(response.data.books);
            console.log("Books fetched successfully!");
        } catch (error) {
            console.error("Could not fetch books", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user) {
            fetchBooks();
        }
    }, [user]);

    const addBook = async (newBook) => {
        try {
            const response = await axiosInstance.post("/books", newBook);
            setBooks((prevBooks) => [...prevBooks, response.data.book]);
            console.log("Book added successfully.");
        } catch (error) {
            console.error("Book could not be added.", error);
            throw error;
        }
    };

    const updateBook = async (id, updatedData) => {
        try {
            const response = await axiosInstance.post(
                `/books/${id}?_method=PUT`,
                updatedData
            );
            setBooks((prevBooks) =>
                prevBooks.map((book) =>
                    book.id === id ? response.data.book : book
                )
            );
            console.log("Book updated successfully.");
        } catch (error) {
            console.error("Book could not be updated!", error);
            throw error;
        }
    };

    const deleteBook = async (id) => {
        try {
            await axiosInstance.delete(`/books/${id}`);
            setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
            console.log("Book deleted successfully.");
        } catch (error) {
            console.error("Book could not be deleted", error);
        }
    };
    const showBook = async (id) => {
        try {
            const response = await axiosInstance.get(`/books/${id}`);
            console.log("book fetched successfully.");
            return response.data.book;
        } catch (error) {
            console.error("could not fetch book", error);
            throw error;
        }
    };
    const value = {
        books,
        loading,
        fetchBooks,
        addBook,
        updateBook,
        deleteBook,
        showBook,
    };

    return (
        <BookContext.Provider value={value}>{children}</BookContext.Provider>
    );
};
