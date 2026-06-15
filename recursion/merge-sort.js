//Merge sort mergeSort([3, 2, 1, 13, 8, 5, 0, 1])

function mergeSort(n) {
  if (n.length <= 1) {
    return n;
  }
  const m = Math.floor(n.length / 2);
  const leftSide = mergeSort(n.slice(0, m));
  const rightSide = mergeSort(n.slice(m, n.length));

  return merge(leftSide, rightSide);
}

function merge(leftSide, rightSide) {
  if (leftSide.length === 0) return rightSide;
  if (rightSide.length === 0) return leftSide;

  if (leftSide[0] < rightSide[0]) {
    return [leftSide[0], ...merge(leftSide.slice(1), rightSide)];
  } else {
    return [rightSide[0], ...merge(rightSide.slice(1), leftSide)];
  }
}
