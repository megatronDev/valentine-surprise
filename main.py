import os
from dotenv import load_dotenv
from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
import requests
import uvicorn

load_dotenv()

app = FastAPI()

# --- CONFIGURATION ---
# 1. Create a Discord Server -> Channel Settings -> Integrations -> Webhooks
# 2. Paste the Webhook URL below
DISCORD_WEBHOOK_URL = os.getenv("DISCORD_WEBHOOK_URL")

# Mount the static folder to serve CSS, JS, and Images
app.mount("/static", StaticFiles(directory="static"), name="static")

# Setup templates
templates = Jinja2Templates(directory="templates")

@app.get("/", response_class=HTMLResponse)
async def read_item(request: Request):
    # Render the index.html file
    return templates.TemplateResponse("index.html", {"request": request})

@app.post("/she-said-yes")
async def she_said_yes():
    # Send notification to Discord
    print("She said yes! Sending notification...")
    try:
        data = {
            "content": "💖 **SHE SAID YES!** 💖\nCongratulations! The button was clicked."
        }
        requests.post(DISCORD_WEBHOOK_URL, json=data)
        return {"success": True}
    except Exception as e:
        print(f"Error sending notification: {e}")
        return {"success": False}

if __name__ == "__main__":
    # Run using: python main.py
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)