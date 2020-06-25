var tape = require("tape"),
    d3 = require("../");

const data = [
  {name: "jim",   amount: "34.0",   date: "11/12/2015"},
  {name: "carl",  amount: "120.11", date: "11/12/2015"},
  {name: "stacy", amount: "12.01",  date: "01/04/2016"},
  {name: "stacy", amount: "34.05",  date: "01/04/2016"}
];

tape("indexes(data, accessor*) returns the expected nested arrays", function(test) {
  test.deepEqual(
    d3.indexes(data, d => d.amount),
    [ [ '34.0', { name: 'jim', amount: '34.0', date: '11/12/2015' } ], [ '120.11', { name: 'carl', amount: '120.11', date: '11/12/2015' } ], [ '12.01', { name: 'stacy', amount: '12.01', date: '01/04/2016' } ], [ '34.05', { name: 'stacy', amount: '34.05', date: '01/04/2016' } ] ]
    );
  test.deepEqual(
    d3.indexes(data, d => d.name, d => d.amount),
    [ [ 'jim', [ [ '34.0', { name: 'jim', amount: '34.0', date: '11/12/2015' } ] ] ], [ 'carl', [ [ '120.11', { name: 'carl', amount: '120.11', date: '11/12/2015' } ] ] ], [ 'stacy', [ [ '12.01', { name: 'stacy', amount: '12.01', date: '01/04/2016' } ], [ '34.05', { name: 'stacy', amount: '34.05', date: '01/04/2016' } ] ] ] ]
    );
  test.end();
});

tape("index(data, accessor*) returns the expected map", function(test) {
  test.deepEqual(
    entries(d3.index(data, d => d.amount), 1),
    d3.indexes(data, d => d.amount)
    );
  test.deepEqual(
    entries(d3.index(data, d => d.name, d => d.amount), 2),
    d3.indexes(data, d => d.name, d => d.amount)
    );
  test.end();
});

tape("index(data, accessor) throws on a non-unique key", function(test) {
  test.throws(() => d3.index(data, d => d.name));
  test.throws(() => d3.index(data, d => d.date));
  test.end();
});

function entries(map, depth) {
  if (depth > 0) {
    return Array.from(map, ([k, v]) => [k, entries(v, depth - 1)]);
  } else {
    return map;
  }
}
