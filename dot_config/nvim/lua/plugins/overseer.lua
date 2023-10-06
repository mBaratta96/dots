return {
	"stevearc/overseer.nvim",
	opts = {
		task_list = {
			direction = "right",
		},
	},
	config = function(_, opts)
		vim.api.nvim_create_user_command(
			"D2",
			"OverseerRunCmd d2 -w --layout=elk -p 4300 --dark-theme 200 % out.svg",
			{ desc = "Generate D2 diagram" }
		)
		require("overseer").setup(opts)
	end,
	cmd = "D2",
}
