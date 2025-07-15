sync:
	uv sync

build:
	PKG_CONFIG_PATH="/opt/homebrew/lib/pkgconfig:/opt/homebrew/opt/libffi/lib/pkgconfig:$$PKG_CONFIG_PATH" \
	DYLD_FALLBACK_LIBRARY_PATH="/opt/homebrew/lib:/opt/homebrew/opt/cairo/lib" \
	uv run mkdocs build

serve:
	PKG_CONFIG_PATH="/opt/homebrew/lib/pkgconfig:/opt/homebrew/opt/libffi/lib/pkgconfig:$$PKG_CONFIG_PATH" \
	DYLD_FALLBACK_LIBRARY_PATH="/opt/homebrew/lib:/opt/homebrew/opt/cairo/lib" \
	uv run mkdocs serve

deploy:
	uv run mkdocs gh-deploy --clean

new:
	@if [ -z "$(TITLE)" ]; then \
		echo "Usage: make new TITLE=\"Your Post Title\" [OBSIDIAN=post-name] [TAGS=\"tag1 tag2\"]"; \
		exit 1; \
	fi
	@python scripts/new_post.py "$(TITLE)" \
		$(if $(OBSIDIAN),--obsidian "$(OBSIDIAN)") \
		$(if $(TAGS),--tags $(TAGS)) \
		$(if $(CATEGORIES),--categories $(CATEGORIES)) \
		$(if $(DATE),--date "$(DATE)")

# Create post from Obsidian content
obsidian:
	@if [ -z "$(POST)" ]; then \
		echo "Usage: make obsidian POST=filename TITLE=\"Blog Title\""; \
		echo "This reads from ../jarvis_vault/9_Posts/filename.md"; \
		exit 1; \
	fi
	@if [ -z "$(TITLE)" ]; then \
		echo "Usage: make obsidian POST=filename TITLE=\"Blog Title\""; \
		exit 1; \
	fi
	@python scripts/new_post.py "$(TITLE)" --obsidian "$(POST)"
