(("undefined"!=typeof self?self:global).webpackChunkclient_web=("undefined"!=typeof self?self:global).webpackChunkclient_web||[])
.push([["spicetify-routes-lyrics-plus"],{"spicetify-routes-lyrics-plus":(e,t,n)=>{
"use strict";n.r(t),n.d(t,{default:()=>render});
// Run "npm i @types/react" to have this type package available in workspace
/// <reference types="react" />
/// <reference path="../../globals.d.ts" />

/** @type {React} */
const react = Spicetify.React;
const { useState, useEffect, useCallback, useMemo, useRef } = react;
/** @type {import("react").ReactDOM} */
const reactDOM = Spicetify.ReactDOM;
const spotifyVersion = Spicetify.Platform.version;

// Define a function called "render" to specify app entry point
// This function will be used to mount app to main view.
function render() {
	return react.createElement(LyricsContainer, null);
}

function getConfig(name, defaultVal = true) {
	const value = localStorage.getItem(name);
	return value ? value === "true" : defaultVal;
}

const APP_NAME = "lyrics-plus";

const KARAOKE = 0;
const SYNCED = 1;
const UNSYNCED = 2;
const GENIUS = 3;

const CONFIG = {
	visual: {
		"playbar-button": getConfig("lyrics-plus:visual:playbar-button", false),
		colorful: getConfig("lyrics-plus:visual:colorful"),
		noise: getConfig("lyrics-plus:visual:noise"),
		"background-color": localStorage.getItem("lyrics-plus:visual:background-color") || "var(--spice-main)",
		"active-color": localStorage.getItem("lyrics-plus:visual:active-color") || "var(--spice-text)",
		"inactive-color": localStorage.getItem("lyrics-plus:visual:inactive-color") || "rgba(var(--spice-rgb-subtext),0.5)",
		"highlight-color": localStorage.getItem("lyrics-plus:visual:highlight-color") || "var(--spice-button)",
		alignment: localStorage.getItem("lyrics-plus:visual:alignment") || "center",
		"lines-before": localStorage.getItem("lyrics-plus:visual:lines-before") || "0",
		"lines-after": localStorage.getItem("lyrics-plus:visual:lines-after") || "2",
		"font-size": localStorage.getItem("lyrics-plus:visual:font-size") || "32",
		"translate:translated-lyrics-source": localStorage.getItem("lyrics-plus:visual:translate:translated-lyrics-source") || "none",
		"translate:detect-language-override": localStorage.getItem("lyrics-plus:visual:translate:detect-language-override") || "off",
		"translation-mode:japanese": localStorage.getItem("lyrics-plus:visual:translation-mode:japanese") || "furigana",
		"translation-mode:korean": localStorage.getItem("lyrics-plus:visual:translation-mode:korean") || "hangul",
		"translation-mode:chinese": localStorage.getItem("lyrics-plus:visual:translation-mode:chinese") || "cn",
		translate: getConfig("lyrics-plus:visual:translate", false),
		"ja-detect-threshold": localStorage.getItem("lyrics-plus:visual:ja-detect-threshold") || "40",
		"hans-detect-threshold": localStorage.getItem("lyrics-plus:visual:hans-detect-threshold") || "40",
		"fade-blur": getConfig("lyrics-plus:visual:fade-blur"),
		"fullscreen-key": localStorage.getItem("lyrics-plus:visual:fullscreen-key") || "f12",
		"synced-compact": getConfig("lyrics-plus:visual:synced-compact"),
		"dual-genius": getConfig("lyrics-plus:visual:dual-genius"),
		"global-delay": Number(localStorage.getItem("lyrics-plus:visual:global-delay")) || 0,
		delay: 0,
	},
	providers: {
		musixmatch: {
			on: getConfig("lyrics-plus:provider:musixmatch:on"),
			desc: "Fully compatible with Spotify. Requires a token that can be retrieved from the official Musixmatch app. If you have problems with retrieving lyrics, try refreshing the token by clicking <code>Refresh Token</code> button.",
			token: localStorage.getItem("lyrics-plus:provider:musixmatch:token") || "21051986b9886beabe1ce01c3ce94c96319411f8f2c122676365e3",
			modes: [KARAOKE, SYNCED, UNSYNCED],
		},
		spotify: {
			on: getConfig("lyrics-plus:provider:spotify:on"),
			desc: "Lyrics sourced from official Spotify API.",
			modes: [SYNCED, UNSYNCED],
		},
		netease: {
			on: getConfig("lyrics-plus:provider:netease:on"),
			desc: "Crowdsourced lyrics provider ran by Chinese developers and users.",
			modes: [KARAOKE, SYNCED, UNSYNCED],
		},
		lrclib: {
			on: getConfig("lyrics-plus:provider:lrclib:on"),
			desc: "Lyrics sourced from lrclib.net. Supports both synced and unsynced lyrics. LRCLIB is a free and open-source lyrics provider.",
			modes: [SYNCED, UNSYNCED],
		},
		genius: {
			on: spotifyVersion >= "1.2.31" ? false : getConfig("lyrics-plus:provider:genius:on"),
			desc: "Provide unsynced lyrics with insights from artists themselves. Genius is disabled and cannot be used as a provider on <code>1.2.31</code> and higher.",
			modes: [GENIUS],
		},
		local: {
			on: getConfig("lyrics-plus:provider:local:on"),
			desc: "Provide lyrics from cache/local files loaded from previous Spotify sessions.",
			modes: [KARAOKE, SYNCED, UNSYNCED],
		},
	},
	providersOrder: localStorage.getItem("lyrics-plus:services-order"),
	modes: ["karaoke", "synced", "unsynced", "genius"],
	locked: localStorage.getItem("lyrics-plus:lock-mode") || "-1",
};

try {
	CONFIG.providersOrder = JSON.parse(CONFIG.providersOrder);
	if (!Array.isArray(CONFIG.providersOrder) || Object.keys(CONFIG.providers).length !== CONFIG.providersOrder.length) {
		throw "";
	}
} catch {
	CONFIG.providersOrder = Object.keys(CONFIG.providers);
	localStorage.setItem("lyrics-plus:services-order", JSON.stringify(CONFIG.providersOrder));
}

CONFIG.locked = Number.parseInt(CONFIG.locked);
CONFIG.visual["lines-before"] = Number.parseInt(CONFIG.visual["lines-before"]);
CONFIG.visual["lines-after"] = Number.parseInt(CONFIG.visual["lines-after"]);
CONFIG.visual["font-size"] = Number.parseInt(CONFIG.visual["font-size"]);
CONFIG.visual["ja-detect-threshold"] = Number.parseInt(CONFIG.visual["ja-detect-threshold"]);
CONFIG.visual["hans-detect-threshold"] = Number.parseInt(CONFIG.visual["hans-detect-threshold"]);

const CACHE = {};

const emptyState = {
	karaoke: null,
	synced: null,
	unsynced: null,
	genius: null,
	genius2: null,
	currentLyrics: null,
};

let lyricContainerUpdate;

const fontSizeLimit = { min: 16, max: 256, step: 4 };

const thresholdSizeLimit = { min: 0, max: 100, step: 5 };

class LyricsContainer extends react.Component {
	constructor() {
		super();
		this.state = {
			karaoke: null,
			synced: null,
			unsynced: null,
			genius: null,
			genius2: null,
			currentLyrics: null,
			romaji: null,
			furigana: null,
			hiragana: null,
			hangul: null,
			romaja: null,
			katakana: null,
			cn: null,
			hk: null,
			tw: null,
			musixmatchTranslation: null,
			neteaseTranslation: null,
			uri: "",
			provider: "",
			colors: {
				background: "",
				inactive: "",
			},
			tempo: "0.25s",
			explicitMode: -1,
			lockMode: CONFIG.locked,
			mode: -1,
			isLoading: false,
			versionIndex: 0,
			versionIndex2: 0,
			isFullscreen: false,
			isFADMode: false,
			isCached: false,
		};
		this.currentTrackUri = "";
		this.nextTrackUri = "";
		this.availableModes = [];
		this.styleVariables = {};
		this.fullscreenContainer = document.createElement("div");
		this.fullscreenContainer.id = "lyrics-fullscreen-container";
		this.mousetrap = new Spicetify.Mousetrap();
		this.containerRef = react.createRef(null);
		this.translator = new Translator(CONFIG.visual["translate:detect-language-override"]);
		// Cache last state
		this.translationProvider = CONFIG.visual["translate:translated-lyrics-source"];
		this.languageOverride = CONFIG.visual["translate:detect-language-override"];
		this.translate = CONFIG.visual.translate;
	}

	infoFromTrack(track) {
		const meta = track?.metadata;
		if (!meta) {
			return null;
		}
		return {
			duration: Number(meta.duration),
			album: meta.album_title,
			artist: meta.artist_name,
			title: meta.title,
			uri: track.uri,
			image: meta.image_url,
		};
	}

	async fetchColors(uri) {
		let vibrant = 0;
		try {
			try {
				const { fetchExtractedColorForTrackEntity } = Spicetify.GraphQL.Definitions;
				const { data } = await Spicetify.GraphQL.Request(fetchExtractedColorForTrackEntity, { uri });
				const { hex } = data.trackUnion.albumOfTrack.coverArt.extractedColors.colorDark;
				vibrant = Number.parseInt(hex.replace("#", ""), 16);
			} catch {
				const colors = await Spicetify.CosmosAsync.get(`https://spclient.wg.spotify.com/colorextractor/v1/extract-presets?uri=${uri}&format=json`);
				vibrant = colors.entries[0].color_swatches.find((color) => color.preset === "VIBRANT_NON_ALARMING").color;
			}
		} catch {
			vibrant = 8747370;
		}

		this.setState({
			colors: {
				background: Utils.convertIntToRGB(vibrant),
				inactive: Utils.convertIntToRGB(vibrant, 3),
			},
		});
	}

	async fetchTempo(uri) {
		const audio = await Spicetify.CosmosAsync.get(`https://api.spotify.com/v1/audio-features/${uri.split(":")[2]}`);
		let tempo = audio.tempo;

		const MIN_TEMPO = 60;
		const MAX_TEMPO = 150;
		const MAX_PERIOD = 0.4;
		if (!tempo) tempo = 105;
		if (tempo < MIN_TEMPO) tempo = MIN_TEMPO;
		if (tempo > MAX_TEMPO) tempo = MAX_TEMPO;

		let period = MAX_PERIOD - ((tempo - MIN_TEMPO) / (MAX_TEMPO - MIN_TEMPO)) * MAX_PERIOD;
		period = Math.round(period * 100) / 100;

		this.setState({
			tempo: `${String(period)}s`,
		});
	}

	async tryServices(trackInfo, mode = -1) {
		const currentMode = CONFIG.modes[mode] || "";
		let finalData = { ...emptyState, uri: trackInfo.uri };
		for (const id of CONFIG.providersOrder) {
			const service = CONFIG.providers[id];
			if (spotifyVersion >= "1.2.31" && id === "genius") continue;
			if (!service.on) continue;
			if (mode !== -1 && !service.modes.includes(mode)) continue;

			let data;
			try {
				data = await Providers[id](trackInfo);
			} catch (e) {
				console.error(e);
				continue;
			}

			if (data.error || (!data.karaoke && !data.synced && !data.unsynced && !data.genius)) continue;
			if (mode === -1) {
				finalData = data;
				CACHE[data.uri] = finalData;
				return finalData;
			}

			if (!data[currentMode]) {
				for (const key in data) {
					if (!finalData[key]) {
						finalData[key] = data[key];
					}
				}
				continue;
			}

			for (const key in data) {
				if (!finalData[key]) {
					finalData[key] = data[key];
				}
			}

			if (data.provider !== "local" && finalData.provider && finalData.provider !== data.provider) {
				const styledMode = currentMode.charAt(0).toUpperCase() + currentMode.slice(1);
				finalData.copyright = `${styledMode} lyrics provided by ${data.provider}\n${finalData.copyright || ""}`.trim();
			}

			if (finalData.musixmatchTranslation && typeof finalData.musixmatchTranslation[0].startTime === "undefined" && finalData.synced) {
				finalData.musixmatchTranslation = finalData.synced.map((line) => ({
					...line,
					text:
						finalData.musixmatchTranslation.find((l) => Utils.processLyrics(l.originalText) === Utils.processLyrics(line.text))?.text ?? line.text,
				}));
			}

			CACHE[data.uri] = finalData;
			return finalData;
		}

		CACHE[trackInfo.uri] = finalData;
		return finalData;
	}

	async fetchLyrics(track, mode = -1) {
		this.state.furigana =
			this.state.romaji =
			this.state.hiragana =
			this.state.katakana =
			this.state.hangul =
			this.state.romaja =
			this.state.cn =
			this.state.hk =
			this.state.tw =
			this.state.musixmatchTranslation =
			this.state.neteaseTranslation =
				null;
		const info = this.infoFromTrack(track);
		if (!info) {
			this.setState({ error: "No track info" });
			return;
		}

		let isCached = this.lyricsSaved(info.uri);

		if (CONFIG.visual.colorful) {
			this.fetchColors(info.uri);
		}

		this.fetchTempo(info.uri);

		if (mode !== -1) {
			if (CACHE[info.uri]?.[CONFIG.modes[mode]]) {
				this.resetDelay();
				this.setState({ ...CACHE[info.uri], isCached });
				{
					let mode = -1;
					if (this.state.explicitMode !== -1) {
						mode = this.state.explicitMode;
					} else if (this.state.lockMode !== -1) {
						mode = this.state.lockMode;
					} else {
						// Auto switch
						if (this.state.karaoke) {
							mode = KARAOKE;
						} else if (this.state.synced) {
							mode = SYNCED;
						} else if (this.state.unsynced) {
							mode = UNSYNCED;
						} else if (this.state.genius) {
							mode = GENIUS;
						}
					}
					const lyricsState = CACHE[info.uri][CONFIG.modes[mode]];
					if (lyricsState) {
						this.state.currentLyrics = this.state[CONFIG.visual["translate:translated-lyrics-source"]] ?? lyricsState;
					}
				}
				this.translateLyrics();
				return;
			}
		} else {
			if (CACHE[info.uri]) {
				this.resetDelay();
				this.setState({ ...CACHE[info.uri], isCached });
				{
					let mode = -1;
					if (this.state.explicitMode !== -1) {
						mode = this.state.explicitMode;
					} else if (this.state.lockMode !== -1) {
						mode = this.state.lockMode;
					} else {
						// Auto switch
						if (this.state.karaoke) {
							mode = KARAOKE;
						} else if (this.state.synced) {
							mode = SYNCED;
						} else if (this.state.unsynced) {
							mode = UNSYNCED;
						} else if (this.state.genius) {
							mode = GENIUS;
						}
					}
					const lyricsState = CACHE[info.uri][CONFIG.modes[mode]];
					if (lyricsState) {
						this.state.currentLyrics = this.state[CONFIG.visual["translate:translated-lyrics-source"]] ?? lyricsState;
					}
				}
				this.translateLyrics();
				return;
			}
		}

		this.setState({ ...emptyState, isLoading: true, isCached: false });
		const resp = await this.tryServices(info, mode);

		isCached = this.lyricsSaved(resp.uri);

		// In case user skips tracks too fast and multiple callbacks
		// set wrong lyrics to current track.
		if (resp.uri === this.currentTrackUri) {
			this.resetDelay();
			this.setState({ ...resp, isLoading: false, isCached });
		}

		this.translateLyrics();
	}

	lyricsSource(mode) {
		const lyricsState = this.state[CONFIG.modes[mode]];
		if (!lyricsState) return;
		this.state.currentLyrics = this.state[CONFIG.visual["translate:translated-lyrics-source"]] ?? lyricsState;
	}

	provideLanguageCode(lyrics) {
		if (!lyrics) return;

		if (CONFIG.visual["translate:detect-language-override"] !== "off") return CONFIG.visual["translate:detect-language-override"];

		return Utils.detectLanguage(lyrics);
	}

	async translateLyrics(silent = true) {
		function showNotification(timeout) {
			if (silent) return;
			Spicetify.showNotification("Translating...", false, timeout);
		}

		const lyrics = this.state.currentLyrics;
		const language = this.provideLanguageCode(lyrics);

		if (!CONFIG.visual.translate || !language || typeof lyrics?.[0].text !== "string") return;

		if (!this.translator?.finished[language.slice(0, 2)]) {
			this.translator.injectExternals(language);
			this.translator.createTranslator(language);
			showNotification(500);
			setTimeout(this.translateLyrics.bind(this), 100, false);
			return;
		}

		// Seemingly long delay so it can be cleared later for accurate timing
		showNotification(10000);
		for (const params of [
			["romaji", "spaced", "romaji"],
			["hiragana", "furigana", "furigana"],
			["hiragana", "normal", "hiragana"],
			["katakana", "normal", "katakana"],
		]) {
			if (language !== "ja") continue;
			Promise.all(lyrics.map((lyric) => this.translator.romajifyText(lyric.text, params[0], params[1]))).then((results) => {
				const result = results.join("\n");
				Utils.processTranslatedLyrics(result, lyrics, { state: this.state, stateName: params[2] });
				showNotification(200);
				lyricContainerUpdate?.();
			});
		}

		for (const params of [
			["hangul", "hangul"],
			["romaja", "romaja"],
		]) {
			if (language !== "ko") continue;
			Promise.all(lyrics.map((lyric) => this.translator.convertToRomaja(lyric.text, params[1]))).then((results) => {
				const result = results.join("\n");
				Utils.processTranslatedLyrics(result, lyrics, { state: this.state, stateName: params[1] });
				showNotification(200);
				lyricContainerUpdate?.();
			});
		}

		for (const params of [
			["cn", "hk"],
			["cn", "tw"],
			["t", "cn"],
			["t", "hk"],
			["t", "tw"],
		]) {
			if (!language.includes("zh") || (language === "zh-hans" && params[0] === "t") || (language === "zh-hant" && params[0] === "cn")) continue;
			Promise.all(lyrics.map((lyric) => this.translator.convertChinese(lyric.text, params[0], params[1]))).then((results) => {
				const result = results.join("\n");
				Utils.processTranslatedLyrics(result, lyrics, { state: this.state, stateName: params[1] });
				showNotification(200);
				lyricContainerUpdate?.();
			});
		}
	}

	resetDelay() {
		CONFIG.visual.delay = Number(localStorage.getItem(`lyrics-delay:${Spicetify.Player.data.item.uri}`)) || 0;
	}

	async onVersionChange(items, index) {
		if (this.state.mode === GENIUS) {
			this.setState({
				...emptyLine,
				genius2: this.state.genius2,
				isLoading: true,
			});
			const lyrics = await ProviderGenius.fetchLyricsVersion(items, index);
			this.setState({
				genius: lyrics,
				versionIndex: index,
				isLoading: false,
			});
		}
	}

	async onVersionChange2(items, index) {
		if (this.state.mode === GENIUS) {
			this.setState({
				...emptyLine,
				genius: this.state.genius,
				isLoading: true,
			});
			const lyrics = await ProviderGenius.fetchLyricsVersion(items, index);
			this.setState({
				genius2: lyrics,
				versionIndex2: index,
				isLoading: false,
			});
		}
	}

	saveLocalLyrics(uri, lyrics) {
		if (lyrics.genius) {
			lyrics.unsynced = lyrics.genius.split("<br>").map((lyc) => {
				return {
					text: lyc.replace(/<[^>]*>/g, ""),
				};
			});
			lyrics.genius = null;
		}

		const localLyrics = JSON.parse(localStorage.getItem(`${APP_NAME}:local-lyrics`)) || {};
		localLyrics[uri] = lyrics;
		localStorage.setItem(`${APP_NAME}:local-lyrics`, JSON.stringify(localLyrics));
		this.setState({ isCached: true });
	}

	lyricsSaved(uri) {
		const localLyrics = JSON.parse(localStorage.getItem(`${APP_NAME}:local-lyrics`)) || {};
		return !!localLyrics[uri];
	}

	processLyricsFromFile(event) {
		const file = event.target.files;
		if (!file.length) return;
		const reader = new FileReader();

		if (file[0].size > 1024 * 1024) {
			Spicetify.showNotification("File too large", true);
			return;
		}

		reader.onload = (e) => {
			try {
				const localLyrics = Utils.parseLocalLyrics(e.target.result);
				const parsedKeys = Object.keys(localLyrics)
					.filter((key) => localLyrics[key])
					.map((key) => key[0].toUpperCase() + key.slice(1))
					.map((key) => `<strong>${key}</strong>`);

				if (!parsedKeys.length) {
					Spicetify.showNotification("Nothing to load", true);
					return;
				}

				this.setState({ ...localLyrics, provider: "local" });
				CACHE[this.currentTrackUri] = { ...localLyrics, provider: "local", uri: this.currentTrackUri };
				this.saveLocalLyrics(this.currentTrackUri, localLyrics);

				Spicetify.showNotification(`Loaded ${parsedKeys.join(", ")} lyrics from file`);
			} catch (e) {
				console.error(e);
				Spicetify.showNotification("Failed to load lyrics", true);
			}
		};

		reader.onerror = (e) => {
			console.error(e);
			Spicetify.showNotification("Failed to read file", true);
		};

		reader.readAsText(file[0]);
		event.target.value = "";
	}

	componentDidMount() {
		this.onQueueChange = async ({ data: queue }) => {
			this.state.explicitMode = this.state.lockMode;
			this.currentTrackUri = queue.current.uri;
			this.fetchLyrics(queue.current, this.state.explicitMode);
			this.viewPort.scrollTo(0, 0);

			// Fetch next track
			const nextTrack = queue.queued?.[0] || queue.nextUp?.[0];
			const nextInfo = this.infoFromTrack(nextTrack);
			// Debounce next track fetch
			if (!nextInfo || nextInfo.uri === this.nextTrackUri) return;
			this.nextTrackUri = nextInfo.uri;
			this.tryServices(nextInfo, this.state.explicitMode);
		};

		if (Spicetify.Player?.data?.item) {
			this.state.explicitMode = this.state.lockMode;
			this.currentTrackUri = Spicetify.Player.data.item.uri;
			this.fetchLyrics(Spicetify.Player.data.item, this.state.explicitMode);
		}

		this.updateVisualOnConfigChange();
		Utils.addQueueListener(this.onQueueChange);

		lyricContainerUpdate = () => {
			this.updateVisualOnConfigChange();
			this.forceUpdate();
		};

		this.viewPort =
			document.querySelector(".Root__main-view .os-viewport") ?? document.querySelector(".Root__main-view .main-view-container__scroll-node");

		this.configButton = new Spicetify.Menu.Item("Lyrics Plus config", false, openConfig, "lyrics");
		this.configButton.register();

		this.onFontSizeChange = (event) => {
			if (!event.ctrlKey) return;
			const dir = event.deltaY < 0 ? 1 : -1;
			let temp = CONFIG.visual["font-size"] + dir * fontSizeLimit.step;
			if (temp < fontSizeLimit.min) {
				temp = fontSizeLimit.min;
			} else if (temp > fontSizeLimit.max) {
				temp = fontSizeLimit.max;
			}
			CONFIG.visual["font-size"] = temp;
			localStorage.setItem("lyrics-plus:visual:font-size", temp);
			lyricContainerUpdate();
		};

		this.toggleFullscreen = () => {
			const isEnabled = !this.state.isFullscreen;
			if (isEnabled) {
				document.body.append(this.fullscreenContainer);
				document.documentElement.requestFullscreen();
				this.mousetrap.bind("esc", this.toggleFullscreen);
			} else {
				this.fullscreenContainer.remove();
				document.exitFullscreen();
				this.mousetrap.unbind("esc");
			}

			this.setState({
				isFullscreen: isEnabled,
			});
		};
		this.mousetrap.reset();
		this.mousetrap.bind(CONFIG.visual["fullscreen-key"], this.toggleFullscreen);
		window.addEventListener("fad-request", lyricContainerUpdate);
	}

	componentWillUnmount() {
		Utils.removeQueueListener(this.onQueueChange);
		this.configButton.deregister();
		this.mousetrap.reset();
		window.removeEventListener("fad-request", lyricContainerUpdate);
	}

	updateVisualOnConfigChange() {
		this.availableModes = CONFIG.modes.filter((_, id) => {
			return Object.values(CONFIG.providers).some((p) => p.on && p.modes.includes(id));
		});

		if (!CONFIG.visual.colorful) {
			this.styleVariables = {
				"--lyrics-color-active": CONFIG.visual["active-color"],
				"--lyrics-color-inactive": CONFIG.visual["inactive-color"],
				"--lyrics-color-background": CONFIG.visual["background-color"],
				"--lyrics-highlight-background": CONFIG.visual["highlight-color"],
				"--lyrics-background-noise": CONFIG.visual.noise ? "var(--background-noise)" : "unset",
			};
		}

		this.styleVariables = {
			...this.styleVariables,
			"--lyrics-align-text": CONFIG.visual.alignment,
			"--lyrics-font-size": `${CONFIG.visual["font-size"]}px`,
			"--animation-tempo": this.state.tempo,
		};

		this.mousetrap.reset();
		this.mousetrap.bind(CONFIG.visual["fullscreen-key"], this.toggleFullscreen);
	}

	componentDidUpdate() {
		// Apparently if any of these values are changed, the cached translation will not be updated, hence the need to retranslate
		if (
			this.translationProvider !== CONFIG.visual["translate:translated-lyrics-source"] ||
			this.languageOverride !== CONFIG.visual["translate:detect-language-override"] ||
			this.translate !== CONFIG.visual.translate
		) {
			this.translationProvider = CONFIG.visual["translate:translated-lyrics-source"];
			this.languageOverride = CONFIG.visual["translate:detect-language-override"];
			this.translate = CONFIG.visual.translate;

			this.translateLyrics(false);

			return;
		}

		const language = this.provideLanguageCode(this.state.currentLyrics);

		let isTranslated = false;

		switch (language) {
			case "zh-hans":
			case "zh-hant": {
				isTranslated = !!(this.state.cn || this.state.hk || this.state.tw);
				break;
			}
			case "ja": {
				isTranslated = !!(this.state.romaji || this.state.furigana || this.state.hiragana || this.state.katakana);
				break;
			}
			case "ko": {
				isTranslated = !!(this.state.hangul || this.state.romaja);
				break;
			}
		}

		!isTranslated && this.translateLyrics();
	}

	render() {
		const fadLyricsContainer = document.getElementById("fad-lyrics-plus-container");
		this.state.isFADMode = !!fadLyricsContainer;

		if (this.state.isFADMode) {
			// Text colors will be set by FAD extension
			this.styleVariables = {};
		} else if (CONFIG.visual.colorful) {
			this.styleVariables = {
				"--lyrics-color-active": "white",
				"--lyrics-color-inactive": this.state.colors.inactive,
				"--lyrics-color-background": this.state.colors.background || "transparent",
				"--lyrics-highlight-background": this.state.colors.inactive,
				"--lyrics-background-noise": CONFIG.visual.noise ? "var(--background-noise)" : "unset",
			};
		}

		this.styleVariables = {
			...this.styleVariables,
			"--lyrics-align-text": CONFIG.visual.alignment,
			"--lyrics-font-size": `${CONFIG.visual["font-size"]}px`,
			"--animation-tempo": this.state.tempo,
		};

		let mode = -1;
		if (this.state.explicitMode !== -1) {
			mode = this.state.explicitMode;
		} else if (this.state.lockMode !== -1) {
			mode = this.state.lockMode;
		} else {
			// Auto switch
			if (this.state.karaoke) {
				mode = KARAOKE;
			} else if (this.state.synced) {
				mode = SYNCED;
			} else if (this.state.unsynced) {
				mode = UNSYNCED;
			} else if (this.state.genius) {
				mode = GENIUS;
			}
		}

		let activeItem;
		let showTranslationButton;
		let friendlyLanguage;

		const hasTranslation = this.state.neteaseTranslation !== null || this.state.musixmatchTranslation !== null;

		if (mode !== -1) {
			this.lyricsSource(mode);
			const language = this.provideLanguageCode(this.state.currentLyrics);
			friendlyLanguage = language && new Intl.DisplayNames(["en"], { type: "language" }).of(language.split("-")[0])?.toLowerCase();
			showTranslationButton = (friendlyLanguage || hasTranslation) && (mode === SYNCED || mode === UNSYNCED);
			const translatedLyrics = this.state[CONFIG.visual[`translation-mode:${friendlyLanguage}`]];

			if (mode === KARAOKE && this.state.karaoke) {
				activeItem = react.createElement(CONFIG.visual["synced-compact"] ? SyncedLyricsPage : SyncedExpandedLyricsPage, {
					isKara: true,
					trackUri: this.state.uri,
					lyrics: this.state.karaoke,
					provider: this.state.provider,
					copyright: this.state.copyright,
				});
			} else if (mode === SYNCED && this.state.synced) {
				activeItem = react.createElement(CONFIG.visual["synced-compact"] ? SyncedLyricsPage : SyncedExpandedLyricsPage, {
					trackUri: this.state.uri,
					lyrics: CONFIG.visual.translate && translatedLyrics ? translatedLyrics : this.state.currentLyrics,
					provider: this.state.provider,
					copyright: this.state.copyright,
				});
			} else if (mode === UNSYNCED && this.state.unsynced) {
				activeItem = react.createElement(UnsyncedLyricsPage, {
					trackUri: this.state.uri,
					lyrics: CONFIG.visual.translate && translatedLyrics ? translatedLyrics : this.state.currentLyrics,
					provider: this.state.provider,
					copyright: this.state.copyright,
				});
			} else if (mode === GENIUS && this.state.genius) {
				activeItem = react.createElement(GeniusPage, {
					isSplitted: CONFIG.visual["dual-genius"],
					trackUri: this.state.uri,
					lyrics: this.state.genius,
					provider: this.state.provider,
					copyright: this.state.copyright,
					versions: this.state.versions,
					versionIndex: this.state.versionIndex,
					onVersionChange: this.onVersionChange.bind(this),
					lyrics2: this.state.genius2,
					versionIndex2: this.state.versionIndex2,
					onVersionChange2: this.onVersionChange2.bind(this),
				});
			}
		}

		if (!activeItem) {
			activeItem = react.createElement(
				"div",
				{
					className: "lyrics-lyricsContainer-LyricsUnavailablePage",
				},
				react.createElement(
					"span",
					{
						className: "lyrics-lyricsContainer-LyricsUnavailableMessage",
					},
					this.state.isLoading ? LoadingIcon : "(• _ • )"
				)
			);
		}

		this.state.mode = mode;

		const out = react.createElement(
			"div",
			{
				className: `lyrics-lyricsContainer-LyricsContainer${CONFIG.visual["fade-blur"] ? " blur-enabled" : ""}${
					fadLyricsContainer ? " fad-enabled" : ""
				}`,
				style: this.styleVariables,
				ref: (el) => {
					if (!el) return;
					el.onmousewheel = this.onFontSizeChange;
				},
			},
			react.createElement("div", {
				className: "lyrics-lyricsContainer-LyricsBackground",
			}),
			react.createElement(
				"div",
				{
					className: "lyrics-config-button-container",
				},
				showTranslationButton &&
					react.createElement(TranslationMenu, {
						friendlyLanguage,
						hasTranslation: {
							musixmatch: this.state.musixmatchTranslation !== null,
							netease: this.state.neteaseTranslation !== null,
						},
					}),
				react.createElement(AdjustmentsMenu, { mode }),
				react.createElement(
					Spicetify.ReactComponent.TooltipWrapper,
					{
						label: this.state.isCached ? "Lyrics cached" : "Cache lyrics",
					},
					react.createElement(
						"button",
						{
							className: "lyrics-config-button",
							onClick: () => {
								const { synced, unsynced, karaoke, genius } = this.state;
								if (!synced && !unsynced && !karaoke && !genius) {
									Spicetify.showNotification("No lyrics to cache", true);
									return;
								}

								this.saveLocalLyrics(this.currentTrackUri, { synced, unsynced, karaoke, genius });
								Spicetify.showNotification("Lyrics cached");
							},
						},
						react.createElement("svg", {
							width: 16,
							height: 16,
							viewBox: "0 0 16 16",
							fill: "currentColor",
							dangerouslySetInnerHTML: {
								__html: Spicetify.SVGIcons[this.state.isCached ? "downloaded" : "download"],
							},
						})
					)
				),
				react.createElement(
					Spicetify.ReactComponent.TooltipWrapper,
					{
						label: "Load lyrics from file",
					},
					react.createElement(
						"button",
						{
							className: "lyrics-config-button",
							onClick: () => {
								document.getElementById("lyrics-file-input").click();
							},
						},
						react.createElement("input", {
							type: "file",
							id: "lyrics-file-input",
							accept: ".lrc,.txt",
							onChange: this.processLyricsFromFile.bind(this),
							style: {
								display: "none",
							},
						}),
						react.createElement("svg", {
							width: 16,
							height: 16,
							viewBox: "0 0 16 16",
							fill: "currentColor",
							dangerouslySetInnerHTML: {
								__html: Spicetify.SVGIcons["plus-alt"],
							},
						})
					)
				)
			),
			activeItem,
			!!document.querySelector(".main-topBar-topbarContentWrapper") &&
				react.createElement(TopBarContent, {
					links: this.availableModes,
					activeLink: CONFIG.modes[mode],
					lockLink: CONFIG.modes[this.state.lockMode],
					switchCallback: (label) => {
						const mode = CONFIG.modes.findIndex((a) => a === label);
						if (mode !== this.state.mode) {
							this.setState({ explicitMode: mode });
							this.state.provider !== "local" && this.fetchLyrics(Spicetify.Player.data.item, mode);
						}
					},
					lockCallback: (label) => {
						let mode = CONFIG.modes.findIndex((a) => a === label);
						if (mode === this.state.lockMode) {
							mode = -1;
						}
						this.setState({ explicitMode: mode, lockMode: mode });
						this.fetchLyrics(Spicetify.Player.data.item, mode);
						CONFIG.locked = mode;
						localStorage.setItem("lyrics-plus:lock-mode", mode);
					},
				})
		);

		if (this.state.isFullscreen) return reactDOM.createPortal(out, this.fullscreenContainer);
		if (fadLyricsContainer) return reactDOM.createPortal(out, fadLyricsContainer);
		return out;
	}
}

const ProviderNetease = (() => {
	const requestHeader = {
		"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:93.0) Gecko/20100101 Firefox/93.0",
	};

	async function findLyrics(info) {
		const searchURL = "https://music.xianqiao.wang/neteaseapiv2/search?limit=10&type=1&keywords=";
		const lyricURL = "https://music.xianqiao.wang/neteaseapiv2/lyric?id=";

		const cleanTitle = Utils.removeExtraInfo(Utils.removeSongFeat(Utils.normalize(info.title)));
		const finalURL = searchURL + encodeURIComponent(`${cleanTitle} ${info.artist}`);

		const searchResults = await Spicetify.CosmosAsync.get(finalURL, null, requestHeader);
		const items = searchResults.result.songs;
		if (!items?.length) {
			throw "Cannot find track";
		}

		// normalized expected album name
		const neAlbumName = Utils.normalize(info.album);
		const expectedAlbumName = Utils.containsHanCharacter(neAlbumName) ? await Utils.toSimplifiedChinese(neAlbumName) : neAlbumName;
		let itemId = items.findIndex((val) => Utils.normalize(val.album.name) === expectedAlbumName);
		if (itemId === -1) itemId = items.findIndex((val) => Math.abs(info.duration - val.duration) < 3000);
		if (itemId === -1) itemId = items.findIndex((val) => val.name === cleanTitle);
		if (itemId === -1) throw "Cannot find track";

		return await Spicetify.CosmosAsync.get(lyricURL + items[itemId].id, null, requestHeader);
	}

	const creditInfo = [
		"\\s?作?\\s*词|\\s?作?\\s*曲|\\s?编\\s*曲?|\\s?监\\s*制?",
		".*编写|.*和音|.*和声|.*合声|.*提琴|.*录|.*工程|.*工作室|.*设计|.*剪辑|.*制作|.*发行|.*出品|.*后期|.*混音|.*缩混",
		"原唱|翻唱|题字|文案|海报|古筝|二胡|钢琴|吉他|贝斯|笛子|鼓|弦乐",
		"lrc|publish|vocal|guitar|program|produce|write|mix",
	];
	const creditInfoRegExp = new RegExp(`^(${creditInfo.join("|")}).*(:|：)`, "i");

	function containCredits(text) {
		return creditInfoRegExp.test(text);
	}

	function parseTimestamp(line) {
		// ["[ar:Beyond]"]
		// ["[03:10]"]
		// ["[03:10]", "lyrics"]
		// ["lyrics"]
		// ["[03:10]", "[03:10]", "lyrics"]
		// ["[1235,300]", "lyrics"]
		const matchResult = line.match(/(\[.*?\])|([^\[\]]+)/g);
		if (!matchResult?.length || matchResult.length === 1) {
			return { text: line };
		}

		const textIndex = matchResult.findIndex((slice) => !slice.endsWith("]"));
		let text = "";

		if (textIndex > -1) {
			text = matchResult.splice(textIndex, 1)[0];
			text = Utils.capitalize(Utils.normalize(text, false));
		}

		const time = matchResult[0].replace("[", "").replace("]", "");

		return { time, text };
	}

	function breakdownLine(text) {
		// (0,508)Don't(0,1) (0,151)want(0,1) (0,162)to(0,1) (0,100)be(0,1) (0,157)an(0,1)
		const components = text.split(/\(\d+,(\d+)\)/g);
		// ["", "508", "Don't", "1", " ", "151", "want" , "1" ...]
		const result = [];
		for (let i = 1; i < components.length; i += 2) {
			if (components[i + 1] === " ") continue;
			result.push({
				word: `${components[i + 1]} `,
				time: Number.parseInt(components[i]),
			});
		}
		return result;
	}

	function getKaraoke(list) {
		const lyricStr = list?.klyric?.lyric;

		if (!lyricStr) {
			return null;
		}

		const lines = lyricStr.split(/\r?\n/).map((line) => line.trim());
		const karaoke = lines
			.map((line) => {
				const { time, text } = parseTimestamp(line);
				if (!time || !text) return null;

				const [key, value] = time.split(",") || [];
				const [start, durr] = [Number.parseFloat(key), Number.parseFloat(value)];

				if (!Number.isNaN(start) && !Number.isNaN(durr) && !containCredits(text)) {
					return {
						startTime: start,
						// endTime: start + durr,
						text: breakdownLine(text),
					};
				}
				return null;
			})
			.filter(Boolean);

		if (!karaoke.length) {
			return null;
		}

		return karaoke;
	}

	function getSynced(list) {
		const lyricStr = list?.lrc?.lyric;
		let noLyrics = false;

		if (!lyricStr) {
			return null;
		}

		const lines = lyricStr.split(/\r?\n/).map((line) => line.trim());
		const lyrics = lines
			.map((line) => {
				const { time, text } = parseTimestamp(line);
				if (text === "纯音乐, 请欣赏") noLyrics = true;
				if (!time || !text) return null;

				const [key, value] = time.split(":") || [];
				const [min, sec] = [Number.parseFloat(key), Number.parseFloat(value)];
				if (!Number.isNaN(min) && !Number.isNaN(sec) && !containCredits(text)) {
					return {
						startTime: (min * 60 + sec) * 1000,
						text: text || "",
					};
				}
				return null;
			})
			.filter(Boolean);

		if (!lyrics.length || noLyrics) {
			return null;
		}
		return lyrics;
	}

	function getTranslation(list) {
		const lyricStr = list?.tlyric?.lyric;

		if (!lyricStr) {
			return null;
		}

		const lines = lyricStr.split(/\r?\n/).map((line) => line.trim());
		const translation = lines
			.map((line) => {
				const { time, text } = parseTimestamp(line);
				if (!time || !text) return null;

				const [key, value] = time.split(":") || [];
				const [min, sec] = [Number.parseFloat(key), Number.parseFloat(value)];
				if (!Number.isNaN(min) && !Number.isNaN(sec) && !containCredits(text)) {
					return {
						startTime: (min * 60 + sec) * 1000,
						text: text || "",
					};
				}
				return null;
			})
			.filter(Boolean);

		if (!translation.length) {
			return null;
		}
		return translation;
	}

	function getUnsynced(list) {
		const lyricStr = list?.lrc?.lyric;
		let noLyrics = false;

		if (!lyricStr) {
			return null;
		}

		const lines = lyricStr.split(/\r?\n/).map((line) => line.trim());
		const lyrics = lines
			.map((line) => {
				const parsed = parseTimestamp(line);
				if (parsed.text === "纯音乐, 请欣赏") noLyrics = true;
				if (!parsed.text || containCredits(parsed.text)) return null;
				return parsed;
			})
			.filter(Boolean);

		if (!lyrics.length || noLyrics) {
			return null;
		}
		return lyrics;
	}

	return { findLyrics, getKaraoke, getSynced, getUnsynced, getTranslation };
})();

const ProviderMusixmatch = (() => {
	const headers = {
		authority: "apic-desktop.musixmatch.com",
		cookie: "x-mxm-token-guid=",
	};

	async function findLyrics(info) {
		const baseURL =
			"https://apic-desktop.musixmatch.com/ws/1.1/macro.subtitles.get?format=json&namespace=lyrics_richsynched&subtitle_format=mxm&app_id=web-desktop-app-v1.0&";

		const durr = info.duration / 1000;

		const params = {
			q_album: info.album,
			q_artist: info.artist,
			q_artists: info.artist,
			q_track: info.title,
			track_spotify_id: info.uri,
			q_duration: durr,
			f_subtitle_length: Math.floor(durr),
			usertoken: CONFIG.providers.musixmatch.token,
		};

		const finalURL =
			baseURL +
			Object.keys(params)
				.map((key) => `${key}=${encodeURIComponent(params[key])}`)
				.join("&");

		let body = await Spicetify.CosmosAsync.get(finalURL, null, headers);

		body = body.message.body.macro_calls;

		if (body["matcher.track.get"].message.header.status_code !== 200) {
			return {
				error: `Requested error: ${body["matcher.track.get"].message.header.mode}`,
				uri: info.uri,
			};
		}
		if (body["track.lyrics.get"]?.message?.body?.lyrics?.restricted) {
			return {
				error: "Unfortunately we're not authorized to show these lyrics.",
				uri: info.uri,
			};
		}

		return body;
	}

	async function getKaraoke(body) {
		const meta = body?.["matcher.track.get"]?.message?.body;
		if (!meta) {
			return null;
		}

		if (!meta.track.has_richsync || meta.track.instrumental) {
			return null;
		}

		const baseURL = "https://apic-desktop.musixmatch.com/ws/1.1/track.richsync.get?format=json&subtitle_format=mxm&app_id=web-desktop-app-v1.0&";

		const params = {
			f_subtitle_length: meta.track.track_length,
			q_duration: meta.track.track_length,
			commontrack_id: meta.track.commontrack_id,
			usertoken: CONFIG.providers.musixmatch.token,
		};

		const finalURL =
			baseURL +
			Object.keys(params)
				.map((key) => `${key}=${encodeURIComponent(params[key])}`)
				.join("&");

		let result = await Spicetify.CosmosAsync.get(finalURL, null, headers);

		if (result.message.header.status_code !== 200) {
			return null;
		}

		result = result.message.body;

		const parsedKaraoke = JSON.parse(result.richsync.richsync_body).map((line) => {
			const startTime = line.ts * 1000;
			const endTime = line.te * 1000;
			const words = line.l;

			const text = words.map((word, index, words) => {
				const wordText = word.c;
				const wordStartTime = word.o * 1000;
				const nextWordStartTime = words[index + 1]?.o * 1000;

				const time = !Number.isNaN(nextWordStartTime) ? nextWordStartTime - wordStartTime : endTime - (wordStartTime + startTime);

				return {
					word: wordText,
					time,
				};
			});
			return {
				startTime,
				text,
			};
		});

		return parsedKaraoke;
	}

	function getSynced(body) {
		const meta = body?.["matcher.track.get"]?.message?.body;
		if (!meta) {
			return null;
		}

		const hasSynced = meta?.track?.has_subtitles;

		const isInstrumental = meta?.track?.instrumental;

		if (isInstrumental) {
			return [{ text: "♪ Instrumental ♪", startTime: "0000" }];
		}
		if (hasSynced) {
			const subtitle = body["track.subtitles.get"]?.message?.body?.subtitle_list?.[0]?.subtitle;
			if (!subtitle) {
				return null;
			}

			return JSON.parse(subtitle.subtitle_body).map((line) => ({
				text: line.text || "♪",
				startTime: line.time.total * 1000,
			}));
		}

		return null;
	}

	function getUnsynced(body) {
		const meta = body?.["matcher.track.get"]?.message?.body;
		if (!meta) {
			return null;
		}

		const hasUnSynced = meta.track.has_lyrics || meta.track.has_lyrics_crowd;

		const isInstrumental = meta?.track?.instrumental;

		if (isInstrumental) {
			return [{ text: "♪ Instrumental ♪" }];
		}
		if (hasUnSynced) {
			const lyrics = body["track.lyrics.get"]?.message?.body?.lyrics?.lyrics_body;
			if (!lyrics) {
				return null;
			}
			return lyrics.split("\n").map((text) => ({ text }));
		}

		return null;
	}

	async function getTranslation(body) {
		const track_id = body?.["matcher.track.get"]?.message?.body?.track?.track_id;
		if (!track_id) return null;

		const baseURL =
			"https://apic-desktop.musixmatch.com/ws/1.1/crowd.track.translations.get?translation_fields_set=minimal&selected_language=en&comment_format=text&format=json&app_id=web-desktop-app-v1.0&";

		const params = {
			track_id,
			usertoken: CONFIG.providers.musixmatch.token,
		};

		const finalURL =
			baseURL +
			Object.keys(params)
				.map((key) => `${key}=${encodeURIComponent(params[key])}`)
				.join("&");

		let result = await Spicetify.CosmosAsync.get(finalURL, null, headers);

		if (result.message.header.status_code !== 200) return null;

		result = result.message.body;

		if (!result.translations_list?.length) return null;

		return result.translations_list.map(({ translation }) => ({ translation: translation.description, matchedLine: translation.matched_line }));
	}

	return { findLyrics, getKaraoke, getSynced, getUnsynced, getTranslation };
})();

const ProviderGenius = (() => {
	function getChildDeep(parent, isDeep = false) {
		let acc = "";

		if (!parent.children) {
			return acc;
		}

		for (const child of parent.children) {
			if (typeof child === "string") {
				acc += child;
			} else if (child.children) {
				acc += getChildDeep(child, true);
			}
			if (!isDeep) {
				acc += "\n";
			}
		}
		return acc.trim();
	}

	async function getNote(id) {
		const body = await Spicetify.CosmosAsync.get(`https://genius.com/api/annotations/${id}`);
		const response = body.response;
		let note = "";

		// Authors annotations
		if (response.referent && response.referent.classification === "verified") {
			const referentsBody = await Spicetify.CosmosAsync.get(`https://genius.com/api/referents/${id}`);
			const referents = referentsBody.response;
			for (const ref of referents.referent.annotations) {
				note += getChildDeep(ref.body.dom);
			}
		}

		// Users annotations
		if (!note && response.annotation) {
			note = getChildDeep(response.annotation.body.dom);
		}

		// Users comments
		if (!note && response.annotation && response.annotation.top_comment) {
			note += getChildDeep(response.annotation.top_comment.body.dom);
		}
		note = note.replace(/\n\n\n?/, "\n");

		return note;
	}

	function fetchHTML(url) {
		return new Promise((resolve, reject) => {
			const request = JSON.stringify({
				method: "GET",
				uri: url,
			});

			window.sendCosmosRequest({
				request,
				persistent: false,
				onSuccess: resolve,
				onFailure: reject,
			});
		});
	}

	async function fetchLyricsVersion(results, index) {
		const result = results[index];
		if (!result) {
			console.warn(result);
			return;
		}

		const site = await fetchHTML(result.url);
		const body = JSON.parse(site)?.body;
		if (!body) {
			return null;
		}

		let lyrics = "";
		const parser = new DOMParser();
		const htmlDoc = parser.parseFromString(body, "text/html");
		const lyricsDiv = htmlDoc.querySelectorAll('div[data-lyrics-container="true"]');

		for (const i of lyricsDiv) {
			lyrics += `${i.innerHTML}<br>`;
		}

		if (!lyrics?.length) {
			console.warn("forceError");
			return null;
		}

		return lyrics;
	}

	async function fetchLyrics(info) {
		const titles = new Set([info.title]);

		const titleNoExtra = Utils.removeExtraInfo(info.title);
		titles.add(titleNoExtra);
		titles.add(Utils.removeSongFeat(info.title));
		titles.add(Utils.removeSongFeat(titleNoExtra));

		let lyrics;
		let hits;
		for (const title of titles) {
			const query = new URLSearchParams({ per_page: 20, q: `${info.artist} ${title}` });
			const url = `https://genius.com/api/search/song?${query.toString()}`;

			const geniusSearch = await Spicetify.CosmosAsync.get(url);

			hits = geniusSearch.response.sections[0].hits.map((item) => ({
				title: item.result.full_title,
				url: item.result.url,
			}));

			if (!hits.length) {
				continue;
			}

			lyrics = await fetchLyricsVersion(hits, 0);
			break;
		}

		if (!lyrics) {
			return { lyrics: null, versions: [] };
		}

		return { lyrics, versions: hits };
	}

	return { fetchLyrics, getNote, fetchLyricsVersion };
})();

const ProviderLRCLIB = (() => {
	async function findLyrics(info) {
		const baseURL = "https://lrclib.net/api/get";
		const durr = info.duration / 1000;
		const params = {
			track_name: info.title,
			artist_name: info.artist,
			album_name: info.album,
			duration: durr,
		};

		const finalURL = `${baseURL}?${Object.keys(params)
			.map((key) => `${key}=${encodeURIComponent(params[key])}`)
			.join("&")}`;

		const body = await fetch(finalURL, {
			headers: {
				"x-user-agent": `spicetify v${Spicetify.Config.version} (https://github.com/spicetify/cli)`,
			},
		});

		if (body.status !== 200) {
			return {
				error: "Request error: Track wasn't found",
				uri: info.uri,
			};
		}

		return await body.json();
	}

	function getUnsynced(body) {
		const unsyncedLyrics = body?.plainLyrics;
		const isInstrumental = body.instrumental;
		if (isInstrumental) return [{ text: "♪ Instrumental ♪" }];

		if (!unsyncedLyrics) return null;

		return Utils.parseLocalLyrics(unsyncedLyrics).unsynced;
	}

	function getSynced(body) {
		const syncedLyrics = body?.syncedLyrics;
		const isInstrumental = body.instrumental;
		if (isInstrumental) return [{ text: "♪ Instrumental ♪" }];

		if (!syncedLyrics) return null;

		return Utils.parseLocalLyrics(syncedLyrics).synced;
	}

	return { findLyrics, getSynced, getUnsynced };
})();

const Providers = {
	spotify: async (info) => {
		const result = {
			uri: info.uri,
			karaoke: null,
			synced: null,
			unsynced: null,
			provider: "Spotify",
			copyright: null,
		};

		const baseURL = "https://spclient.wg.spotify.com/color-lyrics/v2/track/";
		const id = info.uri.split(":")[2];
		let body;
		try {
			body = await Spicetify.CosmosAsync.get(`${baseURL + id}?format=json&vocalRemoval=false&market=from_token`);
		} catch {
			return { error: "Request error", uri: info.uri };
		}

		const lyrics = body.lyrics;
		if (!lyrics) {
			return { error: "No lyrics", uri: info.uri };
		}

		const lines = lyrics.lines;
		if (lyrics.syncType === "LINE_SYNCED") {
			result.synced = lines.map((line) => ({
				startTime: line.startTimeMs,
				text: line.words,
			}));
			result.unsynced = result.synced;
		} else {
			result.unsynced = lines.map((line) => ({
				text: line.words,
			}));
		}

		result.provider = lyrics.provider;

		return result;
	},
	musixmatch: async (info) => {
		const result = {
			error: null,
			uri: info.uri,
			karaoke: null,
			synced: null,
			unsynced: null,
			musixmatchTranslation: null,
			provider: "Musixmatch",
			copyright: null,
		};

		let list;
		try {
			list = await ProviderMusixmatch.findLyrics(info);
			if (list.error) {
				throw "";
			}
		} catch {
			result.error = "No lyrics";
			return result;
		}

		const karaoke = await ProviderMusixmatch.getKaraoke(list);
		if (karaoke) {
			result.karaoke = karaoke;
			result.copyright = list["track.lyrics.get"].message?.body?.lyrics?.lyrics_copyright?.trim();
		}
		const synced = ProviderMusixmatch.getSynced(list);
		if (synced) {
			result.synced = synced;
			result.copyright = list["track.subtitles.get"].message?.body?.subtitle_list?.[0]?.subtitle.lyrics_copyright.trim();
		}
		const unsynced = synced || ProviderMusixmatch.getUnsynced(list);
		if (unsynced) {
			result.unsynced = unsynced;
			result.copyright = list["track.lyrics.get"].message?.body?.lyrics?.lyrics_copyright?.trim();
		}
		const translation = await ProviderMusixmatch.getTranslation(list);
		if ((synced || unsynced) && translation) {
			const baseLyrics = synced ?? unsynced;
			result.musixmatchTranslation = baseLyrics.map((line) => ({
				...line,
				text: translation.find((t) => t.matchedLine === line.text)?.translation ?? line.text,
				originalText: line.text,
			}));
		}

		return result;
	},
	netease: async (info) => {
		const result = {
			uri: info.uri,
			karaoke: null,
			synced: null,
			unsynced: null,
			neteaseTranslation: null,
			provider: "Netease",
			copyright: null,
		};

		let list;
		try {
			list = await ProviderNetease.findLyrics(info);
		} catch {
			result.error = "No lyrics";
			return result;
		}

		const karaoke = ProviderNetease.getKaraoke(list);
		if (karaoke) {
			result.karaoke = karaoke;
		}
		const synced = ProviderNetease.getSynced(list);
		if (synced) {
			result.synced = synced;
		}
		const unsynced = synced || ProviderNetease.getUnsynced(list);
		if (unsynced) {
			result.unsynced = unsynced;
		}
		const translation = ProviderNetease.getTranslation(list);
		if (translation) {
			result.neteaseTranslation = translation;
		}

		return result;
	},
	lrclib: async (info) => {
		const result = {
			uri: info.uri,
			karaoke: null,
			synced: null,
			unsynced: null,
			provider: "lrclib",
			copyright: null,
		};

		let list;
		try {
			list = await ProviderLRCLIB.findLyrics(info);
		} catch {
			result.error = "No lyrics";
			return result;
		}

		const synced = ProviderLRCLIB.getSynced(list);
		if (synced) {
			result.synced = synced;
		}

		const unsynced = synced || ProviderLRCLIB.getUnsynced(list);

		if (unsynced) {
			result.unsynced = unsynced;
		}

		return result;
	},
	genius: async (info) => {
		const { lyrics, versions } = await ProviderGenius.fetchLyrics(info);

		let versionIndex2 = 0;
		let genius2 = lyrics;
		if (CONFIG.visual["dual-genius"] && versions.length > 1) {
			genius2 = await ProviderGenius.fetchLyricsVersion(versions, 1);
			versionIndex2 = 1;
		}

		return {
			uri: info.uri,
			genius: lyrics,
			provider: "Genius",
			karaoke: null,
			synced: null,
			unsynced: null,
			copyright: null,
			error: null,
			versions,
			versionIndex: 0,
			genius2,
			versionIndex2,
		};
	},
	local: (info) => {
		let result = {
			uri: info.uri,
			karaoke: null,
			synced: null,
			unsynced: null,
			provider: "local",
		};

		try {
			const savedLyrics = JSON.parse(localStorage.getItem("lyrics-plus:local-lyrics"));
			const lyrics = savedLyrics[info.uri];
			if (!lyrics) {
				throw "";
			}

			result = {
				...result,
				...lyrics,
			};
		} catch {
			result.error = "No lyrics";
		}

		return result;
	},
};

const CreditFooter = react.memo(({ provider, copyright }) => {
	if (provider === "local") return null;
	const credit = [Spicetify.Locale.get("web-player.lyrics.providedBy", provider)];
	if (copyright) {
		credit.push(...copyright.split("\n"));
	}

	return (
		provider &&
		react.createElement(
			"p",
			{
				className: "lyrics-lyricsContainer-Provider main-type-mesto",
				dir: "auto",
			},
			credit.join(" • ")
		)
	);
});

const IdlingIndicator = ({ isActive, progress, delay }) => {
	return react.createElement(
		"div",
		{
			className: `lyrics-idling-indicator ${
				!isActive ? "lyrics-idling-indicator-hidden" : ""
			} lyrics-lyricsContainer-LyricsLine lyrics-lyricsContainer-LyricsLine-active`,
			style: {
				"--position-index": 0,
				"--animation-index": 1,
				"--indicator-delay": `${delay}ms`,
			},
		},
		react.createElement("div", { className: `lyrics-idling-indicator__circle ${progress >= 0.05 ? "active" : ""}` }),
		react.createElement("div", { className: `lyrics-idling-indicator__circle ${progress >= 0.33 ? "active" : ""}` }),
		react.createElement("div", { className: `lyrics-idling-indicator__circle ${progress >= 0.66 ? "active" : ""}` })
	);
};

const emptyLine = {
	startTime: 0,
	endTime: 0,
	text: [],
};

const useTrackPosition = (callback) => {
	const callbackRef = useRef();
	callbackRef.current = callback;

	useEffect(() => {
		const interval = setInterval(callbackRef.current, 50);

		return () => {
			clearInterval(interval);
		};
	}, [callbackRef]);
};

const KaraokeLine = ({ text, isActive, position, startTime }) => {
	if (!isActive) {
		return text.map(({ word }) => word).join("");
	}

	return text.map(({ word, time }) => {
		const isWordActive = position >= startTime;
		startTime += time;
		return react.createElement(
			"span",
			{
				className: `lyrics-lyricsContainer-Karaoke-Word${isWordActive ? " lyrics-lyricsContainer-Karaoke-WordActive" : ""}`,
				style: {
					"--word-duration": `${time}ms`,
					// don't animate unless we have to
					transition: !isWordActive ? "all 0s linear" : "",
				},
			},
			word
		);
	});
};

const SyncedLyricsPage = react.memo(({ lyrics = [], provider, copyright, isKara }) => {
	const [position, setPosition] = useState(0);
	const activeLineEle = useRef();
	const lyricContainerEle = useRef();

	useTrackPosition(() => {
		const newPos = Spicetify.Player.getProgress();
		const delay = CONFIG.visual["global-delay"] + CONFIG.visual.delay;
		if (newPos !== position) {
			setPosition(newPos + delay);
		}
	});

	const lyricWithEmptyLines = useMemo(
		() =>
			[emptyLine, emptyLine, ...lyrics].map((line, i) => ({
				...line,
				lineNumber: i,
			})),
		[lyrics]
	);

	const lyricsId = lyrics[0].text;

	let activeLineIndex = 0;
	for (let i = lyricWithEmptyLines.length - 1; i > 0; i--) {
		if (position >= lyricWithEmptyLines[i].startTime) {
			activeLineIndex = i;
			break;
		}
	}

	const activeLines = useMemo(() => {
		const startIndex = Math.max(activeLineIndex - 1 - CONFIG.visual["lines-before"], 0);
		// 3 lines = 1 padding top + 1 padding bottom + 1 active
		const linesCount = CONFIG.visual["lines-before"] + CONFIG.visual["lines-after"] + 3;
		return lyricWithEmptyLines.slice(startIndex, startIndex + linesCount);
	}, [activeLineIndex, lyricWithEmptyLines]);

	let offset = lyricContainerEle.current ? lyricContainerEle.current.clientHeight / 2 : 0;
	if (activeLineEle.current) {
		offset += -(activeLineEle.current.offsetTop + activeLineEle.current.clientHeight / 2);
	}

	const rawLyrics = Utils.convertParsedToLRC(lyrics);

	return react.createElement(
		"div",
		{
			className: "lyrics-lyricsContainer-SyncedLyricsPage",
			ref: lyricContainerEle,
		},
		react.createElement(
			"div",
			{
				className: "lyrics-lyricsContainer-SyncedLyrics",
				style: {
					"--offset": `${offset}px`,
				},
				key: lyricsId,
			},
			activeLines.map(({ text, lineNumber, startTime }, i) => {
				if (i === 1 && activeLineIndex === 1) {
					return react.createElement(IdlingIndicator, {
						progress: position / activeLines[2].startTime,
						delay: activeLines[2].startTime / 3,
					});
				}

				let className = "lyrics-lyricsContainer-LyricsLine";
				const activeElementIndex = Math.min(activeLineIndex, CONFIG.visual["lines-before"] + 1);
				let ref;

				const isActive = activeElementIndex === i;
				if (isActive) {
					className += " lyrics-lyricsContainer-LyricsLine-active";
					ref = activeLineEle;
				}

				let animationIndex;
				if (activeLineIndex <= CONFIG.visual["lines-before"]) {
					animationIndex = i - activeLineIndex;
				} else {
					animationIndex = i - CONFIG.visual["lines-before"] - 1;
				}

				const paddingLine = (animationIndex < 0 && -animationIndex > CONFIG.visual["lines-before"]) || animationIndex > CONFIG.visual["lines-after"];
				if (paddingLine) {
					className += " lyrics-lyricsContainer-LyricsLine-paddingLine";
				}

				return react.createElement(
					"p",
					{
						className,
						style: {
							cursor: "pointer",
							"--position-index": animationIndex,
							"--animation-index": (animationIndex < 0 ? 0 : animationIndex) + 1,
							"--blur-index": Math.abs(animationIndex),
						},
						key: lineNumber,
						dir: "auto",
						ref,
						onClick: (event) => {
							if (startTime) {
								Spicetify.Player.seek(startTime);
							}
						},
						onContextMenu: (event) => {
							event.preventDefault();
							Spicetify.Platform.ClipboardAPI.copy(rawLyrics)
								.then(() => Spicetify.showNotification("Lyrics copied to clipboard"))
								.catch(() => Spicetify.showNotification("Failed to copy lyrics to clipboard"));
						},
					},
					!isKara ? text : react.createElement(KaraokeLine, { text, startTime, position, isActive })
				);
			})
		),
		react.createElement(CreditFooter, {
			provider,
			copyright,
		})
	);
});

class SearchBar extends react.Component {
	constructor() {
		super();
		this.state = {
			hidden: true,
			atNode: 0,
			foundNodes: [],
		};
		this.container = null;
	}

	componentDidMount() {
		this.viewPort = document.querySelector(".main-view-container .os-viewport");
		this.mainViewOffsetTop = document.querySelector(".Root__main-view").offsetTop;
		this.toggleCallback = () => {
			if (!(Spicetify.Platform.History.location.pathname === "/lyrics-plus" && this.container)) return;

			if (this.state.hidden) {
				this.setState({ hidden: false });
				this.container.focus();
			} else {
				this.setState({ hidden: true });
				this.container.blur();
			}
		};
		this.unFocusCallback = () => {
			this.container.blur();
			this.setState({ hidden: true });
		};
		this.loopThroughCallback = (event) => {
			if (!this.state.foundNodes.length) {
				return;
			}

			if (event.key === "Enter") {
				const dir = event.shiftKey ? -1 : 1;
				let atNode = this.state.atNode + dir;
				if (atNode < 0) {
					atNode = this.state.foundNodes.length - 1;
				}
				atNode %= this.state.foundNodes.length;
				const rects = this.state.foundNodes[atNode].getBoundingClientRect();
				this.viewPort.scrollBy(0, rects.y - 100);
				this.setState({ atNode });
			}
		};

		Spicetify.Mousetrap().bind("mod+shift+f", this.toggleCallback);
		Spicetify.Mousetrap(this.container).bind("mod+shift+f", this.toggleCallback);
		Spicetify.Mousetrap(this.container).bind("enter", this.loopThroughCallback);
		Spicetify.Mousetrap(this.container).bind("shift+enter", this.loopThroughCallback);
		Spicetify.Mousetrap(this.container).bind("esc", this.unFocusCallback);
	}

	componentWillUnmount() {
		Spicetify.Mousetrap().unbind("mod+shift+f", this.toggleCallback);
		Spicetify.Mousetrap(this.container).unbind("mod+shift+f", this.toggleCallback);
		Spicetify.Mousetrap(this.container).unbind("enter", this.loopThroughCallback);
		Spicetify.Mousetrap(this.container).unbind("shift+enter", this.loopThroughCallback);
		Spicetify.Mousetrap(this.container).unbind("esc", this.unFocusCallback);
	}

	getNodeFromInput(event) {
		const value = event.target.value.toLowerCase();
		if (!value) {
			this.setState({ foundNodes: [] });
			this.viewPort.scrollTo(0, 0);
			return;
		}

		const lyricsPage = document.querySelector(".lyrics-lyricsContainer-UnsyncedLyricsPage");
		const walker = document.createTreeWalker(
			lyricsPage,
			NodeFilter.SHOW_TEXT,
			(node) => {
				if (node.textContent.toLowerCase().includes(value)) {
					return NodeFilter.FILTER_ACCEPT;
				}
				return NodeFilter.FILTER_REJECT;
			},
			false
		);

		const foundNodes = [];
		while (walker.nextNode()) {
			const range = document.createRange();
			range.selectNodeContents(walker.currentNode);
			foundNodes.push(range);
		}

		if (!foundNodes.length) {
			this.viewPort.scrollBy(0, 0);
		} else {
			const rects = foundNodes[0].getBoundingClientRect();
			this.viewPort.scrollBy(0, rects.y - 100);
		}

		this.setState({ foundNodes, atNode: 0 });
	}

	render() {
		let y = 0;
		let height = 0;
		if (this.state.foundNodes.length) {
			const node = this.state.foundNodes[this.state.atNode];
			const rects = node.getBoundingClientRect();
			y = rects.y + this.viewPort.scrollTop - this.mainViewOffsetTop;
			height = rects.height;
		}
		return react.createElement(
			"div",
			{
				className: `lyrics-Searchbar${this.state.hidden ? " hidden" : ""}`,
			},
			react.createElement("input", {
				ref: (c) => {
					this.container = c;
				},
				onChange: this.getNodeFromInput.bind(this),
			}),
			react.createElement("svg", {
				width: 16,
				height: 16,
				viewBox: "0 0 16 16",
				fill: "currentColor",
				dangerouslySetInnerHTML: {
					__html: Spicetify.SVGIcons.search,
				},
			}),
			react.createElement(
				"span",
				{
					hidden: this.state.foundNodes.length === 0,
				},
				`${this.state.atNode + 1}/${this.state.foundNodes.length}`
			),
			react.createElement("div", {
				className: "lyrics-Searchbar-highlight",
				style: {
					"--search-highlight-top": `${y}px`,
					"--search-highlight-height": `${height}px`,
				},
			})
		);
	}
}

function isInViewport(element) {
	const rect = element.getBoundingClientRect();
	return (
		rect.top >= 0 &&
		rect.left >= 0 &&
		rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
		rect.right <= (window.innerWidth || document.documentElement.clientWidth)
	);
}

const SyncedExpandedLyricsPage = react.memo(({ lyrics, provider, copyright, isKara }) => {
	const [position, setPosition] = useState(0);
	const activeLineRef = useRef(null);
	const pageRef = useRef(null);

	useTrackPosition(() => {
		if (!Spicetify.Player.data.is_paused) {
			setPosition(Spicetify.Player.getProgress() + CONFIG.visual["global-delay"] + CONFIG.visual.delay);
		}
	});

	const padded = useMemo(() => [emptyLine, ...lyrics], [lyrics]);

	const intialScroll = useMemo(() => [false], [lyrics]);

	const lyricsId = lyrics[0].text;

	let activeLineIndex = 0;
	for (let i = padded.length - 1; i >= 0; i--) {
		const line = padded[i];
		if (position >= line.startTime) {
			activeLineIndex = i;
			break;
		}
	}

	const rawLyrics = Utils.convertParsedToLRC(lyrics);

	useEffect(() => {
		if (activeLineRef.current && (!intialScroll[0] || isInViewport(activeLineRef.current))) {
			activeLineRef.current.scrollIntoView({
				behavior: "smooth",
				block: "center",
				inline: "nearest",
			});
			intialScroll[0] = true;
		}
	}, [activeLineRef.current]);

	return react.createElement(
		"div",
		{
			className: "lyrics-lyricsContainer-UnsyncedLyricsPage",
			key: lyricsId,
			ref: pageRef,
		},
		react.createElement("p", {
			className: "lyrics-lyricsContainer-LyricsUnsyncedPadding",
		}),
		padded.map(({ text, startTime }, i) => {
			if (i === 0) {
				return react.createElement(IdlingIndicator, {
					isActive: activeLineIndex === 0,
					progress: position / padded[1].startTime,
					delay: padded[1].startTime / 3,
				});
			}

			const isActive = i === activeLineIndex;
			return react.createElement(
				"p",
				{
					className: `lyrics-lyricsContainer-LyricsLine${i <= activeLineIndex ? " lyrics-lyricsContainer-LyricsLine-active" : ""}`,
					style: {
						cursor: "pointer",
					},
					dir: "auto",
					ref: isActive ? activeLineRef : null,
					onClick: (event) => {
						if (startTime) {
							Spicetify.Player.seek(startTime);
						}
					},
					onContextMenu: (event) => {
						event.preventDefault();
						Spicetify.Platform.ClipboardAPI.copy(rawLyrics)
							.then(() => Spicetify.showNotification("Lyrics copied to clipboard"))
							.catch(() => Spicetify.showNotification("Failed to copy lyrics to clipboard"));
					},
				},
				!isKara ? text : react.createElement(KaraokeLine, { text, startTime, position, isActive })
			);
		}),
		react.createElement("p", {
			className: "lyrics-lyricsContainer-LyricsUnsyncedPadding",
		}),
		react.createElement(CreditFooter, {
			provider,
			copyright,
		}),
		react.createElement(SearchBar, null)
	);
});

const UnsyncedLyricsPage = react.memo(({ lyrics, provider, copyright }) => {
	const rawLyrics = lyrics.map((lyrics) => (typeof lyrics.text !== "object" ? lyrics.text : lyrics.text?.props?.children?.[0])).join("\n");

	return react.createElement(
		"div",
		{
			className: "lyrics-lyricsContainer-UnsyncedLyricsPage",
		},
		react.createElement("p", {
			className: "lyrics-lyricsContainer-LyricsUnsyncedPadding",
		}),
		lyrics.map(({ text }) => {
			return react.createElement(
				"p",
				{
					className: "lyrics-lyricsContainer-LyricsLine lyrics-lyricsContainer-LyricsLine-active",
					dir: "auto",
					onContextMenu: (event) => {
						event.preventDefault();
						Spicetify.Platform.ClipboardAPI.copy(rawLyrics)
							.then(() => Spicetify.showNotification("Lyrics copied to clipboard"))
							.catch(() => Spicetify.showNotification("Failed to copy lyrics to clipboard"));
					},
				},
				text
			);
		}),
		react.createElement("p", {
			className: "lyrics-lyricsContainer-LyricsUnsyncedPadding",
		}),
		react.createElement(CreditFooter, {
			provider,
			copyright,
		}),
		react.createElement(SearchBar, null)
	);
});

const noteContainer = document.createElement("div");
noteContainer.classList.add("lyrics-Genius-noteContainer");
const noteDivider = document.createElement("div");
noteDivider.classList.add("lyrics-Genius-divider");
noteDivider.innerHTML = `<svg width="32" height="32" viewBox="0 0 13 4" fill="currentColor"><path d=\"M13 10L8 4.206 3 10z\"/></svg>`;
noteDivider.style.setProperty("--link-left", 0);
const noteTextContainer = document.createElement("div");
noteTextContainer.classList.add("lyrics-Genius-noteTextContainer");
noteTextContainer.onclick = (event) => {
	event.preventDefault();
	event.stopPropagation();
};
noteContainer.append(noteDivider, noteTextContainer);

function showNote(parent, note) {
	if (noteContainer.parentElement === parent) {
		noteContainer.remove();
		return;
	}
	noteTextContainer.innerText = note;
	parent.append(noteContainer);
	const arrowPos = parent.offsetLeft - noteContainer.offsetLeft;
	noteDivider.style.setProperty("--link-left", `${arrowPos}px`);
	const box = noteTextContainer.getBoundingClientRect();
	if (box.y + box.height > window.innerHeight) {
		// Wait for noteContainer is mounted
		setTimeout(() => {
			noteContainer.scrollIntoView({
				behavior: "smooth",
				block: "center",
				inline: "nearest",
			});
		}, 50);
	}
}

const GeniusPage = react.memo(
	({ lyrics, provider, copyright, versions, versionIndex, onVersionChange, isSplitted, lyrics2, versionIndex2, onVersionChange2 }) => {
		let notes = {};
		let container = null;
		let container2 = null;

		// Fetch notes
		useEffect(() => {
			if (!container) return;
			notes = {};
			let links = container.querySelectorAll("a");
			if (isSplitted && container2) {
				links = [...links, ...container2.querySelectorAll("a")];
			}
			for (const link of links) {
				let id = link.pathname.match(/\/(\d+)\//);
				if (!id) {
					id = link.dataset.id;
				} else {
					id = id[1];
				}
				ProviderGenius.getNote(id).then((note) => {
					notes[id] = note;
					link.classList.add("fetched");
				});
				link.onclick = (event) => {
					event.preventDefault();
					if (!notes[id]) return;
					showNote(link, notes[id]);
				};
			}
		}, [lyrics, lyrics2]);

		const lyricsEl1 = react.createElement(
			"div",
			null,
			react.createElement(VersionSelector, { items: versions, index: versionIndex, callback: onVersionChange }),
			react.createElement("div", {
				className: "lyrics-lyricsContainer-LyricsLine lyrics-lyricsContainer-LyricsLine-active",
				ref: (c) => {
					container = c;
				},
				dangerouslySetInnerHTML: {
					__html: lyrics,
				},
				onContextMenu: (event) => {
					event.preventDefault();
					const copylyrics = lyrics.replace(/<br>/g, "\n").replace(/<[^>]*>/g, "");
					Spicetify.Platform.ClipboardAPI.copy(copylyrics)
						.then(() => Spicetify.showNotification("Lyrics copied to clipboard"))
						.catch(() => Spicetify.showNotification("Failed to copy lyrics to clipboard"));
				},
			})
		);

		const mainContainer = [lyricsEl1];
		const shouldSplit = versions.length > 1 && isSplitted;

		if (shouldSplit) {
			const lyricsEl2 = react.createElement(
				"div",
				null,
				react.createElement(VersionSelector, { items: versions, index: versionIndex2, callback: onVersionChange2 }),
				react.createElement("div", {
					className: "lyrics-lyricsContainer-LyricsLine lyrics-lyricsContainer-LyricsLine-active",
					ref: (c) => {
						container2 = c;
					},
					dangerouslySetInnerHTML: {
						__html: lyrics2,
					},
					onContextMenu: (event) => {
						event.preventDefault();
						const copylyrics = lyrics.replace(/<br>/g, "\n").replace(/<[^>]*>/g, "");
						Spicetify.Platform.ClipboardAPI.copy(copylyrics)
							.then(() => Spicetify.showNotification("Lyrics copied to clipboard"))
							.catch(() => Spicetify.showNotification("Failed to copy lyrics to clipboard"));
					},
				})
			);
			mainContainer.push(lyricsEl2);
		}

		return react.createElement(
			"div",
			{
				className: "lyrics-lyricsContainer-UnsyncedLyricsPage",
			},
			react.createElement("p", {
				className: "lyrics-lyricsContainer-LyricsUnsyncedPadding main-type-ballad",
			}),
			react.createElement("div", { className: shouldSplit ? "split" : "" }, mainContainer),
			react.createElement(CreditFooter, {
				provider,
				copyright,
			}),
			react.createElement(SearchBar, null)
		);
	}
);

const LoadingIcon = react.createElement(
	"svg",
	{
		width: "200px",
		height: "200px",
		viewBox: "0 0 100 100",
		preserveAspectRatio: "xMidYMid",
	},
	react.createElement(
		"circle",
		{
			cx: "50",
			cy: "50",
			r: "0",
			fill: "none",
			stroke: "currentColor",
			"stroke-width": "2",
		},
		react.createElement("animate", {
			attributeName: "r",
			repeatCount: "indefinite",
			dur: "1s",
			values: "0;40",
			keyTimes: "0;1",
			keySplines: "0 0.2 0.8 1",
			calcMode: "spline",
			begin: "0s",
		}),
		react.createElement("animate", {
			attributeName: "opacity",
			repeatCount: "indefinite",
			dur: "1s",
			values: "1;0",
			keyTimes: "0;1",
			keySplines: "0.2 0 0.8 1",
			calcMode: "spline",
			begin: "0s",
		})
	),
	react.createElement(
		"circle",
		{
			cx: "50",
			cy: "50",
			r: "0",
			fill: "none",
			stroke: "currentColor",
			"stroke-width": "2",
		},
		react.createElement("animate", {
			attributeName: "r",
			repeatCount: "indefinite",
			dur: "1s",
			values: "0;40",
			keyTimes: "0;1",
			keySplines: "0 0.2 0.8 1",
			calcMode: "spline",
			begin: "-0.5s",
		}),
		react.createElement("animate", {
			attributeName: "opacity",
			repeatCount: "indefinite",
			dur: "1s",
			values: "1;0",
			keyTimes: "0;1",
			keySplines: "0.2 0 0.8 1",
			calcMode: "spline",
			begin: "-0.5s",
		})
	)
);

const VersionSelector = react.memo(({ items, index, callback }) => {
	if (items.length < 2) {
		return null;
	}
	return react.createElement(
		"div",
		{
			className: "lyrics-versionSelector",
		},
		react.createElement(
			"select",
			{
				onChange: (event) => {
					callback(items, event.target.value);
				},
				value: index,
			},
			items.map((a, i) => {
				return react.createElement("option", { value: i }, a.title);
			})
		),
		react.createElement(
			"svg",
			{
				height: "16",
				width: "16",
				fill: "currentColor",
				viewBox: "0 0 16 16",
			},
			react.createElement("path", {
				d: "M3 6l5 5.794L13 6z",
			})
		)
	);
});

const OptionsMenuItemIcon = react.createElement(
	"svg",
	{
		width: 16,
		height: 16,
		viewBox: "0 0 16 16",
		fill: "currentColor",
	},
	react.createElement("path", {
		d: "M13.985 2.383L5.127 12.754 1.388 8.375l-.658.77 4.397 5.149 9.618-11.262z",
	})
);

const OptionsMenuItem = react.memo(({ onSelect, value, isSelected }) => {
	return react.createElement(
		Spicetify.ReactComponent.MenuItem,
		{
			onClick: onSelect,
			icon: isSelected ? OptionsMenuItemIcon : null,
			trailingIcon: isSelected ? OptionsMenuItemIcon : null,
		},
		value
	);
});

const OptionsMenu = react.memo(({ options, onSelect, selected, defaultValue, bold = false }) => {
	/**
	 * <Spicetify.ReactComponent.ContextMenu
	 *      menu = { options.map(a => <OptionsMenuItem>) }
	 * >
	 *      <button>
	 *          <span> {select.value} </span>
	 *          <svg> arrow icon </svg>
	 *      </button>
	 * </Spicetify.ReactComponent.ContextMenu>
	 */
	const menuRef = react.useRef(null);
	return react.createElement(
		Spicetify.ReactComponent.ContextMenu,
		{
			menu: react.createElement(
				Spicetify.ReactComponent.Menu,
				{},
				options.map(({ key, value }) =>
					react.createElement(OptionsMenuItem, {
						value,
						onSelect: () => {
							onSelect(key);
							// Close menu on item click
							menuRef.current?.click();
						},
						isSelected: selected?.key === key,
					})
				)
			),
			trigger: "click",
			action: "toggle",
			renderInline: false,
		},
		react.createElement(
			"button",
			{
				className: "optionsMenu-dropBox",
				ref: menuRef,
			},
			react.createElement(
				"span",
				{
					className: bold ? "main-type-mestoBold" : "main-type-mesto",
				},
				selected?.value || defaultValue
			),
			react.createElement(
				"svg",
				{
					height: "16",
					width: "16",
					fill: "currentColor",
					viewBox: "0 0 16 16",
				},
				react.createElement("path", {
					d: "M3 6l5 5.794L13 6z",
				})
			)
		)
	);
});

const TranslationMenu = react.memo(({ friendlyLanguage, hasTranslation }) => {
	const items = useMemo(() => {
		let sourceOptions = {
			none: "None",
		};

		const languageOptions = {
			off: "Off",
			"zh-hans": "Chinese (Simplified)",
			"zh-hant": "Chinese (Traditional)",
			ja: "Japanese",
			ko: "Korean",
		};

		let modeOptions = {};

		if (hasTranslation.musixmatch) {
			sourceOptions = {
				...sourceOptions,
				musixmatchTranslation: "English (Musixmatch)",
			};
		}

		if (hasTranslation.netease) {
			sourceOptions = {
				...sourceOptions,
				neteaseTranslation: "Chinese (Netease)",
			};
		}

		switch (friendlyLanguage) {
			case "japanese": {
				modeOptions = {
					furigana: "Furigana",
					romaji: "Romaji",
					hiragana: "Hiragana",
					katakana: "Katakana",
				};
				break;
			}
			case "korean": {
				modeOptions = {
					hangul: "Hangul",
					romaja: "Romaja",
				};
				break;
			}
			case "chinese": {
				modeOptions = {
					cn: "Simplified Chinese",
					hk: "Traditional Chinese (Hong Kong)",
					tw: "Traditional Chinese (Taiwan)",
				};
				break;
			}
		}

		return [
			{
				desc: "Translation Provider",
				key: "translate:translated-lyrics-source",
				type: ConfigSelection,
				options: sourceOptions,
				renderInline: true,
			},
			{
				desc: "Language Override",
				key: "translate:detect-language-override",
				type: ConfigSelection,
				options: languageOptions,
				renderInline: true,
			},
			{
				desc: "Display Mode",
				key: `translation-mode:${friendlyLanguage}`,
				type: ConfigSelection,
				options: modeOptions,
				renderInline: true,
			},
			{
				desc: "Convert",
				key: "translate",
				type: ConfigSlider,
				trigger: "click",
				action: "toggle",
				renderInline: true,
			},
		];
	}, [friendlyLanguage]);

	useEffect(() => {
		// Currently opened Context Menu does not receive prop changes
		// If we were to use keys the Context Menu would close on re-render
		const event = new CustomEvent("lyrics-plus", {
			detail: {
				type: "translation-menu",
				items,
			},
		});
		document.dispatchEvent(event);
	}, [friendlyLanguage]);

	return react.createElement(
		Spicetify.ReactComponent.TooltipWrapper,
		{
			label: "Conversion",
		},
		react.createElement(
			"div",
			{
				className: "lyrics-tooltip-wrapper",
			},
			react.createElement(
				Spicetify.ReactComponent.ContextMenu,
				{
					menu: react.createElement(
						Spicetify.ReactComponent.Menu,
						{},
						react.createElement("h3", null, " Conversions"),
						react.createElement(OptionList, {
							type: "translation-menu",
							items,
							onChange: (name, value) => {
								CONFIG.visual[name] = value;
								localStorage.setItem(`${APP_NAME}:visual:${name}`, value);
								lyricContainerUpdate?.();
							},
						})
					),
					trigger: "click",
					action: "toggle",
					renderInline: true,
				},
				react.createElement(
					"button",
					{
						className: "lyrics-config-button",
					},
					react.createElement(
						"p1",
						{
							width: 16,
							height: 16,
							viewBox: "0 0 16 10.3",
							fill: "currentColor",
						},
						"⇄"
					)
				)
			)
		)
	);
});

const AdjustmentsMenu = react.memo(({ mode }) => {
	return react.createElement(
		Spicetify.ReactComponent.TooltipWrapper,
		{
			label: "Adjustments",
		},
		react.createElement(
			"div",
			{
				className: "lyrics-tooltip-wrapper",
			},
			react.createElement(
				Spicetify.ReactComponent.ContextMenu,
				{
					menu: react.createElement(
						Spicetify.ReactComponent.Menu,
						{},
						react.createElement("h3", null, " Adjustments"),
						react.createElement(OptionList, {
							items: [
								{
									desc: "Font size",
									key: "font-size",
									type: ConfigAdjust,
									min: fontSizeLimit.min,
									max: fontSizeLimit.max,
									step: fontSizeLimit.step,
								},
								{
									desc: "Track delay",
									key: "delay",
									type: ConfigAdjust,
									min: Number.NEGATIVE_INFINITY,
									max: Number.POSITIVE_INFINITY,
									step: 250,
									when: () => mode === SYNCED || mode === KARAOKE,
								},
								{
									desc: "Compact",
									key: "synced-compact",
									type: ConfigSlider,
									when: () => mode === SYNCED || mode === KARAOKE,
								},
								{
									desc: "Dual panel",
									key: "dual-genius",
									type: ConfigSlider,
									when: () => mode === GENIUS,
								},
							],
							onChange: (name, value) => {
								CONFIG.visual[name] = value;
								localStorage.setItem(`${APP_NAME}:visual:${name}`, value);
								name === "delay" && localStorage.setItem(`lyrics-delay:${Spicetify.Player.data.item.uri}`, value);
								lyricContainerUpdate?.();
							},
						})
					),
					trigger: "click",
					action: "toggle",
					renderInline: true,
				},
				react.createElement(
					"button",
					{
						className: "lyrics-config-button",
					},
					react.createElement(
						"svg",
						{
							width: 16,
							height: 16,
							viewBox: "0 0 16 10.3",
							fill: "currentColor",
						},
						react.createElement("path", {
							d: "M 10.8125,0 C 9.7756347,0 8.8094481,0.30798341 8,0.836792 7.1905519,0.30798341 6.2243653,0 5.1875,0 2.3439941,0 0,2.3081055 0,5.15625 0,8.0001222 2.3393555,10.3125 5.1875,10.3125 6.2243653,10.3125 7.1905519,10.004517 8,9.4757081 8.8094481,10.004517 9.7756347,10.3125 10.8125,10.3125 13.656006,10.3125 16,8.0043944 16,5.15625 16,2.3123779 13.660644,0 10.8125,0 Z M 8,2.0146484 C 8.2629394,2.2503662 8.4963378,2.5183106 8.6936034,2.8125 H 7.3063966 C 7.5036622,2.5183106 7.7370606,2.2503662 8,2.0146484 Z M 6.619995,4.6875 C 6.6560059,4.3625487 6.7292481,4.0485841 6.8350831,3.75 h 2.3298338 c 0.1059572,0.2985841 0.1790772,0.6125487 0.21521,0.9375 z M 9.380005,5.625 C 9.3439941,5.9499512 9.2707519,6.2639159 9.1649169,6.5625 H 6.8350831 C 6.7291259,6.2639159 6.6560059,5.9499512 6.6198731,5.625 Z M 5.1875,9.375 c -2.3435059,0 -4.25,-1.8925781 -4.25,-4.21875 0,-2.3261719 1.9064941,-4.21875 4.25,-4.21875 0.7366944,0 1.4296875,0.1899414 2.0330809,0.5233154 C 6.2563478,2.3981934 5.65625,3.7083741 5.65625,5.15625 c 0,1.4478759 0.6000978,2.7580566 1.5643309,3.6954347 C 6.6171875,9.1850584 5.9241944,9.375 5.1875,9.375 Z M 8,8.2978516 C 7.7370606,8.0621337 7.5036622,7.7938231 7.3063966,7.4996337 H 8.6936034 C 8.4963378,7.7938231 8.2629394,8.0621338 8,8.2978516 Z M 10.8125,9.375 C 10.075806,9.375 9.3828125,9.1850584 8.7794191,8.8516847 9.7436522,7.9143066 10.34375,6.6041259 10.34375,5.15625 10.34375,3.7083741 9.7436522,2.3981934 8.7794191,1.4608154 9.3828125,1.1274414 10.075806,0.9375 10.8125,0.9375 c 2.343506,0 4.25,1.8925781 4.25,4.21875 0,2.3261719 -1.906494,4.21875 -4.25,4.21875 z m 0,0",
						})
					)
				)
			)
		)
	);
});

class TabBarItem extends react.Component {
	onSelect(event) {
		event.preventDefault();
		this.props.switchTo(this.props.item.key);
	}
	onLock(event) {
		event.preventDefault();
		this.props.lockIn(this.props.item.key);
	}
	render() {
		return react.createElement(
			"li",
			{
				className: "lyrics-tabBar-headerItem",
				onClick: this.onSelect.bind(this),
				onDoubleClick: this.onLock.bind(this),
				onContextMenu: this.onLock.bind(this),
			},
			react.createElement(
				"a",
				{
					"aria-current": "page",
					className: `lyrics-tabBar-headerItemLink ${this.props.item.active ? "lyrics-tabBar-active" : ""}`,
					draggable: "false",
					href: "",
				},
				react.createElement(
					"span",
					{
						className: "main-type-mestoBold",
					},
					this.props.item.value
				)
			)
		);
	}
}

const TabBarMore = react.memo(({ items, switchTo, lockIn }) => {
	const activeItem = items.find((item) => item.active);

	function onLock(event) {
		event.preventDefault();
		if (activeItem) {
			lockIn(activeItem.key);
		}
	}
	return react.createElement(
		"li",
		{
			className: `lyrics-tabBar-headerItem ${activeItem ? "lyrics-tabBar-active" : ""}`,
			onDoubleClick: onLock,
			onContextMenu: onLock,
		},
		react.createElement(OptionsMenu, {
			options: items,
			onSelect: switchTo,
			selected: activeItem,
			defaultValue: "More",
			bold: true,
		})
	);
});

const TopBarContent = ({ links, activeLink, lockLink, switchCallback, lockCallback }) => {
	const resizeHost =
		document.querySelector(".Root__main-view .os-resize-observer-host") ?? document.querySelector(".Root__main-view .os-size-observer");
	const [windowSize, setWindowSize] = useState(resizeHost.clientWidth);
	const resizeHandler = () => setWindowSize(resizeHost.clientWidth);

	useEffect(() => {
		const observer = new ResizeObserver(resizeHandler);
		observer.observe(resizeHost);
		return () => {
			observer.disconnect();
		};
	}, [resizeHandler]);

	return react.createElement(
		TabBarContext,
		null,
		react.createElement(TabBar, {
			className: "queue-queueHistoryTopBar-tabBar",
			links,
			activeLink,
			lockLink,
			switchCallback,
			lockCallback,
			windowSize,
		})
	);
};

const TabBarContext = ({ children }) => {
	return reactDOM.createPortal(
		react.createElement(
			"div",
			{
				className: "main-topBar-topbarContent",
			},
			children
		),
		document.querySelector(".main-topBar-topbarContentWrapper")
	);
};

const TabBar = react.memo(({ links, activeLink, lockLink, switchCallback, lockCallback, windowSize = Number.POSITIVE_INFINITY }) => {
	const tabBarRef = react.useRef(null);
	const [childrenSizes, setChildrenSizes] = useState([]);
	const [availableSpace, setAvailableSpace] = useState(0);
	const [droplistItem, setDroplistItems] = useState([]);

	const options = [];
	for (let i = 0; i < links.length; i++) {
		const key = links[i];
		if (spotifyVersion >= "1.2.31" && key === "genius") continue;
		let value = key[0].toUpperCase() + key.slice(1);
		if (key === lockLink) value = `• ${value}`;
		const active = key === activeLink;
		options.push({ key, value, active });
	}

	useEffect(() => {
		if (!tabBarRef.current) return;
		setAvailableSpace(tabBarRef.current.clientWidth);
	}, [windowSize]);

	useEffect(() => {
		if (!tabBarRef.current) return;

		const tabbarItemSizes = [];
		for (const child of tabBarRef.current.children) {
			tabbarItemSizes.push(child.clientWidth);
		}

		setChildrenSizes(tabbarItemSizes);
	}, [links]);

	useEffect(() => {
		if (!tabBarRef.current) return;

		const totalSize = childrenSizes.reduce((a, b) => a + b, 0);

		// Can we render everything?
		if (totalSize <= availableSpace) {
			setDroplistItems([]);
			return;
		}

		// The `More` button can be set to _any_ of the children. So we
		// reserve space for the largest item instead of always taking
		// the last item.
		const viewMoreButtonSize = Math.max(...childrenSizes);

		// Figure out how many children we can render while also showing
		// the More button
		const itemsToHide = [];
		let stopWidth = viewMoreButtonSize;

		childrenSizes.forEach((childWidth, i) => {
			if (availableSpace >= stopWidth + childWidth) {
				stopWidth += childWidth;
			} else {
				// First elem is edit button
				itemsToHide.push(i);
			}
		});

		setDroplistItems(itemsToHide);
	}, [availableSpace, childrenSizes]);

	return react.createElement(
		"nav",
		{
			className: "lyrics-tabBar lyrics-tabBar-nav",
		},
		react.createElement(
			"ul",
			{
				className: "lyrics-tabBar-header",
				ref: tabBarRef,
			},
			react.createElement("li", {
				className: "lyrics-tabBar-headerItem",
			}),
			options
				.filter((_, id) => !droplistItem.includes(id))
				.map((item) =>
					react.createElement(TabBarItem, {
						item,
						switchTo: switchCallback,
						lockIn: lockCallback,
					})
				),
			droplistItem.length || childrenSizes.length === 0
				? react.createElement(TabBarMore, {
						items: droplistItem.map((i) => options[i]).filter(Boolean),
						switchTo: switchCallback,
						lockIn: lockCallback,
					})
				: null
		)
	);
});

const Utils = {
	addQueueListener(callback) {
		Spicetify.Player.origin._events.addListener("queue_update", callback);
	},
	removeQueueListener(callback) {
		Spicetify.Player.origin._events.removeListener("queue_update", callback);
	},
	convertIntToRGB(colorInt, div = 1) {
		const rgb = {
			r: Math.round(((colorInt >> 16) & 0xff) / div),
			g: Math.round(((colorInt >> 8) & 0xff) / div),
			b: Math.round((colorInt & 0xff) / div),
		};
		return `rgb(${rgb.r},${rgb.g},${rgb.b})`;
	},
	/**
	 * @param {string} s
	 * @param {boolean} emptySymbol
	 * @returns {string}
	 */
	normalize(s, emptySymbol = true) {
		let result = s
			.replace(/（/g, "(")
			.replace(/）/g, ")")
			.replace(/【/g, "[")
			.replace(/】/g, "]")
			.replace(/。/g, ". ")
			.replace(/；/g, "; ")
			.replace(/：/g, ": ")
			.replace(/？/g, "? ")
			.replace(/！/g, "! ")
			.replace(/、|，/g, ", ")
			.replace(/‘|’|′|＇/g, "'")
			.replace(/“|”/g, '"')
			.replace(/〜/g, "~")
			.replace(/·|・/g, "•");
		if (emptySymbol) {
			result = result.replace(/-/g, " ").replace(/\//g, " ");
		}
		return result.replace(/\s+/g, " ").trim();
	},
	/**
	 * Check if the specified string contains Han character.
	 *
	 * @param {string} s
	 * @returns {boolean}
	 */
	containsHanCharacter(s) {
		const hanRegex = /\p{Script=Han}/u;
		return hanRegex.test(s);
	},
	/**
	 * Singleton Translator instance for {@link toSimplifiedChinese}.
	 *
	 * @type {Translator | null}
	 */
	set translator(translator) {
		this._translatorInstance = translator;
	},
	_translatorInstance: null,
	/**
	 * Convert all Han characters to Simplified Chinese.
	 *
	 * Choosing Simplified Chinese makes the converted result more accurate,
	 * as the conversion from SC to TC may have multiple possibilities,
	 * while the conversion from TC to SC usually has only one possibility.
	 *
	 * @param {string} s
	 * @returns {Promise<string>}
	 */
	async toSimplifiedChinese(s) {
		// create a singleton Translator instance
		if (!this._translatorInstance) this.translator = new Translator("zh");

		// translate to Simplified Chinese
		// as Traditional Chinese differs between HK and TW, forcing to use OpenCC standard
		return this._translatorInstance.convertChinese(s, "t", "cn");
	},
	removeSongFeat(s) {
		return (
			s
				.replace(/-\s+(feat|with|prod).*/i, "")
				.replace(/(\(|\[)(feat|with|prod)\.?\s+.*(\)|\])$/i, "")
				.trim() || s
		);
	},
	removeExtraInfo(s) {
		return s.replace(/\s-\s.*/, "");
	},
	capitalize(s) {
		return s.replace(/^(\w)/, ($1) => $1.toUpperCase());
	},
	detectLanguage(lyrics) {
		if (!Array.isArray(lyrics)) return;

		// Should return IETF BCP 47 language tags.
		// This should detect the song's main language.
		// Remember there is a possibility of a song referencing something in another language and the lyrics show it in that native language!
		const rawLyrics = lyrics.map((line) => line.text).join(" ");

		const kanaRegex = /[\u3001-\u3003]|[\u3005\u3007]|[\u301d-\u301f]|[\u3021-\u3035]|[\u3038-\u303a]|[\u3040-\u30ff]|[\uff66-\uff9f]/gu;
		const hangulRegex = /(\S*[\u3131-\u314e|\u314f-\u3163|\uac00-\ud7a3]+\S*)/g;
		const simpRegex =
			/[万与丑专业丛东丝丢两严丧个丬丰临为丽举么义乌乐乔习乡书买乱争于亏云亘亚产亩亲亵亸亿仅从仑仓仪们价众优伙会伛伞伟传伤伥伦伧伪伫体余佣佥侠侣侥侦侧侨侩侪侬俣俦俨俩俪俭债倾偬偻偾偿傥傧储傩儿兑兖党兰关兴兹养兽冁内冈册写军农冢冯冲决况冻净凄凉凌减凑凛几凤凫凭凯击凼凿刍划刘则刚创删别刬刭刽刿剀剂剐剑剥剧劝办务劢动励劲劳势勋勐勚匀匦匮区医华协单卖卢卤卧卫却卺厂厅历厉压厌厍厕厢厣厦厨厩厮县参叆叇双发变叙叠叶号叹叽吁后吓吕吗吣吨听启吴呒呓呕呖呗员呙呛呜咏咔咙咛咝咤咴咸哌响哑哒哓哔哕哗哙哜哝哟唛唝唠唡唢唣唤唿啧啬啭啮啰啴啸喷喽喾嗫呵嗳嘘嘤嘱噜噼嚣嚯团园囱围囵国图圆圣圹场坂坏块坚坛坜坝坞坟坠垄垅垆垒垦垧垩垫垭垯垱垲垴埘埙埚埝埯堑堕塆墙壮声壳壶壸处备复够头夸夹夺奁奂奋奖奥妆妇妈妩妪妫姗姜娄娅娆娇娈娱娲娴婳婴婵婶媪嫒嫔嫱嬷孙学孪宁宝实宠审宪宫宽宾寝对寻导寿将尔尘尧尴尸尽层屃屉届属屡屦屿岁岂岖岗岘岙岚岛岭岳岽岿峃峄峡峣峤峥峦崂崃崄崭嵘嵚嵛嵝嵴巅巩巯币帅师帏帐帘帜带帧帮帱帻帼幂幞干并广庄庆庐庑库应庙庞废庼廪开异弃张弥弪弯弹强归当录彟彦彻径徕御忆忏忧忾怀态怂怃怄怅怆怜总怼怿恋恳恶恸恹恺恻恼恽悦悫悬悭悯惊惧惨惩惫惬惭惮惯愍愠愤愦愿慑慭憷懑懒懔戆戋戏戗战戬户扎扑扦执扩扪扫扬扰抚抛抟抠抡抢护报担拟拢拣拥拦拧拨择挂挚挛挜挝挞挟挠挡挢挣挤挥挦捞损捡换捣据捻掳掴掷掸掺掼揸揽揿搀搁搂搅携摄摅摆摇摈摊撄撑撵撷撸撺擞攒敌敛数斋斓斗斩断无旧时旷旸昙昼昽显晋晒晓晔晕晖暂暧札术朴机杀杂权条来杨杩杰极构枞枢枣枥枧枨枪枫枭柜柠柽栀栅标栈栉栊栋栌栎栏树栖样栾桊桠桡桢档桤桥桦桧桨桩梦梼梾检棂椁椟椠椤椭楼榄榇榈榉槚槛槟槠横樯樱橥橱橹橼檐檩欢欤欧歼殁殇残殒殓殚殡殴毁毂毕毙毡毵氇气氢氩氲汇汉污汤汹沓沟没沣沤沥沦沧沨沩沪沵泞泪泶泷泸泺泻泼泽泾洁洒洼浃浅浆浇浈浉浊测浍济浏浐浑浒浓浔浕涂涌涛涝涞涟涠涡涢涣涤润涧涨涩淀渊渌渍渎渐渑渔渖渗温游湾湿溃溅溆溇滗滚滞滟滠满滢滤滥滦滨滩滪漤潆潇潋潍潜潴澜濑濒灏灭灯灵灾灿炀炉炖炜炝点炼炽烁烂烃烛烟烦烧烨烩烫烬热焕焖焘煅煳熘爱爷牍牦牵牺犊犟状犷犸犹狈狍狝狞独狭狮狯狰狱狲猃猎猕猡猪猫猬献獭玑玙玚玛玮环现玱玺珉珏珐珑珰珲琎琏琐琼瑶瑷璇璎瓒瓮瓯电画畅畲畴疖疗疟疠疡疬疮疯疱疴痈痉痒痖痨痪痫痴瘅瘆瘗瘘瘪瘫瘾瘿癞癣癫癯皑皱皲盏盐监盖盗盘眍眦眬着睁睐睑瞒瞩矫矶矾矿砀码砖砗砚砜砺砻砾础硁硅硕硖硗硙硚确硷碍碛碜碱碹磙礼祎祢祯祷祸禀禄禅离秃秆种积称秽秾稆税稣稳穑穷窃窍窑窜窝窥窦窭竖竞笃笋笔笕笺笼笾筑筚筛筜筝筹签简箓箦箧箨箩箪箫篑篓篮篱簖籁籴类籼粜粝粤粪粮糁糇紧絷纟纠纡红纣纤纥约级纨纩纪纫纬纭纮纯纰纱纲纳纴纵纶纷纸纹纺纻纼纽纾线绀绁绂练组绅细织终绉绊绋绌绍绎经绐绑绒结绔绕绖绗绘给绚绛络绝绞统绠绡绢绣绤绥绦继绨绩绪绫绬续绮绯绰绱绲绳维绵绶绷绸绹绺绻综绽绾绿缀缁缂缃缄缅缆缇缈缉缊缋缌缍缎缏缐缑缒缓缔缕编缗缘缙缚缛缜缝缞缟缠缡缢缣缤缥缦缧缨缩缪缫缬缭缮缯缰缱缲缳缴缵罂网罗罚罢罴羁羟羡翘翙翚耢耧耸耻聂聋职聍联聩聪肃肠肤肷肾肿胀胁胆胜胧胨胪胫胶脉脍脏脐脑脓脔脚脱脶脸腊腌腘腭腻腼腽腾膑臜舆舣舰舱舻艰艳艹艺节芈芗芜芦苁苇苈苋苌苍苎苏苘苹茎茏茑茔茕茧荆荐荙荚荛荜荞荟荠荡荣荤荥荦荧荨荩荪荫荬荭荮药莅莜莱莲莳莴莶获莸莹莺莼萚萝萤营萦萧萨葱蒇蒉蒋蒌蓝蓟蓠蓣蓥蓦蔷蔹蔺蔼蕲蕴薮藁藓虏虑虚虫虬虮虽虾虿蚀蚁蚂蚕蚝蚬蛊蛎蛏蛮蛰蛱蛲蛳蛴蜕蜗蜡蝇蝈蝉蝎蝼蝾螀螨蟏衅衔补衬衮袄袅袆袜袭袯装裆裈裢裣裤裥褛褴襁襕见观觃规觅视觇览觉觊觋觌觍觎觏觐觑觞触觯詟誉誊讠计订讣认讥讦讧讨让讪讫训议讯记讱讲讳讴讵讶讷许讹论讻讼讽设访诀证诂诃评诅识诇诈诉诊诋诌词诎诏诐译诒诓诔试诖诗诘诙诚诛诜话诞诟诠诡询诣诤该详诧诨诩诪诫诬语诮误诰诱诲诳说诵诶请诸诹诺读诼诽课诿谀谁谂调谄谅谆谇谈谊谋谌谍谎谏谐谑谒谓谔谕谖谗谘谙谚谛谜谝谞谟谠谡谢谣谤谥谦谧谨谩谪谫谬谭谮谯谰谱谲谳谴谵谶谷豮贝贞负贠贡财责贤败账货质贩贪贫贬购贮贯贰贱贲贳贴贵贶贷贸费贺贻贼贽贾贿赀赁赂赃资赅赆赇赈赉赊赋赌赍赎赏赐赑赒赓赔赕赖赗赘赙赚赛赜赝赞赟赠赡赢赣赪赵赶趋趱趸跃跄跖跞践跶跷跸跹跻踊踌踪踬踯蹑蹒蹰蹿躏躜躯车轧轨轩轪轫转轭轮软轰轱轲轳轴轵轶轷轸轹轺轻轼载轾轿辀辁辂较辄辅辆辇辈辉辊辋辌辍辎辏辐辑辒输辔辕辖辗辘辙辚辞辩辫边辽达迁过迈运还这进远违连迟迩迳迹适选逊递逦逻遗遥邓邝邬邮邹邺邻郁郄郏郐郑郓郦郧郸酝酦酱酽酾酿释里鉅鉴銮錾钆钇针钉钊钋钌钍钎钏钐钑钒钓钔钕钖钗钘钙钚钛钝钞钟钠钡钢钣钤钥钦钧钨钩钪钫钬钭钮钯钰钱钲钳钴钵钶钷钸钹钺钻钼钽钾钿铀铁铂铃铄铅铆铈铉铊铋铍铎铏铐铑铒铕铗铘铙铚铛铜铝铞铟铠铡铢铣铤铥铦铧铨铪铫铬铭铮铯铰铱铲铳铴铵银铷铸铹铺铻铼铽链铿销锁锂锃锄锅锆锇锈锉锊锋锌锍锎锏锐锑锒锓锔锕锖锗错锚锜锞锟锠锡锢锣锤锥锦锨锩锫锬锭键锯锰锱锲锳锴锵锶锷锸锹锺锻锼锽锾锿镀镁镂镃镆镇镈镉镊镌镍镎镏镐镑镒镕镖镗镙镚镛镜镝镞镟镠镡镢镣镤镥镦镧镨镩镪镫镬镭镮镯镰镱镲镳镴镶长门闩闪闫闬闭问闯闰闱闲闳间闵闶闷闸闹闺闻闼闽闾闿阀阁阂阃阄阅阆阇阈阉阊阋阌阍阎阏阐阑阒阓阔阕阖阗阘阙阚阛队阳阴阵阶际陆陇陈陉陕陧陨险随隐隶隽难雏雠雳雾霁霉霭靓静靥鞑鞒鞯鞴韦韧韨韩韪韫韬韵页顶顷顸项顺须顼顽顾顿颀颁颂颃预颅领颇颈颉颊颋颌颍颎颏颐频颒颓颔颕颖颗题颙颚颛颜额颞颟颠颡颢颣颤颥颦颧风飏飐飑飒飓飔飕飖飗飘飙飚飞飨餍饤饥饦饧饨饩饪饫饬饭饮饯饰饱饲饳饴饵饶饷饸饹饺饻饼饽饾饿馀馁馂馃馄馅馆馇馈馉馊馋馌馍馎馏馐馑馒馓馔馕马驭驮驯驰驱驲驳驴驵驶驷驸驹驺驻驼驽驾驿骀骁骂骃骄骅骆骇骈骉骊骋验骍骎骏骐骑骒骓骔骕骖骗骘骙骚骛骜骝骞骟骠骡骢骣骤骥骦骧髅髋髌鬓魇魉鱼鱽鱾鱿鲀鲁鲂鲄鲅鲆鲇鲈鲉鲊鲋鲌鲍鲎鲏鲐鲑鲒鲓鲔鲕鲖鲗鲘鲙鲚鲛鲜鲝鲞鲟鲠鲡鲢鲣鲤鲥鲦鲧鲨鲩鲪鲫鲬鲭鲮鲯鲰鲱鲲鲳鲴鲵鲶鲷鲸鲹鲺鲻鲼鲽鲾鲿鳀鳁鳂鳃鳄鳅鳆鳇鳈鳉鳊鳋鳌鳍鳎鳏鳐鳑鳒鳓鳔鳕鳖鳗鳘鳙鳛鳜鳝鳞鳟鳠鳡鳢鳣鸟鸠鸡鸢鸣鸤鸥鸦鸧鸨鸩鸪鸫鸬鸭鸮鸯鸰鸱鸲鸳鸴鸵鸶鸷鸸鸹鸺鸻鸼鸽鸾鸿鹀鹁鹂鹃鹄鹅鹆鹇鹈鹉鹊鹋鹌鹍鹎鹏鹐鹑鹒鹓鹔鹕鹖鹗鹘鹚鹛鹜鹝鹞鹟鹠鹡鹢鹣鹤鹥鹦鹧鹨鹩鹪鹫鹬鹭鹯鹰鹱鹲鹳鹴鹾麦麸黄黉黡黩黪黾鼋鼌鼍鼗鼹齄齐齑齿龀龁龂龃龄龅龆龇龈龉龊龋龌龙龚龛龟志制咨只里系范松没尝尝闹面准钟别闲干尽脏拼]/gu;
		const tradRegex =
			/[萬與醜專業叢東絲丟兩嚴喪個爿豐臨為麗舉麼義烏樂喬習鄉書買亂爭於虧雲亙亞產畝親褻嚲億僅從侖倉儀們價眾優夥會傴傘偉傳傷倀倫傖偽佇體餘傭僉俠侶僥偵側僑儈儕儂俁儔儼倆儷儉債傾傯僂僨償儻儐儲儺兒兌兗黨蘭關興茲養獸囅內岡冊寫軍農塚馮衝決況凍淨淒涼淩減湊凜幾鳳鳧憑凱擊氹鑿芻劃劉則剛創刪別剗剄劊劌剴劑剮劍剝劇勸辦務勱動勵勁勞勢勳猛勩勻匭匱區醫華協單賣盧鹵臥衛卻巹廠廳曆厲壓厭厙廁廂厴廈廚廄廝縣參靉靆雙發變敘疊葉號歎嘰籲後嚇呂嗎唚噸聽啟吳嘸囈嘔嚦唄員咼嗆嗚詠哢嚨嚀噝吒噅鹹呱響啞噠嘵嗶噦嘩噲嚌噥喲嘜嗊嘮啢嗩唕喚呼嘖嗇囀齧囉嘽嘯噴嘍嚳囁嗬噯噓嚶囑嚕劈囂謔團園囪圍圇國圖圓聖壙場阪壞塊堅壇壢壩塢墳墜壟壟壚壘墾坰堊墊埡墶壋塏堖塒塤堝墊垵塹墮壪牆壯聲殼壺壼處備複夠頭誇夾奪奩奐奮獎奧妝婦媽嫵嫗媯姍薑婁婭嬈嬌孌娛媧嫻嫿嬰嬋嬸媼嬡嬪嬙嬤孫學孿寧寶實寵審憲宮寬賓寢對尋導壽將爾塵堯尷屍盡層屭屜屆屬屢屨嶼歲豈嶇崗峴嶴嵐島嶺嶽崠巋嶨嶧峽嶢嶠崢巒嶗崍嶮嶄嶸嶔崳嶁脊巔鞏巰幣帥師幃帳簾幟帶幀幫幬幘幗冪襆幹並廣莊慶廬廡庫應廟龐廢廎廩開異棄張彌弳彎彈強歸當錄彠彥徹徑徠禦憶懺憂愾懷態慫憮慪悵愴憐總懟懌戀懇惡慟懨愷惻惱惲悅愨懸慳憫驚懼慘懲憊愜慚憚慣湣慍憤憒願懾憖怵懣懶懍戇戔戲戧戰戩戶紮撲扡執擴捫掃揚擾撫拋摶摳掄搶護報擔擬攏揀擁攔擰撥擇掛摯攣掗撾撻挾撓擋撟掙擠揮撏撈損撿換搗據撚擄摑擲撣摻摜摣攬撳攙擱摟攪攜攝攄擺搖擯攤攖撐攆擷擼攛擻攢敵斂數齋斕鬥斬斷無舊時曠暘曇晝曨顯晉曬曉曄暈暉暫曖劄術樸機殺雜權條來楊榪傑極構樅樞棗櫪梘棖槍楓梟櫃檸檉梔柵標棧櫛櫳棟櫨櫟欄樹棲樣欒棬椏橈楨檔榿橋樺檜槳樁夢檮棶檢欞槨櫝槧欏橢樓欖櫬櫚櫸檟檻檳櫧橫檣櫻櫫櫥櫓櫞簷檁歡歟歐殲歿殤殘殞殮殫殯毆毀轂畢斃氈毿氌氣氫氬氳彙漢汙湯洶遝溝沒灃漚瀝淪滄渢溈滬濔濘淚澩瀧瀘濼瀉潑澤涇潔灑窪浹淺漿澆湞溮濁測澮濟瀏滻渾滸濃潯濜塗湧濤澇淶漣潿渦溳渙滌潤澗漲澀澱淵淥漬瀆漸澠漁瀋滲溫遊灣濕潰濺漵漊潷滾滯灩灄滿瀅濾濫灤濱灘澦濫瀠瀟瀲濰潛瀦瀾瀨瀕灝滅燈靈災燦煬爐燉煒熗點煉熾爍爛烴燭煙煩燒燁燴燙燼熱煥燜燾煆糊溜愛爺牘犛牽犧犢強狀獷獁猶狽麅獮獰獨狹獅獪猙獄猻獫獵獼玀豬貓蝟獻獺璣璵瑒瑪瑋環現瑲璽瑉玨琺瓏璫琿璡璉瑣瓊瑤璦璿瓔瓚甕甌電畫暢佘疇癤療瘧癘瘍鬁瘡瘋皰屙癰痙癢瘂癆瘓癇癡癉瘮瘞瘺癟癱癮癭癩癬癲臒皚皺皸盞鹽監蓋盜盤瞘眥矓著睜睞瞼瞞矚矯磯礬礦碭碼磚硨硯碸礪礱礫礎硜矽碩硤磽磑礄確鹼礙磧磣堿镟滾禮禕禰禎禱禍稟祿禪離禿稈種積稱穢穠穭稅穌穩穡窮竊竅窯竄窩窺竇窶豎競篤筍筆筧箋籠籩築篳篩簹箏籌簽簡籙簀篋籜籮簞簫簣簍籃籬籪籟糴類秈糶糲粵糞糧糝餱緊縶糸糾紆紅紂纖紇約級紈纊紀紉緯紜紘純紕紗綱納紝縱綸紛紙紋紡紵紖紐紓線紺絏紱練組紳細織終縐絆紼絀紹繹經紿綁絨結絝繞絰絎繪給絢絳絡絕絞統綆綃絹繡綌綏絛繼綈績緒綾緓續綺緋綽緔緄繩維綿綬繃綢綯綹綣綜綻綰綠綴緇緙緗緘緬纜緹緲緝縕繢緦綞緞緶線緱縋緩締縷編緡緣縉縛縟縝縫縗縞纏縭縊縑繽縹縵縲纓縮繆繅纈繚繕繒韁繾繰繯繳纘罌網羅罰罷羆羈羥羨翹翽翬耮耬聳恥聶聾職聹聯聵聰肅腸膚膁腎腫脹脅膽勝朧腖臚脛膠脈膾髒臍腦膿臠腳脫腡臉臘醃膕齶膩靦膃騰臏臢輿艤艦艙艫艱豔艸藝節羋薌蕪蘆蓯葦藶莧萇蒼苧蘇檾蘋莖蘢蔦塋煢繭荊薦薘莢蕘蓽蕎薈薺蕩榮葷滎犖熒蕁藎蓀蔭蕒葒葤藥蒞蓧萊蓮蒔萵薟獲蕕瑩鶯蓴蘀蘿螢營縈蕭薩蔥蕆蕢蔣蔞藍薊蘺蕷鎣驀薔蘞藺藹蘄蘊藪槁蘚虜慮虛蟲虯蟣雖蝦蠆蝕蟻螞蠶蠔蜆蠱蠣蟶蠻蟄蛺蟯螄蠐蛻蝸蠟蠅蟈蟬蠍螻蠑螿蟎蠨釁銜補襯袞襖嫋褘襪襲襏裝襠褌褳襝褲襇褸襤繈襴見觀覎規覓視覘覽覺覬覡覿覥覦覯覲覷觴觸觶讋譽謄訁計訂訃認譏訐訌討讓訕訖訓議訊記訒講諱謳詎訝訥許訛論訩訟諷設訪訣證詁訶評詛識詗詐訴診詆謅詞詘詔詖譯詒誆誄試詿詩詰詼誠誅詵話誕詬詮詭詢詣諍該詳詫諢詡譸誡誣語誚誤誥誘誨誑說誦誒請諸諏諾讀諑誹課諉諛誰諗調諂諒諄誶談誼謀諶諜謊諫諧謔謁謂諤諭諼讒諮諳諺諦謎諞諝謨讜謖謝謠謗諡謙謐謹謾謫譾謬譚譖譙讕譜譎讞譴譫讖穀豶貝貞負貟貢財責賢敗賬貨質販貪貧貶購貯貫貳賤賁貰貼貴貺貸貿費賀貽賊贄賈賄貲賃賂贓資賅贐賕賑賚賒賦賭齎贖賞賜贔賙賡賠賧賴賵贅賻賺賽賾贗讚贇贈贍贏贛赬趙趕趨趲躉躍蹌蹠躒踐躂蹺蹕躚躋踴躊蹤躓躑躡蹣躕躥躪躦軀車軋軌軒軑軔轉軛輪軟轟軲軻轤軸軹軼軤軫轢軺輕軾載輊轎輈輇輅較輒輔輛輦輩輝輥輞輬輟輜輳輻輯轀輸轡轅轄輾轆轍轔辭辯辮邊遼達遷過邁運還這進遠違連遲邇逕跡適選遜遞邐邏遺遙鄧鄺鄔郵鄒鄴鄰鬱郤郟鄶鄭鄆酈鄖鄲醞醱醬釅釃釀釋裏钜鑒鑾鏨釓釔針釘釗釙釕釷釺釧釤鈒釩釣鍆釹鍚釵鈃鈣鈈鈦鈍鈔鍾鈉鋇鋼鈑鈐鑰欽鈞鎢鉤鈧鈁鈥鈄鈕鈀鈺錢鉦鉗鈷缽鈳鉕鈽鈸鉞鑽鉬鉭鉀鈿鈾鐵鉑鈴鑠鉛鉚鈰鉉鉈鉍鈹鐸鉶銬銠鉺銪鋏鋣鐃銍鐺銅鋁銱銦鎧鍘銖銑鋌銩銛鏵銓鉿銚鉻銘錚銫鉸銥鏟銃鐋銨銀銣鑄鐒鋪鋙錸鋱鏈鏗銷鎖鋰鋥鋤鍋鋯鋨鏽銼鋝鋒鋅鋶鐦鐧銳銻鋃鋟鋦錒錆鍺錯錨錡錁錕錩錫錮鑼錘錐錦鍁錈錇錟錠鍵鋸錳錙鍥鍈鍇鏘鍶鍔鍤鍬鍾鍛鎪鍠鍰鎄鍍鎂鏤鎡鏌鎮鎛鎘鑷鐫鎳鎿鎦鎬鎊鎰鎔鏢鏜鏍鏰鏞鏡鏑鏃鏇鏐鐔钁鐐鏷鑥鐓鑭鐠鑹鏹鐙鑊鐳鐶鐲鐮鐿鑔鑣鑞鑲長門閂閃閆閈閉問闖閏闈閑閎間閔閌悶閘鬧閨聞闥閩閭闓閥閣閡閫鬮閱閬闍閾閹閶鬩閿閽閻閼闡闌闃闠闊闋闔闐闒闕闞闤隊陽陰陣階際陸隴陳陘陝隉隕險隨隱隸雋難雛讎靂霧霽黴靄靚靜靨韃鞽韉韝韋韌韍韓韙韞韜韻頁頂頃頇項順須頊頑顧頓頎頒頌頏預顱領頗頸頡頰頲頜潁熲頦頤頻頮頹頷頴穎顆題顒顎顓顏額顳顢顛顙顥纇顫顬顰顴風颺颭颮颯颶颸颼颻飀飄飆飆飛饗饜飣饑飥餳飩餼飪飫飭飯飲餞飾飽飼飿飴餌饒餉餄餎餃餏餅餑餖餓餘餒餕餜餛餡館餷饋餶餿饞饁饃餺餾饈饉饅饊饌饢馬馭馱馴馳驅馹駁驢駔駛駟駙駒騶駐駝駑駕驛駘驍罵駰驕驊駱駭駢驫驪騁驗騂駸駿騏騎騍騅騌驌驂騙騭騤騷騖驁騮騫騸驃騾驄驏驟驥驦驤髏髖髕鬢魘魎魚魛魢魷魨魯魴魺鮁鮃鯰鱸鮋鮓鮒鮊鮑鱟鮍鮐鮭鮚鮳鮪鮞鮦鰂鮜鱠鱭鮫鮮鮺鯗鱘鯁鱺鰱鰹鯉鰣鰷鯀鯊鯇鮶鯽鯒鯖鯪鯕鯫鯡鯤鯧鯝鯢鯰鯛鯨鯵鯴鯔鱝鰈鰏鱨鯷鰮鰃鰓鱷鰍鰒鰉鰁鱂鯿鰠鼇鰭鰨鰥鰩鰟鰜鰳鰾鱈鱉鰻鰵鱅鰼鱖鱔鱗鱒鱯鱤鱧鱣鳥鳩雞鳶鳴鳲鷗鴉鶬鴇鴆鴣鶇鸕鴨鴞鴦鴒鴟鴝鴛鴬鴕鷥鷙鴯鴰鵂鴴鵃鴿鸞鴻鵐鵓鸝鵑鵠鵝鵒鷳鵜鵡鵲鶓鵪鶤鵯鵬鵮鶉鶊鵷鷫鶘鶡鶚鶻鶿鶥鶩鷊鷂鶲鶹鶺鷁鶼鶴鷖鸚鷓鷚鷯鷦鷲鷸鷺鸇鷹鸌鸏鸛鸘鹺麥麩黃黌黶黷黲黽黿鼂鼉鞀鼴齇齊齏齒齔齕齗齟齡齙齠齜齦齬齪齲齷龍龔龕龜誌製谘隻裡係範鬆冇嚐嘗鬨麵準鐘彆閒乾儘臟拚]/gu;
		const hanziRegex = /\p{Script=Han}/gu;

		const cjkMatch = rawLyrics.match(
			new RegExp(`${kanaRegex.source}|${hanziRegex.source}|${hangulRegex.source}|${/\p{Unified_Ideograph}/gu.source}`, "gu")
		);

		if (!cjkMatch) return;

		const kanaCount = cjkMatch.filter((glyph) => kanaRegex.test(glyph)).length;
		const hanziCount = cjkMatch.filter((glyph) => hanziRegex.test(glyph)).length;
		const simpCount = cjkMatch.filter((glyph) => simpRegex.test(glyph)).length;
		const tradCount = cjkMatch.filter((glyph) => tradRegex.test(glyph)).length;

		const kanaPercentage = kanaCount / cjkMatch.length;
		const hanziPercentage = hanziCount / cjkMatch.length;
		const simpPercentage = simpCount / cjkMatch.length;
		const tradPercentage = tradCount / cjkMatch.length;

		if (cjkMatch.filter((glyph) => hangulRegex.test(glyph)).length !== 0) {
			return "ko";
		}

		if (((kanaPercentage - hanziPercentage + 1) / 2) * 100 >= CONFIG.visual["ja-detect-threshold"]) {
			return "ja";
		}

		return ((simpPercentage - tradPercentage + 1) / 2) * 100 >= CONFIG.visual["hans-detect-threshold"] ? "zh-hans" : "zh-hant";
	},
	processTranslatedLyrics(result, lyricsToTranslate, { state, stateName }) {
		const translatedLines = result.split("\n");
		state[stateName] = [];
		for (let i = 0; i < lyricsToTranslate.length; i++) {
			const lyric = {
				startTime: lyricsToTranslate[i].startTime || 0,
				text: this.rubyTextToReact(translatedLines[i]),
			};
			state[stateName].push(lyric);
		}
	},
	processTranslatedOriginalLyrics(lyrics, synced) {
		const data = [];
		const dataSouce = {};

		for (const item of lyrics) {
			dataSouce[item.startTime] = { translate: item.text };
		}

		for (const time in synced) {
			dataSouce[item.startTime] = {
				...dataSouce[item.startTime],
				text: item.text,
			};
		}

		for (const time in dataSouce) {
			const item = dataSouce[time];
			const lyric = {
				startTime: time || 0,
				text: this.rubyTextToOriginalReact(item.translate || item.text, item.text || item.translate),
			};
			data.push(lyric);
		}

		return data;
	},
	rubyTextToOriginalReact(translated, syncedText) {
		const react = Spicetify.React;
		return react.createElement("p1", null, [react.createElement("ruby", {}, syncedText, react.createElement("rt", null, translated))]);
	},
	rubyTextToReact(s) {
		const react = Spicetify.React;
		const rubyElems = s.split("<ruby>");
		const reactChildren = [];

		reactChildren.push(rubyElems[0]);
		for (let i = 1; i < rubyElems.length; i++) {
			const kanji = rubyElems[i].split("<rp>")[0];
			const furigana = rubyElems[i].split("<rt>")[1].split("</rt>")[0];
			reactChildren.push(react.createElement("ruby", null, kanji, react.createElement("rt", null, furigana)));

			reactChildren.push(rubyElems[i].split("</ruby>")[1]);
		}
		return react.createElement("p1", null, reactChildren);
	},
	formatTime(timestamp) {
		if (Number.isNaN(timestamp)) return timestamp.toString();
		let minutes = Math.trunc(timestamp / 60000);
		let seconds = ((timestamp - minutes * 60000) / 1000).toFixed(2);

		if (minutes < 10) minutes = `0${minutes}`;
		if (seconds < 10) seconds = `0${seconds}`;

		return `${minutes}:${seconds}`;
	},
	formatTextWithTimestamps(text, startTime = 0) {
		if (text.props?.children) {
			return text.props.children
				.map((child) => {
					if (typeof child === "string") {
						return child;
					}
					if (child.props?.children) {
						return child.props?.children[0];
					}
				})
				.join("");
		}
		if (Array.isArray(text)) {
			let wordTime = startTime;
			return text
				.map((word) => {
					wordTime += word.time;
					return `${word.word}<${this.formatTime(wordTime)}>`;
				})
				.join("");
		}
		return text;
	},
	convertParsedToLRC(lyrics) {
		return lyrics
			.map((line) => {
				if (!line.startTime) return line.text;
				return `[${this.formatTime(line.startTime)}]${this.formatTextWithTimestamps(line.text, line.startTime)}`;
			})
			.join("\n");
	},
	parseLocalLyrics(lyrics) {
		// Preprocess lyrics by removing [tags] and empty lines
		const lines = lyrics
			.replaceAll(/\[[a-zA-Z]+:.+\]/g, "")
			.trim()
			.split("\n");

		const syncedTimestamp = /\[([0-9:.]+)\]/;
		const karaokeTimestamp = /\<([0-9:.]+)\>/;

		const unsynced = [];

		const isSynced = lines[0].match(syncedTimestamp);
		const synced = isSynced ? [] : null;

		const isKaraoke = lines[0].match(karaokeTimestamp);
		const karaoke = isKaraoke ? [] : null;

		function timestampToMs(timestamp) {
			const [minutes, seconds] = timestamp.replace(/\[\]\<\>/, "").split(":");
			return Number(minutes) * 60 * 1000 + Number(seconds) * 1000;
		}

		function parseKaraokeLine(line, startTime) {
			let wordTime = timestampToMs(startTime);
			const karaokeLine = [];
			const karaoke = line.matchAll(/(\S+ ?)\<([0-9:.]+)\>/g);
			for (const match of karaoke) {
				const word = match[1];
				const time = match[2];
				karaokeLine.push({ word, time: timestampToMs(time) - wordTime });
				wordTime = timestampToMs(time);
			}
			return karaokeLine;
		}

		for (const [i, line] of lines.entries()) {
			const time = line.match(syncedTimestamp)?.[1];
			let lyricContent = line.replace(syncedTimestamp, "").trim();
			const lyric = lyricContent.replaceAll(/\<([0-9:.]+)\>/g, "").trim();

			if (line.trim() !== "") {
				if (isKaraoke) {
					if (!lyricContent.endsWith(">")) {
						// For some reason there are a variety of formats for karaoke lyrics, Wikipedia is also inconsisent in their examples
						const endTime = lines[i + 1]?.match(syncedTimestamp)?.[1] || this.formatTime(Number(Spicetify.Player.data.item.metadata.duration));
						lyricContent += `<${endTime}>`;
					}
					const karaokeLine = parseKaraokeLine(lyricContent, time);
					karaoke.push({ text: karaokeLine, startTime: timestampToMs(time) });
				}
				isSynced && time && synced.push({ text: lyric || "♪", startTime: timestampToMs(time) });
				unsynced.push({ text: lyric || "♪" });
			}
		}

		return { synced, unsynced, karaoke };
	},
	processLyrics(lyrics) {
		return lyrics
			.replace(/　| /g, "") // Remove space
			.replace(/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~？！，。、《》【】「」]/g, ""); // Remove punctuation
	},
};

const ButtonSVG = ({ icon, active = true, onClick }) => {
	return react.createElement(
		"button",
		{
			className: `switch${active ? "" : " disabled"}`,
			onClick,
		},
		react.createElement("svg", {
			width: 16,
			height: 16,
			viewBox: "0 0 16 16",
			fill: "currentColor",
			dangerouslySetInnerHTML: {
				__html: icon,
			},
		})
	);
};

const SwapButton = ({ icon, disabled, onClick }) => {
	return react.createElement(
		"button",
		{
			className: "switch small",
			onClick,
			disabled,
		},
		react.createElement("svg", {
			width: 10,
			height: 10,
			viewBox: "0 0 16 16",
			fill: "currentColor",
			dangerouslySetInnerHTML: {
				__html: icon,
			},
		})
	);
};

const CacheButton = () => {
	let lyrics = {};

	try {
		const localLyrics = JSON.parse(localStorage.getItem("lyrics-plus:local-lyrics"));
		if (!localLyrics || typeof localLyrics !== "object") {
			throw "";
		}
		lyrics = localLyrics;
	} catch {
		lyrics = {};
	}

	const [count, setCount] = useState(Object.keys(lyrics).length);
	const text = count ? "Clear cached lyrics" : "No cached lyrics";

	return react.createElement(
		"button",
		{
			className: "btn",
			onClick: () => {
				localStorage.removeItem("lyrics-plus:local-lyrics");
				setCount(0);
			},
			disabled: !count,
		},
		text
	);
};

const RefreshTokenButton = ({ setTokenCallback }) => {
	const [buttonText, setButtonText] = useState("Refresh token");

	useEffect(() => {
		if (buttonText === "Refreshing token...") {
			Spicetify.CosmosAsync.get("https://apic-desktop.musixmatch.com/ws/1.1/token.get?app_id=web-desktop-app-v1.0", null, {
				authority: "apic-desktop.musixmatch.com",
			})
				.then(({ message: response }) => {
					if (response.header.status_code === 200 && response.body.user_token) {
						setTokenCallback(response.body.user_token);
						setButtonText("Token refreshed");
					} else if (response.header.status_code === 401) {
						setButtonText("Too many attempts");
					} else {
						setButtonText("Failed to refresh token");
						console.error("Failed to refresh token", response);
					}
				})
				.catch((error) => {
					setButtonText("Failed to refresh token");
					console.error("Failed to refresh token", error);
				});
		}
	}, [buttonText]);

	return react.createElement(
		"button",
		{
			className: "btn",
			onClick: () => {
				setButtonText("Refreshing token...");
			},
			disabled: buttonText !== "Refresh token",
		},
		buttonText
	);
};

const ConfigSlider = ({ name, defaultValue, onChange = () => {} }) => {
	const [active, setActive] = useState(defaultValue);

	const toggleState = useCallback(() => {
		const state = !active;
		setActive(state);
		onChange(state);
	}, [active]);

	return react.createElement(
		"div",
		{
			className: "setting-row",
		},
		react.createElement(
			"label",
			{
				className: "col description",
			},
			name
		),
		react.createElement(
			"div",
			{
				className: "col action",
			},
			react.createElement(ButtonSVG, {
				icon: Spicetify.SVGIcons.check,
				active,
				onClick: toggleState,
			})
		)
	);
};

const ConfigSelection = ({ name, defaultValue, options, onChange = () => {} }) => {
	const [value, setValue] = useState(defaultValue);

	const setValueCallback = useCallback(
		(event) => {
			let value = event.target.value;
			if (!Number.isNaN(Number(value))) {
				value = Number.parseInt(value);
			}
			setValue(value);
			onChange(value);
		},
		[value, options]
	);

	useEffect(() => {
		setValue(defaultValue);
	}, [defaultValue]);

	if (!Object.keys(options).length) return null;

	return react.createElement(
		"div",
		{
			className: "setting-row",
		},
		react.createElement(
			"label",
			{
				className: "col description",
			},
			name
		),
		react.createElement(
			"div",
			{
				className: "col action",
			},
			react.createElement(
				"select",
				{
					className: "main-dropDown-dropDown",
					value,
					onChange: setValueCallback,
				},
				Object.keys(options).map((item) =>
					react.createElement(
						"option",
						{
							value: item,
						},
						options[item]
					)
				)
			)
		)
	);
};

const ConfigInput = ({ name, defaultValue, onChange = () => {} }) => {
	const [value, setValue] = useState(defaultValue);

	const setValueCallback = useCallback(
		(event) => {
			const value = event.target.value;
			setValue(value);
			onChange(value);
		},
		[value]
	);

	return react.createElement(
		"div",
		{
			className: "setting-row",
		},
		react.createElement(
			"label",
			{
				className: "col description",
			},
			name
		),
		react.createElement(
			"div",
			{
				className: "col action",
			},
			react.createElement("input", {
				value,
				onChange: setValueCallback,
			})
		)
	);
};

const ConfigAdjust = ({ name, defaultValue, step, min, max, onChange = () => {} }) => {
	const [value, setValue] = useState(defaultValue);

	function adjust(dir) {
		let temp = value + dir * step;
		if (temp < min) {
			temp = min;
		} else if (temp > max) {
			temp = max;
		}
		setValue(temp);
		onChange(temp);
	}
	return react.createElement(
		"div",
		{
			className: "setting-row",
		},
		react.createElement(
			"label",
			{
				className: "col description",
			},
			name
		),
		react.createElement(
			"div",
			{
				className: "col action",
			},
			react.createElement(SwapButton, {
				icon: `<path d="M2 7h12v2H0z"/>`,
				onClick: () => adjust(-1),
				disabled: value === min,
			}),
			react.createElement(
				"p",
				{
					className: "adjust-value",
				},
				value
			),
			react.createElement(SwapButton, {
				icon: Spicetify.SVGIcons.plus2px,
				onClick: () => adjust(1),
				disabled: value === max,
			})
		)
	);
};

const ConfigHotkey = ({ name, defaultValue, onChange = () => {} }) => {
	const [value, setValue] = useState(defaultValue);
	const [trap] = useState(new Spicetify.Mousetrap());

	function record() {
		trap.handleKey = (character, modifiers, e) => {
			if (e.type === "keydown") {
				const sequence = [...new Set([...modifiers, character])];
				if (sequence.length === 1 && sequence[0] === "esc") {
					onChange("");
					setValue("");
					return;
				}
				setValue(sequence.join("+"));
			}
		};
	}

	function finishRecord() {
		trap.handleKey = () => {};
		onChange(value);
	}

	return react.createElement(
		"div",
		{
			className: "setting-row",
		},
		react.createElement(
			"label",
			{
				className: "col description",
			},
			name
		),
		react.createElement(
			"div",
			{
				className: "col action",
			},
			react.createElement("input", {
				value,
				onFocus: record,
				onBlur: finishRecord,
			})
		)
	);
};

const ServiceAction = ({ item, setTokenCallback }) => {
	switch (item.name) {
		case "local":
			return react.createElement(CacheButton);
		case "musixmatch":
			return react.createElement(RefreshTokenButton, { setTokenCallback });
		default:
			return null;
	}
};

const ServiceOption = ({ item, onToggle, onSwap, isFirst = false, isLast = false, onTokenChange = null }) => {
	const [token, setToken] = useState(item.token);
	const [active, setActive] = useState(item.on);

	const setTokenCallback = useCallback(
		(token) => {
			setToken(token);
			onTokenChange(item.name, token);
		},
		[item.token]
	);

	const toggleActive = useCallback(() => {
		if (item.name === "genius" && spotifyVersion >= "1.2.31") return;
		const state = !active;
		setActive(state);
		onToggle(item.name, state);
	}, [active]);

	return react.createElement(
		"div",
		null,
		react.createElement(
			"div",
			{
				className: "setting-row",
			},
			react.createElement(
				"h3",
				{
					className: "col description",
				},
				item.name
			),
			react.createElement(
				"div",
				{
					className: "col action",
				},
				react.createElement(ServiceAction, {
					item,
					setTokenCallback,
				}),
				react.createElement(SwapButton, {
					icon: Spicetify.SVGIcons["chart-up"],
					onClick: () => onSwap(item.name, -1),
					disabled: isFirst,
				}),
				react.createElement(SwapButton, {
					icon: Spicetify.SVGIcons["chart-down"],
					onClick: () => onSwap(item.name, 1),
					disabled: isLast,
				}),
				react.createElement(ButtonSVG, {
					icon: Spicetify.SVGIcons.check,
					active,
					onClick: toggleActive,
				})
			)
		),
		react.createElement("span", {
			dangerouslySetInnerHTML: {
				__html: item.desc,
			},
		}),
		item.token !== undefined &&
			react.createElement("input", {
				placeholder: `Place your ${item.name} token here`,
				value: token,
				onChange: (event) => setTokenCallback(event.target.value),
			})
	);
};

const ServiceList = ({ itemsList, onListChange = () => {}, onToggle = () => {}, onTokenChange = () => {} }) => {
	const [items, setItems] = useState(itemsList);
	const maxIndex = items.length - 1;

	const onSwap = useCallback(
		(name, direction) => {
			const curPos = items.findIndex((val) => val === name);
			const newPos = curPos + direction;
			[items[curPos], items[newPos]] = [items[newPos], items[curPos]];
			onListChange(items);
			setItems([...items]);
		},
		[items]
	);

	return items.map((key, index) => {
		const item = CONFIG.providers[key];
		item.name = key;
		return react.createElement(ServiceOption, {
			item,
			key,
			isFirst: index === 0,
			isLast: index === maxIndex,
			onSwap,
			onTokenChange,
			onToggle,
		});
	});
};

const OptionList = ({ type, items, onChange }) => {
	const [itemList, setItemList] = useState(items);
	const [, forceUpdate] = useState();

	useEffect(() => {
		if (!type) return;

		const eventListener = (event) => {
			if (event.detail?.type !== type) return;
			setItemList(event.detail.items);
		};
		document.addEventListener("lyrics-plus", eventListener);

		return () => document.removeEventListener("lyrics-plus", eventListener);
	}, []);

	return itemList.map((item) => {
		if (!item || (item.when && !item.when())) {
			return;
		}

		const onChangeItem = item.onChange || onChange;

		return react.createElement(
			"div",
			null,
			react.createElement(item.type, {
				...item,
				name: item.desc,
				defaultValue: CONFIG.visual[item.key],
				onChange: (value) => {
					onChangeItem(item.key, value);
					forceUpdate({});
				},
			}),
			item.info &&
				react.createElement("span", {
					dangerouslySetInnerHTML: {
						__html: item.info,
					},
				})
		);
	});
};

function openConfig() {
	const configContainer = react.createElement(
		"div",
		{
			id: `${APP_NAME}-config-container`,
		},
		react.createElement("h2", null, "Options"),
		react.createElement(OptionList, {
			items: [
				{
					desc: "Playbar button",
					key: "playbar-button",
					info: "Replace Spotify's lyrics button with Lyrics Plus.",
					type: ConfigSlider,
				},
				{
					desc: "Global delay",
					info: "Offset (in ms) across all tracks.",
					key: "global-delay",
					type: ConfigAdjust,
					min: -10000,
					max: 10000,
					step: 250,
				},
				{
					desc: "Font size",
					info: "(or Ctrl + Mouse scroll in main app)",
					key: "font-size",
					type: ConfigAdjust,
					min: fontSizeLimit.min,
					max: fontSizeLimit.max,
					step: fontSizeLimit.step,
				},
				{
					desc: "Alignment",
					key: "alignment",
					type: ConfigSelection,
					options: {
						left: "Left",
						center: "Center",
						right: "Right",
					},
				},
				{
					desc: "Fullscreen hotkey",
					key: "fullscreen-key",
					type: ConfigHotkey,
				},
				{
					desc: "Compact synced: Lines to show before",
					key: "lines-before",
					type: ConfigSelection,
					options: [0, 1, 2, 3, 4],
				},
				{
					desc: "Compact synced: Lines to show after",
					key: "lines-after",
					type: ConfigSelection,
					options: [0, 1, 2, 3, 4],
				},
				{
					desc: "Compact synced: Fade-out blur",
					key: "fade-blur",
					type: ConfigSlider,
				},
				{
					desc: "Noise overlay",
					key: "noise",
					type: ConfigSlider,
				},
				{
					desc: "Colorful background",
					key: "colorful",
					type: ConfigSlider,
				},
				{
					desc: "Background color",
					key: "background-color",
					type: ConfigInput,
					when: () => !CONFIG.visual.colorful,
				},
				{
					desc: "Active text color",
					key: "active-color",
					type: ConfigInput,
					when: () => !CONFIG.visual.colorful,
				},
				{
					desc: "Inactive text color",
					key: "inactive-color",
					type: ConfigInput,
					when: () => !CONFIG.visual.colorful,
				},
				{
					desc: "Highlight text background",
					key: "highlight-color",
					type: ConfigInput,
					when: () => !CONFIG.visual.colorful,
				},
				{
					desc: "Text convertion: Japanese Detection threshold (Advanced)",
					info: "Checks if whenever Kana is dominant in lyrics. If the result passes the threshold, it's most likely Japanese, and vice versa. This setting is in percentage.",
					key: "ja-detect-threshold",
					type: ConfigAdjust,
					min: thresholdSizeLimit.min,
					max: thresholdSizeLimit.max,
					step: thresholdSizeLimit.step,
				},
				{
					desc: "Text convertion: Traditional-Simplified Detection threshold (Advanced)",
					info: "Checks if whenever Traditional or Simplified is dominant in lyrics. If the result passes the threshold, it's most likely Simplified, and vice versa. This setting is in percentage.",
					key: "hans-detect-threshold",
					type: ConfigAdjust,
					min: thresholdSizeLimit.min,
					max: thresholdSizeLimit.max,
					step: thresholdSizeLimit.step,
				},
			],
			onChange: (name, value) => {
				CONFIG.visual[name] = value;
				localStorage.setItem(`${APP_NAME}:visual:${name}`, value);
				lyricContainerUpdate?.();

				const configChange = new CustomEvent("lyrics-plus", {
					detail: {
						type: "config",
						name: name,
						value: value,
					},
				});
				window.dispatchEvent(configChange);
			},
		}),
		react.createElement("h2", null, "Providers"),
		react.createElement(ServiceList, {
			itemsList: CONFIG.providersOrder,
			onListChange: (list) => {
				CONFIG.providersOrder = list;
				localStorage.setItem(`${APP_NAME}:services-order`, JSON.stringify(list));
			},
			onToggle: (name, value) => {
				CONFIG.providers[name].on = value;
				localStorage.setItem(`${APP_NAME}:provider:${name}:on`, value);
				lyricContainerUpdate?.();
			},
			onTokenChange: (name, value) => {
				CONFIG.providers[name].token = value;
				localStorage.setItem(`${APP_NAME}:provider:${name}:token`, value);
			},
		})
	);

	Spicetify.PopupModal.display({
		title: "Lyrics Plus",
		content: configContainer,
		isLarge: true,
	});
}

const kuroshiroPath = "https://cdn.jsdelivr.net/npm/kuroshiro@1.2.0/dist/kuroshiro.min.js";
const kuromojiPath = "https://cdn.jsdelivr.net/npm/kuroshiro-analyzer-kuromoji@1.1.0/dist/kuroshiro-analyzer-kuromoji.min.js";
const aromanize = "https://cdn.jsdelivr.net/npm/aromanize@0.1.5/aromanize.min.js";
const openCCPath = "https://cdn.jsdelivr.net/npm/opencc-js@1.0.5/dist/umd/full.min.js";

const dictPath = "https:/cdn.jsdelivr.net/npm/kuromoji@0.1.2/dict";

class Translator {
	constructor(lang) {
		this.finished = {
			ja: false,
			ko: false,
			zh: false,
		};

		this.applyKuromojiFix();
		this.injectExternals(lang);
		this.createTranslator(lang);
	}

	includeExternal(url) {
		if (CONFIG.visual.translate && !document.querySelector(`script[src="${url}"]`)) {
			const script = document.createElement("script");
			script.setAttribute("type", "text/javascript");
			script.setAttribute("src", url);
			document.head.appendChild(script);
		}
	}

	injectExternals(lang) {
		switch (lang?.slice(0, 2)) {
			case "ja":
				this.includeExternal(kuromojiPath);
				this.includeExternal(kuroshiroPath);
				break;
			case "ko":
				this.includeExternal(aromanize);
				break;
			case "zh":
				this.includeExternal(openCCPath);
				break;
		}
	}

	/**
	 * Fix an issue with kuromoji when loading dict from external urls
	 * Adapted from: https://github.com/mobilusoss/textlint-browser-runner/pull/7
	 */
	applyKuromojiFix() {
		if (typeof XMLHttpRequest.prototype.realOpen !== "undefined") return;
		XMLHttpRequest.prototype.realOpen = XMLHttpRequest.prototype.open;
		XMLHttpRequest.prototype.open = function (method, url, bool) {
			if (url.indexOf(dictPath.replace("https://", "https:/")) === 0) {
				this.realOpen(method, url.replace("https:/", "https://"), bool);
			} else {
				this.realOpen(method, url, bool);
			}
		};
	}

	async createTranslator(lang) {
		switch (lang.slice(0, 2)) {
			case "ja":
				if (this.kuroshiro) return;
				if (typeof Kuroshiro === "undefined" || typeof KuromojiAnalyzer === "undefined") {
					await Translator.#sleep(50);
					return this.createTranslator(lang);
				}

				this.kuroshiro = new Kuroshiro.default();
				this.kuroshiro.init(new KuromojiAnalyzer({ dictPath })).then(
					function () {
						this.finished.ja = true;
					}.bind(this)
				);

				break;
			case "ko":
				if (this.Aromanize) return;
				if (typeof Aromanize === "undefined") {
					await Translator.#sleep(50);
					return this.createTranslator(lang);
				}

				this.Aromanize = Aromanize;
				this.finished.ko = true;
				break;
			case "zh":
				if (this.OpenCC) return;
				if (typeof OpenCC === "undefined") {
					await Translator.#sleep(50);
					return this.createTranslator(lang);
				}

				this.OpenCC = OpenCC;
				this.finished.zh = true;
				break;
		}
	}

	async romajifyText(text, target = "romaji", mode = "spaced") {
		if (!this.finished.ja) {
			await Translator.#sleep(100);
			return this.romajifyText(text, target, mode);
		}

		return this.kuroshiro.convert(text, {
			to: target,
			mode: mode,
		});
	}

	async convertToRomaja(text, target) {
		if (!this.finished.ko) {
			await Translator.#sleep(100);
			return this.convertToRomaja(text, target);
		}

		if (target === "hangul") return text;
		return Aromanize.hangulToLatin(text, "rr-translit");
	}

	async convertChinese(text, from, target) {
		if (!this.finished.zh) {
			await Translator.#sleep(100);
			return this.convertChinese(text, from, target);
		}

		const converter = this.OpenCC.Converter({
			from: from,
			to: target,
		});

		return converter(text);
	}

	/**
	 * Async wrapper of `setTimeout`.
	 *
	 * @param {number} ms
	 * @returns {Promise<void>}
	 */
	static async #sleep(ms) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}
}

}}]);