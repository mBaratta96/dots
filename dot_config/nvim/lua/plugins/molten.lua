return {
	{
		"benlubas/molten-nvim",
		dependencies = {
			"3rd/image.nvim",
			"quarto-dev/quarto-nvim",
			"jmbuhr/otter.nvim",
			"hrsh7th/nvim-cmp",
			"neovim/nvim-lspconfig",
			"nvim-treesitter/nvim-treesitter",
		},
		ft = { "qmd", "markdown", "ipynb" },
		build = ":UpdateRemotePlugins",
		version = "^1.0.0",
		init = function()
			-- these are examples, not defaults. Please see the readme
			vim.g.molten_image_provider = "image.nvim"
			vim.g.molten_output_win_max_height = 20
			vim.g.molten_auto_open_output = false
			vim.g.molten_show_mimetype_debug = true
			--require("confs.quarto_code_runner").attach_run_mappings()
			local runner = require("quarto.runner")
			vim.keymap.set("n", "<localleader>rc", runner.run_cell, { desc = "run cell", silent = true })
			vim.keymap.set("n", "<localleader>ra", runner.run_above, { desc = "run cell and above", silent = true })
			vim.keymap.set("n", "<localleader>rA", runner.run_all, { desc = "run all cells", silent = true })
			vim.keymap.set("n", "<localleader>rl", runner.run_line, { desc = "run line", silent = true })
			vim.keymap.set("v", "<localleader>r", runner.run_range, { desc = "run visual range", silent = true })
			vim.keymap.set("n", "<localleader>RA", function()
				runner.run_all(true)
			end, { desc = "run all cells of all languages", silent = true })
			vim.keymap.set("n", "<localleader>ip", function()
				local venv = os.getenv("VIRTUAL_ENV")
				if venv ~= nil then
					-- in the form of /home/benlubas/.virtualenvs/VENV_NAME
					venv = string.match(venv, "/.+/(.+)")
					vim.cmd(("MoltenInit %s"):format(venv))
				else
					vim.cmd("MoltenInit python3")
				end
			end, { desc = "Initialize Molten for python3", silent = true, noremap = true })
			vim.api.nvim_create_user_command(
				"JupyterInit",
				"! $HOME/.config/nvim/jupyter_init.sh <args>",
				{ desc = "Init Jupiter kernel with name", nargs = 1 }
			)
			vim.api.nvim_create_user_command("JupyterConvert", function()
				if vim.bo.filetype ~= "quarto" then
					return
				end
				local path = vim.fn.expand("%:p")
				local notebook_path = string.sub(path, 1, -4) .. "ipynb"
				vim.cmd("! quarto convert " .. path .. " -o " .. notebook_path)
			end, { desc = "Convert from Quarto notebook to Jupyter notebook" })
		end,
	},
	{
		"3rd/image.nvim",
		ft = { "markdown", "pandoc" },
		init = function()
			package.path = package.path .. ";" .. vim.fn.expand("$HOME") .. "/.luarocks/share/lua/5.1/?/init.lua;"
			package.path = package.path .. ";" .. vim.fn.expand("$HOME") .. "/.luarocks/share/lua/5.1/?.lua;"
		end,
		opts = {
			backend = "ueberzug",
			max_width = 100,
			max_height = 12,
			max_height_window_percentage = math.huge,
			max_width_window_percentage = math.huge,
			window_overlap_clear_enabled = true, -- toggles images when windows are overlapped
			window_overlap_clear_ft_ignore = { "cmp_menu", "cmp_docs", "" },
			hijack_file_patterns = { "*.png", "*.jpg", "*.jpeg", "*.gif", "*.webp", ".JPG" }, -- render image files as images when opened
			integrations = {
				markdown = {
					enabled = true,
					clear_in_insert_mode = false,
					download_remote_images = true,
					only_render_image_at_cursor = true,
					filetypes = { "markdown", "vimwiki", "pandoc" }, -- markdown extensions (ie. quarto) can go here
				},
			},
		},
	},
	{
		"GCBallesteros/jupytext.nvim",
		lazy = false,
		opts = { style = "markdown", output_extension = "md", force_ft = "markdown" },
	},
	{
		"quarto-dev/quarto-nvim",
		opts = {
			lspFeatures = {
				-- NOTE: put whatever languages you want here:
				languages = { "r", "python", "rust" },
				chunks = "all",
				diagnostics = {
					enabled = true,
					triggers = { "BufWritePost" },
				},
				completion = {
					enabled = true,
				},
			},
			keymap = {
				-- NOTE: setup your own keymaps:
				hover = "H",
				definition = "gd",
				rename = "<leader>rn",
				references = "gr",
				format = "<leader>gf",
			},
			codeRunner = {
				enabled = true,
				default_method = "molten",
			},
		},
	},
}
