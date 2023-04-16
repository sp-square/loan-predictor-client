const formEl = document.querySelector('form');
const predictionEl = document.getElementById('prediction');
console.log(predictionEl);
function handleSubmitForm(event) {
	event.preventDefault();
	const loanApp = {
		loan: document.getElementById('loan').value.trim(),
		reason: document.getElementById('reason').value.trim(),
		value: document.getElementById('value').value.trim(),
		mortdue: document.getElementById('mortdue').value.trim(),
		job: document.getElementById('job').value.trim(),
		yoj: document.getElementById('yoj').value.trim(),
		derog: document.getElementById('derog').value.trim(),
		delinq: document.getElementById('delinq').value.trim(),
		clage: document.getElementById('clage').value.trim(),
		ninq: document.getElementById('ninq').value.trim(),
		clno: document.getElementById('clno').value.trim(),
		debtinc: document.getElementById('debtinc').value.trim(),
	};

	// http://127.0.0.1:5000/predict?loan=1100&mortdue=25860.0&value=39025.0&yoj=10.5&derog=0.0&delinq=0.0&clage=94.366667&ninq=1.0&clno=9.0&debtinc=34.818262&reason=HomeImp&job=Other
	// https://loan-default-predictor.herokuapp.com/predict?loan=1100&mortdue=25860.0&value=39025.0&yoj=10.5&derog=0.0&delinq=0.0&clage=94.366667&ninq=1.0&clno=9.0&debtinc=34.818262&reason=HomeImp&job=Other
	// const url = `https://loan-default-predictor.herokuapp.com/predict?loan=${loanApp.loan}&mortdue=${loanApp.mortdue}&value=${loanApp.value}&yoj=${loanApp.yoj}&derog=${loanApp.derog}&delinq=${loanApp.delinq}&clage=${loanApp.clage}&ninq=${loanApp.ninq}&clno=${loanApp.clno}&debtinc=${loanApp.debtinc}&reason=${loanApp.reason}&job=${loanApp.job}`;
	const url = `https://loan-default-predictor.herokuapp.com/predict?loan=${loanApp.loan}&mortdue=${loanApp.mortdue}&value=${loanApp.value}&yoj=${loanApp.yoj}&derog=${loanApp.derog}&delinq=${loanApp.delinq}&clage=${loanApp.clage}&ninq=${loanApp.ninq}&clno=${loanApp.clno}&debtinc=${loanApp.debtinc}&reason=${loanApp.reason}&job=${loanApp.job}`;

	console.log(url);

	fetch(url)
		.then(function (res) {
			return res.json();
		})
		.then(function ({ prediction }) {
			displayPrediction(JSON.parse(prediction)[0]);
		})
		.catch(function (err) {
			console.log('error...NO!', err);
		});
}

formEl.addEventListener('submit', handleSubmitForm);

function displayPrediction(pred) {
	predictionEl.innerHTML = '';
	const decision = document.createElement('h3');
	if (pred === 0) {
		decision.textContent = 'APPROVED';
		decision.setAttribute('class', 'bg-green text-serif aligncenter');
		decision.setAttribute('style', 'font-weight: 700');
	} else if (pred === 1) {
		decision.textContent = 'REJECTED';
		decision.setAttribute('class', 'bg-red text-serif aligncenter');
		decision.setAttribute('style', 'font-weight: 700');
		const explanation = document.createElement('p');
		explanation.textContent = explanation.setAttribute('class', 'text-intro');
	}
	console.log('decision', decision);
	predictionEl.appendChild(decision);
}
