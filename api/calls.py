import json
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For development only
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class EmailInfo(BaseModel):
    sender: str
    subject: str
    body: str

@app.post("/details/")
async def dets(email: EmailInfo):
    print("Received email:", email.dict())
    # Do Checks

    return json.dumps({"score": 55, "level": "suspicious", "headline": "Headline here", "reasons": ["Urgent language detected", "Link looks unusual"], "hostname": "google.ca", "final_url": "goolpe.zy"})

