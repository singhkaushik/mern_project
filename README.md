# **Role-Based Access Control (RBAC) Implementation**  

This project is a full-stack **Role-Based Access Control (RBAC)** system using **React, Node.js, Express, and MongoDB**. It includes **authentication, role management, and authorization** with secure API endpoints.

---

## **🚀 Features**
✅ Secure **User Authentication** (JWT-based)  
✅ **Role-Based Authorization** (Admins can manage roles & permissions)  
✅ **Protected API Endpoints** with Middleware  
✅ **Frontend Authentication UI** (Login, Register, Dashboard)  
✅ **Role Management UI** (Admins can create & assign roles)  

---

## **🛠 Tech Stack**
### **Backend:**
- **Node.js** + **Express.js**
- **MongoDB** + **Mongoose**
- **JWT Authentication**
- **Bcrypt.js** (Password Hashing)
- **CORS** (Cross-Origin Requests)

### **Frontend:**
- **React.js** 
- **React Router** (Navigation)
- **Axios** (API Requests)
- **Context API** (Global State Management)

---

## **📌 API Endpoints**

### **User Authentication**
| Method | Endpoint          | Description |
|--------|------------------|-------------|
| POST   | `/api/auth/register` | Register a new user (Admin/User) |
| POST   | `/api/auth/login` | Authenticate user & return JWT |
| POST   | `/api/auth/logout` | Logout user (optional) |

### **Role Management**
| Method | Endpoint          | Description |
|--------|------------------|-------------|
| POST   | `/api/roles/create` | Create a new role (Admin only) |
| POST   | `/api/roles/assign` | Assign a role to a user (Admin only) |

---

## **📂 Project Structure**
```
backend/
│── server.js
│── .env
│── config/
│   └── db.js
│── models/
│   ├── User.js
│   └── Role.js
│── middleware/
│   ├── authMiddleware.js
│── routes/
│   ├── authRoutes.js
│   ├── roleRoutes.js
└── package.json

frontend/
│── src/
│   ├── pages/
│   │   ├── Register.js
│   │   ├── Login.js
│   │   ├── Dashboard.js
│   │   ├── Unauthorized.js
│   ├── context/
│   │   └── AuthContext.js
│── package.json
```

---

## **🛠 Installation & Setup**
### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/yourusername/rbac-system.git
cd rbac-system
```

### **2️⃣ Backend Setup**
```sh
cd backend
npm install
```
#### **Create a `.env` file in `backend/` and add:**
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

#### **Run the Backend Server**
```sh
npm run dev
```

### **3️⃣ Frontend Setup**
```sh
cd frontend
npm install
npm run dev
```

---

## **🔒 Role-Based Access Control**
- **Admin** can **create roles** and **assign roles** to users.  
- **Users** can only access authorized pages based on their roles.  
- Unauthorized users are redirected to the **403 Unauthorized Page**.  

---

## **📺 Demo **
🔗 **Live Demo:** https://rolebaac.netlify.app/

---

## **📜 License**
This project is licensed under the **MIT License**.  

---

## **🛠 Additional Features**
✅ **Password Hashing with bcrypt**  
✅ **JWT Token Expiry Handling**  
✅ **Modular Code Structure**  
✅ **Efficient API Response Management**  
