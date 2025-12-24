const result = document.getElementById("result");
const buttons = document.querySelectorAll("button");

let input = "";
let expression = "";

const operators = ["+", "−", "×", "÷"];

// Track first + button
let plusSeen = false;

buttons.forEach(btn => {
    let value = btn.textContent;

    // 🔁 Convert duplicate "+" into "%"
    if (value === "+") {
        if (plusSeen) {
            btn.textContent = "%";
            value = "%";
        } else {
            plusSeen = true;
        }
    }

    btn.addEventListener("click", () => {

        // ===== Numbers =====
        if (!isNaN(value)) {
            input += value;
            result.textContent = expression + input;
            return;
        }

        // ===== Clear =====
        if (value === "C") {
            input = "";
            expression = "";
            result.textContent = "0";
            return;
        }

        // ===== Percent =====
        if (value === "%") {
            if (input === "") return;

            // Convert input to percentage
            input = (parseFloat(input) / 100).toString();
            result.textContent = expression + input;
            return;
        }

        // ===== Operators =====
        if (operators.includes(value)) {
            if (input === "") return;

            expression += input + value;
            input = "";
            result.textContent = expression;
            return;
        }

        // ===== Equals =====
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
