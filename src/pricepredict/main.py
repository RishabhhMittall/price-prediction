from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import pandas as pd

# Load the trained model
model = joblib.load("random_forest_player_value_predictor.pkl")

# Initialize FastAPI app
app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (for development only)
    allow_methods=["*"],  # Allow all methods
    allow_headers=["*"],  # Allow all headers
)

# Define the input data model using Pydantic
class PlayerData(BaseModel):
    short_name: str
    long_name: str
    overall: int
    potential: int
    wage_eur: int
    age: int
    height_cm: int
    weight_kg: int
    league_name: str
    club_name: str
    club_jersey_number: int
    nationality_name: str
    skill_moves: int
    pace: int
    shooting: int
    passing: int
    dribbling: int
    defending: int
    physic: int
    bmi: float
    club_position: str

# Define a route for predictions
@app.post("/predict")
def predict(player_data: PlayerData):
    try:
        # Convert input data into a DataFrame
        input_data = pd.DataFrame([player_data.dict()])
        
        # Make a prediction
        prediction = model.predict(input_data)
        
        # Return the prediction
        return {"predicted_value_eur": prediction[0]}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# Run the FastAPI app
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)