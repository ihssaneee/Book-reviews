import React, { useState, useEffect, createContext, useContext } from "react";
import { axiosInstance } from "../api/axiosConfig";
import { useAuth } from "./AuthContext";

const GenresContext = createContext();

export const useGenres = () => {
  return useContext(GenresContext);
};

export const GenresProvider = ({ children }) => {
  const [genres, setGenres] = useState([]);
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  const fetchGenres = async () => {
    console.log('fetching genre...')
    try {
      const response = await axiosInstance.get('/genres');
      setGenres(response.data.genres);
      console.log('Fetched genres:', response.data.genres);
    } catch (error) {
      console.error('Could not fetch genres', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchGenres();
    }
  }, [user]);

  const addGenre = async (newGenre) => {
    try {
      const response = await axiosInstance.post('/genres', newGenre);
      setGenres((prevGenres) => [...prevGenres, response.data.genre]);
      console.log('Genre added successfully!');
    } catch (error) {
      console.error('Error adding genre', error);
      throw error; // Rethrow to let the form handle it
    }
  };

  const deleteGenre = async (genreId) => {
    try {
      await axiosInstance.delete(`/genres/${genreId}`);
      setGenres((prevGenres) => prevGenres.filter((genre) => genre.id !== genreId));
      console.log('Genre deleted successfully');
    } catch (error) {
      console.error("Error deleting genre", error);
      throw error; // Rethrow to let the caller handle it
    }
  };

  const editGenre = async (genreId, updatedData) => {
    try {
      const response = await axiosInstance.put(`/genres/${genreId}`, updatedData);
      setGenres((prevGenres) => prevGenres.map((genre) => genre.id === genreId ? response.data.genre : genre));
      console.log('Genre updated successfully!');
      fetchGenres();
    } catch (error) {
      console.error('Error updating genre.', error);
      throw error; // Rethrow to let the caller handle it
    }
  };
  const showGenre=async(genreId)=>{
    try {
      const response= await axiosInstance.get(`/genres/${genreId}`);
      console.log('genre fetched correctly');
      return response.data.genre;

    }
    catch(error){
      console.error('could not fetch genre',error);
      throw error;
    }
  }

  const value = {
    genres,
    loading,
    fetchGenres,
    addGenre,
    deleteGenre,
    editGenre,
    showGenre,
  };

  return (
    <GenresContext.Provider value={value}>
      {children}
    </GenresContext.Provider>
  );
};

// Option 1: Default Export Directly
export default GenresProvider;

// // Option 2: Named Export (Uncomment if using named exports)
// export { GenresProvider };
