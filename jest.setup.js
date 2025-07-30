const roundCoordinates = (value) => {
  if (typeof value === 'number') {
    return +value.toFixed(6);
  }
  if (Array.isArray(value)) {
    return value.map(roundCoordinates);
  }
  if (value && typeof value === 'object') {
    const result = {};
    for (const key of Object.keys(value)) {
      result[key] = roundCoordinates(value[key]);
    }
    return result;
  }
  return value;
};

expect.addSnapshotSerializer({
  test: (val) =>
    val &&
    typeof val === 'object' &&
    (val.type === 'Feature' || val.type === 'FeatureCollection'),
  print: (val) =>
    JSON.stringify(roundCoordinates(val), null, 2),
});
