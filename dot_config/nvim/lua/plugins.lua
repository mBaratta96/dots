require("packer").startup(function(use)
	use("wbthomason/packer.nvim")
	use("ahmedkhalf/project.nvim")
	use("anuvyklack/pretty-fold.nvim")
	use("chrisbra/csv.vim")
	use("ellisonleao/dotenv.nvim")
	use("folke/twilight.nvim")
	use("folke/which-key.nvim")
	use("jalvesaq/Nvim-R")
	use("kblin/vim-fountain")
	use("lervag/vimtex")
	use("lukas-reineke/indent-blankline.nvim")
	use("matbme/JABS.nvim")
	use("HiPhish/nvim-ts-rainbow2")
	use("nvim-telescope/telescope-media-files.nvim")
	use("nvim-treesitter/nvim-treesitter-textobjects")
	use("petertriho/nvim-scrollbar")
	use("preservim/vim-pencil")
	use("renerocksai/telekasten.nvim")
	use("stevearc/aerial.nvim")
	use("stevearc/overseer.nvim")
	use("terrastruct/d2-vim")
	use("tpope/vim-fugitive")
	use("tpope/vim-surround")
	use("uga-rosa/ccc.nvim")
	use("vim-pandoc/vim-rmarkdown")
	use("wellle/targets.vim")
	use({ "akinsho/bufferline.nvim", tag = "*", requires = "kyazdani42/nvim-web-devicons" })
	use({ "akinsho/toggleterm.nvim", tag = "*" })
	use({ "anuvyklack/fold-preview.nvim", requires = "anuvyklack/keymap-amend.nvim" })
	use({ "arturgoms/moonbow.nvim" })
	use({ "goolord/alpha-nvim", requires = { "nvim-tree/nvim-web-devicons" } })
	use({
		"jcdickinson/wpm.nvim",
		config = function()
			require("wpm").setup({})
		end,
	})
	use({
		"ray-x/navigator.lua",
		requires = {
			{ "ray-x/guihua.lua", run = "cd lua/fzy && make" },
			{ "neovim/nvim-lspconfig" },
		},
	})
	use({ "rbong/vim-flog", requires = { "tpope/vim-fugitive" } })
	use({
		"numToStr/Comment.nvim",
		config = function()
			require("Comment").setup()
		end,
	})
	use({ "nvim-lualine/lualine.nvim", requires = { "kyazdani42/nvim-web-devicons" } })
	use({
		"nvim-telescope/telescope-file-browser.nvim",
		requires = { "nvim-telescope/telescope.nvim", "nvim-lua/plenary.nvim" },
	})
	use({ "nvim-telescope/telescope.nvim", branch = "0.1.x", requires = { { "nvim-lua/plenary.nvim" } } })
	use({ "nvim-tree/nvim-tree.lua", requires = { "nvim-tree/nvim-web-devicons" } })
	use({ "nvim-treesitter/nvim-treesitter", run = ":TSUpdate" })
	use({
		"vim-pandoc/vim-pandoc",
		requires = { "vim-pandoc/vim-pandoc-syntax" },
	})
	use({
		"weilbith/nvim-code-action-menu",
		cmd = "CodeActionMenu",
	})
	use({
		"windwp/nvim-autopairs",
		config = function()
			require("nvim-autopairs").setup({})
		end,
	})
	use({
		"VonHeikemen/lsp-zero.nvim",
		branch = "v2.x",
		requires = {
			-- LSP Support
			{ "neovim/nvim-lspconfig" },
			{ "williamboman/mason.nvim" },
			{ "williamboman/mason-lspconfig.nvim" },
			-- Autocompletion
			{ "hrsh7th/nvim-cmp" },
			{ "hrsh7th/cmp-buffer" },
			{ "hrsh7th/cmp-path" },
			{ "saadparwaiz1/cmp_luasnip" },
			{ "hrsh7th/cmp-nvim-lsp" },
			{ "hrsh7th/cmp-nvim-lua" },
			-- Snippets
			{ "L3MON4D3/LuaSnip" },
			{ "rafamadriz/friendly-snippets" },
			-- Formatter
			{ "jose-elias-alvarez/null-ls.nvim" },
		},
	})
end)

require("confs.aerial")
require("confs.autopairs")
require("confs.blankline")
require("confs.bufferline")
require("confs.colorizer")
require("confs.dashboard")
require("confs.d2")
require("confs.fold")
require("confs.jabs")
require("confs.keys")
require("confs.lsp-zero")
require("confs.lualine")
require("confs.navigator")
require("confs.pandoc")
require("confs.pencil")
require("confs.projects")
require("confs.scrollbar")
require("confs.telekasten")
require("confs.telescope")
require("confs.toggleterm")
require("confs.tree")
require("confs.treesitter")
require("confs.twilight")
require("confs.vimtex")
