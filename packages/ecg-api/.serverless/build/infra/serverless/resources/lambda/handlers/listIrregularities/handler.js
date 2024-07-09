"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// ../../node_modules/dynamoose-utils/dist/wildcard_allowed_check.js
var require_wildcard_allowed_check = __commonJS({
  "../../node_modules/dynamoose-utils/dist/wildcard_allowed_check.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.default = (saveUnknown, checkKey, settings = { "splitString": ".", "prefixesDisallowed": true }) => {
      if (Array.isArray(saveUnknown)) {
        return Boolean(saveUnknown.find((key) => {
          const keyParts = key.split(settings.splitString);
          const checkKeyParts = checkKey.split(settings.splitString);
          let index = 0, keyPart = keyParts[0];
          for (let i = 0; i < checkKeyParts.length; i++) {
            if (keyPart === "**") {
              return true;
            }
            if (keyPart !== "*" && checkKeyParts[i] !== keyPart) {
              return false;
            }
            keyPart = keyParts[++index];
          }
          if (!settings.prefixesDisallowed && keyPart) {
            return false;
          }
          return true;
        }));
      } else {
        return saveUnknown;
      }
    };
  }
});

// ../../node_modules/dynamoose-utils/dist/Error.js
var require_Error = __commonJS({
  "../../node_modules/dynamoose-utils/dist/Error.js"(exports2, module2) {
    "use strict";
    var makeError = (defaultMessage, errorName) => class CustomError extends Error {
      constructor(message) {
        super();
        this.name = errorName;
        this.message = message || defaultMessage;
        return this;
      }
    };
    module2.exports = {
      "MissingSchemaError": makeError("Missing Schema", "MissingSchemaError"),
      "InvalidParameter": makeError("Invalid Parameter", "InvalidParameter"),
      "InvalidParameterType": makeError("Invalid Parameter Type", "InvalidParameterType"),
      "UnknownAttribute": makeError("The attribute can not be found", "UnknownAttribute"),
      "InvalidType": makeError("Invalid Type", "InvalidType"),
      "WaitForActiveTimeout": makeError("Waiting for table to be active has timed out", "WaitForActiveTimeout"),
      "TypeMismatch": makeError("There was a type mismatch between the schema and document", "TypeMismatch"),
      "InvalidFilterComparison": makeError("That filter comparison is invalid", "InvalidFilterComparison"),
      "ValidationError": makeError("There was an validation error with the document", "ValidationError"),
      "OtherError": makeError("There was an error", "OtherError")
    };
  }
});

// ../../node_modules/dynamoose-utils/dist/index.js
var require_dist = __commonJS({
  "../../node_modules/dynamoose-utils/dist/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.CustomError = exports2.wildcard_allowed_check = void 0;
    var wildcard_allowed_check_1 = require_wildcard_allowed_check();
    exports2.wildcard_allowed_check = wildcard_allowed_check_1.default;
    var CustomError = require_Error();
    exports2.CustomError = CustomError;
  }
});

// ../../node_modules/dynamoose/dist/Error.js
var require_Error2 = __commonJS({
  "../../node_modules/dynamoose/dist/Error.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var dynamoose_utils_1 = require_dist();
    exports2.default = dynamoose_utils_1.CustomError;
  }
});

// ../../node_modules/dynamoose/dist/utils/combine_objects.js
var require_combine_objects = __commonJS({
  "../../node_modules/dynamoose/dist/utils/combine_objects.js"(exports2, module2) {
    "use strict";
    var main2 = (...args) => {
      let returnObject;
      args.forEach((arg, index) => {
        if (typeof arg !== "object") {
          throw new Error("You can only pass objects into combine_objects method.");
        }
        if (index === 0) {
          returnObject = arg;
        } else {
          if (Array.isArray(returnObject) !== Array.isArray(arg)) {
            throw new Error("You can't mix value types for the combine_objects method.");
          }
          if (Array.isArray(arg)) {
            returnObject = [...returnObject, ...arg];
          } else {
            Object.keys(arg).forEach((key) => {
              if (typeof returnObject[key] === "object" && typeof arg[key] === "object" && returnObject[key] !== null) {
                returnObject[key] = main2(returnObject[key], arg[key]);
              } else if (!Object.prototype.hasOwnProperty.call(returnObject, key)) {
                returnObject[key] = arg[key];
              }
            });
          }
        }
      });
      return returnObject;
    };
    module2.exports = main2;
  }
});

// ../../node_modules/dynamoose/dist/utils/keyBy.js
var require_keyBy = __commonJS({
  "../../node_modules/dynamoose/dist/utils/keyBy.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.default = (array, key) => {
      if (!array) {
        return {};
      }
      return array.reduce((result, item) => Object.assign(Object.assign({}, result), { [key ? item[key] : item]: item }), {});
    };
  }
});

// ../../node_modules/dynamoose/dist/utils/merge_objects.js
var require_merge_objects = __commonJS({
  "../../node_modules/dynamoose/dist/utils/merge_objects.js"(exports2, module2) {
    "use strict";
    var keyBy_1 = require_keyBy();
    var MergeObjectsCombineMethod;
    (function(MergeObjectsCombineMethod2) {
      MergeObjectsCombineMethod2["ObjectCombine"] = "object_combine";
      MergeObjectsCombineMethod2["ArrayMerge"] = "array_merge";
      MergeObjectsCombineMethod2["ArrayMergeNewArray"] = "array_merge_new_array";
    })(MergeObjectsCombineMethod || (MergeObjectsCombineMethod = {}));
    var main2 = (settings = { "combineMethod": MergeObjectsCombineMethod.ArrayMerge }) => (...args) => {
      let returnObject2;
      args.forEach((arg, index) => {
        if (typeof arg !== "object") {
          throw new Error("You can only pass objects into merge_objects method.");
        }
        if (index === 0) {
          returnObject2 = arg;
        } else {
          if (Array.isArray(returnObject2) !== Array.isArray(arg)) {
            throw new Error("You can't mix value types for the merge_objects method.");
          }
          Object.keys(arg).forEach((key) => {
            if (typeof returnObject2[key] === "object" && typeof arg[key] === "object" && !Array.isArray(returnObject2[key]) && !Array.isArray(arg[key]) && returnObject2[key] !== null) {
              if (settings.combineMethod === MergeObjectsCombineMethod.ObjectCombine) {
                returnObject2[key] = Object.assign(Object.assign({}, returnObject2[key]), arg[key]);
              } else if (settings.combineMethod === MergeObjectsCombineMethod.ArrayMergeNewArray) {
                returnObject2[key] = main2(settings)(returnObject2[key], arg[key]);
              } else {
                returnObject2[key] = [returnObject2[key], arg[key]];
              }
            } else if (Array.isArray(returnObject2[key]) && Array.isArray(arg[key])) {
              returnObject2[key] = settings.arrayItemsMerger ? settings.arrayItemsMerger(returnObject2[key], arg[key]) : [...returnObject2[key], ...arg[key]];
            } else if (Array.isArray(returnObject2[key])) {
              returnObject2[key] = [...returnObject2[key], arg[key]];
            } else if (returnObject2[key]) {
              if (settings.combineMethod === MergeObjectsCombineMethod.ArrayMergeNewArray) {
                returnObject2[key] = [returnObject2[key], arg[key]];
              } else if (typeof returnObject2[key] === "number") {
                returnObject2[key] += arg[key];
              } else {
                returnObject2[key] = arg[key];
              }
            } else {
              returnObject2[key] = arg[key];
            }
          });
        }
      });
      return returnObject2;
    };
    var schemaAttributesMerger = (target, source) => {
      if (!target.length && !source.length) {
        return [];
      }
      const firstElement = target[0] || source[0];
      const keyByIteratee = "AttributeName" in firstElement ? "AttributeName" : "IndexName";
      const targetKeyBy = (0, keyBy_1.default)(target, keyByIteratee);
      const sourceKeyBy = (0, keyBy_1.default)(source, keyByIteratee);
      const merged = main2({ "combineMethod": MergeObjectsCombineMethod.ObjectCombine })({}, targetKeyBy, sourceKeyBy);
      return Object.values(merged);
    };
    var returnObject = main2();
    returnObject.main = main2;
    returnObject.MergeObjectsCombineMethod = MergeObjectsCombineMethod;
    returnObject.schemaAttributesMerger = schemaAttributesMerger;
    module2.exports = returnObject;
  }
});

// ../../node_modules/dynamoose/dist/utils/timeout.js
var require_timeout = __commonJS({
  "../../node_modules/dynamoose/dist/utils/timeout.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.default = (time) => {
      const ms = typeof time === "string" ? parseInt(time) : time;
      return new Promise((resolve, reject) => {
        if (isNaN(ms)) {
          reject(`Invalid milliseconds passed in: ${time}`);
        }
        setTimeout(() => resolve(), ms);
      });
    };
  }
});

// ../../node_modules/dynamoose/dist/utils/capitalize_first_letter.js
var require_capitalize_first_letter = __commonJS({
  "../../node_modules/dynamoose/dist/utils/capitalize_first_letter.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.default = (str) => `${str[0].toUpperCase()}${str.slice(1)}`;
  }
});

// ../../node_modules/dynamoose/dist/utils/set_immediate_promise.js
var require_set_immediate_promise = __commonJS({
  "../../node_modules/dynamoose/dist/utils/set_immediate_promise.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.default = () => new Promise((resolve) => setImmediate(resolve));
  }
});

// ../../node_modules/js-object-utilities/dist/get.js
var require_get = __commonJS({
  "../../node_modules/js-object-utilities/dist/get.js"(exports2, module2) {
    "use strict";
    module2.exports = (object, key) => {
      const keyParts = key.split(".");
      let returnValue = object;
      for (let i = 0; i < keyParts.length; i++) {
        const part = keyParts[i];
        if (returnValue) {
          returnValue = returnValue[part];
        } else {
          break;
        }
      }
      return returnValue;
    };
  }
});

// ../../node_modules/js-object-utilities/dist/set.js
var require_set = __commonJS({
  "../../node_modules/js-object-utilities/dist/set.js"(exports2, module2) {
    "use strict";
    module2.exports = (object, key, value) => {
      const keyParts = key.split(".");
      let objectRef = object;
      keyParts.forEach((part, index) => {
        if (keyParts.length - 1 === index) {
          return;
        }
        if (!objectRef[part]) {
          objectRef[part] = {};
        }
        objectRef = objectRef[part];
      });
      const finalKey = keyParts[keyParts.length - 1];
      if (finalKey !== "__proto__" && finalKey !== "constructor") {
        objectRef[finalKey] = value;
      }
      return object;
    };
  }
});

// ../../node_modules/js-object-utilities/dist/delete.js
var require_delete = __commonJS({
  "../../node_modules/js-object-utilities/dist/delete.js"(exports2, module2) {
    "use strict";
    module2.exports = (object, keys) => {
      (Array.isArray(keys) ? keys : [keys]).forEach((key) => {
        const keyParts = (typeof key === "number" ? `${key}` : key).split(".");
        if (keyParts.length === 1) {
          if (Array.isArray(object)) {
            object.splice(parseInt(keyParts[0]), 1);
          } else {
            delete object[keyParts[0]];
          }
        } else {
          const lastKey = keyParts.pop();
          const nextLastKey = keyParts.pop();
          const nextLastObj = keyParts.reduce((a, key2) => a[key2], object);
          if (Array.isArray(nextLastObj[nextLastKey])) {
            nextLastObj[nextLastKey].splice(parseInt(lastKey), 1);
          } else if (typeof nextLastObj[nextLastKey] !== "undefined" && nextLastObj[nextLastKey] !== null) {
            delete nextLastObj[nextLastKey][lastKey];
          }
        }
      });
      return object;
    };
  }
});

// ../../node_modules/js-object-utilities/dist/pick.js
var require_pick = __commonJS({
  "../../node_modules/js-object-utilities/dist/pick.js"(exports2, module2) {
    "use strict";
    var get = require_get();
    var set = require_set();
    module2.exports = (object, keys) => {
      return keys.reduce((obj, key) => {
        const value = get(object, key);
        const isValueUndefined = typeof value === "undefined" || value === null;
        if (!isValueUndefined) {
          set(obj, key, value);
        }
        return obj;
      }, {});
    };
  }
});

// ../../node_modules/js-object-utilities/dist/entries.js
var require_entries = __commonJS({
  "../../node_modules/js-object-utilities/dist/entries.js"(exports2, module2) {
    "use strict";
    var _1 = require_dist2();
    var main2 = (object, existingKey = "") => {
      return Object.entries(object).reduce((accumulator, entry) => {
        const [key, value] = entry;
        const keyWithExisting = `${existingKey ? `${existingKey}.` : ""}${key}`;
        accumulator.push([keyWithExisting, value]);
        if (typeof value === "object" && !(value instanceof Buffer) && value !== null && !(0, _1.isCircular)(value, keyWithExisting)) {
          accumulator.push(...main2(value, keyWithExisting));
        }
        return accumulator;
      }, []);
    };
    module2.exports = main2;
  }
});

// ../../node_modules/js-object-utilities/dist/keys.js
var require_keys = __commonJS({
  "../../node_modules/js-object-utilities/dist/keys.js"(exports2, module2) {
    "use strict";
    var entries = require_entries();
    module2.exports = (object, existingKey = "") => entries(object, existingKey).map((a) => a[0]);
  }
});

// ../../node_modules/js-object-utilities/dist/equals.js
var require_equals = __commonJS({
  "../../node_modules/js-object-utilities/dist/equals.js"(exports2, module2) {
    "use strict";
    var entries = require_entries();
    module2.exports = (a, b) => {
      if (typeof a !== "object" || typeof b !== "object") {
        return a === b;
      }
      const aEntries = entries(a);
      const bEntries = entries(b);
      const bEntriesMap = bEntries.reduce((res, value) => {
        const [key, val] = value;
        res[key] = val;
        return res;
      }, {});
      return aEntries.length === bEntries.length && aEntries.every((entry) => {
        return typeof entry[1] === "object" || bEntriesMap[entry[0]] === entry[1];
      });
    };
  }
});

// ../../node_modules/js-object-utilities/dist/clear_empties.js
var require_clear_empties = __commonJS({
  "../../node_modules/js-object-utilities/dist/clear_empties.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.clearEmpties = void 0;
    var clearEmpties = (object) => {
      Object.keys(object).forEach((key) => {
        if (typeof object[key] !== "object") {
          return;
        }
        (0, exports2.clearEmpties)(object[key]);
        if (Object.keys(object[key]).length === 0) {
          delete object[key];
        }
      });
      return object;
    };
    exports2.clearEmpties = clearEmpties;
  }
});

// ../../node_modules/js-object-utilities/dist/circularKeys.js
var require_circularKeys = __commonJS({
  "../../node_modules/js-object-utilities/dist/circularKeys.js"(exports2, module2) {
    "use strict";
    var originalKey = "object";
    module2.exports = (object, searchKey) => {
      const keys = [];
      const stack = [];
      const stackSet = /* @__PURE__ */ new Set();
      const detected = [];
      function detect(object2, key) {
        if (object2 && typeof object2 !== "object") {
          return;
        }
        if (stackSet.has(object2)) {
          const oldIndex = stack.indexOf(object2);
          const l1 = keys.join(".") + "." + key;
          const currentKey = l1.replace(`${originalKey}.`, "");
          if (!searchKey || currentKey === searchKey) {
            detected.push(currentKey);
            return;
          } else {
            return;
          }
        }
        keys.push(key);
        stack.push(object2);
        stackSet.add(object2);
        for (const k in object2) {
          if (Object.prototype.hasOwnProperty.call(object2, k)) {
            detect(object2[k], k);
          }
        }
        keys.pop();
        stack.pop();
        stackSet.delete(object2);
        return;
      }
      detect(object, originalKey);
      return detected;
    };
  }
});

// ../../node_modules/js-object-utilities/dist/isCircular.js
var require_isCircular = __commonJS({
  "../../node_modules/js-object-utilities/dist/isCircular.js"(exports2, module2) {
    "use strict";
    var circularKeys = require_circularKeys();
    module2.exports = (object, searchKey) => {
      return circularKeys(object, searchKey).length > 0;
    };
  }
});

// ../../node_modules/js-object-utilities/dist/index.js
var require_dist2 = __commonJS({
  "../../node_modules/js-object-utilities/dist/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.circularKeys = exports2.isCircular = exports2.clearEmpties = exports2.equals = exports2.entries = exports2.keys = exports2.pick = exports2.delete = exports2.set = exports2.get = void 0;
    var get = require_get();
    exports2.get = get;
    var set = require_set();
    exports2.set = set;
    var deleteFunc = require_delete();
    exports2.delete = deleteFunc;
    var pick = require_pick();
    exports2.pick = pick;
    var keys = require_keys();
    exports2.keys = keys;
    var entries = require_entries();
    exports2.entries = entries;
    var equals = require_equals();
    exports2.equals = equals;
    var clear_empties_1 = require_clear_empties();
    Object.defineProperty(exports2, "clearEmpties", { enumerable: true, get: function() {
      return clear_empties_1.clearEmpties;
    } });
    var isCircular = require_isCircular();
    exports2.isCircular = isCircular;
    var circularKeys = require_circularKeys();
    exports2.circularKeys = circularKeys;
  }
});

// ../../node_modules/dynamoose/dist/utils/unique_array_elements.js
var require_unique_array_elements = __commonJS({
  "../../node_modules/dynamoose/dist/utils/unique_array_elements.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var obj = require_dist2();
    exports2.default = (array) => array.filter((value, index, self) => self.findIndex((searchVal) => obj.equals(searchVal, value)) === index);
  }
});

// ../../node_modules/dynamoose/dist/utils/array_flatten.js
var require_array_flatten = __commonJS({
  "../../node_modules/dynamoose/dist/utils/array_flatten.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.default = (array) => Array.prototype.concat.apply([], array);
  }
});

// ../../node_modules/dynamoose/dist/utils/empty_function.js
var require_empty_function = __commonJS({
  "../../node_modules/dynamoose/dist/utils/empty_function.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.default = () => {
    };
  }
});

// ../../node_modules/dynamoose/dist/utils/dynamoose/get_provisioned_throughput.js
var require_get_provisioned_throughput = __commonJS({
  "../../node_modules/dynamoose/dist/utils/dynamoose/get_provisioned_throughput.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.default = (options) => {
      if (!options.throughput) {
        return {};
      }
      if (options.throughput === "ON_DEMAND") {
        return {
          "BillingMode": "PAY_PER_REQUEST"
        };
      } else {
        return {
          "ProvisionedThroughput": {
            "ReadCapacityUnits": typeof options.throughput === "number" ? options.throughput : options.throughput.read,
            "WriteCapacityUnits": typeof options.throughput === "number" ? options.throughput : options.throughput.write
          }
        };
      }
    };
  }
});

// ../../node_modules/dynamoose/dist/Internal.js
var require_Internal = __commonJS({
  "../../node_modules/dynamoose/dist/Internal.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.default = {
      "General": {
        "internalProperties": Symbol("internalProperties")
      },
      "Public": {
        "undefined": Symbol("dynamoose.undefined"),
        "this": Symbol("dynamoose.this"),
        "null": Symbol("dynamoose.null"),
        "any": Symbol("dynamoose.any")
      }
    };
  }
});

// ../../node_modules/dynamoose/dist/utils/deep_copy.js
var require_deep_copy = __commonJS({
  "../../node_modules/dynamoose/dist/utils/deep_copy.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var objectUtils = require_dist2();
    function deep_copy(obj) {
      let copy;
      if (obj instanceof Date) {
        copy = /* @__PURE__ */ new Date();
        copy.setTime(obj.getTime());
        return copy;
      }
      if (obj instanceof Array) {
        copy = obj.map((i) => deep_copy(i));
        return copy;
      }
      if (obj instanceof Set) {
        copy = new Set(obj);
        return copy;
      }
      if (obj instanceof Map) {
        copy = new Map(obj);
        return copy;
      }
      if (obj instanceof Buffer) {
        copy = Buffer.from(obj);
        return copy;
      }
      if (obj instanceof Uint8Array) {
        copy = new Uint8Array(obj);
        return copy;
      }
      if (obj instanceof Function) {
        return obj;
      }
      if (obj instanceof Object) {
        if (obj.constructor !== Object) {
          copy = Object.assign(Object.create(Object.getPrototypeOf(obj)), obj);
        } else {
          copy = {};
        }
        for (const attr in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, attr) && !objectUtils.isCircular(obj, attr)) {
            copy[attr] = deep_copy(obj[attr]);
          }
        }
        return copy;
      }
      return obj;
    }
    exports2.default = deep_copy;
  }
});

// ../../node_modules/dynamoose/dist/utils/dynamoose/index_changes.js
var require_index_changes = __commonJS({
  "../../node_modules/dynamoose/dist/utils/dynamoose/index_changes.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.TableIndexChangeType = void 0;
    var obj = require_dist2();
    var Internal_1 = require_Internal();
    var deep_copy_1 = require_deep_copy();
    var { internalProperties } = Internal_1.default.General;
    var TableIndexChangeType;
    (function(TableIndexChangeType2) {
      TableIndexChangeType2["add"] = "add";
      TableIndexChangeType2["delete"] = "delete";
    })(TableIndexChangeType || (exports2.TableIndexChangeType = TableIndexChangeType = {}));
    var index_changes = async (table, existingIndexes = []) => {
      const output = [];
      const expectedIndexes = await table.getInternalProperties(internalProperties).getIndexes();
      const tableThroughput = table.getInternalProperties(internalProperties).options.throughput;
      const identicalProperties = ["IndexName", "KeySchema", "Projection", "ProvisionedThroughput"];
      if (tableThroughput === "ON_DEMAND") {
        identicalProperties.pop();
      }
      const sanitizeIndex = (index) => {
        if (Array.isArray(index.Projection.NonKeyAttributes)) {
          index.Projection.NonKeyAttributes.sort();
        }
        return index;
      };
      const deleteIndexes = existingIndexes.filter((index) => {
        const cleanedIndex = (0, deep_copy_1.default)(index);
        obj.entries(cleanedIndex).forEach(([key, value]) => {
          if (value === void 0) {
            obj.delete(cleanedIndex, key);
          }
        });
        return !(expectedIndexes.GlobalSecondaryIndexes || []).find((searchIndex) => obj.equals(sanitizeIndex(obj.pick(cleanedIndex, identicalProperties)), sanitizeIndex(obj.pick(searchIndex, identicalProperties))));
      }).map((index) => ({ "name": index.IndexName, "type": TableIndexChangeType.delete }));
      output.push(...deleteIndexes);
      const createIndexes = (expectedIndexes.GlobalSecondaryIndexes || []).filter((index) => ![...output.map((i) => i.name), ...existingIndexes.map((i) => i.IndexName)].includes(index.IndexName)).map((index) => ({
        "type": TableIndexChangeType.add,
        "spec": index
      }));
      output.push(...createIndexes);
      return output;
    };
    exports2.default = index_changes;
  }
});

// ../../node_modules/dynamoose/dist/utils/dynamoose/convertConditionArrayRequestObjectToString.js
var require_convertConditionArrayRequestObjectToString = __commonJS({
  "../../node_modules/dynamoose/dist/utils/dynamoose/convertConditionArrayRequestObjectToString.js"(exports2, module2) {
    "use strict";
    var convertConditionArrayRequestObjectToString = (expression) => {
      return expression.reduce((result, item) => {
        const returnItem = [result];
        returnItem.push(Array.isArray(item) ? `(${convertConditionArrayRequestObjectToString(item)})` : item);
        return returnItem.filter((a) => a).join(" ");
      }, "");
    };
    module2.exports = convertConditionArrayRequestObjectToString;
  }
});

// ../../node_modules/dynamoose/dist/utils/dynamoose/getValueTypeCheckResult.js
var require_getValueTypeCheckResult = __commonJS({
  "../../node_modules/dynamoose/dist/utils/dynamoose/getValueTypeCheckResult.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.default = (schema2, value, key, settings, options) => {
      const typeDetails = schema2.getAttributeTypeDetails(key, options);
      const typeDetailsArray = Array.isArray(typeDetails) ? typeDetails : [typeDetails];
      const matchedTypeDetailsIndexes = typeDetailsArray.map((details, index) => {
        var _a, _b;
        if ([(_b = (_a = details.customType) === null || _a === void 0 ? void 0 : _a.functions) === null || _b === void 0 ? void 0 : _b.isOfType, details.isOfType].filter((a) => Boolean(a)).some((func) => func(value, settings.type))) {
          return index;
        }
      }).filter((a) => a !== void 0);
      const matchedTypeDetailsIndex = matchedTypeDetailsIndexes[0];
      const matchedTypeDetails = typeDetailsArray[matchedTypeDetailsIndex];
      const isValidType = Boolean(matchedTypeDetails);
      const returnObj = { typeDetails, matchedTypeDetails, matchedTypeDetailsIndex, matchedTypeDetailsIndexes, typeDetailsArray, isValidType };
      return returnObj;
    };
  }
});

// ../../node_modules/dynamoose/dist/utils/dynamoose/itemToJSON.js
var require_itemToJSON = __commonJS({
  "../../node_modules/dynamoose/dist/utils/dynamoose/itemToJSON.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.itemToJSON = void 0;
    function itemToJSON() {
      return JSON.parse(JSON.stringify(Array.isArray(this) ? [...this] : Object.assign({}, this)));
    }
    exports2.itemToJSON = itemToJSON;
  }
});

// ../../node_modules/dynamoose/dist/utils/dynamoose/index.js
var require_dynamoose = __commonJS({
  "../../node_modules/dynamoose/dist/utils/dynamoose/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var get_provisioned_throughput_1 = require_get_provisioned_throughput();
    var index_changes_1 = require_index_changes();
    var convertConditionArrayRequestObjectToString = require_convertConditionArrayRequestObjectToString();
    var getValueTypeCheckResult_1 = require_getValueTypeCheckResult();
    var itemToJSON_1 = require_itemToJSON();
    var dynamoose_utils_1 = require_dist();
    exports2.default = {
      get_provisioned_throughput: get_provisioned_throughput_1.default,
      index_changes: index_changes_1.default,
      convertConditionArrayRequestObjectToString,
      getValueTypeCheckResult: getValueTypeCheckResult_1.default,
      itemToJSON: itemToJSON_1.itemToJSON,
      wildcard_allowed_check: dynamoose_utils_1.wildcard_allowed_check
    };
  }
});

// ../../node_modules/dynamoose/dist/utils/all_elements_match.js
var require_all_elements_match = __commonJS({
  "../../node_modules/dynamoose/dist/utils/all_elements_match.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.default = (array) => array.every((item, index, array2) => index === 0 ? true : item === array2[index - 1]);
  }
});

// ../../node_modules/dynamoose/dist/utils/type_name.js
var require_type_name = __commonJS({
  "../../node_modules/dynamoose/dist/utils/type_name.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.default = (value, typeDetailsArray) => {
      let str = "";
      if (value === null) {
        str += "null";
      } else {
        if (Object.prototype.toString.call(value) === "[object Object]" && value.constructor !== void 0 && value.constructor !== Object) {
          str += value.constructor.name;
        } else {
          str += typeof value;
        }
      }
      str += typeDetailsArray.some((val) => val.name === "Constant") ? ` (${value})` : "";
      return str;
    };
  }
});

// ../../node_modules/dynamoose/dist/utils/importPackage.js
var require_importPackage = __commonJS({
  "../../node_modules/dynamoose/dist/utils/importPackage.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.revertPackages = exports2.setUndefinedPackage = void 0;
    var undefinedPackages = [];
    exports2.default = async (name) => {
      if (undefinedPackages.includes(name)) {
        throw new Error("Package can not be found.");
      } else {
        const pkg = await Promise.resolve(`${name}`).then((s) => require(s));
        return pkg;
      }
    };
    var setUndefinedPackage = (name) => {
      undefinedPackages.push(name);
    };
    exports2.setUndefinedPackage = setUndefinedPackage;
    var revertPackages = () => {
      undefinedPackages = [];
    };
    exports2.revertPackages = revertPackages;
  }
});

// ../../node_modules/dynamoose/dist/utils/log.js
var require_log = __commonJS({
  "../../node_modules/dynamoose/dist/utils/log.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var importPackage_1 = require_importPackage();
    exports2.default = async (...args) => {
      let log;
      try {
        log = await (0, importPackage_1.default)("dynamoose-logger/dist/emitter");
      } catch (e) {
      }
      if (log && typeof log === "function") {
        log(...args);
      }
    };
  }
});

// ../../node_modules/dynamoose/dist/utils/find_best_index.js
var require_find_best_index = __commonJS({
  "../../node_modules/dynamoose/dist/utils/find_best_index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var array_flatten_1 = require_array_flatten();
    function default_1(modelIndexes, comparisonChart) {
      var _a, _b;
      const validIndexes = (0, array_flatten_1.default)(Object.entries(modelIndexes).map(([key, indexes]) => {
        indexes = Array.isArray(indexes) ? indexes : [indexes];
        return indexes.map((index2) => {
          const { hash, range } = index2.KeySchema.reduce((res, item) => {
            res[item.KeyType.toLowerCase()] = item.AttributeName;
            return res;
          }, {});
          index2._hashKey = hash;
          index2._rangeKey = range;
          index2._tableIndex = key === "TableIndex";
          return index2;
        });
      })).filter((index2) => {
        var _a2;
        return ((_a2 = comparisonChart[index2._hashKey]) === null || _a2 === void 0 ? void 0 : _a2.type) === "EQ";
      });
      const index = validIndexes.find((index2) => comparisonChart[index2._rangeKey]) || validIndexes.find((index2) => index2._tableIndex) || validIndexes[0];
      return { "tableIndex": (_a = index === null || index === void 0 ? void 0 : index._tableIndex) !== null && _a !== void 0 ? _a : false, "indexName": (_b = index === null || index === void 0 ? void 0 : index.IndexName) !== null && _b !== void 0 ? _b : null };
    }
    exports2.default = default_1;
  }
});

// ../../node_modules/dynamoose/dist/utils/childKey.js
var require_childKey = __commonJS({
  "../../node_modules/dynamoose/dist/utils/childKey.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    function default_1(key) {
      const parts = key.split(".");
      return parts[parts.length - 1];
    }
    exports2.default = default_1;
  }
});

// ../../node_modules/dynamoose/dist/utils/parentKey.js
var require_parentKey = __commonJS({
  "../../node_modules/dynamoose/dist/utils/parentKey.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    function default_1(key) {
      return key.split(".").slice(0, -1).join(".");
    }
    exports2.default = default_1;
  }
});

// ../../node_modules/dynamoose/dist/utils/async_reduce.js
var require_async_reduce = __commonJS({
  "../../node_modules/dynamoose/dist/utils/async_reduce.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    async function default_1(array, callbackfn, initialValue) {
      const result = await array.reduce(async (a, b, c, d) => {
        const awaitedAccumulator = await a;
        return callbackfn(awaitedAccumulator, b, c, d);
      }, Promise.resolve(initialValue));
      return result;
    }
    exports2.default = default_1;
  }
});

// ../../node_modules/dynamoose/dist/utils/index.js
var require_utils = __commonJS({
  "../../node_modules/dynamoose/dist/utils/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var combine_objects = require_combine_objects();
    var merge_objects = require_merge_objects();
    var timeout_1 = require_timeout();
    var capitalize_first_letter_1 = require_capitalize_first_letter();
    var set_immediate_promise_1 = require_set_immediate_promise();
    var unique_array_elements_1 = require_unique_array_elements();
    var array_flatten_1 = require_array_flatten();
    var empty_function_1 = require_empty_function();
    var object = require_dist2();
    var dynamoose_1 = require_dynamoose();
    var all_elements_match_1 = require_all_elements_match();
    var type_name_1 = require_type_name();
    var importPackage_1 = require_importPackage();
    var log_1 = require_log();
    var find_best_index_1 = require_find_best_index();
    var deep_copy_1 = require_deep_copy();
    var childKey_1 = require_childKey();
    var parentKey_1 = require_parentKey();
    var async_reduce_1 = require_async_reduce();
    var keyBy_1 = require_keyBy();
    exports2.default = {
      combine_objects,
      merge_objects,
      timeout: timeout_1.default,
      capitalize_first_letter: capitalize_first_letter_1.default,
      set_immediate_promise: set_immediate_promise_1.default,
      unique_array_elements: unique_array_elements_1.default,
      all_elements_match: all_elements_match_1.default,
      array_flatten: array_flatten_1.default,
      empty_function: empty_function_1.default,
      object,
      dynamoose: dynamoose_1.default,
      type_name: type_name_1.default,
      importPackage: importPackage_1.default,
      log: log_1.default,
      find_best_index: find_best_index_1.default,
      deep_copy: deep_copy_1.default,
      childKey: childKey_1.default,
      parentKey: parentKey_1.default,
      async_reduce: async_reduce_1.default,
      keyBy: keyBy_1.default
    };
  }
});

// ../../node_modules/dynamoose/dist/aws/converter.js
var require_converter = __commonJS({
  "../../node_modules/dynamoose/dist/aws/converter.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var DynamoDBUtil = require("@aws-sdk/util-dynamodb");
    var customConverter;
    var defaultConverter = {
      "marshall": DynamoDBUtil.marshall,
      "unmarshall": DynamoDBUtil.unmarshall,
      "convertToAttr": DynamoDBUtil.convertToAttr,
      "convertToNative": DynamoDBUtil.convertToNative
    };
    function main2() {
      return customConverter || defaultConverter;
    }
    main2.set = (converter) => {
      customConverter = converter;
    };
    main2.revert = () => {
      customConverter = void 0;
    };
    exports2.default = main2;
  }
});

// ../../node_modules/dynamoose/dist/aws/ddb/internal.js
var require_internal = __commonJS({
  "../../node_modules/dynamoose/dist/aws/ddb/internal.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var utils_1 = require_utils();
    async function main2(instance, method, params) {
      await utils_1.default.log({ "level": "debug", "category": `aws:dynamodb:${method}:request`, "message": JSON.stringify(params, null, 4), "payload": { "request": params } });
      const result = await instance.aws.ddb()[method](params);
      await utils_1.default.log({ "level": "debug", "category": `aws:dynamodb:${method}:response`, "message": typeof result === "undefined" ? "undefined" : JSON.stringify(result, null, 4), "payload": { "response": result } });
      return result;
    }
    exports2.default = main2;
  }
});

// ../../node_modules/dynamoose/dist/Populate.js
var require_Populate = __commonJS({
  "../../node_modules/dynamoose/dist/Populate.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.PopulateItems = exports2.PopulateItem = void 0;
    var utils_1 = require_utils();
    var Internal_1 = require_Internal();
    var { internalProperties } = Internal_1.default.General;
    function PopulateItem(settings, callback, internalSettings) {
      if (typeof settings === "function") {
        callback = settings;
        settings = {};
      }
      if (!internalSettings) {
        internalSettings = {};
      }
      const { model: model2 } = this.getInternalProperties(internalProperties);
      const localSettings = settings;
      const schema2 = model2.getInternalProperties(internalProperties).schemaForObject(this);
      const modelAttributes = utils_1.default.array_flatten(schema2.attributes().map((prop) => ({ prop, "details": schema2.getAttributeTypeDetails(prop) }))).filter((obj) => Array.isArray(obj.details) ? obj.details.some(
        (detail) => detail.name === "Model"
        /* || detail.name === "Model Set"*/
      ) : obj.details.name === "Model" || obj.details.name === "Model Set").map((obj) => obj.prop);
      const promise = Promise.all(modelAttributes.map(async (prop) => {
        const typeDetails = schema2.getAttributeTypeDetails(prop);
        const typeDetail = Array.isArray(typeDetails) ? typeDetails.find((detail) => detail.name === "Model") : typeDetails;
        const { typeSettings } = typeDetail;
        const subModel = typeof typeSettings.model === "object" ? model2.Item : typeSettings.model;
        prop = prop.endsWith(".0") ? prop.substring(0, prop.length - 2) : prop;
        const itemPropValue = utils_1.default.object.get(this, prop);
        const doesPopulatePropertyExist = !(typeof itemPropValue === "undefined" || itemPropValue === null);
        if (!doesPopulatePropertyExist || itemPropValue instanceof subModel) {
          return;
        }
        const key = [internalSettings.parentKey, prop].filter((a) => Boolean(a)).join(".");
        const populatePropertiesExists = typeof (localSettings === null || localSettings === void 0 ? void 0 : localSettings.properties) !== "undefined" && localSettings.properties !== null;
        const populateProperties = Array.isArray(localSettings === null || localSettings === void 0 ? void 0 : localSettings.properties) || typeof (localSettings === null || localSettings === void 0 ? void 0 : localSettings.properties) === "boolean" ? localSettings.properties : [localSettings === null || localSettings === void 0 ? void 0 : localSettings.properties];
        const isPopulatePropertyInSettingProperties = populatePropertiesExists ? utils_1.default.dynamoose.wildcard_allowed_check(populateProperties, key) : true;
        if (!isPopulatePropertyInSettingProperties) {
          return;
        }
        const isArray = Array.isArray(itemPropValue);
        const isSet = itemPropValue instanceof Set;
        if (isArray || isSet) {
          const subItems = await Promise.all([...itemPropValue].map((val) => subModel.get(val)));
          const saveItems = await Promise.all(subItems.map((doc) => PopulateItem.bind(doc)(localSettings, null, { "parentKey": key })));
          utils_1.default.object.set(this, prop, saveItems);
        } else {
          const subItem = await subModel.get(itemPropValue);
          const saveItem = await PopulateItem.bind(subItem)(localSettings, null, { "parentKey": key });
          utils_1.default.object.set(this, prop, saveItem);
        }
      }));
      if (callback) {
        promise.then(() => callback(null, this)).catch((err) => callback(err));
      } else {
        return (async () => {
          await promise;
          return this;
        })();
      }
    }
    exports2.PopulateItem = PopulateItem;
    function PopulateItems(settings, callback) {
      if (typeof settings === "function") {
        callback = settings;
        settings = {};
      }
      const promise = Promise.all(this.map(async (item, index) => {
        this[index] = await PopulateItem.bind(item)(settings);
      }));
      if (callback) {
        promise.then(() => callback(null, this)).catch((err) => callback(err));
      } else {
        return (async () => {
          await promise;
          return this;
        })();
      }
    }
    exports2.PopulateItems = PopulateItems;
  }
});

// ../../node_modules/dynamoose/dist/InternalPropertiesClass.js
var require_InternalPropertiesClass = __commonJS({
  "../../node_modules/dynamoose/dist/InternalPropertiesClass.js"(exports2) {
    "use strict";
    var __classPrivateFieldGet = exports2 && exports2.__classPrivateFieldGet || function(receiver, state, kind, f) {
      if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
      if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
      return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    };
    var __classPrivateFieldSet = exports2 && exports2.__classPrivateFieldSet || function(receiver, state, value, kind, f) {
      if (kind === "m") throw new TypeError("Private method is not writable");
      if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
      if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
      return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
    };
    var _InternalPropertiesClass_internalProperties;
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.InternalPropertiesClass = void 0;
    var Error_1 = require_Error2();
    var Internal_1 = require_Internal();
    var { internalProperties } = Internal_1.default.General;
    var InternalPropertiesClass = class {
      constructor() {
        _InternalPropertiesClass_internalProperties.set(this, void 0);
      }
      getInternalProperties(key) {
        if (key !== internalProperties) {
          throw new Error_1.default.InvalidParameter("You can not access internal properties without a valid key.");
        } else {
          return __classPrivateFieldGet(this, _InternalPropertiesClass_internalProperties, "f");
        }
      }
      setInternalProperties(key, value) {
        if (key !== internalProperties) {
          throw new Error_1.default.InvalidParameter("You can not set internal properties without a valid key.");
        } else {
          __classPrivateFieldSet(this, _InternalPropertiesClass_internalProperties, value, "f");
        }
      }
    };
    exports2.InternalPropertiesClass = InternalPropertiesClass;
    _InternalPropertiesClass_internalProperties = /* @__PURE__ */ new WeakMap();
  }
});

// ../../node_modules/dynamoose/dist/Item.js
var require_Item = __commonJS({
  "../../node_modules/dynamoose/dist/Item.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.AnyItem = exports2.Item = void 0;
    var converter_1 = require_converter();
    var internal_1 = require_internal();
    var utils_1 = require_utils();
    var Error_1 = require_Error2();
    var Internal_1 = require_Internal();
    var { internalProperties } = Internal_1.default.General;
    var dynamooseUndefined = Internal_1.default.Public.undefined;
    var dynamooseAny = Internal_1.default.Public.any;
    var Populate_1 = require_Populate();
    var InternalPropertiesClass_1 = require_InternalPropertiesClass();
    var Error_2 = require_Error2();
    var Item = class _Item extends InternalPropertiesClass_1.InternalPropertiesClass {
      /**
       * Create a new item.
       * @param model Internal property. Not used publicly.
       * @param object The object for the item.
       * @param settings The settings for the item.
       */
      constructor(model2, object, settings) {
        super();
        const itemObject = _Item.isDynamoObject(object) ? _Item.fromDynamo(object) : object;
        Object.keys(itemObject).forEach((key) => this[key] = itemObject[key]);
        this.setInternalProperties(internalProperties, {
          "originalObject": utils_1.default.deep_copy(itemObject),
          "originalSettings": Object.assign({}, settings),
          model: model2,
          "storedInDynamo": settings.type === "fromDynamo"
        });
      }
      static objectToDynamo(object, settings = { "type": "object" }) {
        if (object === void 0) {
          return void 0;
        }
        const options = settings.type === "value" ? void 0 : { "removeUndefinedValues": true };
        return (settings.type === "value" ? (0, converter_1.default)().convertToAttr : (0, converter_1.default)().marshall)(object, options);
      }
      static fromDynamo(object) {
        const result = (0, converter_1.default)().unmarshall(object);
        utils_1.default.object.entries(result).forEach(([key, value]) => {
          if (value instanceof Uint8Array) {
            utils_1.default.object.set(result, key, Buffer.from(value));
          }
        });
        return result;
      }
      // This function will return null if it's unknown if it is a Dynamo object (ex. empty object). It will return true if it is a Dynamo object and false if it's not.
      static isDynamoObject(object, recursive) {
        function isValid(value) {
          if (typeof value === "undefined" || value === null) {
            return false;
          }
          const keys2 = Object.keys(value);
          const key = keys2[0];
          const nestedResult = typeof value[key] === "object" && !(value[key] instanceof Buffer) && !(value[key] instanceof Uint8Array) ? Array.isArray(value[key]) ? value[key].every((value2) => _Item.isDynamoObject(value2, true)) : _Item.isDynamoObject(value[key]) : true;
          const { Schema: Schema2 } = require_Schema();
          const attributeType = Schema2.attributeTypes.findDynamoDBType(key);
          return typeof value === "object" && keys2.length === 1 && attributeType && (nestedResult || Object.keys(value[key]).length === 0 || attributeType.isSet);
        }
        const keys = Object.keys(object);
        const values = Object.values(object);
        if (keys.length === 0) {
          return null;
        } else {
          return recursive ? isValid(object) : values.every((value) => isValid(value));
        }
      }
      // This function handles actions that should take place before every response (get, scan, query, batchGet, etc.)
      async prepareForResponse() {
        if (this.getInternalProperties(internalProperties).model.getInternalProperties(internalProperties).table().getInternalProperties(internalProperties).options.populate) {
          return this.populate({ "properties": this.getInternalProperties(internalProperties).model.getInternalProperties(internalProperties).table().getInternalProperties(internalProperties).options.populate });
        }
        return this;
      }
      /**
       * This function returns the original item that was received from DynamoDB. This function will return a JSON object that represents the original item. In the event no item has been retrieved from DynamoDB `null` will be returned.
       *
       * ```js
       * const user = await User.get(1);
       * console.log(user); // {"id": 1, "name": "Bob"}
       * user.name = "Tim";
       *
       * console.log(user); // {"id": 1, "name": "Tim"}
       * console.log(user.original()); // {"id": 1, "name": "Bob"}
       * ```
       * @returns Object | null
       */
      original() {
        return this.getInternalProperties(internalProperties).originalSettings.type === "fromDynamo" ? this.getInternalProperties(internalProperties).originalObject : null;
      }
      /**
       * This function returns a JSON object representation of the item. This is most commonly used when comparing an item to an object you receive elsewhere without worrying about prototypes.
       *
       * ```js
       * const user = new User({"id": 1, "name": "Tim"});
       *
       * console.log(user); // Item {"id": 1, "name": "Tim"}
       * console.log(user.toJSON()); // {"id": 1, "name": "Tim"}
       * ```
       *
       * Due to the fact that an item instance is based on an object it is rare that you will have to use this function since you can access all the properties of the item directly. For example, both of the results will yield the same output.
       *
       * ```js
       * const user = new User({"id": 1, "name": "Tim"});
       *
       * console.log(user.id); // 1
       * console.log(user.toJSON().id); // 1
       * ```
       * @returns Object
       */
      toJSON() {
        return utils_1.default.dynamoose.itemToJSON.bind(this)();
      }
      /**
       * This method will return a promise containing an object of the item that includes default values for any undefined values in the item.
       *
       * ```js
       * const schema = new Schema({
       * 	"id": String,
       * 	"data": {
       * 		"type": String,
       * 		"default": "Hello World"
       * 	}
       * });
       * const User = dynamoose.model("User", schema);
       * const user = new User({"id": 1});
       * console.log(await user.withDefaults()); // {"id": 1, "data": "Hello World"}
       * ```
       * @returns Promise<Object>
       */
      async withDefaults() {
        return _Item.objectFromSchema(utils_1.default.deep_copy(this.toJSON()), this.getInternalProperties(internalProperties).model, {
          "typeCheck": false,
          "defaults": true,
          "type": "toDynamo"
        });
      }
      // Serializer
      serialize(nameOrOptions) {
        return this.getInternalProperties(internalProperties).model.serializer.getInternalProperties(internalProperties).serialize(this, nameOrOptions);
      }
      delete(callback) {
        const hashKey = this.getInternalProperties(internalProperties).model.getInternalProperties(internalProperties).getHashKey();
        const rangeKey = this.getInternalProperties(internalProperties).model.getInternalProperties(internalProperties).getRangeKey();
        const key = { [hashKey]: this[hashKey] };
        if (rangeKey) {
          key[rangeKey] = this[rangeKey];
        }
        return this.getInternalProperties(internalProperties).model.delete(key, callback);
      }
      save(settings, callback) {
        if (typeof settings !== "object" && typeof settings !== "undefined") {
          callback = settings;
          settings = {};
        }
        if (typeof settings === "undefined") {
          settings = {};
        }
        const table = this.getInternalProperties(internalProperties).model.getInternalProperties(internalProperties).table();
        let savedItem;
        const localSettings = settings;
        const paramsPromise = this.toDynamo({ "defaults": true, "validate": true, "required": true, "enum": true, "forceDefault": true, "combine": true, "saveUnknown": true, "customTypesDynamo": true, "updateTimestamps": true, "modifiers": ["set"], "mapAttributes": true }).then(async (item) => {
          savedItem = item;
          let putItemObj = {
            "Item": item,
            "TableName": table.getInternalProperties(internalProperties).name
          };
          if (localSettings.condition) {
            putItemObj = Object.assign(Object.assign({}, putItemObj), await localSettings.condition.getInternalProperties(internalProperties).requestObject(this.getInternalProperties(internalProperties).model));
          }
          if (localSettings.overwrite === false) {
            const conditionExpression = "attribute_not_exists(#__hash_key)";
            putItemObj.ConditionExpression = putItemObj.ConditionExpression ? `(${putItemObj.ConditionExpression}) AND (${conditionExpression})` : conditionExpression;
            putItemObj.ExpressionAttributeNames = Object.assign(Object.assign({}, putItemObj.ExpressionAttributeNames || {}), { "#__hash_key": this.getInternalProperties(internalProperties).model.getInternalProperties(internalProperties).getHashKey() });
          }
          return putItemObj;
        });
        if (settings.return === "request") {
          if (callback) {
            const localCallback = callback;
            paramsPromise.then((result) => localCallback(null, result));
            return;
          } else {
            return paramsPromise;
          }
        }
        const promise = Promise.all([paramsPromise, table.getInternalProperties(internalProperties).pendingTaskPromise()]).then((promises) => {
          const [putItemObj] = promises;
          return (0, internal_1.default)(table.getInternalProperties(internalProperties).instance, "putItem", putItemObj);
        });
        if (callback) {
          const localCallback = callback;
          promise.then(() => {
            this.getInternalProperties(internalProperties).storedInDynamo = true;
            const returnItem = new (this.getInternalProperties(internalProperties)).model.Item(savedItem);
            returnItem.getInternalProperties(internalProperties).storedInDynamo = true;
            localCallback(null, returnItem);
          }).catch((error) => callback(error));
        } else {
          return (async () => {
            await promise;
            this.getInternalProperties(internalProperties).storedInDynamo = true;
            const returnItem = new (this.getInternalProperties(internalProperties)).model.Item(savedItem);
            returnItem.getInternalProperties(internalProperties).storedInDynamo = true;
            return returnItem;
          })();
        }
      }
      populate(...args) {
        return Populate_1.PopulateItem.bind(this)(...args);
      }
    };
    exports2.Item = Item;
    var AnyItem = class extends Item {
    };
    exports2.AnyItem = AnyItem;
    Item.prepareForObjectFromSchema = async function(object, model2, settings) {
      if (settings.updateTimestamps) {
        const schema2 = model2.getInternalProperties(internalProperties).schemaForObject(object);
        if (schema2.getInternalProperties(internalProperties).settings.timestamps && settings.type === "toDynamo") {
          const date = /* @__PURE__ */ new Date();
          const timeResult = (prop) => {
            const typeDetails = schema2.getAttributeTypeDetails(prop.name);
            if (Array.isArray(typeDetails)) {
              throw new Error_2.default.InvalidType(`Not allowed to use an array of types for the timestamps attribute "${prop.name}".`);
            }
            switch (typeDetails.typeSettings.storage) {
              case "iso":
                return date.toISOString();
              case "seconds":
                return Math.floor(date.getTime() / 1e3);
              default:
                return date.getTime();
            }
          };
          const timestampProperties = schema2.getInternalProperties(internalProperties).getTimestampAttributes();
          const createdAtProperties = timestampProperties.filter((val) => val.type === "createdAt");
          const updatedAtProperties = timestampProperties.filter((val) => val.type === "updatedAt");
          if (object.getInternalProperties && object.getInternalProperties(internalProperties) && !object.getInternalProperties(internalProperties).storedInDynamo && (typeof settings.updateTimestamps === "boolean" || settings.updateTimestamps.createdAt)) {
            createdAtProperties.forEach((prop) => {
              utils_1.default.object.set(object, prop.name, timeResult(prop));
            });
          }
          if (typeof settings.updateTimestamps === "boolean" || settings.updateTimestamps.updatedAt) {
            updatedAtProperties.forEach((prop) => {
              utils_1.default.object.set(object, prop.name, timeResult(prop));
            });
          }
        }
      }
      return object;
    };
    Item.attributesWithSchema = async function(item, model2) {
      const schema2 = model2.getInternalProperties(internalProperties).schemaForObject(item);
      const attributes = schema2.attributes();
      const root = {};
      attributes.forEach((attribute) => {
        let node = root;
        attribute.split(".").forEach((part) => {
          node[part] = node[part] || {};
          node = node[part];
        });
      });
      function traverse(node, treeNode, outPath, callback) {
        callback(outPath);
        if (Object.keys(treeNode).length === 0) {
          return;
        }
        Object.keys(treeNode).forEach((attr) => {
          if (attr === "0") {
            if (!node || node.length == 0 || typeof node === "object" && Object.keys(node).length == 0) {
              node = [{}];
            }
            node.forEach((a, index) => {
              outPath.push(index);
              traverse(node[index], treeNode[attr], outPath, callback);
              outPath.pop();
            });
          } else {
            if (!node) {
              node = {};
            }
            outPath.push(attr);
            traverse(node[attr], treeNode[attr], outPath, callback);
            outPath.pop();
          }
        });
      }
      const out = [];
      traverse(item, root, [], (val) => out.push(val.join(".")));
      const result = out.slice(1);
      return result;
    };
    Item.objectFromSchema = async function(object, model2, settings = { "type": "toDynamo" }) {
      if (settings.checkExpiredItem && model2.getInternalProperties(internalProperties).table().getInternalProperties(internalProperties).options.expires && (model2.getInternalProperties(internalProperties).table().getInternalProperties(internalProperties).options.expires.items || {}).returnExpired === false && object[model2.getInternalProperties(internalProperties).table().getInternalProperties(internalProperties).options.expires.attribute] && object[model2.getInternalProperties(internalProperties).table().getInternalProperties(internalProperties).options.expires.attribute] * 1e3 < Date.now()) {
        return void 0;
      }
      let returnObject = utils_1.default.deep_copy(object);
      const schema2 = settings.schema || model2.getInternalProperties(internalProperties).schemaForObject(returnObject);
      const schemaAttributes = schema2.attributes(returnObject);
      function mapAttributes(type) {
        if (settings.mapAttributes && settings.type === type) {
          const schemaInternalProperties = schema2.getInternalProperties(internalProperties);
          const mappedAttributesObject = type === "toDynamo" ? schemaInternalProperties.getMapSettingObject() : schema2.attributes().reduce((obj, attribute) => {
            const mapValues = schemaInternalProperties.getMapSettingValuesForKey(attribute);
            if (mapValues && mapValues.length > 0) {
              const defaultMapAttribute = schema2.getInternalProperties(internalProperties).getDefaultMapAttribute(attribute);
              if (defaultMapAttribute) {
                if (defaultMapAttribute !== attribute) {
                  obj[attribute] = defaultMapAttribute;
                }
              } else {
                obj[attribute] = mapValues[0];
              }
            }
            return obj;
          }, {});
          Object.entries(mappedAttributesObject).forEach(([oldKey, newKey]) => {
            if (returnObject[oldKey] !== void 0 && returnObject[newKey] !== void 0) {
              throw new Error_2.default.InvalidParameter(`Cannot map attribute ${oldKey} to ${newKey} because both are defined`);
            }
            if (returnObject[oldKey] !== void 0) {
              returnObject[newKey] = returnObject[oldKey];
              delete returnObject[oldKey];
            }
          });
        }
      }
      mapAttributes("toDynamo");
      const typeIndexOptionMap = schema2.getTypePaths(returnObject, settings);
      if (settings.typeCheck === void 0 || settings.typeCheck === true) {
        const validParents = [];
        const keysToDelete = [];
        const checkTypeFunction = (item) => {
          const [key, value] = item;
          if (validParents.find((parent) => key.startsWith(parent.key) && (parent.infinite || key.split(".").length === parent.key.split(".").length + 1))) {
            return;
          }
          const genericKey = key.replace(/\.\d+/gu, ".0");
          const existsInSchema = schemaAttributes.includes(genericKey);
          if (existsInSchema) {
            const { isValidType, matchedTypeDetails, typeDetailsArray } = utils_1.default.dynamoose.getValueTypeCheckResult(schema2, value, genericKey, settings, { "standardKey": true, typeIndexOptionMap });
            if (!isValidType) {
              throw new Error_1.default.TypeMismatch(`Expected ${key} to be of type ${typeDetailsArray.map((detail) => detail.dynamicName ? detail.dynamicName() : detail.name.toLowerCase()).join(", ")}, instead found type ${utils_1.default.type_name(value, typeDetailsArray)}.`);
            } else if (matchedTypeDetails.isSet || matchedTypeDetails.name.toLowerCase() === "model" || (matchedTypeDetails.name === "Object" || matchedTypeDetails.name === "Array") && schema2.getAttributeSettingValue("schema", genericKey) === dynamooseAny) {
              validParents.push({ key, "infinite": true });
            } else if (
              /*typeDetails.dynamodbType === "M" || */
              matchedTypeDetails.dynamodbType === "L"
            ) {
              value.forEach((subValue, index, array) => {
                if (index === 0 || typeof subValue !== typeof array[0]) {
                  checkTypeFunction([`${key}.${index}`, subValue]);
                } else if (keysToDelete.includes(`${key}.0`) && typeof subValue === typeof array[0]) {
                  keysToDelete.push(`${key}.${index}`);
                }
              });
              validParents.push({ key });
            }
          } else {
            if (!settings.saveUnknown || !utils_1.default.dynamoose.wildcard_allowed_check(schema2.getSettingValue("saveUnknown"), key)) {
              keysToDelete.push(key);
            }
          }
        };
        utils_1.default.object.entries(returnObject).filter((item) => item[1] !== void 0 && item[1] !== dynamooseUndefined).map(checkTypeFunction);
        keysToDelete.reverse().forEach((key) => utils_1.default.object.delete(returnObject, key));
      }
      if (settings.defaults || settings.forceDefault) {
        await Promise.all((await Item.attributesWithSchema(returnObject, model2)).map(async (key) => {
          const value = utils_1.default.object.get(returnObject, key);
          if (value === dynamooseUndefined) {
            utils_1.default.object.set(returnObject, key, void 0);
          } else {
            const defaultValue = await schema2.defaultCheck(key, value, settings);
            const isDefaultValueUndefined = Array.isArray(defaultValue) ? defaultValue.some((defaultValue2) => typeof defaultValue2 === "undefined" || defaultValue2 === null) : typeof defaultValue === "undefined" || defaultValue === null;
            const parentKey = utils_1.default.parentKey(key);
            const parentValue = parentKey.length === 0 ? returnObject : utils_1.default.object.get(returnObject, parentKey);
            if (!isDefaultValueUndefined) {
              const { isValidType, typeDetailsArray } = utils_1.default.dynamoose.getValueTypeCheckResult(schema2, defaultValue, key, settings, { typeIndexOptionMap });
              if (!isValidType) {
                throw new Error_1.default.TypeMismatch(`Expected ${key} to be of type ${typeDetailsArray.map((detail) => detail.dynamicName ? detail.dynamicName() : detail.name.toLowerCase()).join(", ")}, instead found type ${typeof defaultValue}.`);
              } else if (typeof parentValue !== "undefined" && parentValue !== null) {
                utils_1.default.object.set(returnObject, key, defaultValue);
              }
            }
          }
        }));
      }
      if (settings.customTypesDynamo) {
        (await Item.attributesWithSchema(returnObject, model2)).map((key) => {
          const value = utils_1.default.object.get(returnObject, key);
          const isValueUndefined = typeof value === "undefined" || value === null;
          if (!isValueUndefined) {
            const typeDetails = utils_1.default.dynamoose.getValueTypeCheckResult(schema2, value, key, settings, { typeIndexOptionMap }).matchedTypeDetails;
            const { customType } = typeDetails;
            const { "type": typeInfo } = typeDetails.isOfType(value);
            const isCorrectTypeAlready = typeInfo === (settings.type === "toDynamo" ? "underlying" : "main");
            if (customType && customType.functions[settings.type] && !isCorrectTypeAlready) {
              const customValue = customType.functions[settings.type](value);
              utils_1.default.object.set(returnObject, key, customValue);
            }
          }
        });
      }
      utils_1.default.object.entries(returnObject).filter((item) => typeof item[1] === "object").forEach((item) => {
        const [key, value] = item;
        let typeDetails;
        try {
          typeDetails = utils_1.default.dynamoose.getValueTypeCheckResult(schema2, value, key, settings, { typeIndexOptionMap }).matchedTypeDetails;
        } catch (e) {
          const { Schema: Schema2 } = require_Schema();
          typeDetails = Schema2.attributeTypes.findTypeForValue(value, settings.type, settings);
        }
        if (typeDetails && typeDetails[settings.type]) {
          utils_1.default.object.set(returnObject, key, typeDetails[settings.type](value));
        }
      });
      if (settings.combine) {
        schemaAttributes.map((key) => {
          try {
            const typeDetails = schema2.getAttributeTypeDetails(key);
            return {
              key,
              "type": typeDetails
            };
          } catch (e) {
          }
        }).filter((item) => {
          return Array.isArray(item.type) ? item.type.some((type) => type.name === "Combine") : item.type.name === "Combine";
        }).map((obj) => {
          if (obj && Array.isArray(obj.type)) {
            throw new Error_1.default.InvalidParameter("Combine type is not allowed to be used with multiple types.");
          }
          return obj;
        }).forEach((item) => {
          const { key, type } = item;
          const value = type.typeSettings.attributes.map((attribute) => utils_1.default.object.get(returnObject, attribute)).filter((value2) => typeof value2 !== "undefined" && value2 !== null).join(type.typeSettings.separator);
          utils_1.default.object.set(returnObject, key, value);
        });
      }
      if (settings.modifiers) {
        await Promise.all(settings.modifiers.map(async (modifier) => {
          await Promise.all((await Item.attributesWithSchema(returnObject, model2)).map(async (key) => {
            const value = utils_1.default.object.get(returnObject, key);
            const modifierFunction = await schema2.getAttributeSettingValue(modifier, key, { "returnFunction": true, typeIndexOptionMap });
            const modifierFunctionExists = Array.isArray(modifierFunction) ? modifierFunction.some((val) => Boolean(val)) : Boolean(modifierFunction);
            const isValueUndefined = typeof value === "undefined" || value === null;
            if (modifierFunctionExists && !isValueUndefined) {
              const oldValue = object.original ? utils_1.default.object.get(object.original(), key) : void 0;
              utils_1.default.object.set(returnObject, key, await modifierFunction(value, oldValue));
            }
          }));
          const schemaModifier = schema2.getInternalProperties(internalProperties).settings[modifier];
          if (schemaModifier) {
            returnObject = await schemaModifier(returnObject);
          }
        }));
      }
      if (settings.validate) {
        await Promise.all((await Item.attributesWithSchema(returnObject, model2)).map(async (key) => {
          const value = utils_1.default.object.get(returnObject, key);
          const isValueUndefined = typeof value === "undefined" || value === null;
          if (!isValueUndefined) {
            const validator = await schema2.getAttributeSettingValue("validate", key, { "returnFunction": true, typeIndexOptionMap });
            if (validator) {
              let result;
              if (validator instanceof RegExp) {
                if (typeof value === "string") {
                  result = validator.test(value);
                } else {
                  throw new Error_1.default.ValidationError(`Trying to pass in ${typeof value} to a RegExp validator for key: ${key}.`);
                }
              } else {
                result = typeof validator === "function" ? await validator(value) : validator === value;
              }
              if (!result) {
                throw new Error_1.default.ValidationError(`${key} with a value of ${value} had a validation error when trying to save the item`);
              }
            }
          }
        }));
        const schemaValidator = schema2.getInternalProperties(internalProperties).settings.validate;
        if (schemaValidator) {
          const result = await schemaValidator(returnObject);
          if (!result) {
            throw new Error_1.default.ValidationError(`${JSON.stringify(returnObject)} had a schema validation error when trying to save the item.`);
          }
        }
      }
      if (settings.required) {
        let attributesToCheck = await Item.attributesWithSchema(returnObject, model2);
        if (settings.required === "nested") {
          attributesToCheck = attributesToCheck.filter((attribute) => utils_1.default.object.keys(returnObject).find((key) => attribute === key || attribute.startsWith(key + ".")));
        }
        await Promise.all(attributesToCheck.map(async (key) => {
          const check = async () => {
            const value = utils_1.default.object.get(returnObject, key);
            await schema2.requiredCheck(key, value);
          };
          const keyParts = key.split(".");
          const parentKey = keyParts.slice(0, -1).join(".");
          if (parentKey) {
            const parentValue = utils_1.default.object.get(returnObject, parentKey);
            const isParentValueUndefined = typeof parentValue === "undefined" || parentValue === null;
            if (!isParentValueUndefined) {
              await check();
            }
          } else {
            await check();
          }
        }));
      }
      if (settings.enum) {
        await Promise.all((await Item.attributesWithSchema(returnObject, model2)).map(async (key) => {
          const value = utils_1.default.object.get(returnObject, key);
          const isValueUndefined = typeof value === "undefined" || value === null;
          if (!isValueUndefined) {
            const enumArray = await schema2.getAttributeSettingValue("enum", key, { "returnFunction": false, typeIndexOptionMap });
            if (enumArray && !enumArray.includes(value)) {
              throw new Error_1.default.ValidationError(`${key} must equal ${JSON.stringify(enumArray)}, but is set to ${value}`);
            }
          }
        }));
      }
      mapAttributes("fromDynamo");
      return Object.assign({}, returnObject);
    };
    Item.prototype.toDynamo = async function(settings = {}) {
      const newSettings = Object.assign(Object.assign({}, settings), { "type": "toDynamo" });
      await Item.prepareForObjectFromSchema(this, this.getInternalProperties(internalProperties).model, newSettings);
      const object = await Item.objectFromSchema(this, this.getInternalProperties(internalProperties).model, newSettings);
      return Item.objectToDynamo(object);
    };
    Item.prototype.conformToSchema = async function(settings = { "type": "fromDynamo" }) {
      let item = this;
      if (settings.type === "fromDynamo") {
        item = await this.prepareForResponse();
      }
      const model2 = item.getInternalProperties(internalProperties).model;
      await Item.prepareForObjectFromSchema(item, model2, settings);
      const expectedObject = await Item.objectFromSchema(item, model2, settings);
      if (!expectedObject) {
        return expectedObject;
      }
      const expectedKeys = Object.keys(expectedObject);
      if (settings.mapAttributes) {
        const schema2 = model2.getInternalProperties(internalProperties).schemaForObject(expectedObject);
        const schemaInternalProperties = schema2.getInternalProperties(internalProperties);
        const mapSettingObject = schemaInternalProperties.getMapSettingObject();
        for (const key in mapSettingObject) {
          const expectedObjectValue = utils_1.default.object.get(expectedObject, key);
          if (expectedObjectValue) {
            utils_1.default.object.set(this, key, expectedObjectValue);
          }
        }
      }
      for (const key in item) {
        if (!expectedKeys.includes(key)) {
          delete this[key];
        } else if (this[key] !== expectedObject[key]) {
          this[key] = expectedObject[key];
        }
      }
      return this;
    };
  }
});

// ../../node_modules/dynamoose/dist/Schema.js
var require_Schema = __commonJS({
  "../../node_modules/dynamoose/dist/Schema.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Schema = exports2.IndexType = void 0;
    var Error_1 = require_Error2();
    var utils_1 = require_utils();
    var Internal_1 = require_Internal();
    var Item_1 = require_Item();
    var Model_1 = require_Model();
    var InternalPropertiesClass_1 = require_InternalPropertiesClass();
    var { internalProperties } = Internal_1.default.General;
    var DynamoDBType = class _DynamoDBType {
      constructor(obj) {
        Object.keys(obj).forEach((key) => {
          this[key] = obj[key];
        });
      }
      result(typeSettings) {
        const type = (() => {
          if (this.dynamodbType instanceof _DynamoDBType) {
            return this.dynamodbType;
          } else if (typeof this.dynamodbType === "function") {
            const result2 = this.dynamodbType(typeSettings);
            if (result2 instanceof _DynamoDBType) {
              return result2;
            }
          }
          return this;
        })();
        const underlyingDynamoDBType = (() => {
          if (this.dynamodbType instanceof _DynamoDBType) {
            return this.dynamodbType;
          } else if (typeof this.dynamodbType === "function") {
            const returnedType = this.dynamodbType(typeSettings);
            if (returnedType instanceof _DynamoDBType) {
              return returnedType;
            }
          }
        })();
        const dynamodbType = (() => {
          if (this.dynamodbType instanceof _DynamoDBType) {
            return this.dynamodbType.dynamodbType;
          } else if (typeof this.dynamodbType === "function") {
            const returnedType = this.dynamodbType(typeSettings);
            if (returnedType instanceof _DynamoDBType) {
              return returnedType.dynamodbType;
            } else {
              return returnedType;
            }
          } else {
            return this.dynamodbType;
          }
        })();
        const result = {
          "name": this.name,
          dynamodbType,
          "nestedType": this.nestedType,
          "isOfType": this.jsType.func ? (val) => this.jsType.func(val, typeSettings) : (val) => {
            return [{ "value": this.jsType, "type": "main" }, { "value": underlyingDynamoDBType ? type.jsType : null, "type": "underlying" }].filter((a) => Boolean(a.value)).find((jsType) => typeof jsType.value === "string" ? typeof val === jsType.value : val instanceof jsType.value);
          },
          "isSet": false,
          typeSettings
        };
        if (this.dynamicName) {
          result.dynamicName = () => this.dynamicName(typeSettings);
        }
        if (this.customType) {
          const functions = this.customType.functions(typeSettings);
          result.customType = Object.assign(Object.assign({}, this.customType), { functions });
        }
        const isSetAllowed = typeof type.set === "function" ? type.set(typeSettings) : type.set;
        if (isSetAllowed) {
          result.set = {
            "name": `${this.name} Set`,
            "isSet": true,
            "dynamodbType": `${dynamodbType}S`,
            "isOfType": (val, type2, settings = {}) => {
              if (type2 === "toDynamo") {
                return !settings.saveUnknown && Array.isArray(val) && val.every((subValue) => result.isOfType(subValue)) || val instanceof Set && [...val].every((subValue) => result.isOfType(subValue));
              } else {
                return val instanceof Set;
              }
            },
            "toDynamo": (val) => Array.isArray(val) ? new Set(val) : val,
            typeSettings
          };
          if (this.dynamicName) {
            result.set.dynamicName = () => `${this.dynamicName(typeSettings)} Set`;
          }
          if (this.customType) {
            result.set.customType = {
              "functions": {
                "toDynamo": (val) => val.map(result.customType.functions.toDynamo),
                "fromDynamo": (val) => new Set([...val].map(result.customType.functions.fromDynamo)),
                "isOfType": (val, type2) => {
                  if (type2 === "toDynamo") {
                    return (val instanceof Set || Array.isArray(val) && new Set(val).size === val.length) && [...val].every((item) => result.customType.functions.isOfType(item, type2));
                  } else {
                    return val instanceof Set;
                  }
                }
              }
            };
          }
        }
        return result;
      }
    };
    var attributeTypesMain = (() => {
      const numberType = new DynamoDBType({ "name": "Number", "dynamodbType": "N", "set": true, "jsType": "number" });
      const stringType = new DynamoDBType({ "name": "String", "dynamodbType": "S", "set": true, "jsType": "string" });
      const booleanType = new DynamoDBType({ "name": "Boolean", "dynamodbType": "BOOL", "jsType": "boolean" });
      return [
        new DynamoDBType({ "name": "Any", "jsType": { "func": () => true } }),
        new DynamoDBType({ "name": "Null", "dynamodbType": "NULL", "set": false, "jsType": { "func": (val) => val === null } }),
        new DynamoDBType({ "name": "Buffer", "dynamodbType": "B", "set": true, "jsType": Buffer }),
        booleanType,
        new DynamoDBType({ "name": "Array", "dynamodbType": "L", "jsType": { "func": Array.isArray }, "nestedType": true }),
        new DynamoDBType({ "name": "Object", "dynamodbType": "M", "jsType": { "func": (val) => Boolean(val) && (val.constructor === void 0 || val.constructor === Object) }, "nestedType": true }),
        numberType,
        stringType,
        new DynamoDBType({ "name": "Date", "dynamodbType": (typeSettings) => {
          if (typeSettings && typeSettings.storage === "iso") {
            return stringType;
          } else {
            return numberType;
          }
        }, "customType": {
          "functions": (typeSettings) => ({
            "toDynamo": (val) => {
              if (typeSettings.storage === "seconds") {
                return Math.round(val.getTime() / 1e3);
              } else if (typeSettings.storage === "iso") {
                return val.toISOString();
              } else {
                return val.getTime();
              }
            },
            "fromDynamo": (val) => {
              if (typeSettings.storage === "seconds") {
                return new Date(val * 1e3);
              } else if (typeSettings.storage === "iso") {
                return new Date(val);
              } else {
                return new Date(val);
              }
            },
            "isOfType": (val, type) => {
              if (type === "toDynamo") {
                return val instanceof Date;
              } else {
                if (typeSettings.storage === "iso") {
                  return typeof val === "string";
                } else {
                  return typeof val === "number";
                }
              }
            }
          })
        }, "jsType": Date }),
        new DynamoDBType({ "name": "Combine", "dynamodbType": stringType, "set": false, "jsType": String }),
        new DynamoDBType({ "name": "Constant", "dynamicName": (typeSettings) => {
          return `constant ${typeof typeSettings.value} (${typeSettings.value})`;
        }, "customType": {
          "functions": (typeSettings) => ({
            "isOfType": (val) => typeSettings.value === val
          })
        }, "jsType": { "func": (val, typeSettings) => val === typeSettings.value }, "dynamodbType": (typeSettings) => {
          switch (typeof typeSettings.value) {
            case "string":
              return stringType.dynamodbType;
            case "boolean":
              return booleanType.dynamodbType;
            case "number":
              return numberType.dynamodbType;
          }
        } }),
        new DynamoDBType({ "name": "Model", "dynamicName": (typeSettings) => typeSettings.model.Model.name, "dynamodbType": (typeSettings) => {
          const model2 = typeSettings.model.Model;
          const hashKey = model2.getInternalProperties(internalProperties).getHashKey();
          const rangeKey = model2.getInternalProperties(internalProperties).getRangeKey();
          return rangeKey ? "M" : model2.getInternalProperties(internalProperties).schemas[0].getAttributeType(hashKey);
        }, "set": (typeSettings) => {
          return !typeSettings.model.Model.getInternalProperties(internalProperties).getRangeKey();
        }, "jsType": { "func": (val) => val.prototype instanceof Item_1.Item }, "customType": {
          "functions": (typeSettings) => ({
            "toDynamo": (val) => {
              var _a;
              const model2 = typeSettings.model.Model;
              const hashKey = model2.getInternalProperties(internalProperties).getHashKey();
              const rangeKey = model2.getInternalProperties(internalProperties).getRangeKey();
              if (rangeKey) {
                return {
                  [hashKey]: val[hashKey],
                  [rangeKey]: val[rangeKey]
                };
              } else {
                return (_a = val[hashKey]) !== null && _a !== void 0 ? _a : val;
              }
            },
            "fromDynamo": (val) => val,
            "isOfType": (val, type) => {
              var _a;
              const model2 = typeSettings.model.Model;
              const hashKey = model2.getInternalProperties(internalProperties).getHashKey();
              const rangeKey = model2.getInternalProperties(internalProperties).getRangeKey();
              if (rangeKey) {
                return typeof val === "object" && val[hashKey] && val[rangeKey];
              } else {
                return utils_1.default.dynamoose.getValueTypeCheckResult(model2.getInternalProperties(internalProperties).schemas[0], (_a = val[hashKey]) !== null && _a !== void 0 ? _a : val, hashKey, { type }, {}).isValidType;
              }
            }
          })
        } })
      ];
    })();
    var attributeTypes = utils_1.default.array_flatten(attributeTypesMain.filter((checkType) => !checkType.customType).map((checkType) => checkType.result()).map((a) => [a, a.set])).filter((a) => Boolean(a));
    var IndexType;
    (function(IndexType2) {
      IndexType2["global"] = "global";
      IndexType2["local"] = "local";
    })(IndexType || (exports2.IndexType = IndexType = {}));
    function getTimestampAttributes(timestamps) {
      if (!timestamps) {
        return [];
      }
      const createdAtArray = Array.isArray(timestamps.createdAt) ? timestamps.createdAt : [timestamps.createdAt];
      const updatedAtArray = Array.isArray(timestamps.updatedAt) ? timestamps.updatedAt : [timestamps.updatedAt];
      const combinedArray = [];
      function forEachFunc(type, inputArray) {
        return (val) => {
          if (typeof val === "string") {
            inputArray.push({
              "name": val,
              "value": Date,
              type
            });
          } else if (val) {
            Object.entries(val).forEach(([key, value]) => {
              inputArray.push({
                "name": key,
                "value": value,
                type
              });
            });
          }
        };
      }
      createdAtArray.forEach(forEachFunc("createdAt", combinedArray));
      updatedAtArray.forEach(forEachFunc("updatedAt", combinedArray));
      return combinedArray;
    }
    var Schema2 = class _Schema extends InternalPropertiesClass_1.InternalPropertiesClass {
      /**
       * You can use this method to create a schema. The `schema` parameter is an object defining your schema, each value should be a type or object defining the type with additional settings (listed below).
       *
       * The `options` parameter is an optional object with the following options:
       *
       * | Name | Type | Default | Information
       * |---|---|---|---|
       * | `saveUnknown` | array \| boolean | false | This setting lets you specify if the schema should allow properties not defined in the schema. If you pass `true` in for this option all unknown properties will be allowed. If you pass in an array of strings, only properties that are included in that array will be allowed. If you pass in an array of strings, you can use `*` to indicate a wildcard nested property one level deep, or `**` to indicate a wildcard nested property infinite levels deep (ex. `["person.*", "friend.**"]` will allow you store a property `person` with 1 level of unknown properties and `friend` with infinitely nested level unknown properties). If you retrieve items from DynamoDB with `saveUnknown` enabled, all custom Dynamoose types will be returned as the underlying DynamoDB type (ex. Dates will be returned as a Number representing number of milliseconds since Jan 1 1970).
       * | `timestamps` | boolean \| object | false | This setting lets you indicate to Dynamoose that you would like it to handle storing timestamps in your items for both creation and most recent update times. If you pass in an object for this setting you must specify two keys `createdAt` & `updatedAt`, each with a value of a string or array of strings being the name of the attribute(s) for each timestamp. You can also set each of the `createdAt` & `updatedAt` properties equal to a Schema object. The keys of this Schema object represent the name of the attributes, with the value allowing for customization such as changing the storage type of the date. If you pass in `null` for either of those keys that specific timestamp won't be added to the schema. If you set this option to `true` it will use the default attribute names of `createdAt` & `updatedAt`.
       * | `get` | function \| async function | undefined | You can use a get function on the schema to be run whenever retrieving an item from DynamoDB. Dynamoose will pass the entire item into this function and you must return the new value of the entire object you want Dynamoose to return to the application. This function will be run after all property `get` functions are run.
       * | `set` | function \| async function | undefined | You can use a set function on the schema to be run whenever saving an item to DynamoDB. It will also be used when retrieving an item (ie. `get`, `query`, `update`, etc). Dynamoose will pass the entire item into this function and you must return the new value of the entire object you want Dynamoose to save to DynamoDB. This function will be run after all property `set` functions are run.
       * | `validate` | function \| async function | undefined | You can use a validate function on the schema to ensure the value passes a given validation before saving the item. Dynamoose will pass the entire item into this function and you must return a boolean (`true` if validation passes or `false` if validation fails) or throw an error. This function will be run after all property `validate` functions are run.
       *
       * ```js
       * const dynamoose = require("dynamoose");
       * const schema = new dynamoose.Schema({
       * 	"id": String,
       * 	"age": Number
       * }, {
       * 	"saveUnknown": true,
       * 	"timestamps": true
       * });
       * ```
       *
       * ```js
       * const dynamoose = require("dynamoose");
       *
       * const schema = new dynamoose.Schema({
       * 	"id": String,
       * 	"person": Object,
       * 	"friend": Object
       * }, {
       * 	"saveUnknown": [
       * 		"person.*", // store 1 level deep of nested properties in `person` property
       * 		"friend.**" // store infinite levels deep of nested properties in `friend` property
       * 	],
       * });
       * ```
       *
       * ```js
       * const dynamoose = require("dynamoose");
       *
       * const schema = new dynamoose.Schema({
       * 	"id": String,
       * 	"age": {
       * 		"type": Number,
       * 		"default": 5
       * 	}
       * });
       * ```
       *
       * ```js
       * const dynamoose = require("dynamoose");
       *
       * const schema = new dynamoose.Schema({
       * 	"id": String,
       * 	"name": String
       * }, {
       * 	"timestamps": {
       * 		"createdAt": "createDate",
       * 		"updatedAt": null // updatedAt will not be stored as part of the timestamp
       * 	}
       * });
       * ```
       *
       * ```js
       * const dynamoose = require("dynamoose");
       *
       * const schema = new dynamoose.Schema({
       * 	"id": String,
       * 	"name": String
       * }, {
       * 	"timestamps": {
       * 		"createdAt": ["createDate", "creation"],
       * 		"updatedAt": ["updateDate", "updated"]
       * 	}
       * });
       * ```
       *
       * ```js
       * const dynamoose = require("dynamoose");
       *
       * const schema = new dynamoose.Schema({
       * 	"id": String,
       * 	"name": String
       * }, {
       * 	"timestamps": {
       * 		"createdAt": {
       * 			"created_at": {
       * 				"type": {
       * 					"value": Date,
       * 					"settings": {
       * 						"storage": "iso"
       * 					}
       * 				}
       * 			}
       * 		},
       * 		"updatedAt": {
       * 			"updated": {
       * 				"type": {
       * 					"value": Date,
       * 					"settings": {
       * 						"storage": "seconds"
       * 					}
       * 				}
       * 			}
       * 		}
       * 	}
       * });
       * ```
       *
       * ```js
       * const dynamoose = require("dynamoose");
       *
       * const schema = new dynamoose.Schema({
       * 	"id": String,
       * 	"name": String
       * }, {
       * 	"validate": (obj) => {
       * 		if (!obj.id.beginsWith(name[0])) {
       * 			throw new Error("id first letter of name.");
       * 		}
       * 		return true;
       * 	}
       * });
       * ```
       * @param object The schema object.
       * @param settings The settings to apply to the schema.
       */
      constructor(object, settings = {}) {
        super();
        if (!object || typeof object !== "object" || Array.isArray(object)) {
          throw new Error_1.default.InvalidParameterType("Schema initialization parameter must be an object.");
        }
        if (Object.keys(object).length === 0) {
          throw new Error_1.default.InvalidParameter("Schema initialization parameter must not be an empty object.");
        }
        if (settings.timestamps === true) {
          settings.timestamps = {
            "createdAt": "createdAt",
            "updatedAt": "updatedAt"
          };
        }
        if (settings.timestamps) {
          const combinedArray = getTimestampAttributes(settings.timestamps);
          combinedArray.forEach((prop) => {
            if (object[prop.name]) {
              throw new Error_1.default.InvalidParameter("Timestamp attributes must not be defined in schema.");
            }
            object[prop.name] = prop.value;
          });
        }
        let parsedSettings = Object.assign({}, settings);
        const parsedObject = Object.assign({}, object);
        utils_1.default.object.entries(parsedObject).filter((entry) => entry[1] instanceof _Schema).forEach((entry) => {
          const [key, value] = entry;
          let newValue = {
            "type": Object,
            "schema": value.getInternalProperties(internalProperties).schemaObject
          };
          if (key.endsWith(".schema")) {
            newValue = value.getInternalProperties(internalProperties).schemaObject;
          }
          const subSettings = Object.assign({}, value.getInternalProperties(internalProperties).settings);
          Object.entries(subSettings).forEach((entry2) => {
            const [settingsKey, settingsValue] = entry2;
            switch (settingsKey) {
              case "saveUnknown":
                subSettings[settingsKey] = typeof subSettings[settingsKey] === "boolean" ? [`${key}.**`] : settingsValue.map((val) => `${key}.${val}`);
                break;
              case "timestamps":
                subSettings[settingsKey] = Object.entries(subSettings[settingsKey]).reduce((obj, entity) => {
                  const [subKey, subValue] = entity;
                  obj[subKey] = Array.isArray(subValue) ? subValue.map((subValue2) => `${key}.${subValue2}`) : `${key}.${subValue}`;
                  return obj;
                }, {});
                break;
            }
          });
          parsedSettings = utils_1.default.merge_objects.main({ "combineMethod": "array_merge_new_array" })(parsedSettings, subSettings);
          utils_1.default.object.set(parsedObject, key, newValue);
        });
        utils_1.default.object.entries(parsedObject).forEach((entry) => {
          const key = entry[0];
          const value = entry[1];
          if (!key.endsWith(".type") && !key.endsWith(".0")) {
            if (value && value.Model && value.Model instanceof Model_1.Model) {
              utils_1.default.object.set(parsedObject, key, { "type": value });
            } else if (value && Array.isArray(value)) {
              value.forEach((item, index) => {
                if (item && item.Model && item.Model instanceof Model_1.Model) {
                  utils_1.default.object.set(parsedObject, `${key}.${index}`, { "type": item });
                }
              });
            }
          }
        });
        const mapSettingNames = [
          "map",
          "alias",
          "aliases"
        ];
        const defaultMapSettingNames = [
          "defaultMap",
          "defaultAlias"
        ];
        this.setInternalProperties(internalProperties, {
          "schemaObject": parsedObject,
          "settings": parsedSettings,
          "getMapSettingValuesForKey": (key, settingNames) => utils_1.default.array_flatten(mapSettingNames.filter((name) => !settingNames || settingNames.includes(name)).map((mapSettingName) => {
            const result = this.getAttributeSettingValue(mapSettingName, key);
            if (Array.isArray(result)) {
              const filteredArray = result.filter((item) => Boolean(item));
              return filteredArray.length === 0 ? void 0 : [...new Set(filteredArray)];
            }
            return result;
          }).filter((v) => Boolean(v))),
          "getMapSettingObject": () => {
            const attributes = this.attributes();
            return attributes.reduce((obj, attribute) => {
              const mapSettingValues = this.getInternalProperties(internalProperties).getMapSettingValuesForKey(attribute);
              mapSettingValues.forEach((val) => {
                obj[val] = attribute;
              });
              return obj;
            }, {});
          },
          "getDefaultMapAttribute": (attribute) => {
            for (const name of defaultMapSettingNames) {
              const result = this.getAttributeSettingValue(name, attribute);
              if (result) {
                return result;
              }
            }
          },
          "getIndexAttributes": () => {
            return this.attributes().map((attribute) => ({
              "index": this.getAttributeSettingValue("index", attribute),
              attribute
            })).filter((obj) => Array.isArray(obj.index) ? obj.index.some((index) => Boolean(index)) : obj.index).reduce((accumulator, currentValue) => {
              if (Array.isArray(currentValue.index)) {
                currentValue.index.forEach((currentIndex) => {
                  accumulator.push(Object.assign(Object.assign({}, currentValue), { "index": currentIndex }));
                });
              } else {
                accumulator.push(currentValue);
              }
              return accumulator;
            }, []);
          },
          "getTimestampAttributes": () => getTimestampAttributes(settings.timestamps)
        });
        const checkAttributeNameDots = (object2) => {
          Object.keys(object2).forEach((key) => {
            if (key.includes(".")) {
              throw new Error_1.default.InvalidParameter("Attributes must not contain dots.");
            }
            if (typeof object2[key] === "object" && object2[key] !== null && object2[key].schema) {
              checkAttributeNameDots(
                object2[key].schema
                /*, key*/
              );
            }
          });
        };
        checkAttributeNameDots(this.getInternalProperties(internalProperties).schemaObject);
        const checkMultipleArraySchemaElements = (key) => {
          let attributeType = [];
          try {
            const tmpAttributeType = this.getAttributeType(key);
            attributeType = Array.isArray(tmpAttributeType) ? tmpAttributeType : [tmpAttributeType];
          } catch (e) {
          }
          if (attributeType.some((type) => type === "L") && (this.getAttributeValue(key).schema || []).length > 1) {
            throw new Error_1.default.InvalidParameter("You must only pass one element into schema array.");
          }
        };
        this.attributes().forEach((key) => checkMultipleArraySchemaElements(key));
        const hashRangeKeys = this.attributes().reduce((val, key) => {
          const hashKey = this.getAttributeSettingValue("hashKey", key);
          const rangeKey = this.getAttributeSettingValue("rangeKey", key);
          const isHashKey = Array.isArray(hashKey) ? hashKey.every((item) => Boolean(item)) : hashKey;
          const isRangeKey = Array.isArray(rangeKey) ? rangeKey.every((item) => Boolean(item)) : rangeKey;
          if (isHashKey) {
            val.hashKeys.push(key);
          }
          if (isRangeKey) {
            val.rangeKeys.push(key);
          }
          if (isHashKey && isRangeKey) {
            val.hashAndRangeKeyAttributes.push(key);
          }
          return val;
        }, { "hashKeys": [], "rangeKeys": [], "hashAndRangeKeyAttributes": [] });
        const keyTypes = ["hashKey", "rangeKey"];
        keyTypes.forEach((keyType) => {
          if (hashRangeKeys[`${keyType}s`].length > 1) {
            throw new Error_1.default.InvalidParameter(`Only one ${keyType} allowed per schema.`);
          }
          if (hashRangeKeys[`${keyType}s`].find((key) => key.includes("."))) {
            throw new Error_1.default.InvalidParameter(`${keyType} must be at root object and not nested in object or array.`);
          }
        });
        if (hashRangeKeys.hashAndRangeKeyAttributes.length > 0) {
          throw new Error_1.default.InvalidParameter(`Attribute ${hashRangeKeys.hashAndRangeKeyAttributes[0]} must not be both hashKey and rangeKey`);
        }
        this.attributes().forEach((key) => {
          const attributeSettingValue = this.getAttributeSettingValue("index", key);
          if (key.includes(".") && (Array.isArray(attributeSettingValue) ? attributeSettingValue.some((singleValue) => Boolean(singleValue)) : attributeSettingValue)) {
            throw new Error_1.default.InvalidParameter("Index must be at root object and not nested in object or array.");
          }
        });
        this.attributes().forEach((key) => {
          try {
            this.getAttributeType(key);
          } catch (e) {
            if (!e.message.includes("is not allowed to be a set")) {
              throw new Error_1.default.InvalidParameter(`Attribute ${key} does not have a valid type.`);
            }
          }
        });
        this.attributes().forEach((key) => {
          const mapSettingValues = mapSettingNames.map((name) => this.getInternalProperties(internalProperties).getMapSettingValuesForKey(key, [name])).filter((v) => Boolean(v) && (!Array.isArray(v) || v.length > 0));
          if (mapSettingValues.length > 1) {
            throw new Error_1.default.InvalidParameter("Only one of map, alias, or aliases can be specified per attribute.");
          }
        });
        this.attributes().forEach((key) => {
          const defaultMapSettingValues = utils_1.default.array_flatten(defaultMapSettingNames.map((mapSettingName) => {
            const result = this.getAttributeSettingValue(mapSettingName, key);
            if (Array.isArray(result)) {
              const filteredArray = result.filter((item) => Boolean(item));
              return filteredArray.length === 0 ? void 0 : filteredArray;
            }
            return result;
          }).filter((v) => Boolean(v)));
          if (defaultMapSettingValues.length > 1) {
            throw new Error_1.default.InvalidParameter("Only defaultMap or defaultAlias can be specified per attribute.");
          }
          const defaultMapSettingValue = defaultMapSettingValues[0];
          const defaultMapAttribute = defaultMapSettingNames.find((mapSettingName) => this.getAttributeSettingValue(mapSettingName, key));
          if (defaultMapSettingValue) {
            if (!this.getInternalProperties(internalProperties).getMapSettingValuesForKey(key).includes(defaultMapSettingValue) && defaultMapSettingValue !== key) {
              throw new Error_1.default.InvalidParameter(`${defaultMapAttribute} must exist in map, alias, or aliases property or be equal to attribute name.`);
            }
          }
        });
        const mapAttributes = this.attributes().map((key) => this.getInternalProperties(internalProperties).getMapSettingValuesForKey(key));
        const mapAttributesFlattened = utils_1.default.array_flatten(mapAttributes);
        const mapAttributesSet = new Set(mapAttributesFlattened);
        if (mapAttributesSet.size !== mapAttributesFlattened.length) {
          throw new Error_1.default.InvalidParameter("Each properties map, alias, or aliases properties must be unique across the entire schema.");
        }
        if ([...mapAttributesSet].some((key) => this.attributes().includes(key))) {
          throw new Error_1.default.InvalidParameter("Each properties map, alias, or aliases properties must be not be used as a property name in the schema.");
        }
      }
      /**
       * This property returns an array of strings with each string being the name of an attribute. Only attributes that are indexes are returned.
       *
       * ```js
       * const schema = new Schema({
       * 	"id": String,
       * 	"name": {
       * 		"type": String,
       * 		"index": true
       * 	}
       * });
       * console.log(schema.indexAttributes); // ["name"]
       * ```
       */
      get indexAttributes() {
        return this.getInternalProperties(internalProperties).getIndexAttributes().map((key) => key.attribute);
      }
      async getCreateTableAttributeParams(model2) {
        const hashKey = this.hashKey;
        const AttributeDefinitions = [
          {
            "AttributeName": hashKey,
            "AttributeType": this.getSingleAttributeType(hashKey)
          }
        ];
        const AttributeDefinitionsNames = [hashKey];
        const KeySchema = [
          {
            "AttributeName": hashKey,
            "KeyType": "HASH"
          }
        ];
        const rangeKey = this.rangeKey;
        if (rangeKey) {
          AttributeDefinitions.push({
            "AttributeName": rangeKey,
            "AttributeType": this.getSingleAttributeType(rangeKey)
          });
          AttributeDefinitionsNames.push(rangeKey);
          KeySchema.push({
            "AttributeName": rangeKey,
            "KeyType": "RANGE"
          });
        }
        utils_1.default.array_flatten(await Promise.all([this.getInternalProperties(internalProperties).getIndexAttributes(), this.getIndexRangeKeyAttributes()])).map((obj) => obj.attribute).forEach((index) => {
          if (AttributeDefinitionsNames.includes(index)) {
            return;
          }
          AttributeDefinitionsNames.push(index);
          AttributeDefinitions.push({
            "AttributeName": index,
            "AttributeType": this.getSingleAttributeType(index)
          });
        });
        const response = {
          AttributeDefinitions,
          KeySchema
        };
        const { GlobalSecondaryIndexes, LocalSecondaryIndexes } = await this.getIndexes(model2);
        if (GlobalSecondaryIndexes) {
          response.GlobalSecondaryIndexes = GlobalSecondaryIndexes;
        }
        if (LocalSecondaryIndexes) {
          response.LocalSecondaryIndexes = LocalSecondaryIndexes;
        }
        return response;
      }
      // This function has the same behavior as `getAttributeType` except if the schema has multiple types, it will throw an error. This is useful for attribute definitions and keys for when you are only allowed to have one type for an attribute
      getSingleAttributeType(key, value, settings) {
        const attributeType = this.getAttributeType(key, value, settings);
        if (Array.isArray(attributeType)) {
          throw new Error_1.default.InvalidParameter(`You can not have multiple types for attribute definition: ${key}.`);
        }
        return attributeType;
      }
      getAttributeType(key, value, settings) {
        try {
          const typeDetails = this.getAttributeTypeDetails(key);
          return Array.isArray(typeDetails) ? typeDetails.map((detail) => detail.dynamodbType) : typeDetails.dynamodbType;
        } catch (e) {
          if ((settings === null || settings === void 0 ? void 0 : settings.unknownAttributeAllowed) && e.message === `Invalid Attribute: ${key}` && value) {
            return Object.keys(Item_1.Item.objectToDynamo(value, { "type": "value" }))[0];
          } else {
            throw e;
          }
        }
      }
      /**
       * This property returns the property name of your schema's hash key.
       *
       * ```js
       * const schema = new dynamoose.Schema({"id": String});
       * console.log(schema.hashKey); // "id"
       * ```
       */
      get hashKey() {
        return Object.keys(this.getInternalProperties(internalProperties).schemaObject).find((key) => this.getInternalProperties(internalProperties).schemaObject[key].hashKey) || Object.keys(this.getInternalProperties(internalProperties).schemaObject)[0];
      }
      /**
       * This property returns the property name of your schema's range key. It will return undefined if a range key does not exist for your schema.
       * ```js
       * const schema = new dynamoose.Schema({"id": String, "type": {"type": String, "rangeKey": true}});
       * console.log(schema.rangeKey); // "type"
       * ```
       *
       * ```js
       * const schema = new dynamoose.Schema({"id": String});
       * console.log(schema.rangeKey); // undefined
       * ```
       */
      get rangeKey() {
        return Object.keys(this.getInternalProperties(internalProperties).schemaObject).find((key) => this.getInternalProperties(internalProperties).schemaObject[key].rangeKey);
      }
      // This function will take in an attribute and value, and returns the default value if it should be applied.
      async defaultCheck(key, value, settings) {
        const isValueUndefined = typeof value === "undefined" || value === null;
        if (settings.defaults && isValueUndefined || settings.forceDefault && this.getAttributeSettingValue("forceDefault", key)) {
          const defaultValueRaw = this.getAttributeSettingValue("default", key);
          let hasMultipleTypes;
          try {
            hasMultipleTypes = Array.isArray(this.getAttributeType(key));
          } catch (e) {
            hasMultipleTypes = false;
          }
          const defaultValue = Array.isArray(defaultValueRaw) && hasMultipleTypes ? defaultValueRaw[0] : defaultValueRaw;
          const isDefaultValueUndefined = typeof defaultValue === "undefined" || defaultValue === null;
          if (!isDefaultValueUndefined) {
            return defaultValue;
          }
        }
      }
      getAttributeSettingValue(setting, key, settings = { "returnFunction": false }) {
        function func(attributeValue2) {
          const defaultPropertyValue = (attributeValue2 || {})[setting];
          return typeof defaultPropertyValue === "function" && !settings.returnFunction ? defaultPropertyValue() : defaultPropertyValue;
        }
        const attributeValue = this.getAttributeValue(key, { "typeIndexOptionMap": settings.typeIndexOptionMap });
        if (Array.isArray(attributeValue)) {
          return attributeValue.map(func);
        } else {
          return func(attributeValue);
        }
      }
      getTypePaths(object, settings = { "type": "toDynamo" }) {
        return Object.entries(object).reduce((result, entry) => {
          const [key, value] = entry;
          const fullKey = [settings.previousKey, key].filter((a) => Boolean(a)).join(".");
          let typeCheckResult;
          try {
            typeCheckResult = utils_1.default.dynamoose.getValueTypeCheckResult(this, value, fullKey, settings, {});
          } catch (e) {
            if (result && settings.includeAllProperties) {
              result[fullKey] = {
                "index": 0,
                "matchCorrectness": 0.5,
                "entryCorrectness": [0.5]
              };
            }
            return result;
          }
          const { typeDetails, matchedTypeDetailsIndex, matchedTypeDetailsIndexes } = typeCheckResult;
          const hasMultipleTypes = Array.isArray(typeDetails);
          const isObject = typeof value === "object" && !(value instanceof Buffer) && value !== null;
          if (hasMultipleTypes) {
            if (matchedTypeDetailsIndexes.length > 1 && isObject) {
              result[fullKey] = matchedTypeDetailsIndexes.map((index) => {
                const entryCorrectness = utils_1.default.object.entries(value).map((entry2) => {
                  const [subKey, subValue] = entry2;
                  try {
                    const { isValidType } = utils_1.default.dynamoose.getValueTypeCheckResult(this, subValue, `${fullKey}.${subKey}`, settings, { "typeIndexOptionMap": { [fullKey]: index } });
                    return isValidType ? 1 : 0;
                  } catch (e) {
                    return 0.5;
                  }
                });
                return {
                  index,
                  // 1 = full match
                  // 0.5 = attributes don't exist
                  // 0 = types don't match
                  "matchCorrectness": Math.min(...entryCorrectness),
                  entryCorrectness
                };
              }).sort((a, b) => {
                if (a.matchCorrectness === b.matchCorrectness) {
                  return b.entryCorrectness.reduce((a2, b2) => a2 + b2, 0) - a.entryCorrectness.reduce((a2, b2) => a2 + b2, 0);
                } else {
                  return b.matchCorrectness - a.matchCorrectness;
                }
              }).map((a) => a.index)[0];
            }
            if (result[fullKey] === void 0) {
              result[fullKey] = matchedTypeDetailsIndex;
            }
          } else if (settings.includeAllProperties) {
            const matchCorrectness = typeCheckResult.isValidType ? 1 : 0;
            result[fullKey] = {
              "index": 0,
              matchCorrectness,
              "entryCorrectness": [matchCorrectness]
            };
          }
          if (isObject) {
            result = Object.assign(Object.assign({}, result), this.getTypePaths(value, Object.assign(Object.assign({}, settings), { "previousKey": fullKey })));
          }
          return result;
        }, {});
      }
    };
    exports2.Schema = Schema2;
    Schema2.attributeTypes = {
      "findDynamoDBType": (type) => attributeTypes.find((checkType) => checkType.dynamodbType === type),
      "findTypeForValue": (...args) => attributeTypes.find((checkType) => checkType.isOfType(...args))
    };
    Schema2.prototype.requiredCheck = async function(key, value) {
      const isRequired = this.getAttributeSettingValue("required", key);
      if ((typeof value === "undefined" || value === null) && (Array.isArray(isRequired) ? isRequired.some((val) => Boolean(val)) : isRequired)) {
        throw new Error_1.default.ValidationError(`${key} is a required property but has no value when trying to save item`);
      }
    };
    Schema2.prototype.getIndexRangeKeyAttributes = async function() {
      const indexes = await this.getInternalProperties(internalProperties).getIndexAttributes();
      return indexes.map((index) => index.index.rangeKey).filter((a) => Boolean(a)).map((a) => ({ "attribute": a }));
    };
    Schema2.prototype.getIndexes = async function(model2) {
      const indexes = (await this.getInternalProperties(internalProperties).getIndexAttributes()).reduce((accumulator, currentValue) => {
        const indexValue = currentValue.index;
        const attributeValue = currentValue.attribute;
        const isGlobalIndex = indexValue.type === "global" || !indexValue.type;
        const dynamoIndexObject = {
          "IndexName": indexValue.name || `${attributeValue}${isGlobalIndex ? "GlobalIndex" : "LocalIndex"}`,
          "KeySchema": [],
          "Projection": { "ProjectionType": "KEYS_ONLY" }
        };
        if (indexValue.project || typeof indexValue.project === "undefined" || indexValue.project === null) {
          dynamoIndexObject.Projection = Array.isArray(indexValue.project) ? { "ProjectionType": "INCLUDE", "NonKeyAttributes": indexValue.project } : { "ProjectionType": "ALL" };
        }
        if (isGlobalIndex) {
          dynamoIndexObject.KeySchema.push({ "AttributeName": attributeValue, "KeyType": "HASH" });
          if (indexValue.rangeKey) {
            dynamoIndexObject.KeySchema.push({ "AttributeName": indexValue.rangeKey, "KeyType": "RANGE" });
          }
          const throughputObject = utils_1.default.dynamoose.get_provisioned_throughput(indexValue.throughput ? indexValue : model2.getInternalProperties(internalProperties).table().getInternalProperties(internalProperties).options.throughput === "ON_DEMAND" ? {} : model2.getInternalProperties(internalProperties).table().getInternalProperties(internalProperties).options);
          if ("ProvisionedThroughput" in throughputObject) {
            dynamoIndexObject.ProvisionedThroughput = throughputObject.ProvisionedThroughput;
          }
        } else {
          dynamoIndexObject.KeySchema.push({ "AttributeName": this.hashKey, "KeyType": "HASH" });
          dynamoIndexObject.KeySchema.push({ "AttributeName": attributeValue, "KeyType": "RANGE" });
        }
        const accumulatorKey = isGlobalIndex ? "GlobalSecondaryIndexes" : "LocalSecondaryIndexes";
        if (!accumulator[accumulatorKey]) {
          accumulator[accumulatorKey] = [];
        }
        accumulator[accumulatorKey].push(dynamoIndexObject);
        return accumulator;
      }, {});
      indexes.TableIndex = { "KeySchema": [{ "AttributeName": this.hashKey, "KeyType": "HASH" }] };
      const rangeKey = this.rangeKey;
      if (rangeKey) {
        indexes.TableIndex.KeySchema.push({ "AttributeName": rangeKey, "KeyType": "RANGE" });
      }
      return indexes;
    };
    Schema2.prototype.getSettingValue = function(setting) {
      return this.getInternalProperties(internalProperties).settings[setting];
    };
    Schema2.prototype.attributes = function(object, settings) {
      const typePaths = object && this.getTypePaths(object);
      const main2 = (object2, existingKey = "") => {
        return Object.keys(object2).reduce((accumulator, key) => {
          const keyWithExisting = `${existingKey ? `${existingKey}.` : ""}${key}`;
          accumulator.push(keyWithExisting);
          if (settings === null || settings === void 0 ? void 0 : settings.includeMaps) {
            accumulator.push(...this.getInternalProperties(internalProperties).getMapSettingValuesForKey(keyWithExisting));
          }
          let attributeType;
          try {
            const tmpAttributeType = this.getAttributeType(keyWithExisting);
            attributeType = Array.isArray(tmpAttributeType) ? tmpAttributeType : [tmpAttributeType];
          } catch (e) {
          }
          function recursive(type, arrayTypeIndex) {
            if ((type === "M" || type === "L") && (object2[key][arrayTypeIndex] || object2[key]).schema) {
              accumulator.push(...main2((object2[key][arrayTypeIndex] || object2[key]).schema, keyWithExisting));
            }
          }
          if (attributeType) {
            if (typePaths && typePaths[keyWithExisting] !== void 0) {
              const index = typePaths[keyWithExisting];
              const type = attributeType[index];
              recursive(type, index);
            } else {
              attributeType.forEach(recursive);
            }
          }
          return accumulator;
        }, []);
      };
      return main2(this.getInternalProperties(internalProperties).schemaObject);
    };
    Schema2.prototype.getAttributeValue = function(key, settings) {
      const previousKeyParts = [];
      let result = ((settings === null || settings === void 0 ? void 0 : settings.standardKey) ? key : key.replace(/\.\d+/gu, ".0")).split(".").reduce((result2, part) => {
        if (Array.isArray(result2)) {
          const predefinedIndex = settings && settings.typeIndexOptionMap && settings.typeIndexOptionMap[previousKeyParts.join(".")];
          if (predefinedIndex !== void 0) {
            result2 = result2[predefinedIndex];
          } else {
            result2 = result2.find((item) => item.schema && item.schema[part]);
          }
        }
        previousKeyParts.push(part);
        return utils_1.default.object.get(result2.schema, part);
      }, { "schema": this.getInternalProperties(internalProperties).schemaObject });
      if (Array.isArray(result)) {
        const predefinedIndex = settings && settings.typeIndexOptionMap && settings.typeIndexOptionMap[previousKeyParts.join(".")];
        if (predefinedIndex !== void 0) {
          result = result[predefinedIndex];
        }
      }
      return result;
    };
    function retrieveTypeInfo(type, isSet, key, typeSettings) {
      const foundType = attributeTypesMain.find((checkType) => checkType.name.toLowerCase() === type.toLowerCase());
      if (!foundType) {
        throw new Error_1.default.InvalidType(`${key} contains an invalid type: ${type}`);
      }
      const parentType = foundType.result(typeSettings);
      if (!parentType.set && isSet) {
        throw new Error_1.default.InvalidType(`${key} with type: ${type} is not allowed to be a set`);
      }
      return isSet ? parentType.set : parentType;
    }
    Schema2.prototype.getAttributeTypeDetails = function(key, settings = {}) {
      const standardKey = settings.standardKey ? key : key.replace(/\.\d+/gu, ".0");
      const val = this.getAttributeValue(standardKey, Object.assign(Object.assign({}, settings), { "standardKey": true }));
      if (typeof val === "undefined") {
        throw new Error_1.default.UnknownAttribute(`Invalid Attribute: ${key}`);
      }
      let typeVal = typeof val === "object" && !Array.isArray(val) && val.type ? val.type : val;
      let typeSettings = {};
      if (typeof typeVal === "object" && !Array.isArray(typeVal)) {
        typeSettings = typeVal.settings || {};
        typeVal = typeVal.value;
      }
      const getType = (typeVal2) => {
        let type;
        const isThisType = typeVal2 === Internal_1.default.Public.this;
        const isNullType = typeVal2 === Internal_1.default.Public.null;
        const isAnyType = typeVal2 === Internal_1.default.Public.any;
        if (typeof typeVal2 === "function" || isThisType) {
          if (typeVal2.prototype instanceof Item_1.Item || isThisType) {
            type = "model";
            if (isThisType) {
              const obj = {
                "getInternalProperties": () => ({
                  "schemas": [this],
                  "getHashKey": () => this.hashKey,
                  "getRangeKey": () => this.rangeKey
                })
              };
              typeSettings.model = { "Model": obj };
            } else {
              typeSettings.model = typeVal2;
            }
          } else {
            const regexFuncName = /^Function ([^(]+)\(/iu;
            [, type] = typeVal2.toString().match(regexFuncName);
          }
        } else if (isNullType) {
          type = "null";
        } else if (isAnyType) {
          type = "any";
        } else if (typeVal2.toLowerCase() === "null") {
          throw new Error('Please use dynamoose.type.NULL instead of "null" for your type attribute.');
        } else if (typeVal2.toLowerCase() === "any") {
          throw new Error('Please use dynamoose.type.ANY instead of "any" for your type attribute.');
        } else {
          type = typeVal2;
        }
        return type;
      };
      const result = (Array.isArray(typeVal) ? typeVal : [typeVal]).map((item, index) => {
        item = typeof item === "object" && !Array.isArray(item) && item.type ? item.type : item;
        if (typeof item === "object" && !Array.isArray(item)) {
          typeSettings = item.settings || {};
          item = item.value;
        }
        let type = getType(item);
        const isSet = type.toLowerCase() === "set";
        if (isSet) {
          let schemaValue = this.getAttributeSettingValue("schema", key);
          if (Array.isArray(schemaValue[index])) {
            schemaValue = schemaValue[index];
          }
          const subValue = schemaValue[0];
          type = getType(typeof subValue === "object" && subValue.type ? subValue.type : subValue);
        }
        const returnObject2 = retrieveTypeInfo(type, isSet, key, typeSettings);
        return returnObject2;
      });
      const returnObject = result.length < 2 ? result[0] : result;
      return returnObject;
    };
  }
});

// ../../node_modules/dynamoose/dist/Serializer.js
var require_Serializer = __commonJS({
  "../../node_modules/dynamoose/dist/Serializer.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Serializer = void 0;
    var Error_1 = require_Error2();
    var utils_1 = require_utils();
    var InternalPropertiesClass_1 = require_InternalPropertiesClass();
    var Internal_1 = require_Internal();
    var { internalProperties } = Internal_1.default.General;
    var Serializer = class _Serializer extends InternalPropertiesClass_1.InternalPropertiesClass {
      constructor() {
        super();
        this.default = {
          "set": (name) => {
            if (typeof name === "undefined" || name === null) {
              name = _Serializer.defaultName;
            }
            if (!name || typeof name !== "string") {
              throw new Error_1.default.InvalidParameter("Field name is required and should be of type string");
            }
            if (Object.keys(this.getInternalProperties(internalProperties).serializers).includes(name)) {
              this.setInternalProperties(internalProperties, Object.assign(Object.assign({}, this.getInternalProperties(internalProperties)), { "defaultSerializer": name }));
            }
          }
        };
        this.setInternalProperties(internalProperties, {
          "serializers": {
            [_Serializer.defaultName]: {
              "modify": (serialized, original) => Object.assign({}, original)
            }
          },
          "serializeMany": (itemsArray, nameOrOptions) => {
            if (!itemsArray || !Array.isArray(itemsArray)) {
              throw new Error_1.default.InvalidParameter("itemsArray must be an array of item objects");
            }
            return itemsArray.map((item) => {
              try {
                return item.serialize(nameOrOptions);
              } catch (e) {
                return this.getInternalProperties(internalProperties).serialize(item, nameOrOptions);
              }
            });
          },
          "serialize": (item, nameOrOptions = this.getInternalProperties(internalProperties).defaultSerializer) => {
            let options;
            if (typeof nameOrOptions === "string") {
              options = this.getInternalProperties(internalProperties).serializers[nameOrOptions];
            } else {
              options = nameOrOptions;
            }
            if (!options || !(Array.isArray(options) || typeof options === "object")) {
              throw new Error_1.default.InvalidParameter("Field options is required and should be an object or array");
            }
            if (Array.isArray(options)) {
              return utils_1.default.object.pick(item, options);
            }
            return [
              {
                "if": Boolean(options.include),
                "function": () => utils_1.default.object.pick(item, options.include)
              },
              {
                "if": Boolean(options.exclude),
                "function": (serialized) => utils_1.default.object.delete(serialized, options.exclude)
              },
              {
                "if": Boolean(options.modify),
                "function": (serialized) => options.modify(serialized, item)
              }
            ].filter((item2) => item2.if).reduce((serialized, item2) => item2.function(serialized), Object.assign({}, item));
          }
        });
        this.default.set();
      }
      add(name, options) {
        if (!name || typeof name !== "string") {
          throw new Error_1.default.InvalidParameter("Field name is required and should be of type string");
        }
        if (!options || !(Array.isArray(options) || typeof options === "object")) {
          throw new Error_1.default.InvalidParameter("Field options is required and should be an object or array");
        }
        this.getInternalProperties(internalProperties).serializers[name] = options;
      }
      delete(name) {
        if (!name || typeof name !== "string") {
          throw new Error_1.default.InvalidParameter("Field name is required and should be of type string");
        }
        if (name === _Serializer.defaultName) {
          throw new Error_1.default.InvalidParameter("Can not delete primary default serializer");
        }
        if (Object.keys(this.getInternalProperties(internalProperties).serializers).includes(name)) {
          delete this.getInternalProperties(internalProperties).serializers[name];
        }
        if (this.getInternalProperties(internalProperties).defaultSerializer === name) {
          this.default.set();
        }
      }
    };
    exports2.Serializer = Serializer;
    Serializer.defaultName = "_default";
  }
});

// ../../node_modules/dynamoose/dist/Condition.js
var require_Condition = __commonJS({
  "../../node_modules/dynamoose/dist/Condition.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Condition = void 0;
    var Item_1 = require_Item();
    var Error_1 = require_Error2();
    var utils_1 = require_utils();
    var OR = Symbol("OR");
    var Internal_1 = require_Internal();
    var InternalPropertiesClass_1 = require_InternalPropertiesClass();
    var { internalProperties } = Internal_1.default.General;
    var isRawConditionObject = (object) => Object.keys(object).length === 3 && ["ExpressionAttributeValues", "ExpressionAttributeNames"].every((item) => Boolean(object[item]) && typeof object[item] === "object");
    var ConditionComparisonComparatorName;
    (function(ConditionComparisonComparatorName2) {
      ConditionComparisonComparatorName2["equals"] = "eq";
      ConditionComparisonComparatorName2["notEquals"] = "ne";
      ConditionComparisonComparatorName2["lessThan"] = "lt";
      ConditionComparisonComparatorName2["lessThanEquals"] = "le";
      ConditionComparisonComparatorName2["greaterThan"] = "gt";
      ConditionComparisonComparatorName2["greaterThanEquals"] = "ge";
      ConditionComparisonComparatorName2["beginsWith"] = "beginsWith";
      ConditionComparisonComparatorName2["contains"] = "contains";
      ConditionComparisonComparatorName2["exists"] = "exists";
      ConditionComparisonComparatorName2["in"] = "in";
      ConditionComparisonComparatorName2["between"] = "between";
    })(ConditionComparisonComparatorName || (ConditionComparisonComparatorName = {}));
    var ConditionComparisonComparatorDynamoName;
    (function(ConditionComparisonComparatorDynamoName2) {
      ConditionComparisonComparatorDynamoName2["equals"] = "EQ";
      ConditionComparisonComparatorDynamoName2["notEquals"] = "NE";
      ConditionComparisonComparatorDynamoName2["lessThan"] = "LT";
      ConditionComparisonComparatorDynamoName2["lessThanEquals"] = "LE";
      ConditionComparisonComparatorDynamoName2["greaterThan"] = "GT";
      ConditionComparisonComparatorDynamoName2["greaterThanEquals"] = "GE";
      ConditionComparisonComparatorDynamoName2["beginsWith"] = "BEGINS_WITH";
      ConditionComparisonComparatorDynamoName2["contains"] = "CONTAINS";
      ConditionComparisonComparatorDynamoName2["notContains"] = "NOT_CONTAINS";
      ConditionComparisonComparatorDynamoName2["exists"] = "EXISTS";
      ConditionComparisonComparatorDynamoName2["notExists"] = "NOT_EXISTS";
      ConditionComparisonComparatorDynamoName2["in"] = "IN";
      ConditionComparisonComparatorDynamoName2["between"] = "BETWEEN";
    })(ConditionComparisonComparatorDynamoName || (ConditionComparisonComparatorDynamoName = {}));
    var types = [
      { "name": ConditionComparisonComparatorName.equals, "typeName": ConditionComparisonComparatorDynamoName.equals, "not": ConditionComparisonComparatorDynamoName.notEquals },
      { "name": ConditionComparisonComparatorName.notEquals, "typeName": ConditionComparisonComparatorDynamoName.notEquals, "not": ConditionComparisonComparatorDynamoName.equals },
      { "name": ConditionComparisonComparatorName.lessThan, "typeName": ConditionComparisonComparatorDynamoName.lessThan, "not": ConditionComparisonComparatorDynamoName.greaterThanEquals },
      { "name": ConditionComparisonComparatorName.lessThanEquals, "typeName": ConditionComparisonComparatorDynamoName.lessThanEquals, "not": ConditionComparisonComparatorDynamoName.greaterThan },
      { "name": ConditionComparisonComparatorName.greaterThan, "typeName": ConditionComparisonComparatorDynamoName.greaterThan, "not": ConditionComparisonComparatorDynamoName.lessThanEquals },
      { "name": ConditionComparisonComparatorName.greaterThanEquals, "typeName": ConditionComparisonComparatorDynamoName.greaterThanEquals, "not": ConditionComparisonComparatorDynamoName.lessThan },
      { "name": ConditionComparisonComparatorName.beginsWith, "typeName": ConditionComparisonComparatorDynamoName.beginsWith },
      { "name": ConditionComparisonComparatorName.contains, "typeName": ConditionComparisonComparatorDynamoName.contains, "not": ConditionComparisonComparatorDynamoName.notContains },
      { "name": ConditionComparisonComparatorName.exists, "typeName": ConditionComparisonComparatorDynamoName.exists, "not": ConditionComparisonComparatorDynamoName.notExists },
      { "name": ConditionComparisonComparatorName.in, "typeName": ConditionComparisonComparatorDynamoName.in },
      { "name": ConditionComparisonComparatorName.between, "typeName": ConditionComparisonComparatorDynamoName.between, "multipleArguments": true }
    ];
    var Condition = class _Condition extends InternalPropertiesClass_1.InternalPropertiesClass {
      /**
       * TODO
       * @param object
       * @returns Condition
       */
      constructor(object) {
        super();
        this.setInternalProperties(internalProperties, {
          "requestObject": async (model2, settings = { "conditionString": "ConditionExpression", "conditionStringType": "string" }) => {
            const toDynamo = async (key, value) => {
              const newObj = await Item_1.Item.objectFromSchema({ [key]: value }, model2, { "type": "toDynamo", "modifiers": ["set"], "typeCheck": false, "mapAttributes": true });
              const newObjKeys = Object.keys(newObj);
              if (newObjKeys.length > 1) {
                throw new Error_1.default.OtherError("Error retrieving `requestObject` from Condition. Please submit an issue on the Dynamoose GitHub repository.");
              }
              const newValue = newObj[newObjKeys[0]];
              return Item_1.Item.objectToDynamo(newValue, { "type": "value" });
            };
            if (this.getInternalProperties(internalProperties).settings.raw && utils_1.default.object.equals(Object.keys(this.getInternalProperties(internalProperties).settings.raw).sort(), [settings.conditionString, "ExpressionAttributeValues", "ExpressionAttributeNames"].sort())) {
              return utils_1.default.async_reduce(Object.entries(this.getInternalProperties(internalProperties).settings.raw.ExpressionAttributeValues), async (obj, entry) => {
                const [key, value] = entry;
                if (!Item_1.Item.isDynamoObject({ "key": value })) {
                  obj.ExpressionAttributeValues[key] = await toDynamo(key, value);
                }
                return obj;
              }, this.getInternalProperties(internalProperties).settings.raw);
            } else if (this.getInternalProperties(internalProperties).settings.conditions.length === 0) {
              return {};
            }
            let index = (settings.index || {}).start || 0;
            const setIndex = (i) => {
              index = i;
              (settings.index || { "set": utils_1.default.empty_function }).set(i);
            };
            async function main2(input) {
              return utils_1.default.async_reduce(input, async (object2, entry, i, arr) => {
                let expression = "";
                if (Array.isArray(entry)) {
                  const result = await main2(entry);
                  const newData = utils_1.default.merge_objects.main({ "combineMethod": "object_combine" })(Object.assign({}, result), Object.assign({}, object2));
                  const returnObject = utils_1.default.object.pick(newData, ["ExpressionAttributeNames", "ExpressionAttributeValues"]);
                  expression = settings.conditionStringType === "array" ? result[settings.conditionString] : `(${result[settings.conditionString]})`;
                  object2 = Object.assign(Object.assign({}, object2), returnObject);
                } else if (entry !== OR) {
                  const keyConditionObj = Object.entries(entry)[0];
                  const key = await model2.getInternalProperties(internalProperties).dynamoPropertyForAttribute(keyConditionObj[0]);
                  const condition = keyConditionObj[1];
                  const { value } = condition;
                  const keys = { "name": `#a${index}`, "value": `:v${index}` };
                  setIndex(++index);
                  const keyParts = key.split(".");
                  if (keyParts.length === 1) {
                    object2.ExpressionAttributeNames[keys.name] = key;
                  } else {
                    keys.name = keyParts.reduce((finalName, part, index2) => {
                      const name = `${keys.name}_${index2}`;
                      object2.ExpressionAttributeNames[name] = part;
                      finalName.push(name);
                      return finalName;
                    }, []).join(".");
                  }
                  object2.ExpressionAttributeValues[keys.value] = await toDynamo(key, value);
                  switch (condition.type) {
                    case "EQ":
                    case "NE":
                      expression = `${keys.name} ${condition.type === "EQ" ? "=" : "<>"} ${keys.value}`;
                      break;
                    case "IN":
                      delete object2.ExpressionAttributeValues[keys.value];
                      expression = `${keys.name} IN (${value.map((_v, i2) => `${keys.value}_${i2 + 1}`).join(", ")})`;
                      await Promise.all(value.map(async (valueItem, i2) => {
                        object2.ExpressionAttributeValues[`${keys.value}_${i2 + 1}`] = await toDynamo(key, valueItem);
                      }));
                      break;
                    case "GT":
                    case "GE":
                    case "LT":
                    case "LE":
                      expression = `${keys.name} ${condition.type.startsWith("G") ? ">" : "<"}${condition.type.endsWith("E") ? "=" : ""} ${keys.value}`;
                      break;
                    case "BETWEEN":
                      expression = `${keys.name} BETWEEN ${keys.value}_1 AND ${keys.value}_2`;
                      object2.ExpressionAttributeValues[`${keys.value}_1`] = await toDynamo(key, value[0]);
                      object2.ExpressionAttributeValues[`${keys.value}_2`] = await toDynamo(key, value[1]);
                      delete object2.ExpressionAttributeValues[keys.value];
                      break;
                    case "CONTAINS":
                    case "NOT_CONTAINS":
                      expression = `${condition.type === "NOT_CONTAINS" ? "NOT " : ""}contains (${keys.name}, ${keys.value})`;
                      break;
                    case "EXISTS":
                    case "NOT_EXISTS":
                      expression = `attribute_${condition.type === "NOT_EXISTS" ? "not_" : ""}exists (${keys.name})`;
                      delete object2.ExpressionAttributeValues[keys.value];
                      break;
                    case "BEGINS_WITH":
                      expression = `begins_with (${keys.name}, ${keys.value})`;
                      break;
                  }
                } else {
                  return object2;
                }
                const conditionStringNewItems = [expression];
                if (object2[settings.conditionString].length > 0) {
                  conditionStringNewItems.unshift(` ${arr[i - 1] === OR ? "OR" : "AND"} `);
                }
                conditionStringNewItems.forEach((item) => {
                  if (typeof object2[settings.conditionString] === "string") {
                    object2[settings.conditionString] = `${object2[settings.conditionString]}${item}`;
                  } else {
                    object2[settings.conditionString].push(Array.isArray(item) ? item : item.trim());
                  }
                });
                return object2;
              }, { [settings.conditionString]: settings.conditionStringType === "array" ? [] : "", "ExpressionAttributeNames": {}, "ExpressionAttributeValues": {} });
            }
            return utils_1.default.object.clearEmpties(await main2(this.getInternalProperties(internalProperties).settings.conditions));
          },
          "comparisonChart": (model2) => {
            const comparisonChart = this.getInternalProperties(internalProperties).settings.conditions.reduce((res, item) => {
              const myItem = Object.entries(item)[0];
              const key = myItem[0];
              res[key] = { "type": myItem[1].type };
              return res;
            }, {});
            return Item_1.Item.objectFromSchema(comparisonChart, model2, { "type": "toDynamo", "typeCheck": false, "mapAttributes": true });
          }
        });
        if (object instanceof _Condition) {
          this.setInternalProperties(internalProperties, Object.assign(Object.assign({}, this.getInternalProperties(internalProperties)), { "settings": Object.assign({}, object.getInternalProperties(internalProperties).settings) }));
        } else {
          this.setInternalProperties(internalProperties, Object.assign(Object.assign({}, this.getInternalProperties(internalProperties)), { "settings": {
            "conditions": [],
            "pending": {}
            // represents the pending chain of filter data waiting to be attached to the `conditions` parameter. For example, storing the key before we know what the comparison operator is.
          } }));
          if (typeof object === "object") {
            if (!isRawConditionObject(object)) {
              Object.keys(object).forEach((key) => {
                const value = object[key];
                const valueType = typeof value === "object" && Object.keys(value).length > 0 ? Object.keys(value)[0] : "eq";
                const comparisonType = types.find((item) => item.name === valueType);
                if (!comparisonType) {
                  throw new Error_1.default.InvalidFilterComparison(`The type: ${valueType} is invalid.`);
                }
                this.getInternalProperties(internalProperties).settings.conditions.push({
                  [key]: {
                    "type": comparisonType.typeName,
                    "value": typeof value[valueType] !== "undefined" && value[valueType] !== null ? value[valueType] : value
                  }
                });
              });
            }
          } else if (object) {
            const internalPropertiesObject2 = this.getInternalProperties(internalProperties);
            internalPropertiesObject2.settings.pending.key = object;
            this.setInternalProperties(internalProperties, internalPropertiesObject2);
          }
          const internalPropertiesObject = this.getInternalProperties(internalProperties);
          internalPropertiesObject.settings.raw = object;
          this.setInternalProperties(internalProperties, internalPropertiesObject);
        }
        return this;
      }
      /**
       * This function specifies an `OR` join between two conditions, as opposed to the default `AND`. The condition will return `true` if either condition is met.
       *
       * ```js
       * new dynamoose.Condition().where("id").eq(1).or().where("name").eq("Bob"); // id = 1 OR name = Bob
       * ```
       * @returns Condition
       */
      or() {
        this.getInternalProperties(internalProperties).settings.conditions.push(OR);
        return this;
      }
      /**
       * This function has no behavior and is only used to increase readability of your conditional. This function can be omitted with no behavior change to your code.
       *
       * ```js
       * // The two condition objects below are identical
       * new dynamoose.Condition().where("id").eq(1).and().where("name").eq("Bob");
       * new dynamoose.Condition().where("id").eq(1).where("name").eq("Bob");
       * ```
       * @returns Condition
       */
      and() {
        return this;
      }
      /**
       * This function sets the condition to use the opposite comparison type for the given condition. You can find the list opposite comparison types below.
       *
       * | Original | Opposite |
       * |---|---|
       * | equals (EQ) | not equals (NE) |
       * | less than or equals (LE) | greater than (GT) |
       * | less than (LT) | greater than or equals (GE) |
       * | null (NULL) | not null (NOT_NULL) |
       * | contains (CONTAINS) | not contains (NOT_CONTAINS) |
       * | exists (EXISTS) | not exists (NOT_EXISTS) |
       *
       * The following comparisons do not have an opposite comparison type, and will throw an error if you try to use condition.not() with them.
       *
       * | Original |
       * |---|
       * | in (IN) |
       * | between (BETWEEN) |
       * | begins with (BEGINS_WITH) |
       *
       * ```js
       * new dynamoose.Condition().where("id").not().eq(1); // Retrieve all objects where id does NOT equal 1
       * new dynamoose.Condition().where("id").not().between(1, 2); // Will throw error since between does not have an opposite comparison type
       * ```
       * @returns Condition
       */
      not() {
        this.getInternalProperties(internalProperties).settings.pending.not = !this.getInternalProperties(internalProperties).settings.pending.not;
        return this;
      }
      /**
       * This function takes in a `Condition` instance as a parameter and uses that as a group. This lets you specify the priority of the conditional. You can also pass a function into the `condition` parameter and Dynamoose will call your function with one argument which is a condition instance that you can return to specify the group.
       *
       * ```js
       * // The two condition objects below are identical
       * new dynamoose.Condition().where("id").eq(1).and().parenthesis(new dynamoose.Condition().where("name").eq("Bob")); // id = 1 AND (name = Bob)
       * new dynamoose.Condition().where("id").eq(1).and().parenthesis((condition) => condition.where("name").eq("Bob")); // id = 1 AND (name = Bob)
       * ```
       *
       * `condition.group` is an alias to this method.
       * @param condition A new Condition instance or a function. If a function is passed, it will be called with one argument which is a condition instance that you can return to specify the group.
       * @returns Condition
       */
      parenthesis(condition) {
        condition = typeof condition === "function" ? condition(new _Condition()) : condition;
        const conditions = condition.getInternalProperties(internalProperties).settings.conditions;
        this.getInternalProperties(internalProperties).settings.conditions.push(conditions);
        return this;
      }
      /**
       * This function takes in a `Condition` instance as a parameter and uses that as a group. This lets you specify the priority of the conditional. You can also pass a function into the `condition` parameter and Dynamoose will call your function with one argument which is a condition instance that you can return to specify the group.
       *
       * ```js
       * // The two condition objects below are identical
       * new dynamoose.Condition().where("id").eq(1).and().group(new dynamoose.Condition().where("name").eq("Bob")); // id = 1 AND (name = Bob)
       * new dynamoose.Condition().where("id").eq(1).and().group((condition) => condition.where("name").eq("Bob")); // id = 1 AND (name = Bob)
       * ```
       *
       * `condition.parenthesis` is an alias to this method.
       * @param condition A new Condition instance or a function. If a function is passed, it will be called with one argument which is a condition instance that you can return to specify the group.
       * @returns Condition
       */
      group(condition) {
        return this.parenthesis(condition);
      }
    };
    exports2.Condition = Condition;
    function finalizePending(instance) {
      const pending = instance.getInternalProperties(internalProperties).settings.pending;
      let dynamoNameType;
      if (pending.not === true) {
        if (!pending.type.not) {
          throw new Error_1.default.InvalidFilterComparison(`${pending.type.typeName} can not follow not()`);
        }
        dynamoNameType = pending.type.not;
      } else {
        dynamoNameType = pending.type.typeName;
      }
      instance.getInternalProperties(internalProperties).settings.conditions.push({
        [pending.key]: {
          "type": dynamoNameType,
          "value": pending.value
        }
      });
      instance.getInternalProperties(internalProperties).settings.pending = {};
    }
    Condition.prototype.where = Condition.prototype.filter = Condition.prototype.attribute = function(key) {
      this.getInternalProperties(internalProperties).settings.pending = { key };
      return this;
    };
    types.forEach((type) => {
      Condition.prototype[type.name] = function(...args) {
        if (args.includes(void 0)) {
          console.warn(`Dynamoose Warning: Passing \`undefined\` into a condition ${type.name} is not supported and can lead to behavior where DynamoDB returns an error related to your conditional. In a future version of Dynamoose this behavior will throw an error. If you believe your conditional is valid and you received this message in error, please submit an issue at https://github.com/dynamoose/dynamoose/issues/new/choose.`);
        }
        this.getInternalProperties(internalProperties).settings.pending.value = type.multipleArguments ? args : args[0];
        this.getInternalProperties(internalProperties).settings.pending.type = type;
        finalizePending(this);
        return this;
      };
    });
  }
});

// ../../node_modules/dynamoose/dist/General.js
var require_General = __commonJS({
  "../../node_modules/dynamoose/dist/General.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.SortOrder = void 0;
    var SortOrder;
    (function(SortOrder2) {
      SortOrder2["ascending"] = "ascending";
      SortOrder2["descending"] = "descending";
    })(SortOrder || (exports2.SortOrder = SortOrder = {}));
  }
});

// ../../node_modules/dynamoose/dist/ItemRetriever.js
var require_ItemRetriever = __commonJS({
  "../../node_modules/dynamoose/dist/ItemRetriever.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Query = exports2.Scan = void 0;
    var internal_1 = require_internal();
    var Error_1 = require_Error2();
    var utils_1 = require_utils();
    var Condition_1 = require_Condition();
    var Item_1 = require_Item();
    var General_1 = require_General();
    var Populate_1 = require_Populate();
    var Internal_1 = require_Internal();
    var InternalPropertiesClass_1 = require_InternalPropertiesClass();
    var { internalProperties } = Internal_1.default.General;
    var ItemRetrieverTypes;
    (function(ItemRetrieverTypes2) {
      ItemRetrieverTypes2["scan"] = "scan";
      ItemRetrieverTypes2["query"] = "query";
    })(ItemRetrieverTypes || (ItemRetrieverTypes = {}));
    var ItemRetriever = class extends InternalPropertiesClass_1.InternalPropertiesClass {
      exec(callback) {
        let timesRequested = 0;
        const { model: model2 } = this.getInternalProperties(internalProperties).internalSettings;
        const table = model2.getInternalProperties(internalProperties).table();
        const prepareForReturn = async (result) => {
          if (Array.isArray(result)) {
            result = utils_1.default.merge_objects(...result);
          }
          if (this.getInternalProperties(internalProperties).settings.count) {
            return {
              "count": result.Count,
              [`${this.getInternalProperties(internalProperties).internalSettings.typeInformation.pastTense}Count`]: result[`${utils_1.default.capitalize_first_letter(this.getInternalProperties(internalProperties).internalSettings.typeInformation.pastTense)}Count`]
            };
          }
          const array = (await Promise.all(result.Items.map(async (item) => await new model2.Item(item, { "type": "fromDynamo" }).conformToSchema({ "customTypesDynamo": true, "checkExpiredItem": true, "saveUnknown": true, "modifiers": ["get"], "type": "fromDynamo", "mapAttributes": true })))).filter((a) => Boolean(a));
          array.lastKey = result.LastEvaluatedKey ? Array.isArray(result.LastEvaluatedKey) ? result.LastEvaluatedKey.map((key) => model2.Item.fromDynamo(key)) : model2.Item.fromDynamo(result.LastEvaluatedKey) : void 0;
          array.count = result.Count;
          array[`${this.getInternalProperties(internalProperties).internalSettings.typeInformation.pastTense}Count`] = result[`${utils_1.default.capitalize_first_letter(this.getInternalProperties(internalProperties).internalSettings.typeInformation.pastTense)}Count`];
          array[`times${utils_1.default.capitalize_first_letter(this.getInternalProperties(internalProperties).internalSettings.typeInformation.pastTense)}`] = timesRequested;
          array["populate"] = Populate_1.PopulateItems;
          array["toJSON"] = utils_1.default.dynamoose.itemToJSON;
          return array;
        };
        const promise = table.getInternalProperties(internalProperties).pendingTaskPromise().then(() => this.getRequest()).then((request) => {
          const allRequest = (extraParameters = {}) => {
            let promise2 = (0, internal_1.default)(table.getInternalProperties(internalProperties).instance, this.getInternalProperties(internalProperties).internalSettings.typeInformation.type, Object.assign(Object.assign({}, request), extraParameters));
            timesRequested++;
            if (this.getInternalProperties(internalProperties).settings.all) {
              promise2 = promise2.then(async (result) => {
                if (this.getInternalProperties(internalProperties).settings.all.delay && this.getInternalProperties(internalProperties).settings.all.delay > 0) {
                  await utils_1.default.timeout(this.getInternalProperties(internalProperties).settings.all.delay);
                }
                let lastKey = result.LastEvaluatedKey;
                let requestedTimes = 1;
                while (lastKey && (this.getInternalProperties(internalProperties).settings.all.max === 0 || requestedTimes < this.getInternalProperties(internalProperties).settings.all.max)) {
                  if (this.getInternalProperties(internalProperties).settings.all.delay && this.getInternalProperties(internalProperties).settings.all.delay > 0) {
                    await utils_1.default.timeout(this.getInternalProperties(internalProperties).settings.all.delay);
                  }
                  const nextRequest = await (0, internal_1.default)(table.getInternalProperties(internalProperties).instance, this.getInternalProperties(internalProperties).internalSettings.typeInformation.type, Object.assign(Object.assign(Object.assign({}, request), extraParameters), { "ExclusiveStartKey": lastKey }));
                  timesRequested++;
                  result = utils_1.default.merge_objects(result, nextRequest);
                  result.LastEvaluatedKey = nextRequest.LastEvaluatedKey;
                  lastKey = nextRequest.LastEvaluatedKey;
                  requestedTimes++;
                }
                return result;
              });
            }
            return promise2;
          };
          if (this.getInternalProperties(internalProperties).settings.parallel) {
            return Promise.all(new Array(this.getInternalProperties(internalProperties).settings.parallel).fill(0).map((a, index) => allRequest({ "Segment": index })));
          } else {
            return allRequest();
          }
        });
        if (callback) {
          promise.then((result) => prepareForReturn(result)).then((result) => callback(null, result)).catch((error) => callback(error));
        } else {
          return (async () => {
            const result = await promise;
            const finalResult = await prepareForReturn(result);
            return finalResult;
          })();
        }
      }
      constructor(model2, typeInformation, object) {
        super();
        let condition;
        try {
          condition = new Condition_1.Condition(object);
        } catch (e) {
          e.message = `${e.message.replace(" is invalid.", "")} is invalid for the ${typeInformation.type} operation.`;
          throw e;
        }
        this.setInternalProperties(internalProperties, {
          "internalSettings": {
            model: model2,
            typeInformation
          },
          "settings": {
            condition
          }
        });
      }
    };
    Object.getOwnPropertyNames(Condition_1.Condition.prototype).forEach((key) => {
      if (!["requestObject", "constructor"].includes(key)) {
        ItemRetriever.prototype[key] = function(...args) {
          Condition_1.Condition.prototype[key].bind(this.getInternalProperties(internalProperties).settings.condition)(...args);
          return this;
        };
      }
    });
    ItemRetriever.prototype.getRequest = async function() {
      const { model: model2 } = this.getInternalProperties(internalProperties).internalSettings;
      const table = model2.getInternalProperties(internalProperties).table();
      const object = Object.assign(Object.assign({}, await this.getInternalProperties(internalProperties).settings.condition.getInternalProperties(internalProperties).requestObject(model2, { "conditionString": "FilterExpression", "conditionStringType": "array" })), { "TableName": table.getInternalProperties(internalProperties).name });
      if (this.getInternalProperties(internalProperties).settings.limit) {
        object.Limit = this.getInternalProperties(internalProperties).settings.limit;
      }
      if (this.getInternalProperties(internalProperties).settings.startAt) {
        object.ExclusiveStartKey = Item_1.Item.isDynamoObject(this.getInternalProperties(internalProperties).settings.startAt) ? this.getInternalProperties(internalProperties).settings.startAt : model2.Item.objectToDynamo(this.getInternalProperties(internalProperties).settings.startAt);
      }
      const indexes = await model2.getInternalProperties(internalProperties).getIndexes();
      if (this.getInternalProperties(internalProperties).settings.index) {
        object.IndexName = this.getInternalProperties(internalProperties).settings.index;
      } else if (this.getInternalProperties(internalProperties).internalSettings.typeInformation.type === "query") {
        const comparisonChart = await this.getInternalProperties(internalProperties).settings.condition.getInternalProperties(internalProperties).comparisonChart(model2);
        const indexSpec = utils_1.default.find_best_index(indexes, comparisonChart);
        if (!indexSpec.tableIndex) {
          if (!indexSpec.indexName) {
            throw new Error_1.default.InvalidParameter("Index can't be found for query.");
          }
          object.IndexName = indexSpec.indexName;
        }
      }
      function moveParameterNames(val, prefix) {
        const entry = Object.entries(object.ExpressionAttributeNames).find((entry2) => entry2[1] === val);
        if (!entry) {
          return;
        }
        const [key, value] = entry;
        const filterExpressionIndex = object.FilterExpression.findIndex((item) => item.includes(key));
        const filterExpression = object.FilterExpression[filterExpressionIndex];
        if (filterExpression.includes("attribute_exists") || filterExpression.includes("contains")) {
          return;
        }
        object.ExpressionAttributeNames[`#${prefix}a`] = value;
        delete object.ExpressionAttributeNames[key];
        const valueKey = key.replace("#a", ":v");
        Object.keys(object.ExpressionAttributeValues).filter((key2) => key2 === valueKey || key2.startsWith(`${valueKey}_`)).forEach((key2) => {
          object.ExpressionAttributeValues[key2.replace(new RegExp(":v\\d+"), `:${prefix}v`)] = object.ExpressionAttributeValues[key2];
          delete object.ExpressionAttributeValues[key2];
        });
        const newExpression = filterExpression.replace(key, `#${prefix}a`).replace(new RegExp(valueKey, "g"), `:${prefix}v`);
        object.KeyConditionExpression = `${object.KeyConditionExpression || ""}${object.KeyConditionExpression ? " AND " : ""}${newExpression}`;
        utils_1.default.object.delete(object.FilterExpression, filterExpressionIndex);
        const previousElementIndex = filterExpressionIndex === 0 ? 0 : filterExpressionIndex - 1;
        if (object.FilterExpression[previousElementIndex] === "AND") {
          utils_1.default.object.delete(object.FilterExpression, previousElementIndex);
        }
      }
      if (this.getInternalProperties(internalProperties).internalSettings.typeInformation.type === "query") {
        const index = utils_1.default.array_flatten(Object.values(indexes)).find((index2) => index2.IndexName === object.IndexName) || indexes.TableIndex;
        const { hash, range } = index.KeySchema.reduce((res, item) => {
          res[item.KeyType.toLowerCase()] = item.AttributeName;
          return res;
        }, {});
        moveParameterNames(hash, "qh");
        if (range) {
          moveParameterNames(range, "qr");
        }
      }
      if (this.getInternalProperties(internalProperties).settings.consistent) {
        object.ConsistentRead = this.getInternalProperties(internalProperties).settings.consistent;
      }
      if (this.getInternalProperties(internalProperties).settings.count) {
        object.Select = "COUNT";
      }
      if (this.getInternalProperties(internalProperties).settings.parallel) {
        object.TotalSegments = this.getInternalProperties(internalProperties).settings.parallel;
      }
      if (this.getInternalProperties(internalProperties).settings.sort === General_1.SortOrder.descending) {
        object.ScanIndexForward = false;
      }
      if (this.getInternalProperties(internalProperties).settings.attributes) {
        if (!object.ExpressionAttributeNames) {
          object.ExpressionAttributeNames = {};
        }
        object.ProjectionExpression = this.getInternalProperties(internalProperties).settings.attributes.map((attribute) => {
          let expressionAttributeName = "";
          expressionAttributeName = (Object.entries(object.ExpressionAttributeNames).find((entry) => entry[1] === attribute) || [])[0];
          if (!expressionAttributeName) {
            const nextIndex = (Object.keys(object.ExpressionAttributeNames).map((item) => parseInt(item.replace("#a", ""))).filter((item) => !isNaN(item)).reduce((existing, item) => Math.max(item, existing), 0) || 0) + 1;
            expressionAttributeName = `#a${nextIndex}`;
            object.ExpressionAttributeNames[expressionAttributeName] = attribute;
          }
          return expressionAttributeName;
        }).sort().join(", ");
      }
      if (object.FilterExpression && Array.isArray(object.FilterExpression)) {
        object.FilterExpression = utils_1.default.dynamoose.convertConditionArrayRequestObjectToString(object.FilterExpression);
      }
      if (object.FilterExpression === "") {
        delete object.FilterExpression;
      }
      return object;
    };
    var settings = [
      "limit",
      "startAt",
      "attributes",
      { "name": "count", "boolean": true },
      { "name": "consistent", "boolean": true },
      { "name": "using", "settingsName": "index" }
    ];
    settings.forEach((item) => {
      ItemRetriever.prototype[item.name || item] = function(value) {
        const key = item.settingsName || item.name || item;
        this.getInternalProperties(internalProperties).settings[key] = item.boolean ? !this.getInternalProperties(internalProperties).settings[key] : value;
        return this;
      };
    });
    ItemRetriever.prototype.all = function(delay = 0, max = 0) {
      this.getInternalProperties(internalProperties).settings.all = { delay, max };
      return this;
    };
    var Scan = class extends ItemRetriever {
      exec(callback) {
        return super.exec(callback);
      }
      parallel(value) {
        this.getInternalProperties(internalProperties).settings.parallel = value;
        return this;
      }
      constructor(model2, object) {
        super(model2, { "type": ItemRetrieverTypes.scan, "pastTense": "scanned" }, object);
      }
    };
    exports2.Scan = Scan;
    var Query = class extends ItemRetriever {
      exec(callback) {
        return super.exec(callback);
      }
      sort(order) {
        this.getInternalProperties(internalProperties).settings.sort = order;
        return this;
      }
      constructor(model2, object) {
        super(model2, { "type": ItemRetrieverTypes.query, "pastTense": "queried" }, object);
      }
    };
    exports2.Query = Query;
  }
});

// ../../node_modules/dynamoose/dist/Table/types.js
var require_types = __commonJS({
  "../../node_modules/dynamoose/dist/Table/types.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.TableClass = void 0;
    var TableClass;
    (function(TableClass2) {
      TableClass2["standard"] = "standard";
      TableClass2["infrequentAccess"] = "infrequentAccess";
    })(TableClass || (exports2.TableClass = TableClass = {}));
  }
});

// ../../node_modules/dynamoose/dist/Table/defaults.js
var require_defaults = __commonJS({
  "../../node_modules/dynamoose/dist/Table/defaults.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.custom = exports2.original = void 0;
    var types_1 = require_types();
    exports2.original = {
      "create": true,
      "throughput": {
        "read": 1,
        "write": 1
      },
      "prefix": "",
      "suffix": "",
      "waitForActive": {
        "enabled": true,
        "check": {
          "timeout": 18e4,
          "frequency": 1e3
        }
      },
      "update": false,
      "populate": false,
      "expires": void 0,
      "tags": {},
      "tableClass": types_1.TableClass.standard,
      "initialize": true
      // "streamOptions": {
      // 	"enabled": false,
      // 	"type": undefined
      // },
      // "serverSideEncryption": false,
      // "defaultReturnValues": "ALL_NEW",
    };
    var customValue = {};
    var customObject = {
      "set": (val) => {
        customValue = val;
      },
      "get": () => customValue
    };
    exports2.custom = customObject;
  }
});

// ../../node_modules/dynamoose/dist/Table/utilities.js
var require_utilities = __commonJS({
  "../../node_modules/dynamoose/dist/Table/utilities.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.updateTable = exports2.waitForActive = exports2.updateTimeToLive = exports2.createTable = exports2.createTableRequest = exports2.getTagDetails = exports2.getTableDetails = void 0;
    var _1 = require_Table();
    var Internal_1 = require_Internal();
    var { internalProperties } = Internal_1.default.General;
    var DynamoDB = require("@aws-sdk/client-dynamodb");
    var internal_1 = require_internal();
    var utils_1 = require_utils();
    var Error_1 = require_Error2();
    var index_changes_1 = require_index_changes();
    var types_1 = require_types();
    var defaults = require_defaults();
    async function getTableDetails(table, settings = {}) {
      const func = async () => {
        const tableDetails = await (0, internal_1.default)(table.getInternalProperties(internalProperties).instance, "describeTable", { "TableName": table.getInternalProperties(internalProperties).name });
        table.getInternalProperties(internalProperties).latestTableDetails = tableDetails;
      };
      if (settings.forceRefresh || !table.getInternalProperties(internalProperties).latestTableDetails) {
        if (settings.allowError) {
          try {
            await func();
          } catch (e) {
          }
        } else {
          await func();
        }
      }
      return table.getInternalProperties(internalProperties).latestTableDetails;
    }
    exports2.getTableDetails = getTableDetails;
    function getExpectedTags(table) {
      const tagEntries = Object.entries(table.getInternalProperties(internalProperties).options.tags);
      if (tagEntries.length === 0) {
        return void 0;
      } else {
        return tagEntries.map(([Key, Value]) => ({
          Key,
          Value
        }));
      }
    }
    async function getTagDetails(table) {
      const tableDetails = await getTableDetails(table);
      const instance = table.getInternalProperties(internalProperties).instance;
      const tags = await (0, internal_1.default)(instance, "listTagsOfResource", {
        "ResourceArn": tableDetails.Table.TableArn
      });
      while (tags.NextToken) {
        const nextTags = await (0, internal_1.default)(instance, "listTagsOfResource", {
          "ResourceArn": tableDetails.Table.TableArn,
          "NextToken": tags.NextToken
        });
        tags.NextToken = nextTags.NextToken;
        tags.Tags = [...tags.Tags, ...nextTags.Tags];
      }
      return tags;
    }
    exports2.getTagDetails = getTagDetails;
    async function createTableRequest(table) {
      const object = Object.assign(Object.assign({ "TableName": table.getInternalProperties(internalProperties).name }, utils_1.default.dynamoose.get_provisioned_throughput(table.getInternalProperties(internalProperties).options)), await table.getInternalProperties(internalProperties).getCreateTableAttributeParams());
      if (table.getInternalProperties(internalProperties).options.tableClass === types_1.TableClass.infrequentAccess) {
        object.TableClass = DynamoDB.TableClass.STANDARD_INFREQUENT_ACCESS;
      }
      const tags = getExpectedTags(table);
      if (tags) {
        object.Tags = tags;
      }
      return object;
    }
    exports2.createTableRequest = createTableRequest;
    async function createTable(table, force = false) {
      var _a, _b;
      const tableStatus = (_b = (_a = await getTableDetails(table, { "allowError": true })) === null || _a === void 0 ? void 0 : _a.Table) === null || _b === void 0 ? void 0 : _b.TableStatus;
      if (!force && tableStatus === "ACTIVE") {
        table.getInternalProperties(internalProperties).alreadyCreated = true;
        return () => Promise.resolve.bind(Promise)();
      }
      await (0, internal_1.default)(table.getInternalProperties(internalProperties).instance, "createTable", await createTableRequest(table));
    }
    exports2.createTable = createTable;
    async function updateTimeToLive(table) {
      let ttlDetails;
      const instance = table.getInternalProperties(internalProperties).instance;
      async function updateDetails() {
        ttlDetails = await (0, internal_1.default)(instance, "describeTimeToLive", {
          "TableName": table.getInternalProperties(internalProperties).name
        });
      }
      await updateDetails();
      function updateTTL() {
        return (0, internal_1.default)(instance, "updateTimeToLive", {
          "TableName": table.getInternalProperties(internalProperties).name,
          "TimeToLiveSpecification": {
            "AttributeName": table.getInternalProperties(internalProperties).options.expires.attribute,
            "Enabled": true
          }
        });
      }
      switch (ttlDetails.TimeToLiveDescription.TimeToLiveStatus) {
        case "DISABLING":
          while (ttlDetails.TimeToLiveDescription.TimeToLiveStatus === "DISABLING") {
            await utils_1.default.timeout(1e3);
            await updateDetails();
          }
        case "DISABLED":
          await updateTTL();
          break;
        default:
          break;
      }
    }
    exports2.updateTimeToLive = updateTimeToLive;
    function waitForActive(table, forceRefreshOnFirstAttempt = true) {
      return () => new Promise((resolve, reject) => {
        const start = Date.now();
        async function check(count) {
          var _a;
          const waitForActiveSettingValue = table.getInternalProperties(internalProperties).options.waitForActive;
          if (typeof waitForActiveSettingValue !== "boolean" || waitForActiveSettingValue === true) {
            const waitForActiveSetting = typeof waitForActiveSettingValue === "boolean" ? defaults.original.waitForActive : waitForActiveSettingValue;
            try {
              const tableDetails = (await getTableDetails(table, { "forceRefresh": forceRefreshOnFirstAttempt === true ? forceRefreshOnFirstAttempt : count > 0 })).Table;
              if (tableDetails.TableStatus === "ACTIVE" && ((_a = tableDetails.GlobalSecondaryIndexes) !== null && _a !== void 0 ? _a : []).every((val) => val.IndexStatus === "ACTIVE")) {
                return resolve();
              }
            } catch (e) {
              return reject(e);
            }
            if (count > 0) {
              waitForActiveSetting.check.frequency === 0 ? await utils_1.default.set_immediate_promise() : await utils_1.default.timeout(waitForActiveSetting.check.frequency);
            }
            if (Date.now() - start >= waitForActiveSetting.check.timeout) {
              return reject(new Error_1.default.WaitForActiveTimeout(`Wait for active timed out after ${Date.now() - start} milliseconds.`));
            } else {
              check(++count);
            }
          }
        }
        check(0);
      });
    }
    exports2.waitForActive = waitForActive;
    async function updateTable(table) {
      const updateAll = typeof table.getInternalProperties(internalProperties).options.update === "boolean" && table.getInternalProperties(internalProperties).options.update;
      const instance = table.getInternalProperties(internalProperties).instance;
      if (updateAll || table.getInternalProperties(internalProperties).options.update.includes(_1.TableUpdateOptions.throughput)) {
        const currentThroughput = (await getTableDetails(table)).Table;
        const expectedThroughput = utils_1.default.dynamoose.get_provisioned_throughput(table.getInternalProperties(internalProperties).options);
        const isThroughputUpToDate = expectedThroughput.BillingMode === (currentThroughput.BillingModeSummary || {}).BillingMode && expectedThroughput.BillingMode || (currentThroughput.ProvisionedThroughput || {}).ReadCapacityUnits === (expectedThroughput.ProvisionedThroughput || {}).ReadCapacityUnits && currentThroughput.ProvisionedThroughput.WriteCapacityUnits === expectedThroughput.ProvisionedThroughput.WriteCapacityUnits;
        if (!isThroughputUpToDate) {
          const object = Object.assign({ "TableName": table.getInternalProperties(internalProperties).name }, expectedThroughput);
          await (0, internal_1.default)(instance, "updateTable", object);
          await waitForActive(table)();
        }
      }
      if (updateAll || table.getInternalProperties(internalProperties).options.update.includes(_1.TableUpdateOptions.indexes)) {
        const tableDetails = await getTableDetails(table);
        const existingIndexes = tableDetails.Table.GlobalSecondaryIndexes;
        const updateIndexes = await utils_1.default.dynamoose.index_changes(table, existingIndexes);
        await updateIndexes.reduce(async (existingFlow, index) => {
          await existingFlow;
          const params = {
            "TableName": table.getInternalProperties(internalProperties).name
          };
          if (index.type === index_changes_1.TableIndexChangeType.add) {
            params.AttributeDefinitions = (await table.getInternalProperties(internalProperties).getCreateTableAttributeParams()).AttributeDefinitions;
            params.GlobalSecondaryIndexUpdates = [{ "Create": index.spec }];
          } else {
            params.GlobalSecondaryIndexUpdates = [{ "Delete": { "IndexName": index.name } }];
          }
          await (0, internal_1.default)(instance, "updateTable", params);
          await waitForActive(table)();
        }, Promise.resolve());
      }
      if (updateAll || table.getInternalProperties(internalProperties).options.update.includes(_1.TableUpdateOptions.tags)) {
        try {
          const currentTags = (await getTagDetails(table)).Tags;
          const expectedTags = table.getInternalProperties(internalProperties).options.tags;
          let tableDetails;
          const tagsToDelete = currentTags.filter((tag) => expectedTags[tag.Key] !== tag.Value).map((tag) => tag.Key);
          if (tagsToDelete.length > 0) {
            tableDetails = await getTableDetails(table);
            await (0, internal_1.default)(instance, "untagResource", {
              "ResourceArn": tableDetails.Table.TableArn,
              "TagKeys": tagsToDelete
            });
          }
          const tagsToAdd = Object.keys(expectedTags).filter((key) => tagsToDelete.includes(key) || !currentTags.some((tag) => tag.Key === key));
          if (tagsToAdd.length > 0) {
            tableDetails = tableDetails || await getTableDetails(table);
            await (0, internal_1.default)(instance, "tagResource", {
              "ResourceArn": tableDetails.Table.TableArn,
              "Tags": tagsToAdd.map((key) => ({
                "Key": key,
                "Value": expectedTags[key]
              }))
            });
          }
        } catch (error) {
          if (error.name === "UnknownOperationException" && error.message === "Tagging is not currently supported in DynamoDB Local.") {
            console.warn(`Tagging is not currently supported in DynamoDB Local. Skipping tag update for table: ${table.name}`);
          } else {
            throw error;
          }
        }
      }
      if (updateAll || table.getInternalProperties(internalProperties).options.update.includes(_1.TableUpdateOptions.tableClass)) {
        const tableDetails = (await getTableDetails(table)).Table;
        const expectedDynamoDBTableClass = table.getInternalProperties(internalProperties).options.tableClass === types_1.TableClass.infrequentAccess ? DynamoDB.TableClass.STANDARD_INFREQUENT_ACCESS : DynamoDB.TableClass.STANDARD;
        if (!tableDetails.TableClassSummary && expectedDynamoDBTableClass !== DynamoDB.TableClass.STANDARD || tableDetails.TableClassSummary && tableDetails.TableClassSummary.TableClass !== expectedDynamoDBTableClass) {
          const object = {
            "TableName": table.getInternalProperties(internalProperties).name,
            "TableClass": expectedDynamoDBTableClass
          };
          await (0, internal_1.default)(instance, "updateTable", object);
          await waitForActive(table)();
        }
      }
    }
    exports2.updateTable = updateTable;
  }
});

// ../../node_modules/dynamoose/dist/Table/index.js
var require_Table = __commonJS({
  "../../node_modules/dynamoose/dist/Table/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.TableUpdateOptions = exports2.Table = void 0;
    var Error_1 = require_Error2();
    var Internal_1 = require_Internal();
    var { internalProperties } = Internal_1.default.General;
    var Model_1 = require_Model();
    var defaults_1 = require_defaults();
    var utils_1 = require_utils();
    var utilities_1 = require_utilities();
    var InternalPropertiesClass_1 = require_InternalPropertiesClass();
    var Table = class extends InternalPropertiesClass_1.InternalPropertiesClass {
      /**
       * This method is the basic entry point for creating a table in Dynamoose.
       *
       * The `name` parameter is a string representing the table name.  Prefixes and suffixes may be added to this name using the `config` options.
       *
       * The `models` parameter is an array of [Model](/guide/Model) instances.
       *
       * ```js
       * const dynamoose = require("dynamoose");
       *
       * const Order = dynamoose.model("Order", {"id": String});
       * const Shipment = dynamoose.model("Shipment", {"id": String});
       * const Table = new dynamoose.Table("Table", [Order, Shipment]);
       * ```
       *
       * The `options` parameter is an optional object used to customize settings for the table.
       *
       * | Name | Description | Type | Default |
       * |------|-------------|------|---------|
       * | create | If Dynamoose should attempt to create the table on DynamoDB. This function will run a `describeTable` call first to ensure the table doesn't already exist. For production environments we recommend setting this value to `false`. | Boolean | true |
       * | throughput | An object with settings for what the throughput for the table should be on creation, or a number which will use the same throughput for both read and write. If this is set to `ON_DEMAND` the table will use the `PAY_PER_REQUEST` billing mode. If the table is not created by Dynamoose, this object has no effect. | Object \| Number \| String |  |
       * | throughput.read | What the read throughput should be set to. Only valid if `throughput` is an object. | Number | 1 |
       * | throughput.write | What the write throughput should be set to. Only valid if `throughput` is an object. | Number | 1 |
       * | prefix | A string that should be pre-pended to the table name. | String |   |
       * | suffix | A string that should be appended to the table name. | String |   |
       * | waitForActive | Settings for how DynamoDB should handle waiting for the table to be active before enabling actions to be run on the table. This property can also be set to `false` to easily disable the behavior of waiting for the table to be active. For production environments we recommend setting this value to `false`. | Object |  |
       * | waitForActive.enabled | If Dynamoose should wait for the table to be active before running actions on it. | Boolean | true |
       * | waitForActive.check | Settings for how Dynamoose should check if the table is active | Object |  |
       * | waitForActive.check.timeout | How many milliseconds before Dynamoose should timeout and stop checking if the table is active. | Number | 180000 |
       * | waitForActive.check.frequency | How many milliseconds Dynamoose should delay between checks to see if the table is active. If this number is set to 0 it will use `setImmediate()` to run the check again. | Number | 1000 |
       * | update | If Dynamoose should update the capacity of the existing table to match the model throughput. If this is a boolean of `true` all update actions will be run. If this is an array of strings, only the actions in the array will be run. The array of strings can include the following settings to update, `ttl`, `indexes`, `throughput`, `tags`, `tableClass`. | Boolean \| [String] | false |
       * | expires | The setting to describe the time to live for items created. If you pass in a number it will be used for the `expires.ttl` setting, with default values for everything else. If this is `undefined`, no time to live will be active on the model. | Number \| Object | undefined |
       * | expires.ttl | The default amount of time the item should stay alive from creation time in milliseconds. | Number | undefined |
       * | expires.attribute | The attribute name for where the item time to live attribute. | String | `ttl` |
       * | expires.items | The options for items with ttl. | Object | {} |
       * | expires.items.returnExpired | If Dynamoose should include expired items when returning retrieved items. | Boolean | true |
       * | tags | An object containing key value pairs that should be added to the table as tags. | Object | {} |
       * | tableClass | A string representing the table class to use. | "standard" \| "infrequentAccess" | "standard" |
       * | initialize | If Dynamoose should run it's initialization flow (creating the table, updating the throughput, etc) automatically. | Boolean | true |
       *
       * The default object is listed below.
       *
       * ```js
       * {
       * 	"create": true,
       * 	"throughput": {
       * 		"read": 5,
       * 		"write": 5
       * 	}, // Same as `"throughput": 5`
       * 	"prefix": "",
       * 	"suffix": "",
       * 	"waitForActive": {
       * 		"enabled": true,
       * 		"check": {
       * 			"timeout": 180000,
       * 			"frequency": 1000
       * 		}
       * 	},
       * 	"update": false,
       * 	"expires": null,
       * 	"tags": {},
       * 	"tableClass": "standard",
       * 	"initialize": true
       * }
       * ```
       * @param instance INTERNAL PARAMETER
       * @param name The name of the table.
       * @param models An array of [Model](/guide/Model.md) instances.
       * @param options An optional object used to customize settings for the table.
       */
      constructor(instance, name, models, options = {}) {
        super();
        if (!name) {
          throw new Error_1.default.InvalidParameter("Name must be passed into table constructor.");
        }
        if (typeof name !== "string") {
          throw new Error_1.default.InvalidParameterType("Name passed into table constructor should be of type string.");
        }
        if (!models) {
          throw new Error_1.default.InvalidParameter("Models must be passed into table constructor.");
        }
        if (!Array.isArray(models) || !models.every((model2) => model2.Model && model2.Model instanceof Model_1.Model) || models.length === 0) {
          throw new Error_1.default.InvalidParameterType("Models passed into table constructor should be an array of models.");
        }
        const storedOptions = utils_1.default.combine_objects(options, defaults_1.custom.get(), defaults_1.original);
        const tableName = `${storedOptions.prefix}${name}${storedOptions.suffix}`;
        this.setInternalProperties(internalProperties, {
          "options": storedOptions,
          "name": tableName,
          "originalName": name,
          // This represents the name before prefix and suffix were added
          instance,
          // Represents if model is ready to be used for actions such as "get", "put", etc. This property being true does not guarantee anything on the DynamoDB server. It only guarantees that Dynamoose has finished the initialization steps required to allow the model to function as expected on the client side.
          "ready": false,
          // Represents if the table in DynamoDB was created prior to initialization. This will only be updated if `create` is true.
          "alreadyCreated": false,
          "setupFlowRunning": false,
          // Represents an array of promise resolver functions to be called when Model.ready gets set to true (at the end of the setup flow)
          "pendingTasks": [],
          // Returns a promise that will be resolved after the Model is ready. This is used in all Model operations (Model.get, Item.save) to `await` at the beginning before running the AWS SDK method to ensure the Model is setup before running actions on it.
          "pendingTaskPromise": () => {
            const internalPropertiesObject = this.getInternalProperties(internalProperties);
            if (internalPropertiesObject.setupFlowRunning === false && internalPropertiesObject.ready === false) {
              return Promise.reject(new Error_1.default.OtherError(`Table ${this.name} has not been initialized.`));
            }
            return internalPropertiesObject.ready ? Promise.resolve() : new Promise((resolve) => {
              internalPropertiesObject.pendingTasks.push(resolve);
            });
          },
          "models": models.map((model2) => {
            if (model2.Model.getInternalProperties(internalProperties)._table) {
              throw new Error_1.default.InvalidParameter(`Model ${model2.Model.name} has already been assigned to a table.`);
            }
            model2.Model.setInternalProperties(internalProperties, Object.assign(Object.assign({}, model2.Model.getInternalProperties(internalProperties)), { "_table": this, "tableName": tableName }));
            return model2;
          }),
          "getIndexes": async () => {
            return (await Promise.all(this.getInternalProperties(internalProperties).models.map((model2) => model2.Model.getInternalProperties(internalProperties).getIndexes(this)))).reduce((result, indexes) => {
              Object.entries(indexes).forEach(([key, value]) => {
                if (key === "TableIndex") {
                  result[key] = value;
                } else {
                  result[key] = result[key] ? utils_1.default.unique_array_elements([...result[key], ...value]) : value;
                }
              });
              return result;
            }, {});
          },
          // This function returns the best matched model for the given object input
          "modelForObject": async (object) => {
            const models2 = this.getInternalProperties(internalProperties).models;
            if (models2.length === 1) {
              return models2[0];
            }
            const modelSchemaCorrectnessScores = models2.map((model2) => Math.max(...model2.Model.getInternalProperties(internalProperties).schemaCorrectnessScores(object)));
            const highestModelSchemaCorrectnessScore = Math.max(...modelSchemaCorrectnessScores);
            const bestModelIndex = modelSchemaCorrectnessScores.indexOf(highestModelSchemaCorrectnessScore);
            return models2[bestModelIndex];
          },
          "getCreateTableAttributeParams": async () => {
            const models2 = this.getInternalProperties(internalProperties).models;
            const createTableAttributeParams = await Promise.all(models2.map((model2) => model2.Model.getInternalProperties(internalProperties).getCreateTableAttributeParams()));
            return utils_1.default.merge_objects.main({
              "combineMethod": utils_1.default.merge_objects.MergeObjectsCombineMethod.ArrayMerge,
              "arrayItemsMerger": utils_1.default.merge_objects.schemaAttributesMerger
            })(...createTableAttributeParams);
          },
          "getHashKey": () => {
            return this.getInternalProperties(internalProperties).models[0].Model.getInternalProperties(internalProperties).getHashKey();
          },
          "getRangeKey": () => {
            return this.getInternalProperties(internalProperties).models[0].Model.getInternalProperties(internalProperties).getRangeKey();
          },
          "runSetupFlow": async () => {
            if (this.getInternalProperties(internalProperties).setupFlowRunning) {
              throw new Error_1.default.OtherError("Setup flow is already running.");
            }
            const setupFlow = [];
            if (this.getInternalProperties(internalProperties).options.create) {
              setupFlow.push(() => (0, utilities_1.createTable)(this));
            }
            if (this.getInternalProperties(internalProperties).options.waitForActive === true || this.getInternalProperties(internalProperties).options.waitForActive.enabled) {
              setupFlow.push(() => (0, utilities_1.waitForActive)(this, false));
            }
            if ((this.getInternalProperties(internalProperties).options.create || (Array.isArray(this.getInternalProperties(internalProperties).options.update) ? this.getInternalProperties(internalProperties).options.update.includes(TableUpdateOptions.ttl) : this.getInternalProperties(internalProperties).options.update)) && options.expires) {
              setupFlow.push(() => (0, utilities_1.updateTimeToLive)(this));
            }
            if (this.getInternalProperties(internalProperties).options.update && !this.getInternalProperties(internalProperties).alreadyCreated) {
              setupFlow.push(() => (0, utilities_1.updateTable)(this));
            }
            this.getInternalProperties(internalProperties).setupFlowRunning = true;
            const setupFlowPromise = setupFlow.reduce((existingFlow, flow) => {
              return existingFlow.then(() => flow()).then((flow2) => {
                return typeof flow2 === "function" ? flow2() : flow2;
              });
            }, Promise.resolve());
            await setupFlowPromise;
            this.getInternalProperties(internalProperties).ready = true;
            this.getInternalProperties(internalProperties).setupFlowRunning = false;
            this.getInternalProperties(internalProperties).pendingTasks.forEach((task) => task());
            this.getInternalProperties(internalProperties).pendingTasks = [];
          }
        });
        if (!utils_1.default.all_elements_match(models.map((model2) => model2.Model.getInternalProperties(internalProperties).getHashKey()))) {
          throw new Error_1.default.InvalidParameter("hashKey's for all models must match.");
        }
        if (!utils_1.default.all_elements_match(models.map((model2) => model2.Model.getInternalProperties(internalProperties).getRangeKey()).filter((key) => Boolean(key)))) {
          throw new Error_1.default.InvalidParameter("rangeKey's for all models must match.");
        }
        if (options.expires) {
          if (typeof options.expires === "number") {
            options.expires = {
              "attribute": "ttl",
              "ttl": options.expires
            };
          }
          options.expires = utils_1.default.combine_objects(options.expires, { "attribute": "ttl" });
          utils_1.default.array_flatten(models.map((model2) => model2.Model.getInternalProperties(internalProperties).schemas)).forEach((schema2) => {
            schema2.getInternalProperties(internalProperties).schemaObject[options.expires.attribute] = {
              "type": {
                "value": Date,
                "settings": {
                  "storage": "seconds"
                }
              },
              "default": () => {
                const ttl = options.expires.ttl;
                return typeof ttl === "number" ? new Date(Date.now() + ttl) : void 0;
              }
            };
          });
        }
        if (options.initialize === void 0 || options.initialize === true) {
          this.getInternalProperties(internalProperties).runSetupFlow();
        }
      }
      /**
       * This property is a string that represents the table's hashKey.
       *
       * This property is unable to be set.
       *
       * ```js
       * const DynamoTable = new dynamoose.Table("Table", [Model]);
       *
       * console.log(DynamoTable.hashKey); // id
       * ```
       * @readonly
       */
      get hashKey() {
        return this.getInternalProperties(internalProperties).getHashKey();
      }
      /**
       * This property is a string that represents the table's rangeKey. It is possible this value will be `undefined` if your table doesn't have a range key.
       *
       * This property is unable to be set.
       *
       * ```js
       * const DynamoTable = new dynamoose.Table("Table", [Model]);
       *
       * console.log(DynamoTable.rangeKey); // data
       * ```
       * @readonly
       */
      get rangeKey() {
        return this.getInternalProperties(internalProperties).getRangeKey();
      }
      /**
       * This property is a string that represents the table name. The result will include all prefixes and suffixes.
       *
       * This property is unable to be set.
       *
       * ```js
       * const DynamoTable = new dynamoose.Table("Table", [Model]);
       *
       * console.log(DynamoTable.name); // Table
       * ```
       *
       * ```js
       * const DynamoTable = new dynamoose.Table("Table", [Model], {"prefix": "MyApp_"});
       *
       * console.log(DynamoTable.name); // MyApp_Table
       * ```
       * @readonly
       */
      get name() {
        return this.getInternalProperties(internalProperties).name;
      }
      /**
       * This method can be used to manually create the given table. You can also pass a function into the `callback` parameter to have it be used in a callback format as opposed to a promise format.
       *
       * The `config` parameter is an optional object used to customize settings for the model.
       *
       * | Name | Description | Type | Default |
       * |------|-------------|------|---------|
       * | return | What Dynamoose should return. Either a string `request`, or `undefined`. If `request` is passed in, the request object will be returned and no request will be made to DynamoDB. If `undefined` is passed in, the request will be sent to DynamoDB and the table will attempt to be created. | String \| `undefined` | `undefined` |
       *
       * ```js
       * const DynamoTable = new dynamoose.Table("Table", [Model]);
       *
       * try {
       * 	await DynamoTable.create();
       * } catch (error) {
       * 	console.error(error);
       * }
       *
       * // OR
       *
       * DynamoTable.create((error) => {
       * 	if (error) {
       * 		console.error(error);
       * 	} else {
       * 		console.log("Successfully created table");
       * 	}
       * });
       * ```
       *
       * ```js
       * const DynamoTable = new dynamoose.Table("Table", [Model]);
       *
       * try {
       * 	const request = await DynamoTable.create({"return": "request"});
       * 	console.log("DynamoTable create request object:", request);
       * } catch (error) {
       * 	console.error(error);
       * }
       *
       * // OR
       *
       * DynamoTable.create({"return": "request"}, (error, request) => {
       * 	if (error) {
       * 		console.error(error);
       * 	} else {
       * 		console.log("DynamoTable create request object:", request);
       * 	}
       * });
       * ```
       * @param settings Table creation settings.
       * @param callback Callback function.
       * @returns void | Promise<DynamoDB.CreateTableInput | void>
       */
      create(settings, callback) {
        if (typeof settings === "function") {
          callback = settings;
        }
        const promise = (settings === null || settings === void 0 ? void 0 : settings.return) === "request" ? (0, utilities_1.createTableRequest)(this) : (0, utilities_1.createTable)(this, true);
        if (callback) {
          promise.then((response) => callback(null, response)).catch((error) => callback(error));
        } else {
          return promise;
        }
      }
      /**
       * This method will run Dynamoose's initialization flow. The actions run will be based on your tables options at initialization.
       *
       * - `create`
       * - `waitForActive`
       * - `update`
       *
       * ```js
       * const DynamoTable = new dynamoose.Table("Table", [Model], {"initialize": false});
       * await DynamoTable.initialize();
       * ```
       *
       * ```js
       * const DynamoTable = new dynamoose.Table("Table", [Model], {"initialize": false});
       * DynamoTable.initialize((error) => {
       * 	if (error) {
       * 		console.error(error);
       * 	} else {
       * 		console.log("Successfully initialized table");
       * 	}
       * });
       * ```
       * @param callback Function - `(error: any, response: void): void`
       * @returns Promise<void> | void
       */
      async initialize(callback) {
        if (callback) {
          this.getInternalProperties(internalProperties).runSetupFlow().then(() => callback(null)).catch((error) => callback(error));
        } else {
          return this.getInternalProperties(internalProperties).runSetupFlow();
        }
      }
    };
    exports2.Table = Table;
    Table.defaults = defaults_1.original;
    var TableUpdateOptions;
    (function(TableUpdateOptions2) {
      TableUpdateOptions2["ttl"] = "ttl";
      TableUpdateOptions2["indexes"] = "indexes";
      TableUpdateOptions2["throughput"] = "throughput";
      TableUpdateOptions2["tags"] = "tags";
      TableUpdateOptions2["tableClass"] = "tableClass";
    })(TableUpdateOptions || (exports2.TableUpdateOptions = TableUpdateOptions = {}));
  }
});

// ../../node_modules/dynamoose/dist/type.js
var require_type = __commonJS({
  "../../node_modules/dynamoose/dist/type.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var Internal_1 = require_Internal();
    exports2.default = {
      /**
       * Setting an attribute value to this will cause it to bypass the `default` value, and set it to `undefined` in the database.
       *
       * ```js
       * const dynamoose = require("dynamoose");
       *
       * const User = dynamoose.model("User", {"id": String, "name": {"type": String, "default": "Bob"}});
       * const user = new User({"id": 1, "name": dynamoose.type.UNDEFINED});
       * await user.save();
       * // {"id": 1}
       * // will be saved to the database (notice the `name` property is undefined and did not use the `default` property)
       * ```
       */
      "UNDEFINED": Internal_1.default.Public.undefined,
      /**
       * Setting a schema attribute to this will cause it to reference itself for populating objects.
       *
       * ```js
       * const dynamoose = require("dynamoose");
       *
       * const User = dynamoose.model("User", {"id": String, "parent": dynamoose.type.THIS});
       * ```
       *
       * :::note
       * This property might be used for other things in the future.
       * :::
       */
      "THIS": Internal_1.default.Public.this,
      /**
       * Setting a schema attribute to this will cause it to use the DynamoDB `null` type.
       *
       * ```js
       * const dynamoose = require("dynamoose");
       *
       * const User = dynamoose.model("User", {"id": String, "parent": dynamoose.type.NULL});
       * ```
       *
       * :::note
       * This property might be used for other things in the future.
       * :::
       */
      "NULL": Internal_1.default.Public.null,
      /**
       * Setting a schema type attribute to this will allow it to be any type.
       *
       * ```js
       * const dynamoose = require("dynamoose");
       *
       * const User = dynamoose.model("User", {"id": String, "value": dynamoose.type.ANY});
       * ```
       *
       * Keep in mind the above code won't allow for nested attributes (attributes within objects or arrays). You must use the [`schema`](/guide/Schema#schema-object--array) attribute to define the nested time of the attribute.
       *
       * You can also set the [`schema`](/guide/Schema#schema-object--array) attribute to this to allow the schema to be any type.
       *
       * ```js
       * const dynamoose = require("dynamoose");
       *
       * const User = dynamoose.model("User", {"id": String, "value": {"type": Object, "schema": dynamoose.type.ANY}});
       * ```
       *
       * If you want to allow for the value to be anything as well as all nested attributes to be anything, you can use the following code.
       *
       * ```js
       * const dynamoose = require("dynamoose");
       *
       * const User = dynamoose.model("User", {"id": String, "value": {"type": dynamoose.type.ANY, "schema": dynamoose.type.ANY}});
       * ```
       *
       * :::note
       * This property might be used for other things in the future.
       * :::
       */
      "ANY": Internal_1.default.Public.any,
      /**
       * Setting a schema attribute to this type will act as a constant type based on the value you pass in.
       *
       * ```js
       * const dynamoose = require("dynamoose");
       *
       * const User = dynamoose.model("User", {"id": String, "type": dynamoose.type.CONSTANT("user")});
       * ```
       * @param value The value you wish to use as the constant.
       * @returns An object that can be used as a schema value for a constant.
       */
      "CONSTANT": (value) => ({
        "value": "Constant",
        "settings": {
          value
        }
      }),
      /**
       * Setting a schema attribute to this type will act as a combine type based on the attribute array you pass in along with the separator string.
       *
       * ```js
       * const dynamoose = require("dynamoose");
       *
       * const User = dynamoose.model("User", {"id": String, "firstName": String, "lastName": String, "fullName": dynamoose.type.COMBINE(["firstName", "lastName"], " ")});
       * ```
       * @param attributes An array of strings representing the names of the attributes you wish to combine.
       * @param separator The separator string you wish to use between the attributes. Default: `","`.
       * @returns An object that can be used as a schema value for a combine.
       */
      "COMBINE": (attributes, separator) => {
        const settings = { attributes };
        if (separator) {
          settings.separator = separator;
        }
        return {
          "value": "Combine",
          settings
        };
      }
    };
  }
});

// ../../node_modules/dynamoose/dist/aws/ddb/index.js
var require_ddb = __commonJS({
  "../../node_modules/dynamoose/dist/aws/ddb/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var DynamoDB = require("@aws-sdk/client-dynamodb");
    function default_1() {
      let customDDB = new DynamoDB.DynamoDB({});
      const func = () => customDDB;
      func.DynamoDB = DynamoDB.DynamoDB;
      func.set = (ddb) => {
        customDDB = ddb;
      };
      func.revert = () => {
        customDDB = new DynamoDB.DynamoDB({});
      };
      func.local = (endpoint = "http://localhost:8000") => {
        func.set(new DynamoDB.DynamoDB({
          endpoint
        }));
      };
      return func;
    }
    exports2.default = default_1;
  }
});

// ../../node_modules/dynamoose/dist/aws/index.js
var require_aws = __commonJS({
  "../../node_modules/dynamoose/dist/aws/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.AWS = void 0;
    var ddb_1 = require_ddb();
    var converter_1 = require_converter();
    var AWS = class {
      constructor() {
        this.ddb = (0, ddb_1.default)();
        this.converter = converter_1.default;
      }
    };
    exports2.AWS = AWS;
  }
});

// ../../node_modules/dynamoose/dist/Instance.js
var require_Instance = __commonJS({
  "../../node_modules/dynamoose/dist/Instance.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Instance = void 0;
    var aws_1 = require_aws();
    var Table_1 = require_Table();
    var Instance = class {
      /**
       * This class allows you to create a new instance of Dynamoose, allowing for easy multi-region AWS requests.
       *
       * By default Dynamoose will create a default instance for you automatically. This both ensures backwards compatibility, and allows for an easy to use API for users not using this feature.
       *
       * ```js
       * const otherDynamooseInstance = new dynamoose.Instance();
       * ```
       */
      constructor() {
        this.aws = new aws_1.AWS();
        this.Table = getInstanceTable(this);
      }
    };
    exports2.Instance = Instance;
    Instance.default = new Instance();
    function getInstanceTable(instance) {
      class Table extends Table_1.Table {
        constructor(name, models, options) {
          super(instance, name, models, options);
        }
      }
      return Table;
    }
  }
});

// ../../node_modules/dynamoose/dist/utils/dynamoose/returnModel.js
var require_returnModel = __commonJS({
  "../../node_modules/dynamoose/dist/utils/dynamoose/returnModel.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var __1 = require_utils();
    exports2.default = (model2) => {
      const returnObject = model2.Item;
      const keys = __1.default.array_flatten([
        Object.keys(model2),
        Object.keys(Object.getPrototypeOf(model2)),
        Object.getOwnPropertyNames(Object.getPrototypeOf(model2))
      ]).filter((key) => !["constructor", "name"].includes(key));
      keys.forEach((key) => {
        if (typeof model2[key] === "object") {
          const main2 = (key2) => {
            __1.default.object.set(returnObject, key2, {});
            const value = __1.default.object.get(model2, key2);
            if (value === null || value.constructor !== Object && value.constructor !== Array) {
              __1.default.object.set(returnObject, key2, value);
            } else {
              Object.keys(value).forEach((subKey) => {
                const newKey = `${key2}.${subKey}`;
                const subValue = __1.default.object.get(model2, newKey);
                if (typeof subValue === "object") {
                  main2(newKey);
                } else {
                  __1.default.object.set(returnObject, newKey, subValue.bind(model2));
                }
              });
            }
          };
          main2(key);
        } else {
          returnObject[key] = model2[key].bind(model2);
        }
      });
      Object.defineProperty(returnObject, "name", {
        "configurable": false,
        "value": returnObject.Model.name
      });
      return returnObject;
    };
  }
});

// ../../node_modules/dynamoose/dist/Model/index.js
var require_Model = __commonJS({
  "../../node_modules/dynamoose/dist/Model/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Model = void 0;
    var Error_1 = require_Error2();
    var Schema_1 = require_Schema();
    var Item_1 = require_Item();
    var utils_1 = require_utils();
    var internal_1 = require_internal();
    var Internal_1 = require_Internal();
    var Serializer_1 = require_Serializer();
    var ItemRetriever_1 = require_ItemRetriever();
    var Populate_1 = require_Populate();
    var Table_1 = require_Table();
    var type_1 = require_type();
    var InternalPropertiesClass_1 = require_InternalPropertiesClass();
    var Instance_1 = require_Instance();
    var returnModel_1 = require_returnModel();
    var { internalProperties } = Internal_1.default.General;
    var Model = class extends InternalPropertiesClass_1.InternalPropertiesClass {
      /**
       * This method is the basic entry point for creating a model in Dynamoose. When you call this method a new model is created, and it returns an item initializer that you can use to create instances of the given model.
       *
       * The `name` parameter is a string representing the model name.
       *
       * The `schema` parameter can either be an object OR a [Schema](Schema.md) instance. If you pass in an object for the `schema` parameter it will create a Schema instance for you automatically.
       *
       * The `options` parameter is the same as the options that are passed to the [Table](Table.md) constructor except it takes additional argument `tableName`:
       *
       * | Name | Description | Type | Default |
       * |------|-------------|------|---------|
       * | tableName | Optional table name to overwrite the default one that is equals to a model name. It respects both `prefix` and `suffix` provided locally or globally. The main goal of this option is to store multiple models within single table to conform the DynamoDB's single table design approach. | String | undefined |
       *
       * ```js
       * const dynamoose = require("dynamoose");
       *
       * const Cat = dynamoose.model("Cat", {"name": String});
       *
       * const Cat = dynamoose.model("Cat", new dynamoose.Schema({"name": String}));
       * ```
       *
       * An optional TypeScript class which extends `Item` can be provided right before the function bracket. This provides type checking when using operations like `Model.create()`.
       *
       * ```ts
       * import * as dynamoose from "dynamoose";
       * import {Item} from "dynamoose/dist/Item";
       *
       * // Strongly typed model
       * class Cat extends Item {
       * 	id: number;
       * 	name: string;
       * }
       * const CatModel = dynamoose.model<Cat>("Cat", {"id": Number, "name": String});
       *
       * // Will raise type checking error as random is not a valid field.
       * CatModel.create({"id": 1, "random": "string"});
       *
       * // Will return the correct type of Cat
       * const cat = await CatModel.get(1);
       * ```
       *
       * You can also pass in an array of Schema instances or schema objects into the `schema` parameter. This is useful for cases of single table design where you want one model to have multiple options for a schema. Behind the scenes Dynamoose will automatically pick the closest schema to match to your item, and use that schema for all operations pertaining to that item. If no matching schema can be found, it will default to the first schema in the array.
       *
       * :::note
       * If you use multiple schemas in one model, the hash & range keys must match for all schemas.
       * :::
       *
       * ```js
       * const Cat = dynamoose.model("Cat", [
       * 	new dynamoose.Schema({"id": String, "name": String}),
       * 	{"id": String, "age": Number}
       * ]);
       * ```
       *
       * If you don't pass the `schema` parameter it is required that you have an existing model already registered with that name. This will use the existing model already registered.
       *
       * ```js
       * const Cat = dynamoose.model("Cat"); // Will reference existing model, or if no model exists already with name `Cat` it will throw an error.
       * ```
       *
       * If you choose to pass the model into a [`Table`](Table.md) constructor, you must ensure that you don't use the model for any DynamoDB requests before initializing the table.
       * @param name The name of the model.
       * @param schema The schema for the model.
       * @param options The options for the model. This is the same type as `Table` options.
       * @param _ModelStore INTERNAL PARAMETER
       */
      constructor(name, schema2, options, _ModelStore) {
        super();
        this.setInternalProperties(internalProperties, {
          name,
          options,
          "getIndexes": async () => {
            return (await Promise.all(this.getInternalProperties(internalProperties).schemas.map((schema3) => schema3.getIndexes(this)))).reduce((result, indexes) => {
              Object.entries(indexes).forEach(([key, value]) => {
                if (key === "TableIndex") {
                  result[key] = value;
                } else {
                  result[key] = result[key] ? utils_1.default.unique_array_elements([...result[key], ...value]) : value;
                }
              });
              return result;
            }, {});
          },
          "convertKeyToObject": async (key) => {
            let keyObject;
            const hashKey = this.getInternalProperties(internalProperties).getHashKey();
            const objectFromSchemaSettings = { "type": "toDynamo", "modifiers": ["set"], "typeCheck": false, "mapAttributes": true };
            if (typeof key === "object") {
              const mappedKey = await this.Item.objectFromSchema(key, this, objectFromSchemaSettings);
              const rangeKey = this.getInternalProperties(internalProperties).getRangeKey();
              keyObject = {
                [hashKey]: mappedKey[hashKey]
              };
              if (rangeKey && typeof mappedKey[rangeKey] !== "undefined" && mappedKey[rangeKey] !== null) {
                keyObject[rangeKey] = mappedKey[rangeKey];
              }
            } else {
              keyObject = await this.Item.objectFromSchema({
                [hashKey]: key
              }, this, objectFromSchemaSettings);
            }
            return keyObject;
          },
          "schemaCorrectnessScores": (object) => {
            const schemaCorrectnessScores = this.getInternalProperties(internalProperties).schemas.map((schema3) => {
              const typePaths = schema3.getTypePaths(object, { "type": "toDynamo", "includeAllProperties": true });
              const multipleTypeKeys = Object.keys(typePaths).filter((key) => typeof typePaths[key] === "number");
              multipleTypeKeys.forEach((key) => {
                typePaths[key] = {
                  "index": typePaths[key],
                  "matchCorrectness": 1,
                  "entryCorrectness": [1]
                };
              });
              return typePaths;
            }).map((obj) => Object.values(obj).map((obj2) => (obj2 === null || obj2 === void 0 ? void 0 : obj2.matchCorrectness) || 0)).map((array) => Math.min(...array));
            return schemaCorrectnessScores;
          },
          // This function returns the best matched schema for the given object input
          "schemaForObject": (object) => {
            const schemas = this.getInternalProperties(internalProperties).schemas;
            if (schemas.length === 1) {
              return schemas[0];
            }
            const schemaCorrectnessScores = this.getInternalProperties(internalProperties).schemaCorrectnessScores(object);
            const highestSchemaCorrectnessScoreIndex = schemaCorrectnessScores.indexOf(Math.max(...schemaCorrectnessScores));
            return schemas[highestSchemaCorrectnessScoreIndex];
          },
          // This function returns the DynamoDB property name for a given attribute (alias or property name). For example if you have a `pk` with an alias of `userID` and pass in `userID` it will return `pk`. If you pass in `pk` it will return `pk`.
          "dynamoPropertyForAttribute": async (attribute) => {
            const obj = await Item.objectFromSchema({ [attribute]: true }, this, { "type": "toDynamo", "modifiers": ["set"], "typeCheck": false, "mapAttributes": true });
            return Object.keys(obj)[0];
          },
          "getCreateTableAttributeParams": async () => {
            const schemas = this.getInternalProperties(internalProperties).schemas;
            const createTableAttributeParams = await Promise.all(schemas.map((schema3) => schema3.getCreateTableAttributeParams(this)));
            return utils_1.default.merge_objects.main({
              "combineMethod": utils_1.default.merge_objects.MergeObjectsCombineMethod.ArrayMerge,
              "arrayItemsMerger": utils_1.default.merge_objects.schemaAttributesMerger
            })(...createTableAttributeParams);
          },
          "getHashKey": () => {
            return this.getInternalProperties(internalProperties).schemas[0].hashKey;
          },
          "getRangeKey": () => {
            return this.getInternalProperties(internalProperties).schemas[0].rangeKey;
          },
          "table": () => {
            const table2 = this.getInternalProperties(internalProperties)._table;
            if (!table2) {
              const modelObject = (0, returnModel_1.default)(this);
              const createdTable = new Table_1.Table(Instance_1.Instance.default, this.getInternalProperties(internalProperties).tableName, [modelObject], this.getInternalProperties(internalProperties).options);
              this.getInternalProperties(internalProperties)._table = createdTable;
              return createdTable;
            }
            return table2;
          },
          "tableName": (options === null || options === void 0 ? void 0 : options.tableName) || name,
          "schemas": []
        });
        let realSchemas;
        if (!schema2 || Array.isArray(schema2) && schema2.length === 0) {
          throw new Error_1.default.MissingSchemaError(`Schema hasn't been registered for model "${name}".
Use "dynamoose.model(name, schema)"`);
        } else if (!(schema2 instanceof Schema_1.Schema)) {
          if (Array.isArray(schema2)) {
            realSchemas = schema2.map((schema3) => schema3 instanceof Schema_1.Schema ? schema3 : new Schema_1.Schema(schema3));
          } else {
            realSchemas = [new Schema_1.Schema(schema2)];
          }
        } else {
          realSchemas = [schema2];
        }
        if (!utils_1.default.all_elements_match(realSchemas.map((schema3) => schema3.hashKey))) {
          throw new Error_1.default.InvalidParameter("hashKey's for all schema's must match.");
        }
        if (!utils_1.default.all_elements_match(realSchemas.map((schema3) => schema3.rangeKey).filter((key) => Boolean(key)))) {
          throw new Error_1.default.InvalidParameter("rangeKey's for all schema's must match.");
        }
        this.setInternalProperties(internalProperties, Object.assign(Object.assign({}, this.getInternalProperties(internalProperties)), { "schemas": realSchemas }));
        const self = this;
        class Item extends Item_1.Item {
          constructor(object = {}, settings = {}) {
            super(self, utils_1.default.deep_copy(object), settings);
          }
        }
        Item.Model = self;
        this.Item = Item;
        this.serializer = new Serializer_1.Serializer();
        this.Item.transaction = [
          // `function` Default: `this[key]`
          // `settingsIndex` Default: 1
          // `dynamoKey` Default: utils.capitalize_first_letter(key)
          { "key": "get" },
          { "key": "create", "dynamoKey": "Put" },
          { "key": "delete" },
          { "key": "update", "settingsIndex": 2, "modifier": (response) => {
            delete response.ReturnValues;
            return response;
          } },
          { "key": "condition", "settingsIndex": -1, "dynamoKey": "ConditionCheck", "function": async (key, condition) => Object.assign({ "Key": this.Item.objectToDynamo(await this.getInternalProperties(internalProperties).convertKeyToObject(key)), "TableName": this.getInternalProperties(internalProperties).table().getInternalProperties(internalProperties).name }, condition ? await condition.getInternalProperties(internalProperties).requestObject(this) : {}) }
        ].reduce((accumulator, currentValue) => {
          const { key, modifier } = currentValue;
          const dynamoKey = currentValue.dynamoKey || utils_1.default.capitalize_first_letter(key);
          const settingsIndex = currentValue.settingsIndex || 1;
          const func = currentValue.function || this[key].bind(this);
          accumulator[key] = async (...args) => {
            if (typeof args[args.length - 1] === "function") {
              console.warn("Dynamoose Warning: Passing callback function into transaction method not allowed. Removing callback function from list of arguments.");
              args.pop();
            }
            if (settingsIndex >= 0) {
              args[settingsIndex] = utils_1.default.merge_objects({ "return": "request" }, args[settingsIndex] || {});
            }
            let result = await func(...args);
            if (modifier) {
              result = modifier(result);
            }
            return { [dynamoKey]: result };
          };
          return accumulator;
        }, {});
        _ModelStore(this);
        const modelsOfTable = _ModelStore.forTableName(this.getInternalProperties(internalProperties).tableName);
        const otherModelWithTable = modelsOfTable.find((model2) => model2 !== this && model2.table());
        const table = otherModelWithTable === null || otherModelWithTable === void 0 ? void 0 : otherModelWithTable.table();
        if (table) {
          table.setInternalProperties(internalProperties, Object.assign(Object.assign({}, table.getInternalProperties(internalProperties)), { "models": modelsOfTable.map(returnModel_1.default) }));
          this.getInternalProperties(internalProperties)._table = table;
        }
      }
      /**
       * This property is a string that represents the model name.
       *
       * This property is unable to be set.
       *
       * ```js
       * const User = dynamoose.model("User", {"id": String});
       *
       * console.log(User.name); // User
       * ```
       * @readonly
       */
      get name() {
        return this.getInternalProperties(internalProperties).name;
      }
      /**
       * This function will return the [`Table`](Table.md) instance for the model.
       *
       * If a Table instance hasn't been created yet for this model, it will be created when calling this function.
       *
       * ```js
       * const User = dynamoose.model("User", {"id": String});
       *
       * console.log(User.table().hashKey); // id
       * ```
       */
      table() {
        return this.getInternalProperties(internalProperties).table();
      }
      batchGet(keys, settings, callback) {
        if (typeof settings === "function") {
          callback = settings;
          settings = { "return": "items" };
        }
        if (typeof settings === "undefined") {
          settings = { "return": "items" };
        }
        const table = this.getInternalProperties(internalProperties).table();
        const { instance } = table.getInternalProperties(internalProperties);
        const keyObjects = keys.map(async (key) => this.getInternalProperties(internalProperties).convertKeyToObject(key));
        const itemify = (item) => new this.Item(item, { "type": "fromDynamo" }).conformToSchema({ "customTypesDynamo": true, "checkExpiredItem": true, "saveUnknown": true, "modifiers": ["get"], "type": "fromDynamo" });
        const prepareResponse = async (response) => {
          const tmpResult = await Promise.all(response.Responses[table.getInternalProperties(internalProperties).name].map((item) => itemify(item)));
          const unprocessedArray = response.UnprocessedKeys[table.getInternalProperties(internalProperties).name] ? response.UnprocessedKeys[this.getInternalProperties(internalProperties).table().getInternalProperties(internalProperties).name].Keys : [];
          const tmpResultUnprocessed = await Promise.all(unprocessedArray.map((item) => this.Item.fromDynamo(item)));
          const startArray = Object.assign([], {
            "unprocessedKeys": [],
            "populate": Populate_1.PopulateItems,
            "toJSON": utils_1.default.dynamoose.itemToJSON
          });
          return (await Promise.all(keyObjects)).reduce((result, key) => {
            const keyProperties = Object.keys(key);
            const item = tmpResult.find((item2) => keyProperties.every((keyProperty) => item2[keyProperty] === key[keyProperty]));
            if (item) {
              result.push(item);
            } else {
              const item2 = tmpResultUnprocessed.find((item3) => keyProperties.every((keyProperty) => item3[keyProperty] === key[keyProperty]));
              if (item2) {
                result.unprocessedKeys.push(item2);
              }
            }
            return result;
          }, startArray);
        };
        const getParams = async (settings2) => {
          const params = {
            "RequestItems": {
              [table.getInternalProperties(internalProperties).name]: {
                "Keys": (await Promise.all(keyObjects)).map((key) => this.Item.objectToDynamo(key))
              }
            }
          };
          if (settings2.consistent !== void 0 && settings2.consistent !== null) {
            params.RequestItems[table.getInternalProperties(internalProperties).name].ConsistentRead = settings2.consistent;
          }
          if (settings2.attributes) {
            params.RequestItems[table.getInternalProperties(internalProperties).name].AttributesToGet = settings2.attributes;
          }
          return params;
        };
        if (settings.return === "request") {
          if (callback) {
            const localCallback = callback;
            getParams(settings).then((params) => localCallback(null, params)).catch((err) => localCallback(err));
            return;
          } else {
            return (async () => {
              const response = await getParams(settings);
              return response;
            })();
          }
        }
        const promise = table.getInternalProperties(internalProperties).pendingTaskPromise().then(() => getParams(settings)).then((params) => (0, internal_1.default)(instance, "batchGetItem", params));
        if (callback) {
          const localCallback = callback;
          promise.then((response) => prepareResponse(response)).then((response) => localCallback(null, response)).catch((error) => localCallback(error));
        } else {
          return (async () => {
            const response = await promise;
            return prepareResponse(response);
          })();
        }
      }
      batchPut(items, settings, callback) {
        if (typeof settings === "function") {
          callback = settings;
          settings = { "return": "response" };
        }
        if (typeof settings === "undefined") {
          settings = { "return": "response" };
        }
        const table = this.getInternalProperties(internalProperties).table();
        const prepareResponse = async (response) => {
          const unprocessedArray = response.UnprocessedItems && response.UnprocessedItems[table.getInternalProperties(internalProperties).name] ? response.UnprocessedItems[this.getInternalProperties(internalProperties).table().getInternalProperties(internalProperties).name] : [];
          const tmpResultUnprocessed = await Promise.all(unprocessedArray.map((item) => this.Item.fromDynamo(item.PutRequest.Item)));
          return items.reduce((result, item) => {
            const unprocessedItem = tmpResultUnprocessed.find((searchItem) => Object.keys(item).every((keyProperty) => searchItem[keyProperty] === item[keyProperty]));
            if (unprocessedItem) {
              result.unprocessedItems.push(unprocessedItem);
            }
            return result;
          }, { "unprocessedItems": [] });
        };
        const paramsPromise = (async () => ({
          "RequestItems": {
            [table.getInternalProperties(internalProperties).name]: await Promise.all(items.map(async (item) => ({
              "PutRequest": {
                "Item": await new this.Item(item).toDynamo({ "defaults": true, "validate": true, "required": true, "enum": true, "forceDefault": true, "saveUnknown": true, "combine": true, "customTypesDynamo": true, "updateTimestamps": true, "modifiers": ["set"], "mapAttributes": true })
              }
            })))
          }
        }))();
        if (settings.return === "request") {
          if (callback) {
            const localCallback = callback;
            paramsPromise.then((result) => localCallback(null, result));
            return;
          } else {
            return paramsPromise;
          }
        }
        const promise = table.getInternalProperties(internalProperties).pendingTaskPromise().then(() => paramsPromise).then((params) => (0, internal_1.default)(table.getInternalProperties(internalProperties).instance, "batchWriteItem", params));
        if (callback) {
          const localCallback = callback;
          promise.then((response) => prepareResponse(response)).then((response) => localCallback(null, response)).catch((error) => callback(error));
        } else {
          return (async () => {
            const response = await promise;
            return prepareResponse(response);
          })();
        }
      }
      batchDelete(keys, settings, callback) {
        if (typeof settings === "function") {
          callback = settings;
          settings = { "return": "response" };
        }
        if (typeof settings === "undefined") {
          settings = { "return": "response" };
        }
        const keyObjects = keys.map(async (key) => this.getInternalProperties(internalProperties).convertKeyToObject(key));
        const table = this.getInternalProperties(internalProperties).table();
        const instance = table.getInternalProperties(internalProperties).instance;
        const prepareResponse = async (response) => {
          const unprocessedArray = response.UnprocessedItems && response.UnprocessedItems[table.getInternalProperties(internalProperties).name] ? response.UnprocessedItems[this.getInternalProperties(internalProperties).table().getInternalProperties(internalProperties).name] : [];
          const tmpResultUnprocessed = await Promise.all(unprocessedArray.map((item) => this.Item.fromDynamo(item.DeleteRequest.Key)));
          return (await Promise.all(keyObjects)).reduce((result, key) => {
            const item = tmpResultUnprocessed.find((item2) => Object.keys(key).every((keyProperty) => item2[keyProperty] === key[keyProperty]));
            if (item) {
              result.unprocessedItems.push(item);
            }
            return result;
          }, { "unprocessedItems": [] });
        };
        const getParams = async () => ({
          "RequestItems": {
            [table.getInternalProperties(internalProperties).name]: (await Promise.all(keyObjects)).map((key) => ({
              "DeleteRequest": {
                "Key": this.Item.objectToDynamo(key)
              }
            }))
          }
        });
        if (settings.return === "request") {
          if (callback) {
            const localCallback = callback;
            getParams().then((result) => localCallback(null, result)).catch((error) => callback(error));
            return;
          } else {
            return (async () => {
              const response = await getParams();
              return response;
            })();
          }
        }
        const promise = table.getInternalProperties(internalProperties).pendingTaskPromise().then(() => getParams()).then((params) => (0, internal_1.default)(instance, "batchWriteItem", params));
        if (callback) {
          const localCallback = callback;
          promise.then((response) => prepareResponse(response)).then((response) => localCallback(null, response)).catch((error) => localCallback(error));
        } else {
          return (async () => {
            const response = await promise;
            return prepareResponse(response);
          })();
        }
      }
      update(keyObj, updateObj, settings, callback) {
        if (typeof updateObj === "function") {
          callback = updateObj;
          updateObj = null;
          settings = { "return": "item" };
        }
        if (typeof settings === "function") {
          callback = settings;
          settings = { "return": "item" };
        }
        if (typeof settings === "undefined") {
          settings = { "return": "item" };
        }
        const schema2 = this.getInternalProperties(internalProperties).schemas[0];
        const table = this.getInternalProperties(internalProperties).table();
        const { instance } = table.getInternalProperties(internalProperties);
        let index = 0;
        const getUpdateExpressionObject = async () => {
          const updateTypes = [
            { "name": "$SET", "operator": " = ", "objectFromSchemaSettings": { "validate": true, "enum": true, "forceDefault": true, "required": "nested", "modifiers": ["set"] } },
            { "name": "$ADD", "objectFromSchemaSettings": { "forceDefault": true } },
            { "name": "$REMOVE", "attributeOnly": true, "objectFromSchemaSettings": { "required": true, "defaults": true } },
            { "name": "$DELETE", "objectFromSchemaSettings": { "defaults": true } }
          ].reverse();
          if (!updateObj) {
            updateObj = utils_1.default.deep_copy(keyObj);
            Object.keys(await this.getInternalProperties(internalProperties).convertKeyToObject(keyObj)).forEach((key) => delete updateObj[key]);
          }
          const returnObject = await Object.keys(updateObj).reduce(async (accumulatorPromise, key) => {
            const accumulator = await accumulatorPromise;
            let value = updateObj[key];
            if (!(typeof value === "object" && updateTypes.map((a) => a.name).includes(key))) {
              value = { [key]: value };
              key = "$SET";
            }
            const valueKeys = Object.keys(value);
            for (let i = 0; i < valueKeys.length; i++) {
              let subKey = valueKeys[i];
              let subValue = value[subKey];
              let updateType = updateTypes.find((a) => a.name === key);
              const expressionKey = `#a${index}`;
              subKey = Array.isArray(value) ? subValue : subKey;
              let dynamoType;
              try {
                dynamoType = schema2.getAttributeType(subKey, subValue, { "unknownAttributeAllowed": true });
              } catch (e) {
              }
              const attributeExists = schema2.attributes().includes(subKey);
              const dynamooseUndefined = type_1.default.UNDEFINED;
              if (!updateType.attributeOnly && subValue !== dynamooseUndefined) {
                subValue = (await this.Item.objectFromSchema({ [subKey]: dynamoType === "L" && !Array.isArray(subValue) ? [subValue] : subValue }, this, Object.assign({ "type": "toDynamo", "customTypesDynamo": true, "saveUnknown": true, "mapAttributes": true }, updateType.objectFromSchemaSettings)))[subKey];
              }
              if (subValue === dynamooseUndefined || subValue === void 0) {
                if (attributeExists) {
                  updateType = updateTypes.find((a) => a.name === "$REMOVE");
                } else {
                  continue;
                }
              }
              if (subValue !== dynamooseUndefined) {
                const defaultValue = await schema2.defaultCheck(subKey, void 0, updateType.objectFromSchemaSettings);
                if (defaultValue) {
                  subValue = defaultValue;
                  updateType = updateTypes.find((a) => a.name === "$SET");
                }
              }
              if (updateType.objectFromSchemaSettings.required === true) {
                await schema2.requiredCheck(subKey, void 0);
              }
              let expressionValue = updateType.attributeOnly ? "" : `:v${index}`;
              accumulator.ExpressionAttributeNames[expressionKey] = subKey;
              if (!updateType.attributeOnly) {
                accumulator.ExpressionAttributeValues[expressionValue] = subValue;
              }
              if (dynamoType === "L" && updateType.name === "$ADD") {
                expressionValue = `list_append(${expressionKey}, ${expressionValue})`;
                updateType = updateTypes.find((a) => a.name === "$SET");
              }
              const operator = updateType.operator || (updateType.attributeOnly ? "" : " ");
              accumulator.UpdateExpression[updateType.name.slice(1)].push(`${expressionKey}${operator}${expressionValue}`);
              index++;
            }
            return accumulator;
          }, Promise.resolve((async () => {
            const obj = {
              "ExpressionAttributeNames": {},
              "ExpressionAttributeValues": {},
              "UpdateExpression": updateTypes.map((a) => a.name).reduce((accumulator, key) => {
                accumulator[key.slice(1)] = [];
                return accumulator;
              }, {})
            };
            const itemFunctionSettings = { "updateTimestamps": { "updatedAt": true }, "customTypesDynamo": true, "type": "toDynamo", "mapAttributes": true };
            const defaultObjectFromSchema = await this.Item.objectFromSchema(await this.Item.prepareForObjectFromSchema({}, this, itemFunctionSettings), this, itemFunctionSettings);
            Object.keys(defaultObjectFromSchema).forEach((key) => {
              const value = defaultObjectFromSchema[key];
              const updateType = updateTypes.find((a) => a.name === "$SET");
              obj.ExpressionAttributeNames[`#a${index}`] = key;
              obj.ExpressionAttributeValues[`:v${index}`] = value;
              obj.UpdateExpression[updateType.name.slice(1)].push(`#a${index}${updateType.operator}:v${index}`);
              index++;
            });
            return obj;
          })()));
          schema2.attributes().map((attribute) => ({ attribute, "type": schema2.getAttributeTypeDetails(attribute) })).filter((item) => {
            return Array.isArray(item.type) ? item.type.some((type) => type.name === "Combine") : item.type.name === "Combine";
          }).map((details) => {
            const { type } = details;
            if (Array.isArray(type)) {
              throw new Error_1.default.InvalidParameter("Combine type is not allowed to be used with multiple types.");
            }
            return details;
          }).forEach((details) => {
            const { invalidAttributes } = details.type.typeSettings.attributes.reduce((result, attribute) => {
              const expressionAttributeNameEntry = Object.entries(returnObject.ExpressionAttributeNames).find((entry) => entry[1] === attribute);
              const doesExist = Boolean(expressionAttributeNameEntry);
              const isValid = doesExist && [...returnObject.UpdateExpression.SET, ...returnObject.UpdateExpression.REMOVE].join(", ").includes(expressionAttributeNameEntry[0]);
              if (!isValid) {
                result.invalidAttributes.push(attribute);
              }
              return result;
            }, { "invalidAttributes": [] });
            if (invalidAttributes.length > 0) {
              throw new Error_1.default.InvalidParameter(`You must update all or none of the combine attributes when running Model.update. Missing combine attributes: ${invalidAttributes.join(", ")}.`);
            } else {
              const nextIndex = Math.max(...Object.keys(returnObject.ExpressionAttributeNames).map((key) => parseInt(key.replace("#a", "")))) + 1;
              returnObject.ExpressionAttributeNames[`#a${nextIndex}`] = details.attribute;
              returnObject.ExpressionAttributeValues[`:v${nextIndex}`] = details.type.typeSettings.attributes.map((attribute) => {
                const [expressionAttributeNameKey] = Object.entries(returnObject.ExpressionAttributeNames).find((entry) => entry[1] === attribute);
                return returnObject.ExpressionAttributeValues[expressionAttributeNameKey.replace("#a", ":v")];
              }).filter((value) => typeof value !== "undefined" && value !== null).join(details.type.typeSettings.separator);
              returnObject.UpdateExpression.SET.push(`#a${nextIndex} = :v${nextIndex}`);
            }
          });
          await Promise.all(schema2.attributes().map(async (attribute) => {
            const defaultValue = await schema2.defaultCheck(attribute, void 0, { "forceDefault": true });
            if (defaultValue && !Object.values(returnObject.ExpressionAttributeNames).includes(attribute)) {
              const updateType = updateTypes.find((a) => a.name === "$SET");
              returnObject.ExpressionAttributeNames[`#a${index}`] = attribute;
              returnObject.ExpressionAttributeValues[`:v${index}`] = defaultValue;
              returnObject.UpdateExpression[updateType.name.slice(1)].push(`#a${index}${updateType.operator}:v${index}`);
              index++;
            }
          }));
          Object.values(returnObject.ExpressionAttributeNames).map((attribute, index2) => {
            const value = Object.values(returnObject.ExpressionAttributeValues)[index2];
            const valueKey = Object.keys(returnObject.ExpressionAttributeValues)[index2];
            let dynamoType;
            try {
              dynamoType = schema2.getAttributeType(attribute, value, { "unknownAttributeAllowed": true });
            } catch (e) {
            }
            const attributeType = Schema_1.Schema.attributeTypes.findDynamoDBType(dynamoType);
            if ((attributeType === null || attributeType === void 0 ? void 0 : attributeType.toDynamo) && !attributeType.isOfType(value, "fromDynamo")) {
              returnObject.ExpressionAttributeValues[valueKey] = attributeType.toDynamo(value);
            }
          });
          returnObject.ExpressionAttributeValues = this.Item.objectToDynamo(returnObject.ExpressionAttributeValues);
          if (Object.keys(returnObject.ExpressionAttributeValues).length === 0) {
            delete returnObject.ExpressionAttributeValues;
          }
          return Object.assign(Object.assign({}, returnObject), { "UpdateExpression": Object.keys(returnObject.UpdateExpression).reduce((accumulator, key) => {
            const value = returnObject.UpdateExpression[key];
            if (value.length > 0) {
              return `${accumulator}${accumulator.length > 0 ? " " : ""}${key} ${value.join(", ")}`;
            } else {
              return accumulator;
            }
          }, "") });
        };
        const itemify = (item) => new this.Item(item, { "type": "fromDynamo" }).conformToSchema({ "customTypesDynamo": true, "checkExpiredItem": true, "type": "fromDynamo", "saveUnknown": true });
        const localSettings = settings;
        const updateItemParamsPromise = this.getInternalProperties(internalProperties).table().getInternalProperties(internalProperties).pendingTaskPromise().then(async () => Object.assign(Object.assign({ "Key": this.Item.objectToDynamo(await this.getInternalProperties(internalProperties).convertKeyToObject(keyObj)), "ReturnValues": localSettings.returnValues || "ALL_NEW" }, utils_1.default.merge_objects.main({ "combineMethod": "object_combine" })(localSettings.condition ? await localSettings.condition.getInternalProperties(internalProperties).requestObject(this, { "index": { "start": index, "set": (i) => {
          index = i;
        } }, "conditionString": "ConditionExpression", "conditionStringType": "string" }) : {}, await getUpdateExpressionObject())), { "TableName": this.getInternalProperties(internalProperties).table().getInternalProperties(internalProperties).name }));
        if (settings.return === "request") {
          if (callback) {
            const localCallback = callback;
            updateItemParamsPromise.then((params) => localCallback(null, params));
            return;
          } else {
            return updateItemParamsPromise;
          }
        }
        const promise = updateItemParamsPromise.then((params) => (0, internal_1.default)(instance, "updateItem", params));
        if (callback) {
          promise.then((response) => response.Attributes ? itemify(response.Attributes) : void 0).then((response) => callback(null, response)).catch((error) => callback(error));
        } else {
          return (async () => {
            const response = await promise;
            return response.Attributes ? await itemify(response.Attributes) : void 0;
          })();
        }
      }
      create(item, settings, callback) {
        if (typeof settings === "function" && !callback) {
          callback = settings;
          settings = {};
        }
        return new this.Item(item).save(Object.assign({ "overwrite": false }, settings), callback);
      }
      delete(key, settings, callback) {
        if (typeof settings === "function") {
          callback = settings;
          settings = { "return": null };
        }
        if (typeof settings === "undefined") {
          settings = { "return": null };
        }
        if (typeof settings === "object" && !settings.return) {
          settings = Object.assign(Object.assign({}, settings), { "return": null });
        }
        const table = this.getInternalProperties(internalProperties).table();
        const getDeleteItemParams = async (settings2) => {
          let deleteItemParams = {
            "Key": this.Item.objectToDynamo(await this.getInternalProperties(internalProperties).convertKeyToObject(key)),
            "TableName": table.getInternalProperties(internalProperties).name
          };
          if (settings2.condition) {
            deleteItemParams = Object.assign(Object.assign({}, deleteItemParams), await settings2.condition.getInternalProperties(internalProperties).requestObject(this));
          }
          return deleteItemParams;
        };
        if (settings.return === "request") {
          if (callback) {
            const localCallback = callback;
            getDeleteItemParams(settings).then((params) => localCallback(null, params)).catch((error) => localCallback(error));
            return;
          } else {
            return (async () => {
              const params = await getDeleteItemParams(settings);
              return params;
            })();
          }
        }
        const promise = table.getInternalProperties(internalProperties).pendingTaskPromise().then(() => getDeleteItemParams(settings)).then((deleteItemParams) => (0, internal_1.default)(table.getInternalProperties(internalProperties).instance, "deleteItem", deleteItemParams));
        if (callback) {
          promise.then(() => callback()).catch((error) => callback(error));
        } else {
          return (async () => {
            await promise;
          })();
        }
      }
      get(key, settings, callback) {
        if (typeof settings === "function") {
          callback = settings;
          settings = { "return": "item" };
        }
        if (typeof settings === "undefined") {
          settings = { "return": "item" };
        }
        const conformToSchemaSettings = { "customTypesDynamo": true, "checkExpiredItem": true, "saveUnknown": true, "modifiers": ["get"], "type": "fromDynamo", "mapAttributes": true };
        const itemify = (item) => new this.Item(item, { "type": "fromDynamo" }).conformToSchema(conformToSchemaSettings);
        const table = this.getInternalProperties(internalProperties).table();
        const getItemParamsMethod = async (settings2) => {
          const getItemParams = {
            "Key": this.Item.objectToDynamo(await this.getInternalProperties(internalProperties).convertKeyToObject(key)),
            "TableName": table.getInternalProperties(internalProperties).name
          };
          if (settings2.consistent !== void 0 && settings2.consistent !== null) {
            getItemParams.ConsistentRead = settings2.consistent;
          }
          if (settings2.attributes) {
            getItemParams.ProjectionExpression = settings2.attributes.map((attribute, index) => `#a${index}`).join(", ");
            getItemParams.ExpressionAttributeNames = settings2.attributes.reduce((accumulator, currentValue, index) => (accumulator[`#a${index}`] = currentValue, accumulator), {});
          }
          return getItemParams;
        };
        if (settings.return === "request") {
          if (callback) {
            const localCallback = callback;
            getItemParamsMethod(settings).then((getItemParams) => localCallback(null, getItemParams)).catch((error) => localCallback(error));
            return;
          } else {
            return (async () => {
              const response = await getItemParamsMethod(settings);
              return response;
            })();
          }
        }
        const promise = table.getInternalProperties(internalProperties).pendingTaskPromise().then(async () => {
          return getItemParamsMethod(settings);
        }).then((getItemParams) => (0, internal_1.default)(table.getInternalProperties(internalProperties).instance, "getItem", getItemParams));
        if (callback) {
          const localCallback = callback;
          promise.then((response) => response.Item ? itemify(response.Item) : void 0).then((response) => localCallback(null, response)).catch((error) => callback(error));
        } else {
          return (async () => {
            const response = await promise;
            return response.Item ? await itemify(response.Item) : void 0;
          })();
        }
      }
      // Serialize Many
      serializeMany(itemsArray = [], nameOrOptions) {
        return this.serializer.getInternalProperties(internalProperties).serializeMany(itemsArray, nameOrOptions);
      }
    };
    exports2.Model = Model;
    Model.prototype.scan = function(object) {
      return new ItemRetriever_1.Scan(this, object);
    };
    Model.prototype.query = function(object) {
      return new ItemRetriever_1.Query(this, object);
    };
    var customMethodFunctions = (type) => {
      const entryPoint = (self) => type === "item" ? self.Item.prototype : self.Item;
      return {
        "set": function(name, fn) {
          const self = this;
          if (!entryPoint(self)[name] || entryPoint(self)[name][Internal_1.default.General.internalProperties] && entryPoint(self)[name][Internal_1.default.General.internalProperties].type === "customMethod") {
            entryPoint(self)[name] = function(...args) {
              const bindObject = type === "item" ? this : self.Item;
              const cb = typeof args[args.length - 1] === "function" ? args[args.length - 1] : void 0;
              if (cb) {
                const result = fn.bind(bindObject)(...args);
                if (result instanceof Promise) {
                  result.then((result2) => cb(null, result2)).catch((err) => cb(err));
                }
              } else {
                return new Promise((resolve, reject) => {
                  const result = fn.bind(bindObject)(...args, (err, result2) => {
                    if (err) {
                      reject(err);
                    } else {
                      resolve(result2);
                    }
                  });
                  if (result instanceof Promise) {
                    result.then(resolve).catch(reject);
                  }
                });
              }
            };
            entryPoint(self)[name][Internal_1.default.General.internalProperties] = { "type": "customMethod" };
          }
        },
        "delete": function(name) {
          const self = this;
          if (entryPoint(self)[name] && entryPoint(self)[name][Internal_1.default.General.internalProperties] && entryPoint(self)[name][Internal_1.default.General.internalProperties].type === "customMethod") {
            entryPoint(self)[name] = void 0;
          }
        }
      };
    };
    Model.prototype.methods = Object.assign(Object.assign({}, customMethodFunctions("model")), { "item": customMethodFunctions("item") });
  }
});

// ../../node_modules/dynamoose/dist/ModelStore.js
var require_ModelStore = __commonJS({
  "../../node_modules/dynamoose/dist/ModelStore.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var Error_1 = require_Error2();
    var Model_1 = require_Model();
    var Internal_1 = require_Internal();
    var { internalProperties } = Internal_1.default.General;
    var models = {};
    var returnObject = (input) => {
      if (input instanceof Model_1.Model) {
        models[input.name] = input;
        return input;
      } else if (typeof input === "string") {
        return models[input];
      } else {
        throw new Error_1.default.InvalidParameter("You must pass in a Model or model name as a string.");
      }
    };
    returnObject.clear = () => {
      models = {};
    };
    returnObject.forTableName = (tableName) => {
      const modelsInTable = Object.values(models).filter((model2) => model2.getInternalProperties(internalProperties).tableName === tableName);
      return modelsInTable.length === 0 ? void 0 : modelsInTable;
    };
    exports2.default = returnObject;
  }
});

// ../../node_modules/dynamoose/dist/Transaction.js
var require_Transaction = __commonJS({
  "../../node_modules/dynamoose/dist/Transaction.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.TransactionReturnOptions = void 0;
    var internal_1 = require_internal();
    var utils_1 = require_utils();
    var Error_1 = require_Error2();
    var ModelStore_1 = require_ModelStore();
    var Item_1 = require_Item();
    var Internal_1 = require_Internal();
    var { internalProperties } = Internal_1.default.General;
    var TransactionReturnOptions;
    (function(TransactionReturnOptions2) {
      TransactionReturnOptions2["request"] = "request";
      TransactionReturnOptions2["items"] = "items";
    })(TransactionReturnOptions || (exports2.TransactionReturnOptions = TransactionReturnOptions = {}));
    var TransactionType;
    (function(TransactionType2) {
      TransactionType2["get"] = "get";
      TransactionType2["write"] = "write";
    })(TransactionType || (TransactionType = {}));
    function Transaction(transactions, settings, callback) {
      settings = settings !== null && settings !== void 0 ? settings : { "return": TransactionReturnOptions.items };
      if (typeof settings === "function") {
        callback = settings;
        settings = { "return": TransactionReturnOptions.items };
      }
      if (typeof transactions === "function") {
        callback = transactions;
        transactions = null;
      }
      const promise = (async () => {
        if (!Array.isArray(transactions) || transactions.length <= 0) {
          throw new Error_1.default.InvalidParameter("You must pass in an array with items for the transactions parameter.");
        }
        const transactionObjects = await Promise.all(transactions);
        const transactionParams = {
          "TransactItems": transactionObjects
        };
        if (settings.return === TransactionReturnOptions.request) {
          return transactionParams;
        }
        let transactionType;
        if (settings.type) {
          switch (settings.type) {
            case TransactionType.get:
              transactionType = "transactGetItems";
              break;
            case TransactionType.write:
              transactionType = "transactWriteItems";
              break;
            default:
              throw new Error_1.default.InvalidParameter('Invalid type option, please pass in "get" or "write".');
          }
        } else {
          transactionType = transactionObjects.map((a) => Object.keys(a)[0]).every((key) => key === "Get") ? "transactGetItems" : "transactWriteItems";
        }
        const tableNames = transactionObjects.map((a) => Object.values(a)[0].TableName);
        const uniqueTableNames = utils_1.default.unique_array_elements(tableNames);
        const tables = uniqueTableNames.map((name) => {
          var _a;
          return (_a = ModelStore_1.default.forTableName(name)) === null || _a === void 0 ? void 0 : _a[0].getInternalProperties(internalProperties).table();
        });
        const validTables = tables.filter((table) => table !== void 0);
        tables.forEach((table, index) => {
          if (!table) {
            throw new Error_1.default.InvalidParameter(`Table "${uniqueTableNames[index]}" not found. Please register the table with dynamoose before using it in transactions.`);
          }
        });
        await Promise.all(tables.map((table) => table.getInternalProperties(internalProperties).pendingTaskPromise()));
        const instance = tables.reduce((instance2, table) => {
          const tableInstance = table.getInternalProperties(internalProperties).instance;
          if (!instance2) {
            return tableInstance;
          }
          if (tableInstance !== instance2) {
            throw new Error_1.default.InvalidParameter("You must use a single Dynamoose instance for all tables in a transaction.");
          }
          return instance2;
        }, void 0);
        const result = await (0, internal_1.default)(instance, transactionType, transactionParams);
        return result.Responses ? await Promise.all(result.Responses.map(async (item, index) => {
          const tableName = tableNames[index];
          const table = validTables.find((table2) => table2.name === tableName);
          const model2 = await table.getInternalProperties(internalProperties).modelForObject(Item_1.Item.fromDynamo(item.Item));
          return new model2.Item(item.Item, { "type": "fromDynamo" }).conformToSchema({ "customTypesDynamo": true, "checkExpiredItem": true, "saveUnknown": true, "type": "fromDynamo" });
        })) : null;
      })();
      if (callback) {
        promise.then((result) => callback(null, result)).catch((error) => callback(error));
      } else {
        return promise;
      }
    }
    exports2.default = Transaction;
  }
});

// ../../node_modules/dynamoose/dist/index.js
var require_dist3 = __commonJS({
  "../../node_modules/dynamoose/dist/index.js"(exports2, module2) {
    "use strict";
    var Model_1 = require_Model();
    var Schema_1 = require_Schema();
    var Condition_1 = require_Condition();
    var Transaction_1 = require_Transaction();
    var utils_1 = require_utils();
    var ModelStore_1 = require_ModelStore();
    var Error_1 = require_Error2();
    var Table_1 = require_Table();
    var type_1 = require_type();
    var Instance_1 = require_Instance();
    var defaults_1 = require_defaults();
    var returnModel_1 = require_returnModel();
    var model2 = (name, schema2, options) => {
      let model3;
      let storedSchema;
      if (name) {
        storedSchema = (0, ModelStore_1.default)(name);
      }
      if (!schema2 && storedSchema) {
        model3 = storedSchema;
      } else {
        model3 = new Model_1.Model(name, schema2, options, ModelStore_1.default);
      }
      return (0, returnModel_1.default)(model3);
    };
    Table_1.Table.defaults = Object.assign({}, defaults_1.custom);
    module2.exports = {
      /**
       * This method is the basic entry point for creating a model in Dynamoose. When you call this method a new model is created, and it returns an item initializer that you can use to create instances of the given model.
       *
       * The `name` parameter is a string representing the table name that will be used to store items created by this model.
       *
       * The `schema` parameter can either be an object OR a [Schema](Schema.md) instance. If you pass in an object for the `schema` parameter it will create a Schema instance for you automatically.
       *
       * ```js
       * const dynamoose = require("dynamoose");
       *
       * const Cat = dynamoose.model("Cat", {"name": String});
       *
       * const Cat = dynamoose.model("Cat", new dynamoose.Schema({"name": String}));
       * ```
       *
       * An optional TypeScript class which extends `Item` can be provided right before the function bracket. This provides type checking when using operations like `Model.create()`.
       *
       * ```ts
       * import * as dynamoose from "dynamoose";
       * import {Item} from "dynamoose/dist/Item";
       *
       * // Strongly typed model
       * class Cat extends Item {
       * 	id: number;
       * 	name: string;
       * }
       * const CatModel = dynamoose.model<Cat>("Cat", {"id": Number, "name": String});
       *
       * // Will raise type checking error as random is not a valid field.
       * CatModel.create({"id": 1, "random": "string"});
       *
       * // Will return the correct type of Cat
       * const cat = await CatModel.get(1);
       * ```
       *
       * You can also pass in an array of Schema instances or schema objects into the `schema` parameter. This is useful for cases of single table design where you want one model to have multiple options for a schema. Behind the scenes Dynamoose will automatically pick the closest schema to match to your item, and use that schema for all operations pertaining to that item. If no matching schema can be found, it will default to the first schema in the array.
       *
       * :::note
       * If you use multiple schemas in one model, the hash & range keys must match for all schemas.
       * :::
       *
       * ```js
       * const Cat = dynamoose.model("Cat", [
       * 	new dynamoose.Schema({"id": String, "name": String}),
       * 	{"id": String, "age": Number}
       * ]);
       * ```
       *
       * If you don't pass the `schema` parameter it is required that you have an existing model already registered with that name. This will use the existing model already registered.
       *
       * ```js
       * const Cat = dynamoose.model("Cat"); // Will reference existing model, or if no model exists already with name `Cat` it will throw an error.
       * ```
       *
       * @param name The name of the model.
       * @param schema The schema definition(s) for the model. This can either be a Schema instance, object representing a Schema, or an array of either.
       * @returns The model instance.
       */
      model: model2,
      "Table": Instance_1.Instance.default.Table,
      Instance: Instance_1.Instance,
      Schema: Schema_1.Schema,
      Condition: Condition_1.Condition,
      transaction: Transaction_1.default,
      "aws": Instance_1.Instance.default.aws,
      "logger": async () => {
        try {
          return await utils_1.default.importPackage("dynamoose-logger");
        } catch (error) {
          throw new Error_1.default.OtherError("dynamoose-logger has not been installed. Install it using `npm i --save-dev dynamoose-logger`.");
        }
      },
      type: type_1.default
    };
  }
});

// infra/serverless/resources/lambda/handlers/listIrregularities/handler.ts
var handler_exports = {};
__export(handler_exports, {
  main: () => main
});
module.exports = __toCommonJS(handler_exports);

// application/dto/listIrregularities/listIrregularitiesInput.dto.ts
var ListIrregularitiesInputDTO = class {
  constructor(deviceId) {
    this.deviceId = deviceId;
  }
};

// application/dto/listIrregularities/listIrregularitiesOutput.dto.ts
var ListIrregularitiesOutputDTO = class {
  constructor(ecgIrregularitiesList) {
    this.ecgIrregularitiesList = ecgIrregularitiesList;
  }
};

// application/useCase/listIrregularities/listIrregularities.useCase.ts
var ListIrregularitiesUseCase = class {
  constructor(ecgRepository) {
    this.ecgRepository = ecgRepository;
  }
  async execute(input) {
    console.log(this.ecgRepository, input);
    return new ListIrregularitiesOutputDTO(
      await this.ecgRepository.listIrregulaties(input.deviceId)
    );
  }
};

// infra/controllers/listIrregularities/listIrregularities.controller.ts
var ListIrregularitiesController = class {
  constructor(ecgRepository) {
    this.ecgRepository = ecgRepository;
    this.listIrregularitiesUseCase = new ListIrregularitiesUseCase(this.ecgRepository);
  }
  async handleListIrregularities(input) {
    const {
      ecgIrregularitiesList
    } = await this.listIrregularitiesUseCase.execute(
      new ListIrregularitiesInputDTO(input.deviceId)
    );
    return {
      status: 200,
      data: ecgIrregularitiesList,
      message: "retrieved succesfully!"
    };
  }
};

// ../../node_modules/uuid/dist/esm-node/stringify.js
var byteToHex = [];
for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 256).toString(16).slice(1));
}
function unsafeStringify(arr, offset = 0) {
  return (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
}

// ../../node_modules/uuid/dist/esm-node/rng.js
var import_node_crypto = __toESM(require("node:crypto"));
var rnds8Pool = new Uint8Array(256);
var poolPtr = rnds8Pool.length;
function rng() {
  if (poolPtr > rnds8Pool.length - 16) {
    import_node_crypto.default.randomFillSync(rnds8Pool);
    poolPtr = 0;
  }
  return rnds8Pool.slice(poolPtr, poolPtr += 16);
}

// ../../node_modules/uuid/dist/esm-node/native.js
var import_node_crypto2 = __toESM(require("node:crypto"));
var native_default = {
  randomUUID: import_node_crypto2.default.randomUUID
};

// ../../node_modules/uuid/dist/esm-node/v4.js
function v4(options, buf, offset) {
  if (native_default.randomUUID && !buf && !options) {
    return native_default.randomUUID();
  }
  options = options || {};
  const rnds = options.random || (options.rng || rng)();
  rnds[6] = rnds[6] & 15 | 64;
  rnds[8] = rnds[8] & 63 | 128;
  if (buf) {
    offset = offset || 0;
    for (let i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }
    return buf;
  }
  return unsafeStringify(rnds);
}
var v4_default = v4;

// infra/adapter/uuid.adapter.ts
var UUID = class {
  v4() {
    return v4_default();
  }
};

// domain/entities/ECG.entity.ts
var ECG = class {
  constructor(deviceId, milivolts, interval, bippedAt, unBippedAt, createdAt) {
    this.id = new UUID().v4();
    this.deviceId = deviceId;
    this.milivolts = milivolts;
    this.isRegular = false;
    this.bippedAt = bippedAt;
    this.unBippedAt = unBippedAt;
    this.interval = interval;
    this.createdAt = createdAt;
  }
  detectIrregularities() {
    console.log("Analysing ECG measure...");
    const x = this.interval;
    const y = -0.06366 + 0.12613 * Math.cos(Math.PI * x / 500) + 0.12258 * Math.cos(Math.PI * x / 250) + 0.01593 * Math.sin(Math.PI * x / 500) + 0.03147 * Math.sin(Math.PI * x / 250);
    const lowerBound = y * 0.8;
    const upperBound = y * 1.2;
    if (this.milivolts >= lowerBound && this.milivolts <= upperBound) {
      console.log("This measure is irregular.");
      this.setIsRegular(false);
    } else {
      this.setIsRegular(true);
    }
  }
  setIsRegular(value) {
    this.isRegular = value;
  }
  setBippedAt(value) {
    this.bippedAt = value;
  }
  setUnBippedAt(value) {
    this.unBippedAt = value;
  }
};

// infra/database/dynamoose/model/ECG.model.ts
var dynamoose = __toESM(require_dist3());
var schema = new dynamoose.Schema(
  {
    id: {
      type: String,
      hashKey: true,
      required: true
    },
    deviceId: {
      type: String,
      index: {
        name: "DeviceIdIndex",
        type: "global"
      }
    },
    interval: Number,
    milivolts: Number,
    isRegular: Boolean,
    bippedAt: String,
    unBippedAt: String
  },
  {
    timestamps: {
      "createdAt": {
        "createdAt": {
          "type": {
            "value": Date,
            "settings": {
              "storage": "iso"
            }
          }
        }
      },
      "updatedAt": {
        "updatedAt": {
          "type": {
            "value": Date,
            "settings": {
              "storage": "iso"
            }
          }
        }
      }
    },
    saveUnknown: false
  }
);
var ECGModel = dynamoose.model(process.env.TABLE_NAME || "", schema, {
  create: false,
  throughput: {
    read: 5,
    write: 5
  }
});

// infra/repositories/dynamodb/dynamodb.repository.ts
var DynamooseDBRepository = class {
  async save(ecg) {
    console.log("ECG_MODEL", { ecg });
    const newECG = new ECGModel(ecg);
    console.log("dynamoose model created!", { newECG });
    const response = await newECG.save();
    console.log(response);
  }
  async put(ecg) {
    await ECGModel.put(ecg);
  }
  async listEntries(deviceId, interval) {
    console.log("listando resultados do device", { deviceId, interval });
    const limit = 30;
    const endDate = /* @__PURE__ */ new Date();
    const startDate = /* @__PURE__ */ new Date();
    startDate.setDate(
      endDate.getDate() - Number(interval) > limit ? limit : Number(interval)
    );
    const formattedStartDate = startDate.toISOString() + " 00:00:00";
    const formattedEndDate = endDate.toISOString() + " 23:59:59";
    console.log({ formattedStartDate, formattedEndDate, deviceId });
    const results = await ECGModel.query("deviceId").eq(deviceId).where("createdAt").between(formattedStartDate, formattedEndDate).using("DeviceIdIndex").exec();
    console.log({ results });
    return results.toJSON().map((ecgData) => {
      return new ECG(
        ecgData.deviceId,
        ecgData.milivolts,
        ecgData.interval,
        ecgData.bippedAt,
        ecgData.unBippedAt,
        ecgData.createdAt
      );
    });
  }
  async listIrregulaties(deviceId) {
    const results = await ECGModel.query("deviceId").eq(deviceId).where("isRegular").eq(false).using("DeviceIdIndex").exec();
    return results.toJSON().map((ecgData) => {
      return new ECG(
        ecgData.deviceId,
        ecgData.milivolts,
        ecgData.interval,
        ecgData.bippedAt,
        ecgData.unBippedAt,
        ecgData.createdAt
      );
    });
  }
  async instabilityCheck(deviceId) {
    return ECGModel.query("deviceId").eq(deviceId).sort("descending").limit(60).using("deviceIdIndex").exec();
  }
};

// infra/serverless/resources/lambda/handlers/listIrregularities/handler.ts
var main = async (event) => {
  console.log("entry", { event });
  const eventParameters = typeof event.queryStringParameters === "string" ? JSON.parse(event.queryStringParameters) : event.queryStringParameters;
  console.log({ eventParameters });
  const controller = new ListIrregularitiesController(new DynamooseDBRepository());
  return controller.handleListIrregularities(eventParameters);
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  main
});
//# sourceMappingURL=handler.js.map
