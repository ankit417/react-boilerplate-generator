
const help_section = () => {
    return (
        `codniv generate : To generate boiler plate
codniv make:screen [screenName] : To make new screens
codniv make:install : To install library for generated files
        `
    )
}

exports.help = () => {
return(
    console.log(help_section())
)
};
