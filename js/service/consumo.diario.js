//Calcular consumo diário calorias
var listaCaloria = new Array();

function calcularConsumoDiario() {

    var numPeso = document.getElementById("inputPeso").value;
    numPeso = parseFloat(numPeso);

    var opcaoAtividadeFisica = document.querySelector('input[name=inputAtividadeFisica]:checked').value;
    opcaoAtividadeFisica = parseInt(opcaoAtividadeFisica);

    var genero = document.querySelector('input[name=inputGenero]:checked').value;

    var altura = document.getElementById("inputAltura").value;
    altura = parseInt(altura);

    var idade = document.getElementById("inputIdade").value;
    idade = parseInt(idade);

    if (!isNaN(numPeso) || !isNaN(opcaoAtividadeFisica)) {

        var numTMB = 0;

        //masculino
        if (genero === "M") {
            numTMB = 88.362 + (13.397 * numPeso) + (4.799 * altura) - (5.677 * idade);
        }
        // feminino  
        if (genero === "F") {
            numTMB = 447.593 + (9.247 * numPeso) + (3.098 * altura) - (4.330 * idade);
        }

        //var numTMB = numPeso * 22;

        if (opcaoAtividadeFisica >= 1 && opcaoAtividadeFisica <= 3) {

            var resultadoCaloriasPorDia = 0;

            if (opcaoAtividadeFisica === 1) {
                resultadoCaloriasPorDia = numTMB * 1.4;
            }

            if (opcaoAtividadeFisica === 2) {
                resultadoCaloriasPorDia = numTMB * 1.6;
            }

            if (opcaoAtividadeFisica === 3) {
                resultadoCaloriasPorDia = numTMB * 1.8;
            }

            resultadoCaloriasPorDia = Math.round(resultadoCaloriasPorDia);

            var resultadoParaEmagrecer = Math.round(resultadoCaloriasPorDia - (resultadoCaloriasPorDia * 0.2));
            var resultadoParaGanharMassa = Math.round(resultadoCaloriasPorDia + (resultadoCaloriasPorDia * 0.1));
            var resultadoProteinas = Math.round(numPeso * 1.6);

            var resultado = {
                "genero": genero,
                "altura": altura,
                "idade": idade,
                "tmb": numTMB,
                "peso": numPeso,
                "atividadeFisica": opcaoAtividadeFisica,
                "manterPeso": resultadoCaloriasPorDia,
                "perderPeso": resultadoParaEmagrecer,
                "ganharMassa": resultadoParaGanharMassa,
                "proteinas": resultadoProteinas,
                "when": new Date()
            }

            salvarConsumoDiario(resultado);
            showConsumoDiario(resultado);


        } else {
            showWarning("Digite de 1 a 3");
        }

    } else {
        showWarning("Digite opções numéricas.");
    }

}

function salvarConsumoDiario(resultado) {
    saveDataLocal(resultado, "consumoDiario");
}

function loadConsumoDiario() {
    return loadDataLocal("consumoDiario");
}

function showConsumoDiario(resultado) {

    if (resultado === undefined) {
        resultado = loadConsumoDiario();
    }

    if (resultado === undefined) {
        return;
    }

    var outputResultadoConsumoDiario = document.querySelector('#outputResultadoConsumoDiario');

    var msgResultado = "<div class='list resumo-calorias-diarias' style='margin-bottom: 20px;'>";
    msgResultado += "<div class='cols'>";
    msgResultado += "<div><div class='title'>Manter o peso</div> <b>" + resultado.manterPeso + " cal por dia</b> </div>";
    msgResultado += "<div><div class='title'>Para emagrecer</div> <b>" + resultado.perderPeso + " cal por dia</b> </div>";
    msgResultado += "<div><div class='title'>Para ganhar massa</div> <b>" + resultado.ganharMassa + " cal por dia</b> </div>";
    msgResultado += "<div><div class='title'>Proteínas</div> <b>" + resultado.proteinas + "g por dia</b> </div>";
    msgResultado += "</div>";
    msgResultado += "</div>";

    outputResultadoConsumoDiario.innerHTML = msgResultado;

    setRadiosCheck("inputGenero", resultado.genero);
    setRadiosCheck("inputAtividadeFisica", resultado.atividadeFisica);
    setNumberField("inputPeso", resultado.peso);
    setNumberField("inputAltura", resultado.altura);
    setNumberField("inputIdade", resultado.idade);


}
