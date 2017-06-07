/**
 * Linear Algebra Library
 * lalgebra.js (c) 2017 Boris Buimov
 * 
 * @version 1.3.0
 * @author Boris Buimov
 * @fileoverview This file contains functions and a class 
 * for working with elements of linear algebra - points, lines, 
 * segments, planes, spaces, vectors and matrixes.
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
   * @memberof lalgebra
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
   * Checks a value for number.
   *
   * @param {number} val A number
   * @return {boolean} Returns true if the value is a number
   * @throws The value is not a number.
   */
  function isNumber(val) {
    if(!(!isNaN(parseFloat(val)) && isFinite(val))) {
      throw errMsg("The value is not a number!", "la-004");
    }
    return true;
  }
  /**
   * Check a two-dimensional array.
   *
   * @param {Array} array A two-dimensional array
   * @return {bollean} Returns true if the array is okay
   * @throws Array is undefined.
   * @throws Array has zero dimension.
   * @throws Array has a different amount of elements in the rows.
   */
  function check2dArray(array) {
    var rows, cols, colsTmp, newArr;

    if(!(array instanceof Array)) {
      throw errMsg("Array is undefined!", "la-001");
    }
    rows = array.length;
    if(rows===0) {
      throw errMsg("Array has zero dimension!", "la-002");
    }
    
    for(var i=0; i<rows; i+=1) {
      cols = array[i].length;
      if(!colsTmp) colsTmp = cols;
      if(colsTmp!==cols) {
        throw errMsg("Array has a different amount of elements in the rows!", "la-003");
      }
      colsTmp = cols;
    }

    for(var i=0; i<rows; i+=1)
      for(var j=0; j<cols; j+=1) 
        if(!isNumber(array[i][j])) return false;

    return true;
  }
  /**
   * Checks the segment for actual points.
   *
   * @param {object} segment A segment with two points - p1, p2
   * @return {boolean} Returns true if successful
   * @throws Segment should have two points.
   */
  function checkSegment(segment) {

    if(!(segment["p1"] && segment["p2"])) {
      throw errMsg("Segment should have two points: p1 and p2!", "la-005");
    }
    var p1 = segment.p1, p2 = segment.p2;

    p1.x = parseFloat(p1.x); 
    p1.y = parseFloat(p1.y); 
    p1.z = parseFloat(p1.z);
    p2.x = parseFloat(p2.x); 
    p2.y = parseFloat(p2.y); 
    p2.z = parseFloat(p2.z);

    if(isNaN(p1.x) || isNaN(p1.y) || isNaN(p1.z) || isNaN(p2.x) || isNaN(p2.y) || isNaN(p2.z)) {
      return false;
    }
    return true;
  }
  /**
   * Copies a two-dimensional array.
   *
   * @param {Array} array A two-dimensional array
   * @return {Array} A copy of the two-dimensional array
   */
  function copy2dArray(array) {
    var rows, cols;

    if(!check2dArray(array)) return false;

    rows = array.length;
    cols = array[0].length;

    newArr = get2dArray(rows);

    for(var i=0; i<rows; i+=1)
      for(var j=0; j<cols; j+=1) 
        newArr[i][j] = array[i][j];

    return newArr;
  }
  /**
   * Creates a matrix.
   * 
   * @memberof lalgebra
   * @constructor
   * @this {Matrix}
   * @param {Array} array An array of elements for the matrix.
   */
  function Matrix(array) {
    var elems, rows, cols;

    /**
     * Initialises elements of the matrix.
     *
     * @memberof lalgebra.Matrix
     * @param {Array} array An array of elements for the matrix.
     */
    this.initElems = function(array) {
      elems = copy2dArray(array);
      rows = elems.length;
      cols = elems[0].length;
    };
    /**
     * Gets elements of the matrix.
     *
     * @memberof lalgebra.Matrix
     * @return {number} The elements of the matrix
     */
    this.getElems = function() {
      return copy2dArray(elems);
    };
    /**
     * Gets an amount of rows of the matrix.
     *
     * @memberof lalgebra.Matrix
     * @return {number} An amount of rows
     */
    this.getRows = function() {
      return rows;
    };
    /**
     * Gets an amount of columns of the matrix.
     *
     * @memberof lalgebra.Matrix
     * @return {number} An amount of columns
     */
    this.getCols = function() {
      return cols;
    };
    /**
     * Gets an element of the matrix.
     *
     * @memberof lalgebra.Matrix
     * @param {number} idxRow An index of the row
     * @param {number} idxCol An index of the column
     * @return {number} An element of the matrix
     */
    this.getElem = function(idxRow, idxCol) {
      if(inRange(idxRow, idxCol));

      return elems[idxRow][idxCol];
    };
    /**
     * Sets a value to the element of the matrix.
     *
     * @memberof lalgebra.Matrix
     * @param {number} val A value for the element 
     * @param {number} idxRow An index of the row
     * @param {number} idxCol An index of the column
     */
    this.setElem = function(val, idxRow, idxCol) {
      if(isNumber(val) && inRange(idxRow, idxCol)) {
        elems[idxRow][idxCol] = val;
      }
    };
    this.initElems(array);
    /**
     * Checks an index range.
     *
     * @param {number} idxRow An index of the row
     * @param {number} idxCol An index of the column
     * @return {boolean} Returns true if the value is in a range
     * @throws The index out of range.
     */
    function inRange(idxRow, idxCol) {
      if(idxRow>=rows || idxRow<0 || idxCol>=cols || idxCol<0) {
        throw errMsg("The index out of range!", "la-mx-001");
      }
      return true;
    }
  }
  /**
   * Displays the array elements into columns like in matrixes.
   * @memberof lalgebra.Matrix
   */
  Matrix.prototype.trace = function() {
    var rows = this.getRows();
    var cols = this.getCols();
    var getElem = this.getElem;
    var str;

    for(var i=0; i<rows; i+=1)
    {
      str = "["+String(getElem(i, 0));
      for(var j=1; j<cols; j+=1)
        str = str +","+ String(getElem(i, j));
      str = str + "]";
      console.log(str);
    }
  };
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
      throw errMsg("Attempt to multiply by an undefined matrix!", "la-mx-002");
    }
    var getElem1 = this.getElem;
    var getElem2 = matrix.getElem;

    var rowsMx1 = this.getRows();
    var colsMx1 = this.getCols();
    var rowsMx2 = matrix.getRows();
    var colsMx2 = matrix.getCols();

    if(colsMx1!==rowsMx2) { 
      throw errMsg("Attempt to multiply a matrix with dimensions "+rowsMx1+"x"+colsMx1+
                  " by a matrix with dimensions "+rowsMx2+"x"+colsMx2+"!", "la-mx-003");
    }
    var arrTmp = get2dArray(rowsMx1);

    for (var i=0; i<rowsMx1; i+=1)
      for (var j=0; j<colsMx2; j+=1)
      {
        arrTmp[i][j] = 0;
        for (var k=0; k<colsMx1; k+=1)
        arrTmp[i][j] += getElem1(i, k) * getElem2(k, j);
      }

    return new Matrix(arrTmp);
  };
  /**
   * Transposes the matrix.
   *
   * @memberof lalgebra.Matrix
   * @return {Matrix} A transposed matrix
   */
  Matrix.prototype.transpose = function() {
    var getElem = this.getElem;
    var rowsMx = this.getRows();
    var colsMx = this.getCols();

    var arrTmp = get2dArray(colsMx);

    for(var i=0; i<rowsMx; i+=1)
      for(var j=0; j<colsMx; j+=1)
        arrTmp[j][i] = getElem(i, j);

    return new Matrix(arrTmp);
  };
  /**
   * Copies the matrix.
   *
   * @memberof lalgebra.Matrix
   * @return {Matrix} A copy of the matrix
   */
  Matrix.prototype.getCopy = function() {
    var getElem = this.getElem;
    var rowsMx = this.getRows();
    var colsMx = this.getCols();

    var arrTmp = get2dArray(rowsMx);

    for(var i=0; i<rowsMx; i+=1)
      for(var j=0; j<colsMx; j+=1)
        arrTmp[i][j] = getElem(i, j);

    return new Matrix(arrTmp);
  };
  /**
   * Gets a submatrix without one row and one column.
   *
   * @memberof lalgebra.Matrix
   * @param {Matrix} idxRow The index of the row
   * @param {Matrix} idxCol The index of the column
   * @return {Matrix} A minor of the matrix
   */
  Matrix.prototype.getMinor = function(idxRow, idxCol) {
    var getElem = this.getElem;
    var rowsMx = this.getRows();
    var colsMx = this.getCols();

    var arrTmp = get2dArray(rowsMx-1);

    for(var i=0, ii=0; i<rowsMx; i+=1) {
      if(i!==idxRow) {
        for(var j=0, jj=0; j<colsMx; j+=1) {
          if(j!==idxCol) {
            arrTmp[ii][jj] = getElem(i, j);
            jj+=1;
          }
        }
        ii+=1;
      }
    }
    return new Matrix(arrTmp);
  };
  /**
   * Computes a determinant of the matrix.
   *
   * @memberof lalgebra.Matrix
   * @return {number} A determinant of the matrix
   * @throws Attempt to transpose a non quadratic matrix.
   */
  Matrix.prototype.determinant = function() {
    var getElem = this.getElem;
    var rowsMx = this.getRows();
    var colsMx = this.getCols();
    var det = 0;

    if(rowsMx!==colsMx) {
      throw errMsg("Attempt to transpose a non quadratic matrix!", "la-mx-004");
    }
    switch(rowsMx) {
      case 2: 
        det = getElem(0, 0) * getElem(1, 1) - getElem(0, 1) * getElem(1, 0);
        break;
      default: 
        for(var j=0; j<colsMx; j++)
          det = det + getElem(0, j) * Math.pow(-1, 2 + j) * this.getMinor(0, j).determinant();
    }

    return det;
  };    
  /**
   * Inverses the matrix.
   *
   * @memberof lalgebra.Matrix
   * @return {Matrix} An inversed matrix
   * @throws Inverse matrix does not exist.
   */
  Matrix.prototype.inverse = function() {
    var rowsMx = this.getRows();
    var colsMx = this.getCols();
    var det = this.determinant();
    
    if(det===0) {
      throw errMsg("Inverse matrix does not exist!", "la-mx-005");
    }

    var arrTmp = get2dArray(rowsMx);

    for(var i=0; i<rowsMx; i+=1)
      for(var j=0; j<colsMx; j+=1)
        arrTmp[i][j] = Math.pow(-1, 2 + i + j) * this.getMinor(i, j).determinant() / det;

    return (new Matrix(arrTmp)).transpose();
  };  
  /**
   * Normolizes the matrix of an object in homogeneous coordinates 
   * to get a back projection into the actual dimensional space.
   *
   * @memberof lalgebra.Matrix
   * @return {Matrix} An normolized matrix
   */
  Matrix.prototype.normolize = function() {
    var rows = this.getRows();
    var cols = this.getCols();
    var getElem = this.getElem;
    var last;

    var arrTmp = get2dArray(rows);
    
    for (var i=0; i<rows; i++) {
      for (var j=0; j<cols; j++) {
        last = getElem(i, cols-1);
        if(last!=0) arrTmp[i][j] = getElem(i, j) / last, i, j;
        else arrTmp[i][j] = 0;
      }
    }
    return new Matrix(arrTmp);
  };
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

    if(tripleProduct({"x":a2.x-a1.x, "y":a2.y-a1.y, "z":a2.z-a1.z}, 
      {"x":b2.x-b1.x, "y":b2.y-b1.y, "z":b2.z-b1.z}, 
      {"x":a2.x-b1.x, "y":a2.y-b1.y, "z":a2.z-b1.z})!=0)  {
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
    return  { "x": a.y*b.z - a.z*b.y,
              "y": a.z*b.x - a.x*b.z,
              "z": a.x*b.y - a.y*b.x };
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
    var ab = { "x":b.x-a.x, "y":b.y-a.y, "z":b.z-a.z }, 
        ac = { "x":c.x-a.x, "y":c.y-a.y, "z":c.z-a.z };
    var prod = vectorProduct(ab, ac);

    if(prod===0) {
      console.log("The segments are parallel!");
      return false;
    }
   
    return prod;  
  }
  /**
   * Computes two angles: 
   * first - between a vector projection on the plane y=0 and the z-axis,
   * second - between a vector and the y-axis.
   * It works for all quadrants.
   * 
   * @memberof lalgebra
   * @param {object} vector An end point (x,y,z) of the vector
   * @return {object} Two angles
   */
  function getAngles(vector) {
    var x = vector.x;
    var y = vector.y;
    var z = vector.z;
    var radianToDegree = lalgebra.radianToDegree;
    var angles = {};
    var k=1;
    
    if(x<0) k=-1;
    if(x!==0 || z!==0) {
      angles.a = radianToDegree(Math.acos(z/Math.sqrt(x*x+z*z)))*k;
    } else {
      angles.a = 0;  
    }
    angles.b = radianToDegree(Math.acos(y/Math.sqrt(x*x+y*y+z*z)));
    return angles;
  }  
  /**
   * Converts Cartesian coordinates into spherical coordinates. 
   * 
   * @memberof lalgebra
   * @param {object} cart An end point (x,y,z) of the vector 
   * @return {object} Spherical coordinates (r,a,b)
   */
  function cartesianToSpherical(cart) {
    var x, y, z, r, a, b;
    x = cart.x;
    y = cart.y;
    z = cart.z;

    r = Math.sqrt(x*x + y*y + z*z);
    if(r===0) { 
      a = b = 0;
    } else {
      b = Math.acos(z/r);
      if(x===0) {
        if(y<0) a = Math.PI*3/2;
        else a = Math.PI/2;
      } else {
        a = Math.atan(y/x);
        if(x<0) a += Math.PI;
      }
    }
    var sph = { "r":r, "a":radianToDegree(a), "b":radianToDegree(b) };
    return sph;
  }
  /**
   * Converts radians into degrees. 
   * 
   * @memberof lalgebra
   * @param {number} radian Radians
   * @return {number} Degrees
   */
  function radianToDegree(radian) {
    return radian*180/Math.PI;
  }
  /**
   * Converts degrees into radians. 
   * 
   * @memberof lalgebra
   * @param {number} degree Degrees
   * @return {number} Radians
   */
  function degreeToRadian(degree) {
    return degree/180*Math.PI;
  }
  return  { // API of Linear Algebra Library
            "errMsg": errMsg,
            "check2dArray": check2dArray,
            "checkSegment": checkSegment,
            "isNumber": isNumber,
            "Matrix": Matrix,
            "getIntersection": getIntersection,
            "vectorMagnitude": vectorMagnitude,
            "vectorProduct": vectorProduct,
            "scalarProduct": scalarProduct,
            "tripleProduct": tripleProduct,
            "normal": normal,
            "getAngles": getAngles,
            "cartesianToSpherical": cartesianToSpherical,
            "degreeToRadian": degreeToRadian,
            "radianToDegree": radianToDegree
          };
}());
