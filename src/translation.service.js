const API_ENDPOINT = 'https://api.cognitive.microsofttranslator.com/translate';
const API_VERSION = '3.0';
const API_KEY = '083f98b1ea1e49bcbadc13de4616d9a8';
const LOCATION = 'centralus';

async function translateText(texts, targetLanguage) {
    const requestBody = texts.map((text) => ({ text }));
    const response = await fetch(
        `${API_ENDPOINT}?api-version=${API_VERSION}&to=${targetLanguage}`,
        {
            method: 'POST',
            headers: {
                'Ocp-Apim-Subscription-Key': API_KEY,
                'Ocp-Apim-Subscription-Region': LOCATION,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        }
    );

    if (!response.ok) {
        throw new Error('Translation request failed');
    }

    const data = await response.json();
    return data
}

export default translateText;