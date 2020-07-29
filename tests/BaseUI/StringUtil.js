class StringUtil {
    static trimEnd(text, textToTrim) {
        textToTrim = this.RegExEscape(textToTrim);
        return text.replace(new RegExp("[" + textToTrim + "]+$"), "");
    }

    static getUniqueString() {
        let dateStr = new Date().toISOString();
        dateStr = dateStr.replace(/:/g, "-");
        const randomString = Math.round(Math.random() * 100000).toString();
        const result = `${dateStr}-${randomString}`;
        return result;
    }
}

module.exports = StringUtil