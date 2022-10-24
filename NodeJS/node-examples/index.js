var rect = {
  perimeter: (x, y) => 2 * (x + y),
  area: (x, y) => x * y,
};

function solveRect(l, b) {
  console.log("Solving for rectangle with l = " + l + " and b = " + b);
  if (l <= 0 || b <= 0) {
    console.log(
      "Rectangle dimensions should be greater than 0: l = " +
        l +
        ", and b = " +
        b +
        "\n"
    );
  } else {
    console.log("The area of rectangle = " + rect.area(l, b)) + "\n";
    console.log("The perimeter of the rectangle = " + rect.perimeter(l, b));
  }
}

solveRect(2, 4);
solveRect(3, 5);
solveRect(0, 5);
solveRect(-3, 5);
