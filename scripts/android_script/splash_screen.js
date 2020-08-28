const fs = require("fs");

const makeSplash = () => {
  return `
<?xml version="1.0" encoding="utf-8"?>
<layer-list xmlns:android="http://schemas.android.com/apk/res/android">

    <item
        android:drawable="@color/white"/>

    <item
        android:width="350dp"
        android:height="350dp"
        android:drawable="@mipmap/splash"
        android:gravity="center" />

</layer-list>

    `;
};

const makeColor = () => {
  return `
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <color name="white">#ffffff</color>
</resources>
   `;
};

const makeStyles = () => {
  return `
    <resources>

    <!-- Base application theme. -->
    <style name="AppTheme" parent="Theme.AppCompat.Light.NoActionBar">
        <!-- Customize your theme here. -->
        <item name="android:textColor">#000000</item>
    </style>
    <style name="SplashTheme" parent="Theme.AppCompat.Light.NoActionBar">
        <item name="android:windowBackground">@drawable/background_splash</item>
        <item name="android:statusBarColor">#000000</item>
    </style>

</resources>

    `;
};

exports.splashScreen = () => {
  const CURR_DIR = process.cwd();
  fs.mkdirSync(`${CURR_DIR}/android/app/src/main/res/drawable`);
  const splash = `${CURR_DIR}/android/app/src/main/res/drawable/background_splash.xml`;
  fs.writeFileSync(splash, makeSplash(), "utf8");

  const color = `${CURR_DIR}/android/app/src/main/res/values/colors.xml`;
  fs.writeFileSync(color, makeColor(), "utf8");

  const styles = `${CURR_DIR}/android/app/src/main/res/values/styles.xml`;
  fs.writeFileSync(styles, makeStyles(), "utf8");

  console.log(
    "add this line inside activity inside of application files",
    ` 
    android:theme="@style/SplashTheme"
    android:exported="true"
    `
  );
};
