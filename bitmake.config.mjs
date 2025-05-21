// RUN npm install
// RUN npx bitmake build
// RUN npm run build:typo
// RUN npm run build:release

export default {
  "default": {
    environment: {
      PATH: [ "/opt/apps/LLVM-20.1.0-Linux-X64/bin" ],
    },
  },

  "bundle:wasmux": {
    base: "default",
    action: "bitmake",
    variables: {
      TOOLCHAIN_FILE: "${wasmux.mainDir}/toolchain/wasm32.mjs",
      INSTALL_PREFIX: "/usr",
      MAKE_PLUGIN_LIST: [ "${sourceRoot}/MakePlugin.mjs" ],
      WASMUX_ARCH: "seal",
      WASMUX_ENABLE_THREADS: true,
      WASMUX_ENABLE_KERNEL: false,
      WASMUX_ENABLE_MAIN_ENV_ARG: false,
      WASMUX_ENABLE_WAEDITOR: false,
    },
    sourceDir: "${wasmux.mainDir}",
    destDir: "${binaryRoot}/sysroot",
  },

  "bundle:zlib": {
    base: "default",
    sourceUrl: "https://www.zlib.net/zlib-1.3.1.tar.gz",
    action: "configure",
    variables: {
      prefix: "/usr",
    },
    environment: {
      CC: "clang",
      CXX: "clang++",
      LD: "wasm-ld",
      AR: "llvm-ar",
      STRIP: "llvm-strip",
      CFLAGS: [
        "--target=wasm32",
        "-matomics",
        "-mmultivalue",
        "-mbulk-memory",
        "-O3",
        "--sysroot=${binaryRoot}/sysroot/usr",
      ],
      LDFLAGS: [
        "-Wl,--export-dynamic",
        "-Wl,--import-memory",
        "-Wl,--stack-first",
        "-z", "stack-size=131072",
        "-rtlib=libgcc",
      ],
    },
    destDir: "${binaryRoot}/sysroot",
  },

  "bundle:lz4": {
    base: "default",
    sourceUrl: "https://github.com/lz4/lz4/releases/download/v1.10.0/lz4-1.10.0.tar.gz",
    action: "make",
    args: [
      "CC=clang",
      "LD=wasm-ld",
      'CFLAGS=--target=wasm32 -matomics -mmultivalue -mbulk-memory -O3 --sysroot="${binaryRoot}/sysroot/usr"',
      `LDFLAGS=-Wl,--export-dynamic -Wl,--import-memory -Wl,--stack-first -z stack-size=131072 -rtlib=libgcc -pthread`,
      `PREFIX=/usr`,
      "BUILD_SHARED=no",
      "VERBOSE=1",
      "install",
    ],
    binaryDir: "${sourceDir}",
    destDir: "${binaryRoot}/sysroot",
  },

  "bundle:bzip2": {
    base: "default",
    sourceUrl: "https://sourceware.org/pub/bzip2/bzip2-1.0.8.tar.gz",
    action: [
      {
        action: "process",
        command: "make",
        args: [
          "CC=clang",
          "LD=wasm-ld",
          "AR=llvm-ar",
          "STRIP=llvm-strip",
          'CFLAGS=--target=wasm32 -matomics -mmultivalue -mbulk-memory -O3 --sysroot="${binaryRoot}/sysroot/usr"',
          "LDFLAGS=-Wl,--export-dynamic -Wl,--import-memory -Wl,--stack-first -z stack-size=131072 -rtlib=libgcc",
          "PREFIX=/usr",
          "VERBOSE=1",
          "bzip2",
          "bzip2recover",
        ],
      },
      {
        action: "process",
        command: "make",
        args: [
          "install",
          'PREFIX="${binaryRoot}/sysroot/usr"',
          "VERBOSE=1",
        ],
      },
    ],
    binaryDir: "${sourceDir}",
  },

  "bundle:libarchive": {
    base: "default",
    action: "cmake",
    generator: "Unix Makefiles",
    sourceUrl: "https://github.com/libarchive/libarchive/releases/download/v3.7.9/libarchive-3.7.9.tar.gz",
    cacheVariables: {
      CMAKE_TOOLCHAIN_FILE: "${bundle:wasmux.destDir}/usr/share/wasmux/wasm32.toolchain.cmake",
      CMAKE_INSTALL_PREFIX: "/usr",
      CMAKE_C_FLAGS: "-pthread",
      BUILD_SHARED_LIBS: false,
    },
    destDir: "${binaryRoot}/sysroot",
  },

  "bundle:output": {
    base: "default",
    action: "cmake",
    generator: 'Unix Makefiles',
    cacheVariables: {
      CMAKE_TOOLCHAIN_FILE: "${bundle:wasmux.destDir}/usr/share/wasmux/wasm32.toolchain.cmake",
      CMAKE_INSTALL_PREFIX: "/",
      WASMUX_IMPORT_MEMORY: false,
      WASMUX_EXPORT_MEMORY: true,
    },
    sourceDir: "${sourceRoot}",
    destDir: "${sourceRoot}/dist",
    rebuild: true,
  },
};
