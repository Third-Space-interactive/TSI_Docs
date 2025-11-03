# Third Space Interactive Documentation

Welcome to the documentation site for Third Space Interactive's Unreal Engine templates!

## Project Structure

```
tsi-docs/
├── docs/                          # Documentation content
│   ├── intro.md                   # Landing page
│   └── archviz-navigation/        # ArchViz Navigation Template docs
│       ├── index.md               # Template overview
│       ├── basic-navigation/      # Basic navigation guides
│       ├── advanced-navigation/   # Advanced navigation guides
│       ├── selection-system/      # Selection system docs
│       └── post-processing-setup.md
├── src/                           # React components and theme
├── static/                        # Static assets (images, etc.)
├── docusaurus.config.ts           # Main configuration
├── sidebars.ts                    # Sidebar navigation structure
├── vercel.json                    # Vercel deployment config
├── netlify.toml                   # Netlify deployment config
└── DEPLOYMENT.md                  # Full deployment guide
```

## Local Development

### Prerequisites

- Node.js version 20.0 or above

### Start Development Server

```bash
cd tsi-docs
npm start
```

This opens `http://localhost:3000` in your browser. The site auto-reloads when you make changes.

### Build for Production

```bash
npm run build
```

This creates a `build` folder with the production-ready static site.

### Test Production Build Locally

```bash
npm run serve
```

## Adding New Documentation

### Add a New Page

1. Create a markdown file in the appropriate folder under `docs/`
2. Add frontmatter with metadata:

```markdown
---
sidebar_position: 1
title: Page Title
---

# Page Title

Your content here...
```

3. Update `sidebars.ts` to include your new page in the navigation

### Add a New Template

1. Create a new folder under `docs/` (e.g., `docs/new-template/`)
2. Add an `index.md` with the template overview
3. Create subfolders for different sections
4. Update `sidebars.ts` to add the new template category

### Example Sidebar Entry

```typescript
{
  type: 'category',
  label: 'Your Template Name',
  collapsed: false,
  items: [
    'your-template/index',
    {
      type: 'category',
      label: 'Setup',
      items: [
        'your-template/setup/installation',
        'your-template/setup/configuration',
      ],
    },
  ],
}
```

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for comprehensive deployment instructions for:
- Vercel (recommended)
- Netlify
- Self-hosted options

### Quick Deploy to Vercel

```bash
# Push to GitHub
git init
git add .
git commit -m "Initial commit"
git push -u origin main

# Then deploy via Vercel dashboard
# 1. Visit vercel.com
# 2. Import your repository
# 3. Add custom domain: docs.thirdspaceinteractive.ca
# 4. Add CNAME record in your DNS
```

## Configuration

### Update Site Information

Edit `docusaurus.config.ts`:

```typescript
const config: Config = {
  title: 'Your Site Title',
  tagline: 'Your tagline',
  url: 'https://docs.yourdomain.com',
  // ... more config
};
```

### Customize Theme

Edit `src/css/custom.css` to customize colors and styles.

### Add Logo

Replace `static/img/logo.svg` with your own logo.

## Useful Commands

| Command | Description |
|---------|-------------|
| `npm start` | Start development server |
| `npm run build` | Build production site |
| `npm run serve` | Serve production build locally |
| `npm run clear` | Clear Docusaurus cache |
| `npm run deploy` | Deploy to GitHub Pages (if configured) |

## Documentation Resources

- [Docusaurus Documentation](https://docusaurus.io)
- [Markdown Guide](https://docusaurus.io/docs/markdown-features)
- [Deployment Guide](./DEPLOYMENT.md)

## Support

For questions or issues, visit [thirdspaceinteractive.ca](https://thirdspaceinteractive.ca)

---

Built with [Docusaurus](https://docusaurus.io/)
