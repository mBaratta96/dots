local g = vim.g

g.block_string_syntaxes = {
    d2 = { "d2" },
    markdown = { "md", "markdown" },
}

require("overseer").setup({
    task_list = {
        direction = "right",
    },
})
