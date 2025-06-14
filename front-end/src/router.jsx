import { createBrowserRouter} from 'react-router-dom';
import Login from './components/login';
import NotFound from './components/notFound';
import Signup from './components/signup';
import App from './App';
import AdminLayout from './admin/AdminLayout';
import ProtectedRoute from './components/ProtectedRoute';
import Genres from './components/Genres/GenresList';
import Users from './components/Users/UsersList';
import Books from './components/Books/BooksList';
import AddGenreForm from './components/Genres/AddGenreForm';
import EditGenre from './components/Genres/EditGenreForm';
import AddUserForm from './components/Users/AddUserForm';
import EditUser from './components/Users/EditUserForm';
import AddBookForm from './components/Books/AddBookForm';
import EditBookForm from './components/Books/EditBookForm';
import UserProfile from './components/Users/user_profile';
import Reviews from './components/reviews/ReviewsList';
import AddReviewForm from './components/reviews/AddReview';
import Dashboard from './components/charts/Dashboard';
import Settings from './components/settings/settings';

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
        element:<Login />
    },
    {
        path:'/admin',
        element:(
        <ProtectedRoute>
            <AdminLayout/>
        </ProtectedRoute>
        ),
        children:[
            {
                path:'dashboard',
                element:<Dashboard/>
            },
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
                path:"users/edit/:id",
                element:<EditUser />,
            },
            {
                path:"user/profile",
                element:<UserProfile />,
            },
            {
                path:'books',
                element:<Books />
            },
            {
                path:'books/add',
                element:<AddBookForm />,
            },
            {
                path:'books/edit/:id',
                element:<EditBookForm />,
            },
            //reviews
            {
                path:'reviews',
                element:<Reviews />,
            },
            {
                path:"reviews/add",
                element:<AddReviewForm />,
            },
            //authenticated user settings
            {
                path:"settings",
                element:<Settings />,
            },
           
        ]
    },
  
    
   
    
    

])
export default router;