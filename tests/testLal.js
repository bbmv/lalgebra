describe("Matrix", function() {
  var Matrix = lalgebra.Matrix;
  var array = 
    [[1, 0, 0],
     [0, 0, 0],
     [1, 1, 1],
     [0, 0, 1]];
  //------------------------------------------
  describe("constructor( )", function() {
    it("Sets up matrix elements", function() {
      var mx = new Matrix(array);
      var rows = array.length;
      var cols = array[0].length;
      assert.deepEqual(mx.getElems(), array);
      assert.equal(mx.getRows(), rows);
      assert.equal(mx.getCols(), cols);
    });
    //------------------------------------------
    describe("throws", function() {
      it("Array is undefined!", function() {
        var array;
        var errCode;
        try {
          var mx = new Matrix(array);
        } catch(err) {
          errCode = err.code;
        }
        assert.equal(errCode, "la-001");
      });
      it("Array has zero dimension!", function() {
        var array = [];
        var errCode;
        try {
          var mx = new Matrix(array);
        } catch(err) {
          errCode = err.code;
        }
        assert.equal(errCode, "la-002");
      });
      it("Array has a different amount of elements in the rows!", function() {
        var array = 
          [[1, 0, 0],
           [0, 0, 0],
           [1, 1],
           [0, 0, 1]];
        var errCode;
        try {
          var mx = new Matrix(array);
        } catch(err) {
          errCode = err.code;
        }
        assert.equal(errCode, "la-003");
      });
    });
});
  //------------------------------------------
  describe("getElem( )", function() {
    it("Gets an element of the matrix", function() {
      var mx = new Matrix(array);
      var result = mx.getElem(1, 1);
      var expected = 0;
      assert.equal(result, expected);
    });
  });
  //------------------------------------------
  describe("setElem( )", function() {
    it("Sets a value to the element of the matrix", function() {
      var mx = new Matrix(array);
      var expected = 5;
      mx.setElem(expected, 1, 1);
      var result = mx.getElem(1, 1);
      assert.equal(result, expected);
    });
    //------------------------------------------
    describe("throws", function() {
      it("The value is not a number!", function() {
        var errCode;
        var mx = new Matrix(array);
        try {
          mx.setElem("s", 0, 0);
        } catch(err) {
          errCode = err.code;
        }
        assert.equal(errCode, "la-004");
      });
      it("The index out of range!", function() {
        var errCode;
        var mx = new Matrix(array);
        try {
          mx.setElem(0, 10, 0);
        } catch(err) {
          errCode = err.code;
        }
        assert.equal(errCode, "la-mx-001");
      });
    });
  });
  //------------------------------------------
  describe("multiply( )", function() {
    var array1 = 
      [[1, 0, 0],
       [0, 0, 0],
       [1, 1, 1],
       [0, 0, 1]];
    it("Multiplys two matrixes", function() {
      var array2 = 
        [[1, 0, 0],
         [0, 1, 0],
         [0, 0, 1]];
      var mx1 = new Matrix(array1);
      var mx2 = new Matrix(array2);
      var result = mx1.multiply(mx2);
      assert.deepEqual(result.getElems(), array1);
    });
    //------------------------------------------
    describe("throws", function() {
      it("Attempt to multiply by an undefined matrix!", function() {
        var errCode;
        try {
          var mx1 = new Matrix(array1);
          var mx2;
          var result = mx1.multiply(mx2);
        } catch(err) {
          errCode = err.code;
        }
        assert.equal(errCode, "la-mx-002");
      });
      it("Attempt to multiply matrixes with inappropriate dimensions!", function() {
        var array2 = 
          [[1, 0, 0],
           [0, 1, 0],
           [0, 1, 0],
           [0, 0, 1]];
        var errCode;
        try {
          var mx1 = new Matrix(array1);
          var mx2 = new Matrix(array2);
          var result = mx1.multiply(mx2);
        } catch(err) {
          errCode = err.code;
        }
        assert.equal(errCode, "la-mx-003");
      });
    });
  });
  //------------------------------------------
  describe("transpose( )", function() {
    var array1 = 
      [[1, 0, 0],
       [0, 0, 0],
       [1, 1, 1],
       [0, 0, 1]];
    var transposedArray = 
      [[1, 0, 1, 0],
       [0, 0, 1, 0],
       [0, 0, 1, 1]];
    it("Transposes the matrix", function() {
      var mx = (new Matrix(array1)).transpose();
      assert.deepEqual(mx.getElems(), transposedArray);
    });
  });
  //------------------------------------------
  describe("inverse( )", function() {
    var array1 = 
      [[1, 0, 1, 1],
       [0, 1, 0, 1],
       [1, 1, 1, 1],
       [0, 0, 1, 1]];
    var unityArray = 
      [[1, 0, 0, 0],
       [0, 1, 0, 0],
       [0, 0, 1, 0],
       [0, 0, 0, 1]];
    it("Inverses the matrix", function() {
      var mx1 = (new Matrix(array1)).inverse();
      var mx2 = new Matrix(array1);
      var result = mx1.multiply(mx2);
      assert.deepEqual(result.getElems(), unityArray);
    });
    //------------------------------------------
    describe("throws", function() {
      it("Inverse matrix does not exist!", function() {
        var array = 
          [[0, 0, 0],
           [0, 0, 0],
           [0, 0, 0]];
        var errCode;
        try {
          var mx = new Matrix(array);
          var result = mx.inverse();
        } catch(err) {
          errCode = err.code;
        }
        assert.equal(errCode, "la-mx-005");
      });
    });
  });
  //------------------------------------------
  describe("getCopy( )", function() {
    var originalArray = 
      [[1, 0, 0],
       [0, 0, 0],
       [1, 1, 1],
       [0, 0, 1]];
    it("Copies the matrix", function() {
      var mx = (new Matrix(originalArray)).getCopy();
      assert.deepEqual(mx.getElems(), originalArray);
    });
  });
  //------------------------------------------
  describe("getMinor( )", function() {
    var originalArray = 
      [[1, 0, 0],
       [0, 0, 0],
       [1, 1, 1],
       [0, 0, 1]];
    var minor = 
      [[1, 0],
       [1, 1],
       [0, 1]];
    it("Gets a submatrix without one row and one column", function() {
      var mx = (new Matrix(originalArray)).getMinor(1,1);
      assert.deepEqual(mx.getElems(), minor);
    });
  });
  //------------------------------------------
  describe("determinant( )", function() {
    var array = 
      [[1, 0, 1, 1],
       [0, 1, 0, 1],
       [1, 1, 1, 1],
       [0, 0, 1, 1]];
    var masterDet = 1;
    it("Computes a determinant of the matrix", function() {
      var determinant = (new Matrix(array)).determinant();
      assert.equal(determinant, masterDet);
    });
    //------------------------------------------
    describe("throws", function() {
      it("Attempt to transpose a non quadratic matrix!", function() {
        var array = 
          [[1, 0, 0],
           [0, 1, 0],
           [0, 1, 0],
           [0, 0, 1]];
        var errCode;
        try {
          var mx = new Matrix(array);
          var result = mx.determinant();
        } catch(err) {
          errCode = err.code;
        }
        assert.equal(errCode, "la-mx-004");
      });
    });
  });
});
//-------------------------------------------------------------------
//-------------------------------------------------------------------
describe("Vector operations", function() {
  //------------------------------------------
  describe("getIntersection( )", function() { 
    it("Finds an intersection of two segments", function() { 
      var a1 = {x:0, y:0, z:0};
      var a2 = {x:2, y:2, z:0};
      var b1 = {x:2, y:0, z:0};
      var b2 = {x:0, y:2, z:0};
      var intersectionPoint = {x:1, y:1, z:0};
      console.log(intersectionPoint);
      var resultPoint = lalgebra.getIntersection(a1, a2, b1, b2);
      assert.deepEqual(resultPoint, intersectionPoint);
    });
  });
  //------------------------------------------
  describe("vectorMagnitude( )", function() { 
    it("Computes a magnitude (length) of the vector", function() { 
      var a = {x:0, y:0, z:0};
      var vectorMagnitude = 0;
      var resultVectorMagnitude = lalgebra.vectorMagnitude(a);
      assert.equal(resultVectorMagnitude, vectorMagnitude);
    });
  });
  //------------------------------------------
  describe("vectorProduct( )", function() { 
    it("Computes a vector (cross) product of two vectors", function() { 
      var a = {x:1, y:0, z:0};
      var b = {x:2, y:2, z:0};
      var vectorProduct = {x:0, y:0, z:2};
      var resultVectorProduct = lalgebra.vectorProduct(a, b);
      assert.deepEqual(resultVectorProduct, vectorProduct);
    });
  });
  //------------------------------------------
  describe("scalarProduct( )", function() { 
    it("Computes a scalar (dot) product of two vectors", function() { 
      var a = {x:1, y:0, z:0};
      var b = {x:2, y:2, z:0};
      var scalarProduct = 2;
      var resultScalarProduct = lalgebra.scalarProduct(a, b);
      assert.equal(resultScalarProduct, scalarProduct);
    });
  });
  //------------------------------------------
  describe("tripleProduct( )", function() { 
    it("Computes a scalar triple product of three vectors", function() { 
      var a = {x:0, y:1, z:0};
      var b = {x:0, y:0, z:2};
      var c = {x:2, y:0, z:0};
      var tripleProduct = 4;
      var resultTripleProduct = lalgebra.tripleProduct(a, b, c);
      assert.equal(resultTripleProduct, tripleProduct);
    });
  });
  //------------------------------------------
  describe("normal( )", function() { 
    it("Computes a normal to the plane", function() { 
      var a = {x:0, y:0, z:0};
      var b = {x:1, y:0, z:0};
      var c = {x:0, y:1, z:0};
      var normal = {x:0, y:0, z:1};
      var resultNormal = lalgebra.normal(a, b, c);
      assert.deepEqual(resultNormal, normal);
    });
  });
});

