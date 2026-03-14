# Financial Information System & Sales Forecasting

![Status](https://img.shields.io/badge/Project-Academic%20KKP-green?style=for-the-badge)
![Laravel](https://img.shields.io/badge/Laravel-Framework-red?style=flat-square&logo=laravel)
![React](https://img.shields.io/badge/React-Frontend-61DAFB?style=flat-square&logo=react)
![MySQL](https://img.shields.io/badge/Database-MySQL-blue?style=flat-square&logo=mysql)
![Security](https://img.shields.io/badge/Security-HMAC--SHA256-yellow?style=flat-square)
![Contributors](https://img.shields.io/github/contributors/verlyra/KEPRABON?style=flat-square)


---

## 📌 Project Overview

This is a web-based financial information and sales forecasting system developed to support operational efficiency at Nasi Liwet Keprabon Bu Darmi Restaurant.  
The system manages financial transaction records, provides analytic dashboards, and predicts future sales using the Simple Exponential Smoothing (SES) forecasting method based on historical sales data.

For secure communication between frontend and backend, the REST API uses HMAC-SHA256 request signing, ensuring integrity and authentication during data exchange.

This system was developed as part of an **Industrial Internship (KKP)** project.

---

## 🚀 Key Features

- 🔐 **Secure REST API using HMAC-SHA256**
- 💵 **Financial records management (sales, income, expenses)**
- 📊 **Dashboard visualization**
- 📈 **Sales forecasting (Simple Exponential Smoothing)**
- 🔗 **Integration between Laravel backend & React frontend**
- 🗂 **Online MySQL database**

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | Laravel (PHP), REST API, HMAC-SHA256 |
| Frontend | React.js + TypeScript, Axios |
| Database | MySQL / Online DB |
| Forecasting | Simple Exponential Smoothing (SES) |

---

## ⚙️ Installation & Setup

Follow the steps below to run the project locally.

### 1. Clone the Repository

```bash
git clone https://github.com/verlyra/KEPRABON.git
cd KEPRABON
```

---

### 2. Backend Setup (Laravel)

Navigate to the backend folder and install dependencies.

```bash
cd backend
composer install
```

Copy the environment configuration file:

```bash
cp .env.example .env
```

Generate the application key:

```bash
php artisan key:generate
```

---

### 3. Configure the Database

Open the `.env` file and update the database configuration:

```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=keprabon
DB_USERNAME=root
DB_PASSWORD=
```

Run database migration:

```bash
php artisan migrate
```

If the project includes seed data:

```bash
php artisan db:seed
```

---

### 4. Run the Laravel Backend

```bash
php artisan serve
```

The backend server will run at:

```
http://127.0.0.1:8000
```

---

### 5. Frontend Setup (React)

Navigate to the frontend directory:

```bash
cd frontend
npm install
```

Run the development server:

```bash
npm run dev
```

The frontend will typically run at:

```
http://localhost:5173
```

---

### 6. API Security (HMAC-SHA256)

This system uses **HMAC-SHA256 request signing** to secure communication between the frontend and backend.

Each API request includes:

* API Key
* Timestamp
* HMAC Signature

The signature is generated from the request payload using a secret key to ensure request integrity and authentication.

---

### 7. System Requirements

Make sure the following tools are installed:

* PHP **≥ 8.1**
* Composer
* Node.js **≥ 18**
* MySQL or MariaDB
* Git

---

### 📂 Project Structure

```
KEPRABON
│
├── backend        # Laravel REST API
├── frontend       # React + TypeScript
└── README.md

```

## 👥 Contributors

| Name | Role | GitHub |
|------|------|--------|
| **Verly Rahma Aulia** | Backend Development, API Security HMAC-SHA256, API Integration | https://github.com/verlyra |
| **Dandy Darmawan Al Yahmin** | Frontend Development, Forecasting Logic, UI/UX | https://github.com/DandyYahmin |

---

## 📎 Repository Purpose

Developed for academic evaluation and portfolio demonstration in:
- Secure Web API systems
- Financial information systems
- Forecasting and analytics implementation
- Full-stack development

---

### ⭐ Thank you for visiting this repository!
