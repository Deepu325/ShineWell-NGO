# ⚙️ TRD — Technical Requirements Document

**Stack:** MERN (MongoDB + Express + React + Node)

---

## 1️⃣ Frontend

Framework:

* React (with Vite or Next.js preferred)
* If SEO is priority → Use Next.js

Styling:

* Tailwind CSS

UI:

* Reusable component architecture
* Clean folder structure

---

## 2️⃣ Backend

Node.js + Express

API Architecture:

```
/api/auth
/api/donations
/api/volunteers
/api/blog
/api/campaigns
/api/admin
```

Security:

* JWT authentication
* Bcrypt password hashing
* CORS protection
* Rate limiting
* Helmet for headers
* Input validation (Joi or express-validator)

---

## 3️⃣ Database (MongoDB)

Collections:

### users

* _id
* name
* email
* password
* role
* createdAt

### donors

* _id
* name
* email
* amount
* type (one-time/recurring)
* paymentId
* status
* createdAt

### volunteers

* _id
* name
* email
* phone
* interestArea
* status
* createdAt

### blogs

* _id
* title
* slug
* content
* featuredImage
* metaTitle
* metaDescription
* createdAt

### campaigns

* _id
* title
* goalAmount
* collectedAmount
* endDate

---

## 4️⃣ Payment Integration

Provider:

* Razorpay

Flow:  
Frontend → Create order → Razorpay popup →  
Success → Backend verifies payment →  
Webhook confirmation → Store in DB → Send email

Webhook security:

* Verify signature
* Prevent tampering

---

## 5️⃣ SEO Technical Structure

* SSR (if Next.js used)
* Proper H1, H2, H3 hierarchy
* Dynamic meta tags
* Open Graph tags
* Structured data (Organization + NGO)
* Clean URL structure:

  * /ngo-in-[city]
  * /blog/education-support-in-[city]

---

## 6️⃣ Performance Optimization

* Image compression (WebP)
* Lazy loading images
* Code splitting
* Minified JS/CSS
* Gzip compression
* CDN deployment

Target:  
Lighthouse score 90+

---

## 7️⃣ Deployment

Frontend:

* Vercel / Netlify

Backend:

* Render / Railway / AWS

Database:

* MongoDB Atlas

Domain:

* Custom domain with SSL
