# Sud Web 2014 website

Just some good old static webpages. We like to KISS.

## Contribute

Just fork this repo, commit your changes and open a pull request.

## Requirements

This project uses Sass, Compass, node and Grunt because we are cool kids.

You shoud be able to install Compass and node in a few commands:

* `gem install compass`
* `brew install node` on Mac OS X for instance

## Install

`npm install` will install all dependencies mentionned in the package.json file

Now you just have to type `grunt` to run tasks and watch the changes :)

```
user@host ~/www/sudweb/# grunt
Running "htmlhint:build" (htmlhint) task
>> 1 file lint free.

Running "compass:dist" (compass) task
   create css/ie.css (0.137s)
   create css/normalize.css (0.074s)
   create css/print.css (0.004s)
   create css/screen.css (0.124s)
overwrite css/sudweb.css (0.502s)
Compilation took 0.911s

Running "watch" task
Waiting...
```

Happy coding!
