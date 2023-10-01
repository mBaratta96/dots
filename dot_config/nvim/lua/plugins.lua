require("lazy").setup({
	"ahmedkhalf/project.nvim",
	"chrisbra/csv.vim",
	"ellisonleao/dotenv.nvim",
	"folke/twilight.nvim",
	"folke/which-key.nvim",
	"jalvesaq/Nvim-R",
	"kblin/vim-fountain",
	"lervag/vimtex",
	"lukas-reineke/indent-blankline.nvim",
	"HiPhish/rainbow-delimiters.nvim",
	"matbme/JABS.nvim",
	"nvim-telescope/telescope-media-files.nvim",
	"nvim-treesitter/nvim-treesitter-textobjects",
	"petertriho/nvim-scrollbar",
	"preservim/vim-pencil",
	"renerocksai/telekasten.nvim",
	"stevearc/aerial.nvim",
	"stevearc/overseer.nvim",
	"terrastruct/d2-vim",
	"tpope/vim-fugitive",
	"tpope/vim-surround",
	"uga-rosa/ccc.nvim",
	"vim-pandoc/vim-rmarkdown",
	"wellle/targets.vim",
	"neovim/nvim-lspconfig",
	"williamboman/mason.nvim",
	"williamboman/mason-lspconfig.nvim",
	"hrsh7th/nvim-cmp",
	"hrsh7th/cmp-buffer",
	"hrsh7th/cmp-path",
	"saadparwaiz1/cmp_luasnip",
	"hrsh7th/cmp-nvim-lsp",
	"hrsh7th/cmp-nvim-lua",
	"L3MON4D3/LuaSnip",
	"rafamadriz/friendly-snippets",
	"nvim-treesitter/nvim-treesitter",
	"MunifTanjim/nui.nvim",
	"nvimtools/none-ls.nvim",
	"ray-x/guihua.lua",
	"nvim-tree/nvim-web-devicons",
	"nvim-lua/plenary.nvim",
	{ "akinsho/bufferline.nvim", version = "*", dependecies = "nvim-tree/nvim-web-devicons" },
	{ "akinsho/toggleterm.nvim", version = "*" },
	{
		"arturgoms/moonbow.nvim",
		config = function()
			vim.cmd("colorscheme moonbow")
		end,
	},
	{
		"bennypowers/nvim-regexplainer",
		config = function()
			require("regexplainer").setup()
		end,
		dependecies = {
			"nvim-treesitter/nvim-treesitter",
			"MunifTanjim/nui.nvim",
		},
	},
	{
		"folke/neodev.nvim",
		config = function()
			require("neodev").setup({})
		end,
	},
	{ "goolord/alpha-nvim", dependecies = { "nvim-tree/nvim-web-devicons" } },
	{
		"jcdickinson/wpm.nvim",
		config = function()
			require("wpm").setup({})
		end,
	},
	{
		"ray-x/navigator.lua",
		dependecies = {
			{ "ray-x/guihua.lua", run = "cd lua/fzy && make" },
			{ "neovim/nvim-lspconfig" },
		},
	},
	{ "rbong/vim-flog", dependecies = { "tpope/vim-fugitive" } },
	{
		"numToStr/Comment.nvim",
		config = function()
			require("Comment").setup()
		end,
	},
	{ "nvim-lualine/lualine.nvim", dependecies = { "kyazdani42/nvim-web-devicons" } },
	{
		"nvim-telescope/telescope-file-browser.nvim",
		dependecies = { "nvim-telescope/telescope.nvim", "nvim-lua/plenary.nvim" },
	},
	{ "nvim-telescope/telescope.nvim", branch = "0.1.x", dependecies = { { "nvim-lua/plenary.nvim" } } },
	{ "nvim-tree/nvim-tree.lua", dependecies = { "nvim-tree/nvim-web-devicons" } },
	{ "nvim-treesitter/nvim-treesitter", build = ":TSUpdate" },
	{
		"vim-pandoc/vim-pandoc",
		dependecies = { "vim-pandoc/vim-pandoc-syntax" },
	},
	{
		"weilbith/nvim-code-action-menu",
		cmd = "CodeActionMenu",
	},
	{
		"windwp/nvim-autopairs",
		event = "InsertEnter",
	},
	{
		"VonHeikemen/lsp-zero.nvim",
		branch = "v2.x",
		dependecies = {
			-- LSP Support
			"neovim/nvim-lspconfig",
			"williamboman/mason.nvim",
			"williamboman/mason-lspconfig.nvim",
			-- Autocompletion
			"hrsh7th/nvim-cmp",
			"hrsh7th/cmp-buffer",
			"hrsh7th/cmp-path",
			"saadparwaiz1/cmp_luasnip",
			"hrsh7th/cmp-nvim-lsp",
			"hrsh7th/cmp-nvim-lua",
			-- Snippets
			"L3MON4D3/LuaSnip",
			"rafamadriz/friendly-snippets",
			-- Formatter
			"nvimtools/none-ls.nvim",
		},
	},
})

require("confs.aerial")
require("confs.autopairs")
require("confs.blankline")
require("confs.bufferline")
require("confs.colorizer")
require("confs.dashboard")
require("confs.d2")
require("confs.jabs")
require("confs.keys")
require("confs.lsp-zero")
require("confs.lualine")
require("confs.navigator")
require("confs.pandoc")
require("confs.pencil")
require("confs.projects")
require("confs.rainbow")
require("confs.scrollbar")
require("confs.telekasten")
require("confs.telescope")
require("confs.toggleterm")
require("confs.tree")
require("confs.treesitter")
require("confs.twilight")
require("confs.vimtex")
