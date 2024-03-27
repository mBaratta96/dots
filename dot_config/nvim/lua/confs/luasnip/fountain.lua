local ls = require("luasnip")
local s = ls.snippet
local t = ls.text_node
local i = ls.insert_node
local c = ls.choice_node
local f = ls.function_node
local fmt = require("luasnip.extras.fmt").fmt

local function get_scene_header_number()
	local content = vim.api.nvim_buf_get_lines(0, 0, vim.api.nvim_buf_line_count(0), false)
	local scene_number = 0
	for _, line in ipairs(content) do
		if string.sub(line, 1, 4) == "INT." or string.sub(line, 1, 4) == "EXT." then
			scene_number = scene_number + 1
		end
	end
	return "#" .. scene_number .. "#"
end

local events = {
	[2] = {
		[events.enter] = function(node)
			node.au_id = vim.api.nvim_create_autocmd("TextChangedI", {
				callback = function()
					local node_text = node:get_text()[1]
					local uppercase = node_text:upper()
					node:set_text({ uppercase })
				end,
			})
		end,
		[events.leave] = function(node)
			vim.api.nvim_del_autocmd(node.au_id)
		end,
	},
}

return {
	s({ trig = "scene", desc = "Scene header" }, {
		c(1, { t("INT."), t("EXT."), t("INT./EXT.") }),
		t(" "),
		i(2),
		t(" - "),
		c(3, { t("DAY"), t("NIGHT") }),
		t(" "),
		f(get_scene_header_number),
	}, { callbacks = events }),
	s({ trig = "title", desc = "Script title" }, {
		t({ "Title:", "_**" }),
		i(1),
		t({ "**_", "Credit: Written by:", "Author: Marco Baratta", "" }),
	}),
}
