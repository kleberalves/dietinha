import { beforeEach, describe, expect, it } from 'vitest'
import { agrupaDias } from './registro-refeicoes.service';

describe('Agrupador de dias', async () => {

  let items: Refeicao[]; 

  beforeEach(()=>{
    items = [{
      "id": "2872c49a-d456-4297-af48-344ab61d2153",
      "idCardapio": "005029e6-45a4-42b2-991e-11a7f0ec7ca4",
      "nome": "Arroz integral cozido", "tipo": "AJ",
      "calorias": 124,
      "proteinas": 3, "peso": 100,
      "created": "2025-02-18T12:19:32.217Z"
    },
    {
      "id": "2872c49a-d456-4297-af48-344ab61d2153",
      "idCardapio": "005029e6-45a4-42b2-991e-11a7f0ec7ca4",
      "nome": "Arroz integral cozido", "tipo": "AJ",
      "calorias": 124,
      "proteinas": 3, "peso": 100,
      "created": "2025-02-18T12:19:32.217Z"
    },
    {
      "id": "2872c49a-d456-4297-af48-344ab61d2153",
      "idCardapio": "005029e6-45a4-42b2-991e-11a7f0ec7ca4",
      "nome": "Arroz integral cozido", "tipo": "AJ",
      "calorias": 124,
      "proteinas": 3, "peso": 100,
      "created": "2025-02-17T12:19:32.217Z"
    },
    {
      "id": "2872c49a-d456-4297-af48-344ab61d2153",
      "idCardapio": "005029e6-45a4-42b2-991e-11a7f0ec7ca4",
      "nome": "Arroz integral cozido", "tipo": "AJ",
      "calorias": 124,
      "proteinas": 3, "peso": 100,
      "created": "2025-02-20T05:19:32.217Z"
    }];
  })

  it('agrupa os 4 dias e adiciona a data atual em um registro vazio', async () => {

    let list: RefeicaoDia[] = agrupaDias(items);

    expect(list.length).toBe(4);

    //O primeiro dia deve possuir 0 registros
    expect(list[0].registros.length).toBe(0);

    //O terceiro dia deve possuir 2 registros
    expect(list[2].registros.length).toBe(2);
  })
})