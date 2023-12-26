return {
	{
		"arturgoms/moonbow.nvim",
		config = function()
			vim.cmd("colorscheme moonbow")
		end,
		lazy = false,
	},
	{
		"m4xshen/hardtime.nvim",
		dependencies = { "MunifTanjim/nui.nvim", "nvim-lua/plenary.nvim" },
		opts = {},
		event = "BufRead",
	},
	{ "chrisbra/csv.vim", ft = "csv" },
	{ "jalvesaq/Nvim-R", ft = { "r", "rmd" } },
	{ "jcdickinson/wpm.nvim" },
	{ "kblin/vim-fountain", ft = { "fountain" } },
	{
		"lewis6991/gitsigns.nvim",
		event = "BufRead",
		opts = { sign_priority = 100 },
		init = function()
			vim.opt.signcolumn = "yes:2"
		end,
	},
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

	{ "vim-pandoc/vim-rmarkdown", ft = "rmd" },
	{ "wellle/targets.vim", event = "BufRead" },
	{
		"weilbith/nvim-code-action-menu",
		cmd = "CodeActionMenu",
	},
}
