# Import necessary libraries
import pandas as pd
from sklearn.ensemble import IsolationForest
from sklearn.preprocessing import OneHotEncoder
from sklearn.impute import SimpleImputer
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline

# Load your dataset (replace 'your_data.csv' with your actual data file)
data = pd.read_csv(r'C:\Users\Kevin\Desktop\H1_Projects\react-admin\src\anomaly_detection\insurance_claims.csv')

# Features to use for anomaly detection
features = [
    'months_as_customer', 'age', 'policy_number', 'policy_bind_date', 'policy_state',
    'policy_csl', 'policy_deductable', 'policy_annual_premium', 'umbrella_limit',
    'insured_zip', 'insured_sex', 'insured_education_level', 'insured_occupation',
    'insured_hobbies', 'insured_relationship', 'capital-gains', 'capital-loss',
    'incident_date', 'incident_type', 'collision_type', 'incident_severity',
    'authorities_contacted', 'incident_state', 'incident_city', 'incident_location',
    'incident_hour_of_the_day', 'number_of_vehicles_involved', 'property_damage',
    'bodily_injuries', 'witnesses', 'police_report_available', 'total_claim_amount',
    'injury_claim', 'property_claim', 'vehicle_claim', 'auto_make', 'auto_model',
    'auto_year', 'fraud_reported'
]

# Select relevant features from the dataset
X = data[features]

# Preprocessing: Handle missing values and encode categorical variables
numeric_features = X.select_dtypes(include=['int64', 'float64']).columns.tolist()
categorical_features = X.select_dtypes(include=['object']).columns.tolist()

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
    if row['total_claim_amount'] > data['total_claim_amount'].mean() + 3 * data['total_claim_amount'].std():
        explanations.append("Total claim amount significantly higher than average.")
    if row['number_of_vehicles_involved'] > 2:
        explanations.append("Involves more than two vehicles, which is unusual.")
    # Add more conditions based on your analysis
    return '; '.join(explanations) if explanations else "No specific reason."

anomalous_data['explanation'] = anomalous_data.apply(explain_anomaly, axis=1)

# Output results
print("Detected anomalies:")
print(anomalous_data[['total_claim_amount', 'explanation']])

# Save the results for visualization in CSV format
anomalous_data.to_csv(r'C:\Users\Kevin\Desktop\H1_Projects\react-admin\src\anomaly_detection\anomalous_patients_with_explanation.csv', index=False)
