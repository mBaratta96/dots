return {
	"lervag/vimtex",
	ft = { "tex", "plaintex" },
	init = function()
		vim.g.vimtex_view_method = "zathura"
		vim.g.vimtex_format_enabled = 1
		vim.g.vimtex_quickfix_mode = 0
	end,
}
