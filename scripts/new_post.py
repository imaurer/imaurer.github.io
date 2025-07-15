#!/usr/bin/env python3
"""
Create a new blog post from Obsidian content or manually.
"""

import argparse
import datetime
import pathlib
import re
import subprocess
import sys
from typing import Optional


def slug_from_title(title: str) -> str:
    """Convert title to URL-friendly slug."""
    return re.sub(r'[^a-z0-9]+', '-', title.lower()).strip('-')


def extract_front_matter(content: str) -> tuple[dict, str]:
    """Extract YAML front matter from markdown content."""
    front_matter = {}
    body = content
    
    if content.startswith('---\n'):
        try:
            _, fm_content, body = content.split('---\n', 2)
            # Simple YAML parsing for our use case
            for line in fm_content.strip().split('\n'):
                if ':' in line:
                    key, value = line.split(':', 1)
                    key = key.strip()
                    value = value.strip().strip('"\'')
                    if key in ['tags', 'categories']:
                        # Handle lists
                        if value.startswith('[') and value.endswith(']'):
                            value = [item.strip().strip('"\'') for item in value[1:-1].split(',') if item.strip()]
                    front_matter[key] = value
        except ValueError:
            # If parsing fails, treat as regular content
            pass
    
    return front_matter, body


def read_obsidian_post(post_path: str) -> Optional[tuple[dict, str]]:
    """Read a post from the Obsidian vault."""
    obsidian_path = pathlib.Path("../jarvis_vault/blog") / f"{post_path}.md"
    
    if not obsidian_path.exists():
        print(f"Post not found: {obsidian_path}")
        return None
    
    content = obsidian_path.read_text(encoding='utf-8')
    return extract_front_matter(content)


def convert_obsidian_links(content: str) -> str:
    """Convert Obsidian-style [[links]] to markdown links."""
    # Simple conversion - could be enhanced for more complex cases
    content = re.sub(r'\[\[([^\]]+)\]\]', r'[\1](\1)', content)
    return content


def create_blog_post(title: str, content: str = "", tags: list = None, categories: list = None, 
                    date: str = None, obsidian_meta: dict = None) -> pathlib.Path:
    """Create a new blog post file."""
    if date is None:
        date = datetime.date.today().isoformat()
    
    slug = slug_from_title(title)
    post_path = pathlib.Path("docs/blog/posts") / f"{date}-{slug}.md"
    
    # Ensure directory exists
    post_path.parent.mkdir(parents=True, exist_ok=True)
    
    # Prepare front matter
    front_matter = {
        'date': date,
        'categories': categories or ['Blog'],
        'tags': tags or [],
        'authors': ['imaurer']
    }
    
    # Override with Obsidian metadata if available
    if obsidian_meta:
        front_matter.update(obsidian_meta)
        # Ensure required fields
        front_matter['date'] = date
        front_matter['authors'] = ['imaurer']
    
    # Build front matter YAML
    fm_lines = ['---']
    for key, value in front_matter.items():
        if isinstance(value, list):
            if value:  # Only include non-empty lists
                fm_lines.append(f"{key}: {value}")
            else:
                fm_lines.append(f"{key}: []")
        else:
            fm_lines.append(f"{key}: {value}")
    fm_lines.append('---')
    fm_lines.append('')
    
    # Prepare content
    if not content.startswith('#'):
        content = f"# {title}\n\n{content}"
    
    # Convert Obsidian links
    content = convert_obsidian_links(content)
    
    # Write the file
    full_content = '\n'.join(fm_lines) + content
    post_path.write_text(full_content, encoding='utf-8')
    
    return post_path


def main():
    parser = argparse.ArgumentParser(description='Create a new blog post')
    parser.add_argument('title', help='Post title')
    parser.add_argument('--obsidian', '-o', help='Read content from Obsidian vault (blog folder)')
    parser.add_argument('--tags', '-t', nargs='*', help='Post tags')
    parser.add_argument('--categories', '-c', nargs='*', help='Post categories')
    parser.add_argument('--date', '-d', help='Post date (YYYY-MM-DD)')
    parser.add_argument('--no-git', action='store_true', help='Do not add to git')
    
    args = parser.parse_args()
    
    content = ""
    obsidian_meta = {}
    
    if args.obsidian:
        result = read_obsidian_post(args.obsidian)
        if result is None:
            sys.exit(1)
        obsidian_meta, content = result
        print(f"Read content from Obsidian: {args.obsidian}")
    
    # Create the post
    post_path = create_blog_post(
        title=args.title,
        content=content,
        tags=args.tags,
        categories=args.categories,
        date=args.date,
        obsidian_meta=obsidian_meta
    )
    
    print(f"Created: {post_path}")
    
    # Add to git unless disabled
    if not args.no_git:
        try:
            subprocess.run(["git", "add", str(post_path)], check=True)
            print(f"Added to git: {post_path}")
        except subprocess.CalledProcessError:
            print("Warning: Could not add to git")


if __name__ == "__main__":
    main()