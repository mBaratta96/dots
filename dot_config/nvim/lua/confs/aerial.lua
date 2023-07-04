require("aerial").setup({
	on_attach = function(bufnr)
		-- Jump forwards/backwards with '{' and '}'
		vim.keymap.set("n", "{", ":AerialPrev<CR>", { buffer = bufnr })
		vim.keymap.set("n", "}", ":AerialNext<CR>", { buffer = bufnr })
	end,
	layout = { max_width = { 100, 0.4 }, min_width = 40, resize_to_content = true },
	lazy_load = true,
	backends = { "treesitter", "lsp", "markdown", "man" },
})
