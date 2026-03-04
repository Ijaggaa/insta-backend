const express = require("express");
const { exec } = require("child_process");

const app = express();

app.get("/", (req, res) => {
  res.send("Server is running ✅");
});

app.get("/download", (req, res) => {
  const url = req.query.url;

  if (!url) {
    return res.send("No URL provided");
  }

  const command = `yt-dlp -g "${url}"`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(stderr);
      return res.send("Error extracting video");
    }

    const videoUrl = stdout.split("\n")[0];
    res.redirect(videoUrl);
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
