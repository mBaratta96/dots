local ls = require("luasnip")
local s = ls.snippet
local t = ls.text_node
local i = ls.insert_node

return {
	s({ trig = "iferf", desc = "Control error function" }, {
		t("if err := "),
		i(1),
		t({ "; err != nil {", "\t" }),
		i(0),
		t({ "", "}" }),
	}),
}
