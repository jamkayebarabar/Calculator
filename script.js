const result = document.getElementById("result");
const buttons = document.querySelectorAll("button");

let input = "";
let expression = "";

const operators = ["+", "−", "×", "÷"];


let plusSeen = false;

buttons.forEach(btn => {
    let value = btn.textContent;

    if (value === "+") {
        if (plusSeen) {
            btn.textContent = "%";
            value = "%";
        } else {
            plusSeen = true;
        }
    }

    btn.addEventListener("click", () => {

        if (!isNaN(value)) {
            input += value;
            result.textContent = expression + input;
            return;
        }

        if (value === "C") {
            input = "";
            expression = "";
            result.textContent = "0";
            return;
        }

        if (value === "%") {
            if (input === "") return;

            input = (parseFloat(input) / 100).toString();
            result.textContent = expression + input;
            return;
        }

        if (operators.includes(value)) {
            if (input === "") return;

            expression += input + value;
            input = "";
            result.textContent = expression;
            return;
        }

        if (value === "=") {
            if (input === "") return;

            try {
                let fullExpression = expression + input;

                fullExpression = fullExpression
                    .replace(/×/g, "*")
                    .replace(/÷/g, "/")
                    .replace(/−/g, "-");

                const answer = eval(fullExpression);

                result.textContent = answer;
                input = answer.toString();
                expression = "";
            } catch {
                result.textContent = "Error";
                input = "";
                expression = "";
            }
        }
    });
});

