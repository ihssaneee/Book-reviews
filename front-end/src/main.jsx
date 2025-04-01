import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import router from "./router.jsx";
import App from "./App.jsx";
import { initializeCsrfProtection } from "./api/axiosConfig.js";
import AuthProvider from "./contexts/AuthContext.jsx";
import { GenresProvider } from "./contexts/GenreContext.jsx";
import { UsersProvider } from "./contexts/UserContext.jsx";
import { BookProvider } from "./contexts/BookContext.jsx";
import { ReviewsProvider } from "./contexts/ReviewContext.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import DarkModeProvider from "./contexts/DarkModeContext.jsx";
initializeCsrfProtection();
const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
           <DarkModeProvider>
            <AuthProvider>
                
                <GenresProvider>
                    <UsersProvider>
                        <BookProvider>
                            <ReviewsProvider>
                                <RouterProvider router={router} />
                            </ReviewsProvider>
                        </BookProvider>
                    </UsersProvider>
                </GenresProvider>
                
            </AuthProvider>
            </DarkModeProvider>
        </QueryClientProvider>
    </StrictMode>
);
