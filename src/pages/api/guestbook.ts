import type { APIRoute } from 'astro';
import { supabase } from '../../lib/supabase';

export const prerender = false;

// GET - 获取所有留言
export const GET: APIRoute = async () => {
  try {
    if (!supabase) {
      return new Response(
        JSON.stringify({
          messages: [],
          warning: 'Supabase 未配置，请先设置环境变量 PUBLIC_SUPABASE_URL 和 PUBLIC_SUPABASE_ANON_KEY',
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        },
      );
    }

    const { data, error } = await supabase.from('guestbook').select('*').order('created_at', { ascending: false });

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ messages: data || [] }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

// POST - 创建新留言
export const POST: APIRoute = async ({ request }) => {
  try {
    if (!supabase) {
      return new Response(
        JSON.stringify({
          error: 'Supabase 未配置。请先在 .env 文件中设置 PUBLIC_SUPABASE_URL 和 PUBLIC_SUPABASE_ANON_KEY',
        }),
        {
          status: 503,
          headers: { 'Content-Type': 'application/json' },
        },
      );
    }

    let body;
    try {
      body = await request.json();
    } catch (e) {
      return new Response(JSON.stringify({ error: '无效的请求体，解析 JSON 失败' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const { nickname, email, content } = body;

    // 验证必填字段
    if (!nickname || !email || !content) {
      return new Response(JSON.stringify({ error: '昵称、邮箱和内容均为必填项' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 插入数据
    const { data, error } = await supabase
      .from('guestbook')
      .insert([
        {
          nickname: nickname.trim(),
          email: email.trim(),
          content: content.trim(),
        },
      ])
      .select(); // 移除 .single()，改用普通的 .select()

    if (error) {
      console.error('Supabase insert error:', error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 即使 select 没返回数据，只要没有 error，也认为插入成功
    return new Response(
      JSON.stringify({
        success: true,
        data: data && data.length > 0 ? data[0] : { nickname, email, content },
      }),
      {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  } catch (err) {
    return new Response(
      JSON.stringify({
        error: '服务器内部错误',
        details: err instanceof Error ? err.message : String(err),
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }
};
