local lsp = require("lsp-zero").preset("recommended")
local null_ls = require("confs.null-fs")
local languagetool = require("confs.languagetool")

null_ls.setLsp(lsp)

lsp.nvim_workspace()
lsp.on_attach(function(client, bufnr)
	require("navigator.lspclient.mapping").setup({ bufnr = bufnr, client = client })
end)
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
			hiddenFalsePositives = { ["en-US"] = { '{"rule": "MORFOLOGIK_RULE_EN_US", "sentence": "Pasolini|Carlo"}' } },
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
		languageFeatures = { completion = { defaultTagNameCase = "kebabCase", defaultAttrNameCase = "kebebCase" } },
	},
	filetypes = { "typescript", "javascript", "javascriptreact", "typescriptreact", "vue", "json" },
})

-- SNIPPETS
require("luasnip").filetype_extend("telekasten", { "markdown" })
require("luasnip").filetype_extend("fountain", { "markdown" })
require("luasnip.loaders.from_vscode").lazy_load()
require("luasnip.loaders.from_lua").lazy_load({ paths = "~/.config/nvim/lua/confs/luasnip/" })

lsp.setup()

-- CMP
local cmp = require("cmp")
local cmp_action = require("lsp-zero").cmp_action()
cmp.setup({
	sources = {
		{ name = "nvim_lsp" },
		{ name = "luasnip" },
	},
	mapping = {
		["<CR>"] = cmp.mapping.confirm({ select = true }),
		["<C-l>"] = cmp_action.luasnip_jump_forward(),
		["<C-h>"] = cmp_action.luasnip_jump_backward(),
	},
	snippet = {
		expand = function(args)
			require("luasnip").lsp_expand(args.body)
		end,
	},
})

-- DIAGNOSTIC
vim.o.updatetime = 250
vim.diagnostic.config({ virtual_text = { source = "always" } })
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
-- CODE ACTIONS
