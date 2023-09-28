local augroup = vim.api.nvim_create_augroup("LspFormatting", {})
local null_ls = require("null-ls")
local formatting = null_ls.builtins.formatting
local diagnostics = null_ls.builtins.diagnostics
local code_actions = null_ls.builtins.code_actions

local function onAttach(client, bufnr)
	if client.supports_method("textDocument/formatting") then
		vim.api.nvim_clear_autocmds({ group = augroup, buffer = bufnr })
		vim.api.nvim_create_autocmd("BufWritePre", {
			group = augroup,
			buffer = bufnr,
			callback = function()
				vim.lsp.buf.format({ bufnr = bufnr })
			end,
		})
	end
end

local M = {}

local function setLsp(lsp)
	local null_opts = lsp.build_options("null-ls", { on_attach = onAttach })

	null_ls.setup({
		on_attach = null_opts.on_attach,
		sources = {
			formatting.black.with({
				extra_args = { "--line-length", "120" },
			}),
			formatting.google_java_format,
			formatting.gofumpt,
			formatting.latexindent,
			formatting.markdownlint.with({
				filetypes = { "markdown", "telekasten", "fountain" },
				args = { "-r", "~MD026" },
			}),
			formatting.phpcsfixer,
			formatting.prettier.with({
				extra_args = {
					"--bracket-same-line",
					"true",
					"--tab-width",
					"4",
					"--print-width",
					"120",
					"--vue-indent-script-and-style",
					"true",
				},
				filetypes = {
					"javascript",
					"javascriptreact",
					"typescript",
					"typescriptreact",
					"vue",
					"css",
					"scss",
					"less",
					"html",
					"svelte",
				},
			}),
			formatting.rubocop,
			formatting.rustfmt,
			formatting.styler,
			formatting.stylua,
			formatting.xmlformat.with({
				extra_args = { "--blanks", "true", "--compress", "false" },
			}),
			formatting.zprint,
			--diagnostics.golangci_lint,
			diagnostics.jsonlint,
			diagnostics.flake8.with({
				extra_args = { "--max-line-length", "120", "--extend-ignore", "E203" },
			}),
			diagnostics.proselint.with({
				filetypes = { "markdown", "tex", "telekasten", "fountain" },
			}),
			code_actions.proselint.with({
				filetypes = { "markdown", "tex", "telekasten", "fountain" },
			}),
		},
	})
end

M.setLsp = setLsp

return M
