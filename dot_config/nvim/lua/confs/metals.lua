local metals_config = require("metals").bare_config()

metals_config.init_options.statusBarProvider = "on"
metals_config.settings = {
    useGlobalExecutable = true, -- So we can use LSP Zero.  This means we have to keep Metals up-to-date ourselves.
}
