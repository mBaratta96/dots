local ls = require("luasnip")
local s = ls.snippet
local t = ls.text_node

return {
	s("oney", { t("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ") }),
	s("twoy", { t({ "&nbsp;&nbsp;&nbsp; " }) }),
	s("tabs", {
		t(
			"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "
		),
	}),
}
