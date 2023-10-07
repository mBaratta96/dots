local M = {}

local lspconfig = require("lspconfig")

M.eslint = function()
	lspconfig.eslint.setup({ settings = { format = false } })
end
M.marksman = function()
	lspconfig.marksman.setup({
		filetypes = { "markdown", "telekasten", "fountain" },
	})
end
M.r_language_server = function()
	lspconfig.r_language_server.setup({ filetypes = { "r", "rmd", "rmarkdown" } })
end
M.ltex = function()
	local languagetool = require("confs.languagetool")
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
end
M.lua_ls = function()
	lspconfig.lua_ls.setup({
		settings = { Lua = { format = { enable = false } } },
	})
end
M.volar = function()
	lspconfig.volar.setup({
		init_options = {
			languageFeatures = {
				completion = { defaultTagNameCase = "kebabCase", defaultAttrNameCase = "kebebCase" },
			},
		},
		filetypes = { "vue" },
	})
end
return M
