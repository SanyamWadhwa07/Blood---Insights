from flask import Flask, request, jsonify, session
from flask_cors import CORS
from langchain.prompts import PromptTemplate
from langchain_community.llms import CTransformers, OpenAI
from langchain.chains import LLMChain
import os

os.environ['OPENAI_API_KEY'] = 'YOUR_OPENAI_API_KEY_HERE' 


import secrets
secret_key = secrets.token_hex(16) 

app = Flask(__name__)
CORS(app)
app.secret_key= secret_key

llm = OpenAI(temperature=0.9, max_tokens=1024)

def generate_diet_recommendations(input_data):
    input_variables = [
        'haemoglobin_level', 'rbc_count', 'total_wbc_count', 'platelet_count',
        'packed_cell_volume_PCV', 'mean_corpuscular_Hb_MCH', 
        'mean_corpuscular_volume_MCV', 'MCHC', 'MPV', 'RDW_CV', 'RDW_SD',
        'neutrophils', 'lymphocytes', 'eosinophils', 'monocytes', 'basophils',
        'absolute_neutrophil_count', 'absolute_basophils_count', 'absolute_lymphocyte_count',
        'absolute_eosinophil_count', 'absolute_monocyte_count',
        'fasting_glucose', 'glycosylated_haemoglobin_HbA1c', 'approximate_mean_plasma_glucose',
        'urea', 'creatinine', 'BUN_Blood_Urea_Nitrogen', 'BUN_Cr_Ratio_Blood_Urea_Nitrogen_to_Creatinine_Ratio',
        'uric_acid', 'sodium', 'potassium', 'chloride', 'total_cholesterol', 'HDL_cholesterol',
        'total_triglycerides', 'VLDL_cholesterol', 'LDL_cholesterol', 'non_HDL_cholesterol',
        'chol_HDL_ratio', 'TGL_HDL_ratio', 'HDL_LDL_ratio', 'LDL_HDL_ratio',
        'total_bilirubin', 'direct_bilirubin', 'indirect_bilirubin', 'SGOT_AST', 'SGPT_ALT',
        'SGOT_AST_to_SGPT_ALT_ratio', 'alkaline_phosphatase', 'total_protein', 'albumin',
        'globulin', 'A_G_ratio', 'gamma_glutamyl_transferase_GGT', '25_OH_Vitamin_D',
        'TIBC_Total_Iron_Binding_Capacity', 'iron', 'transferrin_saturation_percent', 'transferrin',
        'unsaturated_iron_binding_capacity_UIBC', 'triiodothyronine_total_TT3', 'thyroxine_TT4',
        'thyroid_stimulating_hormone_TSH', 'vitamin_B12', 'CRP', 'rheumatoid_factor'
    ]  # Added 'calorieIntake'


    # If v is not None, it adds the key-value pair (k, v) to the filtered_input_data dictionary.
    #After the comprehension is complete, filtered_input_data contains only those key-value pairs from  where the value was not None.
    #This is a  technique used to filter out None values from a dictionary, leaving only the key-value pairs that have meaningful values.
    filtered_input_data = {k: v for k, v in input_data.items() if v is not None}

 # Create a dynamic prompt template based on provided inputs 
    template = "Blood Report Analysis:\n"
    for var in input_variables:
        if var in filtered_input_data:
            template += f"{var.replace('_', ' ')}: {filtered_input_data[var]}\n"
    template += "I want you to analyze diet, precautions, and what doctor to consult if the patient has the above conditions. Please provide the address of doctors related to the condition based on the given address."
    
    prompt_template = PromptTemplate(input_variables=list(filtered_input_data.keys()), template=template)
    chain = LLMChain(llm=llm, prompt=prompt_template)
    
    results = chain.run(filtered_input_data)
    return results

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
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)

    