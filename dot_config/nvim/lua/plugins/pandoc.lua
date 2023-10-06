return {
	"vim-pandoc/vim-pandoc",
	dependencies = { "vim-pandoc/vim-pandoc-syntax" },
	cmd = "PDFPandoc",
	config = function()
		vim.api.nvim_create_user_command(
			"PDFPandoc",
			"set filetype=pandoc | Pandoc pdf --lua-filter /home/marco/.config/nvim/lua/confs/pandoc-filter.lua --variable colorlinks=true",
			{ desc = "Parse into pdf" }
		)
	end,
	init = function()
		vim.g["pandoc#command#latex_engine"] = "pdflatex"
		vim.g["pandoc#spell#enabled"] = false
		vim.g["pandoc#filetypes#pandoc_markdown"] = 0
		vim.g["pandoc#formatting#equalprg"] = "--reference-links"
	end,
}
