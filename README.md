# 🛡️ Next.js Authentication System

ระบบ Authentication ด้วย **Next.js**, **NextAuth.js**, **Prisma**, และ **PostgreSQL**  
รองรับทั้ง **Email/Password** และ **Google OAuth**  
พร้อมใช้งานผ่าน **Docker Compose**

---

## 🧰 Tech Stack

- [Next.js (App Router)](https://nextjs.org/)
- [NextAuth.js](https://authjs.dev/)
  - Credential Provider (email/password)
  - Google Provider
- [Prisma ORM](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- Docker + Docker Compose

---

## ⚙️ การติดตั้ง (แบบไม่ใช้ Docker)

### 1. ติดตั้ง Dependencies

```bash
npm install

```

### 2. สร้าง .env

DATABASE_URL="postgresql://user:password@db:5432/mydatabase"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET=your-random-secret

GOOGLE_CLIENT_ID="your-google-client-id-here"
GOOGLE_CLIENT_SECRET="your-google-client-secret-here"

### 3. การใช้งานผ่าน Docker

สร้างไฟล์ .env จาก .env.example

```bash
cp .env.example .env
```

Run ด้วย Docker Compose

```bash
  docker-compose up --build
```

เปิดแอปที่
http://localhost:3000

### 🧪 ฟีเจอร์

✅ ลงทะเบียนผู้ใช้ด้วยอีเมล/รหัสผ่าน

✅ เข้าสู่ระบบด้วย Credential หรือ Google OAuth

✅ JWT session management

✅ บันทึกผู้ใช้ลงในฐานข้อมูลด้วย Prisma

✅ รีไดเรกต์เมื่อไม่ได้เข้าสู่ระบบ

### ☁️ OAuth Note (Google)

หากต้องการทดสอบ Google Login
1. ไปที่ Google Cloud Console
2. สร้าง OAuth Client (Web)
3. ใส่ redirect URI: http://localhost:3000/api/auth/callback/google
4. นำ CLIENT_ID และ CLIENT_SECRET ไปใส่ใน .env

