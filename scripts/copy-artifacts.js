const fs = require("fs");
const path = require("path");

const artifacts = ["README.md", "CHANGELOG.md", "LICENSE.md"];

function copyArtifact(file) {
  fs.copyFile(
    path.join(__dirname, "../", file),
    path.join(__dirname, "../project/angular-klasha", file),
    (err) => {
      if (err) {
        console.log("An error occurred", err.message);
      } else {
        console.log(`${file} copied`);
      }
    }
  );
}

artifacts.forEach(copyArtifact);
