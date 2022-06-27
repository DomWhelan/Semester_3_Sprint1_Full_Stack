let initText = `
app init <command>

Usage:

app init --all          creates the folder structure and config file
app init --dir          creates the folder structure
app init --fs           creates the text files with default settings

`;

let configText = `
app config <command>

Usage:

app config --show                 displays a list of the current config settings
app config --reset                resets the config file with default settings
app config --set <name> <value>   sets a specific config setting

`;

let tokenText = `
app token <command>

Usage:

app token --count                displays a count of the tokens created
app token --new <username>       generates a token for a given username, saves tokens to the json file
app token --findUser <username>  fetches a token for a given username

`;

const configJson = {
  name: "AppConfigCLI",
  version: "1.0.0",
  description: "The Command Line Interface (CLI) for the App.",
  main: "app.js",
  superuser: "adm1n",
};

module.exports = {
  initText,
  configText,
  tokenText,
  configJson,
};
