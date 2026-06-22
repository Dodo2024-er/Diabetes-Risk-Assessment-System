from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np

app = Flask(__name__)
CORS(app)

# Load trained model and scaler
model = pickle.load(open("model/diabetes_model.pkl", "rb"))
scaler = pickle.load(open("model/scaler.pkl", "rb"))
lifestyle_model = pickle.load(
    open("model/lifestyle_model.pkl", "rb")
)

lifestyle_scaler = pickle.load(
    open("model/lifestyle_scaler.pkl", "rb")
) 


@app.route('/')
def home():
    return """
    <h1>🩺 Diabetes Prediction API</h1>
    <p>API is running successfully!</p>
    <p>Use POST request on <b>/predict</b></p>
    """


@app.route('/predict-lifestyle', methods=['POST'])
def predict_lifestyle():
    try:
        data = request.get_json()

        features = np.array([[
            data['Age'],
            data['BMI'],
            data['FamilyHistory'],
            data['Exercise'],
            data['Smoking'],
            data['Alcohol'],
            data['Stress'],
            data['ScreenTime'],
            data['Sleep'],
            data['BalancedDiet'],
            data['WaterIntake'],
            data['FastFood'],
            data['SugaryFoods']
        ]])

        scaled_features = lifestyle_scaler.transform(features)

        prediction = lifestyle_model.predict(
            scaled_features
        )[0]

        probability = lifestyle_model.predict_proba(
            scaled_features
        )[0]

        confidence = round(
            max(probability) * 100,
            2
        )

        result = (
            "High Risk"
            if prediction == 1
            else "Low Risk"
        )

        return jsonify({
            "success": True,
            "prediction": result,
            "confidence": confidence
        })

    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        })


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)