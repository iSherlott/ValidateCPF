# ValidateCPF

<p>Atividade referente ao exercicio Seção 6: JavaScript Objetos e prototypes (Avançado), Aula 98.</p>
<p>Site que verifica se o CPF informado é um CPF valido</p>

## Screenshot

<img src="https://github.com/iSherlott/ValidateCPF/blob/main/assets/img/screenshot.PNG?raw=true">

## Explicação do código

```
const inputCPF = document.querySelector("#inputCPF");
const btnValid = document.querySelector("#btn");
const result = document.querySelector("#result");
```

<p>Costumo usar o querySelector para manipular o DOM, por esse motivo sempre nessa e em todas as demais ira ver que ao invés de usar o ByID ou ByClass eu uso o querySelector, isso não implica em nada do código.</p>

```
function cpfLimpo(cpf) {
  return cpf.replace(/\D+/g, "");
}
```

<p>Durante a aula o professor já alertou que iriamos lidar com o tratamento do input, transformei isso em uma função para poder aproveitar durante todo o código.</p>

```
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
```

<p>O código acima serve para manter o que foi digitado como somente número, já que será aplicado uma mascara que contem mais de 1 ponto e traço, não poderia fizar o input como number, claro que poderia simplesmente instruir em cima para digitar somente o número e fazer o tratamento direto, sem precisar desse recurso...</p>

```
function tratamento(cpfArray, peso) {
  let total = 0;

  cpfArray.map((numberCpf, val) => {
    total += numberCpf * (val + peso);
  });

  if (total % 11 > 9) cpfArray.push("0");
  else cpfArray.push((total % 11).toString());

  return cpfArray;
}
```

<p>Aqui é onde é feito todo o calculo de validação, como seria aplicado 2x, eu transformei em uma função para ser reutilizado e os valores que se alterá como parametro da função.</p>
<p>Vale lembra que, o calculo de validação consiste em: você multiplicar todos os 9 primeiros números individualmente pelo índice, inicializando pelo número 1</p>
<p>Na segunda vez, você repete o mesmo procedimento acima, incluindo o digito que descobriu, mas dessa vez se inicializa pelo número 0</p>

```
inputCPF.addEventListener("keydown", function (event) {
  if (event.keyCode != 46 && event.keyCode != 8) {
    let i = inputCPF.value.length;
    if (i === 3 || i === 7) inputCPF.value = inputCPF.value + ".";
    else if (i === 11) inputCPF.value = inputCPF.value + "-";
  }
});
```

<p>Aqui é quando onde aplico a mascara que é exibida para o usuario na tela</p>

```
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
```

<p>Essa é a parte final, onde ao clicar no botão "Validar", ele executa os códigos acima e exibe na tela "CPF Válido" ou "CPF Inválido"</p>

## Preview

<a href="https://isherlott.github.io/ValidateCPF/">Click aqui para visualizar o site em funcionamento</a>
