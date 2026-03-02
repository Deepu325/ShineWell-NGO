# 📋 PRD — Product Requirements Document

**Product:** Shine Well NGO Website (MERN)  
**Objective:** Build a high-trust, high-conversion NGO platform that converts visitors into donors, volunteers, and partners.

---

## 1️⃣ Product Vision

This is not a brochure site.

This is a **conversion + credibility engine**.

The website must:

* Build trust in 5 seconds
* Show proof in 15 seconds
* Trigger action in 30 seconds

Primary Goal: Increase donations and recurring supporters.

---

## 2️⃣ Target Users

### Primary

* Individual donors
* Monthly recurring donors
* Student volunteers
* CSR managers

### Secondary

* Media
* Government bodies
* Sponsors

---

## 3️⃣ Core User Flows

### 🟢 Flow 1: Donation Flow

Homepage  
→ Click "Donate Now"  
→ Select amount (preset + custom)  
→ Choose one-time / monthly  
→ Razorpay payment  
→ Payment success  
→ Thank you page  
→ Email receipt sent  
→ Donor data stored in MongoDB

Edge Cases:

* Payment failure → retry option
* Webhook delay → payment verification check
* Duplicate click → disable double submit

---

### 🟢 Flow 2: Volunteer Flow

Homepage  
→ Become Volunteer  
→ Fill form  
→ Submit  
→ Stored in DB  
→ Admin notified  
→ Auto confirmation email

---

### 🟢 Flow 3: CSR / Partner Flow

Homepage  
→ Transparency section  
→ Download Annual Report  
→ Partner page  
→ Contact form submission

---

## 4️⃣ Features (Priority Based)

### 🔴 P0 – Mandatory

* Hero section with clear CTA
* Donation system (Razorpay integration)
* Monthly recurring option
* Impact stats with animation
* Transparency section
* Annual report downloads
* Registration number display
* Blog (SEO optimized)
* Admin dashboard
* Secure contact form
* Sitemap.xml
* Robots.txt
* Google Analytics
* Structured data (Organization Schema)

---

### 🟠 P1 – Important

* Campaign progress bar
* Volunteer management system
* Blog CMS (admin editable)
* Email receipt automation
* CSR dedicated page

---

### 🟡 P2 – Advanced

* Campaign landing pages
* Media mentions section
* Donation leaderboard (optional)
* Dynamic impact dashboard

---

## 5️⃣ Admin Roles & Access

### Admin

* Full control
* Manage donations
* Manage blogs
* Update stats
* Upload reports
* View volunteers

### Editor

* Manage blogs only

Authentication:

* JWT-based authentication
* Password hashing (bcrypt)
* Protected routes

---

## 6️⃣ Success Metrics

* Donation conversion rate (3–8%)
* Recurring donor growth
* Volunteer registrations per month
* Bounce rate < 40%
* Page load < 2 seconds
* Organic SEO growth

If these aren't tracked, you're building blindly.
