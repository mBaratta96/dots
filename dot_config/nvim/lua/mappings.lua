local map = vim.keymap.set

vim.g.mapleader = ","
vim.g.maplocalleader = ","

local options = { noremap = true }
map("n", "<C-d>", "<C-d>zz", options)
map("n", "<C-u>", "<C-u>zz", options)
map("n", "G", "Gzz", options)
map("n", "<leader>h", "<C-S-w>h", options)
map("n", "<leader>l", "<C-S-w>l", options)
map("n", "<leader>k", ":bnext<CR>zz", options)
map("n", "<leader>j", ":bprev<CR>zz", options)
map("n", "<leader>o", "o<Esc>", options)
map("n", "<leader>wc", "<C-W><C-Q>", options)
map("n", "<leader>u", "gUU", options)
map("n", "zo", "zO", options)
map("n", "<leader>c", ":CodeActionMenu<CR>", options)

local command = vim.api.nvim_create_user_command

command(
    "ParseFountain",
    "! afterwriting --source % --pdf --overwrite --config $HOME/.config/nvim/afterwriting-settings.json",
    { desc = "Parse fountain file and save it as a pdf." }
)
command(
    "ParseFountainTitle",
    "! afterwriting --source % --pdf --overwrite --config $HOME/.config/nvim/afterwriting-settings.json --setting print_title_page=true",
    { desc = "Parse fountain file and save it as a pdf." }
)

command(
    "CompressPDF",
    "! gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.5 -dNOPAUSE -dQUIET -dBATCH -dPrinted=false -sOutputFile=foo-compressed.pdf foo.pdf",
    { desc = "Compress PDF" }
)

command("SelectAll", "%y+", { desc = "Select all text" })
