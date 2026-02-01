# Supabase Database Setup

## Setup Instructions

### 1. Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project"
3. Create a new project
4. Save your project URL and anon key

### 2. Add Environment Variables
Create `.env.local` file with:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 3. Create Database Tables

Jalankan SQL query berikut di Supabase SQL Editor:

#### Table: news
```sql
CREATE TABLE news (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  date DATE NOT NULL,
  image TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE news ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public read access
CREATE POLICY "Allow public read access" ON news
  FOR SELECT USING (true);

-- Policy: Allow authenticated insert
CREATE POLICY "Allow authenticated insert" ON news
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Policy: Allow authenticated update
CREATE POLICY "Allow authenticated update" ON news
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Policy: Allow authenticated delete
CREATE POLICY "Allow authenticated delete" ON news
  FOR DELETE USING (auth.role() = 'authenticated');
```

#### Table: events
```sql
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  date DATE NOT NULL,
  location TEXT,
  image TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Allow public read access" ON events
  FOR SELECT USING (true);

CREATE POLICY "Allow authenticated insert" ON events
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated update" ON events
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated delete" ON events
  FOR DELETE USING (auth.role() = 'authenticated');
```

#### Table: gallery
```sql
CREATE TABLE gallery (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  image TEXT NOT NULL,
  category TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Allow public read access" ON gallery
  FOR SELECT USING (true);

CREATE POLICY "Allow authenticated insert" ON gallery
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated update" ON gallery
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated delete" ON gallery
  FOR DELETE USING (auth.role() = 'authenticated');
```

#### Table: leadership
```sql
CREATE TABLE leadership (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  position TEXT NOT NULL,
  photo TEXT,
  bio TEXT,
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE leadership ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Allow public read access" ON leadership
  FOR SELECT USING (true);

CREATE POLICY "Allow authenticated insert" ON leadership
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated update" ON leadership
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated delete" ON leadership
  FOR DELETE USING (auth.role() = 'authenticated');
```

#### Table: divisions
```sql
CREATE TABLE divisions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT,
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE divisions ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Allow public read access" ON divisions
  FOR SELECT USING (true);

CREATE POLICY "Allow authenticated insert" ON divisions
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated update" ON divisions
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated delete" ON divisions
  FOR DELETE USING (auth.role() = 'authenticated');
```

### 4. Setup Authentication

#### Create Admin User
1. Go to Authentication → Users in Supabase Dashboard
2. Click "Add user"
3. Choose "Create new user"
4. Enter email and password
5. Click "Create user"

**Important:** Gunakan email untuk login, bukan username.

### 5. Optional: Create Database Functions

#### Auto-update updated_at timestamp
```sql
-- Function to auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for each table
CREATE TRIGGER update_news_updated_at
  BEFORE UPDATE ON news
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_events_updated_at
  BEFORE UPDATE ON events
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_gallery_updated_at
  BEFORE UPDATE ON gallery
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_leadership_updated_at
  BEFORE UPDATE ON leadership
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_divisions_updated_at
  BEFORE UPDATE ON divisions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

## Database Schema

### Tables Structure

#### news
- `id` (UUID, PK) - Auto-generated
- `title` (TEXT) - Judul berita
- `content` (TEXT) - Isi berita
- `date` (DATE) - Tanggal publikasi
- `image` (TEXT, nullable) - URL gambar
- `created_at` (TIMESTAMPTZ) - Waktu dibuat
- `updated_at` (TIMESTAMPTZ) - Waktu diupdate

#### events
- `id` (UUID, PK) - Auto-generated
- `title` (TEXT) - Judul event
- `description` (TEXT) - Deskripsi event
- `date` (DATE) - Tanggal event
- `location` (TEXT, nullable) - Lokasi event
- `image` (TEXT, nullable) - URL gambar
- `created_at` (TIMESTAMPTZ) - Waktu dibuat
- `updated_at` (TIMESTAMPTZ) - Waktu diupdate

#### gallery
- `id` (UUID, PK) - Auto-generated
- `title` (TEXT) - Judul gambar
- `description` (TEXT, nullable) - Deskripsi
- `image` (TEXT) - URL gambar
- `category` (TEXT, nullable) - Kategori
- `created_at` (TIMESTAMPTZ) - Waktu dibuat
- `updated_at` (TIMESTAMPTZ) - Waktu diupdate

#### leadership
- `id` (UUID, PK) - Auto-generated
- `name` (TEXT) - Nama
- `position` (TEXT) - Jabatan
- `photo` (TEXT, nullable) - URL foto
- `bio` (TEXT, nullable) - Biografi
- `order` (INTEGER) - Urutan tampilan
- `created_at` (TIMESTAMPTZ) - Waktu dibuat
- `updated_at` (TIMESTAMPTZ) - Waktu diupdate

#### divisions
- `id` (UUID, PK) - Auto-generated
- `name` (TEXT) - Nama divisi
- `description` (TEXT) - Deskripsi divisi
- `icon` (TEXT, nullable) - URL icon
- `order` (INTEGER) - Urutan tampilan
- `created_at` (TIMESTAMPTZ) - Waktu dibuat
- `updated_at` (TIMESTAMPTZ) - Waktu diupdate

## Row Level Security (RLS)

Semua table menggunakan RLS dengan policy:
- **Public**: Bisa READ (SELECT) tanpa login
- **Authenticated**: Bisa CREATE, UPDATE, DELETE (perlu login)

## Testing

### Insert Sample Data

```sql
-- Sample news
INSERT INTO news (title, content, date, image) VALUES
('Welcome to DEMA', 'This is our first news article...', '2026-02-01', 'https://picsum.photos/800/600');

-- Sample event
INSERT INTO events (title, description, date, location) VALUES
('Annual Meeting', 'Join us for our annual meeting...', '2026-03-15', 'Main Hall');

-- Sample gallery
INSERT INTO gallery (title, image, category) VALUES
('Campus Event', 'https://picsum.photos/800/600', 'Events');
```

## Deployment

Saat deploy ke Vercel/Netlify:
1. Add environment variables di dashboard hosting
2. Pastikan `NEXT_PUBLIC_SUPABASE_URL` dan `NEXT_PUBLIC_SUPABASE_ANON_KEY` sudah diset
3. Deploy akan otomatis connect ke Supabase production

## Image Upload (Optional)

Untuk upload gambar ke Supabase Storage:

1. Create storage bucket di Supabase Dashboard → Storage
2. Create bucket dengan nama `images`
3. Set bucket policy untuk public access
4. Update form untuk upload file ke Supabase Storage
5. Simpan URL hasil upload ke database

Example:
```typescript
const uploadImage = async (file: File) => {
  const { data, error } = await supabase.storage
    .from('images')
    .upload(`public/${file.name}`, file);
  
  if (error) throw error;
  
  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from('images')
    .getPublicUrl(data.path);
  
  return publicUrl;
};
```

## Troubleshooting

### Error: "Failed to fetch"
- Check `.env.local` sudah benar
- Pastikan Supabase URL dan key valid
- Check network connection

### Error: "new row violates row-level security policy"
- Pastikan user sudah login (authenticated)
- Check RLS policies sudah dibuat dengan benar

### Error: "relation does not exist"
- Table belum dibuat di Supabase
- Jalankan SQL queries di atas untuk create tables
