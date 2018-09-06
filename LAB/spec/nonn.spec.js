describe('nonn module spec', () => {
    var UTS;

    beforeAll(() => {
        UTS = new uts();
        UTS.setRootElement();
    });

    afterEach(() => {
        UTS.cleanUp();
    });

    it('getChildrenWithClass', () => {
        // arrange
        UTS.createElement('div', { id: 'test-div' });
        UTS.createElement('ul', { 
            id: 'test-ul', class: 'test-ul-a test-ul-b', parentEle: document.getElementById('test-div') 
        });
        UTS.createElement('li', { class: 'test-li-a', parentEle: document.getElementById('test-ul') });
        UTS.createElement('li', { class: 'test-li-a test-li-b', parentEle: document.getElementById('test-ul') });

        // assert
        expect(nonn.getChildrenWithClass('test-ul-b', document.getElementById('test-div'))._elements.length).toBe(1);
        expect(nonn.getChildrenWithClass('test-li-a', document.getElementById('test-div'))._elements.length).toBe(0);
        expect(nonn.getChildrenWithClass('test-li-a', document.getElementById('test-ul'))._elements.length).toBe(2);
        expect(nonn.getChildrenWithClass('test-li-b', document.getElementById('test-ul'))._elements.length).toBe(1);
    });

    it('getChildrenWithTag', () => {
        // arrange
        UTS.createElement('div', { id: 'test-div' });
        UTS.createElement('ul', { 
            id: 'test-ul', class: 'test-ul-a test-ul-b', parentEle: document.getElementById('test-div') 
        });
        UTS.createElement('li', { class: 'test-li-a', parentEle: document.getElementById('test-ul') });
        UTS.createElement('li', { class: 'test-li-a test-li-b', parentEle: document.getElementById('test-ul') });

        // assert
        expect(nonn.getChildrenWithTag('ul', document.getElementById('test-div'))._elements.length).toBe(1);
        expect(nonn.getChildrenWithTag('li', document.getElementById('test-div'))._elements.length).toBe(0);
        expect(nonn.getChildrenWithTag('li', document.getElementById('test-ul'))._elements.length).toBe(2);
    });

    it('outerHeight', () => {
        // arrange
        UTS.createElement('div', {
            id: 'test-div',
            style: {
                width: '100px',
                height: '70px',
                margin: '5px'
            }
        });
        UTS.createElement('div', {
            id: 'test-div1'
        });
        UTS.createElement('div', {
            id: 'test-div2',
            style: {
                width: '100px',
                height: '70px',
                margin: '5px',
                padding: '10px'
            }
        });

        // assert
        expect(nonn.outerHeight(document.getElementById('test-div'))).toBe(80);
        expect(nonn.outerHeight(document.getElementById('test-div1'))).toBe(0);
        expect(nonn.outerHeight(document.getElementById('test-div2'))).toBe(100);
    });

    it('outerWidth', () => {
        // arrange
        UTS.createElement('div', {
            id: 'test-div',
            style: {
                width: '100px',
                height: '70px',
                margin: '5px'
            }
        });
        UTS.createElement('div', {
            id: 'test-div1'
        });
        UTS.createElement('div', {
            id: 'test-div2',
            style: {
                width: '100px',
                height: '70px',
                margin: '5px',
                padding: '10px'
            }
        });


        // assert
        expect(nonn.outerWidth(document.getElementById('test-div'))).toBe(110);
        expect(nonn.outerWidth(document.getElementById('test-div1'))).toBe(0);
        expect(nonn.outerWidth(document.getElementById('test-div2'))).toBe(130);
    });
});