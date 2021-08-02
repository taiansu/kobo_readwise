# KoboReadwise

Send Kobo eReader bookmarks to Readwise.

## Pre-request

- Have nodejs 14+ installed

## Installation

1. Clone this project to your machine, run `npm i` to install the dependencies.
2. open the `config.json` file, and replace the token value to what you get from [https://readwise.io/access_token](https://readwise.io/access_token)

## Usage

1. Connect your KOBO eReader with via USB
2. On your KOBO eReader, once the "Computer detected" screen pop-up, click the `[Connect]` button.
3. On your computer, run `npm start`.
4. Check your Readwise dashboard, the bookmarks should be imported.

## Disclaimer

Only test with KOBO forma and KOBO elipsa, on macOS for now.

## Roadmap

1. Windows support
2. Get source_url and cover_url from some book API
3. Find a way to get more accurate bookmark create time. It use `SyncTime` on bookmark currently.

## License

Apache License, Version 2.0
