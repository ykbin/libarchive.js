export default class MakePlugin {
  apply(mk) {
    mk.addSubdirectoryAlias(mk.PROJECT_SOURCE_DIR.join("uapi/malloc"), "malloc");
    mk.addSubdirectoryAlias(mk.PROJECT_SOURCE_DIR.join("uapi/wcsmbs"), "musl-multibyte");
    mk.addSubdirectoryAlias(mk.PROJECT_SOURCE_DIR.join("uapi/locale"), "musl-locale");
  }
};
