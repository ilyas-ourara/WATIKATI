# backend/main.py
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from smolagents import OpenAIServerModel
import json

# 🔑 Clé API Gemini
API_KEY = "AIzaSyBdSPjy1c-CEAb7kVz0GM57zhtIhFtqkwo"

# ✅ Création du modèle via smolagents
model = OpenAIServerModel(
    model_id="gemini-2.0-flash",
    api_base="https://generativelanguage.googleapis.com/v1beta",
    api_key=API_KEY,
)

# ✅ Application FastAPI
app = FastAPI()

# ✅ Autoriser les requêtes depuis le frontend local
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # remplace "*" par l’URL du frontend si nécessaire
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Modèle de la requête JSON
class Message(BaseModel):
    history: list  # [{"role": "user", "content": "..."}]
    user_input: str

# ✅ Chargement des démarches
def load_demarches(path="data.json"):
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)

# ✅ Formatage du contexte
def format_demarches_for_prompt(data):
    formatted = ""
    for entry in data["المساطر المتوفرة"]:
        nom = entry["المسطرة"]
        docs = "\n".join(f"- {doc}" for doc in entry["الوثائق المطلوبة"])
        formatted += f"\nDémarche: {nom}\nDocuments requis:\n{docs}\n"
    return formatted

# ✅ Initialisation du message système
data = load_demarches()
base_texte = format_demarches_for_prompt(data)
system_message = {
    "role": "system",
    "content": f"""
Tu es un agent administratif marocain intelligent. Voici les démarches disponibles et les documents associés :

{base_texte}

Tu dois :
1. Identifier la démarche concernée par la demande.
2. Demander des infos manquantes (âge, résidence, statut...).
3. Répondre uniquement en darija(arabic), de façon claire et concise.
"""
}

# ✅ Endpoint pour le chat
@app.post("/chat")
def chat_with_bot(payload: Message):
    # Construire l’historique complet
    messages = [system_message] + payload.history + [{"role": "user", "content": payload.user_input}]
    response = model.client.chat.completions.create(
        model=model.model_id,
        messages=messages,
    )
    reply = response.choices[0].message.content
    return {"reply": reply}
