return {
	"ahmedkhalf/project.nvim",
	event = "BufRead",
	opts = {
		patterns = {
			".git",
			"_darcs",
			".hg",
			".bzr",
			".svn",
			"Makefile",
			"package.json",
			"*.fountain",
			"setup.py",
			".vim",
			"pom.xml",
		},
		detection_methods = { "patterns", "lsp" },
		show_hidden = false,
	},
	config = function(_, opts)
		require("project_nvim").setup(opts)
	end,
}
