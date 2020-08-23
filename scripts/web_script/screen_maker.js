const fs = require("fs");

const makeScreen = (screen) => {
  return `import React from "react";

    const ${screen}Page = () => {
      return (
        <div>
          ${screen}Page 
        </div>
      )
    }

    export default ${screen}Page;`;
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

const layoutExporter = (screen) => {
  return `
@import "./${screen}Page/0-${screen}Page";
        `;
};

exports.webScreenMaker = (screen) => {
  const CURR_DIR = process.cwd();
  fs.mkdirSync(`${CURR_DIR}/components/${screen}Page`);
  const pageName = screen.charAt(0).toUpperCase() + screen.slice(1);
  const screens = `${CURR_DIR}/components/${screen}Page/${pageName}Page.js`;
  fs.writeFileSync(screens, makeScreen(pageName), "utf8");

  fs.mkdirSync(`${CURR_DIR}/sass/Layouts/${screen}Page`);

  const sass = `${CURR_DIR}/sass/Layouts/${screen}Page/_${screen}.scss`;
  fs.appendFile(sass, sassGenerator(screen), (err) => {
    if (err) throw err;
  });
  const sass_layout = `${CURR_DIR}/sass/Layouts/${screen}Page/_0-${screen}Page.scss`;
  fs.appendFile(sass_layout, sassExporter(screen), (err) => {
    if (err) throw err;
  });
  const layout_sass = `${CURR_DIR}/sass/Layouts/_0-layouts.scss`;
  fs.appendFile(layout_sass, layoutExporter(screen), (err) => {
    if (err) throw err;
  });
};
