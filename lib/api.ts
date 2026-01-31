const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'

async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  const url = `${API_BASE_URL}${endpoint}`
  
  const config: RequestInit = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  }

  try {
    const response = await fetch(url, config)
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error('API call failed:', error)
    throw error
  }
}

export const newsService = {
  getAll: async () => {
    return [
      {
        id: 1,
        title: 'Kegiatan Bakti Sosial 2026',
        content: 'Lorem ipsum dolor sit amet...',
        author: 'Admin',
        date: '2026-01-25',
        status: 'published',
        views: 245,
        image: '/images/news1.jpg',
      },
      {
        id: 2,
        title: 'Workshop Leadership Development',
        content: 'Lorem ipsum dolor sit amet...',
        author: 'Admin',
        date: '2026-01-20',
        status: 'published',
        views: 189,
        image: '/images/news2.jpg',
      },
    ]
  },

  getById: async (id: number) => {
    return {
      id,
      title: 'Sample News',
      content: 'Content here...',
      author: 'Admin',
      date: '2026-01-25',
      status: 'published',
      views: 245,
    }
  },

  create: async (data: any) => {
    console.log('Creating news:', data)
    return { success: true, id: Date.now() }
  },

  update: async (id: number, data: any) => {
    console.log('Updating news:', id, data)
    return { success: true }
  },

  delete: async (id: number) => {
    console.log('Deleting news:', id)
    return { success: true }
  },
}

export const eventsService = {
  getAll: async () => {
    return [
      {
        id: 1,
        title: 'Workshop Leadership 2026',
        description: 'Event description...',
        date: '2026-02-15',
        location: 'Jakarta Convention Center',
        status: 'upcoming',
        attendees: 150,
        maxAttendees: 200,
        image: '/images/event1.jpg',
      },
    ]
  },

  getById: async (id: number) => {
    return {
      id,
      title: 'Sample Event',
      description: 'Description...',
      date: '2026-02-15',
      location: 'Jakarta',
      status: 'upcoming',
      attendees: 150,
    }
  },

  create: async (data: any) => {
    console.log('Creating event:', data)
    return { success: true, id: Date.now() }
  },

  update: async (id: number, data: any) => {
    console.log('Updating event:', id, data)
    return { success: true }
  },

  delete: async (id: number) => {
    console.log('Deleting event:', id)
    return { success: true }
  },
}

export const galleryService = {
  getAll: async () => {
    return [
      {
        id: 1,
        url: '/images/gallery1.jpg',
        title: 'Event Photo 1',
        date: '2026-01-20',
      },
    ]
  },

  upload: async (file: File) => {
    console.log('Uploading file:', file.name)
    return { success: true, url: '/images/uploaded.jpg' }
  },

  delete: async (id: number) => {
    console.log('Deleting image:', id)
    return { success: true }
  },
}
export const leadershipService = {
  getAll: async () => {
    return [
      {
        id: 1,
        name: 'John Doe',
        position: 'Ketua Umum',
        email: 'john@cakrawalakarsa.com',
        phone: '+62 812-3456-7890',
        image: '/images/leader1.jpg',
      },
    ]
  },

  create: async (data: any) => {
    console.log('Creating leader:', data)
    return { success: true, id: Date.now() }
  },

  update: async (id: number, data: any) => {
    console.log('Updating leader:', id, data)
    return { success: true }
  },

  delete: async (id: number) => {
    console.log('Deleting leader:', id)
    return { success: true }
  },
}

export const divisionsService = {
  getAll: async () => {
    return [
      {
        id: 1,
        name: 'Public Relations',
        description: 'Handle external communications',
        members: 12,
        head: 'Sarah Wilson',
      },
    ]
  },

  create: async (data: any) => {
    console.log('Creating division:', data)
    return { success: true, id: Date.now() }
  },

  update: async (id: number, data: any) => {
    console.log('Updating division:', id, data)
    return { success: true }
  },

  delete: async (id: number) => {
    console.log('Deleting division:', id)
    return { success: true }
  },
}
export const authService = {
  login: async (email: string, password: string) => {
    if (email === 'admin@cakrawalakarsa.com' && password === 'admin123') {
      return { success: true, token: 'mock-token', user: { name: 'Admin', email } }
    }
    throw new Error('Invalid credentials')
  },

  logout: async () => {
    return { success: true }
  },
}
