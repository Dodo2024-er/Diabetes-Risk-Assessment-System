# 🩺 Diabetes Risk Assessment System

An AI-powered healthcare prediction system that assesses the risk of diabetes using Machine Learning. The application allows users to enter health-related parameters, receive instant predictions, view confidence scores, download PDF reports, and track previous assessments.

## 🚀 Live Demo

Frontend: [Add Your Vercel Link Here]

Backend API: [Add Your Render API Link Here]

---

## 📌 Features

✅ Diabetes Risk Prediction using Machine Learning

✅ Real-time Prediction via Flask REST API

✅ User-friendly React Interface

✅ Input Validation for Accurate Data Entry

✅ Confidence Score Display

✅ PDF Report Generation

✅ Prediction History Dashboard

✅ Local Storage Support

✅ Responsive Design

✅ Cloud Deployment (Vercel + Render)

---

## 🧠 Machine Learning Model

The prediction model was trained using the Pima Indians Diabetes Dataset.

### Input Parameters

* Pregnancies
* Glucose Level
* Blood Pressure
* Skin Thickness
* Insulin Level
* BMI (Body Mass Index)
* Family Diabetes History
* Age

### Output

* Diabetic
* Not Diabetic

Along with a confidence score.

---

## 🏗️ Project Architecture

Frontend (React.js)
⬇
Flask REST API
⬇
Machine Learning Model (Scikit-Learn)
⬇
Prediction Response

---

## 🛠️ Tech Stack

### Frontend

* React.js
* JavaScript
* HTML5
* CSS3
* Axios
* jsPDF

### Backend

* Flask
* Flask-CORS
* NumPy

### Machine Learning

* Scikit-Learn
* Pandas
* NumPy

### Deployment

* Vercel (Frontend)
* Render (Backend)

---

## 📄 PDF Report

After prediction, users can generate and download a PDF report containing:

* Prediction Result
* Confidence Score
* Risk Level
* Patient Information
* Health Recommendations

---

## 📊 Prediction History

The application stores previous predictions locally in the browser using Local Storage, allowing users to review their past assessments.

---

## 🔒 Input Validation

The system validates:

* Empty Fields
* Invalid Age Values
* Invalid BMI Values
* Invalid Blood Pressure Values
* Invalid Glucose Values
* Invalid Pregnancy Counts

This helps prevent incorrect or unrealistic inputs.

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/Diabetes-Risk-Assessment-System.git
cd Diabetes-Risk-Assessment-System
```

### Backend Setup

```bash
pip install -r requirements.txt
python app.py
```

Backend runs on:

```bash
http://localhost:5000
```

### Frontend Setup

```bash
cd diabetes-frontend
npm install
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

## 📁 Project Structure

```text
Diabetes-Risk-Assessment-System
│
├── diabetes-frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── model/
│   ├── diabetes_model.pkl
│   └── scaler.pkl
│
├── app.py
├── requirements.txt
├── diabetesdata.csv
├── README.md
└── train_model.py
```

---

## ⚠️ Disclaimer

This application is intended for educational and preliminary risk assessment purposes only.

It should not be used as a substitute for professional medical diagnosis, treatment, or healthcare advice.

Always consult a qualified healthcare professional for medical decisions.

---

## 👨‍💻 Author

Apurva Thorat

BE Computer Science Engineering (Artificial Intelligence & Machine Learning)

Mumbai University

GitHub: https://github.com/Dodo2024-er
