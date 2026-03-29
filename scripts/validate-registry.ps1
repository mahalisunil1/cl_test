param()

$ErrorActionPreference = "Stop"
$root = Resolve-Path (Join-Path $PSScriptRoot "..")
$registryPath = Join-Path $root "registry.json"

if (-not (Test-Path $registryPath)) {
  throw "registry.json not found"
}

$registry = Get-Content -Raw -Path $registryPath | ConvertFrom-Json

$missing = @()

function HasMeta($name) {
  return $registry.meta -and $registry.meta.$name
}

foreach ($name in $registry.components) {
  if (-not (HasMeta $name)) { $missing += $name }
}
foreach ($name in $registry.templates) {
  if (-not (HasMeta $name)) { $missing += $name }
}

if ($missing.Count -gt 0) {
  Write-Host "Missing registry metadata for:"
  $missing | ForEach-Object { Write-Host " - $_" }
  exit 1
}

Write-Host "Registry metadata OK."
