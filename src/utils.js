export function isMdScreen() {
    if(window) {
        return window.matchMedia(`(max-width: 767px)`).matches;
    }
    return false;
}

export function classList(classes) {
    return Object.entries(classes).filter(entry => entry[1]).map(entry => entry[0]).join(" ");
}