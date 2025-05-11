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

await libarchive.decompress("archive.zip", "dist");
```

CLI
---

The command line **libarchive** supports files extracting from archive .

```
$> npx libarchive -xf archive.zip -C dist
```

```
$> npx libarchive --extract --file=archive.zip --directory=dist
```
