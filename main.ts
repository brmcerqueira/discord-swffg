import { Client, Message } from "katana/mod.ts";
import { labels } from "./i18n/labels.ts";
import { config } from "./config.ts";
import { rollAction } from "./actions/rollAction.ts";
import { rollForceAction } from "./actions/rollForceAction.ts";
import { rollPercentageAction } from "./actions/rollPercentageAction.ts";

const client = new Client();

client.on('ready', () => {
  console.log(labels.welcome);
});

type RegExpAction = {
  regex: RegExp,
  action: (message: Message, matchArray: RegExpMatchArray[]) => void
}

const regExpActions: RegExpAction[] = [{
  regex: /^\$/g,
  action: rollForceAction
},
{
  regex: /^%\s(?<data>.*)/g,
  action: rollAction
},
{
  regex: /^%/g,
  action: rollPercentageAction
}];

client.on('message', (message: Message) => {
  for (let regExpAction of regExpActions) {
    let resultMatchAll = [...message.content.matchAll(regExpAction.regex)];
    if (resultMatchAll.length > 0) {
      regExpAction.action(message, resultMatchAll);
      break;
    }
  }
});

client.login(config.discordToken);