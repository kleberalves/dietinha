import { getInputInt, getInputNumber, getInputString, validateFields } from "../lib/forms";
import { stores } from "./config.service";
import { showError, showOk, showWarning } from "../lib/message.lib";
import { store } from "./store.service";
import { sync } from "./sync.service";


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

                let perfil: Perfil = {
                    genero: genero.value,
                    altura: altura.value,
                    idade: idade.value,
                    tmb: numTMB,
                    peso: numPeso.value,
                    atividadeFisica: opcaoAtividadeFisica.value,
                    manterPeso: resultadoCaloriasPorDia,
                    perderPeso: resultadoParaEmagrecer,
                    ganharMassa: resultadoParaGanharMassa,
                    proteinas: resultadoProteinas,
                    objetivo: objetivo.value
                } as Perfil

                store.updateSingle<Perfil>(stores.Perfil, perfil);

                showOk("Meta Diária cadastrada com sucesso.");

                sync();

            } else {
                showWarning("Digite de 1 a 3");
            }

        }

    } catch (e: any) {
        showError(e.message + " " + altura);
    }
}


