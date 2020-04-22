function taggedTemplate(strs, ...vals) {
  return { strs, vals, mstrs: strs.map((chunk, index) => ({ chunk, index })) };
}

const simpleTt = taggedTemplate`value:${10}`;

/**
 * { strs: [ 'value:', '' ],
  vals: [ 10 ],
  mstrs: [ { chunk: 'value:', index: 0 }, { chunk: '', index: 1 } ] }
 */

const tt1 = taggedTemplate`

  lineBreaks: ${10}, inlineValue: ${20}

  multiValues: ${30}${40}
`;

/**
 * { strs:
   [ '\n\n  lineBreaks: ',
     ', inlineValue: ',
     '\n\n  multiValues: ',
     '',
     '\n' ],
  vals: [ 10, 20, 30, 40 ],
  mstrs:
   [ { chunk: '\n\n  lineBreaks: ', index: 0 },
     { chunk: ', inlineValue: ', index: 1 },
     { chunk: '\n\n  multiValues: ', index: 2 },
     { chunk: '', index: 3 },
     { chunk: '\n', index: 4 } ] }
 */


const tt2 = taggedTemplate`

  lineBreaks: ${10}, inlineValue: ${20}

  multiValues: ${30}a${40}
`;

/**
 * { strs:
   [ '\n\n  lineBreaks: ',
     ', inlineValue: ',
     '\n\n  multiValues: ',
     'a',
     '\n' ],
  vals: [ 10, 20, 30, 40 ],
  mstrs:
   [ { chunk: '\n\n  lineBreaks: ', index: 0 },
     { chunk: ', inlineValue: ', index: 1 },
     { chunk: '\n\n  multiValues: ', index: 2 },
     { chunk: 'a', index: 3 },
     { chunk: '\n', index: 4 } ] }
 */
