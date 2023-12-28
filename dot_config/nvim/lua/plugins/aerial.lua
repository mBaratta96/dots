vim.keymap.set("n", "<leader>a", ":AerialToggle<CR>", { noremap = true })
return {
	"stevearc/aerial.nvim",
	opts = {
		on_attach = function(bufnr)
			-- Jump forwards/backwards with '{' and '}'
			vim.keymap.set("n", "E{", ":AerialPrev<CR>", { buffer = bufnr })
			vim.keymap.set("n", "E}", ":AerialNext<CR>", { buffer = bufnr })
		end,
		layout = { max_width = { 80, 0.4 }, min_width = 40, resize_to_content = true },
		backends = { "treesitter", "lsp", "markdown", "man" },
	},
}
