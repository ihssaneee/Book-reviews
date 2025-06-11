
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
- Most popular books based on books reviews.
- User distribution by country.


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
   cd ..
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

## **Screenshots**
!['users Screenshot'](https://awesomescreenshot.s3.amazonaws.com/image/6484468/54930403-4a139bcb9b94fb4690db2ae4ec93f880.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJSCJQ2NM3XLFPVKA%2F20250611%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250611T172918Z&X-Amz-Expires=28800&X-Amz-SignedHeaders=host&X-Amz-Signature=021dd6bc25d0bfa476c487c2c9450e40789e026971531a7bc765b0e46bfba7e0) 
!['Books Screenshot'](https://awesomescreenshot.s3.amazonaws.com/image/6484468/54930358-422e5f70e8c52e4b1c96b1accd9ee466.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJSCJQ2NM3XLFPVKA%2F20250611%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250611T173031Z&X-Amz-Expires=28800&X-Amz-SignedHeaders=host&X-Amz-Signature=3f442d550ccc437866e312001f11b46e1348a3cd2fd130cf90b688d5b37b3f3a) 
!['Reviews Screenshot'](https://awesomescreenshot.s3.amazonaws.com/image/6484468/54930372-9f27db27cfe945a48664accce95fed3b.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJSCJQ2NM3XLFPVKA%2F20250611%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250611T173057Z&X-Amz-Expires=28800&X-Amz-SignedHeaders=host&X-Amz-Signature=4217c240c571d50316f238485ab72861f505a82306fd9df62a04a2d3ffa3c865) 
!['User profile Screenshot'](https://awesomescreenshot.s3.amazonaws.com/image/6484468/54930390-a3b20aa966df12c6b6cb794a10e99739.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJSCJQ2NM3XLFPVKA%2F20250611%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250611T173122Z&X-Amz-Expires=28800&X-Amz-SignedHeaders=host&X-Amz-Signature=47cfff9ee594a9cf225a39bd74b0f51ce40e31289a02dfb22622268f6e5e7360) 
!['Update Password Screenshot'](https://awesomescreenshot.s3.amazonaws.com/image/6484468/54930401-963dcff9cb07c2c92be4c43871ce4e80.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJSCJQ2NM3XLFPVKA%2F20250611%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250611T173147Z&X-Amz-Expires=28800&X-Amz-SignedHeaders=host&X-Amz-Signature=7a42e0461a0a3d0e00f9ac1ca670d4d83fb51130287396c2df6b784e3e2948a0) 
!['Delete User Account Screenshot'](https://awesomescreenshot.s3.amazonaws.com/image/6484468/54930399-040982e011aef48b8b6f2c219820c90e.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJSCJQ2NM3XLFPVKA%2F20250611%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250611T173215Z&X-Amz-Expires=28800&X-Amz-SignedHeaders=host&X-Amz-Signature=444de634fa8e6548402538c0e16f7d57ac7c96544a20a52cddadb15d6b81aa7e) 
!['Add new Review Screenshot'](https://awesomescreenshot.s3.amazonaws.com/image/6484468/54930375-25e4cdf3c8222457f9928a6cb31fa9c0.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJSCJQ2NM3XLFPVKA%2F20250611%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250611T173236Z&X-Amz-Expires=28800&X-Amz-SignedHeaders=host&X-Amz-Signature=3a6b0b298054e616eb4c2d571f28c04c10ccc7bc930f04a538f3b8a30d3b45f8) 
    

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

