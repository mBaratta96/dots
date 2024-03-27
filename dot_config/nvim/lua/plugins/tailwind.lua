return {
	{
		"razak17/tailwind-fold.nvim",
		init = function()
			vim.opt.conceallevel = 2
			vim.opt.concealcursor = ""
		end,
		opts = {},
		dependencies = { "nvim-treesitter/nvim-treesitter" },
		ft = { "html", "svelte", "astro", "vue", "typescriptreact", "php", "blade" },
	},
	{
		"luckasRanarison/tailwind-tools.nvim",
		dependencies = { "nvim-treesitter/nvim-treesitter" },
		opts = {}, -- your configuration
	},
}
