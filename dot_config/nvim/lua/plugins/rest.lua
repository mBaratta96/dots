-- plugins/rest.lua
return {
	{
		"vhyrro/luarocks.nvim",
		priority = 1000,
		config = true,
	},
	{
		"rest-nvim/rest.nvim",
		ft = "http",
		dependencies = { "luarocks.nvim" },
		keys = {
			{
				"<leader>rr",
				"<cmd>Rest run<cr>",
				"Run request under the cursor",
			},
			{
				"<leader>rl",
				"<cmd>Rest run last<cr>",
				"Re-run latest request",
			},
		},
		config = function()
			require("rest-nvim").setup()
		end,
	},
}
