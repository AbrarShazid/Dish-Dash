# Dish Dash - Food Delivery Platform

A modern food delivery platform built with Next.js, featuring user authentication, restaurant browsing, and order management.

## 🚀 Live Demo

**Live Site:** [Dish Dash](https://dish-dash-l2.vercel.app)

**Backend Repository:** [Dish Dash Backend](https://github.com/AbrarShazid/Dish-Dash-Back-End-L2-A4)

## 👨‍💻 Admin Credentials

Use these credentials to access the admin dashboard:

Email: admin@gmail.com

Password: Aa123456


## 🛠️ Tech Stack

- **Frontend:** Next.js, TypeScript, TailwindCSS
- **Authentication:** BetterAuth
- **UI Components:** Shadcn UI.
- **Image Upload:** Cloudinary
- **Backend:** Node.js, Express, PostgreSQL, Prisma

## 📋 Prerequisites

Before you begin, ensure you have installed:
- Node.js (v18 or higher)
- pnpm (v8 or higher)
- Git

## 🔧 Installation & Setup

Follow these steps to run the project locally:

### 1. Clone the Repository

```bash
git clone https://github.com/AbrarShazid/Dish-Dash.git
cd Dish-Dash
```
### 2. Install Dependencies
```bash
pnpm install
```
### 3. Set Up Environment Variables
Create a .env file in the root directory and add the following variables:
```bash
# Frontend URL
NEXT_PUBLIC_FRONTEND_URL=http://localhost:3000
FRONTEND_URL=http://localhost:3000

# Backend URLs (choose one based on your setup)
BACKEND_URL=https://dish-dash-backend.vercel.app
# OR for local backend
# BACKEND_URL=http://localhost:5000

AUTH_URL=https://dish-dash-backend.vercel.app
# OR for local backend
# AUTH_URL=http://localhost:5000

NEXT_PUBLIC_BACKEND_URL=https://dish-dash-backend.vercel.app
# OR for local backend
# NEXT_PUBLIC_BACKEND_URL=http://localhost:5000

# Cloudinary Configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_cloudinary_upload_preset
```
### 4. Run the Development Server
```bash
pnpm dev
```
