return {
	{
		"VonHeikemen/lsp-zero.nvim",
		branch = "v3.x",
		lazy = true,
		init = function()
			-- Disable automatic setup, we are doing it manually
			vim.g.lsp_zero_extend_cmp = 0
			vim.g.lsp_zero_extend_lspconfig = 0
		end,
	},
	{
		"neovim/nvim-lspconfig",
		cmd = { "LspInfo", "LspInstall", "LspStart" },
		event = { "BufReadPre", "BufNewFile" },
		dependencies = {
			{ "hrsh7th/cmp-nvim-lsp" },
			{ "williamboman/mason-lspconfig.nvim" },
			{ "nvimtools/none-ls.nvim" },
			{ "williamboman/mason.nvim" },
		},
		config = function()
			local lsp_zero = require("lsp-zero")
			local null_ls = require("confs.null-fs")
			local languagetool = require("confs.languagetool")

			null_ls.setLsp(lsp_zero)

			lsp_zero.on_attach(function(client, bufnr)
				-- see :help lsp-zero-keybindings
				-- to learn the available actions
				lsp_zero.default_keymaps({ buffer = bufnr, preserve_mappings = false })
				require("navigator.lspclient.mapping").setup({ bufnr = bufnr, client = client })
			end)
			require("mason").setup({})
			require("mason-lspconfig").setup({
				ensure_installed = { "tsserver", "rust_analyzer" },
				handlers = {
					lsp_zero.default_setup,
					lua_ls = function()
						local lua_opts = lsp_zero.nvim_lua_ls()
						require("lspconfig").lua_ls.setup(lua_opts)
					end,
				},
			})
			-- LSP
			local lspconfig = require("lspconfig")

			lspconfig.eslint.setup({ settings = { format = false } })
			lspconfig.marksman.setup({
				filetypes = { "markdown", "telekasten", "fountain" },
			})
			lspconfig.r_language_server.setup({ filetypes = { "r", "rmd", "rmarkdown" } })
			lspconfig.ltex.setup({
				filetypes = {
					"bib",
					"gitcommit",
					"markdown",
					"org",
					"plaintex",
					"rst",
					"rnoweb",
					"tex",
					"pandoc",
					"telekasten",
					"fountain",
				},
				settings = {
					ltex = {
						language_tool_http_server_uri = "https://api.languagetoolplus.com",
						language_tool_org = { api_key = languagetool.api_key, username = languagetool.email },
						additionalRules = { enablePickyRules = true },
						disabledRules = { ["en-US"] = { "DASH_RULE", "EN_QUOTES" }, ["it"] = { "DASH_RULE" } },
						hiddenFalsePositives = {
							["en-US"] = { '{"rule": "MORFOLOGIK_RULE_EN_US", "sentence": "Pasolini|Carlo"}' },
						},
						language = "",
					},
				},
				on_init = function(client)
					local path = vim.fn.expand("%:p")
					local project_folder = "/home/marco/Documenti/projects/"
					if
						string.find(path, project_folder .. "notes/misc/ita")
						or string.find(path, project_folder .. "scripts/ita")
						or string.find(path, "reviews")
						or string.find(path, project_folder .. "personal")
					then
						client.config.settings.ltex.language = "it"
					--vim.api.nvim_echo({ { vim.inspect(client.config.settings) } }, true, {})
					else
						client.config.settings.ltex.language = "en-US"
					end
					client.notify("workspace/didChangeConfiguration", { settings = client.config.settings })
					return true
				end,
			})
			lspconfig.lua_ls.setup({
				settings = { Lua = { format = { enable = false } } },
			})
			lspconfig.volar.setup({
				init_options = {
					languageFeatures = {
						completion = { defaultTagNameCase = "kebabCase", defaultAttrNameCase = "kebebCase" },
					},
				},
				filetypes = { "typescript", "javascript", "javascriptreact", "typescriptreact", "vue", "json" },
			})
		end,
	},
	{
		"hrsh7th/nvim-cmp",
		event = "InsertEnter",
		dependencies = {
			{ "L3MON4D3/LuaSnip" },
		},
		config = function()
			-- SNIPPETS
			require("luasnip").filetype_extend("telekasten", { "markdown" })
			require("luasnip").filetype_extend("fountain", { "markdown" })
			require("luasnip.loaders.from_vscode").lazy_load()
			require("luasnip.loaders.from_lua").lazy_load({ paths = "~/.config/nvim/lua/confs/luasnip/" })

			local cmp = require("cmp")
			local cmp_action = require("lsp-zero").cmp_action()
			local cmp_format = require("lsp-zero").cmp_format()
			local luasnip = require("luasnip")
			cmp.setup({
				sources = {
					{ name = "nvim_lsp" },
					{ name = "luasnip" },
				},
				mapping = {
					["<CR>"] = cmp.mapping.confirm({ select = true }),
					["<C-l>"] = cmp_action.luasnip_jump_forward(),
					["<C-h>"] = cmp_action.luasnip_jump_backward(),
					["<C-u>"] = cmp.mapping.scroll_docs(-4),
					["<C-d>"] = cmp.mapping.scroll_docs(4),
					["<Tab>"] = cmp.mapping(function(fallback)
						if cmp.visible() then
							cmp.select_next_item()
						-- You could replace the expand_or_jumpable() calls with expand_or_locally_jumpable()
						-- they way you will only jump inside the snippet region
						elseif luasnip.expand_or_jumpable() then
							luasnip.expand_or_jump()
						elseif has_words_before() then
							cmp.complete()
						else
							fallback()
						end
					end, { "i", "s" }),
				},
				snippet = {
					expand = function(args)
						luasnip.lsp_expand(args.body)
					end,
				},
				formatting = cmp_format,
			})
		end,
	},
}
