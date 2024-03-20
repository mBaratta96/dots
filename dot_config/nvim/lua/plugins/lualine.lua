vim.api.nvim_create_autocmd({ "BufWritePost", "BufEnter" }, {
	callback = function()
		local filetype = vim.bo.filetype
		local result = ""
		if filetype == "md" or filetype == "txt" or filetype == "markdown" or filetype == "telekasten" then
			local wordcount = vim.fn.wordcount()
			if wordcount.visual_words == 1 then
				result = tostring(wordcount.visual_words) .. " word / " .. tostring(wordcount.visual_chars) .. " chars"
			elseif not (wordcount.visual_words == nil) then
				result = tostring(wordcount.visual_words) .. " words / " .. tostring(wordcount.visual_chars) .. " chars"
			else
				result = tostring(wordcount.words) .. " words / " .. tostring(wordcount.chars) .. " chars"
			end
		elseif filetype == "tex" or filetype == "latex" then
			local n_latex_words =
				vim.fn.system("texcount " .. vim.fn.shellescape(vim.fn.expand("%:p")) .. " | awk 'FNR==3 {printf $NF}'")
			local n_latex_letters = vim.fn.system(
				"texcount -char " .. vim.fn.shellescape(vim.fn.expand("%:p")) .. " | awk 'FNR==3 {printf $NF}'"
			)
			result = tostring(n_latex_words) .. " words / " .. tostring(n_latex_letters) .. " chars"
		end
		vim.api.nvim_buf_set_var(0, "words", result)
	end,
})

return {
	"nvim-lualine/lualine.nvim",
	dependencies = { "nvim-tree/nvim-web-devicons" },
	event = "BufRead",
	opts = function()
		local function getWords()
			local filetype = vim.bo.filetype
			if
				filetype == "md"
				or filetype == "txt"
				or filetype == "markdown"
				or filetype == "telekasten"
				or filetype == "tex"
				or filetype == "latex"
			then
				return vim.api.nvim_buf_get_var(0, "words")
			else
				return ""
			end
		end
		local moonbow = require("confs.lualine_moonbow")
		return {
			options = {
				theme = moonbow,
			},
			sections = {
				lualine_x = { getWords, "grapple", "filetype" },
			},
		}
	end,
}
