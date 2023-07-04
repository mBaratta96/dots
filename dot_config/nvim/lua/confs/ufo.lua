vim.o.foldcolumn = "1" -- '0' is not bad
vim.o.foldlevel = 99 -- Using ufo provider need a large value, feel free to decrease the value
vim.o.foldlevelstart = 99
vim.o.foldenable = true

-- Using ufo provider need remap `zR` and `zM`. If Neovim is 0.6.1, remap yourself
vim.keymap.set("n", "zR", require("ufo").openAllFolds)
vim.keymap.set("n", "zM", require("ufo").closeAllFolds)

-- local ftMap = {
--     lua = "indent",
-- }

require("ufo").setup({
	-- your other config
	fold_virt_text_handler = function()
		return {}
	end,
	-- provider_selector = function(bufnr, filetype, buftype)
	--     -- return a table with string elements: 1st is name of main provider, 2nd is fallback
	--     -- return a string type: use ufo inner providers
	--     -- return a string in a table: like a string type above
	--     -- return empty string '': disable any providers
	--     -- return `nil`: use default value {'lsp', 'indent'}
	--     -- return a function: it will be involved and expected return `UfoFoldingRange[]|Promise`
	--
	--     -- if you prefer treesitter provider rather than lsp,
	--     -- return ftMap[filetype] or {'treesitter', 'indent'}
	--     return ftMap[filetype]
	-- end,
})

local function applyFoldsAndThenCloseAllFolds(bufnr, providerName)
	require("async")(function()
		bufnr = bufnr or vim.api.nvim_get_current_buf()
		-- make sure buffer is attached
		require("ufo").attach(bufnr)
		-- getFolds return Promise if providerName == 'lsp'
		local ok, ranges = pcall(await, require("ufo").getFolds(bufnr, providerName))
		if ok and ranges then
			ok = require("ufo").applyFolds(bufnr, ranges)
			if ok then
				vim.api.nvim_echo({ { "FOLD LSP" } }, false, {})
				require("ufo").closeAllFolds()
			end
		else
			ranges = await(require("ufo").getFolds(bufnr, "indent"))
			ok = require("ufo").applyFolds(bufnr, ranges)
			if ok then
				vim.api.nvim_echo({ { "FOLD INDENT" } }, false, {})
				require("ufo").closeAllFolds()
			end
		end
	end)
end

vim.api.nvim_create_autocmd("BufRead", {
	pattern = "*",
	callback = function(e)
		applyFoldsAndThenCloseAllFolds(e.buf, "lsp")
	end,
})

--vim.api.nvim_create_autocmd("BufEnter", { pattern = "*", command = "setlocal foldlevelstart=99" })
