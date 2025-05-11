export default (mk) => {
  const headers = [
    "include/bits/wcsmbs_comm.h",
    "include/uchar.h",
    "include/wcsmbs.h",
    "include/wctype.h",
  ];

  const sources = [
    "src/alpha.h",
    "src/btowc.c",
    "src/c16rtomb.c",
    "src/c32rtomb.c",
    "src/casemap.h",
    "src/internal.c",
    "src/internal.h",
    "src/iswalnum.c",
    "src/iswctype.c",
    "src/iswdigit.c",
    "src/iswgraph.c",
    "src/iswalpha.c",
    "src/iswblank.c",
    "src/iswcntrl.c",
    "src/iswlower.c",
    "src/iswprint.c",
    "src/iswpunct.c",
    "src/iswspace.c",
    "src/iswupper.c",
    "src/iswxdigit.c",
    "src/mblen.c",
    "src/mbrlen.c",
    "src/mbrtoc16.c",
    "src/mbrtoc32.c",
    "src/mbrtowc.c",
    "src/mbsinit.c",
    "src/mbsnrtowcs.c",
    "src/mbsrtowcs.c",
    "src/mbstowcs.c",
    "src/mbtowc.c",
    "src/punct.h",
    "src/towctrans.c",
    "src/wcrtomb.c",
    "src/wcscat.c",
    "src/wcschr.c",
    "src/wcscmp.c",
    "src/wcscpy.c",
    "src/wcslen.c",
    "src/wcsncmp.c",
    "src/wcsnrtombs.c",
    "src/wcsrtombs.c",
    "src/wcstombs.c",
    "src/wctob.c",
    "src/wctomb.c",
    "src/wmemchr.c",
    "src/wmemcpy.c",
  ];

  const includes = [
    mk.SOURCE_DIR.join("include"),
  ];

  const wcsmbs = mk.addObjectLibrary("wcsmbs", headers, sources);
  wcsmbs.addPublicIncludes(includes);
  wcsmbs.addIncludes(mk.SOURCE_DIR);
  wcsmbs.addIncludes(mk.target("libc").includes);

  mk.target("libc").addPublicIncludes(includes);
  mk.target("libc").addSources(mk.target("wcsmbs").objects);

  mk.install(headers, {
    destination: mk.INSTALL_INCLUDEDIR,
    baseDir: "include",
  });

  mk.script("<stdlib.h>").mergeVariables({
    SCRIPT_INCLUDES: [ "#include <bits/wcsmbs_comm.h>" ],
  });
}
