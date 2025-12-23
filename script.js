const result = document.getElementById("result");
const buttons = document.querySelectorAll("button");

let input = "";
let expression = "";

buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        const value = btn.textContent;

 
        if (!isNaN(value)) {
            input += value;
            result.textContent = expression + input;
        }
     
        else if (value === "C") {
            input = "";
            expression = "";
            result.textContent = "0";
        }

        else if (value === "=") {
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

        else {
            if (input === "") return;

            expression += input + value;
            input = "";

            result.textContent = expression;
        }
    });
});
