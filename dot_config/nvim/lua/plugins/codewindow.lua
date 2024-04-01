return {
	"gorbit99/codewindow.nvim",
	event = "BufRead",
	opts = {
		minimap_width = 10,
		auto_enable = true,
		screen_bounds = "background",
		exclude_filetypes = {
			"qf",
			"tex",
			"code-action-menu-menu",
			"netwr",
			"NvimTree",
			"pandoc",
			"lazy",
			"mason",
			"oil",
			"JABSwindow",
			"aerial",
			"floggraph",
			"fugitive",
			"markdown",
			"fountain",
		},
	},
	config = function(_, opts)
		local codewindow = require("codewindow")
		codewindow.setup(opts)
		codewindow.apply_default_keybinds()
	end,
}
