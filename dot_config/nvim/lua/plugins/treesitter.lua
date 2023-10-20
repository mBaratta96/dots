return {
	{ "nvim-treesitter/nvim-treesitter-textobjects", event = "InsertEnter" },
	{ "windwp/nvim-ts-autotag", ft = { "html", "xml", "typescriptreact", "javascriptreact", "vue" } },
	{
		"nvim-treesitter/nvim-treesitter",
		build = ":TSUpdate",
		event = "BufRead",
		config = function()
			require("nvim-treesitter").setup()
			require("nvim-treesitter.configs").setup({
				highlight = {
					enable = true,
				},
				compilers = { "g++", "gcc" },
				indent = {
					enable = true,
				},
				autopairs = {
					enable = true,
				},
				autotag = {
					enable = true,
				},
				textobjects = {
					select = {
						enable = true,
						lookahead = true,
						keymaps = {
							["af"] = "@function.outer",
							["if"] = "@function.inner",
							["ac"] = "@class.outer",
							["ic"] = "@class.inner",
						},
					},
				},
				ensure_installed = {
					"css",
					"javascript",
					"json",
					"lua",
					"markdown",
					"python",
					"rust",
					"typescript",
					"vue",
					"html",
					"tsx",
				},
			})
			local parser_config = require("nvim-treesitter.parsers").get_parser_configs()
			parser_config.d2 = {
				install_info = {
					url = "https://git.pleshevski.ru/pleshevskiy/tree-sitter-d2",
					revision = "main",
					files = { "src/parser.c", "src/scanner.cc" },
				},
				filetype = "d2",
			}
		end,
	},
}
