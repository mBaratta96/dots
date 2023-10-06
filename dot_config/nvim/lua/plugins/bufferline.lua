return {
	"akinsho/bufferline.nvim",
	version = "*",
	dependencies = "nvim-tree/nvim-web-devicons",
	event = "BufRead",
	opts = {
		options = {
			mode = "buffers",
			numbers = "buffer_id",
			offsets = {
				{ filetype = "NvimTree" },
			},
			always_show_bufferline = true,
		},
		highlights = {
			buffer_selected = {
				italic = false,
			},
			indicator_selected = {
				fg = { attribute = "fg", highlight = "Function" },
				italic = false,
			},
		},
	},
}
