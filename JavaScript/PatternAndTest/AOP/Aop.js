// const Aop = {
//   around: function(pointcut, advice, namespaces) {
//     if (namespaces === undefined || namespaces.length === 0) {
//       namespaces = [(function() {return this;}).call()];
//     }

//     for (const i in namespaces) {
//       const ns = namespaces[i];

//       for (const member in ns) {
//         if (typeof ns[member] === 'function' && member.match(pointcut)) {
//           (function(fn, fnName, ns) {
//             ns[fnName] = function() {
//               return advice.call(this, {
//                 fn: fn,
//                 fnName: fnName,
//                 arguments, arguments,
//               });
//             };
//           })(ns[member], member, ns);
//         }
//       }
//     }
//   },

//   next: function(f) {
//     return f.fn.apply(this, f.arguments);
//   },
// };
