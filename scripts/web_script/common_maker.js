const fs = require("fs");

const makeCommon = (screen) => {
  return `import React from "react";
        
        const ${screen} = () => {
          return (
            <div>
              ${screen} common
            </div>
          );
        };
        
        export default ${screen};
        `;
};

const sassGenerator = (screen) => {
  return `
//${screen.toUpperCase()} STYLES
        `;
};

const sassExporter = (screen) => {
  return `
@import "./${screen}";
        `;
};

exports.webCommonMaker = (screen) => {
  const CURR_DIR = process.cwd();
  const pageName = screen.charAt(0).toUpperCase() + screen.slice(1);
  fs.mkdirSync(`${CURR_DIR}/components/common/${screen}`);
  const screens = `${CURR_DIR}/components/common/${screen}/${pageName}.common.js`;
  fs.writeFileSync(screens, makeCommon(pageName), "utf8");

  const sass = `${CURR_DIR}/sass/Layouts/common/_${screen}.scss`;
  fs.appendFile(sass, sassGenerator(screen), (err) => {
    if (err) throw err;
  });
  const sass_layout = `${CURR_DIR}/sass/Layouts/common/_0-common.scss`;
  fs.appendFile(sass_layout, sassExporter(screen), (err) => {
    if (err) throw err;
  });
};
