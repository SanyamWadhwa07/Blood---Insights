# Blood Insights 🩸

A modern web application that analyzes blood test reports and provides personalized insights, diet recommendations, and health precautions using AI.

## Features 🌟

- **Automated Report Analysis**: Upload your blood test values and get instant analysis
- **AI-Powered Insights**: Powered by Mistral-7B for accurate and detailed health insights
- **Comprehensive Recommendations**:
  - Disease/Condition Summary
  - Diet Recommendations
  - Necessary Precautions
  - Medical Specialist Recommendations

## Tech Stack 💻

- **Frontend**: React.js with Vite
- **Backend**: Flask (Python)
- **AI Model**: Mistral-7B-Instruct-v0.2
- **UI Framework**: Custom CSS

## Getting Started 🚀

### Prerequisites

- Node.js (v14 or higher)
- Python 3.11 or higher
- Git

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/SanyamWadhwa07/Blood---Insights.git
   cd Blood---Insights
   ```

2. Set up the frontend:
   ```bash
   npm install
   ```

3. Set up the backend:
   ```bash
   cd flask-backend
   python -m venv blood
   blood/Scripts/activate  # On Windows
   pip install -r requirements.txt
   ```

4. Configure environment variables:
   - Copy `.env.example` to `.env` in the flask-backend directory
   - Add your Hugging Face API token

5. Start the development servers:
   - Frontend:
     ```bash
     npm run dev
     ```
   - Backend:
     ```bash
     cd flask-backend
     flask run
     ```

## Usage 📋

1. Access the application at `http://localhost:5173`
2. Enter your blood test values in the provided form
3. Click "Generate Report" to receive AI-powered insights
4. Review the generated recommendations and consult with healthcare professionals

## Features in Detail 🔍

- **Blood Analysis**: Comprehensive analysis of various blood parameters
- **Personalized Recommendations**: Get diet and lifestyle suggestions based on your results
- **Medical Guidance**: Receive suggestions about which type of medical specialist to consult
- **User-Friendly Interface**: Easy-to-use form for entering blood test values
- **Quick Results**: Fast analysis using optimized AI model integration

## Project Structure 📂

```
Blood---Insights/
├── src/               # Frontend React components
├── flask-backend/     # Python Flask backend
├── public/           # Static assets
└── templates/        # HTML templates
```

## Contributing 🤝

Contributions are welcome! Please feel free to submit a Pull Request.

## Disclaimer ⚠️

This application is for informational purposes only and should not be considered as medical advice. Always consult with healthcare professionals for medical decisions.

## License 📄

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments 🙏

- Hugging Face for providing the Mistral-7B model
- The open-source community for various tools and libraries used in this project

---
Built with ❤️ by Sanyam Wadhwa
