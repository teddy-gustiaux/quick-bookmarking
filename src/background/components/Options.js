/*
 * ================================================================================
 * EXTENSION OPTIONS
 * ================================================================================
 */

class Options {
	constructor(options) {
		this._options = options;
	}

	set options(options) {
		this._options = options;
	}

	// -------------------------------------------------------------------------------------------------
	// GENERIC
	// -------------------------------------------------------------------------------------------------

	// Indicate if an option has been enabled or not for a specific option category
	_isOptionEnabled(optionCategory, optionName) {
		let isEnabled = false;
		if (Object.prototype.hasOwnProperty.call(this._options, optionCategory)) {
			const category = this._options[optionCategory];
			if (
				Object.prototype.hasOwnProperty.call(category, optionName) &&
				category[optionName] === true
			) {
				isEnabled = true;
			}
		}
		return isEnabled;
	}

	// Indicate if an option has been set or not for a specific option category
	_isOptionSet(optionCategory, optionName) {
		let isSet = false;
		if (Object.prototype.hasOwnProperty.call(this._options, optionCategory)) {
			const category = this._options[optionCategory];
			if (
				Object.prototype.hasOwnProperty.call(category, optionName) &&
				typeof category[optionName] !== 'undefined'
			) {
				isSet = true;
			}
			// Specific case for no folder selected for quick bookmarked
			if (category[optionName] === FOLDER_NONE) isSet = false;
		}
		return isSet;
	}

	// Get the folder which has been set for a specific option category
	_getSetFolder(optionCategory) {
		return this._options[optionCategory][FOLDER];
	}

	// -------------------------------------------------------------------------------------------------
	// RELEASE NOTES
	// -------------------------------------------------------------------------------------------------

	isDisplayReleaseNotesEnabled() {
		return this._isOptionEnabled(RELEASE, OPEN_NOTES);
	}

	// -------------------------------------------------------------------------------------------------
	// QUICK BOOKMARKING
	// -------------------------------------------------------------------------------------------------

	isIconEnabled() {
		return this._isOptionEnabled(ICON, ENABLED);
	}

	isShortcutEnabled() {
		return this._isOptionEnabled(ICON, SHORTCUT);
	}

	areContextMenusEnabled() {
		return this._isOptionEnabled(ICON, CONTEXT_MENU);
	}

	isQuickFolderSet() {
		return this._isOptionSet(ICON, FOLDER);
	}

	isQuickFolderLastUsed() {
		return this._options[ICON][FOLDER] === FOLDER_LAST_USED;
	}

	getQuickFolder() {
		return this._getSetFolder(ICON);
	}

	addQuickBookmarksOnTop() {
		return this._isOptionEnabled(ICON, TOP);
	}

	isInboxModeEnabled() {
		return this._isOptionEnabled(ICON, INBOX);
	}

	isRemovalPreventionEnabled() {
		return this._isOptionEnabled(ICON, PREVENT_REMOVAL);
	}

	getIconColor() {
		let color = ICON_DEFAULT_COLOR;
		if (this._isOptionSet(ICON, COLOR)) {
			color = this._options[ICON][COLOR];
		}
		return color;
	}

	// -------------------------------------------------------------------------------------------------
	// MISCELLANEOUS
	// -------------------------------------------------------------------------------------------------

	async updateLastUsedFolder(folderId) {
		const object = { [LAST_USED_FOLDER]: folderId };
		await browser.storage.local.set({ [MISC]: object });
	}

	getLastUsedFolder() {
		let folderId = 'unfiled_____';
		if (this._isOptionSet(MISC, LAST_USED_FOLDER)) {
			folderId = this._options[MISC][LAST_USED_FOLDER];
		}
		return folderId;
	}
}
