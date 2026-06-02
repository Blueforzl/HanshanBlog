-- 留言板数据表 (增强版)
-- 在 Supabase SQL Editor 中执行此脚本

-- 如果表已存在，添加 email 字段（如果不存在）并设为必填
-- 注意：如果表中已有数据，直接添加 NOT NULL 可能会报错，建议先清空或设置默认值
-- DROP TABLE IF EXISTS guestbook;

CREATE TABLE IF NOT EXISTS guestbook (
  id bigint generated always as identity primary key,
  nickname text not null,
  email text not null, -- 邮箱设为必填
  content text not null,
  created_at timestamptz default now()
);

-- 如果表已存在但没有 email 字段，可以使用以下 SQL:
-- ALTER TABLE guestbook ADD COLUMN IF NOT EXISTS email text;
-- UPDATE guestbook SET email = 'unknown@example.com' WHERE email IS NULL;
-- ALTER TABLE guestbook ALTER COLUMN email SET NOT NULL;

-- 创建索引以提高查询性能
CREATE INDEX IF NOT EXISTS guestbook_created_at_idx ON guestbook(created_at DESC);

-- 设置 Row Level Security (RLS) 策略
ALTER TABLE guestbook ENABLE ROW LEVEL SECURITY;

-- 允许任何人读取留言
DROP POLICY IF EXISTS "public read guestbook" ON guestbook;
CREATE POLICY "public read guestbook"
  ON guestbook
  FOR SELECT
  TO anon
  USING (true);

-- 允许任何人创建留言
DROP POLICY IF EXISTS "public insert guestbook" ON guestbook;
CREATE POLICY "public insert guestbook"
  ON guestbook
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- 禁止修改留言
DROP POLICY IF EXISTS "deny update" ON guestbook;
CREATE POLICY "deny update"
  ON guestbook
  FOR UPDATE
  TO anon
  USING (false);

-- 禁止删除留言
DROP POLICY IF EXISTS "deny delete" ON guestbook;
CREATE POLICY "deny delete"
  ON guestbook
  FOR DELETE
  TO anon
  USING (false);
