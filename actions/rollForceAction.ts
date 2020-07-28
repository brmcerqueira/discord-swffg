import { Message } from "katana/mod.ts";
import { diceRollManager } from "../diceRollManager.ts";
import { MessageEmbed } from "katana/mod.ts";
import { labels } from "../i18n/labels.ts";

export function rollForceAction(message: Message, matchArray: RegExpMatchArray[]) {
    const embed = new MessageEmbed();

    let result = diceRollManager.throwForceDice();

    if (result.light) {
        //Ouro
        embed.setTitle(labels.lightForceLabel).setColor(15844367);
    }
    else {
        //Preto
        embed.setTitle(labels.darkForceLabel).setColor(0);
    }

    embed.addField(labels.value, `**${result.value}**`, true)
    .addField(labels.player, `<@${message.user.id}>`, true);

    message.channel.send(embed);
}