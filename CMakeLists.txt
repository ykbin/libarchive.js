cmake_minimum_required(VERSION 3.8)
project(libarchive-js VERSION 0.0.1 LANGUAGES ASM C CXX)

list(APPEND CMAKE_MODULE_PATH "${CMAKE_CURRENT_SOURCE_DIR}/cmake")

include(GNUInstallDirs)

find_package(ZLIB REQUIRED)
find_package(LZ4 REQUIRED)
find_package(BZip2 REQUIRED)
find_package(LibLZMA REQUIRED)
find_package(ZSTD REQUIRED)
find_package(LibArchive REQUIRED)

set(libarchive_SOURCES
  src/jsbindings.cpp
  )

set(libarchive_INCLUDES
  "${CMAKE_CURRENT_SOURCE_DIR}"
  "${CMAKE_CURRENT_BINARY_DIR}"
  )

set(libarchive_LIBRARIES
  ZLIB::ZLIB
  LZ4::LZ4
  BZip2::BZip2
  LibLZMA::LibLZMA
  ZSTD::ZSTD
  LibArchive::LibArchive
  )

source_group(TREE "${CMAKE_CURRENT_SOURCE_DIR}" FILES ${libarchive_SOURCES})
add_executable(libarchive ${libarchive_SOURCES})
target_link_libraries(libarchive PRIVATE ${libarchive_LIBRARIES})
set_target_properties(libarchive PROPERTIES SUFFIX ".wasm")

install(TARGETS libarchive
  RUNTIME DESTINATION "/"
  )
