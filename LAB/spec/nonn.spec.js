describe('nonn module spec', () => {
    it('outerHeight', () => {
        // arrange
        var box = document.createElement('div');
        box.style.width = '100px';
        box.style.height = '70px';
        box.style.padding = '10px';
        box.style.margin = '5px';
        box.style.backgroundColor = '#429ac2';

        expect(nonn.outerHeight).not.toBe(undefined);
        expect(nonn.outerHeight(box)).toBe(0);
    });
});