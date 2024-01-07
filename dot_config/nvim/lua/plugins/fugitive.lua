return {
	"tpope/vim-fugitive",
	config = function()
		local options = { noremap = true }
		local map = vim.keymap.set
		map("n", "<leader>gp", ":Git push<CR>", options)
		map("n", "<leader>gP", ":Git pull<CR>", options)
		local command = vim.api.nvim_create_user_command
		command("Gcoa", "Git coa <args>", { nargs = 1 })
		command("Gcheck", "Git checkout <args>", { nargs = 1 })
		command("Gpushbranch", "Git push --set-upstream origin <args>", { nargs = 1 })
	end,
	cmd = { "Gcoa", "Gcheck", "Gpushbranch", "G" },
}
