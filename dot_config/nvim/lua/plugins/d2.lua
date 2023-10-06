return {
	"terrastruct/d2-vim",
	init = function()
		vim.g.block_string_syntaxes = {
			d2 = { "d2" },
			markdown = { "md", "markdown" },
		}
	end,
	ft = "d2",
}
