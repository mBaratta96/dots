return {
	"preservim/vim-pencil",
	ft = { "markdown", "pandoc", "fountain" },
	config = function()
		vim.g["pencil#autoformat"] = 1
		vim.g["pencil#textwidth"] = 120
		vim.api.nvim_create_autocmd("BufEnter", {
			pattern = { "*.md", "*.txt", "*.fountain" },
			callback = function()
				local path = vim.fn.expand("%:p")
				if string.find(path, "requirements.txt") then
					return
				end
				if string.find(path, ".fountain") or string.find(path, "/home/marco/Documenti/projects/notes/") then
					vim.api.nvim_command("PencilSoft")
					return
				end
				vim.api.nvim_command("PencilHard")
			end,
		})
	end,
}
