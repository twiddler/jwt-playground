# What is this?

This is a hands-on playground for understanding how to use JSON Web Tokens.

# Installation

This uses [`pnpm`](https://pnpm.io/) as package manager. To install the project, use

```shell
npm install -g pnpm
pnpm i
```

# Usage

We use automated [`jest`](https://jestjs.io/) tests to make sure everything works the way we think it does. To run the tests, we need to start the server and then run the tests.

In one terminal, run

```shell
npm run dev
```

to start the server. In another terminal,

```shell
npm test
```

to run the tests in watch mode.

While the two commands are running, you can work on `index.js` and `index.jest.js`. The server will automatically restart and the tests will run again.
