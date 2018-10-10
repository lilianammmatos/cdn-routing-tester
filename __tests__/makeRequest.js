const fetch = require('node-fetch');
const https = require('https');

const host = process.env.NODE_SERVICE_HOST || 'https://local.intranet.1stdibs.com';
const agent = new https.Agent({ rejectUnauthorized: false });

function getUserCookiesArr({ isConsumer, isTrade, isPcs }) {
    if (!isConsumer || !isTrade || isPcs) {
        return [];
    }
    if (isConsumer) {
        return ['userType=consumer', 'userToken=123456_FAKE_TOKEN'];
    }
    if (isTrade) {
        return ['userType=trade', 'userToken=123456_FAKE_TOKEN'];
    }
    if (isPcs) {
        return ['userType=trade', 'userToken=123456_FAKE_TOKEN'];
    }
}

module.exports.buildCookiesString = function({ isConsumer, isTrade, isPcs }) {
    const cookiesArr = [];
    cookiesArr.concat(getUserCookiesArr({ isConsumer, isPcs, isTrade }));

    return cookiesArr.sort().join('; ');
};

module.exports.makeRequest = function ({ uri, headers, cookies }) {

    return fetch(
        `${host}${uri}`, {
            headers: {
                'Cookie': cookies
            },
            agent
        })
            .then(res => res.json())
};
