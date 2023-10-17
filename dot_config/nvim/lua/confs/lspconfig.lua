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
		settings = {
			Lua = {
				runtime = {
					-- Tell the language server which version of Lua you're using
					-- (most likely LuaJIT in the case of Neovim)
					version = "LuaJIT",
				},
				format = { enable = false },
				diagnostics = {
					-- Get the language server to recognize the `vim` global
					globals = {
						"vim",
						"require",
					},
				},
				workspace = {
					-- Make the server aware of Neovim runtime files
					library = vim.api.nvim_get_runtime_file("", true),
					checkThirdParty = false,
				},
				-- Do not send telemetry data containing a randomized but unique identifier
				telemetry = {
					enable = false,
				},
			},
		},
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
M.sign_columns = function()
	---custom namespace
	local ns = vim.api.nvim_create_namespace("severe-diagnostics")

	---reference to the original handler
	local orig_signs_handler = vim.diagnostic.handlers.signs
	filter_diagnostics = function(diagnostics)
		if not diagnostics then
			return {}
		end

		-- find the "worst" diagnostic per line
		local most_severe = {}
		for _, cur in pairs(diagnostics) do
			local max = most_severe[cur.lnum]

			-- higher severity has lower value (`:h diagnostic-severity`)
			if not max or cur.severity < max.severity then
				most_severe[cur.lnum] = cur
			end
		end

		---Overriden diagnostics signs helper to only show the single most relevant sign
		---@see `:h diagnostic-handlers`
		vim.diagnostic.handlers.signs = {
			show = function(_, bufnr, _, opts)
				-- get all diagnostics from the whole buffer rather
				-- than just the diagnostics passed to the handler
				local diagnostics = vim.diagnostic.get(bufnr)

				local filtered_diagnostics = filter_diagnostics(diagnostics)

				-- pass the filtered diagnostics (with the
				-- custom namespace) to the original handler
				orig_signs_handler.show(ns, bufnr, filtered_diagnostics, opts)
			end,

			hide = function(_, bufnr)
				orig_signs_handler.hide(ns, bufnr)
			end,
		}

		-- return list of diagnostics
		return vim.tbl_values(most_severe)
	end
end
return M
