
# Financial Information System Nasi Liwet Keprabon Bu Darmi

![Laravel](https://img.shields.io/badge/Laravel-Framework-red?style=flat-square&logo=laravel)
![React](https://img.shields.io/badge/React-Frontend-61DAFB?style=flat-square&logo=react)
![MySQL](https://img.shields.io/badge/Database-MySQL-blue?style=flat-square&logo=mysql)

## 🚀 Key Features

- 🔐 **Secure REST API using HMAC-SHA256**
- 💵 **Financial records management (sales, income, expenses, invoice)**
- 📊 **Dashboard visualization**
- 📈 **Sales forecasting (Simple Exponential Smoothing)**
- 🔗 **Integration between Laravel backend & React frontend**

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | Laravel (PHP) |
| Frontend | React.js + TypeScript |
| Database | MySQL / Online DB |

---

## ⚙️ Installation & Setup

Follow the steps below to run the project locally.

---

### System Requirements⚠️

Ensure the following tools are installed on your system:

- **PHP** ≥ 8.1
- **Composer**
- **Node.js** ≥ 18
- **MySQL** or **MariaDB**
- **Git**

---

### 1. Clone the Repository

First, clone the repository to your local machine:

```bash
git clone https://github.com/verlyra/KEPRABON.git
cd KEPRABON
```

---

### 2. Backend Setup (Laravel)

Navigate to the backend folder and install dependencies:

```bash
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

Open the `.env` file and update the database configuration to match your local setup:

```
DB_CONNECTION=mysql
DB_HOST=your_mysql_host
DB_PORT=your_mysql_port
DB_DATABASE=keprabon
DB_USERNAME=your_mysql_username
DB_PASSWORD=your_mysql_password
```

Import the database structure from database.sql after that populate the database:

```bash
php artisan db:seed --class=UserSeeder
```
The command above will provide 1 user access to the system, this access is with NIP `29057322` and password `admin123`

---

### 4. Frontend Setup (React)

Install interface dependencies:

```bash
npm install
```

Build the system interface:

```bash
npm run build
```
---

### 5. Run the Laravel Backend
Optimize the Laravel system

```bash
php artisan optimize:clear
```

Start the Laravel development server:

```bash
php artisan serve --host=your_ip
```

After that, the URL where the system is running will appear, and users in the same network can use the system by opening the running URL.

---

### 6. Additional Notes

- If you encounter issues with database migrations, ensure your MySQL server is running and the credentials in `.env` are correct.
- For production deployment, configure environment variables and use a production-ready server like Nginx or Apache.
