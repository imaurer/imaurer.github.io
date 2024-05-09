ACTIVATE = . ./activate.sh

sync:
	uv pip install -r requirements-doc.txt

build:
	$(ACTIVATE) && mkdocs build

serve:
	$(ACTIVATE) && mkdocs serve
