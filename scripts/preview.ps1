param(
  [Parameter(Mandatory=$true)][string]$Name,
  [int]$Port = 5173
)

$ErrorActionPreference = "Stop"
$root = Resolve-Path (Join-Path $PSScriptRoot "..")

function Test-Server {
  param([int]$Port)
  try {
    $resp = Invoke-WebRequest -Uri "http://localhost:$Port" -UseBasicParsing -TimeoutSec 2
    return $resp.StatusCode -ge 200 -and $resp.StatusCode -lt 500
  } catch {
    return $false
  }
}

if (-not (Test-Server -Port $Port)) {
  Write-Host "Starting docs dev server..."
  Start-Process -FilePath "cmd.exe" -ArgumentList "/c pnpm dev:docs" -WorkingDirectory $root | Out-Null
  Start-Sleep -Seconds 2
}

$url = "http://localhost:$Port/?preview=$Name"
Write-Host "Opening $url"
Start-Process $url
