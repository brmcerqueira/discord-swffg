import { Message } from "katana/mod.ts";
import { diceRollManager } from "../diceRollManager.ts";
import { MessageEmbed } from "katana/mod.ts";
import { labels } from "../i18n/labels.ts";
import { format } from "../format.ts";

const regExpValues = /(\+(?<skill>[1-9]?\d))*(\*\+(?<proficiency>[1-9]?\d))*(\+\+(?<enlargement>[1-9]?\d))*(\-(?<difficulty>[1-9]?\d))*(\*\-(?<challenge>[1-9]?\d))*(\-\-(?<setback>[1-9]?\d))*/g

export function rollAction(message: Message, matchArray: RegExpMatchArray[]) {
    for(let match of matchArray) {
        if (match.groups) {

            let input: diceRollManager.RollInput = {
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
                        input.skill += parseInt(matchValues.groups["skill"]);
                    }

                    if (matchValues.groups["proficiency"]) {
                        input.proficiency += parseInt(matchValues.groups["proficiency"]);
                    }

                    if (matchValues.groups["enlargement"]) {
                        input.enlargement += parseInt(matchValues.groups["enlargement"]);
                    }

                    if (matchValues.groups["difficulty"]) {
                        input.difficulty += parseInt(matchValues.groups["difficulty"]);
                    }

                    if (matchValues.groups["challenge"]) {
                        input.challenge += parseInt(matchValues.groups["challenge"]);
                    }

                    if (matchValues.groups["setback"]) {
                        input.setback += parseInt(matchValues.groups["setback"]);
                    }
                }      
            } 
            
            let result = diceRollManager.roll(input);

            const embed = new MessageEmbed();
            
            embed.setDescription(parseResult(result));
        
            if (result.success > 0) {
                //Verde
                embed.setColor(3066993);
            }
            else {
                //Vermelho
                embed.setColor(15158332);
            }

            if (result.skill) {
                embed.addField(format(labels.skill, result.skill.amount), parsePositiveResult(result.skill), true);
            }

            if (result.proficiency) {
                embed.addField(format(labels.proficiency, result.proficiency.amount), parsePositiveResult(result.proficiency), true);
            }

            if (result.enlargement) {
                embed.addField(format(labels.enlargement, result.enlargement.amount), parsePositiveResult(result.enlargement), true);
            }

            if (result.difficulty) {
                embed.addField(format(labels.difficulty, result.difficulty.amount), parseNegativeResult(result.difficulty), true);
            }

            if (result.challenge) {
                embed.addField(format(labels.challenge, result.challenge.amount), parseNegativeResult(result.challenge), true);
            }

            if (result.setback) {
                embed.addField(format(labels.setback, result.setback.amount), parseNegativeResult(result.setback), true);
            }

            embed.addField(labels.player, `<@${message.user.id}>`, true);

            message.channel.send(embed);
        }      
    }
}

function parseResult(result: diceRollManager.DiceResult): string {
    return JSON.stringify(result);
}

function parsePositiveResult(result: diceRollManager.PositiveRollResult): string {
    return JSON.stringify(result);
}

function parseNegativeResult(result: diceRollManager.NegativeRollResult): string {
    return JSON.stringify(result);
}