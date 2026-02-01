# Admin Dashboard

Dashboard admin untuk manage konten website DEMA Kabinet Cakrawala Karsa.

## Fitur Dashboard

### ✅ Sudah Dibuat

1. **Dashboard Layout** (`/admin`)
   - Sidebar navigation dengan menu lengkap
   - Dashboard metrics (stats cards)
   - Quick actions
   - Responsive design dengan mobile menu

2. **News Management** (`/admin/news`)
   - List semua berita
   - Create berita baru
   - Edit berita existing
   - Delete berita dengan confirmation dialog
   - Table view dengan sorting

3. **Events Management** (`/admin/events`)
   - List semua events
   - Create event baru
   - Edit event existing
   - Delete event dengan confirmation dialog
   - Table view dengan date & location

4. **Gallery Management** (`/admin/gallery`)
   - Grid view untuk semua gambar
   - Upload gambar baru
   - Edit informasi gambar
   - Delete gambar dengan confirmation dialog
   - Image preview saat create/edit

5. **Login Page** (`/login`)
   - Form login dengan username & password
   - Error handling
   - Token-based authentication
   - Redirect ke dashboard setelah login

6. **API Service** (`lib/api.ts`)
   - Centralized API calls
   - Error handling
   - Support untuk semua endpoints (news, events, gallery, leadership, divisions, auth)

## Cara Menggunakan

### 1. Setup Environment Variables
Pastikan file `.env` atau `.env.local` sudah diisi:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

### 2. Jalankan Development Server
```bash
npm run dev
```

### 3. Akses Dashboard
- Login: `http://localhost:3000/login`
- Dashboard: `http://localhost:3000/admin` (setelah login)

### 4. Menu Dashboard
- **Dashboard** - Overview & stats
- **News** - Manage berita/artikel
- **Events** - Manage events/kegiatan
- **Gallery** - Manage foto gallery
- **Leadership** - Manage struktur organisasi (belum dibuat)
- **Divisions** - Manage divisi (belum dibuat)

## Struktur File

```
app/
├── admin/
│   ├── layout.tsx          # Admin layout dengan sidebar
│   ├── page.tsx            # Dashboard home
│   ├── news/
│   │   ├── page.tsx        # News list
│   │   ├── new/page.tsx    # Create news
│   │   └── [id]/page.tsx   # Edit news
│   ├── events/
│   │   ├── page.tsx        # Events list
│   │   ├── new/page.tsx    # Create event
│   │   └── [id]/page.tsx   # Edit event
│   └── gallery/
│       ├── page.tsx        # Gallery list
│       ├── new/page.tsx    # Upload image
│       └── [id]/page.tsx   # Edit gallery item
├── login/
│   └── page.tsx            # Login page
lib/
└── api.ts                  # API service functions
```

## Next Steps (Opsional)

### Leadership Management
Tambahkan halaman untuk manage struktur organisasi:
- `/admin/leadership`
- Form untuk add/edit anggota leadership
- Photo upload support

### Divisions Management
Tambahkan halaman untuk manage divisi:
- `/admin/divisions`
- Form untuk add/edit divisi
- Icon/logo upload support

### Image Upload
Saat ini menggunakan URL untuk images. Bisa ditambahkan:
- File upload dengan form-data
- Integration dengan cloud storage (Cloudinary, AWS S3, dll)
- Image optimization

### Authentication Improvements
- JWT token refresh
- Protected routes dengan middleware
- Session management
- User roles & permissions

### Rich Text Editor
Untuk content yang lebih complex:
- Integrate TinyMCE atau Quill
- Support untuk formatting, links, images di content

### Search & Filter
- Search functionality di setiap list page
- Filter by date, category, etc.
- Pagination untuk large datasets

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI Components**: shadcn/ui (Radix UI)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Type Safety**: TypeScript

## Notes

- Dashboard menggunakan localStorage untuk menyimpan auth token
- Semua API calls menggunakan centralized service di `lib/api.ts`
- Error handling sudah implement di setiap API call
- Responsive design untuk mobile & desktop
- Confirmation dialog sebelum delete items
