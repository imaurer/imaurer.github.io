# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is Ian Maurer's personal blog/notes website built with MkDocs Material. The site generates static HTML from Markdown files and is hosted at imaurer.com. The blog uses modern MkDocs Material features including built-in blog plugin, tags, RSS feed, and Obsidian integration.

## Development Commands

```bash
# Install/sync dependencies
make sync
# or: uv sync

# Build the site
make build  
# or: uv run mkdocs build

# Serve locally for development
make serve
# or: uv run mkdocs serve

# Deploy to GitHub Pages
make deploy
# or: uv run mkdocs gh-deploy --clean
```

## Blog Post Creation

### Create New Post
```bash
# Create a new blog post manually
make new TITLE="Your Post Title" TAGS="ai llm genomics" CATEGORIES="Technology"

# Create from Obsidian content
make obsidian POST=filename TITLE="Blog Title"
# This reads from ../jarvis_vault/blog/filename.md
```

### Post Creation Script
Use `scripts/new_post.py` directly for more options:
```bash
python scripts/new_post.py "Post Title" --obsidian post-name --tags ai llm --categories Technology
```

## Architecture

- **Build System**: Uses `uv` for Python dependency management
- **Static Site Generator**: MkDocs with Material theme ≥9.6
- **Blog Engine**: Built-in MkDocs Material blog plugin
- **Content**: Blog posts in `docs/blog/posts/` with YYYY-MM-DD-slug.md format
- **Configuration**: `mkdocs.yml` contains site settings, plugins, and theme config
- **Output**: Generated static site in `site/` directory

## Content Structure

```
docs/
├── index.md              # Homepage with blog post listings
├── about.md              # About page with Ian's bio and media
├── blog/
│   ├── posts/            # All blog posts in dated format
│   │   ├── 2024-01-08-what-is-a-custom-gpt.md
│   │   └── ...
│   └── .authors.yml      # Author profile configuration
├── images/               # Static images
├── stylesheets/
│   └── extra.css         # Custom styling
└── tags.md              # Auto-generated tags page
```

## Key Features

- **Automatic blog management**: Posts are auto-listed newest first
- **Tag system**: Automatic tag pages and organization
- **RSS feed**: Auto-generated for content syndication
- **Author profiles**: Configurable author information and avatars
- **Search**: Enhanced full-text search with technical term handling
- **Social sharing**: Open Graph and Twitter card generation
- **Responsive design**: Custom CSS for professional appearance
- **Git integration**: Last updated timestamps from git history

## Obsidian Integration

The blog integrates with Ian's Obsidian vault at `../jarvis_vault/`:

- **Source**: Posts are written in `jarvis_vault/blog/` (previously 9_Posts)
- **Conversion**: Obsidian markdown is converted to blog format
- **Front matter**: YAML metadata is preserved and enhanced
- **Links**: Obsidian-style `[[links]]` are converted to markdown
- **Workflow**: Write in Obsidian, publish via make commands

## Blog Configuration

- Material theme with custom orange accent color
- Dark/light mode toggle
- Built-in plugins: blog, tags, search, RSS, git-revision-date
- Enhanced search with technical term separators
- Social links: Twitter, GitHub, LinkedIn
- Custom CSS for professional styling
- Image lightbox with glightbox plugin

## Content Workflow

1. **Write in Obsidian**: Create content in `jarvis_vault/blog/`
2. **Publish**: Use `make obsidian POST=filename TITLE="Blog Title"`
3. **Review**: Check locally with `make serve`
4. **Deploy**: Push to main branch or use `make deploy`

The blog automatically handles:
- Post listing and pagination
- Tag organization and pages
- RSS feed generation
- Social media card creation
- Search indexing
- Last updated timestamps

## Important Implementation Notes

### Navigation
- Blog posts link back to the homepage (not a separate blog index)
- Achieved by setting `blog_dir: .` in mkdocs.yml
- Post URLs include blog/ prefix: `post_url_format: "blog/{slug}"`

### Author Avatars
- MkDocs Material uses different classes for author avatars in different contexts
- Blog post pages use `.md-post__authors .md-author img`
- Blog listing pages use `.md-blog .md-author img`
- Avatar sizing must be forced with `!important` due to theme defaults
- Use `object-fit: contain` to prevent image cropping

### Git Integration
- The `site/` directory should be in .gitignore
- Build output is generated on deployment, not tracked in repo

### Obsidian Vault Location
- Posts moved from `jarvis_vault/9_Posts/` to `jarvis_vault/blog/`
- Update `scripts/new_post.py` path when vault structure changes

### URL Structure
- Homepage (`/`) shows blog post listings
- Individual posts at `/blog/<slug>`
- No separate `/blog/` index page
- About page at `/about`