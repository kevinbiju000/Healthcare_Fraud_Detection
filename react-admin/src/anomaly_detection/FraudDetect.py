# Import necessary libraries
import pandas as pd
from sklearn.ensemble import IsolationForest
from sklearn.preprocessing import OneHotEncoder
from sklearn.impute import SimpleImputer
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline

# Load your dataset
data = pd.read_csv(r'C:\Users\Kevin\Desktop\H1_Projects\react-admin\src\anomaly_detection\healthcare_dataset.csv')

# Features to use for anomaly detection
features = [
    'Name', 'Age', 'Gender', 'Blood Type', 'Medical Condition', 'Date of Admission',
    'Doctor', 'Hospital', 'Insurance Provider', 'Billing Amount', 'Room Number',
    'Admission Type', 'Discharge Date', 'Medication', 'Test Results'
]

# Select relevant features from the dataset
X = data[features]

# Convert date features to datetime format
X['Date of Admission'] = pd.to_datetime(X['Date of Admission'], errors='coerce')
X['Discharge Date'] = pd.to_datetime(X['Discharge Date'], errors='coerce')

# Preprocessing: Handle missing values and encode categorical variables
numeric_features = X.select_dtypes(include=['int64', 'float64']).columns.tolist()
categorical_features = X.select_dtypes(include=['object']).columns.tolist()

# Adjust features like 'Billing Amount' or 'Room Number' if they are stored as strings
if 'Billing Amount' in categorical_features:
    X['Billing Amount'] = pd.to_numeric(X['Billing Amount'], errors='coerce')
    numeric_features.append('Billing Amount')
    categorical_features.remove('Billing Amount')

# Define preprocessing steps
numeric_transformer = Pipeline(steps=[
    ('imputer', SimpleImputer(strategy='median'))  # Impute missing values with median
])

categorical_transformer = Pipeline(steps=[
    ('imputer', SimpleImputer(strategy='most_frequent')),  # Impute missing values with the most frequent value
    ('onehot', OneHotEncoder(handle_unknown='ignore'))  # One-hot encode categorical variables
])

# Combine preprocessing steps
preprocessor = ColumnTransformer(
    transformers=[
        ('num', numeric_transformer, numeric_features),
        ('cat', categorical_transformer, categorical_features)
    ])

# Create a preprocessing and model pipeline
pipeline = Pipeline(steps=[
    ('preprocessor', preprocessor),
    ('model', IsolationForest(contamination=0.05, random_state=42))  # Adjust contamination based on your needs
])

# Fit the model
pipeline.fit(X)

# Predict anomalies (-1 indicates an anomaly, 1 indicates normal)
data['anomaly'] = pipeline.predict(X)

# Separate normal and anomalous data for visualization
normal_data = data[data['anomaly'] == 1]
anomalous_data = data[data['anomaly'] == -1]

# Add a description for why they are anomalies
def explain_anomaly(row):
    explanations = []
    if row['Billing Amount'] > data['Billing Amount'].mean() + 3 * data['Billing Amount'].std():
        explanations.append("Billing amount significantly higher than average.")
    if (pd.to_datetime(row['Discharge Date']) - pd.to_datetime(row['Date of Admission'])).days > 30:
        explanations.append("Long duration of hospital stay.")
    # Add more conditions based on your analysis
    return '; '.join(explanations) if explanations else "No specific reason."

anomalous_data['explanation'] = anomalous_data.apply(explain_anomaly, axis=1)

# Output results
print("Detected anomalies:")
print(anomalous_data[['Billing Amount', 'explanation']])

# Save the results for visualization in CSV format
anomalous_data.to_csv(r'C:\Users\Kevin\Desktop\H1_Projects\react-admin\src\anomaly_detection\anomalous_patients_with_explanation.csv', index=False)
