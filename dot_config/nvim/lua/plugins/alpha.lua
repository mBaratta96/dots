return {
    "goolord/alpha-nvim",
    dependencies = { "nvim-tree/nvim-web-devicons" },
    config = function()
        vim.opt.laststatus = 0
        local alpha = require("alpha")
        local db = require("alpha.themes.dashboard")
        local header = {
            type = "text",
            val = {
                ".;lkOkdlodxxxxkOOOkkkO0000000000OOkkkkkkkkkkkOOOkkkkkkxxxxxkOkdc,'''';cccccoOKKKK00kxoc:,'.......   ",
                ".;ldxdoodxxxxxxkkOOOOO000000000OOOOOOOOkkkkkkkO0kkkkkxxdddxdc,..,;;;;;:cc::cdO00KK00Okxdlc:,'.....  ",
                ".,cdkkkkkkxdddxkkO0000000000000000OOOOOOOOOOOkkOOOkkxdoddxo;.':cc:,'..',::::oxkkOOkkkkkkxdolc:;,'...",
                ".;lxOOO0OOkddddxkkOO00000KKKKKKKKKKKKKKKK000K0kxxxddollddc,':ll:,.......';cccoddoooooooddddddollc:;,",
                ".:oxOO00OOkxddodxkkOOOOOO000KKKKKXXXKKKK0OOO0KOxdllllcclc,,:c:,'...'''''';:c::cllllllllooddxxxddooll",
                ",cdkOO000OkxddoodxxkkkkOOOOO000000KK0OOOkxxkOO00xocc:;;,,;:::::cccc::;,,:::cc:;;ldddddddddxxxxxxxddd",
                ",cokO0KK0OOOOkdddddxxxkxdc:::::::clloooooodddkOkdllc;'.,:c:looolc:;,,,:clcccooc,:xkkxxxxxxxxxxxxxxdd",
                "',:lxkO0KXXKKOxxxxxxxoc;;;:clooolc:::;;;;;::lodxkxdo:;::;:cclllcccclodxxddoooll:;ldxxdooooodddddoooo",
                "..,:odkXNNNXKOkkkkkkxl::coxkxxkkxdlcc:::;,;codxkOOkkdoolllcclodxkOOOOOOkkkxdolc:;;:cc:;,,,;::cc:;;;;",
                "...;cokXNNNX0OkkOOOOxoclddollolc:,.'',;:::coxkOO0000OkdolllccoodxkO0000Okkxdolc:;,,,................",
                "...,;lk0KKK0OkkkOOOOkxdxdoccc:;;cc;:cc::cdxkO0KK00000OOOkxdlcccldxkO0KK0kxxollc:;,,,...        .    ",
                "...':oxkO00OxxkOOOkkkkxxdl::cdkkkxol:::lxkO000KK00000K00OOxl:;,,:odkO00Okxdolcc:;,,,,'.             ",
                "....:llodkkkkkkOOOkkxdxxdooxxxxdoccclodxkO00OOO00000KK0Oxoc,....,:cldxkxxxdolc:;,,,,,;,.            ",
                "....,;;:lloxxxxkkkkkkxdxxkOkxddddddkkkxkOOOxdk000Okkxxdolc,. .',;:c:clooooollc:;,,,,,,;'.           ",
                "....',,,;cldddxkkOOOOOkkOOkO00KKKK00OOOOOkxllkkd:,,'',;;,,..,;;::::::::cllllcc;,''',,,;;.           ",
                "....',,,;;:odloxkkOOO0OOOOO0KXXNNNXXK00Oxdl;col;',;:clc;,,;ccccc::;;;;;;::ccc:;,'',,,,;:;..         ",
                ".....':cc;;:lcldxkkOO000KKKKKXNNWWWNNX0kol;:dkkxxkOOkkkdoodxdol:;,,''''',;:ccc:;,,,,,',;;,.   ...   ",
                "'....,c;:ccccc:ldxxkOOO0KKKKKXXNNNNWNXOxl:,lk0XXXXKK000Odlllol:;,'........,:clc:;;,,,''',,'.   ..   ",
                ".... 'ccloxxolc:lodkkkO000000KXXXXXXX0kdl;;ok0KXXKK0kxdxxlccc:,,'..........,:llc:;;,,,'.,;,.        ",
                "......:xkkOOOxoccloxxkkOOOOO00KKKKK00Okdc,;oxkO0kxxxolcllc:;::,'............';::;;,,,,'.';;'.       ",
                ".......cOOOOOkdoolodxxkkkkkkOO00OOOOOkxo:,;ldddolclooc;,,,'...       ...''...',;;;,''''.',;,.       ",
                ".......'dOkkO0kddlldxxkkOOOOOOOkkkOkkxdo:,:lc;::lllc,.           ....','',,'..',,,,,'...',;,.       ",
                "........,xOxxkxddddxxxxxkkOOOOOkkkkkxxdoc;;:,..,:,..           .',;:cc;,':c:,'.'..,;''..',;;.       ",
                ".........,okxdxxxxxkkxxxkkkOOOOOOkkxxddol:,....'.           ..';::ccc:;''cc:;;,'..','''..',;'       ",
                "d:'........;oxxxdoxkxxdxxxkkOOOOOkkkxxxddc,......   ........,;cc:::loo:.'cc;;:c:,''''''..',;,.      ",
                "Od;......   .;oxxddddoodxxdxkkkOOkkOkkkkxoc,....  ..,;:;;;;;;:::codkkd;.'::,;:looc;;,''..',,.       ",
                "o:'......     .lkxoodooooodxxxxkkOOOOOOkxdl;...,'.,:loodxkkxdolodxkkxo:,;c;,,:lllol:;,...,,'.       ",
                "........      .cdoolloddocoxxdxkOOkO0Okxolc:'..;ll:cloxkKK0OkkxdxxkOkxocl:,',cllclol;'..';;,.       ",
                "........      ..'.,ooloxoccloddxkkkkOxddocc:,..':oddoc::dk0KKKOOOOkxxooo:,'',:llc:::;,'',,,'.       ",
                "....              .cxooxdoccododxxdxxdodoc:;,..':looxOocldOXKKOkxxxdxxl;,''',;cl:::c:;:;;,'..       ",
            },
            opts = {
                hl = "String",
                position = "center",
            },
        }

        local buttons = {
            type = "group",
            val = {
                db.button("p", "   Projects", ":Telescope projects<CR>"),
                db.button("o", "   Open/Create file", ":Telescope file_browser path=~/Documenti/projects<CR>"),
                db.button("c", "   Configuration", ":e ~/.config/nvim/lua/plugins.lua<CR>"),
            },
            opts = {
                spacing = 1,
            },
        }

        local config = {
            layout = {
                header,
                { type = "padding", val = 1 },
                buttons,
            },
        }
        alpha.setup(config)
    end,
    lazy = false,
}
