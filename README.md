# Simple Ronin Wallet

### Live Demo: https://simple-ronin-wallet.vercel.app/

### How to test

When accessing web app, if you don't login you need to unlock/login account by enter password **1234**. After logged in you can view account info, balances, send assets, reset balances, logout.

### Implement requirements

1. Login/Logout
2. REST API for GET Exchange Rate, GET Accoount, GET Balances, UPDATE Balances
3. UI Login/Homepage/Send Assets

Run following commands to run project on your local machine

###### Install dependencies

```bash
npm i
# or
yarn
```

###### Run development enviroment

```bash
npm run dev
# or
yarn dev
```

### Technologies

- **NextJS + Typescript**
- **React Context API**
- **SCSS**
- **Mongoose**

### App Structure: <br>

```
my-app
├── README.md
├── node_modules
├── package.json
├── .babelrc
├── next.config.js
├── nodemon.json
├── tsconfig.json
├── tsconfig.server.json
├── .gitignore
├── pages
│     ── api - REST API to communicate between backend & front-end
│          ── balances
│               ── [id].ts - [API] Update single ballance
│               ── index.ts - [API] Get all ballances
│               ── reset.ts - [API] Reset ballances to default value
│           ── account.ts: [API] Get account information
│           ── exchange-rates.ts - [API] Get exchange rates
│     ── _app.tsx.ts - Custom NextJS App
│     ── index.tsx - Homepage
│     ── login.tsx - Login page/Unlock page
│     ── send-assets.tsx - Send Assets page
├── server - Custom server NextJS
└── src
      ── assets - Includes: images, icons, fonts

      ── components
            ── Layout - Main layout for app
            ── Main - All components for homepage
            ── SendAssets - All components for send assets page
            ── Shared - All base components: Input, Button, Popup, ..
      ── constants - Define const variables

      ── context - Define app state using React Context API includes: account info, ballances, exchange rates

      ── hocs - High order components for authentication and get app state when first load app

      ── hooks - All custom react hooks

      ── models - Models definition

      ── services - API services to call api request

      ── styles - SCSS

      ── utils
            ── api - Utilities functions read/wrire file using to create RESET API
            ── auth - Utilities functions authentication
            ── balances - Including function convert response from api to model has been defined in client
            ── currency - Utilities functions convert/format curency
            ── database - Functions connect to MongoDB

      ── views
            ── Login - View for login page
            ── Main - View for homepage
            ── SendAssets - View for send assets page
```
