# tetrio mod test branch
This is a branch to show how to modify an electron app with elecmod


## Building
For this I use yarn but feel free to use the equivalent npm commands

First grab the app.asar from the resources file in your tetrio desktop and copy it here

- Run `yarn` to install dependencies
- Run `yarn setup` to extract the asar
- Run `yarn patch` to apply patches
- Run `yarn update` to update hooks
- Run `yarn build` to remake the asar
- Copy out.asar from this directory to the resources directory where you got your app.asar from, and replace the app.asar

## Editing
> Note: When you work with a new repo run the steps in Building to make sure you have the latest edits in your files
> Do not edit elecmod generated sections of code
Make your changes

- Run `yarn update` to update the hooks
- Run `yarn rip` to update the patches
- Run `yarn build` to remake the asar

Or,
- Run `yarn dev` to do it all and move the built asar to the location specified in buildconfig.mjs