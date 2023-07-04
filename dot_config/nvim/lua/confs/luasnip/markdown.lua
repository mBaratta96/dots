local ls = require("luasnip")
local s = ls.snippet
local t = ls.text_node
local i = ls.insert_node

--local italic = s({trig="*", desc = "Expand " })

return { s("pippo", { t("Baudo!") }) }
