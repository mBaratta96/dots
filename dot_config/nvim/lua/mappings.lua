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
map("n", "<leader>fp", ":Telescope projects<CR>", options)
map("n", "<leader>wc", "<C-W><C-Q>", options)
map("n", "<leader>gp", ":Git push<CR>", options)
map("n", "<leader>gP", ":Git pull<CR>", options)
map("n", "<leader>m", ":Mason<CR>", options)
map("n", "<leader>ot", ":OverseerToggle<CR>", options)
map("n", "<leader>u", "gUU", options)
map("n", "zo", "zO", options)
map("n", "<leader>a", ":AerialToggle<CR>", options)
map("n", "<leader>c", ":CodeActionMenu<CR>", options)
map("n", "<leader>F", ":Frogmouth<CR>", options)

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

--command("D2", "OverseerRunCmd d2 -w --layout=elk -p 4300 --dark-theme 200 % out.svg", { desc = "Generate D2 diagram" })

-- vim.api.nvim_create_autocmd("WinEnter", {
-- 	pattern = "*",
-- 	callback = function()
-- 		vim.cmd("normal! zz")
-- 	end,
-- })
