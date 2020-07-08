Calc = new Calculator();
//Some  variables
function Calculator() {
	(this.acx = 0), //Accumulator
		(this.dcx = 0), // value to operate
		(this.applyOp = "="),
		(this.display = "0"),
		(this.isNegative = false),
		(this.isDecimal = false),
		(this.opAfterEquals = false),
		(this.isNew = true); ///Expecting a new number
	showInDisplay(this.display);
}

//Helpers
function getDisplay() {
	return Calc.isNegative ? "-" + Calc.display : Calc.display;
}
// Number input handler
function handleNumbers(val) {
	Calc.opAfterEquals = false;
	if (Calc.display.length > 13) {
		return;
	}
	if (Calc.isNew) {
		Calc.display = "";
		Calc.isNew = false;
	}
	Calc.display = Calc.display + val;
	showInDisplay();
}
// Operator input handler
function handleOps(val) {
	if (Calc.opAfterEquals) {
		Calc.dcx = Calc.acx;
		Calc.acx = evaluate(Calc.acx, Calc.dcx, Calc.applyOp);
		Calc.applyOp = val;
		Calc.isNew = true;
		Calc.opAfterEquals = false;
		return;
	}
	if (Calc.isNew) {
		console.log("Unexpected Input");
		return;
	}
	Calc.dcx = Number(getDisplay());
	Calc.acx = evaluate(Calc.acx, Calc.dcx, Calc.applyOp);
	Calc.applyOp = val;
	Calc.isNew = true;
	showInDisplay(String(Calc.acx));
}
function handleEqual() {
	Calc.opAfterEquals = true;
	if (!Calc.isNew) {
		Calc.dcx = Number(getDisplay());
		Calc.acx = evaluate(Calc.acx, Calc.dcx, Calc.applyOp);
		Calc.applyOp = "=";
		Calc.isNew = true;
		showInDisplay(String(Calc.acx));
	} else {
		Calc.dcx = Calc.acx;
		Calc.acx = evaluate(Calc.acx, Calc.dcx, Calc.applyOp);
		Calc.applyOp = "=";
		Calc.isNew = true;
		showInDisplay(String(Calc.acx));
	}
}
//Helper functions
function showInDisplay(display = getDisplay()) {
	document.getElementById("calcDisplay").textContent =
		display.length > 13 ? display.slice(0, 13) : display;
}

function evaluate(a, b, op) {
	switch (op) {
		case "+":
			return a + b;
		case "-":
			return a - b;
		case "*":
			return a * b;
		case "/":
			return b == 0 ? a : a / b;
		case "=":
			return b;
		default:
			return a;
	}
}

//Add Eventlisteners for all buttons in keypad

document
	.getElementById("calcNumpad")
	.addEventListener("click", function (event) {
		if (event.target.matches("button.numkey")) {
			handleNumbers(event.target.textContent);
		} else if(event.target.matches("button.signkey")) {
			Calc.isNegative = !Calc.isNegative;
			showInDisplay();
		} else if(event.target.matches("button.dotkey")) {
			if(!Calc.isDecimal){
				Calc.isDecimal = true;
				handleNumbers(event.target.textContent);
			} 
		}
	});

document.querySelector("#calcEqual").addEventListener("click", handleEqual);
document.getElementById("calcOps").addEventListener("click", function (event) {
	if (event.target.matches("button")) {
		handleOps(event.target.textContent);
	}
});

document
	.getElementById("clearDisplay")
	.addEventListener("click", () => (Calc = new Calculator()));

document.getElementById("backButton").addEventListener("click", () => {
	if (Calc.isNew){
		return;
	} 
	if(Cal.display[Calc.display.length-1] == '.'){
		Calc.isDecimal = false;
	}
	Calc.display = Calc.display.slice(0, -1);
	if (Calc.display.length == 0) {
		Calc.display = "0";
	}
	showInDisplay();
});
