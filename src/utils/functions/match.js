import { EQUIPOS } from "../constantes/equipos";
import { GOLEADORES } from "../constantes/goleadores";
import { PARTIDOS } from "../constantes/partidos";
import { sumaPunto } from "./sumaPunto";

export function match(jornada, division, categoria, isCarrusel ,dia, hora, equipoLocal, golLocal, equipoVisitante, golVisitante, goleadoresLocales, goleadoresVisitantes){
    
    /* if(jornada === 'cuartos' || 'semi' || 'final' && division === 'copa gchu') {
        let local = EQUIPOS.find(e => e.nombre_equipo === equipoLocal);
        let visitante = EQUIPOS.find(e => e.nombre_equipo === equipoVisitante);

        return PARTIDOS.push({ jornada, division, categoria , local, visitante, golLocal, golVisitante, dia, hora, goleadoresLocales, goleadoresVisitantes })
    } */

    let local = EQUIPOS.find(e => e.nombre_equipo === equipoLocal && e.categoria === categoria && e.division === division);
    let visitante = EQUIPOS.find(e => e.nombre_equipo === equipoVisitante && e.categoria === categoria && e.division === division);

    // goleadores
    if(goleadoresLocales){
        goleadoresLocales.split(',').map(gol => {
            if(gol.includes('(ec)')){ return null }
            
            const isInGOLEADORES = GOLEADORES.some(jugador => jugador.nombre === gol && jugador.division === local.division )
            if(!isInGOLEADORES){
                GOLEADORES.push(  { 
                    nombre: gol,
                    gol: 1,
                    nombre_equipo: local.nombre_equipo,
                    nombre_equipo_short: local.nombre_equipo_short,
                    escudo_equipo: local.escudo_equipo,
                    division: local.division
                 }  )
            } else {
                GOLEADORES.find(jugador => jugador.nombre === gol && jugador.division === local.division).gol++
            } 
        })
    }

    if(goleadoresVisitantes){
        goleadoresVisitantes.split(',').map(gol => {
            if(gol.includes('(ec)')){ return null }
            const isInGOLEADORES = GOLEADORES.some(jugador => jugador.nombre === gol && jugador.division === visitante.division )
            if(!isInGOLEADORES){
                GOLEADORES.push(  { 
                    nombre: gol,
                    gol: 1,
                    nombre_equipo: visitante.nombre_equipo,
                    nombre_equipo_short: visitante.nombre_equipo_short,
                    escudo_equipo: visitante.escudo_equipo,
                    division: visitante.division
                 }  )
            } else {
                GOLEADORES.find(jugador => jugador.nombre === gol && jugador.division === visitante.division).gol++
            } 
        })
    }

    //partidos

    if (!golLocal && !golVisitante) {return PARTIDOS.push({jornada, division, categoria , isCarrusel , local, visitante, golLocal, golVisitante, dia, hora, goleadoresLocales, goleadoresVisitantes }) 
    }
    else if(golLocal > golVisitante){
        sumaPunto(local, visitante, 'VL', golLocal, golVisitante);
        return PARTIDOS.push({jornada, division, categoria, isCarrusel , local, visitante, golLocal, golVisitante, dia,hora, goleadoresLocales, goleadoresVisitantes})
    }
    else if(golLocal < golVisitante){
        sumaPunto(local, visitante, 'VV', golLocal, golVisitante);
        return PARTIDOS.push({jornada, division, categoria, isCarrusel , local, visitante, golLocal,golVisitante, dia,hora, goleadoresLocales, goleadoresVisitantes})
    }
    else if(golLocal === golVisitante){
        sumaPunto(local, visitante, 'E', golLocal, golVisitante);
        return PARTIDOS.push({jornada, division, categoria, isCarrusel , local, visitante, golLocal, golVisitante, dia,hora, goleadoresLocales, goleadoresVisitantes})
    }

}