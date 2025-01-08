 //Calcular consumo diário calorias
 var listaCaloria = new Array();

 function calcularConsumoDiario() {

     var numPeso = document.getElementById("inputPeso").value;
     numPeso = parseFloat(numPeso);

     var opcaoAtividadeFisica = document.querySelector('input[name=inputAtividadeFisica]:checked').value;
     opcaoAtividadeFisica = parseInt(opcaoAtividadeFisica);

     var lista = document.querySelector('#lista');

     var genero = document.querySelector('input[name=inputGenero]:checked').value;

     var altura = document.getElementById("inputAltura").value;
     altura = parseInt(altura);

     var idade = document.getElementById("inputIdade").value;
     idade = parseInt(idade);

     if (!isNaN(numPeso) || !isNaN(opcaoAtividadeFisica)) {

         var numTMB = 0;

         //masculino
         if (genero === "1") {
             numTMB = 88.362 + (13.397 * numPeso) + (4.799 * altura) - (5.677 * idade);
         }
         // feminino  
         if (genero === "2") {
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

             var resultado = "<hr/>Calorias para manter o seu peso: <b>" + resultadoCaloriasPorDia + "</b>. <br/>Para emagrecer: <b>" + resultadoParaEmagrecer + "</b>. <br/>Para ganhar massa: <b>" + resultadoParaGanharMassa + "</b> ";
             
             listaCaloria.push(resultado);
         
             var msg = "";

             for (var i = 0; i < listaCaloria.length; i++) {
                 msg += ' <br> ' + listaCaloria[i];
             }

             lista.innerHTML = msg;

         } else {
             output.innerHTML = "Digite de 1 a 3";
         }

     } else {
         output.innerHTML = "Digite opções numéricas.";
     }

 }