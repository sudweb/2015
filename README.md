# Sud Web 2015 [![Stories in Ready](https://badge.waffle.io/sudweb/2015.png?label=ready&title=Ready)](https://waffle.io/sudweb/2015) [![Build Status](https://travis-ci.org/sudweb/2015.png?branch=master)](https://travis-ci.org/sudweb/2015)

Source code for [http://sudweb.fr/2015](http://sudweb.fr/2015) event website.

Just some good old static webpages. We like to KISS.

## Requirements

We mainly rely on the [Node.js®](https://nodejs.org/) platform.

Node can be easily installed with [Homebrew](http://brew.sh/) on Mac OS X, just type:

`brew install node`

### Thumbnails

You also need to install [GraphicsMagick](http://www.graphicsmagick.org).

```bash
brew install graphicsmagick
```

### Attendees

```bash
API_KEY=xxx ACCESS_TOKEN=xxx npm run get-attendees
npm run build-attendees
```

## Install

Clone the repo:

```bash
git clone https://github.com/sudweb/2015.git sudweb2015 && cd sudweb2015
```

To install all dependencies mentioned in the `package.json` file, type:

`npm install`

In order to automatically check for HTML and Sass changes, type:

`npm run watch`

```bash
$ npm run watch
Running "htmlhint:build" (htmlhint) task
>> 6 files lint free.

Running "sass:dist" (sass) task

Running "watch" task
Waiting...
```

To ease browser debugging, we may add support for browsersync soon, but for now there's no live reload.

## Deploy

### Production

Once you are satisfied and are ready to deploy on `sudweb.fr/2015`, proceed as below:

```bash
npm run deploy-prod && ssh sudweb 'cd www/2015 && git pull'
```

`sudweb` is a hostname configured in `~/.ssh/config`:

```
# Sud Web
Host sudweb
Hostname ssh.alwaysdata.com
User sudweb
```

**Notice**: In order to be able to deploy, you need to add an [SSH key](https://help.github.com/articles/generating-ssh-keys/) on your Github account. You can also add your key in the `.ssh/authorized_keys` file on the server.

### Development

To share what you have done without publishing it live, use the following command:

```bash
npm run deploy-dev
```

The content will be available on `http://<your username>.github.io/2015`.

## Contribute

You can also [create an issue](https://github.com/sudweb/2015/issues/new) on GitHub, if you have found a bug.

If you wanna help, you may want to [fork](https://help.github.com/articles/fork-a-repo/) the repo, then commit your changes and [open a pull request](https://github.com/sudweb/2015/pulls).

Made with love by Sud Web Team.
