export default class MakePlugin {
  apply(mk) {
    mk.addSubdirectoryAlias(mk.PROJECT_SOURCE_DIR.join("uapi/malloc"), "malloc");
    mk.addSubdirectoryAlias(mk.PROJECT_SOURCE_DIR.join("uapi/wcsmbs"),  "musl-multibyte");
  }
};
