
import { useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";

function App() {
  const [formData, setFormData] = useState({
    Pregnancies: "",
    Glucose: "",
    BloodPressure: "",
    SkinThickness: "",
    Insulin: "",
    BMI: "",
    DiabetesPedigreeFunction: "",
    Age: "",
  });

  const [result, setResult] = useState(null);

  const [history, setHistory] = useState(() => {
  try {
    const saved = localStorage.getItem("predictionHistory");
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
});

  const labels = {
    Pregnancies: "Pregnancies",
    Glucose: "Glucose Level",
    BloodPressure: "Blood Pressure",
    SkinThickness: "Skin Thickness",
    Insulin: "Insulin Level",
    BMI: "Body Mass Index (BMI)",
    DiabetesPedigreeFunction: "Family History Score",
    Age: "Age",
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: Number(e.target.value),
    });
  };

  const predict = async () => {

// Validation Checks
if (
Object.values(formData).some(
(value) => value === "" || value === null
)
) {
alert("❌ Please fill all fields.");
return;
}

if (formData.Age < 1 || formData.Age > 120) {
alert("❌ Please enter a valid Age (1 - 120).");
return;
}

if (formData.BMI < 10 || formData.BMI > 70) {
alert("❌ Please enter a valid BMI (10 - 70).");
return;
}

if (formData.Glucose < 0 || formData.Glucose > 400) {
alert("❌ Please enter a valid Glucose value.");
return;
}

if (
formData.BloodPressure < 20 ||
formData.BloodPressure > 250
) {
alert("❌ Please enter a valid Blood Pressure.");
return;
}

if (
formData.Pregnancies < 0 ||
formData.Pregnancies > 20
) {
alert("❌ Please enter a valid Pregnancies count.");
return;
}

try {
const response = await axios.post(
"https://diabetes-api-8tbz.onrender.com/predict",
formData
);

```
setResult(response.data);

const newPrediction = {
  date: new Date().toLocaleString(),
  prediction: response.data.prediction,
  confidence: response.data.confidence,
};

const updatedHistory = [newPrediction, ...history];

setHistory(updatedHistory);

localStorage.setItem(
  "predictionHistory",
  JSON.stringify(updatedHistory)
);
```

} catch (error) {
  console.error("FULL ERROR:", error);

  if (error.response) {
    console.log(error.response.data);
  }

  alert(
    "Prediction Failed: " +
    (error.response?.data?.error || error.message)
  );
}
};


  const getRiskLevel = () => {
    if (!result) return "";

    return result.prediction === "Diabetic"
      ? "🔴 HIGH RISK"
      : "🟢 LOW RISK";
  };

  const clearHistory = () => {
    localStorage.removeItem("predictionHistory");
    setHistory([]);
  };

  const downloadPDF = () => {
    if (!result) return;

    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("Diabetes Risk Assessment Report", 20, 20);

    doc.setFontSize(12);

    doc.text(`Prediction: ${result.prediction}`, 20, 40);
    doc.text(`Risk Level: ${getRiskLevel()}`, 20, 50);
    doc.text(`Confidence Score: ${result.confidence}%`, 20, 60);

    doc.text("Patient Information", 20, 80);

    let y = 90;

    Object.entries(formData).forEach(([key, value]) => {
      doc.text(`${labels[key]}: ${value}`, 20, y);
      y += 10;
    });

    y += 10;

    doc.text("Recommendation:", 20, y);

    y += 10;

    doc.text(
      "Maintain a balanced diet, exercise regularly, monitor glucose levels, avoid excessive sugar intake, stay hydrated and consult a healthcare professional.",
      20,
      y,
      {
        maxWidth: 160,
      }
    );

    doc.save("Diabetes_Report.pdf");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-6xl mx-auto px-6 py-10">

        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold">
            🩺 Diabetes Risk Assessment
          </h1>

          <p className="text-slate-400 mt-3">
            AI Powered Healthcare Prediction System
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">

          {/* Form */}
          <div className="bg-slate-900 p-6 rounded-2xl shadow-lg">

            <h2 className="text-2xl font-semibold mb-6">
              Patient Information
            </h2>

            {Object.keys(formData).map((key) => (
              <div key={key} className="mb-4">

                <label className="block mb-2 text-slate-300">
                  {labels[key]}
                </label>

                <input
                  type="number"
                  name={key}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 focus:border-blue-500 focus:outline-none"
                />

              </div>
            ))}

            <button
              onClick={predict}
              className="w-full mt-4 bg-blue-600 hover:bg-blue-700 transition p-3 rounded-lg font-semibold"
            >
              Predict Risk
            </button>

          </div>

          {/* Result */}
          <div className="bg-slate-900 p-6 rounded-2xl shadow-lg">

            <h2 className="text-2xl font-semibold mb-6">
              Prediction Result
            </h2>

            {!result ? (
              <div className="text-slate-400">
                Enter patient details and click Predict.
              </div>
            ) : (
              <>
                <div
                  className={`p-4 rounded-xl mb-6 ${
                    result.prediction === "Diabetic"
                      ? "bg-red-900 border border-red-500"
                      : "bg-green-900 border border-green-500"
                  }`}
                >
                  <p className="text-sm opacity-80">
                    Prediction
                  </p>

                  <h3 className="text-4xl font-bold mt-2">
                    {result.prediction}
                  </h3>

                  <p className="mt-3 text-lg font-semibold">
                    {getRiskLevel()}
                  </p>
                </div>

                <div className="mb-6">

                  <span className="text-slate-400">
                    Confidence Score
                  </span>

                  <h3 className="text-3xl font-bold mt-2 mb-3">
                    {result.confidence}%
                  </h3>

                  <div className="w-full bg-slate-700 rounded-full h-4">
                    <div
                      className={`h-4 rounded-full ${
                        result.prediction === "Diabetic"
                          ? "bg-red-500"
                          : "bg-green-500"
                      }`}
                      style={{
                        width: `${result.confidence}%`,
                      }}
                    />
                  </div>

                </div>

                <div className="mt-6 p-4 bg-slate-800 rounded-lg">

                  <h4 className="font-semibold mb-2">
                    Health Recommendation
                  </h4>

                  <p className="text-slate-300">
                    Maintain a balanced diet, exercise regularly,
                    monitor glucose levels, avoid excessive sugar,
                    stay hydrated, get adequate sleep, and consult
                    a healthcare professional.
                  </p>

                </div>

                <button
                  onClick={downloadPDF}
                  className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700 transition p-3 rounded-lg font-semibold"
                >
                  📄 Download Report
                </button>

              </>
            )}

          </div>

        </div>

        {/* History Dashboard */}
        <div className="mt-10 bg-slate-900 p-6 rounded-2xl shadow-lg">

          <div className="flex justify-between items-center mb-6">

            <h2 className="text-2xl font-semibold">
              📊 Prediction History
            </h2>

            <button
              onClick={clearHistory}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg"
            >
              Clear History
            </button>

          </div>

          {history.length === 0 ? (
            <p className="text-slate-400">
              No predictions yet.
            </p>
          ) : (
            <div className="overflow-x-auto">

              <table className="w-full text-left">

                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="py-3">Date</th>
                    <th>Prediction</th>
                    <th>Confidence</th>
                  </tr>
                </thead>

                <tbody>
                  {history.map((item, index) => (
                    <tr
                      key={index}
                      className="border-b border-slate-800"
                    >
                      <td className="py-3">
                        {item.date}
                      </td>

                      <td>
                        {item.prediction}
                      </td>

                      <td>
                        {item.confidence}%
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}

export default App;

