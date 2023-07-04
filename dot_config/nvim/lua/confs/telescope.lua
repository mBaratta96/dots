require("telescope").load_extension("projects")
require("telescope").load_extension("media_files")
require("telescope").load_extension("file_browser")
require("telescope").load_extension("aerial")

require("telescope").setup({
	media_files = {
		find_cmd = "fdfind",
	},
	aerial = {
		-- Display symbols as <root>.<parent>.<symbol>
		show_nesting = {
			["_"] = false, -- This key will be the default
			json = true, -- You can set the option for specific filetypes
			yaml = true,
		},
	},
})
