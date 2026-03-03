const express = require("express");
const cors = require("cors");
const { exec } = require("child_process");

const app = express();
app.use(cors());

app.get("/download", (req, res) => {
    const url = req.query.url;

    if (!url) {
        return res.status(400).send("No URL provided");
    }

    const command = `yt-dlp -f best -g "${url}"`;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.log(error);
            return res.status(500).send("Error extracting video");
        }

        const videoUrl = stdout.trim();
        res.send(videoUrl);
    });
});

app.get("/", (req, res) => {
    res.send("Server is running ✅");
});

app.listen(3000, () => {
    console.log("🔥 Server running on port 3000");
});
