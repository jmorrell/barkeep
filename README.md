# barkeep

Start a static file server in the current directory, inject a livereload snippet 
into the HTML files served, and update the browser without refreshing whenever
anything changes.

![screencast](https://i.cloudup.com/FfO7zr12WW.gif)

## Installation

```
npm install -g barkeep
```

## CLI Usage

```
cd {{ your project's directory }}
barkeep
```

If you need to serve on a custom port you can do that too

```
barkeep -p 8080
```

## Module Usage

You can also require and use barkeep programatically in node.

```
var barkeep = require('barkeep');

barkeep(directory).listen(staticPort, livereloadPort, onListen);
```

All arguments to `listen` are optional. You can pass only the callback if you'd like. 

```
barkeep(directory).listen(onListen);
```

## Notes

This works by automagically inserting a liverelead script right before the close of the
body element. This might not work for all set ups. You can insert the script manually
by adding this tag to your HTML:

```html
<script src="http://localhost:35729/livereload.js"></script>
``` 

This uses [tiny-lr](https://github.com/mklabs/tiny-lr) and [gaze](https://github.com/shama/gaze) behind the scenes.

