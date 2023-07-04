function Span(el)
    if string.find(el.attributes.style, "color") then
        local stylestr = el.attributes.style
        local thecolor = string.match(stylestr, "color:%s*(%a+);?")
        --print(thecolor)
        if FORMAT:match("latex") then
            -- encapsulate in latex code
            table.insert(el.content, 1, pandoc.RawInline("latex", "\\textcolor{" .. thecolor .. "}{"))
            table.insert(el.content, pandoc.RawInline("latex", "}"))
            -- returns only span content
            return el.content
        else
            -- for other format return unchanged
            return el
        end
    else
        return el
    end
end
