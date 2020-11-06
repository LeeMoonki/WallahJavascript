// 아무 timezone의 date를 입력해도 KST의 date와 time을 반환

const zero_base = n => n < 10 ? `0${n}` : `${n}`;
const ko_offset = -540 * 60 * 1000;
export const toKOTime = (date, duration = 0, toString = true) => {
  const d = typeof date === 'string' ? new Date(date) : date;
  let kd;
  if (d.getTimezoneOffset() === ko_offset) {
    kd = d;
  } else {
    kd = new Date(d.getTime() + (d.getTimezoneOffset() * 60 * 1000) - ko_offset);
  }
  const Y = kd.getFullYear(), M = kd.getMonth() + 1, D = kd.getDate(), h = kd.getHours(), m = kd.getMinutes(), s = kd.getSeconds();

  if (toString) {
    return `${Y}-${zero_base(M)}-${zero_base(D)}, ${zero_base(h)}:${zero_base(m)}~${zero_base(h + (~~(duration / 60)))}:${zero_base(m + (duration % 60))}`;
  } else {
    return { Y, M, D, h, m, s };
  }
};