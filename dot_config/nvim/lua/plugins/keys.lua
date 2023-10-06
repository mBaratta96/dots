return {
	"folke/which-key.nvim",
	event = "BufRead",
	config = function()
		vim.o.timeout = true
		vim.o.timeoutlen = 500
		require("which-key").setup({})
	end,
}
