/**
 * Linear Algebra Library
 * lalgebra.js (c) 2017 Boris Buimov
 * 
 * @version 1.0.0
 * @author Boris Buimov
 * @fileoverview This file contains functions and a class 
 * for working with elements of linear algebra - points, lines, 
 * segments, planes, vectors and matrixes.
 */
/**
 * @namespace
 * @name lalgebra
 * @return {object} An interface 
 */
var lalgebra = (function() {
  /**
   * Creates an object of Error and adds an error code to it.
   * 
   * @param {string} massage Error message
   * @param {string} code Error code
   * @return {Error} the error object with the message and code
   */
  function errMsg(massage, code) {
    var err = new Error(massage);
    err.code = code;
    return err;
  }
  /**
   * Creates an empty two-dimensional array.
   * 
   * @param {number} rows Amount of rows
   * @return {Array} The empty two-dimensional array
   */
  function get2dArray(rows) {
    var arr = [];
    for(var i=0; i<rows; i+=1)
      arr[i] = [];
    return arr;
  }
  /**
   * Creates a matrix.
   * 
   * @memberof lalgebra
   * @constructor
   * @this {Matrix}
   * @param {Array} array An array of elements for the matrix.
   * @property {Array} array An array of the matrix elements.
   * @property {number} rows An amount of the matrix rows.
   * @property {number} cols An amount of the matrix columns.
   * @throws Array is undefined.
   * @throws Array has zero dimension.
   * @throws Array has a different amount of elements in the rows.
   */
  function Matrix(array) {
    var rows, cols, colsTmp;

    if(!array) {
      throw errMsg("Array is undefined!", "va-mx-001");
    }
    rows = array.length;
    if(rows===0) {
      throw errMsg("Array has zero dimension!", "va-mx-002");
    }
    for(var i=0; i<rows; i+=1) {
      cols = array[i].length;
      if(!colsTmp) colsTmp = cols;
      if(colsTmp!==cols) {
        throw errMsg("Array has a different amount of elements in the rows!", "va-mx-003");
      }
      colsTmp = cols;
    }
    this.array = array;
    this.rows = rows;
    this.cols = cols;
  }
  /**
   * Displays the array elements into columns like in matrixes.
   * @memberof lalgebra.Matrix
   */
  Matrix.prototype.trace = function() {
    var str; 
    for(var i=0; i<this.rows; i+=1)
    {
      str = "["+String(this.array[i][0]);
      for(var j=1; j<this.cols; j+=1)
        str = str +","+ String(this.array[i][j]);
      str = str + "]";
      console.log(str);
    }
  }
  /**
   * Multiplys two matrixes.
   *
   * @memberof lalgebra.Matrix
   * @param {Matrix} matrix Second matrix
   * @return {Matrix} A result of the multiplication
   * @throws Attempt to multiply by an undefined matrix.
   * @throws Attempt to multiply matrixes with inappropriate dimensions.
   */
  Matrix.prototype.multiply = function(matrix) { 
    if(!(matrix instanceof Matrix)) {
      throw errMsg("Attempt to multiply by an undefined matrix!", "va-mx-004");
    }
    if(this.cols!==matrix.rows) { 
      throw errMsg("Attempt multiplied a matrix with dimensions "+this.rows+"x"+this.cols+
                  " by a matrix with dimensions "+matrix.rows+"x"+matrix.cols+"!", "va-mx-005");
    }
    var arrTmp = get2dArray(this.rows);

    for (var i=0; i<this.rows; i+=1)
      for (var j=0; j<matrix.cols; j+=1)
      {
        arrTmp[i][j] = 0;
        for (var k=0; k<this.cols; k+=1)
        arrTmp[i][j] += this.array[i][k] * matrix.array[k][j];
      }

    return new Matrix(arrTmp);
  }
  /**
   * Transposes the matrix.
   *
   * @memberof lalgebra.Matrix
   * @return {Matrix} A transposed matrix
   */
  Matrix.prototype.transpose = function() {
    var arrTmp = get2dArray(this.cols);

    for(var i=0; i<this.rows; i+=1)
      for(var j=0; j<this.cols; j+=1)
        arrTmp[j][i] = this.array[i][j];

    return new Matrix(arrTmp);
  }
  /**
   * Copies the matrix.
   *
   * @memberof lalgebra.Matrix
   * @return {Matrix} A copy of the matrix
   */
  Matrix.prototype.getCopy = function() {
    var arrTmp = get2dArray(this.rows);

    for(var i=0; i<this.rows; i+=1)
      for(var j=0; j<this.cols; j+=1)
        arrTmp[i][j] = this.array[i][j];

    return new Matrix(arrTmp);
  }
  /**
   * Gets a submatrix without one row and one column.
   *
   * @memberof lalgebra.Matrix
   * @param {Matrix} idxRow The index of the row
   * @param {Matrix} idxCol The index of the column
   * @return {Matrix} An minor
   */
  Matrix.prototype.getMinor = function(idxRow, idxCol) {
    var tmpMatrix = this.getCopy();
    tmpMatrix.array.splice(idxRow, 1);
    tmpMatrix.rows -= 1;
    tmpMatrix.cols -= 1;

    for(var i=0; i<tmpMatrix.rows; i++) {
      tmpMatrix.array[i].splice(idxCol, 1);
    }
    return tmpMatrix;
  }
  /**
   * Computes a determinant of the matrix.
   *
   * @memberof lalgebra.Matrix
   * @return {number} A determinant of the matrix
   * @throws Attempt to transpose a non quadratic matrix.
   */
  Matrix.prototype.determinant = function() {
    var det = 0;

    if(this.rows!==this.cols) {
      throw errMsg("Attempt to transpose a non quadratic matrix!", "va-mx-007");
    }
    switch(this.rows) {
      case 2: 
        det = this.array[0][0] * this.array[1][1] - this.array[0][1] * this.array[1][0];
        break;
      default: 
        for(var j=0; j<this.cols; j++)
          det = det + this.array[0][j] * Math.pow(-1, 2 + j) * this.getMinor(0, j).determinant();
    }

    return det;
  }     
  /**
   * Inverses the matrix.
   *
   * @memberof lalgebra.Matrix
   * @return {Matrix} An inversed matrix
   * @throws Attempt to inverse a non quadratic matrix.
   * @throws Inverse matrix does not exist.
   */
  Matrix.prototype.inverse = function() {
    if(this.rows!==this.cols) {
      throw errMsg("Attempt to inverse a non quadratic matrix!", "va-mx-008");
    }
        
    var det = this.determinant();
    
    if(det===0) {
      throw errMsg("Inverse matrix does not exist!", "va-mx-009");
    }

    var arrTmp = get2dArray(this.rows);

    for(var i=0; i<this.rows; i+=1)
      for(var j=0; j<this.cols; j+=1)
        arrTmp[i][j] = Math.pow(-1, 2 + i + j) * this.getMinor(i, j).determinant() / det;

    return (new Matrix(arrTmp)).transpose();
  }    
  /**
   * Finds an intersection of two segments.
   *
   * @memberof lalgebra
   * @param {object} a1 First point (x,y,z) of first segment (a)
   * @param {object} a2 Second point (x,y,z) of first segment (a)
   * @param {object} b1 First point (x,y,z) of second segment (b)
   * @param {object} b2 Second point (x,y,z) of second segment (b)
   * @return {object} An intersection of two segments (x,y,z)
   */
  function getIntersection(a1, a2, b1, b2) {
    var inter = {};

    if(tripleProduct({x:a2.x-a1.x, y:a2.y-a1.y, z:a2.z-a1.z}, 
      {x:b2.x-b1.x, y:b2.y-b1.y, z:b2.z-b1.z}, 
      {x:a2.x-b1.x, y:a2.y-b1.y, z:a2.z-b1.z})!=0)  {
      console.log("Отрезки в разных плоскостях!");
      return false;
    }

    var d1 = (a2.x-a1.x)*(b2.y-b1.y)-(a2.y-a1.y)*(b2.x-b1.x);
    var d2 = (b2.y-b1.y)*(a2.x-a1.x)-(b2.x-b1.x)*(a2.y-a1.y);
    if(d1===0 || d2===0) {
      console.log("Прямые параллельны!");
      return false;
    }

    var t1 = ((b1.x-a1.x)*(b2.y-b1.y) - (b1.y-a1.y)*(b2.x-b1.x)) / d1;
    var t2 = ((b1.x-a1.x)*(a2.y-a1.y) - (b1.y-a1.y)*(a2.x-a1.x)) / d2;
    
    if(t1<0 || t1>1 || t2<0 || t2>1) {
      console.log("The segments are not intersection!");
      return false;
    }
  console.log(t1 + "  " +t2);

    inter.x = Math.round(b1.x+(b2.x-b1.x)*t2);
    inter.y = Math.round(b1.y+(b2.y-b1.y)*t2);
    inter.z = Math.round(b1.z+(b2.z-b1.z)*t2);

    return inter;
  }
  /**
   * Computes a magnitude (length) of the vector.
   *
   * @memberof lalgebra
   * @param {object} a The vector
   * @return {number} A magnitude of the vector
   */
  function vectorMagnitude(a) {
    return  Math.sqrt(a.x*a.x + a.y*a.y + a.z*a.z);
  }
  /**
   * Computes a vector (cross) product of two vectors.
   *
   * @memberof lalgebra
   * @param {object} a First vector
   * @param {object} b Second vector
   * @return {object} A vector product of two vectors
   */
  function vectorProduct(a, b) {
    return  { x: a.y*b.z - a.z*b.y,
              y: a.z*b.x - a.x*b.z,
              z: a.x*b.y - a.y*b.x };
  }
  /**
   * Computes a scalar (dot) product of two vectors.
   *
   * @memberof lalgebra
   * @param {object} a First vector
   * @param {object} b Second vector
   * @return {number} A scalar product of two vectors
   */
  function scalarProduct(a, b) {
    return  a.x*b.x + a.y*b.y + a.z*b.z;
  }
  /**
   * Computes a scalar triple product of three vectors.
   *
   * @memberof lalgebra
   * @param {object} a First vector
   * @param {object} b Second vector
   * @param {object} c Third vector
   * @return {number} A scalar triple product of two vectors
   */
  function tripleProduct(a, b, c) {
    return  scalarProduct(vectorProduct(a, b), c);
  }
  /**
   * Computes a normal to the plane.
   * 
   * @memberof lalgebra
   * @param {object} a First point
   * @param {object} b Second point
   * @param {object} c Third point
   * @return {object} A normal
   */
  function normal(a, b, c) {
    var ab = { x:b.x-a.x, y:b.y-a.y, z:b.z-a.z }, 
        ac = { x:c.x-a.x, y:c.y-a.y, z:c.z-a.z };
    var prod = vectorProduct(ab, ac);

    if(prod===0) {
      console.log("The segments are parallel!");
      return false;
    }
   
    return prod;  
  }
  return  { // API of Linear Algebra Library
            "Matrix": Matrix,
            "getIntersection": getIntersection,
            "vectorMagnitude": vectorMagnitude,
            "vectorProduct": vectorProduct,
            "scalarProduct": scalarProduct,
            "tripleProduct": tripleProduct,
            "normal": normal
          };
}());
