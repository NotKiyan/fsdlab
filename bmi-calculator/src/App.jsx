import React, { useState } from 'react';
import './App.css';

function App() {
  // State for the inputs
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');

  // State for the result
  const [bmi, setBmi] = useState(null);
  const [message, setMessage] = useState('');
  const [resultColor, setResultColor] = useState('');

  const calculateBmi = () => {
    const heightNum = parseFloat(height);
    const weightNum = parseFloat(weight);

    // Validation
    if (isNaN(heightNum) || isNaN(weightNum) || heightNum <= 0 || weightNum <= 0) {
      setBmi(null);
      setMessage('Please enter valid height and weight.');
      setResultColor('#EF5350'); // Bright Red for error
      return;
    }

    const heightInMeters = heightNum / 100;
    const bmiValue = weightNum / (heightInMeters * heightInMeters);
    setBmi(bmiValue.toFixed(1)); // Update BMI state

    // Determine category and set message/color state
    if (bmiValue < 18.5) {
      setMessage('Underweight');
      setResultColor('#E57373'); // Light Red
    } else if (bmiValue >= 18.5 && bmiValue <= 24.9) {
      setMessage('Normal weight');
      setResultColor('#FFFFFF'); // White for normal
    } else if (bmiValue >= 25 && bmiValue <= 29.9) {
      setMessage('Overweight');
      setResultColor('#EF5350'); // Medium Red
    } else {
      setMessage('Obesity');
      setResultColor('#D32F2F'); // Strong Red
    }
  };

  return (
    <div className="calculator">
    <h1>BMI Calculator</h1>
    <div className="input-group">
    <label htmlFor="height">Height (cm)</label>
    <input
    type="number"
    id="height"
    placeholder="Enter your height"
    value={height}
    onChange={(e) => setHeight(e.target.value)}
    />
    </div>
    <div className="input-group">
    <label htmlFor="weight">Weight (kg)</label>
    <input
    type="number"
    id="weight"
    placeholder="Enter your weight"
    value={weight}
    onChange={(e) => setWeight(e.target.value)}
    />
    </div>
    <button onClick={calculateBmi}>Calculate BMI</button>

    {/* Conditionally render the result */}
    {message && (
      <div id="result" style={{ color: resultColor }}>
      {bmi ? `Your BMI is ${bmi} (${message})` : message}
      </div>
    )}
    </div>
  );
}

export default App;
