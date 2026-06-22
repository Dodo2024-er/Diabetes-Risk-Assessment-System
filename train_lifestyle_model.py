import pandas as pd
import pickle

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

# Load dataset
df = pd.read_csv("LIfestyle and diet data for diabetes prediction.csv")

# Selected features
features = [
    "Age",
    "BMI",
    "Is anyone in your family suffering from diabetes?",
    "Do you do 30 minutes of physical exercise every day?",
    "Do you smoke/use tobacco frequently?",
    "Do you drink alcohol or other beverages frequently?",
    "Do you stay under mental stress?",
    "Do you spend more time on electronic devices?",
    "Do you sleep 7-9 hours every day?",
    "Do you always eat a balanced diet?",
    "Do you drink 3 liters of water regularly?",
    "Do you eat fast food regularly?",
    "Do you like sweet or sugary foods the most?"
]

X = df[features]
y = df["Outcome"]

# Split data
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)

# Scale
scaler = StandardScaler()

X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Train model
model = RandomForestClassifier(
    n_estimators=200,
    random_state=42
)

model.fit(X_train_scaled, y_train)

# Accuracy
predictions = model.predict(X_test_scaled)

accuracy = accuracy_score(
    y_test,
    predictions
)

print(f"Accuracy: {accuracy * 100:.2f}%")

# Save model
pickle.dump(
    model,
    open("model/lifestyle_model.pkl", "wb")
)

pickle.dump(
    scaler,
    open("model/lifestyle_scaler.pkl", "wb")
)

print("Lifestyle model saved successfully!")