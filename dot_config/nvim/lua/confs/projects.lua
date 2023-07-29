require("project_nvim").setup({
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
})
