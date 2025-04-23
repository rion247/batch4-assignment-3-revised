# **<ins>Blog Project (B4-A3)</ins>**

A robust backend for a blogging platform built with TypeScript, Express.js, and MongoDB. This platform supports user authentication, role-based access control, and a flexible API for managing and retrieving blogs

## **Introduction**

Blog Project is a full-featured backend system for a multi-role blogging platform that facilitates content creation and management for both regular users and administrators. Users can perform CRUD operations on their blogs, while admins have the authority to moderate content and manage users. The system includes secure authentication, comprehensive error handling, and powerful querying features like search, sorting, and filtering.

### **Live Deployment Link**

- [Click Here](https://batch4-assignment-3.vercel.app)

### **GitHub Repository Link**

- [Click Here](https://github.com/rion247/batch4-assignment-3-revised)

### **Admin Credentials**

- **Email:** emily.johnson@example.com
- **Password:** admin123

## **Features**

### **Roles**

- **Admin:**
- Can delete any blog.
- Can block users.
- Cannot update blogs.

- **User:**
- Can register and log in.
- Can create, update, and delete their own blogs.

- **Authentication & Authorization:**
- Secure login with JWT.
- Middleware to restrict routes based on roles.
- Blocked users cannot perform restricted actions.

- **Blog Operations:**
- Create Blog: Authenticated users can create blog posts.
- Read Blogs: Publicly accessible with support for search, sort, and filter.
- Update Blog: Users can update their own blogs.
- Delete Blog: Users can delete their own blogs. Admins can delete any blog.

- **Blog Query Support:**
- Search: By title or content.
- Sort: By fields like createdAt, title, etc.
- Filter: By authorId.

- **Robust Error Handling:**
- Centralized error handler returns standard format.
- Zod validation errors.
- Not found errors.
- Auth & authorization errors.
- Internal server issues.

## **Technologies Used**

- Language: TypeScript.
- Runtime: Node.js.
- Framework: Express.js.
- Database: MongoDB with Mongoose.
- Authentication: JWT.
- Validation: Zod.
- Environment Config: dotenv.

## **Conclusion**

Blog Project Backend is a robust and scalable RESTful API tailored for blogging platforms that require secure user authentication, clean architecture, and flexible blog operations. With role-based access control, powerful query options, and strong error handling, it provides a solid foundation for modern content-driven applications. Whether you're a developer looking to extend this into a full-stack project or an admin managing user-generated content, Blog Project is built to handle your needs efficiently.
