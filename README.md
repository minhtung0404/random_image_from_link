# Random image from link

## Description
This project is used to show a random image from your URL list.

## Requirement
- Node.js

## How to use
- Clone this repository
- Create `config.json` file contains a PATH to your JSON file.
Example:
```json
{
    "Path" : "/home/Your_computer/a.json"
}
```
- In your a.json file create a `URLlist` contains all your URLs.
- Run `npm install` to install all package from `package.json`
- Run `node index.js`
- Your image will be showed on port `8080`. You can click anywhere to show another random image.
