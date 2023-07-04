local on_attach = require("confs.tree-attach").on_attach

require("nvim-tree").setup({
    sort_by = "case_sensitive",
    update_focused_file = {
        enable = true,
        update_cwd = true,
    },
    hijack_cursor = true,
    update_cwd = true,
    hijack_directories = {
        enable = true,
        auto_open = true,
    },
    respect_buf_cwd = true,
    sync_root_with_cwd = true,
    view = {
        adaptive_size = false,
    },
    renderer = {
        group_empty = true,
    },
    filters = {
        dotfiles = false,
    },
    git = {
        enable = true,
        ignore = false,
    },
    on_attach = on_attach,
})
