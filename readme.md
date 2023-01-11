# ElecMod
You can modify electron apps wow

# Usage

## First steps
- Clone this repository
- Open a terminal with the current working directory set to the folder you downloaded


## Setup
For this I use yarn but feel free to use the equivalent npm commands

First grab the app.asar from the electron app you want to modify

- Run `yarn` to install dependencies
- Run `yarn setup` to extract the asar
- Run `yarn patch` to apply patches
- Run `yarn update` to update hooks
- Run `yarn build` to remake the asar
- Copy out.asar from this directory to the resources directory where you got your app.asar from, and replace the app.asar

## Editing
> Note: When you have pulled/downloaded a repo run the steps in Building to make sure you have the latest edits in your game files
> Do not edit elecmod generated sections of code
Make your changes

- Run `yarn update` to update the hooks
- Run `yarn rip` to update the patches
- Run `yarn build` to remake the asar

Or,
- Run `yarn dev` to do it all and move the built asar to the location specified in buildconfig.mjs

# Documentation
In short: There is none. I'm too lazy.
If you want to see a slightly better example look at the tetrio branch. 
Although, tetrio is quite a bad example because it literally just loads the web version with some flags to show its electron
So there isnt much to mod