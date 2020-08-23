
const help_section = () => {
    return (
        `codniv generate : To generate boiler plate
.......Android commands.............
codniv make:screen [screenName] : To make new screens
codniv make:install : To install library for generated files
........Web commands.................
codniv web:screen [screenName] : To generate web pages with scss
codniv web:action [actionName] : To generate Actions and reducers
        `
    )
}

exports.help = () => {
return(
    console.log(help_section())
)
};
