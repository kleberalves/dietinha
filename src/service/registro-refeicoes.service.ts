import { localISOString } from "../lib/treatments";

export const agrupaDias = (items: RegistroRefeicaoItem[], metas?: RegistroMeta[]) => {

    let ordenado: RegistroRefeicaoItem[] = items.sort((a: RegistroRefeicaoItem, b: RegistroRefeicaoItem) => {

        if (b.created && a.created) {
            return new Date(b.created).getTime() - new Date(a.created).getTime();
        }

        return 0;
    });

    var diasGroup: RefeicaoDia[] = [];

    let diasGroupItem: RefeicaoDia = {
        dia: localISOString(),
        meta: undefined,
        registros: [] as RegistroRefeicaoItem[]
    }
    let dia: string = diasGroupItem.dia.substring(0, 10);

    if (metas) {
        diasGroupItem.meta = getMetaDia(dia, metas);
    }
    
    diasGroup.push(diasGroupItem);

    for (var i = 0; i < ordenado.length; i++) {
        let item = ordenado[i];

        if (item && item.created) {
            let diaLoop: string = item.created.substring(0, 10);
            let metaObj: RegistroMeta | undefined;

            if (metas) {
                metaObj = getMetaDia(diaLoop, metas);
            }

            if (dia !== diaLoop) {
                diasGroupItem = {
                    dia: item.created,
                    meta: metaObj,
                    registros: [] as RegistroRefeicaoItem[]
                }
                diasGroup.push(diasGroupItem);
                dia = diaLoop;
            }

            diasGroupItem.registros.push(ordenado[i]);
        }

    }

    return diasGroup;
}

function getMetaDia(diaLoop: string, metas: RegistroMeta[]): RegistroMeta | undefined {
    let meta: RegistroMeta | undefined;

    metas.forEach((item) => {
        if (item && item.dia) {
            let dia: string = (item.dia as any).substring(0, 10);
            if (dia === diaLoop) {
                meta = item;
            }
        }
    })

    return meta;
}
