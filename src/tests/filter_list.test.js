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
            surface_rubber: true,
            surface_mulch: false,
            surface_gravel: false,
            structure_small: true,
            structure_big: true,
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
            surface_mulch: true,
            surface_gravel: false,
            surface_rubber: false,
            structure_small: true,
            structure_big: false,
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
            surface_gravel: true,
            surface_mulch: false,
            surface_rubber: false,
            structure_small: false,
            structure_big: true,
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
            surface_gravel: false,
            surface_mulch: false,
            surface_rubber: false,
            structure_small: false,
            structure_big: false,
        };
        const actual = filterList(fakeList, filter);
        expect(actual).to.deep.equal(expected);
    });
    it("return Playground 1 only when all checkboxes are selected and surface is rubber", () => {
        const expected = [fakeList[0]];
        const filter = {
            parking: true,
            restroom: true,
            trail: true,
            water: true,
            sand: true,
            splash: true,
            sp_needs_swings: true,
            surface_rubber: true,
            structure_small: true,
            structure_big: true,
        };
        const actual = filterList(fakeList, filter);
        expect(actual).to.deep.equal(expected);
    });
    it("return Playground 2 only when Mulch surface is selected and others filters is empty", () => {
        const expected = [fakeList[1]];
        const filter = {
            surface_mulch: true,
        };
        const actual = filterList(fakeList, filter);
        expect(actual).to.deep.equal(expected);
    });
    it("return Playgrounds 1 and 3 when Bigger kids structure is selected", () => {
        const expected = [fakeList[0], fakeList[2]];
        const filter = {
            structure_small: false,
            structure_big: true,
        };
        const actual = filterList(fakeList, filter);
        expect(actual).to.deep.equal(expected);
    });
    it("return Playgrounds 3 only when restroom is selected and surface gravel is selected", () => {
        const expected = [fakeList[2]];
        const filter = {
            restroom: true,
            surface_gravel: true,
        };
        const actual = filterList(fakeList, filter);
        expect(actual).to.deep.equal(expected);
    });
});
