"use strict";(("undefined"!=typeof self?self:global).webpackChunkopen=("undefined"!=typeof self?self:global).webpackChunkopen||[]).push([[6450],{15241:(e,s,i)=>{i.d(s,{Z:()=>o});var n=i(16111),t=i(41832),r=i(56990),a=i(4637);const o=({name:e,uri:s,images:i,isHero:o,testId:c,description:l,index:d,requestId:u,color:m})=>(0,a.jsx)(n.C,{index:d,featureIdentifier:"artist_concerts",headerText:e,uri:s,isPlayable:!1,renderCardImage:()=>(0,a.jsx)(t.x,{isHero:o,images:i,color:m}),renderSubHeaderContent:()=>(0,a.jsx)(r.i,{isHero:o,children:(0,a.jsx)("span",{children:l||""})}),testId:c,requestId:u})},5641:(e,s,i)=>{i.d(s,{q:()=>k});var n=i(46721),t=i(36589),r=i(16111),a=i(41832),o=i(56990),c=i(87334),l=i(71328),d=i(4637);const u=({name:e="",uri:s="",images:i=[],isHero:n,onClick:t,testId:u,index:m})=>n?(0,d.jsx)(c.Z,{featureIdentifier:"unknown",index:m,onClick:t,headerText:e,uri:s,isPlayable:!1,renderCardImage:()=>(0,d.jsx)(a.x,{isHero:n,images:i}),renderSubHeaderContent:()=>(0,d.jsx)(o.i,{isHero:!0,children:(0,d.jsx)(l.k,{})}),testId:u}):(0,d.jsx)(r.C,{index:m,featureIdentifier:"unknown",onClick:t,headerText:e,uri:s,isPlayable:!1,renderCardImage:()=>(0,d.jsx)(a.x,{isHero:n,images:i}),renderSubHeaderContent:()=>(0,d.jsx)(o.i,{children:(0,d.jsx)("span",{})}),testId:u});var m=i(32704),g=i(70213),x=i(75729),h=i(8592),p=i(15241),j=i(79282),f=i(28003),I=i(76026),v=i(95343),b=i(360),y=i(88004),C=i(17636),w=i(50054);const k=({entity:e,index:s,testId:i,isHero:r=!1})=>{const a=((0,n.EC)(e.uri)||{}).type,o={testId:i,isHero:r,index:s,sharingInfo:e.sharingInfo};if(("string"==typeof e.uri||e.uri instanceof String)&&e.uri.startsWith("spotify:merch:")){const s=e.description?e.description.split("•")[0]:"";return(0,d.jsx)(f.T,{...o,name:e.name,uri:e.uri,href:e.href,images:e.images,price:s,artists:e.artists||{items:[]}})}if(("string"==typeof e.uri||e.uri instanceof String)&&e.uri.startsWith("spotify:artist:")&&e.uri.endsWith(":concerts"))return(0,d.jsx)(p.Z,{...o,name:e.name,uri:e.uri,images:e.images,description:e.description});switch(a){case n.JM.ALBUM:case n.JM.COLLECTION_ALBUM:{const s=e;return(0,d.jsx)(x.r,{...o,name:s.name,uri:s.uri,images:s.images,artists:s.artists})}case n.JM.ARTIST:{const s=e;return(0,d.jsx)(h.I,{...o,name:s.name,uri:s.uri,images:s.images})}case n.JM.EPISODE:{const s=e;return(0,d.jsx)(j.B,{...o,name:s.name,uri:s.uri,images:s.images,showImages:s.show?.images||[],durationMilliseconds:s.duration_ms,releaseDate:s.release_date,resume_point:s.resume_point,description:s.description,isExplicit:s.explicit,is19PlusOnly:!!s.tags?.includes("MOGEF-19+")})}case n.JM.PLAYLIST:case n.JM.PLAYLIST_V2:{const s=e,i=s.owner?.display_name||e.owner?.displayName||"";return(0,d.jsx)(I.Z,{...o,name:s.name,uri:s.uri,images:s.images,description:s.description,authorName:i})}case n.JM.PROFILE:return(0,d.jsx)(v.P,{...o,name:e.name,uri:e.uri,images:e.images});case n.JM.SHOW:{const s=e;return(0,d.jsx)(y._,{...o,name:s.name,uri:s.uri,images:s.images,publisher:s.publisher,mediaType:{audio:g.E.AUDIO,video:g.E.VIDEO,mixed:g.E.MIXED}[s.media_type]??g.E.AUDIO})}case n.JM.APPLICATION:return(0,d.jsx)(t.s,{...o,name:e.name,uri:e.uri,images:e.images,description:e.description});case n.JM.RADIO:return(0,d.jsx)(b.I,{testId:i,index:s,name:e.name,uri:e.uri,images:e.images});case n.JM.TRACK:{const s=e;return(0,d.jsx)(C.G,{...o,name:s.name,uri:s.uri,images:s.album?.images||[],artists:s.artists,album:s.album,isExplicit:s.explicit,is19PlusOnly:s.tags?.includes("MOGEF-19+")})}case n.JM.COLLECTION:return e.uri.endsWith("your-episodes")?(0,d.jsx)(w.T,{index:s}):(0,d.jsx)(m.p,{index:s});default:return console.warn("Rendering a generic Card for unknown type:",a),(0,d.jsx)(u,{...o,name:e.name,uri:e.uri,images:e.images})}}},36589:(e,s,i)=>{i.d(s,{s:()=>d});var n=i(13803),t=i(16111),r=i(41832),a=i(56990),o=i(87334),c=i(71328),l=i(4637);const d=({name:e,uri:s,images:i,isHero:d,onClick:u,testId:m,description:g,index:x,requestId:h,color:p})=>d?(0,l.jsx)(o.Z,{featureIdentifier:"genre",index:x,onClick:u,headerText:e,uri:s,isPlayable:!1,renderCardImage:()=>(0,l.jsx)(r.x,{isHero:d,images:i,color:p}),renderSubHeaderContent:()=>(0,l.jsx)(a.i,{isHero:!0,children:(0,l.jsx)(c.k,{children:g||n.ag.get("card.tag.genre")})}),testId:m,requestId:h}):(0,l.jsx)(t.C,{index:x,featureIdentifier:"genre",onClick:u,headerText:e,uri:s,isPlayable:!1,renderCardImage:()=>(0,l.jsx)(r.x,{isHero:d,images:i,color:p}),renderSubHeaderContent:()=>(0,l.jsx)(a.i,{children:(0,l.jsx)("span",{children:g||""})}),testId:m,requestId:h})},28003:(e,s,i)=>{i.d(s,{T:()=>j});var n=i(59496),t=i(64559),r=i(26446),a=i(75186),o=i(57174),c=i(72221),l=i(13803),d=i(30549),u=i(59737);const m="iSdDcgYotxUpyRSGLR62",g="EqZ5uEZ02bJiKlZNijVQ",x="UroGtnEGQiwN1yKyNXjC",h="Tv3tod8ggHvNrrRzE1Kg";var p=i(4637);const j=({name:e,uri:s,href:i,images:j,index:f,price:I,testId:v,artists:b})=>{const y=(0,n.useMemo)((()=>b.items.map((e=>"uri"in e.data?e.data.uri:"")).join(l.ag.getSeparator())),[b.items]),{spec:C,logger:w}=(0,d.fU)(c.I,{data:{position:f,uri:s,reason:y}}),k=(0,d.Wi)(C),E=(0,u.X)(j,{desiredSize:300}),N=(0,n.useCallback)((()=>{w.logInteraction(C.cardLinkFactory({position:0}).hitNavigateToExternalUri({destination:i})),window.open(i,"_blank")}),[i,w,C]);return(0,p.jsx)(t.Z,{id:s,ref:k,"data-testid":v,title:(0,p.jsx)(r.l,{className:h,children:e}),media:(0,p.jsx)("div",{className:m,children:E?(0,p.jsx)(a.x,{size:"sm",src:E?.url,alt:e}):(0,p.jsx)("div",{className:g,children:(0,p.jsx)("div",{className:x,children:(0,p.jsx)(o.C,{size:"xxlarge","aria-hidden":!0,"data-testid":"card-image-fallback"})})})}),onClick:N,size:"sm",subtitle:I},s)}},20395:(e,s,i)=>{i.r(s),i.d(s,{DISALLOWED_VIEWS:()=>Q,View:()=>V,default:()=>z});var n=i(59496),t=i(84875),r=i.n(t),a=i(55411),o=i(64329),c=i(13803),l=i(72916),d=i(25494),u=i(73060),m=i(32290),g=i(60527),x=i(30549),h=i(23218),p=i(94190),j=i(70424),f=i(86857),I=i(92142),v=i(29360),b=i(5641),y=i(25561),C=i(99714),w=i(2988),k=i(97533),E=i(54940),N=i(93058);const P="EPMDgp7znILo0hvyirzv",M="noUm6pjQ6KWq7mVxYDor",A="PqnKjxzJ1Zvr9qKRlRbO",L="uuBQS9Ym_VPmAQrLhPQb";var H=i(4637);const T=e=>(0,k.W6)(E.sEQ)?(0,H.jsxs)(N.default,{to:e.uri,target:"_blank",className:P,children:[(0,H.jsx)("div",{className:M}),(0,H.jsx)(w.D,{className:A,as:"h2",variant:"alto",children:e.label}),(0,H.jsx)(w.D,{className:L,as:"p",variant:"mesto",children:e.tagline})]}):null,D=e=>(0,H.jsx)(n.Suspense,{fallback:null,children:(0,H.jsx)(T,{...e})}),S=e=>e.id?.startsWith("scc-corona"),O=({spaces:e,viewName:s,viewId:i,isAnonymous:t})=>{const r=(0,n.useCallback)(((e,s)=>{const n=((e,s)=>{let{uri:i}=e;return e.href.includes("https://api.spotify.com/v1/views/")&&(i=e.href.replace("https://api.spotify.com/v1/views/","spotify:genre:"),"hub-browse-grid"===s&&(i=i.replace(":view:",":genre:"))),i})(e,i);return(0,H.jsx)(b.q,{index:s,entity:{...e,uri:n}},e.href)}),[i]),a=(0,n.useCallback)(((e,s)=>(0,H.jsx)(C.JL,{value:"card",index:s,children:(0,H.jsx)(b.q,{index:s,entity:e})},e.uri||s)),[]),o=(0,n.useCallback)(((e,s)=>"link"===e.type?r(e,s):a(e,s)),[a,r]),c=(0,n.useCallback)((e=>!!S(e)||!((e=>"HEADER"===e.rendering)(e)||0===e.content.total||t&&"uniquely-yours-shelf"===e.id)),[t]);return e&&0!==e.length?e[0].content?(0,H.jsx)(H.Fragment,{children:e.filter(c).map(((e,s)=>{const n=e.content&&(0,h.p)((0,h.S)(e.href));if(S(e)){const s=e.content.items[0];return s&&s.name&&s.description&&s.href?(0,H.jsx)(D,{label:s.name,tagline:s.description,uri:s.href},"corona-banner"):null}return(0,H.jsx)(C.JL,{value:"headered-grid",index:s,children:(0,H.jsx)(y.q,{total:e.content.total,seeAllUri:n,pageId:i,title:e.name,tagline:e.tag_line||void 0,index:s,id:e.id,children:e.content.items.map(o)})},e.id)}))}):(0,H.jsx)(C.JL,{value:"headered-grid",children:(0,H.jsx)(y.q,{showAll:!0,title:s,total:e?.length||0,index:0,id:i??"spaces-see-all-grid",children:e?.map(o)})}):null};var _=i(64111);const q="XD65NhAD6ebYxMaW9cZZ",J="AJqEY1gblQDvIgjU0jAH",R="Ft1cMGlqDsCbqmXQyeKN",W="zlBEnsMyvUhuHSEtst4Q",F="INYpiFRlwWIZ0vH30xW2",U=e=>"HEADER"===e.rendering,G=(e,s=[],i)=>{if(!e)return(0,H.jsx)("div",{className:F});const n=s.filter((e=>"background"===e.name));return(0,H.jsxs)(j.gF,{backgroundImages:n,backgroundColor:i,size:0===n.length?j.fR.SMALL:j.fR.DEFAULT,children:[(0,H.jsx)(f.W,{children:(0,H.jsx)(I.i,{text:e})}),(0,H.jsx)(j.sP,{children:(0,H.jsx)(j.xd,{children:e})})]})},Z=e=>{const{title:s,images:i,backgroundColor:n}=e;return(0,H.jsx)(H.Fragment,{children:G(s,i,n)})},Q=["ginger-genre-affinity"],V=n.memo((function({viewData:e,viewId:s,backgroundColor:i,isFullyLoaded:t,isGenre:a,isAnonymous:u,getNextPage:h}){const f=e?.name,{spec:I,UBIFragment:b}=(0,x.fU)(o.createDesktopGenreEventFactory,{data:{identifier:s,uri:`spotify:genre:${s}`}}),y=(0,n.useCallback)((()=>Q.some((s=>e?.href?.includes(s)))),[e]),C=(0,n.useCallback)((()=>{if(!e)return;const s=y();t||s||h()}),[e,y,t,h]),w=(0,n.useMemo)((()=>{const{content:{items:s=[]}={}}=e||{},i=s.filter(U);return i.length>0?i[0]:null}),[e]),k=(0,n.useMemo)((()=>{const{name:s}=e||{};return w?w.name:i&&s}),[i,w,e]),E=(0,n.useMemo)((()=>a||Boolean(k)),[a,k]),N=(0,n.useMemo)((()=>!(!e||!Array.isArray(e.content.items))&&E),[E,e]),P=(0,j.oX)(s)?(0,H.jsx)(j.YD,{isAnonymous:u}):(0,H.jsx)(Z,{title:w?.name||k,images:w?.images||[],backgroundColor:i}),M=e?.content.items,A=(0,n.useMemo)((()=>I.shelvesFactory()),[I]);return e?(0,H.jsxs)(H.Fragment,{children:[f?(0,H.jsx)(p.$,{children:(0,g.cT)({genreName:f})}):null,(0,H.jsx)(m.C,{onReachBottom:C,children:(0,H.jsxs)("section",{className:q,children:[N&&(0,H.jsx)(d.H,{color:i||null}),E?P:(0,H.jsx)("div",{className:F}),(0,H.jsxs)("div",{className:R,children:[E&&P&&(0,H.jsx)(l.I,{backgroundColor:i}),(0,H.jsx)("div",{className:r()(J,"contentSpacing",{[W]:a}),children:(0,H.jsx)(b,{spec:A,children:(0,H.jsx)(O,{spaces:M,viewName:e.name,viewId:s,isAnonymous:u})})})]})]})})]}):(0,H.jsx)(v.h,{hasError:!1,errorMessage:c.ag.get("error.not_found.title.page")})})),z=n.memo((function({viewId:e}){const{isAnonymous:s}=(0,a.v9)(_.Gg),{view:i,getNextPage:n}=(0,u.P)(e),t=!i||null===i.content.next,r=e.endsWith("-page")?e:`${e}-page`,o=(0,a.v9)((e=>e.browse.allItemsStyle?.[r]?.color||"")),c=s=>s.viewId===e||"href"in s&&s.href===(0,h.p)(e),l=(0,a.v9)((e=>e?.browse?.browseAll?.items.some(c)||e?.browse?.topGenres?.items.some(c)||!!o));return(0,H.jsx)(V,{viewData:i,isFullyLoaded:t,viewId:e,backgroundColor:o,isGenre:l,isAnonymous:s,getNextPage:n})}))},73060:(e,s,i)=>{i.d(s,{P:()=>g});var n=i(59496),t=i(9102),r=i(48702),a=i(79357),o=i(55411),c=i(97533),l=i(13803),d=i(81351),u=i(64111),m=i(67855);const g=(e,s)=>{const i=(()=>{const e=(0,c.W6)(m.Xf),s=(0,o.v9)(d.rZ),{overrides:i}=(0,o.v9)(u.Gg),t=l.ag.getLocale(),r=i?.country||s,a=i?.locale||t;return(0,n.useMemo)((()=>{const s=["album","playlist","artist","show","station","episode","merch","artist_concerts"];return e&&s.push("uri_link"),{country:r,locale:a,types:s.join(",")}}),[r,e,a])})(),{data:g,fetchNextPage:x}=(0,t.useInfiniteQuery)(["useView",e,i],(async({pageParam:s})=>void 0===s?async function(e,s){const{body:i}=await a.kO.getView(r.b.getInstance(),e,s);return i}(e,i):async function(e){const s=new URL(e),i=s.origin,n=s.pathname,t=Object.fromEntries(s.searchParams.entries()),{body:o}=await a.TV.getGeneric(r.b.getInstance(),i,n,t,"/useView/fetchNext/{next}");return o}(s)),{cacheTime:s?.cacheTime??18e5,staleTime:s?.staleTime??3e5,getNextPageParam:e=>e.content.next??void 0,getPreviousPageParam:e=>e.content.previous??void 0});return{view:(0,n.useMemo)((()=>g?.pages.reduce(((e,s)=>({...e,content:{...e.content,href:s.content.href,next:s.content.next,offset:s.content.offset,previous:s.content.previous,total:s.content.total,items:e.content.items.concat(s.content.items)}})))),[g?.pages]),getNextPage:x}}}}]);
//# sourceMappingURL=xpui-routes-view.js.map