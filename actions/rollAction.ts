import { Message } from "katana/mod.ts";

const regExpValues = /(\+(?<skill>[1-9]?\d))*(\*\+(?<proficiency>[1-9]?\d))*(\+\+(?<enlargement>[1-9]?\d))*(\-(?<difficulty>[1-9]?\d))*(\*\-(?<challenge>[1-9]?\d))*(\-\-(?<setback>[1-9]?\d))*/g

export function rollAction(message: Message, matchArray: RegExpMatchArray[]) {
    for(let match of matchArray) {
        if (match.groups) {

            let data = {
                skill: 0,
                proficiency: 0,
                enlargement: 0,
                difficulty: 0,
                challenge: 0,
                setback: 0
            };

            for(let matchValues of match.groups.data.matchAll(regExpValues)) {
                if (matchValues.groups) {
                    if (matchValues.groups["skill"]) {
                        data.skill += parseInt(matchValues.groups["skill"]);
                    }

                    if (matchValues.groups["proficiency"]) {
                        data.proficiency += parseInt(matchValues.groups["proficiency"]);
                    }

                    if (matchValues.groups["enlargement"]) {
                        data.enlargement += parseInt(matchValues.groups["enlargement"]);
                    }

                    if (matchValues.groups["difficulty"]) {
                        data.difficulty += parseInt(matchValues.groups["difficulty"]);
                    }

                    if (matchValues.groups["challenge"]) {
                        data.challenge += parseInt(matchValues.groups["challenge"]);
                    }

                    if (matchValues.groups["setback"]) {
                        data.setback += parseInt(matchValues.groups["setback"]);
                    }
                }      
            } 
            
            console.log(data);
        }      
    }
}