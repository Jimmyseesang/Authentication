# 🛡️ Next.js Authentication System

ระบบ Authen ที่พัฒนาด้วย Next.js, Prisma, และ NextAuth.js  
รองรับการ Login/Register ผ่าน Credential (email + password) และ Google OAuth

---

## 🔧 เทคโนโลยีที่ใช้

- [Next.js](https://nextjs.org/) (App Router)
- [NextAuth.js](https://authjs.dev/)
  - Credentials Provider (Email/Password)
  - Google Provider
- [Prisma ORM](https://www.prisma.io/)
- PostgreSQL

---

## ⚙️ ติดตั้งและใช้งาน

### 1. ติดตั้ง Dependencies
```bash
npm install
```

### 2. สร้าง .env

DATABASE_URL=postgresql://user:password@localhost:5432/mydb
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

### 3. ตั่งค่า prisma 
สร้าง Database และ push schema:
``` bash
npx prisma db push
```
สร้าง Prisma Client
``` bash
npx prisma generate
```

### 4. เริ่ม Server
``` bash
npm run dev
```
เปิดที่ http://localhost:3000

### 🧪 ฟีเจอร์
✅ ลงทะเบียนผู้ใช้ด้วยอีเมล/รหัสผ่าน

✅ เข้าสู่ระบบด้วย Credential หรือ Google OAuth

✅ JWT session management

✅ บันทึกผู้ใช้ลงในฐานข้อมูลด้วย Prisma

✅ รีไดเรกต์เมื่อไม่ได้เข้าสู่ระบบ
