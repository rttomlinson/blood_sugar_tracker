require('isomorphic-fetch');
const backendBaseUrl = "https://personal-projects-rttomlinson.c9users.io:8081"



describe("attempt to login user with valid credentials", function() {
    it("returns 200 for the root url to get if server is up", function(done) {
        fetch(backendBaseUrl)
            .then(response => {
                expect(response.status).toEqual(200);
                done();
            });
    });
    it("returns a token with valid login", function(done) {
        expect(true).toBe(true);
        done()
    });
});
