import { getInputInt, getInputNumber, getInputValue } from "../lib/forms";
import { META_DIARIA_STORE } from "./config.service";
import { showError, showOk, showWarning } from "./message.service";
import { store } from "./store.service";


export const calcularMetaDiaria = () => {


    let numPeso = getInputNumber("inputPeso");
    let opcaoAtividadeFisica = getInputInt('input[name=inputAtividadeFisica]:checked');
    let genero = getInputValue('input[name=inputGenero]:checked');
    let objetivo = getInputValue('input[name=inputObjetivo]:checked');
    let altura = getInputNumber("inputAltura");

    let idade = getInputInt("inputIdade");
    try {
        if (numPeso && opcaoAtividadeFisica && altura && idade && objetivo) {

            if (!isNaN(numPeso) || !isNaN(opcaoAtividadeFisica)) {

                var numTMB = 0;

                if (altura.toString().indexOf(".") > -1) {
                    altura = altura * 100;
                }

                //masculino
                if (genero === "M") {
                    numTMB = 88.362 + (13.397 * numPeso) + (4.799 * altura) - (5.677 * idade);
                }
                // feminino  
                if (genero === "F") {
                    numTMB = 447.593 + (9.247 * numPeso) + (3.098 * altura) - (4.330 * idade);
                }

                numTMB = Math.round(numTMB);

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
                    let data: Dictionary[] = [];

                    if (genero &&
                        altura
                    ) {
                        data.push({
                            key: "genero",
                            value: genero
                        });

                        data.push({
                            key: "altura",
                            value: altura
                        });

                        data.push({
                            key: "idade",
                            value: idade
                        });

                        data.push({
                            key: "tmb",
                            value: numTMB
                        });

                        data.push({
                            key: "peso",
                            value: numPeso
                        });

                        data.push({
                            key: "atividadeFisica",
                            value: opcaoAtividadeFisica
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
                            value: objetivo
                        });
                    }

                    //Essa store deve registrar apenas um item
                    //por usuário do app.
                    let items: any[] = store.getItems(META_DIARIA_STORE);
                    let conditions: Dictionary[] = [];

                    if (items.length > 0) {
                        conditions.push({
                            key: "id",
                            value: items[0].id
                        })
                    }

                    store.updateItemsByFields(META_DIARIA_STORE, conditions, data);

                    showOk("Meta Diária cadastrada com sucesso.");

                } else {
                    showWarning("Digite de 1 a 3");
                }

            } else {
                showWarning("Digite opções numéricas.");
            }
        } else {
            alert(altura);
        }
    } catch (e: any) {
        showError(e.message + " " + altura);
    }
}


