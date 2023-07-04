vim.g["pencil#autoformat"] = 1
vim.g["pencil#textwidth"] = 82

vim.api.nvim_create_autocmd("FileType", {
    pattern = { "markdown", "mkd", "text" },
    callback = function()
        local file = vim.fn.expand("%:f")
        if string.find(file, "requirements.txt") or string.find(file, ".fountain") then
            return
        end
        vim.api.nvim_command("PencilHard")
    end,
})
