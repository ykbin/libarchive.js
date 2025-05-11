if (TARGET LibArchive::LibArchive)
  set(LibArchive_FOUND TRUE)
  set(ARCHIVE_FOUND TRUE)
  return ()
endif ()

if (LibArchive_INCLUDE_DIR AND LibArchive_LIBRARY)
  set(LibArchive_FIND_QUIETLY TRUE)
endif ()

find_path(LibArchive_INCLUDE_DIR
  NAMES archive.h
  )

find_library(LibArchive_LIBRARY
  NAMES archive archive_static
  )

unset(LibArchive_FIND_LIBRARIES)

include(FindPackageHandleStandardArgs)
FIND_PACKAGE_HANDLE_STANDARD_ARGS(LibArchive DEFAULT_MSG LibArchive_INCLUDE_DIR LibArchive_LIBRARY)

mark_as_advanced(LibArchive_INCLUDE_DIR LibArchive_LIBRARY)

if (LibArchive_FOUND OR ARCHIVE_FOUND)
  set(LibArchive_FOUND TRUE)
  set(LibArchive_INCLUDE_DIRS ${LibArchive_INCLUDE_DIR})
  set(LibArchive_LIBRARIES "${LibArchive_LIBRARY}")
endif()

if (LibArchive_FOUND AND NOT TARGET LibArchive::LibArchive)
  add_library(LibArchive::LibArchive INTERFACE IMPORTED)
  set_property(TARGET LibArchive::LibArchive PROPERTY INTERFACE_INCLUDE_DIRECTORIES "${LibArchive_INCLUDE_DIR}")
  set_property(TARGET LibArchive::LibArchive PROPERTY INTERFACE_LINK_LIBRARIES "${LibArchive_LIBRARY}")
endif ()
