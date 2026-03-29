param(
  [string]$Name
)

$ErrorActionPreference = "Stop"

function ToPascalCase([string]$value) {
  return ($value -split "-" | Where-Object { $_ -ne "" } | ForEach-Object {
    $_.Substring(0,1).ToUpper() + $_.Substring(1)
  }) -join ""
}

if (-not $Name) {
  $Name = Read-Host "Template name (kebab-case)"
}

if ($Name -notmatch "^[a-z0-9-]+$") {
  throw "Name must be kebab-case."
}

$root = Resolve-Path (Join-Path $PSScriptRoot "..")
$pkgDir = Join-Path $root "packages/$Name"

if (Test-Path $pkgDir) {
  throw "Package already exists: $Name"
}

$templatesRoot = Join-Path $root "templates/template"
if (-not (Test-Path $templatesRoot)) {
  throw "Templates not found: $templatesRoot"
}

New-Item -ItemType Directory -Force (Join-Path $pkgDir "src") | Out-Null

$pascal = ToPascalCase $Name

$replacements = @{
  "{{packageName}}" = $Name
  "{{componentNamePascal}}" = $pascal
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

powershell -ExecutionPolicy Bypass -File (Join-Path $PSScriptRoot "update-registry.ps1") -Name $Name -Type "template"

Write-Host "Created template: $Name"
