# Random image from link

## Description
This project is used to show a random image or a random manga from your URL list.

## Requirement
- Node.js

## How to use
- Clone this repository
- Create `config.json` file contains a `PATH` and a `download_path` to your JSON file.
Example:
```json
{
    "Path" : "/home/Your_computer/a.json",
    "download_path": "/home/Your_computer/Pictures"
}
```
- In your a.json file create a `URLlist` contains all your URLs.
- Run `npm install` to install all package from `package.json`
- Run `node index.js`
- Your web will be listened on port `8080`.
- You can click anywhere to show another random image.

## Note
- You need to put your manga into a list in the `json` file.
- This project doesn't support videos now.
