# 留言板功能设置指南

## ✅ 已完成的工作

1. ✓ 配置 Astro SSR 模式
2. ✓ 安装 Supabase 客户端
3. ✓ 创建留言板 API 端点 (`/api/guestbook`)
4. ✓ 创建留言板页面 (`/guestbook`)
5. ✓ 在导航栏添加留言板链接
6. ✓ 创建数据库建表 SQL 脚本

---

## 📋 后续配置步骤

### 1. 创建 Supabase 项目

1. 访问 [https://supabase.com](https://supabase.com)
2. 使用 GitHub 账号登录
3. 点击 "New Project"
4. 填写项目信息：
   - **Project name**: `hanshan-blog`（或其他名字）
   - **Database Password**: 设置一个密码（保存好）
   - **Region**: 选择离你最近的区域（推荐 `Southeast Asia`）
5. 点击 "Create new project"，等待创建完成（约 2 分钟）

### 2. 获取 API 密钥

创建完成后，进入项目设置：

1. 点击左侧菜单 **Project Settings** (齿轮图标)
2. 点击 **API**
3. 复制以下两个值：
   - **Project URL**: `https://bwqsnohuejudtfniysdy.supabase.co`
   - **anon public**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ3cXNub2h1ZWp1ZHRmbml5c2R5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkyNTU4ODgsImV4cCI6MjA5NDgzMTg4OH0.yReCgserkutcqcLi-D7j1XC7RIayFXrI06EX0MFsU8E`

### 3. 配置环境变量

在项目根目录创建或修改 `.env` 文件：

```env
SUPABASE_URL=https://你的项目.supabase.co
SUPABASE_ANON_KEY=你的anon-key
```

**示例：**
```env
SUPABASE_URL=https://abcdefgh.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 4. 创建数据库表

1. 在 Supabase 项目页面，点击左侧 **SQL Editor**
2. 点击 **New Query**
3. 复制 `database/setup.sql` 文件的全部内容
4. 粘贴到 SQL Editor 中
5. 点击 **Run** 执行
6. 看到 "Success. No rows returned" 表示创建成功

### 5. 测试留言板

1. 重启开发服务器：
   ```bash
   npm run dev
   ```
2. 访问 `http://localhost:4322/guestbook`
3. 尝试提交一条留言
4. 如果看到 "✓ 留言发布成功！" 说明配置成功！

---

## 🚀 部署到 Vercel

### 方法一：通过 Vercel CLI

```bash
# 1. 安装 Vercel CLI
npm i -g vercel

# 2. 登录 Vercel
vercel login

# 3. 部署
vercel
```

### 方法二：通过 GitHub 集成（推荐）

1. 将代码推送到 GitHub 仓库
2. 访问 [https://vercel.com](https://vercel.com)
3. 点击 "Add New Project"
4. 选择你的 GitHub 仓库
5. 配置环境变量：
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
6. 点击 "Deploy"

---

## 📁 项目结构

```
terrestrial-telescope/
├── src/
│   ├── pages/
│   │   ├── api/
│   │   │   └── guestbook.ts      # 留言板 API
│   │   ├── guestbook.astro        # 留言板页面
│   │   └── ...
│   ├── lib/
│   │   └── supabase.ts           # Supabase 客户端配置
│   └── components/
│       └── Navbar.astro           # 导航栏（已添加留言板链接）
├── database/
│   └── setup.sql                  # 数据库建表脚本
├── .env                           # 环境变量（不要提交到 Git）
├── .env.example                   # 环境变量模板
├── astro.config.mjs               # Astro 配置（已配置 SSR）
└── package.json
```

---

## 🔧 API 端点说明

### GET /api/guestbook
获取所有留言（按时间倒序）

**响应：**
```json
{
  "messages": [
    {
      "id": "uuid",
      "name": "张三",
      "email": "zhangsan@example.com",
      "message": "很好的博客！",
      "created_at": "2026-05-19T15:00:00Z"
    }
  ]
}
```

### POST /api/guestbook
创建新留言

**请求体：**
```json
{
  "name": "张三",
  "email": "zhangsan@example.com",
  "message": "很好的博客！"
}
```

**成功响应：**
```json
{
  "success": true,
  "data": { ... }
}
```

---

## 🎨 自定义

### 修改留言表单样式
编辑 `src/pages/guestbook.astro` 中的 `<style>` 部分

### 添加审核功能
修改 `database/setup.sql`，添加 `approved` 字段：
```sql
ALTER TABLE guestbook ADD COLUMN approved BOOLEAN DEFAULT false;
```

然后修改 API 只返回已审核的留言。

### 添加邮箱通知
在 `src/pages/api/guestbook.ts` 的 POST 处理中添加邮件发送逻辑。

---

## 🐛 常见问题

### Q: 提交留言时出现 "Internal server error"
A: 检查：
1. `.env` 文件中的 Supabase 配置是否正确
2. 数据库表是否创建成功
3. 查看浏览器控制台的错误信息

### Q: 留言没有显示
A: 检查：
1. 打开浏览器开发者工具 → Network 标签
2. 查看 `/api/guestbook` 的响应
3. 检查 Supabase 项目中的数据是否插入成功

### Q: 本地开发正常，部署后报错
A: 确保在 Vercel 的环境变量中配置了 `SUPABASE_URL` 和 `SUPABASE_ANON_KEY`

---

## 📞 需要帮助？

如果遇到问题，可以：
1. 查看 Supabase 文档：https://supabase.com/docs
2. 查看 Astro 文档：https://docs.astro.build
3. 查看 Vercel 文档：https://vercel.com/docs

---

**祝你使用愉快！** 🎉
