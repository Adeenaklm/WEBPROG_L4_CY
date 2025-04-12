// Wait until the entire DOM content is fully loaded before executing any JavaScript
document.addEventListener('DOMContentLoaded', () => {

  // Get references to form, result display, and reset button
  const form = document.getElementById('calculatorForm');
  const result = document.getElementById('result');
  const resetBtn = document.getElementById('resetBtn');

  // Add event listener for form submission
  form.addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent page reload

    // Get user input
    const litres = parseFloat(document.getElementById('litres').value);
    const pricePerLitre = parseFloat(document.getElementById('pricePerLitre').value);

    // Validate input
    if (isNaN(litres) || isNaN(pricePerLitre) || litres <= 0 || pricePerLitre <= 0) {
      result.textContent = '❌ Please enter valid positive numbers.';
      result.style.color = '#dc3545'; // Red color
      return;
    }

    // Calculate total cost
    const totalCost = litres * pricePerLitre;

    // Format cost into AED currency
    const formattedCost = totalCost.toLocaleString('en-AE', {
      style: 'currency',
      currency: 'AED'
    });

    // Color code based on total
    if (totalCost < 50) {
      result.style.color = '#28a745'; // Green
    } else if (totalCost < 150) {
      result.style.color = '#ffc107'; // Amber
    } else {
      result.style.color = '#dc3545'; // Red
    }

    // Show result
    result.textContent = `💸 Total Cost: ${formattedCost}`;
    result.classList.add("bounce");
    setTimeout(() => result.classList.remove("bounce"), 600);
  });

  // Reset button clears the form and result
  resetBtn.addEventListener('click', () => {
    form.reset();
    result.textContent = 'Total cost will appear here 💸';
    result.style.color = '#333';
  });
});
