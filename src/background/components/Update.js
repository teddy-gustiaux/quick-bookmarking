/*
 * =================================================================================================
 * EXTENSION UPDATE
 * =================================================================================================
 */

class Update {
	constructor(options) {
		this._options = options;
	}

	async openOptionsPage() {
		return browser.runtime.openOptionsPage();
	}

	async openChangelogPage() {
		return browser.tabs.create({
			url: 'https://github.com/teddy-gustiaux/quick-bookmarking/blob/master/CHANGELOG.md',
			active: true,
		});
	}

	async displayReleaseNotes() {
		if (this._options.isDisplayReleaseNotesEnabled()) {
			this.openChangelogPage();
		}
	}
}
