import type { APIRoute } from 'astro';
import { supabase } from '../../lib/supabase';

// GET - 获取所有留言
export const GET: APIRoute = async () => {
  try {
    // 检查 Supabase 是否已配置
    if (!supabase) {
      return new Response(
        JSON.stringify({ 
          messages: [],
          warning: 'Supabase 未配置，请先设置环境变量'
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    const { data, error } = await supabase
      .from('guestbook')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ messages: data || [] }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

// POST - 创建新留言
export const POST: APIRoute = async ({ request }) => {
  try {
    // 检查 Supabase 是否已配置
    if (!supabase) {
      return new Response(
        JSON.stringify({ 
          error: 'Supabase 未配置。请先在 .env 文件中设置 SUPABASE_URL 和 SUPABASE_ANON_KEY' 
        }),
        {
          status: 503,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    const body = await request.json();
    const { name, email, message } = body;

    // 验证必填字段
    if (!name || !message) {
      return new Response(
        JSON.stringify({ error: '姓名和留言内容为必填项' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // 插入数据
    const { data, error } = await supabase
      .from('guestbook')
      .insert([
        {
          name: name.trim(),
          email: email?.trim() || null,
          message: message.trim(),
        }
      ])
      .select()
      .single();

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ success: true, data }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Invalid request body' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
