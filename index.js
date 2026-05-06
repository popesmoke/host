const Eris = require("eris");
const keep_alive = require("./keep_alive.js");

if (!process.env.token) {
  console.warn(
    "WARNING: No 'token' secret found. Set it in Replit Secrets to connect to Discord.",
  );
} else {
  const bot = new Eris(process.env.token);

  bot.on("ready", () => {
    bot.editStatus("online", [{ name: ".gg/rollbet", type: 4 }]);
    console.log("Connected and status set.");
  });

  bot.on("error", (err) => {
    console.error(err);
  });

  bot.connect();
}
