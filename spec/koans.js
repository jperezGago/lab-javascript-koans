context = describe;

describe("the JavaScript language", function() {

  describe("has different types and operators", function() {
    it("considers numbers to be equal to their string representation", function() {
      expect(1 == "1").toBeTruthy();
      expect(1 != "1").toBeFalsy();
    });

    it("knows that numbers and strings are not exactly the same", function() {
      expect(1 === "1").toBeFalsy();
      expect(1 !== "1").toBeTruthy();
    });

    it("joins parts as string when using the plus operator", function() {
      expect(1 + "a").toEqual("1a");
    });

    it("operates integers before joining the string", function() {
      expect(1 + 1 + "2").toEqual('22');
    });

    it("knows the type of the variable", function() {
      var x = 1;

      expect(typeof(x)).toEqual('number');
    });

    it("surprises me, NaN is not comparable with NaN", function() {
      expect(5 / "a").toEqual(5 / "a");
      expect(typeof(NaN)).toEqual("number");
      expect(isNaN(5 / "a")).toBeTruthy();
    });

    it("considers an empty string to be falsy", function() {
      expect("" == false).toBeTruthy();// Truthy or Falsy
      expect("" === false).toBeFalsy();// Truthy or Falsy
    });

    it("considers zero to be falsy", function() {
      expect(0 == false).toBeTruthy();// Truthy or Falsy
      expect(0 === false).toBeFalsy();// Truthy or Falsy
    });

    it("considers nulls to be falsy", function() {
      var x = null;
      var result;

      if (x) {
         result = true;
      } else {
         result = false;
      }

      expect(result == false).toBeTruthy();// Truthy or Falsy
      expect(null === false).toBeFalsy();// Truthy or Falsy
      expect(null == false).toBeFalsy();// Truthy or Falsy  * null es un "object" ?
    });

    it("knows the type of a function", function() {
      function x(){}

      expect(typeof(x)).toBe('function');
      expect(typeof(xxx)).toBe('undefined');
    });

    it("has arrays and they can contain anything inside", function() {
      var arr = [1,2,3,4];
      arr.push(5);
      arr[9] = 6;
      var matrix = [['a', 'b', 'c'], ['d', 'e', 'f'], ['g', 7, 8]];

      
      expect(arr[1]).toEqual(2);
      expect(arr[4]).toEqual(5);
      expect(arr[6]).toEqual(undefined);
      expect(arr[9]).toEqual(6);
      expect(matrix[0][2]).toEqual('c');
      
    });

    it("may contain functions inside arrays", function() {
      var arr = [1,2, function(arg){ return 3 + arg;}];

      expect(arr[2](1)).toEqual(4);
    });

    it("concatenate arrays - well, kind of", function() {
      var a = [1,2,3];
      var b = [4,5,6];

      expect(a + b).toEqual("1,2,34,5,6");
    });

    it("joins arrays and strings", function() {
      var a = [1,2,3];

      expect ("1" + a).toEqual("11,2,3");
      expect(a + "1").toEqual("1,2,31");
    });

    it("joins arrays and other things", function() {
      var a = [1,2,3];
      var b = ['x', 'y', 'z'];

      expect(1 + a).toEqual("11,2,3");
      expect(a + 1).toEqual("1,2,31");
      expect(1 + b).toEqual("1x,y,z");
      expect(true + a).toEqual("true1,2,3");
    });

    it("can't compare arrays", function() {
      var a = [1,2,3];
      var b = [1,2,3];

      expect(a == b).toBeFalsy();  // Truthy or Falsy
      expect(a === b).toBeFalsy(); // Truthy or Falsy
    });

    it("is not the same to compare by value than by reference ", function() {
      var a = [1,2,3];
      var b = [1,2,3];

      expect(a).toEqual(b);        // Jasmine toEqual compares by value
      expect(a).not.toBe(b);       // Jasmine toBe compares by reference
    });
  });


  describe("considers functions as first class citizens", function() {
    it("can declare named functions", function() {
      function example() {
        return 'some example';
      }

      expect(example()).toEqual("some example");
    });

    it("can declare anonymous functions", function() {
      var someVar = function(a, b) {
        return a + b;
      };

      expect(typeof(someVar)).toBe("function");
      expect(someVar(1,1)).toBe(2);
    });

    it("may return anything", function() {
      function example(arg) {
        return [arg, arg * 2, arg * 3];
      }

      var result = example(2);

      expect(result[1]).toEqual(4);
    });

    it("may return arrays that contains functions and so on", function() {
      function example() {
         // write the missing code here
          return [function(arg) { 
          return [0, 10] 
        } ]
      }

      expect(example()[0](1)[1]).toEqual(10);
    });

    it("doesn't care about the declaration order when they are named", function() {
      function exampleA() {
          return exampleB(1);
      }

      expect(exampleA()).toEqual(1);

      function exampleB(arg1) {
          return arg1;
      }
    });

    it("matters, the declaration order when they are anonymous", function() {
      var exampleA = function() {
          return exampleB(1);
      };

      expect(exampleA()).toEqual(1);

      var exampleB = function() {
          return arg1;
      };
    });





    it("can use optional parameters", function () {
      function example(a, b, c) {
        if (c) {
          return a + b + c;
        }
        return a + b;
      }

      expect(example(1, 1, 1)).toBe(3);
      expect(example(1, 1)).toBe(2);
    });

    it("anonymous functions are anonymous", function () {
      let x = function z() {
        return 1;
      };
      expect(typeof (z)).toEqual("undefined");
      expect(x()).toEqual(1);
    });

    it("passes primitive types as values (a copy) to functions",
      function () {
        function example(arg) {
          arg = "test!";
        }

        let x = 1;
        let y = "example";
        let z = true;

        example(x);
        expect(x).toEqual(1);

        example(y);
        expect(y).toEqual("example");

        example(z);
        expect(z).toEqual(true);
      });

    it("passes arrays by reference",
      function () {
        function example(arg) {
          arg[0] = 100;
        }

        let x = [1, 2, 3];

        example(x);
        expect(x).toEqual([100, 2, 3]);
      });

    it("passes objects by reference", function () {
      function example(arg) {
        arg.property = 'test';
      }

      let x = { property: 'cool!' };

      example(x);
      expect(x).toEqual({ property: 'test' });
    });

    it("may return a function as the result of invoking a function", function () {
      function add(a, b) {
        return a + b;
      }

      function example() {
        return add;
      }

      expect(example()(1, 2)).toEqual(3);
      let f = example();
      expect(f(2, 2)).toEqual(4);
    });

    it("can return closures as a function result", function () {
      function plus(amount) {
        return function (number) {
          return number + amount;
        };
      }

      let f = plus(5);

      expect(f(3)).toBe(8);
    });

    it("can have functions that receive other functions as arguments", function () {
      function add(a, b) {
        return a + b;
      }

      function example(arg) {
        return arg(2, 2) + 1;
      }

      expect(example(add)).toEqual(5);
    });

    it("may have functions as the input and the output", function () {
      function plus(originalFunction) {
        return function (arg1) {
          return originalFunction() + arg1;
        };
      }

      let f = plus(function () { return 1; });

      expect(f(2)).toBe(3);
    });
  });

  describe("has multiple ways to define and create objects", function () {
    it("can define object literals", function () {
      let obj = {
        name: 'bob',
        theName: function () {
          return this.name;
        }
      };

      expect(obj.theName()).toBe('bob');
    });

    it("can create properties dynamically", function () {
      let obj = {
        name: 'bob',
        surname: 'sponge'
      };
      obj.address = 'palm tree';

      expect(obj.address).toEqual('palm tree');
      expect(obj['address']).toEqual('palm tree');
      expect(obj['name']).toEqual('bob');
    });

    it("may define complex objects", function () {
      let user = {
        address: { street: "sesame" },
        friends: [
          { name: 'triki' }
        ]
      }
      // write the contents of the obj to make the satisfy the expectations:

      expect(user.address.street).toEqual('sesame');
      expect(user.friends[0].name).toEqual('triki');
    });

    it("has a pattern called, the Module Pattern", function () {
      function createObject() {
        let points = 0;

        return {
          addPoint: function () { ++points; },
          score: function () { return points; }
        };
      }

      let obj = createObject();
      obj.addPoint();

      expect(obj.score()).toEqual(1);
      expect(typeof (obj.points)).toEqual("undefined");
    });

    it("may create objects also with the module pattern", function () {
      function createObject(initialScore) {
        // write the code here
      }


      let obj = createObject(5, 'red');
      obj.incrementScoreIn(5);

      expect(obj.color).toEqual('red');
      expect(obj.points()).toEqual(10);

    });

    it("can define constructors", function () {
      function Obj() {
        let name = 'bob';

        this.theName = function () {
          return name;
        };
      }

      let obj = new Obj();
      expect(obj.theName()).toBe('bob');
    });

    it("may contain 'static' methods", function () {
      function Obj() {
        let name = 'bob';

        this.theName = function () {
          return name;
        };
      }

      Obj.someStaticMethod = function () {
        return 22;
      };

      expect(Obj.someStaticMethod()).toBe(22);
    });

    it("can define a factory", function () {
      function obj() {
        let self = {};
        let name = 'bob';

        self.theName = function () {
          return name;
        };

        return self;
      }

      let instance = obj();
      //expect(instance.theName()).toBe();
      //expect(instance.theName).not.toBe(obj().theName);
    });

    it("can create methods dynamically on an object instance", function () {
      let obj = {};
      let methodNames = ['meow', 'jump'];

      for (let i = 0; i < methodNames.length; i++) {
        obj[[methodNames[i]]] = function () { return 'it works'; };
      }

      //expect(obj.meow()).toEqual();
    });
  });
});
