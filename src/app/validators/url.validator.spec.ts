import {inject} from "@angular/core/testing";
import {UrlValidator} from "./url.validator";
import {TestBed} from "@angular/core/testing/test_bed";

describe("UrlValidator", () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                { provide: UrlValidator, useClass: UrlValidator }
            ]
        });
    });

    describe("isValidUrl", () => {

        it("Should return if a string is a URL",
        inject([UrlValidator], (urlValidator: UrlValidator) => {
            expect(urlValidator.isValidUrl('https://stackoverflow.com/data/test.json')).toBe(true);

            expect(urlValidator.isValidUrl('http://stackoverflow.com/')).toBe(true);

            expect(urlValidator.isValidUrl('/Users/mate/testws/asd123.json')).toBe(false);

            expect(urlValidator.isValidUrl('./asd123.json')).toBe(false);

        }));
    });
});
