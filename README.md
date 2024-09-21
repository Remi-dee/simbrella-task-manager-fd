# Task Management Application

This is a full-stack task management application that supports user authentication, project management, task management, and team collaboration. It is built with **NestJS** for the backend and **Next.js** for the frontend, using **MongoDB** as the database. The project also integrates **Swagger** for API documentation and supports real-time updates via WebSockets.
[Visit app here](https://simbrella-task-manager-fd.vercel.app)


## Demo
### Authentication (Login - Logout)
![simbrella team auth](https://github.com/user-attachments/assets/37cd717e-fd32-497c-bce2-accf79c8731a)

### Authentication (Register)
![simbrella 1](https://github.com/user-attachments/assets/bdca9917-ab21-4dfe-a542-21b32a69295c)



### Manage task
![simbrella task](https://github.com/user-attachments/assets/eac69db7-36b8-4b3d-ad52-4b61e9702c99)

### Manage project
![simbrella project 2](https://github.com/user-attachments/assets/47f879b6-57ec-44fd-b0f3-5ff856ba013d)

### Manage team
![simbrella team](https://github.com/user-attachments/assets/381ed10e-a371-41c0-87c5-b6f12c6bdd58)

### Settings
![simbrella team settings](https://github.com/user-attachments/assets/30ee2a57-2d89-4da9-880a-f5e450ba6215)




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

