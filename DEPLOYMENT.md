# 🚀 Panduan Deployment ke Vercel

## Persiapan Sebelum Deploy

### 1. Setup Supabase Database

Pastikan sudah membuat project di [Supabase](https://supabase.com) dan menjalankan SQL queries dari `SUPABASE_SETUP.md`:

1. Buka Supabase Dashboard → SQL Editor
2. Jalankan semua query dari `SUPABASE_SETUP.md` untuk membuat:
   - Tables (news, events, gallery, leadership, divisions)
   - Row Level Security (RLS) policies
   - Auto-update triggers

### 2. Setup Supabase Storage

1. Buka Supabase Dashboard → Storage
2. Buat bucket baru bernama `images`
3. Set bucket menjadi **Public**
4. Klik bucket `images` → Policies → New Policy
5. Pilih "Allow public access" untuk read operations

### 3. Buat Admin User

1. Buka Supabase Dashboard → Authentication → Users
2. Klik "Add user" → "Create new user"
3. Masukkan email dan password untuk admin
4. User ini akan digunakan untuk login ke `/admin`

### 4. Dapatkan Supabase Credentials

1. Buka Supabase Dashboard → Settings → API
2. Copy:
   - **Project URL** (akan menjadi `NEXT_PUBLIC_SUPABASE_URL`)
   - **anon/public key** (akan menjadi `NEXT_PUBLIC_SUPABASE_ANON_KEY`)

---

## Deploy ke Vercel

### Metode 1: Deploy via GitHub (Recommended)

1. **Push ke GitHub Repository**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin master
   ```

2. **Connect ke Vercel**
   - Buka [vercel.com](https://vercel.com)
   - Login dengan GitHub
   - Klik "Add New" → "Project"
   - Import repository `cakrawalakarsa-frontend`

3. **Configure Project**
   - Framework Preset: **Next.js** (auto-detected)
   - Root Directory: `./` (default)
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)

4. **Add Environment Variables**
   Di Vercel dashboard, tambahkan environment variables:
   
   | Key | Value | Description |
   |-----|-------|-------------|
   | `NEXT_PUBLIC_SUPABASE_URL` | `https://xxxxx.supabase.co` | Project URL dari Supabase |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6...` | Anon key dari Supabase |

5. **Deploy!**
   - Klik "Deploy"
   - Tunggu proses build selesai (2-3 menit)
   - Website akan live di URL: `https://your-project.vercel.app`

### Metode 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Set Environment Variables**
   ```bash
   vercel env add NEXT_PUBLIC_SUPABASE_URL
   vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
   ```

5. **Deploy to Production**
   ```bash
   vercel --prod
   ```

---

## After Deployment

### 1. Test Website
- Buka URL production: `https://your-project.vercel.app`
- Pastikan homepage tampil dengan benar
- Test navigasi dan semua section

### 2. Test Admin Dashboard
- Buka `/admin` atau klik tombol login
- Login dengan email & password admin yang sudah dibuat
- Test CRUD operations:
  - Upload berita dengan gambar
  - Upload event dengan gambar
  - Upload foto ke gallery
  - Tambah pengurus leadership
  - Tambah divisi

### 3. Verify Data Updates
- Setelah menambah data di admin
- Kembali ke homepage
- Pastikan data baru muncul di homepage

### 4. Setup Custom Domain (Optional)
1. Buka Vercel Dashboard → Settings → Domains
2. Tambahkan domain kamu (misal: `cakrawalakarsa.com`)
3. Update DNS records sesuai instruksi Vercel

---

## Troubleshooting

### Error: "Failed to fetch"
- **Penyebab**: Environment variables tidak di-set
- **Solusi**: Pastikan `NEXT_PUBLIC_SUPABASE_URL` dan `NEXT_PUBLIC_SUPABASE_ANON_KEY` sudah ditambahkan di Vercel

### Error: "Permission denied"
- **Penyebab**: RLS policies belum diaktifkan
- **Solusi**: Jalankan ulang SQL queries dari `SUPABASE_SETUP.md`

### Images tidak muncul
- **Penyebab**: Bucket tidak public atau belum dibuat
- **Solusi**: 
  - Buat bucket `images` di Supabase Storage
  - Set bucket menjadi public
  - Set proper policies untuk read access

### Cannot login to admin
- **Penyebab**: Admin user belum dibuat
- **Solusi**: Buat user di Supabase Dashboard → Authentication → Users

---

## Automatic Deployments

Setelah setup awal, setiap kali kamu push ke GitHub:
```bash
git add .
git commit -m "Update content"
git push origin master
```

Vercel akan otomatis:
1. Detect perubahan
2. Build project
3. Deploy ke production
4. Update website secara live

**Preview Deployments**: Setiap push ke branch lain akan membuat preview URL untuk testing.

---

## Production Checklist

- [ ] Database tables sudah dibuat
- [ ] RLS policies sudah aktif
- [ ] Storage bucket `images` sudah public
- [ ] Admin user sudah dibuat
- [ ] Environment variables sudah di-set di Vercel
- [ ] Website berhasil di-deploy
- [ ] Homepage menampilkan data dengan benar
- [ ] Admin dashboard bisa login
- [ ] Upload gambar berfungsi
- [ ] Data baru muncul di homepage

---

## Support

Jika ada masalah saat deployment:
1. Check Vercel build logs
2. Check browser console untuk errors
3. Verify Supabase connection
4. Check environment variables

Happy Deploying! 🎉
