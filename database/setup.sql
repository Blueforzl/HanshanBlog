-- 留言板数据表
-- 在 Supabase SQL Editor 中执行此脚本

CREATE TABLE guestbook (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  email VARCHAR(100),
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建索引以提高查询性能
CREATE INDEX idx_guestbook_created_at ON guestbook(created_at DESC);

-- 设置 Row Level Security (RLS) 策略
ALTER TABLE guestbook ENABLE ROW LEVEL SECURITY;

-- 允许任何人读取留言
CREATE POLICY "任何人都可以查看留言"
  ON guestbook
  FOR SELECT
  USING (true);

-- 允许任何人创建留言
CREATE POLICY "任何人都可以创建留言"
  ON guestbook
  FOR INSERT
  WITH CHECK (true);

-- 禁止修改和删除留言（可选，根据需要调整）
-- CREATE POLICY "禁止修改留言"
--   ON guestbook
--   FOR UPDATE
--   USING (false);

-- CREATE POLICY "禁止删除留言"
--   ON guestbook
--   FOR DELETE
--   USING (false);
