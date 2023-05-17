import { expect } from "chai";
import { filterList } from "../helpers/filterList";

const fakeList = [
    {
        id: "1",
        name: "Playground 1",
        address: "Address 1",
        filter: {
            parking: true,
            restroom: true,
            trail: true,
            water: true,
            sand: true,
            splash: true,
            sp_needs_swings: true,
            surface: ["rubber"],
            structure: ["small", "big"],
        },
    },
    {
        id: "2",
        name: "Playground 2",
        address: "Address 2",
        filter: {
            parking: false,
            restroom: false,
            trail: false,
            water: false,
            sand: false,
            splash: false,
            sp_needs_swings: false,
            surface: ["mulch"],
            structure: ["small"],
        },
    },
    {
        id: "3",
        name: "Playground 3",
        address: "Address 3",
        filter: {
            parking: false,
            restroom: true,
            trail: false,
            water: true,
            sand: false,
            splash: false,
            sp_needs_swings: false,
            surface: ["gravel"],
            structure: ["big"],
        },
    },
];

describe("Filtering playgrounds list", () => {
    it("return the full list when filter is null", () => {
        const expected = fakeList;
        const actual = filterList(fakeList, null);
        expect(actual).to.deep.equal(expected);
    });
    it("return the full list when nothing is chosen in filter", () => {
        const expected = fakeList;
        const filter = {
            parking: false,
            restroom: false,
            trail: false,
            water: false,
            sand: false,
            splash: false,
            sp_needs_swings: false,
            surface: "any",
            structure: { small: false, big: false },
        };
        const actual = filterList(fakeList, filter);
        expect(actual).to.deep.equal(expected);
    });
    it("return Playground 1 only when all checkboxes are selected", () => {
        const expected = [fakeList[0]];
        const filter = {
            parking: true,
            restroom: true,
            trail: true,
            water: true,
            sand: true,
            splash: true,
            sp_needs_swings: true,
            surface: "any",
            structure: { small: true, big: true },
        };
        const actual = filterList(fakeList, filter);
        expect(actual).to.deep.equal(expected);
    });
    it("return Playground 2 only when Mulch surface is selected and others filters is empty", () => {
        const expected = [fakeList[1]];
        const filter = {
            surface: "mulch",
        };
        const actual = filterList(fakeList, filter);
        expect(actual).to.deep.equal(expected);
    });
    it("return Playgrounds 1 and 3 when Bigger kids structure is selected", () => {
        const expected = [fakeList[0], fakeList[2]];
        const filter = {
            structure: { small: false, big: true },
        };
        const actual = filterList(fakeList, filter);
        expect(actual).to.deep.equal(expected);
    });
    it("return Playgrounds 3 only when restroom is selected and surface gravel is selected", () => {
        const expected = [fakeList[2]];
        const filter = {
            restroom: true,
            surface: "gravel",
        };
        const actual = filterList(fakeList, filter);
        expect(actual).to.deep.equal(expected);
    });
});
