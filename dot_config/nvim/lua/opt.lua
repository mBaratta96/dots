vim.g.loaded_netrw = 1
vim.g.loaded_netrwPlugin = 1

local opt = vim.opt

-- [[ Context ]]
opt.colorcolumn = "120" -- str:  Show col for max line length
opt.number = true -- bool: Show line numbers
opt.relativenumber = true -- bool: Show relative line numbers
opt.scrolloff = 16 -- int:  Min num lines of context
opt.signcolumn = "yes" -- str:  Show the sign column
opt.mouse = "a"
opt.wrap = true
opt.breakindent = true
opt.clipboard = "unnamedplus"
opt.cursorline = true
-- [[ Filetypes ]]
opt.filetype = "on"
opt.encoding = "utf8" -- str:  String encoding to use
opt.fileencoding = "utf8" -- str:  File encoding to use
opt.jumpoptions = "view"
-- [[ Theme ]]
opt.syntax = "ON" -- str:  Allow syntax highlighting
opt.termguicolors = true -- bool: If term supports ui color then enable

-- [[ Search ]]
opt.ignorecase = true -- bool: Ignore case in search patterns
opt.smartcase = true -- bool: Override ignorecase if search contains capitals
opt.incsearch = true -- bool: Use incremental search
opt.hlsearch = false -- bool: Highlight search matches

-- [[ Whitespace ]]
opt.expandtab = true -- bool: Use spaces instead of tabs
opt.shiftwidth = 4 -- num:  Size of an indent
opt.softtabstop = 4 -- num:  Number of spaces tabs count for in insert mode
opt.tabstop = 4 -- num:  Number of spaces tabs count for

-- [[ Splits ]]
opt.splitright = true -- bool: Place new window to right of current one
opt.splitbelow = true -- bool: Place new window below the current one
opt.completeopt = { "menu", "menuone", "noselect" }
--opt.list = true
--opt.listchars:append "space:⋅"
-- disable netrw at the very start of your init.lua (strongly advised)
-- [[ Fold ]]
-- vim.o.foldmethod = "expr"
-- vim.o.foldexpr = "nvim_treesitter#foldexpr()"
--
--vim.cmd("filetype indent off")
--vim.cmd('colorscheme everblush')
