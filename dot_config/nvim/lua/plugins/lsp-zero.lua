function table.merge_functions(t1, t2)
	for k, v in pairs(t2) do
		t1[k] = v()
	end
	return t1
end

return {
	{
		"VonHeikemen/lsp-zero.nvim",
		branch = "v3.x",
		lazy = true,
		init = function()
			-- Disable automatic setup, we are doing it manually
			vim.g.lsp_zero_extend_cmp = 0
			vim.g.lsp_zero_extend_lspconfig = 0
			vim.o.updatetime = 250
		end,
	},
	{
		"L3MON4D3/LuaSnip",
		version = "v2.*",
		dependencies = { "rafamadriz/friendly-snippets" },
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

			null_ls.setLsp(lsp_zero)

			--lsp_confs.sign_columns()
			lsp_zero.on_attach(function(client, bufnr)
				-- see :help lsp-zero-keybindings
				-- to learn the available actions
				lsp_zero.default_keymaps({ buffer = bufnr, preserve_mappings = false })
				require("navigator.lspclient.mapping").setup({ bufnr = bufnr, client = client })
				vim.api.nvim_create_autocmd("CursorHold", {
					buffer = bufnr,
					callback = function()
						local opts = {
							focusable = false,
							close_events = { "BufLeave", "CursorMoved", "InsertEnter", "FocusLost" },
							border = "rounded",
							source = "always",
							prefix = " ",
							scope = "cursor",
						}
						vim.diagnostic.open_float(nil, opts)
					end,
				})
			end)
			vim.keymap.set("n", "<leader>M", ":Mason<CR>", { noremap = true })
			require("mason").setup({})
			local lsp_server_conifg = require("confs.lspconfig")
			local handlers = table.merge_functions({ lsp_zero.default_setup }, lsp_server_conifg)

			require("mason-lspconfig").setup({
				ensure_installed = { "tsserver", "rust_analyzer" },
				handlers = handlers,
			})
		end,
	},
	{
		"hrsh7th/nvim-cmp",
		event = "InsertEnter",
		dependencies = {
			{ "L3MON4D3/LuaSnip" },
			{ "saadparwaiz1/cmp_luasnip" },
			{ "onsails/lspkind-nvim" },
		},
		config = function()
			-- SNIPPETS
			require("luasnip").filetype_extend("telekasten", { "markdown" })
			require("luasnip").filetype_extend("fountain", { "markdown" })
			require("luasnip.loaders.from_vscode").lazy_load()
			require("luasnip.loaders.from_lua").lazy_load({ paths = "~/.config/nvim/lua/confs/luasnip/" })

			local cmp = require("cmp")
			local cmp_action = require("lsp-zero").cmp_action()
			local luasnip = require("luasnip")
			cmp.setup({
				window = {
					completion = cmp.config.window.bordered(),
					documentation = cmp.config.window.bordered(),
				},
				sources = {
					{ name = "nvim_lsp" },
					{ name = "luasnip" },
				},
				mapping = {
					["<CR>"] = cmp.mapping.confirm({ select = true }),
					["<C-l>"] = cmp_action.luasnip_jump_forward(),
					["<C-h>"] = cmp_action.luasnip_jump_backward(),
					["<C-e>"] = function()
						if require("luasnip").choice_active() then
							require("luasnip").change_choice(1)
						end
					end,
					["<C-u>"] = cmp.mapping.scroll_docs(-4),
					["<C-d>"] = cmp.mapping.scroll_docs(4),
					["<Tab>"] = cmp_action.luasnip_supertab(),
					["<S-Tab>"] = cmp_action.luasnip_shift_supertab(),
				},
				snippet = {
					expand = function(args)
						luasnip.lsp_expand(args.body)
					end,
				},
				formatting = {
					fields = { "abbr", "kind", "menu" },
					format = require("lspkind").cmp_format({
						menu = {
							buffer = "[Buffer]",
							nvim_lsp = "[LSP]",
							luasnip = "[LuaSnip]",
							nvim_lua = "[Lua]",
							latex_symbols = "[Latex]",
						},
						before = require("tailwindcss-colorizer-cmp").formatter,
					}),
				},
			})
		end,
	},
}
