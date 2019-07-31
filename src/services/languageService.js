export let languageService = {
    url: "http://127.0.0.1:8080",
    getFirstSentence(language, line, fileName) {
        return fetch(`${this.url}/firstSentence`,
            {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    language: language,
                    line: line,
                    fileName: fileName
                })
            }
        );
    },
    getNextSentence() {
        return fetch(`${this.url}/nextSentence`,
            {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            }
        );
    },
    saveAnalysedData(analysedData) {
        return fetch(`${this.url}/evaluation`,
            {
                method: 'POST',
                mode: 'no-cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                redirect: 'follow',
                referrer: 'no-referrer',
                body: JSON.stringify(analysedData),
            })
    }
};