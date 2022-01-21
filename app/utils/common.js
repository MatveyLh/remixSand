const DATA_URL_REGEX = /^data:([a-z]+\/[a-z0-9-+.]+(;[a-z0-9-.!#$%*+.{}|~`]+=[a-z0-9-.!#$%*+.{}|~`]+)*)?(;base64)?,([a-z0-9!$&',()*+;=\-._~:@/?%\s]*?)$/i;

export function convertSrcSet(sources) {
    return sources
        .slice(0, 2)
        .map((url, index) => `${url} ${index + 1}x`)
        .join(', ');
}

export function getImageTypeFromUrl(url) {
    if (!url) {
        return null;
    }

    const isValidDataUrl = DATA_URL_REGEX.test(url);

    if (isValidDataUrl) {
        const parts = url.trim().match(DATA_URL_REGEX);
        return parts ? parts[1] ?? null : null;
    }

    const dotPositionIndex = url.lastIndexOf('.');

    if (dotPositionIndex === -1) return null;

    const extension = url.slice(dotPositionIndex + 1);

    switch (extension) {
        case 'svg':
            return 'image/svg+xml';
        case 'webp':
            return 'image/webp';
        case 'png':
            return 'image/png';
        case 'jpg':
        case 'jpeg':
            return 'image/jpeg';
    }

    return null;
}

export function getErrorForField(errors, field) {
    for (const error of errors) {
        if (error[field]) {
            return error[field];
        }
    }
    return null;
}
