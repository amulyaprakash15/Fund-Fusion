// Sample data (can be replaced with actual values from form/localStorage/backend)
const investmentData = {
  age: 28,
  income: 900000,
  risk: "Moderate",
  horizon: 10,
  allocation: {
    equity: 50,
    debt: 30,
    hybrid: 20
  },
  suggestedFunds: ["Balanced Funds", "Hybrid Equity-Oriented", "Short-Term Debt"]
};

// Populate Profile Info
document.getElementById("age").textContent = investmentData.age;
document.getElementById("income").textContent = investmentData.income.toLocaleString();
document.getElementById("risk").textContent = investmentData.risk;
document.getElementById("horizon").textContent = investmentData.horizon;

// Populate Allocation Info
document.getElementById("equity").textContent = investmentData.allocation.equity;
document.getElementById("debt").textContent = investmentData.allocation.debt;
document.getElementById("hybrid").textContent = investmentData.allocation.hybrid;

// Populate Suggested Funds
const fundList = document.getElementById("fundTypes");
investmentData.suggestedFunds.forEach(fund => {
  const li = document.createElement("li");
  li.textContent = fund;
  fundList.appendChild(li);
});

// Draw Portfolio Allocation Chart
const allocationChart = new Chart(document.getElementById('allocationChart'), {
  type: 'doughnut',
  data: {
    labels: ['Equity', 'Debt', 'Hybrid'],
    datasets: [{
      data: [
        investmentData.allocation.equity,
        investmentData.allocation.debt,
        investmentData.allocation.hybrid
      ],
      backgroundColor: ['#4b6cb7', '#8e9eab', '#f6c90e'],
      borderWidth: 1
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom'
      }
    }
  }
});

// Draw Simulated Growth Chart (10 Years)
const baseInvestment = investmentData.income * 0.2; // Assume 20% of income invested annually
const growthData = [];
let total = 0;
for (let year = 1; year <= investmentData.horizon; year++) {
  total += baseInvestment;
  total *= 1 + (investmentData.risk === "High" ? 0.15 : investmentData.risk === "Moderate" ? 0.10 : 0.06);
  growthData.push(total.toFixed(0));
}

new Chart(document.getElementById('growthChart'), {
  type: 'line',
  data: {
    labels: Array.from({ length: investmentData.horizon }, (_, i) => `Year ${i + 1}`),
    datasets: [{
      label: 'Investment Value (₹)',
      data: growthData,
      fill: true,
      borderColor: '#4b6cb7',
      backgroundColor: 'rgba(75,108,183,0.1)',
      tension: 0.3
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { display: false }
    },
    scales: {
      y: {
        beginAtZero: false,
        ticks: {
          callback: value => '₹' + parseInt(value).toLocaleString()
        }
      }
    }
  }
});

// PDF Download Button
document.getElementById('downloadBtn').addEventListener('click', () => {
  const element = document.querySelector('.page-container');
  const opt = {
    margin: 0.4,
    filename: 'FundFusion_Investment_Plan.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
  };
  html2pdf().set(opt).from(element).save();
});
