local ccc = require("ccc")
ccc.setup({
    pickers = {
        ccc.picker.hex,
        ccc.picker.css_rgb,
        ccc.picker.css_hsl,
        ccc.picker.css_hwb,
        ccc.picker.css_lab,
        ccc.picker.css_lch,
        ccc.picker.css_oklab,
        ccc.picker.css_oklch,
        ccc.picker.css_name,
    },
    highlighter = {
        auto_enable = true,
        lsp = true,
        excludes = { "markdown", "text", "tex", "fountain", "mason", "NvimTree", "telekasten", "pandoc" },
    },
})
