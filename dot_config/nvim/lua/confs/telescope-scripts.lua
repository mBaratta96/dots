local pickers = require("telescope.pickers")
local finders = require("telescope.finders")
local themes = require("telescope.themes")
local actions = require("telescope.actions")
local action_state = require("telescope.actions.state")
local conf = require("telescope.config").values

local content = vim.api.nvim_buf_get_lines(0, 0, vim.api.nvim_buf_line_count(0), false)

local filter_fountain_lines = function()
	local headers = {}
	local scene_number = 0
	for i, line in ipairs(content) do
		if string.sub(line, 1, 4) == "INT." or string.sub(line, 1, 4) == "EXT." then
			scene_number = scene_number + 1
			table.insert(headers, { i, scene_number .. ". " .. line })
		end
	end
	return headers
end

local filter_d2_lines = function()
	local headers = {}
	local scene_number = 0
	for i, line in ipairs(content) do
		if string.find(line, "^%d+: ") then
			scene_number = scene_number + 1
			table.insert(headers, { i, line })
		end
	end
	return headers
end

local filetype = vim.bo.filetype
vim.api.nvim_echo({ { vim.inspect(filetype) } }, true, {})
local results = filetype == "fountain" and filter_fountain_lines() or filetype == "d2" and filter_d2_lines() or {}

local lines = function(opts)
	opts = opts or {}
	pickers
		.new(opts, {
			prompt_title = "Scenes",
			finder = finders.new_table({
				results = results,
				entry_maker = function(entry)
					return {
						value = entry,
						display = entry[2],
						ordinal = entry[1],
					}
				end,
			}),
			sorter = conf.generic_sorter(opts),
			attach_mappings = function(prompt_bufnr, map)
				actions.select_default:replace(function()
					actions.close(prompt_bufnr)
					local selection = action_state.get_selected_entry()
					--print(vim.inspect(selection))
					if not (not selection or selection == "") then
						vim.api.nvim_win_set_cursor(0, { selection.ordinal, 0 })
						vim.cmd("normal! zz")
					end
				end)
				return true
			end,
		})
		:find()
end

lines(themes.get_dropdown({}))
