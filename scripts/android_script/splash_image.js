const Jimp = require("jimp");


exports.generateSplash = (name) => {
//mipmap-hdpi
Jimp.read(name, (err, lenna) => {
  if (err) throw err;
  lenna.resize(480, 800).write("res/mipmap-hdpi/ic_launcher.png");
});

//mipmap-mdpi
Jimp.read(name, (err, lenna) => {
  if (err) throw err;
  lenna.resize(320, 480).write("res/mipmap-mdpi/ic_launcher.png");

});

//mipmap-xhdpi
Jimp.read(name, (err, lenna) => {
  if (err) throw err;
  lenna.resize(720, 1280).write("res/mipmap-xhdpi/ic_launcher.png");

});

//mipmap-xxhdpi
Jimp.read(name, (err, lenna) => {
  if (err) throw err;
  lenna.resize(960, 1600).write("res/mipmap-xxhdpi/ic_launcher.png");
});

//mipmap-xxxhdpi
Jimp.read(name, (err, lenna) => {
  if (err) throw err;
  lenna.resize(1280, 1920).write("res/mipmap-xxxhdpi/ic_launcher.png");

});
}