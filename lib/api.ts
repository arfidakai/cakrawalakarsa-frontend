// API Service using Supabase
import { supabase } from './supabase';

// News API
export const newsApi = {
  getAll: async () => {
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .order('date', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },
  
  getById: async (id: string) => {
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },
  
  create: async (newsData: any) => {
    const { data, error } = await supabase
      .from('news')
      .insert([newsData])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },
  
  update: async (id: string, newsData: any) => {
    const { data, error } = await supabase
      .from('news')
      .update({ ...newsData, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },
  
  delete: async (id: string) => {
    const { error } = await supabase
      .from('news')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return { success: true };
  },
};

// Events API
export const eventsApi = {
  getAll: async () => {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('date', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },
  
  getById: async (id: string) => {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },
  
  create: async (eventData: any) => {
    const { data, error } = await supabase
      .from('events')
      .insert([eventData])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },
  
  update: async (id: string, eventData: any) => {
    const { data, error } = await supabase
      .from('events')
      .update({ ...eventData, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },
  
  delete: async (id: string) => {
    const { error } = await supabase
      .from('events')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return { success: true };
  },
};

// Gallery API
export const galleryApi = {
  getAll: async () => {
    const { data, error } = await supabase
      .from('gallery')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },
  
  getById: async (id: string) => {
    const { data, error } = await supabase
      .from('gallery')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },
  
  create: async (galleryData: any) => {
    const { data, error } = await supabase
      .from('gallery')
      .insert([galleryData])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },
  
  update: async (id: string, galleryData: any) => {
    const { data, error } = await supabase
      .from('gallery')
      .update({ ...galleryData, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },
  
  delete: async (id: string) => {
    const { error } = await supabase
      .from('gallery')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return { success: true };
  },
};

// Leadership API
export const leadershipApi = {
  getAll: async () => {
    const { data, error } = await supabase
      .from('leadership')
      .select('*')
      .order('order', { ascending: true });
    
    if (error) throw error;
    return data || [];
  },
  
  getById: async (id: string) => {
    const { data, error } = await supabase
      .from('leadership')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },
  
  create: async (leaderData: any) => {
    const { data, error } = await supabase
      .from('leadership')
      .insert([leaderData])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },
  
  update: async (id: string, leaderData: any) => {
    const { data, error } = await supabase
      .from('leadership')
      .update({ ...leaderData, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },
  
  delete: async (id: string) => {
    const { error } = await supabase
      .from('leadership')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return { success: true };
  },
};

// Divisions API
export const divisionsApi = {
  getAll: async () => {
    const { data, error } = await supabase
      .from('divisions')
      .select('*')
      .order('order', { ascending: true });
    
    if (error) throw error;
    return data || [];
  },
  
  getById: async (id: string) => {
    const { data, error } = await supabase
      .from('divisions')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },
  
  create: async (divisionData: any) => {
    const { data, error } = await supabase
      .from('divisions')
      .insert([divisionData])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },
  
  update: async (id: string, divisionData: any) => {
    const { data, error } = await supabase
      .from('divisions')
      .update({ ...divisionData, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },
  
  delete: async (id: string) => {
    const { error } = await supabase
      .from('divisions')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return { success: true };
  },
};

// Auth API (using Supabase Auth)
export const authApi = {
  login: async (credentials: { username: string; password: string }) => {
    // Using email-based auth (you can change username to email in the form)
    const { data, error } = await supabase.auth.signInWithPassword({
      email: credentials.username, // or create a custom auth flow
      password: credentials.password,
    });
    
    if (error) throw error;
    
    return {
      token: data.session?.access_token || '',
      user: data.user,
    };
  },
  
  logout: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },
  
  verify: async (token: string) => {
    const { data, error } = await supabase.auth.getUser(token);
    if (error) throw error;
    return { user: data.user };
  },
  
  getCurrentUser: async () => {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  },
};
