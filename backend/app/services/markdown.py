from pathlib import Path
from typing import TypedDict
import frontmatter
import markdown
import bleach

from app.config import get_settings

# Allowed HTML tags and attributes for sanitization
ALLOWED_TAGS = [
    'a', 'abbr', 'acronym', 'b', 'blockquote', 'code', 'em', 'i', 'li', 'ol',
    'pre', 'strong', 'ul', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'br',
    'span', 'div', 'table', 'thead', 'tbody', 'tr', 'th', 'td', 'img', 'hr',
]

ALLOWED_ATTRIBUTES = {
    'a': ['href', 'title', 'rel'],
    'abbr': ['title'],
    'acronym': ['title'],
    'img': ['src', 'alt', 'title'],
    'code': ['class'],  # For syntax highlighting
    'pre': ['class'],
    'span': ['class'],
    'div': ['class'],
}

ALLOWED_PROTOCOLS = ['http', 'https', 'mailto']


class ProjectFrontmatter(TypedDict):
    """Type definition for project frontmatter."""

    slug: str
    title: str
    description: str
    category: str
    tags: list[str]
    date: str
    image: str | None
    github: str | None
    demo: str | None
    featured: bool


class MarkdownService:
    """Service for parsing Markdown files with frontmatter."""

    def __init__(self):
        self.settings = get_settings()
        self.content_dir = Path(self.settings.content_dir)
        self.md = markdown.Markdown(
            extensions=["fenced_code", "tables", "toc", "meta"]
        )

    def get_projects_dir(self) -> Path:
        """Get the projects content directory."""
        return self.content_dir / "projects"

    def parse_project_file(self, file_path: Path) -> dict | None:
        """Parse a single project Markdown file."""
        if not file_path.exists():
            return None

        try:
            post = frontmatter.load(file_path)

            # Reset markdown instance for fresh parse
            self.md.reset()
            html_content = self.md.convert(post.content)

            # Sanitize HTML to prevent XSS attacks
            sanitized_html = bleach.clean(
                html_content,
                tags=ALLOWED_TAGS,
                attributes=ALLOWED_ATTRIBUTES,
                protocols=ALLOWED_PROTOCOLS,
                strip=True,
            )

            return {
                "slug": post.metadata.get("slug", file_path.stem),
                "title": post.metadata.get("title", "Untitled"),
                "description": post.metadata.get("description", ""),
                "long_description": sanitized_html,
                "category": post.metadata.get("category", "Autre"),
                "tags": post.metadata.get("tags", []),
                "date": post.metadata.get("date", ""),
                "image": post.metadata.get("image"),
                "github": post.metadata.get("github"),
                "demo": post.metadata.get("demo"),
                "featured": post.metadata.get("featured", False),
            }
        except Exception as e:
            print(f"Error parsing {file_path}: {e}")
            return None

    def get_all_projects(self) -> list[dict]:
        """Get all projects from Markdown files."""
        projects_dir = self.get_projects_dir()

        if not projects_dir.exists():
            return []

        projects = []
        for md_file in projects_dir.glob("*.md"):
            project = self.parse_project_file(md_file)
            if project:
                projects.append(project)

        # Sort by date descending
        projects.sort(key=lambda x: x.get("date", ""), reverse=True)

        return projects

    def get_project_by_slug(self, slug: str) -> dict | None:
        """Get a single project by slug."""
        # Validate slug to prevent path traversal
        if not slug or not self._is_safe_slug(slug):
            return None

        projects_dir = self.get_projects_dir()
        file_path = projects_dir / f"{slug}.md"

        # Ensure the resolved path is still within projects directory
        try:
            file_path = file_path.resolve()
            projects_dir = projects_dir.resolve()
            if not str(file_path).startswith(str(projects_dir)):
                return None
        except (OSError, ValueError):
            return None

        return self.parse_project_file(file_path)

    def _is_safe_slug(self, slug: str) -> bool:
        """
        Validate that a slug is safe and doesn't contain path traversal attempts.

        Args:
            slug: The slug to validate

        Returns:
            True if the slug is safe, False otherwise
        """
        # Only allow alphanumeric characters, hyphens, and underscores
        # This prevents path traversal attacks like "../../../etc/passwd"
        import re
        return bool(re.match(r"^[a-zA-Z0-9_-]+$", slug) and len(slug) <= 100)


# Singleton instance
markdown_service = MarkdownService()


def get_markdown_service() -> MarkdownService:
    """Dependency to get markdown service."""
    return markdown_service
