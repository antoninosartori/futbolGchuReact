export function sumaPunto(equipoLocal, equipoVisitante, resultado, golLocal, golVisitante){
    if(resultado === 'VL'){
        equipoLocal.pts = equipoLocal.pts + 3;
        equipoLocal.pj++;
        equipoLocal.pg++;
        equipoLocal.gf = equipoLocal.gf + golLocal;
        equipoLocal.gc = equipoLocal.gc + golVisitante;
        equipoLocal.dif = equipoLocal.dif + (golLocal - golVisitante);

        equipoVisitante.pj++;
        equipoVisitante.pp++;
        equipoVisitante.gf = equipoVisitante.gf + golVisitante;
        equipoVisitante.gc = equipoVisitante.gc + golLocal;
        equipoVisitante.dif = equipoVisitante.dif + (golVisitante - golLocal);

    } else if (resultado === 'VV'){
        equipoLocal.pj++;
        equipoLocal.pp++;
        equipoLocal.gf = equipoLocal.gf + golLocal;
        equipoLocal.gc = equipoLocal.gc + golVisitante;
        equipoLocal.dif = equipoLocal.dif + (golLocal - golVisitante);
        
        equipoVisitante.pts = equipoVisitante.pts + 3;
        equipoVisitante.pj++;
        equipoVisitante.pg++;
        equipoVisitante.gf = equipoVisitante.gf + golVisitante;
        equipoVisitante.gc = equipoVisitante.gc + golLocal;
        equipoVisitante.dif = equipoVisitante.dif + (golVisitante - golLocal);

    } else{
        equipoLocal.pts++;
        equipoLocal.pj++;
        equipoLocal.pe++;
        equipoLocal.gf = equipoLocal.gf + golLocal;
        equipoLocal.gc = equipoLocal.gc + golVisitante;
        equipoLocal.dif = equipoLocal.dif + (golLocal - golVisitante);


        equipoVisitante.pts++;
        equipoVisitante.pj++;
        equipoVisitante.pe++;
        equipoVisitante.gf = equipoVisitante.gf + golVisitante;
        equipoVisitante.gc = equipoVisitante.gc + golLocal;
        equipoVisitante.dif = equipoVisitante.dif + (golVisitante - golLocal);
    }
}