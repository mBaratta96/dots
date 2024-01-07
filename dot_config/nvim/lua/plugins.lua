return {
	{
		"arturgoms/moonbow.nvim",
		config = function()
			vim.cmd("colorscheme moonbow")
		end,
		lazy = false,
	},
	{ "chrisbra/csv.vim", ft = "csv" },
	{ "jalvesaq/Nvim-R", ft = { "r", "rmd" } },
	{ "jcdickinson/wpm.nvim" },
	{ "kblin/vim-fountain", ft = { "fountain" } },
	{
		"numToStr/Comment.nvim",
		event = "BufRead",
		opts = {},
	},
	{
		"petertriho/nvim-scrollbar",
		event = "BufRead",
		opts = {},
	},
	{ "rbong/vim-flog", dependencies = { "tpope/vim-fugitive" }, cmd = "Flog" },
	{ "vim-pandoc/vim-rmarkdown", ft = "rmd" },
	{ "wellle/targets.vim", event = "BufRead" },
	{
		"weilbith/nvim-code-action-menu",
		keys = { { "<leader>c", ":CodeActionMenu<CR>", { desc = "Open code action" } } },
	},
}
