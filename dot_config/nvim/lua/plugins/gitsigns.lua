return {
	"lewis6991/gitsigns.nvim",
	event = "BufRead",
	opts = { sign_priority = 100 },
	init = function()
		vim.opt.signcolumn = "yes:2"
	end,
}
