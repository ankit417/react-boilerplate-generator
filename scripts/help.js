
const help_section = () => {
    return (
        `codniv generate : To generate boiler plate
.......Android commands.............
codniv make:screen [screenName] : To make new screens
codniv make:install : To install library for generated files
codniv android:splashscreen : to create splash screen in android
codniv android:res [imagename] : to generate android icon resource files
codniv android:splash [imagename] : to generate splash image
........Web commands.................

codniv web:screen [screenName] : To generate web pages with scss
codniv web:action [actionName] : To generate Actions and reducers
codniv web:install : To install web libraries
        `
    )
}

exports.help = () => {
return(
    console.log(help_section())
)
};
