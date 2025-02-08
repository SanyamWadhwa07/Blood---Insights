import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [options, setOptions] = useState({
        option1: false,
        option2: false,
        option3: false,
    });

    const [inputs, setInputs] = useState({
        input1: '',
        input2: '',
        input3: '',
    });

    const [recommendations, setRecommendations] = useState('');

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setOptions((prevOptions) => ({
            ...prevOptions,
            [name]: checked,
        }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputs((prevInputs) => ({
            ...prevInputs,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:5000/submit', { inputs });
            console.log(response.data);
            setRecommendations(response.data.recommendations); // Assuming the response structure has a 'recommendations' key
        } catch (error) {
            console.error('Error submitting form', error);
        }
    };

    return (
        <div className="App">
            {recommendations && (
                <div className="recommendations">
                    <h2>Recommendations:</h2>
                    <pre>{recommendations}</pre>
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <h3>Select Options:</h3>
                <label>
                    <input type="checkbox" name="option1" checked={options.option1} onChange={handleCheckboxChange} />
                    Haemoglobin ( in %gm)
                </label><br />
                <label>
                    <input type="checkbox" name="option2" checked={options.option2} onChange={handleCheckboxChange} />
                    Option 2
                </label><br />
                <label>
                    <input type="checkbox" name="option3" checked={options.option3} onChange={handleCheckboxChange} />
                    Option 3
                </label><br />

                {options.option1 && (
                    <div>
                        <label htmlFor="input1">Input for Option 1:</label>
                        <input type="text" id="input1" name="input1" value={inputs.input1} onChange={handleInputChange} />
                    </div>
                )}
                {options.option2 && (
                    <div>
                        <label htmlFor="input2">Input for Option 2:</label>
                        <input type="text" id="input2" name="input2" value={inputs.input2} onChange={handleInputChange} />
                    </div>
                )}
                {options.option3 && (
                    <div>
                        <label htmlFor="input3">Input for Option 3:</label>
                        <input type="text" id="input3" name="input3" value={inputs.input3} onChange={handleInputChange} />
                    </div>
                )}

                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default App;
