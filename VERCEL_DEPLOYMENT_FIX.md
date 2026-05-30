# Vercel 部署问题排查指南

##  常见问题

### 网站无法访问，显示 "Site cannot be accessed"

这通常是由以下原因导致：

---

##  解决方案

### 方案 1：检查 Vercel 项目设置

1. **登录 Vercel 控制台**
   - 访问：https://vercel.com/dashboard
   - 找到你的项目

2. **检查部署状态**
   - 点击项目 → **Deployments**
   - 查看最新部署是否有错误
   - 如果有红色 ❌，点击查看详情

3. **检查构建日志**
   - 在部署页面点击 **Build Logs**
   - 查看是否有构建错误
   - 常见错误：
     - `getStaticPaths` 相关错误
     - 环境变量缺失
     - 依赖安装失败

---

### 方案 2：重新配置 Vercel 项目

如果项目配置有问题，可以重新创建：

1. **删除旧项目**
   - Vercel Dashboard → 项目设置 → 滚动到底部
   - 点击 **Delete Project**

2. **重新部署**
   ```bash
   # 确保代码已提交
   git add .
   git commit -m "fix: 修复 Vercel 部署配置"
   git push
   
   # 重新部署
   vercel --prod
   ```

---

### 方案 3：检查环境变量

你的项目使用了 Supabase，需要配置环境变量：

1. **在 Vercel 添加环境变量**
   - Vercel Dashboard → 项目 → **Settings**
   - 左侧菜单 → **Environment Variables**
   - 添加以下变量：
     ```
     SUPABASE_URL=https://bwqsnohuejudtfniysdy.supabase.co
     SUPABASE_ANON_KEY=你的真实key
     ```

2. **重新部署**
   - 添加环境变量后，需要重新部署才能生效
   - Dashboard → Deployments → 点击最新部署 → **Redeploy**

---

### 方案 4：修改 Astro 配置（混合模式）

如果 SSR 模式有问题，可以改用混合模式：

修改 `astro.config.mjs`：

```javascript
// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

export default defineConfig({
  output: 'hybrid',  // 改为 hybrid 模式
  adapter: vercel(),
});
```

**hybrid 模式的优势：**
- 静态页面预渲染（更快）
- API 路由动态渲染
- 更好的兼容性

---

### 方案 5：检查 Node.js 版本

Vercel 需要匹配你的 `package.json` 中的 Node.js 版本要求。

你的项目要求：`node >= 22.12.0`

**解决方案：**

在 `vercel.json` 中添加：

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "astro",
  "git": {
    "deploymentEnabled": {
      "main": true
    }
  }
}
```

---

## 📋 部署检查清单

在部署前，确保：

- [ ] 代码已提交到 Git
- [ ] `.env` 文件未提交（已在 `.gitignore` 中）
- [ ] `node_modules` 未提交（已在 `.gitignore` 中）
- [ ] 所有页面导入路径正确
- [ ] `getStaticPaths` 页面已添加 `prerender = true`
- [ ] `package.json` 中有正确的依赖
- [ ] Vercel 中已配置环境变量（Supabase）

---

## 🚀 快速修复步骤

### 1. 本地测试构建

```bash
npm run build
```

如果本地构建成功，说明代码没问题。

### 2. 检查 Git 状态

```bash
git status
git add .
git commit -m "fix: 更新 Vercel 部署配置"
git push
```

### 3. Vercel 自动部署

推送到 GitHub 后，Vercel 会自动部署。

### 4. 手动重新部署

如果自动部署失败：
- Vercel Dashboard → **Deployments**
- 点击最新部署 → **Redeploy**

---

## 🔍 常见错误和解决

### 错误 1：`getStaticPaths is not defined`
**原因：** SSR 模式下未声明 `prerender`  
**解决：** 在 `[slug].astro` 添加 `export const prerender = true;`

### 错误 2：`supabaseUrl is required`
**原因：** 环境变量未配置  
**解决：** 在 Vercel Settings → Environment Variables 中添加

### 错误 3：`Module not found`
**原因：** 导入路径错误  
**解决：** 检查文件路径，确保大小写匹配

### 错误 4：构建超时
**原因：** 依赖过多或网络问题  
**解决：** 优化依赖，或使用 CDN

---

## 💡 调试技巧

### 1. 查看 Vercel 函数日志

```bash
vercel logs <deployment-url>
```

### 2. 本地模拟生产环境

```bash
npm run build
npm run preview
```

### 3. 检查 Vercel 配置

```bash
vercel inspect
```

---

## 📞 联系支持

如果以上方法都无法解决：

1. **Vercel 社区**
   - https://github.com/vercel/vercel/discussions

2. **Astro 文档**
   - https://docs.astro.build/en/guides/deploy/vercel/

3. **提供支持信息**
   - Vercel 项目 URL
   - 构建日志
   - 错误截图
   - 本地是否能正常运行

---

## ✅ 验证部署成功

部署后，检查以下页面是否可访问：

- [ ] 首页：`https://your-site.vercel.app/`
- [ ] 博客列表：`https://your-site.vercel.app/articles`
- [ ] 项目列表：`https://your-site.vercel.app/projects`
- [ ] 留言板：`https://your-site.vercel.app/guestbook`
- [ ] 博客详情：`https://your-site.vercel.app/article/ai-dev-standards`
- [ ] 项目详情：`https://your-site.vercel.app/project/ai-gateway-lite`

---

##  快速部署命令

```bash
# 1. 安装 Vercel CLI（如果未安装）
npm install -g vercel

# 2. 登录
vercel login

# 3. 部署到预览环境
vercel

# 4. 部署到生产环境
vercel --prod
```

---

**祝你好运！** 🍀
