const { makeRequest, buildCookiesString } = require('./makeRequest');
const { URLSearchParams } = require('url');

describe('pdpResp routing', function () {

    it('should return something', function (done) {

        makeRequest({
            uri: '/furniture/',
            cookies: buildCookiesString({
                isConsumer: true
            })

        }).then(function (val) {
            const { url, query } = val;
            expect(url).toEqual(expect.stringMatching(/^\/resp\/furniture\//));
            const params = new URLSearchParams(query);
            expect(params.get('devicetype')).toBe('desktop');
            expect(params.get('ut')).toBe('consumer');
            done();
        })
    });
});



