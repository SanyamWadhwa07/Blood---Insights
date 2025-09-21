
import pdfplumber
from werkzeug.utils import secure_filename
from flask import Flask, request, jsonify, session
from flask_cors import CORS
import os
import secrets
from dotenv import load_dotenv
from recommendation_utils import generate_diet_recommendations

secret_key = secrets.token_hex(16)

load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '.env'))
app = Flask(__name__)
CORS(app)
app.secret_key = secret_key


@app.route('/')
def home():
    return "Blood Insights API is running."


@app.route('/submit', methods=['POST'])
def submit():
    try:
        data = request.json
        inputs = data.get('inputs', {})

        address = inputs.get('address', "faridabad, haryana")  # Default address if not provided

        print(f"Received inputs: {inputs}")

        session['inputs'] = inputs

        recommendations = generate_diet_recommendations(inputs)

        print(recommendations)
        return jsonify({"message": "Form submitted successfully", "data": inputs, "recommendations": recommendations})
    except Exception as e:
        import traceback
        print('Error in /submit:', e)
        traceback.print_exc()
        return jsonify({"error": str(e)}), 400

@app.route('/extract-pdf', methods=['POST'])
def extract_pdf():
    try:
        if 'file' not in request.files:
            return jsonify({'error': 'No file part in the request'}), 400
        file = request.files['file']
        if file.filename == '':
            return jsonify({'error': 'No selected file'}), 400

        import tempfile
        filename = secure_filename(file.filename)
        with tempfile.NamedTemporaryFile(delete=False, suffix=os.path.splitext(filename)[1]) as tmp:
            file.save(tmp.name)
            temp_path = tmp.name

        extracted = {}
        with pdfplumber.open(temp_path) as pdf:
            for page in pdf.pages:
                text = page.extract_text()
                if text:
                    # Simple extraction: look for lines with known test names
                    for line in text.split('\n'):
                        for key in [
                            'Haemoglobin', 'RBC Count', 'Total WBC Count', 'Platelet Count',
                            'Packed Cell Volume', 'Mean Corpuscular Hemoglobin', 'Mean Corpuscular Volume',
                            'MCHC', 'MPV', 'RDW CV', 'RDW SD', 'Neutrophils', 'Lymphocytes', 'Eosinophils',
                            'Monocytes', 'Basophils', 'Absolute Neutrophil Count', 'Absolute Basophil Count',
                            'Absolute Lymphocyte Count', 'Absolute Eosinophil Count']:
                            if key.lower() in line.lower():
                                # Try to extract the value (number) from the line
                                import re
                                match = re.search(r"([\d.]+)", line)
                                if match:
                                    extracted[key] = match.group(1)
        # Clean up temp file
        os.remove(temp_path)
        return jsonify({'extracted': extracted})
    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)

    