## Run Client

### Prerequisite

LTS version of [Node.js](https://nodejs.org) should be installed. nvm is recommended. 

### Commands to Run Client

* `npm install` - install dependencies. Need to execute before first run or when dependencies updated.
* `npm start` - run client. URL to open in browser will be printed on console. By default, api pointing to **dev** (remote) back-end
* `npm run start:local`- run client with api pointing to **local** back-end.
* `npm run start:dev` - run client with api pointing to **dev** (remote) back-end.
* `npm run build` - assembling prod version. All assets will be saved in *dist* folder 
* `npm run serve` - run node server for serving static from *dist* folder. Useful for checking dev configured builds locally
