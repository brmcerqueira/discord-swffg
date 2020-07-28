import { Message } from "katana/mod.ts";
import { diceRollManager } from "../diceRollManager.ts";
import { MessageEmbed } from "katana/mod.ts";
import { labels } from "../i18n/labels.ts";

export function rollPercentageAction(message: Message, matchArray: RegExpMatchArray[]) {
    message.channel.send(new MessageEmbed()
    .setColor(10181046)
    .addField(labels.percentageLabel, `**${diceRollManager.throwPercentageDice()}%**`, true)
    .addField(labels.player, `<@${message.user.id}>`, true));
}