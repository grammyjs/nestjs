# grammY port of NestJS Telegraf

> :information_source: This project would not be possible without the help and assistance of [Aleksandr Bukhalo](https://t.me/bukhalo_a) and the fantastic [bukhalo/nestjs-telegraf](https://github.com/bukhalo/nestjs-telegraf) project.

---

This project was generated using [Nx](https://nx.dev).

🔎 **Smart, Fast and Extensible Build System**

---

## ⚠️ ALPHA STATUS DISCLAIMER

> This project is both my first grammY plugin and first NestJS project as well -- please be patient -- @drmikecrowe

### Alpha Status Implications

-   Alpha testers are needed to guide the implementation requirements needed for production deployments
-   As a pre-release, the API will likely change -- be prepared for breaking changes as we develop the optimal solution

### Pre-Release Action Items

-   [ ] Finish setting up nx build/release of `@grammyjs/nest` including permission delegation
-   [ ] Finalize decorator API functions and documentation
-   [ ] Determine node version support and limitations
-   [ ] Testing, Testing, Testing (need unit testsgram)

### Testing

To test out this repo, the following process is recommended until released:

-   Clone the repo
-   Run nx g @nrwl/nest:app mytestapp
-   Copy `.env.example` to `.env` and fill in with the appropriate information (leave `BOT_INFO` blank at first -- you will see a debug log showing how to fill it out in the future)
-   Run nx run mytestapp:serve to run your app (or use the Nx Console from VS Code).

Reference `nestjs-grammy` normally, and it will pull in the source code from the package.

The `packages/sample-echo-bot` is fully functioning and can be run with a bot token set in the environment

---

## Projects Included

-   [@grammyjs/nest](packages/grammy-nestjs) - The NestJS / grammY plugin source code
-   [sample-echo-bot](packages/sample-echo-bot) - a sample echo-bot written in NestJS
-   [sample-firebase-bot](packages/sample-firebase-bot) - the echo-bot written in NestJS using Firebase Functions for a serverless implementation

## Building

To build:

```sh
yarn nx run grammy-nestjs:build
```

## Deploying

To deploy:

```sh
yarn nx run grammy-nestjs:publish
```

## Firebase Emulation

> :warning: **Firebase Emulation Only** You may need to link `@grammyjs/nestjs` to this project. For example:

```sh
nx run grammy-nestjs:build
pushd dist/packages/grammy-nestjs/
yarn link
popd
yarn link @grammyjs/nestjs
```
