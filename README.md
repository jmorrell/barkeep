
# static-lr

Start a static file server in the current directory, inject a livereload snippet 
into the HTML files served, and update the browser without refreshing whenever
anything changes.

## Installation

```
npm install -g static-lr
```

## Usage

```
cd {{ your project's directory }}
tiny-lr
```

## Notes

This works by automatically inserting a liverelead script right before the close of the
body element. This might not work for all set ups. You can insert the script manually
by adding this tag to your HTML:

```html
<script src="http://localhost:35729/livereload.js"></script>
``` 

This uses [tiny-lr](https://github.com/mklabs/tiny-lr) and [gaze](https://github.com/shama/gaze) behind the scenes.

