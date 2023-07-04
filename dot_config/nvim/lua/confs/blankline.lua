vim.cmd([[highlight IndentBlanklineIndent1 guifg=#e57474 gui=nocombine]])
vim.cmd([[highlight IndentBlanklineIndent2 guifg=#8ccf7e gui=nocombine]])
vim.cmd([[highlight IndentBlanklineIndent3 guifg=#e5c76b gui=nocombine]])
vim.cmd([[highlight IndentBlanklineIndent4 guifg=#67b0e8 gui=nocombine]])
vim.cmd([[highlight IndentBlanklineIndent5 guifg=#c47fd5 gui=nocombine]])
vim.cmd([[highlight IndentBlanklineIndent6 guifg=#6cbfbf gui=nocombine]])

require("indent_blankline").setup({
    space_char_blankline = " ",
    char_highlight_list = {
        "IndentBlanklineIndent1",
        "IndentBlanklineIndent2",
        "IndentBlanklineIndent3",
        "IndentBlanklineIndent4",
        "IndentBlanklineIndent5",
        "IndentBlanklineIndent6",
    },
    show_current_context = true,
    show_current_context_start = true,
})
