param(
  [string]$Name,
  [ValidateSet("component")][string]$Type = "component",
  [switch]$Variants,
  [switch]$Animation
)

$ErrorActionPreference = "Stop"

function ToPascalCase([string]$value) {
  return ($value -split "-" | Where-Object { $_ -ne "" } | ForEach-Object {
    $_.Substring(0,1).ToUpper() + $_.Substring(1)
  }) -join ""
}

if (-not $Name) {
  $Name = Read-Host "Component name (kebab-case)"
}

if ($Name -notmatch "^[a-z0-9-]+$") {
  throw "Name must be kebab-case."
}

$root = Resolve-Path (Join-Path $PSScriptRoot "..")
$pkgDir = Join-Path $root "packages/$Name"

if (Test-Path $pkgDir) {
  throw "Package already exists: $Name"
}

$templatesRoot = Join-Path $root "templates/component"
if (-not (Test-Path $templatesRoot)) {
  throw "Templates not found: $templatesRoot"
}

New-Item -ItemType Directory -Force (Join-Path $pkgDir "src") | Out-Null

$scope = "components-layer"
$access = "public"
$pascal = ToPascalCase $Name

$replacements = @{
  "{{packageName}}" = $Name
  "{{packageScope}}" = $scope
  "{{publishAccess}}" = $access
  "{{componentNamePascal}}" = $pascal
  "{{animationImport}}" = if ($Animation) { 'import { gsap, createTimeline } from "@components-layer/animation"' } else { "" }
  "{{animationBlock}}" = if ($Animation) {
@"
    gsap.set(localRef.current, { opacity: 0, y: 10 })
    createTimeline().to(localRef.current, { opacity: 1, y: 0, duration: 0.35 })
"@
  } else { "" }
  "{{variantTypeDecl}}" = if ($Variants) { "export type ${pascal}Variant = `"default`" | `"outline`"" } else { "" }
  "{{variantProp}}" = if ($Variants) { "variant?: ${pascal}Variant" } else { "" }
  "{{variantClasses}}" = if ($Variants) {
@"
const variantClasses: Record<${pascal}Variant, string> = {
  default: "bg-[var(--cl-color-surface)] text-[var(--cl-color-foreground)]",
  outline: "border border-white/20 bg-transparent text-white"
}
"@
  } else { "" }
  "{{variantDefaults}}" = if ($Variants) { ", variant = `"default`"" } else { "" }
  "{{variantClassApply}}" = if ($Variants) { "variantClasses[variant]," } else { "" }
  "{{variantTypeExport}}" = if ($Variants) { ", ${pascal}Variant" } else { "" }
}

Get-ChildItem -Path $templatesRoot -Filter "*.tpl" | ForEach-Object {
  $content = Get-Content -Raw -Path $_.FullName
  foreach ($key in $replacements.Keys) {
    $content = $content -replace [regex]::Escape($key), [string]$replacements[$key]
  }

  $targetFile = $_.Name -replace "\.tpl$",""
  $isCode = $targetFile.EndsWith(".ts") -or $targetFile.EndsWith(".tsx")
  $inSrc = $isCode -and $targetFile -ne "tsconfig.json" -and $targetFile -ne "tsup.config.ts"
  $outDir = if ($inSrc) { Join-Path $pkgDir "src" } else { $pkgDir }
  $outPath = Join-Path $outDir $targetFile
  Set-Content -Path $outPath -Value $content -Encoding utf8
}

powershell -ExecutionPolicy Bypass -File (Join-Path $PSScriptRoot "update-registry.ps1") -Name $Name -Type $Type

Write-Host "Created package: $Name"
