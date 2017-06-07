## Linear Algebra Library
lalgebra.js (c) 2017 Boris Buimov

version 1.2.0

This library contains functions and a class for working with elements of linear algebra - points, lines, segments, planes, vectors and matrixes.
(With unit tests and a JSDoc documentation).

#### API

``` lalgebra.Matrix.initElems(array) ```
\- *Initialises elements of the matrix.*

``` lalgebra.Matrix.getElems() ```
\- *Gets elements of the matrix.*

``` lalgebra.Matrix.getRows() ```
\- *Gets an amount of rows of the matrix.*

``` lalgebra.Matrix.getCols() ```
\- *Gets an amount of columns of the matrix.*

``` lalgebra.Matrix.getElem(idxRow, idxCol) ```
\- *Gets an element of the matrix.*

``` lalgebra.Matrix.setElem(val, idxRow, idxCol) ```
\- *Sets a value to the element of the matrix.*

``` lalgebra.Matrix.Matrix#determinant() ```
\- *Computes a determinant of the matrix.*

``` lalgebra.Matrix.Matrix#getCopy() ```
\- *Copies the matrix.*

``` lalgebra.Matrix.Matrix#getMinor(idxRow, idxCol) ```
\- *Gets a submatrix without one row and one column.*

``` lalgebra.Matrix.Matrix#inverse() ```
\- *Inverses the matrix.*

``` lalgebra.Matrix.Matrix#multiply(matrix) ```
\- *Multiplys two matrixes.*

``` lalgebra.Matrix.Matrix#trace() ```
\- *Displays the array elements into columns like in matrixes.*

``` lalgebra.Matrix.Matrix#transpose() ```
\- *Transposes the matrix.*

``` lalgebra.Matrix.Matrix#normolize() ```
\- *Normolizes the matrix of an object in homogeneous coordinates to get a back projection into the actual dimensional space.*

``` lalgebra.getIntersection(a1, a2, b1, b2) ```
\- *Finds an intersection of two segments.*

``` lalgebra.normal(a, b, c) ```
\- *Computes a normal to the plane.*

``` lalgebra.scalarProduct(a, b) ```
\- *Computes a scalar (dot) product of two vectors.*

``` lalgebra.tripleProduct(a, b, c) ```
\- *Computes a scalar triple product of three vectors.*

``` lalgebra.vectorMagnitude(a) ```
\- *Computes a magnitude (length) of the vector.*

``` lalgebra.vectorProduct(a, b) ```
\- *Computes a vector (cross) product of two vectors.*

``` lalgebra.getAngles(vector) ```
\- *Computes two angles: first - between a vector projection on the plane y=0 and the z-axis, second - between a vector and the y-axis.*

``` lalgebra.cartesianToSpherical(cart) ```
\- *Converts Cartesian coordinates into spherical coordinates.*

``` lalgebra.radianToDegree(radian) ```
\- *Converts radians into degrees.*

``` lalgebra.degreeToRadian(degree) ```
\- *Converts degrees into radians.*

