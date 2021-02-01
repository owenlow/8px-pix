import { ProjectStoreState } from "../store/projects/types";

const JSONBIN_KEY = "";

const JSONBIN_ENDPOINT = "https://api.jsonbin.io/b/6012f09cc9033f74c4279d1b";

const DEFAULT_HEADERS = new Headers({
    "secret-key": JSONBIN_KEY,
    "content-type": "application/json"
});

export async function getProjectData(): Promise<ProjectStoreState> {
    const response = await fetch(`${JSONBIN_ENDPOINT}/latest`, {
        method: "GET",
        headers: DEFAULT_HEADERS
    });

    return await response.json();
}

export async function setProjectData(data: ProjectStoreState): Promise<void> {
    const response = await fetch(JSONBIN_ENDPOINT, {
        method: "PUT",
        headers: DEFAULT_HEADERS,
        body: JSON.stringify(data)
    });
    return await response.json();
}
