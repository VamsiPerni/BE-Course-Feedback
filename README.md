# Course Feedback System - Backend

🔗 **Frontend Live Link:** [https://fe-course-feedback.vercel.app/](https://fe-course-feedback.vercel.app/)

This is the **backend service** of the Course Feedback System.  
It is built with **Node.js, Express, and MongoDB** and provides REST APIs for managing courses, student feedback, and analytics.

---

## 🚀 Tech Stack
- **Node.js** – Runtime environment
- **Express.js** – Web framework
- **MongoDB + Mongoose** – Database & ODM
- **CORS** – Cross-origin support
- **dotenv** – Environment configuration

---

## 📂 Project Structure


```
└── 📁BE-Course-Feedback
    └── 📁api
        └── 📁v1
            └── 📁auth
                ├── controller.js
                ├── dto.js
                ├── routes.js
            └── 📁courses
                ├── controllers.js
                ├── routes.js
            └── 📁feedback
                ├── controllers.js
                ├── routes.js
            └── 📁users
                ├── controllers.js
                ├── routes.js
            ├── middleware.js
            ├── routes.js
    └── 📁config
        ├── cloudinary.js
        ├── db.js
    └── 📁models
        ├── courseSchema.js
        ├── feedbackSchema.js
        ├── otpSchema.js
        ├── userSchema.js
    └── 📁uploads
        ├── bc8c361eebabc34c100ffd40d1e96afe
    └── 📁utils
        ├── controllerHelpers.js
        ├── emailHelpers.js
        ├── jwtHelpers.js
    ├── .env
    ├── .env.example
    ├── .gitignore
    ├── app.js
    ├── package-lock.json
    ├── package.json
    └── README.md
```