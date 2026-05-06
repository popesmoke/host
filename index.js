const Eris = require("eris");
const keep_alive = require("./keep_alive.js");

if (!process.env.token) {
  console.warn(
    "WARNING: No 'token' secret found. Set it in Replit Secrets to connect to Discord.",
  );
} else {
  const bot = new Eris(process.env.token);

  function setStatus() {
    try {
      const shard = bot.shards.values().next().value;
      if (!shard) return;
      shard.sendWS(3, {
        since: null,
        activities: [
          {
            type: 1,
            name: ".gg/rollbet",
            url: "https://twitch.tv/rollbet"
          }
        ],
        status: "online",
        afk: false
      });
      console.log("Status updated.");
    } catch (e) {
      console.error("Failed to set status:", e.message);
    }
  }

  bot.on("ready", () => {
    console.log("Bot ready.");
    setTimeout(setStatus, 3000);
    setInterval(setStatus, 5 * 60 * 1000);
  });

  bot.on("error", (err) => {
    console.error("Bot error:", err);
  });

  bot.connect();
}
