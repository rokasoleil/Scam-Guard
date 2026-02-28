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
    link: str

@app.post("/details/")
async def dets(email: EmailInfo):
    print("Received email:", email.dict())
    return json.dumps({"finished": True})

