// https://github.com/RAGUL1902/Dynamic-Memory-Allocation-in-C/tree/master

export default (mk) => {
  const headers = [
    "include/alloca.h",
    "include/malloc.h",
  ];

  const sources = [
    "malloc.c",
  ];

  const includes = [
    mk.SOURCE_DIR.join("include"),
    mk.target("libc").includes,
  ];

  const malloc = mk.addObjectLibrary("malloc", headers, sources);
  malloc.addIncludes(includes);

  mk.target("libc").addSources(mk.target("malloc").objects);
  mk.target("libc").addPublicIncludes(mk.SOURCE_DIR.join("include"));

  mk.install(headers, {
    destination: mk.INSTALL_INCLUDEDIR,
    baseDir: "include",
  });
  mk.script("<stdlib.h>").mergeVariables({
    SCRIPT_INCLUDES: [ "#include <alloca.h>", "#include <malloc.h>" ],
  });
}
