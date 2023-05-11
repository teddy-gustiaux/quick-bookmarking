import { promises as fs } from 'node:fs';
import * as path from 'node:path';
import * as url from 'node:url';

class ManifestBuilder {
	static FIREFOX = 'firefox';

	static CHROME = 'chrome';

	get baseValues() {
		return {
			manifest_version: 3,
			name: 'Quick Bookmarking',
			author: 'Teddy Gustiaux',
			version: '1.0.0',
			description: '__MSG_manifest_extension_description__',
			homepage_url: 'https://github.com/teddy-gustiaux/quick-bookmarking',
			default_locale: 'en',
			permissions: ['bookmarks', 'activeTab', 'tabs', 'storage', 'menus'],
			icons: {
				16: 'icons/logo/logo-16.png',
				24: 'icons/logo/logo-24.png',
				32: 'icons/logo/logo-32.png',
				48: 'icons/logo/logo-48.png',
				64: 'icons/logo/logo-64.png',
				96: 'icons/logo/logo-96.png',
				128: 'icons/logo/logo-128.png',
				256: 'icons/logo/logo-256.png',
				512: 'icons/logo/logo-512.png',
				1024: 'icons/logo/logo-1024.png',
			},
			page_action: {
				default_icon: {
					16: 'icons/cross/cross-16.png',
					24: 'icons/cross/cross-24.png',
					32: 'icons/cross/cross-32.png',
					48: 'icons/cross/cross-48.png',
					64: 'icons/cross/cross-64.png',
					96: 'icons/cross/cross-96.png',
					128: 'icons/cross/cross-128.png',
					256: 'icons/cross/cross-256.png',
					512: 'icons/cross/cross-512.png',
					1024: 'icons/cross/cross-1024.png',
				},
				default_title: '__MSG_manifest_page_action_default_title__',
				browser_style: true,
			},
			background: {
				scripts: [
					'globals.js',
					'background/utils/Utils.js',
					'background/utils/PageAction.js',
					'background/utils/ContextMenus.js',
					'background/components/Options.js',
					'background/components/Update.js',
					'background/components/WebPage.js',
					'background/components/Interface.js',
					'background/components/QuickBookmarking.js',
					'background/background.js',
				],
			},
			options_ui: {
				page: 'options/options.html',
				browser_style: true,
				open_in_tab: true,
			},
			commands: {
				'quick-bookmark': {
					suggested_key: {
						default: 'Alt+Shift+D',
					},
					description: '__MSG_manifest_shortcut_quick_bookmark_description__',
				},
			},
		};
	}

	get firefoxValues() {
		return {
			browser_specific_settings: {
				gecko: {
					id: 'quick-bookmarking@gustiaux.com',
					strict_min_version: '113.0',
				},
			},
		};
	}

	get chromeTranslations() {
		return {
			page_action: 'action',
			browser_specific_settings: null,
			background: {
				scripts: 'service_worker',
			},
		};
	}

	constructor(target, location) {
		const targets = [ManifestBuilder.FIREFOX, ManifestBuilder.CHROME];
		if (targets.includes(target)) this.target = target;
		this.location = location;
	}

	#translateKeys(objectToProcess, translations) {
		for (const [original, replacement] of Object.entries(translations)) {
			if (typeof replacement === 'object' && replacement !== null) {
				objectToProcess[original] = {
					...this.#translateKeys(objectToProcess[original], replacement),
				};
			} else {
				if (replacement !== null) {
					objectToProcess[replacement] = { ...objectToProcess[original] };
				}
				delete objectToProcess[original];
			}
		}
		return objectToProcess;
	}

	#makeForFirefox() {
		return { ...this.baseValues, ...this.firefoxValues };
	}

	#makeForChrome() {
		const manifest = this.#makeForFirefox();
		return this.#translateKeys(manifest, this.chromeTranslations);
	}

	async make() {
		let manifest = null;
		if (this.target === ManifestBuilder.FIREFOX) {
			manifest = this.#makeForFirefox();
		} else if (this.target === ManifestBuilder.CHROME) {
			manifest = this.#makeForChrome();
		}

		if (manifest !== null) {
			await fs.writeFile(this.location, JSON.stringify(manifest, null, 4));
		}
	}
}

const buildManifest = async (target) => {
	const currentDirectory = url.fileURLToPath(new URL('.', import.meta.url));
	const sourceDir = path.resolve(currentDirectory, '../../', 'src/');
	const browser =
		target === ManifestBuilder.CHROME ? ManifestBuilder.CHROME : ManifestBuilder.FIREFOX;

	const builder = new ManifestBuilder(browser, path.join(sourceDir, '/manifest.json'));
	await builder.make();

	let specificOptions = {};
	if (browser === ManifestBuilder.FIREFOX) {
		specificOptions = {
			firefox: target,
		};
	} else {
		specificOptions = {
			target: 'chromium',
		};
	}

	return {
		browser,
		sourceDir,
	};
};

export { ManifestBuilder, buildManifest };
