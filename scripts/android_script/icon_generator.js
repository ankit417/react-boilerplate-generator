const Jimp = require("jimp");


exports.generateIcon = (name) => {
//mipmap-hdpi
Jimp.read(name, (err, lenna) => {
  if (err) throw err;
  lenna.resize(72, 72).write("res/mipmap-hdpi/ic_launcher.png");
  lenna.circle().write("res/mipmap-hdpi/ic_launcher_round.png");
});

//mipmap-mdpi
Jimp.read(name, (err, lenna) => {
  if (err) throw err;
  lenna.resize(48, 48).write("res/mipmap-mdpi/ic_launcher.png");

  lenna.circle().write("res/mipmap-mdpi/ic_launcher_round.png");
});

//mipmap-xhdpi
Jimp.read(name, (err, lenna) => {
  if (err) throw err;
  lenna.resize(96, 96).write("res/mipmap-xhdpi/ic_launcher.png");

  lenna.circle().write("res/mipmap-xhdpi/ic_launcher_round.png");
});

//mipmap-xxhdpi
Jimp.read(name, (err, lenna) => {
  if (err) throw err;
  lenna.resize(144, 144).write("res/mipmap-xxhdpi/ic_launcher.png");
  lenna.circle().write("res/mipmap-xxhdpi/ic_launcher_round.png");
});

//mipmap-xxxhdpi
Jimp.read(name, (err, lenna) => {
  if (err) throw err;
  lenna.resize(192, 192).write("res/mipmap-xxxhdpi/ic_launcher.png");

  lenna.circle().write("res/mipmap-xxxhdpi/ic_launcher_round.png");
});
}