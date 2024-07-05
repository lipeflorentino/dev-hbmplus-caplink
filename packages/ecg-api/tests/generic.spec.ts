// tests/generic.test.ts

function sum(a: number, b: number): number {
    return a + b;
}

describe('Sum function', () => {
    it('adds 1 + 2 to equal 3', () => {
        expect(sum(1, 2)).toBe(3);
    });

    it('adds -1 + 1 to equal 0', () => {
        expect(sum(-1, 1)).toBe(0);
    });
});
