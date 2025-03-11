# Details

Date : 2025-03-11 14:01:30

Directory c:\\xampp\\htdocs\\book-review

Total : 112 files,  22861 codes, 1262 comments, 840 blanks, all 24963 lines

[Summary](results.md) / Details / [Diff Summary](diff.md) / [Diff Details](diff-details.md)

## Files
| filename | language | code | comment | blank | total |
| :--- | :--- | ---: | ---: | ---: | ---: |
| [README.md](/README.md) | Markdown | 47 | 0 | 22 | 69 |
| [app/Http/Controllers/BookController.php](/app/Http/Controllers/BookController.php) | PHP | 103 | 23 | 15 | 141 |
| [app/Http/Controllers/Controller.php](/app/Http/Controllers/Controller.php) | PHP | 5 | 1 | 3 | 9 |
| [app/Http/Controllers/GenreController.php](/app/Http/Controllers/GenreController.php) | PHP | 84 | 20 | 21 | 125 |
| [app/Http/Controllers/ReviewController.php](/app/Http/Controllers/ReviewController.php) | PHP | 28 | 28 | 10 | 66 |
| [app/Http/Controllers/UserController.php](/app/Http/Controllers/UserController.php) | PHP | 110 | 1 | 17 | 128 |
| [app/Http/Controllers/authController.php](/app/Http/Controllers/authController.php) | PHP | 60 | 13 | 15 | 88 |
| [app/Http/Middleware/Admin.php](/app/Http/Middleware/Admin.php) | PHP | 19 | 5 | 5 | 29 |
| [app/Models/Book.php](/app/Models/Book.php) | PHP | 17 | 1 | 5 | 23 |
| [app/Models/Genre.php](/app/Models/Genre.php) | PHP | 12 | 1 | 4 | 17 |
| [app/Models/Review.php](/app/Models/Review.php) | PHP | 15 | 1 | 4 | 20 |
| [app/Models/User.php](/app/Models/User.php) | PHP | 41 | 19 | 7 | 67 |
| [app/Providers/AppServiceProvider.php](/app/Providers/AppServiceProvider.php) | PHP | 12 | 8 | 5 | 25 |
| [app/Providers/TelescopeServiceProvider.php](/app/Providers/TelescopeServiceProvider.php) | PHP | 41 | 13 | 11 | 65 |
| [bootstrap/app.php](/bootstrap/app.php) | PHP | 20 | 2 | 4 | 26 |
| [bootstrap/providers.php](/bootstrap/providers.php) | PHP | 5 | 0 | 2 | 7 |
| [composer.json](/composer.json) | JSON | 73 | 0 | 1 | 74 |
| [composer.lock](/composer.lock) | JSON | 8,915 | 0 | 1 | 8,916 |
| [config/app.php](/config/app.php) | PHP | 22 | 82 | 23 | 127 |
| [config/auth.php](/config/auth.php) | PHP | 28 | 74 | 14 | 116 |
| [config/cache.php](/config/cache.php) | PHP | 57 | 34 | 18 | 109 |
| [config/cors.php](/config/cors.php) | PHP | 16 | 12 | 12 | 40 |
| [config/database.php](/config/database.php) | PHP | 108 | 43 | 23 | 174 |
| [config/filesystems.php](/config/filesystems.php) | PHP | 33 | 32 | 13 | 78 |
| [config/logging.php](/config/logging.php) | PHP | 79 | 33 | 21 | 133 |
| [config/mail.php](/config/mail.php) | PHP | 55 | 43 | 19 | 117 |
| [config/queue.php](/config/queue.php) | PHP | 52 | 44 | 17 | 113 |
| [config/sanctum.php](/config/sanctum.php) | PHP | 13 | 53 | 14 | 80 |
| [config/services.php](/config/services.php) | PHP | 20 | 11 | 8 | 39 |
| [config/session.php](/config/session.php) | PHP | 23 | 160 | 35 | 218 |
| [config/telescope.php](/config/telescope.php) | PHP | 87 | 82 | 38 | 207 |
| [database/factories/UserFactory.php](/database/factories/UserFactory.php) | PHP | 25 | 14 | 6 | 45 |
| [database/migrations/0001\_01\_01\_000000\_create\_users\_table.php](/database/migrations/0001_01_01_000000_create_users_table.php) | PHP | 38 | 6 | 6 | 50 |
| [database/migrations/0001\_01\_01\_000001\_create\_cache\_table.php](/database/migrations/0001_01_01_000001_create_cache_table.php) | PHP | 25 | 6 | 5 | 36 |
| [database/migrations/0001\_01\_01\_000002\_create\_jobs\_table.php](/database/migrations/0001_01_01_000002_create_jobs_table.php) | PHP | 46 | 6 | 6 | 58 |
| [database/migrations/2024\_10\_01\_193304\_create\_genres\_table.php](/database/migrations/2024_10_01_193304_create_genres_table.php) | PHP | 20 | 6 | 4 | 30 |
| [database/migrations/2024\_10\_31\_160119\_create\_personal\_access\_tokens\_table.php](/database/migrations/2024_10_31_160119_create_personal_access_tokens_table.php) | PHP | 24 | 6 | 4 | 34 |
| [database/migrations/2024\_10\_31\_223407\_create\_books\_table.php](/database/migrations/2024_10_31_223407_create_books_table.php) | PHP | 27 | 6 | 4 | 37 |
| [database/migrations/2024\_10\_31\_223531\_create\_reviews\_table.php](/database/migrations/2024_10_31_223531_create_reviews_table.php) | PHP | 24 | 6 | 4 | 34 |
| [database/migrations/2024\_11\_01\_192427\_add\_role\_to\_users\_table.php](/database/migrations/2024_11_01_192427_add_role_to_users_table.php) | PHP | 19 | 8 | 4 | 31 |
| [database/migrations/2024\_12\_02\_220439\_add\_picture\_to\_users\_table.php](/database/migrations/2024_12_02_220439_add_picture_to_users_table.php) | PHP | 19 | 8 | 4 | 31 |
| [database/migrations/2025\_02\_27\_160853\_create\_telescope\_entries\_table.php](/database/migrations/2025_02_27_160853_create_telescope_entries_table.php) | PHP | 50 | 9 | 12 | 71 |
| [database/migrations/2025\_03\_10\_182238\_add\_additional\_fields\_to\_users\_table.php](/database/migrations/2025_03_10_182238_add_additional_fields_to_users_table.php) | PHP | 35 | 8 | 5 | 48 |
| [database/seeders/AdminSeeder.php](/database/seeders/AdminSeeder.php) | PHP | 18 | 4 | 6 | 28 |
| [database/seeders/DatabaseSeeder.php](/database/seeders/DatabaseSeeder.php) | PHP | 14 | 5 | 5 | 24 |
| [front-end/README.md](/front-end/README.md) | Markdown | 5 | 0 | 4 | 9 |
| [front-end/eslint.config.js](/front-end/eslint.config.js) | JavaScript | 37 | 0 | 2 | 39 |
| [front-end/index.html](/front-end/index.html) | HTML | 25 | 0 | 1 | 26 |
| [front-end/package-lock.json](/front-end/package-lock.json) | JSON | 6,038 | 0 | 1 | 6,039 |
| [front-end/package.json](/front-end/package.json) | JSON | 42 | 0 | 1 | 43 |
| [front-end/postcss.config.cjs](/front-end/postcss.config.cjs) | JavaScript | 6 | 12 | 0 | 18 |
| [front-end/src/App.jsx](/front-end/src/App.jsx) | JavaScript JSX | 14 | 0 | 7 | 21 |
| [front-end/src/admin/dashboard.jsx](/front-end/src/admin/dashboard.jsx) | JavaScript JSX | 28 | 0 | 2 | 30 |
| [front-end/src/api/axiosConfig.js](/front-end/src/api/axiosConfig.js) | JavaScript | 25 | 1 | 5 | 31 |
| [front-end/src/components/Books/AddBookForm.jsx](/front-end/src/components/Books/AddBookForm.jsx) | JavaScript JSX | 250 | 1 | 5 | 256 |
| [front-end/src/components/Books/BookItem.jsx](/front-end/src/components/Books/BookItem.jsx) | JavaScript JSX | 0 | 0 | 1 | 1 |
| [front-end/src/components/Books/BooksList.jsx](/front-end/src/components/Books/BooksList.jsx) | JavaScript JSX | 126 | 16 | 16 | 158 |
| [front-end/src/components/Books/EditBookForm.jsx](/front-end/src/components/Books/EditBookForm.jsx) | JavaScript JSX | 256 | 1 | 9 | 266 |
| [front-end/src/components/DataTable.jsx](/front-end/src/components/DataTable.jsx) | JavaScript JSX | 0 | 0 | 1 | 1 |
| [front-end/src/components/FilterComponent.jsx](/front-end/src/components/FilterComponent.jsx) | JavaScript JSX | 37 | 0 | 5 | 42 |
| [front-end/src/components/Genres/AddGenreForm.jsx](/front-end/src/components/Genres/AddGenreForm.jsx) | JavaScript JSX | 108 | 0 | 7 | 115 |
| [front-end/src/components/Genres/EditGenreForm.jsx](/front-end/src/components/Genres/EditGenreForm.jsx) | JavaScript JSX | 105 | 0 | 7 | 112 |
| [front-end/src/components/Genres/GenreItem.jsx](/front-end/src/components/Genres/GenreItem.jsx) | JavaScript JSX | 0 | 0 | 1 | 1 |
| [front-end/src/components/Genres/GenresList.jsx](/front-end/src/components/Genres/GenresList.jsx) | JavaScript JSX | 143 | 92 | 12 | 247 |
| [front-end/src/components/ProtectedRoute.jsx](/front-end/src/components/ProtectedRoute.jsx) | JavaScript JSX | 27 | 0 | 4 | 31 |
| [front-end/src/components/ReusableTable.jsx](/front-end/src/components/ReusableTable.jsx) | JavaScript JSX | 100 | 2 | 5 | 107 |
| [front-end/src/components/Users/AddUserForm.jsx](/front-end/src/components/Users/AddUserForm.jsx) | JavaScript JSX | 204 | 1 | 5 | 210 |
| [front-end/src/components/Users/EditUserForm.jsx](/front-end/src/components/Users/EditUserForm.jsx) | JavaScript JSX | 199 | 3 | 15 | 217 |
| [front-end/src/components/Users/UserItem.jsx](/front-end/src/components/Users/UserItem.jsx) | JavaScript JSX | 0 | 0 | 1 | 1 |
| [front-end/src/components/Users/UsersList.jsx](/front-end/src/components/Users/UsersList.jsx) | JavaScript JSX | 136 | 96 | 16 | 248 |
| [front-end/src/components/Users/user\_profile.jsx](/front-end/src/components/Users/user_profile.jsx) | JavaScript JSX | 109 | 0 | 9 | 118 |
| [front-end/src/components/admin/AdminHeader.jsx](/front-end/src/components/admin/AdminHeader.jsx) | JavaScript JSX | 140 | 0 | 18 | 158 |
| [front-end/src/components/admin/AdminSidebar.jsx](/front-end/src/components/admin/AdminSidebar.jsx) | JavaScript JSX | 73 | 0 | 14 | 87 |
| [front-end/src/components/admin/dropDownMenu.jsx](/front-end/src/components/admin/dropDownMenu.jsx) | JavaScript JSX | 51 | 0 | 2 | 53 |
| [front-end/src/components/form components/textInput.jsx](/front-end/src/components/form%20components/textInput.jsx) | JavaScript JSX | 14 | 0 | 1 | 15 |
| [front-end/src/components/login.jsx](/front-end/src/components/login.jsx) | JavaScript JSX | 123 | 0 | 19 | 142 |
| [front-end/src/components/notFound.jsx](/front-end/src/components/notFound.jsx) | JavaScript JSX | 7 | 0 | 1 | 8 |
| [front-end/src/components/signup.jsx](/front-end/src/components/signup.jsx) | JavaScript JSX | 144 | 0 | 4 | 148 |
| [front-end/src/components/useWindowSize.jsx](/front-end/src/components/useWindowSize.jsx) | JavaScript JSX | 12 | 0 | 5 | 17 |
| [front-end/src/contexts/AuthContext.jsx](/front-end/src/contexts/AuthContext.jsx) | JavaScript JSX | 68 | 5 | 16 | 89 |
| [front-end/src/contexts/BookContext.jsx](/front-end/src/contexts/BookContext.jsx) | JavaScript JSX | 87 | 0 | 10 | 97 |
| [front-end/src/contexts/GenreContext.jsx](/front-end/src/contexts/GenreContext.jsx) | JavaScript JSX | 86 | 3 | 14 | 103 |
| [front-end/src/contexts/UserContext.jsx](/front-end/src/contexts/UserContext.jsx) | JavaScript JSX | 95 | 0 | 12 | 107 |
| [front-end/src/index.css](/front-end/src/index.css) | CSS | 14 | 1 | 4 | 19 |
| [front-end/src/layouts/guest.jsx](/front-end/src/layouts/guest.jsx) | JavaScript JSX | 0 | 0 | 1 | 1 |
| [front-end/src/main.jsx](/front-end/src/main.jsx) | JavaScript JSX | 25 | 0 | 3 | 28 |
| [front-end/src/router.jsx](/front-end/src/router.jsx) | JavaScript JSX | 86 | 0 | 8 | 94 |
| [front-end/src/something.jsx](/front-end/src/something.jsx) | JavaScript JSX | 0 | 19 | 0 | 19 |
| [front-end/tailwind.config.cjs](/front-end/tailwind.config.cjs) | JavaScript | 20 | 17 | 2 | 39 |
| [front-end/vite.config.js](/front-end/vite.config.js) | JavaScript | 8 | 1 | 2 | 11 |
| [package-lock.json](/package-lock.json) | JSON | 2,876 | 0 | 1 | 2,877 |
| [package.json](/package.json) | JSON | 17 | 0 | 1 | 18 |
| [phpunit.xml](/phpunit.xml) | XML | 31 | 2 | 1 | 34 |
| [postcss.config.js](/postcss.config.js) | JavaScript | 6 | 0 | 1 | 7 |
| [public/index.php](/public/index.php) | PHP | 9 | 3 | 6 | 18 |
| [public/vendor/telescope/app-dark.css](/public/vendor/telescope/app-dark.css) | CSS | 2 | 5 | 2 | 9 |
| [public/vendor/telescope/app.css](/public/vendor/telescope/app.css) | CSS | 2 | 5 | 1 | 8 |
| [public/vendor/telescope/app.js](/public/vendor/telescope/app.js) | JavaScript | 1 | 1 | 0 | 2 |
| [public/vendor/telescope/mix-manifest.json](/public/vendor/telescope/mix-manifest.json) | JSON | 5 | 0 | 1 | 6 |
| [resources/css/app.css](/resources/css/app.css) | CSS | 3 | 0 | 1 | 4 |
| [resources/js/app.js](/resources/js/app.js) | JavaScript | 1 | 0 | 1 | 2 |
| [resources/js/bootstrap.js](/resources/js/bootstrap.js) | JavaScript | 3 | 0 | 2 | 5 |
| [resources/views/welcome.blade.php](/resources/views/welcome.blade.php) | PHP | 155 | 0 | 22 | 177 |
| [routes/api.php](/routes/api.php) | PHP | 10 | 0 | 5 | 15 |
| [routes/console.php](/routes/console.php) | PHP | 8 | 0 | 3 | 11 |
| [routes/web.php](/routes/web.php) | PHP | 23 | 4 | 12 | 39 |
| [tailwind.config.js](/tailwind.config.js) | JavaScript | 18 | 1 | 2 | 21 |
| [tests/Feature/ExampleTest.php](/tests/Feature/ExampleTest.php) | PHP | 5 | 0 | 3 | 8 |
| [tests/Pest.php](/tests/Pest.php) | PHP | 9 | 32 | 7 | 48 |
| [tests/TestCase.php](/tests/TestCase.php) | PHP | 6 | 1 | 4 | 11 |
| [tests/Unit/ExampleTest.php](/tests/Unit/ExampleTest.php) | PHP | 4 | 0 | 2 | 6 |
| [vite.config.js](/vite.config.js) | JavaScript | 10 | 0 | 2 | 12 |

[Summary](results.md) / Details / [Diff Summary](diff.md) / [Diff Details](diff-details.md)