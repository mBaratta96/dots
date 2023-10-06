return {
	{ "chrisbra/csv.vim", ft = "csv" },
	{ "jalvesaq/Nvim-R", ft = { "r", "rmd" } },
	{ "kblin/vim-fountain", ft = { "fountain" } },
	{ "vim-pandoc/vim-rmarkdown", ft = "rmd" },
	{ "wellle/targets.vim", event = "BufRead" },
	{
		"petertriho/nvim-scrollbar",
		event = "BufRead",
		opts = {},
	},
	{
		"arturgoms/moonbow.nvim",
		config = function()
			vim.cmd("colorscheme moonbow")
		end,
		lazy = false,
	},
	{
		"jcdickinson/wpm.nvim",
	},
	{ "rbong/vim-flog", dependencies = { "tpope/vim-fugitive" }, cmd = "Flog" },
	{
		"tpope/vim-fugitive",
		config = function()
			local command = vim.api.nvim_create_user_command
			command("Gcoa", "Git coa <args>", { nargs = 1 })
			command("Gcheck", "Git checkout <args>", { nargs = 1 })
			command("Gpushbranch", "Git push --set-upstream origin <args>", { nargs = 1 })
		end,
		cmd = { "Gcoa", "Gcheck", "Gpushbranch", "G" },
	},
	{
		"numToStr/Comment.nvim",
		event = "BufRead",
		opts = {},
	},
	{
		"weilbith/nvim-code-action-menu",
		cmd = "CodeActionMenu",
	},
}
