import { EQUIPOS } from "../constantes/equipos";
import { PARTIDOS } from "../constantes/partidos";
import { sumaPunto } from "./sumaPunto";

export function match(jornada, division, categoria ,dia, hora, equipoLocal, golLocal, equipoVisitante, golVisitante){

    if(jornada === 'cuartos' || 'semi' || 'final' && division === 'copa gchu') {
        let local = EQUIPOS.find(e => e.nombre_equipo === equipoLocal);
        let visitante = EQUIPOS.find(e => e.nombre_equipo === equipoVisitante);

        return PARTIDOS.push({ jornada, division, categoria , local, visitante, golLocal, golVisitante, dia, hora })
    }

    let local = EQUIPOS.find(e => e.nombre_equipo === equipoLocal && e.categoria === categoria);
    let visitante = EQUIPOS.find(e => e.nombre_equipo === equipoVisitante && e.categoria === categoria);

    if (!golLocal && !golVisitante) {return PARTIDOS.push({jornada, division, categoria , local, visitante, golLocal, golVisitante, dia, hora }) 
    }
    else if(golLocal > golVisitante){
        sumaPunto(local, visitante, 'VL', golLocal, golVisitante);
        return PARTIDOS.push({jornada, division, categoria , local, visitante, golLocal, golVisitante, dia,hora})
    }
    else if(golLocal < golVisitante){
        sumaPunto(local, visitante, 'VV', golLocal, golVisitante);
        return PARTIDOS.push({jornada, division, categoria , local, visitante, golLocal,golVisitante, dia,hora})
    }
    else if(golLocal === golVisitante){
        sumaPunto(local, visitante, 'E', golLocal, golVisitante);
        return PARTIDOS.push({jornada, division, categoria , local, visitante, golLocal, golVisitante, dia,hora})
    } 
}