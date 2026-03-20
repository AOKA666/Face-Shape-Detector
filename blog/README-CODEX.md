# Blog Import Pack for Codex

把 `blog/` 目录下的 8 篇 markdown 文章接入网站。

## 目标

1. 每篇文章生成独立页面
2. URL 使用 front matter 里的 `slug`
3. 页面 `<title>` 和 meta description 使用 front matter
4. 所有文章加入 blog 列表页
5. 每篇文章底部增加推荐阅读模块
6. 每篇文章正文里保留 markdown 标题结构
7. 文章页 canonical 必须是当前文章自己的 URL，不要指向首页
8. article 页面必须可被 sitemap 收录

## 推荐 URL 结构

- `/blog/how-to-tell-your-face-shape-from-a-selfie`
- `/blog/what-face-shape-do-i-have-a-simple-step-by-step-guide`
- `/blog/best-glasses-for-your-face-shape`
- `/blog/best-hairstyles-for-round-face-shape`
- `/blog/best-hairstyles-for-square-face-shape`
- `/blog/best-hairstyles-for-oval-face-shape`
- `/blog/best-beard-styles-for-your-face-shape`
- `/blog/how-accurate-are-ai-face-shape-detectors`

## 推荐阅读模块

在每篇文章底部渲染 3~4 篇相关文章，优先使用下面这组关系：

### how-to-tell-your-face-shape-from-a-selfie
- what-face-shape-do-i-have-a-simple-step-by-step-guide
- how-accurate-are-ai-face-shape-detectors
- best-glasses-for-your-face-shape

### what-face-shape-do-i-have-a-simple-step-by-step-guide
- how-to-tell-your-face-shape-from-a-selfie
- how-accurate-are-ai-face-shape-detectors
- best-hairstyles-for-round-face-shape
- best-hairstyles-for-square-face-shape

### best-glasses-for-your-face-shape
- what-face-shape-do-i-have-a-simple-step-by-step-guide
- how-to-tell-your-face-shape-from-a-selfie
- best-hairstyles-for-oval-face-shape

### best-hairstyles-for-round-face-shape
- what-face-shape-do-i-have-a-simple-step-by-step-guide
- best-glasses-for-your-face-shape
- best-hairstyles-for-square-face-shape

### best-hairstyles-for-square-face-shape
- what-face-shape-do-i-have-a-simple-step-by-step-guide
- best-glasses-for-your-face-shape
- best-hairstyles-for-oval-face-shape

### best-hairstyles-for-oval-face-shape
- what-face-shape-do-i-have-a-simple-step-by-step-guide
- best-glasses-for-your-face-shape
- best-hairstyles-for-square-face-shape

### best-beard-styles-for-your-face-shape
- what-face-shape-do-i-have-a-simple-step-by-step-guide
- best-glasses-for-your-face-shape
- how-to-tell-your-face-shape-from-a-selfie

### how-accurate-are-ai-face-shape-detectors
- how-to-tell-your-face-shape-from-a-selfie
- what-face-shape-do-i-have-a-simple-step-by-step-guide
- best-glasses-for-your-face-shape

## 必改 SEO 项

1. 每篇文章 page title 唯一
2. 每篇文章 meta description 唯一
3. 每篇文章 canonical self-referencing
4. blog 列表页 `/blog` 必须返回 200，不要再 404
5. blog 列表页要链接到全部文章
6. sitemap.xml 里加入全部 blog URL
7. 不要把文章 canonical 指向首页

## 推荐文章卡片字段

- title
- description
- slug
- date
- reading time（可自动生成）
- related posts（可按上面映射写死，后面再改成自动）

## 当前文件

- `how-to-tell-your-face-shape-from-a-selfie.md`
- `what-face-shape-do-i-have-a-simple-step-by-step-guide.md`
- `best-glasses-for-your-face-shape.md`
- `best-hairstyles-for-round-face-shape.md`
- `best-hairstyles-for-square-face-shape.md`
- `best-hairstyles-for-oval-face-shape.md`
- `best-beard-styles-for-your-face-shape.md`
- `how-accurate-are-ai-face-shape-detectors.md`

## 备注

如果站点支持 MDX，可以后续再补：
- FAQ schema
- Article schema
- TOC
- Author block
- CTA to face shape detector tool

当前这版先以“快速上线可收录”为第一目标。
