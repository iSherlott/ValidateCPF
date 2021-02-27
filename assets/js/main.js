const inputCPF = document.querySelector("#inputCPF");
const btnValid = document.querySelector("#btn");
const result = document.querySelector("#result");

function cpfLimpo(cpf) {
  return cpf.replace(/\D+/g, "");
}

inputCPF.onkeydown = function (e) {
  if (
    !(
      (e.keyCode > 95 && e.keyCode < 106) ||
      (e.keyCode > 47 && e.keyCode < 58) ||
      e.keyCode == 8
    )
  ) {
    return false;
  }
};

function tratamento(cpfArray, peso) {
  let total = 0;

  cpfArray.map((numberCpf, val) => {
    total += numberCpf * (val + peso);
  });

  if (total % 11 > 9) cpfArray.push("0");
  else cpfArray.push((total % 11).toString());

  return cpfArray;
}

inputCPF.addEventListener("keydown", function (event) {
  if (event.keyCode != 46 && event.keyCode != 8) {
    let i = inputCPF.value.length;
    if (i === 3 || i === 7) inputCPF.value = inputCPF.value + ".";
    else if (i === 11) inputCPF.value = inputCPF.value + "-";
  }
});

btnValid.addEventListener("click", function () {
  if (inputCPF.value.length == 14) {
    const cpfArray = [...cpfLimpo(inputCPF.value)].slice(0, 9);

    tratamento(cpfArray, 1);
    tratamento(cpfArray, 0);

    if (cpfLimpo(inputCPF.value) === cpfLimpo(cpfArray.join()))
      result.innerHTML = "CPF Válido";
    else result.innerHTML = "CPF Inválido";
  }
});
