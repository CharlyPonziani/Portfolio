#!/bin/bash

# Charly Portfolio — Local Preview Server
# Double-click this file to start the preview

# Go to the folder this script lives in
cd "$(dirname "$0")"

echo ""
echo "  🎵 Charly Portfolio — Preview Server"
echo "  ─────────────────────────────────────"
echo "  Starting server..."
echo ""

# Find an open port (default 8080, fallback to 8081 etc.)
PORT=8080
while lsof -i :$PORT &>/dev/null; do
  PORT=$((PORT + 1))
done

echo "  ✅ Running at: http://localhost:$PORT"
echo ""
echo "  Press Ctrl+C in this window to stop."
echo ""

# Open browser after a short delay
(sleep 1 && open "http://localhost:$PORT") &

# Start the server
python3 -m http.server $PORT
