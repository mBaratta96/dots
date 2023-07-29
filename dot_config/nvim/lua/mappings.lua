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
map("n", "<leader>t", ":NvimTreeToggle<CR>", options)
map("n", "<leader>o", "o<Esc>", options)
map("n", "<leader>fp", ":Telescope projects<CR>", options)
map("n", "<leader>wc", "<C-W><C-Q>", options)
map("n", "<leader>gp", ":Git push<CR>", options)
map("n", "<leader>gP", ":Git pull<CR>", options)
map("n", "<leader>b", ":JABSOpen<CR>", options)
map("n", "<leader>m", ":Mason<CR>", options)
map("n", "<leader>ot", ":OverseerToggle<CR>", options)
map("n", "<leader>u", "gUU", options)
map("n", "zo", "zO", options)
map("n", "<leader>a", ":AerialToggle<CR>", options)
map("n", "<leader>c", ":CodeActionMenu<CR>", options)
map("n", "<leader>F", ":Frogmouth<CR>", options)

local builtin = require("telescope.builtin")

map("n", "<leader>ff", builtin.find_files, options)
map("n", "<leader>fg", builtin.live_grep, options)
map("n", "<leader>fb", builtin.buffers, options)
map("n", "<leader>fh", builtin.help_tags, options)
map("n", "<leader>ft", ":Telescope file_browser path=%:p:h select_buffer=true<CR>", options)
map("n", "<leader>fd", function()
	builtin.diagnostics({ bufnr = 0, severity_limit = vim.diagnostic.severity.WARN })
end, options)
map("n", "<leader>fs", ":luafile $HOME/.config/nvim/lua/confs/telescope-scripts.lua<CR>")
map("n", "<leader>fa", ":Telescope aerial<CR>")

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

command("Gcoa", "Git coa <args>", { nargs = 1 })
command("Gcheck", "Git checkout <args>", { nargs = 1 })
command("Gpushbranch", "Git push --set-upstream origin <args>", { nargs = 1 })

command("D2", "OverseerRunCmd d2 -w --layout=elk -p 4300 --dark-theme 200 % out.svg", { desc = "Generate D2 diagram" })

command(
	"PDFPandoc",
	"set filetype=pandoc | Pandoc pdf --lua-filter /home/marco/.config/nvim/lua/confs/pandoc-filter.lua",
	{ desc = "Parse into pdf" }
)

-- vim.api.nvim_create_autocmd("WinEnter", {
-- 	pattern = "*",
-- 	callback = function()
-- 		vim.cmd("normal! zz")
-- 	end,
-- })
