import React, { useState, useMemo } from 'react';


function App() {

  const [inputs, setInputs] = useState({
    baseTariff: '',
    advanceAmount: '',
    customerId: '',
    dateOfPayment: '',
    lastDateOfPayment: '',
  });


  const [billDetails, setBillDetails] = useState(null);

  const [discountMessage, setDiscountMessage] = useState('');
  const [paymentMessage, setPaymentMessage] = useState('');
  const [error, setError] = useState('');

  const calculatedTaxes = useMemo(() => {
    const base = parseFloat(inputs.baseTariff) || 0;
    if (base <= 0) return null;

    const houseTax = base * 0.10;
    const maintenanceTax = base * 0.05;
    const drainageTax = (base + houseTax) * 0.06;
    const totalTax = base + houseTax + maintenanceTax + drainageTax;

    return { totalTax };
  }, [inputs.baseTariff]);

  // --- Event Handlers ---

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setInputs(prev => ({ ...prev, [id]: value }));
    // Reset results and messages when inputs change
    setBillDetails(null);
    setDiscountMessage('');
    setPaymentMessage('');
    setError('');
  };


  const handleCalculateDiscount = () => {

    setError('');
    setDiscountMessage('');
    setPaymentMessage('');

    if (!calculatedTaxes) {
      setError('Please enter a valid Base Tariff greater than 0.');
      setBillDetails(null);
      return;
    }

    const { totalTax } = calculatedTaxes;
    let discountPercent = 0;

    if (totalTax > 7000) {
      setError('Total tax exceeds the limit of ₹7000. Cannot calculate discount.');
      setBillDetails(null);
      return;
    }

    if (totalTax >= 100 && totalTax <= 4000) discountPercent = 5;
    else if (totalTax > 4000 && totalTax <= 5000) discountPercent = 10;
    else if (totalTax > 5000 && totalTax <= 6000) discountPercent = 12;
    else if (totalTax > 6000 && totalTax <= 7000) discountPercent = 14;

    const discountAmount = totalTax * (discountPercent / 100);
    const billAfterDiscount = totalTax - discountAmount;

    setBillDetails({ billAfterDiscount });

    setDiscountMessage(`Total Tax: ₹${totalTax.toFixed(2)} | Discount Amount: ₹${discountAmount.toFixed(2)} | Bill After Discount: ₹${billAfterDiscount.toFixed(2)}`);
  };

  const handleCheckPayment = () => {

    setPaymentMessage('');
    setError('');

    if (!billDetails) {
      setError('Please calculate the bill and discount first.');
      return;
    }

    if (!inputs.dateOfPayment || !inputs.lastDateOfPayment) {
      setError('Please select both a "Date of Payment" and a "Last Date of Payment".');
      return;
    }

    const paymentDate = new Date(inputs.dateOfPayment);
    const lastPaymentDate = new Date(inputs.lastDateOfPayment);

    if (paymentDate <= lastPaymentDate) {
      setError('The "Date of Payment" must be after the "Last Date of Payment".');
      return;
    }

    const timeDiff = paymentDate.getTime() - lastPaymentDate.getTime();
    const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

    let finePercent = 0;
    if (dayDiff <= 30) {
      finePercent = 10;
    } else if (dayDiff >= 31 && dayDiff <= 60) {
      finePercent = 15;
    } else { // dayDiff > 60
      finePercent = 25;
    }

    const { billAfterDiscount } = billDetails;
    const fineAmount = billAfterDiscount * (finePercent / 100);
    const advance = parseFloat(inputs.advanceAmount) || 0;
    const finalAmount = billAfterDiscount + fineAmount - advance;

    setPaymentMessage(`Fine Amount (${finePercent}%): ₹${fineAmount.toFixed(2)} | Final Amount to be Paid: ₹${finalAmount.toFixed(2)}`);
  };

  const handleReset = () => {
    setInputs({
      baseTariff: '',
      advanceAmount: '',
      customerId: '',
      dateOfPayment: '',
      lastDateOfPayment: '',
    });
    setBillDetails(null);
    setDiscountMessage('');
    setPaymentMessage('');
    setError('');
  };

  return (
    <div>
    <h1>Corporation Tax Calculator</h1>

    {error && <p style={{ color: 'red' }}><strong>Error: {error}</strong></p>}

    <div>
    <label htmlFor="customerId">Customer ID: </label>
    <input id="customerId" type="text" value={inputs.customerId} onChange={handleInputChange} />
    </div>
    <div>
    <label htmlFor="baseTariff">Base Tariff (₹): </label>
    <input id="baseTariff" type="number" value={inputs.baseTariff} onChange={handleInputChange} />
    </div>
    <div>
    <label htmlFor="advanceAmount">Advance Amount Paid (₹): </label>
    <input id="advanceAmount" type="number" value={inputs.advanceAmount} onChange={handleInputChange} />
    </div>
    <div>
    <label htmlFor="lastDateOfPayment">Last Date of Payment: </label>
    <input id="lastDateOfPayment" type="date" value={inputs.lastDateOfPayment} onChange={handleInputChange} />
    </div>
    <div>
    <label htmlFor="dateOfPayment">Date of Payment: </label>
    <input id="dateOfPayment" type="date" value={inputs.dateOfPayment} onChange={handleInputChange} />
    </div>

    <br />

    <button onClick={handleCalculateDiscount}>Check Discount</button>
    {discountMessage && <p>{discountMessage}</p>}

    <br />
    <br />

    <button onClick={handleCheckPayment}>Check Payment</button>
    {paymentMessage && <p>{paymentMessage}</p>}

    <br />
    <br />

    <button onClick={handleReset}>Reset</button>

    </div>
  );
}

export default App;

