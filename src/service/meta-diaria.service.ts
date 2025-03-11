import { getInputInt, getInputNumber, getInputString, validateFields } from "../lib/forms";
import { META_DIARIA_STORE } from "./config.service";
import { showError, showOk, showWarning } from "../lib/message.lib";
import { store } from "./store.service";


export const calcularMetaDiaria = () => {


    let numPeso = getInputNumber("inputPeso", "Preencha o seu peso");
    let opcaoAtividadeFisica = getInputInt('input[name=inputAtividadeFisica]:checked', "Selecione o nível de atividade física");
    let genero = getInputString('input[name=inputGenero]:checked', "Selecione o seu gênero");
    let objetivo = getInputString('input[name=inputObjetivo]:checked', "Selecione o seu objetivo");
    let altura = getInputNumber("inputAltura", "Preencha a sua altura");
    let idade = getInputInt("inputIdade", "Forneça a sua idade");

    try {
        if (validateFields([idade, numPeso, altura, genero, objetivo, opcaoAtividadeFisica]) &&
            genero.value &&
            opcaoAtividadeFisica.value &&
            objetivo.value &&
            altura.value &&
            idade.value &&
            numPeso.value) {

            var numTMB = 0;

            if (altura.value && altura.value.toString().indexOf(".") > -1) {
                altura.value = altura.value * 100;
            }

            //masculino
            if (genero.value === "M") {
                numTMB = 88.362 + (13.397 * numPeso.value) + (4.799 * altura.value) - (5.677 * idade.value);
            }
            // feminino  
            if (genero.value === "F") {
                numTMB = 447.593 + (9.247 * numPeso.value) + (3.098 * altura.value) - (4.330 * idade.value);
            }

            numTMB = Math.round(numTMB);

            //var numTMB = numPeso * 22;

            if (opcaoAtividadeFisica.value >= 1 && opcaoAtividadeFisica.value <= 3) {

                var resultadoCaloriasPorDia = 0;

                if (opcaoAtividadeFisica.value === 1) {
                    resultadoCaloriasPorDia = numTMB * 1.4;
                }

                if (opcaoAtividadeFisica.value === 2) {
                    resultadoCaloriasPorDia = numTMB * 1.6;
                }

                if (opcaoAtividadeFisica.value === 3) {
                    resultadoCaloriasPorDia = numTMB * 1.8;
                }

                resultadoCaloriasPorDia = Math.round(resultadoCaloriasPorDia);

                var resultadoParaEmagrecer = Math.round(resultadoCaloriasPorDia - (resultadoCaloriasPorDia * 0.2));
                var resultadoParaGanharMassa = Math.round(resultadoCaloriasPorDia + (resultadoCaloriasPorDia * 0.1));
                var resultadoProteinas = Math.round(numPeso.value * 1.6);
                let data: Dictionary[] = [];

                if (genero &&
                    altura
                ) {
                    data.push({
                        key: "genero",
                        value: genero.value
                    });

                    data.push({
                        key: "altura",
                        value: altura.value
                    });

                    data.push({
                        key: "idade",
                        value: idade.value
                    });

                    data.push({
                        key: "tmb",
                        value: numTMB
                    });

                    data.push({
                        key: "peso",
                        value: numPeso.value
                    });

                    data.push({
                        key: "atividadeFisica",
                        value: opcaoAtividadeFisica.value
                    });

                    data.push({
                        key: "manterPeso",
                        value: resultadoCaloriasPorDia
                    });

                    data.push({
                        key: "perderPeso",
                        value: resultadoParaEmagrecer
                    });
                    data.push({
                        key: "ganharMassa",
                        value: resultadoParaGanharMassa
                    });
                    data.push({
                        key: "proteinas",
                        value: resultadoProteinas
                    });
                    data.push({
                        key: "objetivo",
                        value: objetivo.value
                    });
                }

                store.updateSingle(META_DIARIA_STORE, data);

                showOk("Meta Diária cadastrada com sucesso.");

            } else {
                showWarning("Digite de 1 a 3");
            }

        }

    } catch (e: any) {
        showError(e.message + " " + altura);
    }
}


