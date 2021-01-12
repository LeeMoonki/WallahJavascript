const rj3 = {};

rj3.svg = {};

rj3.svg.line = function() {
  let getX = function(point) {
    return point[0];
  };

  let getY = function(point) {
    return point[1];
  };

  const interpolate = function(points) {
    return points.join('L');
  };

  function line(data) {
    const segments = [];
    const points = [];
    let i = -1;
    let n = data.length;
    let d;

    function segment() {
      // line의 private 함수
      segments.push('M', interpolate(points));
    }

    while(++i < n) {
      d = data[i];
      points.push([+getX.call(this, d, i), +getY.call(this, d, i)]); // 함수 오버로딩
      // points.push([+getX(d, i), +getY(d, i)]);
    }

    if (points.length) {
      segment();
    }

    return segments.length ? segments.join('') : null;
  }

  line.x = function(funcToGetX) {
    if (!funcToGetX) return getX;
    getX = funcToGetX;

    return line;
  };

  line.y = function(funcToGetY) {
    if (!funcToGetY) return getY;
    getY = funcToGetY;

    return line;
  };

  // closure
  return line;
};

export const line = rj3.svg.line;
