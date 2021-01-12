import { line } from './d3Example';

describe('d3 example', () => {
  const basicData = [
    [10, 130],
    [100, 60],
    [190, 160],
    [280, 10],
  ];
  const expectedResult = `M${basicData.map(p => p.join(',')).join('L')}`;

  test('기본 사용', () => {
    const data = basicData;
    const lineGenerator = line();
    const path = lineGenerator(data);

    expect(path).toBe(expectedResult);
  });

  test('객체 포인트', () => {
    const data = basicData.map(([x, y]) => ({ x, y }));
    const lineGenerator = line()
      .x(p => p.x)
      .y(p => p.y);
    const path = lineGenerator(data);

    expect(path).toBe(expectedResult);
  });

  test('this의 역할', () => {
    const functionBasedLine = function() {
      const firstXCoordinate = 10;
      const xDistanceBetweenPoints = 50;
      
      const svgHeight = 200;

      const lineGenerator = line()
        .x(function(d, i) { return firstXCoordinate + i * xDistanceBetweenPoints; })
        .y(function(d) {
          // line은 yearlyPriceGrapher에 의해 호출되고
          // 이 함수는 line 내부에서 .call(this)에 의해 호출 되므로
          // this는 yearlyPriceGrapher다.
          return svgHeight - this.getValue(d);
        });
      
      return lineGenerator;
    };

    const yearlyPriceGrapher = {
      lineGenerator: functionBasedLine(),
      getValue: function getValue(year) {
        return 10 * Math.pow(1.8, year - 2010);
      }
    };
    const years = [2010, 2011, 2012, 2013, 2014, 2015];
    const path = yearlyPriceGrapher.lineGenerator(years);
  });
});
