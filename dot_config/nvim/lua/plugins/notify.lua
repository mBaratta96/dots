local function file_exists(name)
	local f = io.open(name, "r")
	if f ~= nil then
		io.close(f)
		return true
	else
		return false
	end
end
return {
	"rcarriga/nvim-notify",
	config = function()
		vim.notify = require("notify")
		require("notify").setup({ render = "wrapped-compact" })
		local today = os.date("%Y-%m-%d")
		local path = "/home/marco/Documenti/projects/personal/daily/" .. today .. ".md"
		if not file_exists(path) then
			vim.notify("No daily journal entry has been found.\nConsider adding something.", vim.log.levels.WARN, {
				title = "Journal",
			})
		end
	end,
	lazy = false,
}
