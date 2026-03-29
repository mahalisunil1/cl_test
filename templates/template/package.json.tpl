{
  "name": "@mahalisunil1/{{name}}",
  "version": "0.0.1",
  "private": false,
  "main": "./dist/index.mjs",
  "types": "./dist/index.d.mts",
  "exports": {
    ".": {
      "types": "./dist/index.d.mts",
      "default": "./dist/index.mjs"
    }
  },
  "files": [
    "dist",
    "src"
  ],
  "scripts": {
    "build": "tsup"
  },
  "dependencies": {
    "@mahalisunil1/{{componentName}}": "workspace:*"
  },
  "publishConfig": {
    "access": "public"
  }
}
