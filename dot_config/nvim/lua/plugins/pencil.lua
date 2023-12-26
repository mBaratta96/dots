return {
	"preservim/vim-pencil",
	ft = { "markdown", "pandoc", "fountain" },
	init = function()
		vim.g["pencil#autoformat"] = 1
		vim.g["pencil#textwidth"] = 120
	end,
	config = function()
		vim.api.nvim_create_autocmd("FileType", {
			pattern = { "markdown", "mkd", "text", "fountain" },
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
