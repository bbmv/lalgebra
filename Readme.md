## Linear Algebra Library
lalgebra.js (c) 2017 Boris Buimov

version 1.2.0

This library contains functions and a class for working with elements of linear algebra - points, lines, segments, planes, vectors and matrixes.
There are unit tests and a JSDoc documentation in the repository.

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





