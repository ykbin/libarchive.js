// https://github.com/kraj/musl

"use strict";

module.exports = (mk) => {
  const headers = [
    "include/bits/locale_struct.h",
    "include/iconv.h",
    "include/langinfo.h",
    "include/locale.h",
    "include/nl_types.h",
  ];

  const sources = [
    "big5.h",
    "codepages.h",
    "gb18030.h",
    "hkscs.h",
    "jis0208.h",
    "ksc.h",
    "legacychars.h",
    "locale_impl.h",
    "pleval.h",
    "revjis.h",
    
    "bind_textdomain_codeset.c",
    "catclose.c",
    "catgets.c",
    "catopen.c",
    "c_locale.c",
    "dcngettext.c",
    "duplocale.c",
    "freelocale.c",
    "iconv.c",
    "iconv_close.c",
    "langinfo.c",
    "localeconv.c",
    "locale_map.c",
    "newlocale.c",
    "pleval.c",
    "setlocale.c",
    // strcoll.c
    // strfmon.c
    // strtod_l.c
    // strxfrm.c
    "textdomain.c",
    "uselocale.c",
    // wcscoll.c
    // wcsxfrm.c
    "__lctrans.c",
    "__mo_lookup.c",
  ];

  const definitions = [
    "_GNU_SOURCE",
  ];

  const includes = [
    mk.SOURCE_DIR.join("include"),
  ];

  const locale = mk.addObjectLibrary("locale", headers, sources);
  locale.addPublicIncludes(includes);
  locale.addIncludes(mk.SOURCE_DIR);
  locale.addIncludes(mk.target("libc").includes);
  locale.addDefinitions(definitions);

  mk.target("libc").addPublicIncludes(includes);
  mk.target("libc").addSources(mk.target("locale").objects);

  mk.install(headers, {
    destination: mk.INSTALL_INCLUDEDIR,
    baseDir: "include",
  });
}
