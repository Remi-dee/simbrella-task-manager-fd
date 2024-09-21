# Task Management Application

This is a full-stack task management application that supports user authentication, project management, task management, and team collaboration. It is built with **NestJS** for the backend and **Next.js** for the frontend, using **MongoDB** as the database. The project also integrates **Swagger** for API documentation and supports real-time updates via WebSockets.

## Features

- User authentication (JWT-based)
- Project and task management
- Team management (assign users to teams and projects)
- Real-time task updates using WebSockets
- Email notifications using Nodemailer
- API documentation via Swagger

## Technologies Used

- **Backend**: NestJS, MongoDB, Mongoose, JWT, Swagger, Nodemailer
- **Frontend**: Next.js, Redux Toolkit, TailwindCSS
- **Database**: MongoDB
- **Real-time**: WebSockets

## Prerequisites

- Node.js (v14+)
- MongoDB (Ensure MongoDB is running on your machine or use a MongoDB cloud instance)
- npm (or yarn)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-repo-url.git

2.  Navigate to the Frontend Directory

   ```bash
   Once the repository is cloned, navigate to the frontend folder where the Next.js application is located:
   Copy code
   cd task-management-app/frontend
 ```


3. Install the repository:

   ```bash
   npm install or yarn install
   ```

4. Connect to the backend by adding env details:

   ```bash
   locate the .envExample file in the root folder and change rename to .env

