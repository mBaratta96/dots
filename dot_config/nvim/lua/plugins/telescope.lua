local options = { noremap = true }
return {
	"nvim-telescope/telescope-file-browser.nvim",
	"nvim-telescope/telescope-project.nvim",
	"nvim-telescope/telescope-media-files.nvim",
	"nvim-telescope/telescope-fzy-native.nvim",
	{
		"nvim-telescope/telescope.nvim",
		branch = "0.1.x",
		cmd = "Telescope",
		dependencies = { { "nvim-lua/plenary.nvim" } },
		opts = {
			{
				media_files = {
					find_cmd = "fdfind",
				},
				aerial = {
					-- Display symbols as <root>.<parent>.<symbol>
					show_nesting = {
						["_"] = false, -- This key will be the default
						json = true, -- You can set the option for specific filetypes
						yaml = true,
					},
				},
			},
		},
		config = function(_, opts)
			require("telescope").load_extension("projects")
			require("telescope").load_extension("media_files")
			require("telescope").load_extension("file_browser")
			--			require("telescope").load_extension("aerial")
			require("telescope").load_extension("fzy_native")
			require("telescope").load_extension("notify")
			require("telescope").load_extension("rest")
			local builtin = require("telescope.builtin")
			local utils = require("telescope.utils")
			local map = vim.keymap.set
			map("n", "<leader>ff", builtin.find_files, options)
			map("n", "<leader>fg", function()
				builtin.live_grep({ cwd = utils.buffer_dir() })
			end, options)
			map("n", "<leader>fb", builtin.buffers, options)
			map("n", "<leader>fh", builtin.help_tags, options)
			map("n", "<leader>ft", ":Telescope file_browser path=%:p:h select_buffer=true<CR>", options)
			map("n", "<leader>fd", function()
				builtin.diagnostics({ bufnr = 0 })
			end, options)
			map("n", "<leader>fs", ":luafile $HOME/.config/nvim/lua/confs/telescope-scripts.lua<CR>")
			map("n", "<leader>fa", ":Telescope aerial<CR>")
			map("n", "<leader>fn", ":Telescope notify<CR>")
			map("n", "<leader>f/", builtin.search_history, options)
			map("n", "<leader>fp", ":Telescope projects<CR>", options)
			map("n", "<leader>fc", ":Telescope commands<CR>", options)
			require("telescope").setup(opts)
		end,
		lazy = false,
	},
}
