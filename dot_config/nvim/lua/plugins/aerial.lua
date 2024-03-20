return {
    "stevearc/aerial.nvim",
    keys = { { "<leader>a", ":AerialToggle<CR>", { desc = "Toggle Aerial" } } },
    opts = {
        -- on_attach = function(bufnr)
        -- 	-- Jump forwards/backwards with '{' and '}'
        -- 	vim.keymap.set("n", "E{", ":AerialPrev<CR>", { buffer = bufnr })
        -- 	vim.keymap.set("n", "E}", ":AerialNext<CR>", { buffer = bufnr })
        -- end,
        lazy_load = false,
        layout = { max_width = { 80, 0.4 }, min_width = 30, resize_to_content = true },
        attach_mode = "global",
        backends = { "treesitter", "lsp", "markdown", "man" },
    },
}
