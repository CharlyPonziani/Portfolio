#!/bin/bash

# Charlie Portfolio — Push to Live
# Double-click this to publish your latest changes to the website

cd "$(dirname "$0")"

echo ""
echo "  🎵 Charlie Portfolio — Pushing to Live"
echo "  ──────────────────────────────────────"
echo ""

# Check if there's anything to push
if git diff --quiet && git diff --cached --quiet && [ -z "$(git status --porcelain)" ]; then
  echo "  ✅ Everything is already up to date. Nothing to push."
  echo ""
  echo "  (You can close this window)"
  read -p ""
  exit 0
fi

# Stage everything
git add .

# Auto-generate a commit message with timestamp
TIMESTAMP=$(date "+%B %d, %Y at %I:%M %p")
git commit -m "Site update — $TIMESTAMP"

# Push
echo "  ⏳ Publishing to GitHub..."
git push origin main

if [ $? -eq 0 ]; then
  echo ""
  echo "  ✅ Done! Your site is live."
  echo "  Netlify will finish deploying in about 1 minute."
  echo ""
  echo "  (You can close this window)"
else
  echo ""
  echo "  ❌ Something went wrong. Let Claude know and she'll fix it."
  echo ""
fi

read -p ""
