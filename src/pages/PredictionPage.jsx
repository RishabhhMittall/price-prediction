import React, { useState } from "react";

const PredictionPage = () => {
  // State to store form data
  const [formData, setFormData] = useState({
    short_name: "",
    long_name: "",
    overall: "",
    potential: "",
    wage_eur: "",
    age: "",
    height_cm: "",
    weight_kg: "",
    league_name: "",
    club_name: "",
    club_jersey_number: "",
    nationality_name: "",
    skill_moves: "",
    pace: "",
    shooting: "",
    passing: "",
    dribbling: "",
    defending: "",
    physic: "",
    bmi: "",
    club_position: "",
  });

  // State to store the predicted value
  const [predictedValue, setPredictedValue] = useState(null);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to the FastAPI backend
      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch prediction");
      }

      const data = await response.json();
      setPredictedValue(data.predicted_value_eur);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h1>Player Value Predictor</h1>
      <form onSubmit={handleSubmit}>
        {/* Add input fields for all features */}
        <label>
          Short Name:
          <input
            type="text"
            name="short_name"
            value={formData.short_name}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          Long Name:
          <input
            type="text"
            name="long_name"
            value={formData.long_name}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          Overall Rating:
          <input
            type="number"
            name="overall"
            value={formData.overall}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          Potential:
          <input
            type="number"
            name="potential"
            value={formData.potential}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          Wage (EUR):
          <input
            type="number"
            name="wage_eur"
            value={formData.wage_eur}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          Age:
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          Height (cm):
          <input
            type="number"
            name="height_cm"
            value={formData.height_cm}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          Weight (kg):
          <input
            type="number"
            name="weight_kg"
            value={formData.weight_kg}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          League Name:
          <input
            type="text"
            name="league_name"
            value={formData.league_name}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          Club Name:
          <input
            type="text"
            name="club_name"
            value={formData.club_name}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          Club Jersey Number:
          <input
            type="number"
            name="club_jersey_number"
            value={formData.club_jersey_number}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          Nationality:
          <input
            type="text"
            name="nationality_name"
            value={formData.nationality_name}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          Skill Moves:
          <input
            type="number"
            name="skill_moves"
            value={formData.skill_moves}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          Pace:
          <input
            type="number"
            name="pace"
            value={formData.pace}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          Shooting:
          <input
            type="number"
            name="shooting"
            value={formData.shooting}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          Passing:
          <input
            type="number"
            name="passing"
            value={formData.passing}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          Dribbling:
          <input
            type="number"
            name="dribbling"
            value={formData.dribbling}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          Defending:
          <input
            type="number"
            name="defending"
            value={formData.defending}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          Physic:
          <input
            type="number"
            name="physic"
            value={formData.physic}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          BMI:
          <input
            type="number"
            name="bmi"
            value={formData.bmi}
            onChange={handleInputChange}
            step="0.01"
            required
          />
        </label>
        <br />
        <label>
          Club Position:
          <input
            type="text"
            name="club_position"
            value={formData.club_position}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <button type="submit">Predict Value</button>
      </form>

      {predictedValue && (
        <h2>Predicted Value: {predictedValue} EUR</h2>
      )}
    </div>
  );
};

export default PredictionPage;