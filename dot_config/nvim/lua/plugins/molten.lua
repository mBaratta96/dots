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
		ft = "qmd",
		build = ":UpdateRemotePlugins",
		init = function()
			-- these are examples, not defaults. Please see the readme
			vim.g.molten_image_provider = "image.nvim"
			vim.g.molten_output_win_max_height = 20
			vim.g.molten_auto_open_output = false
			vim.g.molten_show_mimetype_debug = true
			require("confs.quarto_code_runner").attach_run_mappings()
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
}
