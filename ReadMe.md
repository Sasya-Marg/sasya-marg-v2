# 🌾 SasyaMarg

**SasyaMarg** is an agriculture-focused digital platform designed to empower farmers using  
**AI-based crop suggestions**, **government scheme awareness**, and a **direct farmer–buyer discovery marketplace**.

The platform helps farmers make better decisions **before cultivation**, gain visibility for their produce, and connect directly with buyers — without involving payments or transactions.

---

## 🎯 Project Vision

Indian farmers face multiple challenges:
- Uncertainty in crop selection due to soil & weather conditions
- Lack of awareness about government schemes
- Dependency on middlemen for selling crops
- Price discovery only after harvest

**SasyaMarg solves these problems by combining technology, data, and accessibility.**

---

## 🧠 Core Problem Areas We Address

### 🌱 1. AI-Based Crop Suggestion
Farmers often grow crops based on tradition or guesswork.

SasyaMarg provides:
- Crop suggestions based on:
  - Farmland data (soil, water source, location)
  - Weather conditions
  - Seasonal factors
- Explainable recommendations
- Historical suggestion tracking for farmers

> The platform maintains **prediction history** so farmers can revisit past suggestions and understand decision logic.

---

### 🏛 2. Government Scheme Awareness
Many farmers miss out on benefits due to lack of information.

SasyaMarg helps by:
- Publishing verified government schemes
- Showing schemes based on farmer location
- Providing eligibility details in simple language
- Keeping schemes updated with active/expired status

---

### 🛒 3. Farmer–Buyer Discovery Marketplace
SasyaMarg acts as a **discovery platform**, not a transaction handler.

The platform allows:
- Farmers to list crops:
  - Post-harvest products
  - Pre-harvest crop listings (before harvest)
- Buyers to:
  - Explore available and upcoming crops
  - Wishlist crops for later reference
  - Directly contact farmers using phone details

> ⚠️ SasyaMarg does **NOT** handle payments, deals, or negotiations.  
> It only connects farmers and buyers.

---

## 🧩 Key Features

### 👨‍🌾 Farmer
- Register & manage profile
- Add farmland details
- Get AI-based crop suggestions
- View suggestion history
- List crops (post-harvest & pre-harvest)
- View government schemes
- Raise queries to admin

---

### 🛒 Buyer
- Explore approved crop listings
- Wishlist crops
- View farmer contact details
- Communicate directly with farmers

---

### 👨‍💼 Admin
- Approve or reject listings
- Moderate platform content
- Publish government schemes
- Handle farmer queries
- Maintain platform trust

---

## 🏗 Project Structure (Monorepo)
```
sasyamarg/
├─ backend/ # Node.js + Express + MongoDB
├─ frontend/ # React (Vite)
├─ .gitignore
└─ README.md
```

---

## 🔧 Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT-based authentication
- Centralized API response & error handling
- Service-based architecture (thin controllers)

### Frontend
- React (Vite)
- Role-based routing
- Axios for API calls
- Component-based UI architecture

---

## 🔐 Architecture Highlights

- Separate models for **Admin**, **Farmer**, and **Buyer**
- Snapshot-based AI prediction history
- Admin moderation workflow
- Discovery-only marketplace (no payments)
- Wishlist-based interaction
- Secure and scalable design

---

## ⚠️ Disclaimer

SasyaMarg does **not**:
- Process payments
- Mediate negotiations
- Guarantee crop quality or pricing
- Act as a transaction or escrow service

All final agreements and transactions happen **offline** between farmers and buyers.

---

## 👨‍💻 Maintainer

**SasyaMarg Team**  
Contributor: *Nitin Sharma*

---

## 📌 Project Status

🚧 Actively under development  
📚 Designed as an academic + startup-ready prototype

---

## 📄 License

This project is currently intended for academic and prototype use.
