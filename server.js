const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");
const qr = require("qr-image");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname)); // Serve static files from the current directory

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const data = req.body.input;
  const qrCode = qr.image(data, { type: "png" });
  const qrPath = __dirname + "/qrcode.png";
  qrCode.pipe(fs.createWriteStream(qrPath));

  qrCode.on("end", function () {
    const html = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
        <link
        href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Cormorant:wght@300&family=M+PLUS+1+Code&display=swap"
        rel="stylesheet" />
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha2/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-aFq/bzH65dt+w6FI2ooMVUpc+21e0SRygnTpmBvdBgSdnuTN7QbdgL+OapgHtvPp"
        crossorigin="anonymous" />
      <link href="./style.css" rel="stylesheet" />
        </head>
        <body>
        <div class="container">
        <h1>QR Code Generator</h1>
        <p>Type in your URL and have it converted into a QR image</p>
        <form action="/" method="post">
          <input type="text" name="input" placeholder="Type URL here" />
          <input type="submit" value="Generate QR Code" />
          </form>
          <img src="/qrcode.png" alt="QR Code" />
        </body>
      </html>
    `;

    res.type("html");
    res.send(html);
  });
});

app.get("/qrcode.png", function (req, res) {
  res.sendFile(__dirname + "/qrcode.png");
});

app.listen(3000, function () {
  console.log("Server running on port 3000");
});
