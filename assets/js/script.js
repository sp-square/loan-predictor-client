const formEl = document.querySelector('form');

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

	console.log(loanApp);

	// https://loan-default-predictor.herokuapp.com/predict?loan=1100&mortdue=25860.0&value=39025.0&yoj=10.5&derog=0.0&delinq=0.0&clage=94.366667&ninq=1.0&clno=9.0&debtinc=34.818262&reason=HomeImp&job=Other
	const url = `https://loan-default-predictor.herokuapp.com/predict?loan=${loanApp.loan}&mortdue=${loanApp.mortdue}&value=${loanApp.value}&yoj=${loanApp.yoj}&derog=${loanApp.derog}&delinq=${loanApp.delinq}&clage=${loanApp.clage}&ninq=${loanApp.ninq}&clno=${loanApp.clno}&debtinc=${loanApp.debtinc}&reason=${loanApp.reason}&job=${loanApp.job}`;

	console.log(url);

	fetch(url, { mode: 'no-cors' })
		.then(function (res) {
			console.log(res);
			const response = res.json();
			console.log(response);
		})
		.catch(function (err) {
			console.log('error...NO!', err);
		});
}
formEl.addEventListener('submit', handleSubmitForm);
