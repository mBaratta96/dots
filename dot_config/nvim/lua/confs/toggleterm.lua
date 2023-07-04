require("toggleterm").setup({
	direction = "horizontal",
	shade_terminals = false,
	size = 25,
	open_mapping = [[<c-\>]],
	autochdir = true,
})

function _G.set_terminal_keymaps()
	local opts = { noremap = true }
	vim.api.nvim_buf_set_keymap(0, "t", "<esc>", [[<C-\><C-n>]], opts)
	vim.api.nvim_buf_set_keymap(0, "t", "jk", [[<C-\><C-n>]], opts)
	vim.api.nvim_buf_set_keymap(0, "t", "<C-h>", [[<C-\><C-n><C-W>h]], opts)
	vim.api.nvim_buf_set_keymap(0, "t", "<C-j>", [[<C-\><C-n><C-W>j]], opts)
	vim.api.nvim_buf_set_keymap(0, "t", "<C-k>", [[<C-\><C-n><C-W>k]], opts)
	vim.api.nvim_buf_set_keymap(0, "t", "<C-l>", [[<C-\><C-n><C-W>l]], opts)
end

vim.cmd("autocmd! TermOpen term://* lua set_terminal_keymaps()")

local frogmouth_terminal = require("toggleterm.terminal").Terminal:new({
	shell = "usr/bin/bash",
	direction = "tab",
})

vim.api.nvim_create_user_command("Frogmouth", function()
	if vim.bo.filetype == "markdown" or vim.bo.filetype == "telekasten" then
		frogmouth_terminal.cmd = "frogmouth " .. vim.fn.expand("%:p")
		frogmouth_terminal:toggle()
	end
end, { desc = "toggle Frogmouth" })
