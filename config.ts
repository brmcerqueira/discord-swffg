import { Config } from "config/mod.ts";

export type ConfigDef = {
    discordToken: string
}

export const config: ConfigDef = <ConfigDef> await Config.load({
    file: 'default'
});