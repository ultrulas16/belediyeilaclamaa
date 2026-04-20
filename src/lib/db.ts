import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Initialize client only if URL and Key are provided to prevent build errors
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;

export interface Lead {
  id: string;
  name: string;
  phone: string;
  service: string;
  location: string;
  message: string;
  date: string;
  status: 'Yeni' | 'Beklemede' | 'Arayacak' | 'Tamamlandı' | 'Acil';
}

export interface ChatMessage {
  id: string;
  session_id: string;
  sender: 'user' | 'admin';
  content: string;
  created_at: string;
  is_read: boolean;
}

export async function getLeads(): Promise<Lead[]> {
  if (!supabase) {
    console.warn('Supabase client is not initialized. Using mock data.');
    return [];
  }

  try {
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('date', { ascending: false });

    if (error) {
      console.error('Error fetching leads:', error);
      return [];
    }

    return (data || []).map((item: any) => ({
      ...item,
      id: item.id.toString(), // Ensure ID is string for consistency
    }));
  } catch (error) {
    console.error('Error in getLeads:', error);
    return [];
  }
}

export async function addLead(lead: Omit<Lead, 'id' | 'date' | 'status' | 'location'>): Promise<Lead | null> {
  if (!supabase) {
    console.error('Supabase client missing.');
    return null;
  }

  try {
    const { data, error } = await supabase
      .from('leads')
      .insert([
        {
          ...lead,
          location: 'Bursa Portal', // Default source
          status: 'Yeni',
          date: new Date().toISOString()
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Error adding lead:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error in addLead:', error);
    return null;
  }
}

export async function updateLeadStatus(id: string, status: Lead['status']): Promise<boolean> {
  if (!supabase) return false;

  try {
    const { error } = await supabase
      .from('leads')
      .update({ status })
      .eq('id', id);

    if (error) {
      console.error('Error updating lead status:', error);
      return false;
    }
    return true;
  } catch (error) {
    console.error('Error in updateLeadStatus:', error);
    return false;
  }
}

export async function deleteLead(id: string): Promise<boolean> {
    if (!supabase) return false;
    
    try {
        const { error } = await supabase
            .from('leads')
            .delete()
            .eq('id', id);
            
        if (error) {
            console.error('Error deleting lead:', error);
            return false;
        }
        return true;
    } catch (error) {
        console.error('Error in deleteLead:', error);
        return false;
    }
}

export async function getChatMessages(sessionId: string): Promise<ChatMessage[]> {
  if (!supabase) return [];

  try {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('session_id', sessionId)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching chat messages:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error in getChatMessages:', error);
    return [];
  }
}

export async function sendChatMessage(message: Omit<ChatMessage, 'id' | 'created_at' | 'is_read'>): Promise<ChatMessage | null> {
  if (!supabase) return null;

  try {
    const { data, error } = await supabase
      .from('messages')
      .insert([
        {
          ...message,
          is_read: false,
          created_at: new Date().toISOString()
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Error sending message:', error.message, error.code);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error in sendChatMessage:', error);
    return null;
  }
}

export async function getAllChatSessions(): Promise<{ session_id: string, last_message: string, created_at: string }[]> {
    if (!supabase) return [];
    
    // This is a simplified fetch - normally we'd grouping by session_id
    try {
        const { data, error } = await supabase
            .from('messages')
            .select('session_id, content, created_at')
            .order('created_at', { ascending: false });
            
        if (error) return [];
        
        const sessionsMap = new Map();
        data.forEach((msg: any) => {
            if (!sessionsMap.has(msg.session_id)) {
                sessionsMap.set(msg.session_id, {
                    session_id: msg.session_id,
                    last_message: msg.content,
                    created_at: msg.created_at
                });
            }
        });
        
        return Array.from(sessionsMap.values());
    } catch (error) {
        return [];
    }
}
