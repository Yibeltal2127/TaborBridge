import { supabase } from './supabase';
import type { Database } from './database.types';

type Tables = Database['public']['Tables'];

export const api = {
  auth: {
    signUp: async (email: string, password: string, userData: Partial<Tables['users']['Insert']>) => {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) throw authError;

      const { error: profileError } = await supabase
        .from('users')
        .insert({ ...userData, id: authData.user?.id });

      if (profileError) throw profileError;

      return authData;
    },

    signIn: async (email: string, password: string) => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      return data;
    },

    signOut: async () => {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    },
  },

  users: {
    get: async (userId: string) => {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();
      if (error) throw error;
      return data;
    },

    update: async (userId: string, updates: Tables['users']['Update']) => {
      const { data, error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', userId)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
  },

  materials: {
    list: async (filters?: {
      category?: string;
      minPrice?: number;
      maxPrice?: number;
      sellerId?: string;
    }) => {
      let query = supabase.from('materials').select('*, users!materials_seller_id_fkey(*)');

      if (filters?.category) {
        query = query.eq('category', filters.category);
      }
      if (filters?.minPrice) {
        query = query.gte('price', filters.minPrice);
      }
      if (filters?.maxPrice) {
        query = query.lte('price', filters.maxPrice);
      }
      if (filters?.sellerId) {
        query = query.eq('seller_id', filters.sellerId);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },

    get: async (id: string) => {
      const { data, error } = await supabase
        .from('materials')
        .select('*, users!materials_seller_id_fkey(*)')
        .eq('id', id)
        .single();
      if (error) throw error;
      return data;
    },

    create: async (material: Tables['materials']['Insert']) => {
      const { data, error } = await supabase
        .from('materials')
        .insert(material)
        .select()
        .single();
      if (error) throw error;
      return data;
    },

    update: async (id: string, updates: Tables['materials']['Update']) => {
      const { data, error } = await supabase
        .from('materials')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },

    delete: async (id: string) => {
      const { error } = await supabase
        .from('materials')
        .delete()
        .eq('id', id);
      if (error) throw error;
    },
  },

  orders: {
    create: async (order: Tables['orders']['Insert'], items: Tables['order_items']['Insert'][]) => {
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert(order)
        .select()
        .single();

      if (orderError) throw orderError;

      const orderItems = items.map(item => ({
        ...item,
        order_id: orderData.id,
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      return orderData;
    },

    list: async (filters?: { buyerId?: string; sellerId?: string; status?: string }) => {
      let query = supabase
        .from('orders')
        .select(`
          *,
          buyer:users!orders_buyer_id_fkey(*),
          seller:users!orders_seller_id_fkey(*),
          items:order_items(
            *,
            material:materials(*)
          )
        `);

      if (filters?.buyerId) {
        query = query.eq('buyer_id', filters.buyerId);
      }
      if (filters?.sellerId) {
        query = query.eq('seller_id', filters.sellerId);
      }
      if (filters?.status) {
        query = query.eq('status', filters.status);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },

    get: async (id: string) => {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          buyer:users!orders_buyer_id_fkey(*),
          seller:users!orders_seller_id_fkey(*),
          items:order_items(
            *,
            material:materials(*)
          )
        `)
        .eq('id', id)
        .single();
      if (error) throw error;
      return data;
    },

    updateStatus: async (id: string, status: Tables['orders']['Row']['status']) => {
      const { data, error } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
  },
};