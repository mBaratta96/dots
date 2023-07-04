require("navigator").setup({
	mason = true,
	default_mapping = false,
	keymaps = {
		{ key = "gr", func = require("navigator.reference").async_ref, desc = "async_ref" },
	},
	lsp = {
		display_diagnostic_qf = false,
		format_on_save = false,
		disable_lsp = "all",
		diagnostic_scrollbar_sign = false,
	},
	icons = { icons = false },
})
