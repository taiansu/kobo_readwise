#!/usr/bin/env node
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import entry from '../index.js';
// import {config, run} from '../index.js'


function main() {
  yargs(hideBin(process.argv))
    .usage('Usage: $0 [command]')
    .command('$0', "Push KOBO eReader bookmarks to Readwise", () => {}, push)
    .command('config', 'Config your Readwise access token', {}, config)
    .help('h')
    .alias('h', 'help')
    .argv;
}

function push(_argv) {
  entry();
}

function config(argv) {
  console.log('config')
  console.log(argv)
}

main();

