$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing

# Original illustration, intentionally unrelated to a real city or address.
$destinationPath = Join-Path (Split-Path $PSScriptRoot -Parent) 'media-files\map.png'
$destinationDirectory = Split-Path $destinationPath -Parent
[System.IO.Directory]::CreateDirectory($destinationDirectory) | Out-Null
$bitmap = New-Object System.Drawing.Bitmap 960, 560
$graphics = [System.Drawing.Graphics]::FromImage($bitmap)
$graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$graphics.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit

function New-MapBrush([string] $hex) {
    return New-Object System.Drawing.SolidBrush ([System.Drawing.ColorTranslator]::FromHtml($hex))
}
function New-MapPen([string] $hex, [float] $width) {
    $pen = New-Object System.Drawing.Pen ([System.Drawing.ColorTranslator]::FromHtml($hex)), $width
    $pen.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
    $pen.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
    return $pen
}

$cream = New-MapBrush '#f7f3ea'
$block = New-MapBrush '#e6e2d7'
$sage = New-MapBrush '#cfd7bc'
$riverPen = New-MapPen '#c6d9d6' 60
$roadPen = New-MapPen '#fffdf8' 16
$roadEdgePen = New-MapPen '#dedacf' 20
$orange = New-MapBrush '#e4663d'
$dark = New-MapBrush '#25322c'
$white = New-MapBrush '#fffdf8'
$quiet = New-MapBrush '#677366'
$dot = New-MapBrush '#b1baa1'
$titleFont = New-Object System.Drawing.Font 'Arial', 20, ([System.Drawing.FontStyle]::Bold)
$smallFont = New-Object System.Drawing.Font 'Arial', 11
$labelFont = New-Object System.Drawing.Font 'Arial', 10

try {
    $graphics.FillRectangle($cream, 0, 0, 960, 560)
    $graphics.FillRectangle($block, 25, 20, 112, 78)
    $graphics.FillRectangle($block, 164, 20, 143, 78)
    $graphics.FillRectangle($sage, 335, 20, 193, 78)
    $graphics.FillRectangle($block, 556, 20, 111, 78)
    $graphics.FillRectangle($block, 697, 20, 123, 78)
    $graphics.FillRectangle($block, 843, 20, 90, 78)
    $graphics.FillRectangle($block, 25, 125, 112, 118)
    $graphics.FillRectangle($sage, 165, 124, 142, 117)
    $graphics.FillRectangle($block, 335, 125, 194, 118)
    $graphics.FillRectangle($block, 556, 125, 111, 118)
    $graphics.FillRectangle($block, 697, 125, 123, 118)
    $graphics.FillRectangle($sage, 844, 125, 89, 118)
    $graphics.FillRectangle($block, 25, 271, 112, 105)
    $graphics.FillRectangle($block, 165, 271, 142, 105)
    $graphics.FillRectangle($block, 336, 271, 193, 105)
    $graphics.FillRectangle($sage, 556, 271, 111, 105)
    $graphics.FillRectangle($block, 697, 271, 123, 105)
    $graphics.FillRectangle($block, 844, 271, 89, 105)
    $graphics.FillRectangle($block, 25, 405, 112, 88)
    $graphics.FillRectangle($block, 165, 405, 142, 88)
    $graphics.FillRectangle($sage, 336, 405, 193, 88)
    $graphics.FillRectangle($block, 556, 405, 111, 88)
    $graphics.FillRectangle($block, 697, 405, 123, 88)
    $graphics.FillRectangle($sage, 844, 405, 89, 88)

    $riverPath = New-Object System.Drawing.Drawing2D.GraphicsPath
    $riverPath.AddBezier(760, -30, 850, 80, 616, 130, 708, 235)
    $riverPath.AddBezier(708, 235, 800, 350, 598, 368, 679, 535)
    $graphics.DrawPath($riverPen, $riverPath)

    foreach ($mapX in @(150, 321, 542, 682, 830)) {
        $graphics.DrawLine($roadEdgePen, $mapX, 0, $mapX, 510)
        $graphics.DrawLine($roadPen, $mapX, 0, $mapX, 510)
    }
    foreach ($mapY in @(111, 257, 390)) {
        $graphics.DrawLine($roadEdgePen, 0, $mapY, 960, $mapY)
        $graphics.DrawLine($roadPen, 0, $mapY, 960, $mapY)
    }
    $graphics.DrawLine($roadEdgePen, 30, 510, 960, 145)
    $graphics.DrawLine($roadPen, 30, 510, 960, 145)

    foreach ($tree in @(@(370,47), @(406,72), @(451,46), @(488,74), @(191,152), @(255,186), @(194,219), @(593,301), @(629,341), @(369,436), @(422,466), @(489,432), @(875,155), @(901,203), @(870,438), @(911,469))) {
        $graphics.FillEllipse($dot, $tree[0], $tree[1], 17, 17)
    }
    $graphics.DrawString('Саябақ', $labelFont, $quiet, 420, 33)
    $graphics.DrawString('Саябақ', $labelFont, $quiet, 194, 171)
    $graphics.DrawString('Демалыс аймағы', $labelFont, $quiet, 375, 467)

    # Circular point and teardrop made with vector drawing primitives.
    $markerPoints = [System.Drawing.PointF[]] @(
        (New-Object System.Drawing.PointF 463, 244),
        (New-Object System.Drawing.PointF 497, 244),
        (New-Object System.Drawing.PointF 480, 278)
    )
    $graphics.FillPolygon($orange, $markerPoints)
    $graphics.FillEllipse($orange, 451, 205, 58, 58)
    $graphics.FillEllipse($white, 469, 223, 22, 22)
    $graphics.FillRectangle($white, 377, 282, 206, 48)
    $graphics.DrawString('Ainalym', $titleFont, $dark, 428, 289)

    $graphics.FillRectangle($cream, 0, 510, 960, 50)
    $graphics.DrawString('Үлгі карта · нақты мекенжай емес', $smallFont, $quiet, 27, 526)
    $graphics.DrawString('Ainalym', $smallFont, $quiet, 877, 526)
    $bitmap.Save($destinationPath, [System.Drawing.Imaging.ImageFormat]::Png)
    Write-Output "Created: $destinationPath"
} finally {
    if ($riverPath) { $riverPath.Dispose() }
    foreach ($drawingObject in @($titleFont, $smallFont, $labelFont, $cream, $block, $sage, $riverPen, $roadPen, $roadEdgePen, $orange, $dark, $white, $quiet, $dot, $graphics, $bitmap)) {
        if ($drawingObject) { $drawingObject.Dispose() }
    }
}
