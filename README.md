libarchive.js
=======

**libarchive.js** is a JS wrapper for [libarchive](https://github.com/libarchive/libarchive), compiled with [WASMUX](https://github.com/ykbin/wasmux).

Usage
-----

```
$> npm install libarchive
```

```js
import libarchive from "libarchive";

await libarchive.compress([ "dir", "file" ], "archive.zip");
await libarchive.decompress("archive.zip", "dist");
```

CLI
---

The command line **libarchive** supports files extracting from archive.

```
$> npx libarchive -xvf archive.zip -C dist
```

```
$> npx libarchive --extract --verbose --file=archive.zip --directory=dist
```

The command line **libarchive** supports compressing files into archive.

```
$> npx libarchive -cvf archive.tar dir file
```

```
$> npx libarchive --create --verbose --file=archive.zip dir file
```
