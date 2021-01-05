const JSONBIN_KEY =
    ":)";

const JSONBIN_ENDPOINT = "https://api.jsonbin.io/b/5ff48bad14be54706019fe5a";

const DEFAULT_HEADERS = new Headers({
    "secret-key": JSONBIN_KEY,
    "content-type": "application/json",
});

export async function getDisplay(): Promise<string[]> {
    const response = await fetch(`${JSONBIN_ENDPOINT}/latest`, {
        headers: DEFAULT_HEADERS,
    });

    return await response.json();
}

export async function setDisplay(data: string[]): Promise<void> {
    const response = await fetch(JSONBIN_ENDPOINT, {
        method: "PUT",
        headers: DEFAULT_HEADERS,
        body: JSON.stringify(data),
    });
    return await response.json();
}
