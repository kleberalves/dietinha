import { localISOString } from "../lib/treatments";
import { META_DIARIA_STORE_HISTORICO } from "./config.service";
import { store } from "./store.service";

export const agrupaDias = (items: RegistroRefeicao[]) => {

    let ordenado: RegistroRefeicao[] = items.sort((a: RegistroRefeicao, b: RegistroRefeicao) => {
        return new Date(b.created).getTime() - new Date(a.created).getTime();
    });

    var diasGroup: RefeicaoDia[] = [];

    let diasGroupItem = {
        dia: localISOString(),
        registros: [] as RegistroRefeicao[]
    }

    diasGroup.push(diasGroupItem);
    let dia: string = diasGroupItem.dia.substring(0, 10);

    let metaHistorico = store.getItems<MetaDiaria[]>(META_DIARIA_STORE_HISTORICO);

    for (var i = 0; i < ordenado.length; i++) {

        let diaLoop:string = ordenado[i].created.substring(0, 10);

        if (dia !== diaLoop) {
            diasGroupItem = {
                dia: ordenado[i].created,
                registros: [] as RegistroRefeicao[]
            }
            diasGroup.push(diasGroupItem);
            dia = diaLoop;
        }

        diasGroupItem.registros.push(ordenado[i]);

    }

    return diasGroup;
}