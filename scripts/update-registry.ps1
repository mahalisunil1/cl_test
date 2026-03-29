param(
  [Parameter(Mandatory=$true)][string]$Name,
  [ValidateSet("component","template")][string]$Type = "component"
)

$ErrorActionPreference = "Stop"
$root = Resolve-Path (Join-Path $PSScriptRoot "..")
$registryPath = Join-Path $root "registry.json"

if (-not (Test-Path $registryPath)) {
  throw "registry.json not found"
}

$registry = Get-Content -Raw -Path $registryPath | ConvertFrom-Json

$key = if ($Type -eq "template") { "templates" } else { "components" }

if (-not ($registry.PSObject.Properties.Name -contains $key)) {
  $registry | Add-Member -NotePropertyName $key -NotePropertyValue @()
}

if ($registry.$key -notcontains $Name) {
  $registry.$key += $Name
}

if (-not $registry.meta) {
  $registry | Add-Member -NotePropertyName meta -NotePropertyValue @{}
}

function ToTitleCase([string]$value) {
  return ($value -split "-" | ForEach-Object { $_.Substring(0,1).ToUpper() + $_.Substring(1) }) -join " "
}

$gitName = git config --get user.name
$authorName = if ($gitName) { $gitName } else { "unknown" }

$existing = $registry.meta."$Name"
if (-not $existing) {
  $entry = [ordered]@{
    title = ToTitleCase $Name
    description = ""
    author = [ordered]@{
      name = $authorName
    }
    tags = @()
    status = "draft"
    kind = $Type
  }
  if ($registry.meta -is [hashtable]) {
    $registry.meta[$Name] = $entry
  } else {
    $registry.meta | Add-Member -NotePropertyName $Name -NotePropertyValue $entry -Force
  }
} else {
  if (-not $existing.title) { $existing.title = ToTitleCase $Name }
  if (-not $existing.description) { $existing.description = "" }
  if (-not $existing.author) { $existing.author = [ordered]@{ name = $authorName } }
  if (-not $existing.tags) { $existing.tags = @() }
  if (-not $existing.status) { $existing.status = "draft" }
  if (-not $existing.kind) { $existing.kind = $Type }
}

$registry | ConvertTo-Json -Depth 5 | Set-Content -Path $registryPath -Encoding utf8

Write-Host "Updated registry: $key += $Name"
