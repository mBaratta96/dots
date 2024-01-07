return {
	"danymat/neogen",
	dependencies = "nvim-treesitter/nvim-treesitter",
	ft = { "python", "typescriptreact" },
	opts = {
		snippet_engine = "luasnip",
		languages = {
			python = {
				template = {
					annotation_convention = "google_docstrings", -- for a full list of annotation_conventions, see supported-languages below,
				},
			},
			typescriptreact = {
				template = {
					annotation_convention = "jsdoc",
				},
			},
		},
	},
	version = "*",
}
