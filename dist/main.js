"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const misc_1 = require("./commands/misc");
const help_1 = require("./commands/help");
const player_1 = require("./commands/player");
const admin_1 = require("./commands/admin");
const matchup_1 = require("./commands/matchup");
const common_1 = require("./general/common");
const discordBot_1 = require("./general/discordBot");
const smp = require("source-map-support");
const http = require("http");
const logs_1 = require("./general/logs");
const db_1 = require("./general/db");
const api_1 = require("./api/api");
const division_1 = require("./commands/division");
const map_1 = require("./commands/map");
const p = require("../package.json");
const database = new db_1.DB();
common_1.CommonUtil.init(database);
logs_1.Logs.init();
smp.install();
logs_1.Logs.log("Starting Bot");
const bot = new discordBot_1.DiscordBot(database);
const adminCommand = new admin_1.AdminCommand(database);
const miscCommand = new misc_1.MiscCommand(database);
const playerCommand = new player_1.PlayerCommand(database);
const divCommand = new division_1.DivisionCommand();
const mapCommand = new map_1.MapCommand();
const helpCommand = new help_1.HelpCommand();
const matchCommand = new matchup_1.MatchupCommand();
adminCommand.addCommands(bot);
miscCommand.addCommands(bot);
playerCommand.addCommands(bot);
divCommand.addCommands(bot);
mapCommand.addCommands(bot);
helpCommand.addCommands(bot);
matchCommand.addCommands(bot);
bot.login();
const healthcheck = http.createServer(function (req, res) {
    logs_1.Logs.log(req);
    res.write("pong");
    res.end();
});
logs_1.Logs.log(`Starting healthcheck server on 8080, version ${p.version}`);
//healthcheck.listen(8080);
const api = new api_1.API(database);
api.start();
//# sourceMappingURL=main.js.map