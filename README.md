
---

# **BookReview Admin Dashboard**

## **Overview**
The **BookReview Admin Dashboard** is a feature-rich and responsive platform designed exclusively for administrators to manage the **BookReview** ecosystem. It provides tools to oversee users, books, reviews, and genres efficiently, with a focus on usability, security, and modern design principles.

This dashboard is an integral part of the **BookReview** platform, enabling administrators to maintain a seamless experience for users while managing content and moderating reviews.

---

## **Features**
### **User Management**
- Add, update, or delete user accounts securely.
- Manage user roles and statuses (e.g., active/inactive).
- View detailed user profiles with activity tracking.

### **Book and Genre Management**
- Add, edit, or delete books with detailed metadata.
- Organize books into genres and manage genre descriptions.
- Filter and search books and genres with ease.

### **Review Moderation**
- Monitor and manage user-submitted reviews.
- Approve or delete inappropriate reviews.

### **Dark Mode Support**
- Toggle between light and dark themes for enhanced usability and accessibility.

### **Responsive Design**
- Fully optimized for desktop and mobile devices, ensuring a seamless experience across all screen sizes.

### **Advanced Search and Filtering**
- Search functionality for users, books, and reviews.
- Filter data by various criteria for quick access to relevant information.

### **Secure Authentication**
- Built-in authentication and role-based access control to ensure only authorized users can access the dashboard.

### **Real-Time Status Updates**
- Toggle user statuses (e.g., active/inactive) with real-time feedback.

### **Statistics and Analytics**
    View platform statistics including:
        - Montly user growth.
        -Most popular books based on books reviews.
        -User distribution by country.


---

## **Technologies Used**
### **Frontend**
- **React**: For building the user interface.
- **Tailwind CSS**: For styling and responsive design.
- **Context API**: For state management.
- **Axios**: For API communication.
- **React Router**: For navigation and routing.

### **Backend**
- **Laravel**: For secure and scalable backend services.
- **MySQL**: For database management.

---

## **Installation**

### **Prerequisites**
- Node.js and npm installed.
- PHP and Composer installed.
- MySQL or any other database supported by Laravel.

### **Steps**
1. Clone the repository:
   ```bash
   git clone https://github.com/ihssaneee/Book-reviews.git
   cd book-review
   ```

2. Install frontend dependencies:
   ```bash
   cd front-end
   npm install
   ```

3. Install backend dependencies:
   ```bash
   cd ../back-end
   composer install
   ```

4. Configure the .env file for the backend:
   - Set up your database credentials.
   - Add any necessary API keys or environment variables.

5. Run the backend server:
   ```bash
   php artisan serve
   ```

6. Run the frontend development server:
   ```bash
   cd ../front-end
   npm start
   ```

7. Access the application at `http://localhost:3000`.

---

## **Usage**
1. Log in as an administrator using your credentials.
2. Use the sidebar to navigate between sections:
   - **Users**: Manage user accounts and roles.
   - **Books**: Add, edit, or delete books.
   - **Genres**: Organize and manage genres.
   - **Reviews**: Moderate user-submitted reviews.
3. Toggle between light and dark mode using the theme switcher in the header.

---

## **Contributing**
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature description"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

---

## **License**
This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

---

## **Contact**
For any inquiries or support, please contact:
- **Name**: ihssane en najy
- **Email**: najiihsane22@mail.com
- **GitHub**: https://github.com/ihssaneee

---

