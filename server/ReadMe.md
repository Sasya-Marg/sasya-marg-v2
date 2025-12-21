
---

# 📘 `backend/README.md`


This is the **backend service** for **SasyaMarg**, built using **Node.js, Express, and MongoDB**.

The backend provides:
- Authentication for Admin, Farmer, and Buyer
- AI-based crop suggestion APIs
- Government scheme management
- Product & pre-harvest listing APIs
- Wishlist and discovery logic
- Admin moderation workflows

---

## 🚀 Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- Centralized Error & Response Handling

---

## 📁 Folder Structure

```src/
├─ app.js # Express app configuration
├─ server.js # Server entry point
├─ config/ # DB & environment config
├─ models/ # Mongoose schemas
├─ routes/ # API routes
├─ controllers/ # Thin controllers
├─ services/ # Business logic
├─ middlewares/ # Auth, role, error handlers
├─ utils/ # ApiError, ApiResponse, asyncHandler
└─ validators/ # Input validation
```
---