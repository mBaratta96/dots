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
		opts = { document_color = { kind = "foreground" } }, -- your configuration
		ft = { "html", "svelte", "astro", "vue", "typescriptreact", "php", "blade" },
	},
	{
		"roobert/tailwindcss-colorizer-cmp.nvim",
		-- optionally, override the default options:
		config = function()
			require("tailwindcss-colorizer-cmp").setup({
				color_square_width = 2,
			})
		end,
	},
}
