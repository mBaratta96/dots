local ls = require("luasnip")
local s = ls.snippet
local t = ls.text_node
local i = ls.insert_node
local f = ls.function_node

ls.log.set_loglevel("debug")

local function splitString(str)
	local lines = {}
	local sep = ", "
	for token in string.gmatch(str, "([^" .. sep .. "]+)") do
		table.insert(lines, token)
	end
	return lines
end

local function createClass(args, parent, user_args)
	local arguments = args[1][1]
	local paramenter_initialized = {}
	local class_arguments = splitString(arguments)
	for _, arg in ipairs(class_arguments) do
		table.insert(paramenter_initialized, "\t\t@" .. arg .. " = " .. arg)
	end

	return paramenter_initialized
end

return {
	s({ trig = "initc", desc = "initialize class" }, {
		t({ "# Class doc", "class " }),
		i(1),
		t({ "", "\tdef initialize(" }),
		i(2),
		t({ ")", "" }),
		f(createClass, { 2 }, {}),
		t({ "", "\tend", "end" }),
	}),
}
