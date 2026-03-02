# Shine Well NGO - MERN Website

A premium, production-ready NGO growth machine built with the MERN stack.

## 🚀 Features

- **Conversion-Driven Home Page**: Built to establish trust in 5 seconds.
- **Secure Donation System**: Integrated with Razorpay (One-time and Monthly options).
- **Volunteer Management**: Streamlined registration and backend tracking.
- **Dynamic Blog Engine**: SEO-optimized articles with automatic slug generation.
- **Admin Control Center**: JWT-protected dashboard to manage donors, volunteers, and stories.
- **Impact & Transparency**: Dedicated sections for audits, reports, and real-time stats.
- **SEO & Performance**: Optimized images (WebP), JSON-LD schemas, sitemap, and robots.txt.

## 🛠 Tech Stack

- **Frontend**: React (Vite), Tailwind CSS, Framer Motion, Lucide React.
- **Backend**: Node.js, Express.js, MongoDB (Mongoose).
- **Security**: JWT Authentication, Bcrypt hashing, Helmet, Rate Limiting.
- **Payment**: Razorpay SDK.
- **Email**: Nodemailer (configured for SMTP).

## 📁 Folder Structure

```text
shinewell-ngo/
├── client/                 # React frontend
│   ├── public/             # Static assets, robots, sitemap
│   └── src/
│       ├── components/     # UI Components (Navbar, Footer, SEO)
│       ├── pages/          # All functional pages
│       ├── layouts/        # Page wrappers
│       ├── services/       # Axios API instance
│       └── App.jsx         # Routing logic
└── server/                 # Express backend
    ├── models/             # Mongoose schemas
    ├── controllers/        # Business logic
    ├── routes/             # API endpoints
    ├── middleware/         # Auth & safety
    ├── services/           # External integrations (Razorpay)
    └── server.js           # Entry point
```

## 🚦 Getting Started

### 1. Prerequisites
- MongoDB installed locally or a MongoDB Atlas URI.
- Node.js installed.

### 2. Environment Setup
Create a `.env` file in the root (already created for you with defaults):
```env
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_secret
RAZORPAY_KEY_ID=your_rzp_key
RAZORPAY_KEY_SECRET=your_rzp_secret
```

### 3. Installation
The dependencies are already installed. If needed, run:
```bash
npm run install-all
```

### 4. Run the Application
In separate terminals or using concurrently:
```bash
# Run both frontend and backend
npm run dev
```

- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend: [http://localhost:5000](http://localhost:5000)

## 🔐 Default Admin
You can register an admin through the `/api/auth/register` endpoint or seed the database.
Current login available at `/admin/login`.

---

Built with ❤️ by Antigravity for Shine Well NGO.
