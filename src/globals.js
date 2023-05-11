/*
 * =================================================================================================
 * CONSTANTS
 * =================================================================================================
 */

// List of stored options keys
const RELEASE = 'release';
const ICON = 'icon';
const MISC = 'miscellaneous';
const NOTIFICATION = 'updateNotification';
const TAB = 'tab';
// List of stored options properties
const OPEN_NOTES = 'openNotes';
const FOLDER = 'folder';
const TOP = 'top';
const ENABLED = 'enabled';
const INBOX = 'inbox';
const PREVENT_REMOVAL = 'preventRemoval';
const COLOR = 'color';
const SHORTCUT = 'shortcut';
const CONTEXT_MENU = 'contextMenu';
const LAST_USED_FOLDER = 'lastUsedFolderId';

// Miscellaneous
const FOLDER_NONE = 'none';
const FOLDER_LAST_USED = 'last';
const ICON_DEFAULT_COLOR = 'red';
const QUICK_BOOKMARKING_COMMAND = 'quick-bookmark';
const FIREFOX_ROOT_BOOKMARK_FOLDER = 'root________';

// List of context menus
const CM_PAGE = 'context_menu_page';
const CM_BOOKMARK = 'context_menu_bookmark';

// Icon sizes
const ICON_SIZES = [16, 24, 32, 48, 64, 96, 128, 256, 512, 1024];

/*
 * =================================================================================================
 * GLOBAL VARIABLES
 * =================================================================================================
 */

// eslint-disable-next-line prefer-const
let globalWebPage = null;
// eslint-disable-next-line prefer-const
let globalOptions = null;
