import os
import webbrowser
import http.server
import socketserver

PORT = 8080

print(f"Starting server on port {PORT}...")
print(f"Open your browser and go to http://localhost:{PORT}")

# Change to project directory
os.chdir(os.path.dirname(os.path.abspath(__file__)))

# Start the server
Handler = http.server.SimpleHTTPRequestHandler
with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print("Server started!")
    # Open browser
    webbrowser.open(f'http://localhost:{PORT}')
    httpd.serve_forever()
