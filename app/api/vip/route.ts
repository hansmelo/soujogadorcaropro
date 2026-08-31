import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { contact, name, username, aura } = body;

    if (!contact) {
      return NextResponse.json({ error: 'Contato é obrigatório' }, { status: 400 });
    }

    // Se as variáveis de ambiente ainda não foram configuradas, simula o sucesso
    // para não quebrar a experiência do usuário na Landing Page.
    if (!supabase) {
      console.log('⚠️ [MOCK VIP LEAD] Supabase não configurado. Lead recebido:', body);
      return NextResponse.json({ success: true, mock: true });
    }

    // Salva no Supabase (tabela: vip_leads)
    const { data, error } = await supabase
      .from('vip_leads')
      .insert([
        { 
          contact, 
          name: name || 'Desconhecido', 
          username: username || 'Desconhecido', 
          aura: aura || 0,
          created_at: new Date().toISOString() 
        }
      ]);

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Erro interno no servidor' }, { status: 500 });
  }
}
