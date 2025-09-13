#!/usr/bin/env bash
set -e

# Railway provides $PORT. Default to 8080 if missing (local runs).
PORT="${PORT:-8080}"

# Start FastAPI with Uvicorn.
# If your app module isn’t "main:app", we’ll adjust this in the next step.
exec uvicorn main:app --host 0.0.0.0 --port "$PORT"
