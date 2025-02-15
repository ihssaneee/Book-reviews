import { createBrowserRouter} from 'react-router-dom';
import Login from './components/login';
import NotFound from './components/notFound';
import Signup from './components/signup';
import App from './App';

import Dashboard from './admin/dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Genres from './components/Genres/GenresList';
import Users from './components/Users/UsersList';
import Books from './components/Books/BooksList';
import AddGenreForm from './components/Genres/AddGenreForm';
import EditGenre from './components/Genres/EditGenreForm';
import AddUserForm from './components/Users/AddUserForm';


const router=createBrowserRouter([
    {
        path:'/login',
        element:<Login />
    },
    {
        path:'*',
        element:<NotFound />
    },
    {
        path:'/signup',
        element:<Signup />
    },
    {
        path:'/',
        element:<App />
    },
    {
        path:'/dashboard',
        element:(
        <ProtectedRoute>
            <Dashboard/>
        </ProtectedRoute>
        ),
        children:[
            {
                path:'genres',
                element:<Genres />,
            },
            {
                path:'genres/add',
                element:<AddGenreForm />,
            },
            {
                path:`genres/edit/:id`,
                element:<EditGenre />,
            },
            {
                path:'users',
                element:<Users />
            },
            {
                path:"users/add",
                element:<AddUserForm />,
            },

            {
                path:'books',
                element:<Books />
            }
            
        ]
    },
  
    
   
    
    

])
export default router;