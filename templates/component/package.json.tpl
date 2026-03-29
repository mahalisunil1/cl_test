{
  "name": "@mahalisunil1/{{packageName}}",
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
  "peerDependencies": {
    "react": "^18 || ^19",
    "react-dom": "^18 || ^19",
    "tailwindcss": "^3 || ^4"
  },
  "dependencies": {
    "@mahalisunil1/animation": "workspace:*",
    "@mahalisunil1/tokens": "workspace:*",
    "@mahalisunil1/utils": "workspace:*"
  },
  "publishConfig": {
    "access": "public"
  }
}
