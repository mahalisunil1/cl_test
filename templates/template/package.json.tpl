{
  "name": "@mahalisunil1/{{name}}",
  "version": "0.0.1",
  "private": false,
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "default": "./dist/index.js"
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
