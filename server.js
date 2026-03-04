const express = require("express");
const ytdlp = require("yt-dlp-exec");

const app = express();

app.get("/", (req, res) => {
  res.send("Server is running ✅");
});

app.get("/download", async (req, res) => {
  const url = req.query.url;

  if (!url) {
    return res.send("No URL provided");
  }

  try {
    const data = await ytdlp(url, {
      dumpSingleJson: true
    });

    res.redirect(data.url);
  } catch (e) {
    res.send("Error extracting video");
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running");
});