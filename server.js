let express = require("express");
let app = express();
let reloadMagic = require("./reload-magic.js");
let mapboxgl = require("mapbox-gl");
let MapboxDirections = require("@mapbox/mapbox-gl-directions");

reloadMagic(app);

app.use("/", express.static("build")); // Needed for the HTML and JS files
app.use("/", express.static("public")); // Needed for local assets

// Your endpoints go after this line

// Your endpoints go before this line

app.all("/*", (req, res, next) => {
  // needed for react router
  res.sendFile(__dirname + "/build/index.html");
});

app.listen(4000, "0.0.0.0", () => {
  console.log("Server running on port 4000");
});
