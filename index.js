const Eris = require("eris");
const keep_alive = require("./keep_alive.js");

if (!process.env.token) {
  console.warn(
    "WARNING: No 'token' secret found. Set it in Replit Secrets to connect to Discord.",
  );
} else {
  const bot = new Eris(process.env.token);

  function setStatus() {
    bot.shards.get(0).sendWS(3, {
      since: null,
      activities: [
        {
          type: 4,
          name: "Custom Status",
          state: ".gg/rollbet",
          emoji: null
        }
      ],
      status: "online",
      afk: false
    });
  }

  bot.on("ready", () => {
    setTimeout(setStatus, 3000);
    setInterval(setStatus, 5 * 60 * 1000);
    console.log("Connected and status set.");
  });

  bot.on("error", (err) => {
    console.error(err);
  });

  bot.connect();
}
