const Eris = require("eris");
const keep_alive = require("./keep_alive.js");

if (!process.env.token) {
  console.warn(
    "WARNING: No 'token' secret found. Set it in Replit Secrets to connect to Discord.",
  );
} else {
  const bot = new Eris(process.env.token);

  function setStatus() {
    bot.editStatus("online", [{ type: 4, name: "Custom Status", state: ".gg/rollbet" }]);
  }

  bot.on("ready", () => {
    setStatus();
    setInterval(setStatus, 5 * 60 * 1000);
    console.log("Connected and status set.");
  });

  bot.on("error", (err) => {
    console.error(err);
  });

  bot.connect();
}
