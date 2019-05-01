let mode = 'development';
let suffix = '';
if (!process.env.VUE_ENV && window && window.appSettings) {
    mode = window.appSettings.mode;
    suffix = '_' + mode;
}
const CONSTANTS = {
    AUTH_TOKEN: 'AUTH_TOKEN' + suffix,
    LANG: 'LANG' + suffix,
    CURRENT_USER: 'CURRENT_USER' + suffix,
    PERMISSIONS: 'PERMISSIONS' + suffix,
    USER_PERMISSIONS: 'USER_PERMISSIONS' + suffix,
    CURRENT_VERSION: 'CURRENT_VERSION' + suffix,
    MENU_MODE: 'MENU_MODE' + suffix
}
export default CONSTANTS;