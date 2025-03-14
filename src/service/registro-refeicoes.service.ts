import { localISOString } from "../lib/treatments";

export const agrupaDias = (items: RegistroRefeicaoItem[]) => {

    let ordenado: RegistroRefeicaoItem[] = items.sort((a: RegistroRefeicaoItem, b: RegistroRefeicaoItem) => {
        return new Date(b.created).getTime() - new Date(a.created).getTime();
    });

    var diasGroup: RefeicaoDia[] = [];

    let diasGroupItem = {
        dia: localISOString(),
        registros: [] as RegistroRefeicaoItem[]
    }

    diasGroup.push(diasGroupItem);
    let dia: string = diasGroupItem.dia.substring(0, 10);

    for (var i = 0; i < ordenado.length; i++) {

        let diaLoop:string = ordenado[i].created.substring(0, 10);

        if (dia !== diaLoop) {
            diasGroupItem = {
                dia: ordenado[i].created,
                registros: [] as RegistroRefeicaoItem[]
            }
            diasGroup.push(diasGroupItem);
            dia = diaLoop;
        }

        diasGroupItem.registros.push(ordenado[i]);

    }

    return diasGroup;
}