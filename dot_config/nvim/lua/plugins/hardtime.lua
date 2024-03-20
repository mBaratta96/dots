return {
	"m4xshen/hardtime.nvim",
	dependencies = { "MunifTanjim/nui.nvim", "nvim-lua/plenary.nvim" },
	opts = {
		disabled_filetypes = {
			"qf",
			"help",
			"code-action-menu-menu",
			"netwr",
			"NvimTree",
			"lazy",
			"mason",
			"oil",
			"JABSwindow",
			"aerial",
			"floggraph",
			"grapple",
			"fugitive",
		},
	},
	event = "BufRead",
}
