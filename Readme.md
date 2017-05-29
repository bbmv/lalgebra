# Linear Algebra Library
lalgebra.js (c) 2017 Boris Buimov
version 1.0.0

This library contains functions and a class for working with elements of linear algebra - points, lines, segments, planes, vectors and matrixes.
There are unit tests and a JSDoc documentation in the repository.

## API

``` lalgebra.Matrix.determinant() ```
- *Computes a determinant of the matrix.*

``` lalgebra.Matrix.getCopy() ```
- *Copies the matrix.*

``` lalgebra.Matrix.getMinor(idxRow, idxCol) ```
> *Gets a submatrix without one row and one column.*

``` lalgebra.Matrix.inverse() ```
> *Inverses the matrix.*

``` lalgebra.Matrix.multiply(matrix) ```
> *Multiplys two matrixes.*

``` lalgebra.Matrix.trace() ```
> *Displays the array elements into columns like in matrixes.*

``` lalgebra.Matrix.transpose() ```
> *Transposes the matrix.*

``` errMsg(massage, code) ```
> *Creates an object of Error and adds an error code to it.*

``` get2dArray(rows) ```
> *Creates an empty two-dimensional array.*

``` lalgebra.getIntersection(a1, a2, b1, b2) ```
> *Finds an intersection of two segments.*

``` lalgebra.normal(a, b, c) ```
> *Computes a normal to the plane.*

``` lalgebra.scalarProduct(a, b) ```
> *Computes a scalar (dot) product of two vectors.*

``` lalgebra.tripleProduct(a, b, c) ```
> *Computes a scalar triple product of three vectors.*

``` lalgebra.vectorMagnitude(a) ```
> *Computes a magnitude (length) of the vector.*

``` lalgebra.vectorProduct(a, b) ```
> *Computes a vector (cross) product of two vectors.*

