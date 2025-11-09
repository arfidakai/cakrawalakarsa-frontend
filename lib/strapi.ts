// lib/strapi.ts

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export async function fetchAPI<T>(
  path: string,
  options: RequestInit = {}
): Promise<StrapiResponse<T>> {
  const url = `${STRAPI_URL}/api${path}`;

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error(`Strapi API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  } catch (err) {
    console.error(`Fetch failed for ${url}`, err);
    throw err;
  }
}

// === Helper Functions ===

export async function getNews() {
  return fetchAPI('/news?populate=*');
}

export async function getDivisions() {
  try {
    const res = await fetch(`${STRAPI_URL}/api/bidangs?populate=*`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.status}`);
    }

    const json = await res.json();

    if (!json.data) {
      return { data: [] };
    }

    return {
      data: json.data.map((item: any) => ({
        id: item.id,
        nama: item.nama,
        deskripsi: item.deskripsi,
        warna: item.warna,
        ikon: item.ikon,
        slug: item.slug,
        periode: item.periode,
        program_kerjas: item.program_kerjas || [],
      })),
    };
  } catch (error) {
    console.error('Error:', error);
    return { data: [] };
  }
}

export async function getGallery() {
  try {
    const res = await fetch(`${STRAPI_URL}/api/dokumentasis?populate=*`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      console.error(`Failed to fetch gallery: ${res.status}`);
      return { data: [] };
    }

    const json = await res.json();

    console.log('Gallery Response:', JSON.stringify(json, null, 2));

    if (!json.data || !Array.isArray(json.data)) {
      return { data: [] };
    }

    return {
      data: json.data.map((item: any) => ({
        id: item.id,
        judul: item.judul,
        tanggal: item.tanggal,
        keterangan: item.keterangan,
        gambar: item.gambar ? {
          url: item.gambar.url,
          formats: item.gambar.formats,
          alternativeText: item.gambar.alternativeText,
        } : null,
      })),
    };
  } catch (error) {
    console.error('Error fetching gallery:', error);
    return { data: [] };
  }
}




