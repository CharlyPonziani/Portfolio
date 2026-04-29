import http.server
import os

PORT = int(os.environ.get("PORT", 3000))
DIRECTORY = "/Users/charlyponziani/Desktop/CLAUDE/Portfolio"

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

with http.server.HTTPServer(("", PORT), Handler) as httpd:
    print(f"Serving {DIRECTORY} on port {PORT}")
    httpd.serve_forever()
