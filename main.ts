import { Client, Message } from "katana/mod.ts";
import { labels } from "./i18n/labels.ts";
import { config } from "./config.ts";
import { rollAction } from "./actions/rollAction.ts";

const client = new Client();

client.on('ready', () => {
  console.log(labels.welcome);
});

type RegExpAction = {
  regex: RegExp,
  action: (message: Message, matchArray: RegExpMatchArray[]) => void
}

const regExpActions: RegExpAction[] = [{
  regex: /^%\s*(\+(?<skill>[1-9]?\d))?\s*(\*\+(?<proficiency>[1-9]?\d))?\s*(\+\+(?<enlargement>[1-9]?\d))?\s*(\-(?<difficulty>[1-9]?\d))?\s*(\*\-(?<challenge>[1-9]?\d))?\s*(\-\-(?<setback>[1-9]?\d))?\s*(?<description>.*)/g,
  action: rollAction
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