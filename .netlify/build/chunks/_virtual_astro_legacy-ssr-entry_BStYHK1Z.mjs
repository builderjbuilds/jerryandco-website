import * as _serverEntrypoint from '@astrojs/netlify/ssr-function.js';
import { createExports } from '@astrojs/netlify/ssr-function.js';

function _mergeNamespaces(n, m) {
  for (var i = 0; i < m.length; i++) {
    const e = m[i];
    if (typeof e !== 'string' && !Array.isArray(e)) { for (const k in e) {
      if (k !== 'default' && !(k in n)) {
        const d = Object.getOwnPropertyDescriptor(e, k);
        if (d) {
          Object.defineProperty(n, k, d.get ? d : {
            enumerable: true,
            get: () => e[k]
          });
        }
      }
    } }
  }
  return Object.freeze(Object.defineProperty(n, Symbol.toStringTag, { value: 'Module' }));
}

const args = {
  "middlewareSecret": "196d3b6c-be49-46ba-9e61-16ed66d12ba1"
};

const _virtual_astro_adapterEntrypoint = _serverEntrypoint.default;

const serverEntrypointModule = /*#__PURE__*/_mergeNamespaces({
  __proto__: null,
  default: _virtual_astro_adapterEntrypoint
}, [_serverEntrypoint]);

const NOOP_MIDDLEWARE_HEADER = "X-Astro-Noop";

let e=globalThis.process||{},t=e.argv||[],n=e.env||{};!(n.NO_COLOR||t.includes(`--no-color`))&&(!!n.FORCE_COLOR||t.includes(`--color`)||e.platform===`win32`||(e.stdout||{}).isTTY&&n.TERM!==`dumb`||!!n.CI);

const codeToStatusMap = {
  // Implemented from IANA HTTP Status Code Registry
  // https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  PAYMENT_REQUIRED: 402,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  NOT_ACCEPTABLE: 406,
  PROXY_AUTHENTICATION_REQUIRED: 407,
  REQUEST_TIMEOUT: 408,
  CONFLICT: 409,
  GONE: 410,
  LENGTH_REQUIRED: 411,
  PRECONDITION_FAILED: 412,
  CONTENT_TOO_LARGE: 413,
  URI_TOO_LONG: 414,
  UNSUPPORTED_MEDIA_TYPE: 415,
  RANGE_NOT_SATISFIABLE: 416,
  EXPECTATION_FAILED: 417,
  MISDIRECTED_REQUEST: 421,
  UNPROCESSABLE_CONTENT: 422,
  LOCKED: 423,
  FAILED_DEPENDENCY: 424,
  TOO_EARLY: 425,
  UPGRADE_REQUIRED: 426,
  PRECONDITION_REQUIRED: 428,
  TOO_MANY_REQUESTS: 429,
  REQUEST_HEADER_FIELDS_TOO_LARGE: 431,
  UNAVAILABLE_FOR_LEGAL_REASONS: 451,
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
  HTTP_VERSION_NOT_SUPPORTED: 505,
  VARIANT_ALSO_NEGOTIATES: 506,
  INSUFFICIENT_STORAGE: 507,
  LOOP_DETECTED: 508,
  NETWORK_AUTHENTICATION_REQUIRED: 511
};
Object.fromEntries(
  Object.entries(codeToStatusMap).map(([key, value]) => [value, key])
);

/* es-module-lexer 2.1.0 */
var ImportType;!function(A){A[A.Static=1]="Static",A[A.Dynamic=2]="Dynamic",A[A.ImportMeta=3]="ImportMeta",A[A.StaticSourcePhase=4]="StaticSourcePhase",A[A.DynamicSourcePhase=5]="DynamicSourcePhase",A[A.StaticDeferPhase=6]="StaticDeferPhase",A[A.DynamicDeferPhase=7]="DynamicDeferPhase";}(ImportType||(ImportType={}));1===new Uint8Array(new Uint16Array([1]).buffer)[0];const E=()=>{return A="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","undefined"!=typeof Buffer?Buffer.from(A,"base64"):Uint8Array.from(atob(A),(A=>A.charCodeAt(0)));var A;};WebAssembly.compile(E()).then(WebAssembly.instantiate).then((({exports:A})=>{}));

var _a$1;
function $constructor(name, initializer, params) {
    function init(inst, def) {
        if (!inst._zod) {
            Object.defineProperty(inst, "_zod", {
                value: {
                    def,
                    constr: _,
                    traits: new Set(),
                },
                enumerable: false,
            });
        }
        if (inst._zod.traits.has(name)) {
            return;
        }
        inst._zod.traits.add(name);
        initializer(inst, def);
        // support prototype modifications
        const proto = _.prototype;
        const keys = Object.keys(proto);
        for (let i = 0; i < keys.length; i++) {
            const k = keys[i];
            if (!(k in inst)) {
                inst[k] = proto[k].bind(inst);
            }
        }
    }
    // doesn't work if Parent has a constructor with arguments
    const Parent = params?.Parent ?? Object;
    class Definition extends Parent {
    }
    Object.defineProperty(Definition, "name", { value: name });
    function _(def) {
        var _a;
        const inst = params?.Parent ? new Definition() : this;
        init(inst, def);
        (_a = inst._zod).deferred ?? (_a.deferred = []);
        for (const fn of inst._zod.deferred) {
            fn();
        }
        return inst;
    }
    Object.defineProperty(_, "init", { value: init });
    Object.defineProperty(_, Symbol.hasInstance, {
        value: (inst) => {
            if (params?.Parent && inst instanceof params.Parent)
                return true;
            return inst?._zod?.traits?.has(name);
        },
    });
    Object.defineProperty(_, "name", { value: name });
    return _;
}
class $ZodAsyncError extends Error {
    constructor() {
        super(`Encountered Promise during synchronous parse. Use .parseAsync() instead.`);
    }
}
class $ZodEncodeError extends Error {
    constructor(name) {
        super(`Encountered unidirectional transform during encode: ${name}`);
        this.name = "ZodEncodeError";
    }
}
(_a$1 = globalThis).__zod_globalConfig ?? (_a$1.__zod_globalConfig = {});
const globalConfig = globalThis.__zod_globalConfig;
function config(newConfig) {
    return globalConfig;
}

function getEnumValues(entries) {
    const numericValues = Object.values(entries).filter((v) => typeof v === "number");
    const values = Object.entries(entries)
        .filter(([k, _]) => numericValues.indexOf(+k) === -1)
        .map(([_, v]) => v);
    return values;
}
function jsonStringifyReplacer(_, value) {
    if (typeof value === "bigint")
        return value.toString();
    return value;
}
function nullish(input) {
    return input === null || input === undefined;
}
function cleanRegex(source) {
    const start = source.startsWith("^") ? 1 : 0;
    const end = source.endsWith("$") ? source.length - 1 : source.length;
    return source.slice(start, end);
}
const EVALUATING = /* @__PURE__*/ Symbol("evaluating");
function defineLazy(object, key, getter) {
    let value = undefined;
    Object.defineProperty(object, key, {
        get() {
            if (value === EVALUATING) {
                // Circular reference detected, return undefined to break the cycle
                return undefined;
            }
            if (value === undefined) {
                value = EVALUATING;
                value = getter();
            }
            return value;
        },
        set(v) {
            Object.defineProperty(object, key, {
                value: v,
                // configurable: true,
            });
            // object[key] = v;
        },
        configurable: true,
    });
}
function mergeDefs(...defs) {
    const mergedDescriptors = {};
    for (const def of defs) {
        const descriptors = Object.getOwnPropertyDescriptors(def);
        Object.assign(mergedDescriptors, descriptors);
    }
    return Object.defineProperties({}, mergedDescriptors);
}
const captureStackTrace = ("captureStackTrace" in Error ? Error.captureStackTrace : (..._args) => { });
function isObject(data) {
    return typeof data === "object" && data !== null && !Array.isArray(data);
}
function isPlainObject(o) {
    if (isObject(o) === false)
        return false;
    // modified constructor
    const ctor = o.constructor;
    if (ctor === undefined)
        return true;
    if (typeof ctor !== "function")
        return true;
    // modified prototype
    const prot = ctor.prototype;
    if (isObject(prot) === false)
        return false;
    // ctor doesn't have static `isPrototypeOf`
    if (Object.prototype.hasOwnProperty.call(prot, "isPrototypeOf") === false) {
        return false;
    }
    return true;
}
function shallowClone(o) {
    if (isPlainObject(o))
        return { ...o };
    if (Array.isArray(o))
        return [...o];
    if (o instanceof Map)
        return new Map(o);
    if (o instanceof Set)
        return new Set(o);
    return o;
}
const propertyKeyTypes = /* @__PURE__*/ new Set(["string", "number", "symbol"]);
function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
// zod-specific utils
function clone(inst, def, params) {
    const cl = new inst._zod.constr(def ?? inst._zod.def);
    if (!def || params?.parent)
        cl._zod.parent = inst;
    return cl;
}
function normalizeParams(_params) {
    const params = _params;
    if (!params)
        return {};
    if (typeof params === "string")
        return { error: () => params };
    if (params?.message !== undefined) {
        if (params?.error !== undefined)
            throw new Error("Cannot specify both `message` and `error` params");
        params.error = params.message;
    }
    delete params.message;
    if (typeof params.error === "string")
        return { ...params, error: () => params.error };
    return params;
}
// invalid_type | too_big | too_small | invalid_format | not_multiple_of | unrecognized_keys | invalid_union | invalid_key | invalid_element | invalid_value | custom
function aborted(x, startIndex = 0) {
    if (x.aborted === true)
        return true;
    for (let i = startIndex; i < x.issues.length; i++) {
        if (x.issues[i]?.continue !== true) {
            return true;
        }
    }
    return false;
}
// Checks for explicit abort (continue === false), as opposed to implicit abort (continue === undefined).
// Used to respect `abort: true` in .refine() even for checks that have a `when` function.
function explicitlyAborted(x, startIndex = 0) {
    if (x.aborted === true)
        return true;
    for (let i = startIndex; i < x.issues.length; i++) {
        if (x.issues[i]?.continue === false) {
            return true;
        }
    }
    return false;
}
function prefixIssues(path, issues) {
    return issues.map((iss) => {
        var _a;
        (_a = iss).path ?? (_a.path = []);
        iss.path.unshift(path);
        return iss;
    });
}
function unwrapMessage(message) {
    return typeof message === "string" ? message : message?.message;
}
function finalizeIssue(iss, ctx, config) {
    const message = iss.message
        ? iss.message
        : (unwrapMessage(iss.inst?._zod.def?.error?.(iss)) ??
            unwrapMessage(ctx?.error?.(iss)) ??
            unwrapMessage(config.customError?.(iss)) ??
            unwrapMessage(config.localeError?.(iss)) ??
            "Invalid input");
    const { inst: _inst, continue: _continue, input: _input, ...rest } = iss;
    rest.path ?? (rest.path = []);
    rest.message = message;
    if (ctx?.reportInput) {
        rest.input = _input;
    }
    return rest;
}
function getLengthableOrigin(input) {
    if (Array.isArray(input))
        return "array";
    if (typeof input === "string")
        return "string";
    return "unknown";
}
function issue(...args) {
    const [iss, input, inst] = args;
    if (typeof iss === "string") {
        return {
            message: iss,
            code: "custom",
            input,
            inst,
        };
    }
    return { ...iss };
}

const initializer$1 = (inst, def) => {
    inst.name = "$ZodError";
    Object.defineProperty(inst, "_zod", {
        value: inst._zod,
        enumerable: false,
    });
    Object.defineProperty(inst, "issues", {
        value: def,
        enumerable: false,
    });
    inst.message = JSON.stringify(def, jsonStringifyReplacer, 2);
    Object.defineProperty(inst, "toString", {
        value: () => inst.message,
        enumerable: false,
    });
};
const $ZodError = $constructor("$ZodError", initializer$1);
const $ZodRealError = $constructor("$ZodError", initializer$1, { Parent: Error });
function flattenError(error, mapper = (issue) => issue.message) {
    const fieldErrors = {};
    const formErrors = [];
    for (const sub of error.issues) {
        if (sub.path.length > 0) {
            fieldErrors[sub.path[0]] = fieldErrors[sub.path[0]] || [];
            fieldErrors[sub.path[0]].push(mapper(sub));
        }
        else {
            formErrors.push(mapper(sub));
        }
    }
    return { formErrors, fieldErrors };
}
function formatError(error, mapper = (issue) => issue.message) {
    const fieldErrors = { _errors: [] };
    const processError = (error, path = []) => {
        for (const issue of error.issues) {
            if (issue.code === "invalid_union" && issue.errors.length) {
                issue.errors.map((issues) => processError({ issues }, [...path, ...issue.path]));
            }
            else if (issue.code === "invalid_key") {
                processError({ issues: issue.issues }, [...path, ...issue.path]);
            }
            else if (issue.code === "invalid_element") {
                processError({ issues: issue.issues }, [...path, ...issue.path]);
            }
            else {
                const fullpath = [...path, ...issue.path];
                if (fullpath.length === 0) {
                    fieldErrors._errors.push(mapper(issue));
                }
                else {
                    let curr = fieldErrors;
                    let i = 0;
                    while (i < fullpath.length) {
                        const el = fullpath[i];
                        const terminal = i === fullpath.length - 1;
                        if (!terminal) {
                            curr[el] = curr[el] || { _errors: [] };
                        }
                        else {
                            curr[el] = curr[el] || { _errors: [] };
                            curr[el]._errors.push(mapper(issue));
                        }
                        curr = curr[el];
                        i++;
                    }
                }
            }
        }
    };
    processError(error);
    return fieldErrors;
}

const _parse = (_Err) => (schema, value, _ctx, _params) => {
    const ctx = _ctx ? { ..._ctx, async: false } : { async: false };
    const result = schema._zod.run({ value, issues: [] }, ctx);
    if (result instanceof Promise) {
        throw new $ZodAsyncError();
    }
    if (result.issues.length) {
        const e = new (_params?.Err ?? _Err)(result.issues.map((iss) => finalizeIssue(iss, ctx, config())));
        captureStackTrace(e, _params?.callee);
        throw e;
    }
    return result.value;
};
const _parseAsync = (_Err) => async (schema, value, _ctx, params) => {
    const ctx = _ctx ? { ..._ctx, async: true } : { async: true };
    let result = schema._zod.run({ value, issues: [] }, ctx);
    if (result instanceof Promise)
        result = await result;
    if (result.issues.length) {
        const e = new (params?.Err ?? _Err)(result.issues.map((iss) => finalizeIssue(iss, ctx, config())));
        captureStackTrace(e, params?.callee);
        throw e;
    }
    return result.value;
};
const _safeParse = (_Err) => (schema, value, _ctx) => {
    const ctx = _ctx ? { ..._ctx, async: false } : { async: false };
    const result = schema._zod.run({ value, issues: [] }, ctx);
    if (result instanceof Promise) {
        throw new $ZodAsyncError();
    }
    return result.issues.length
        ? {
            success: false,
            error: new (_Err ?? $ZodError)(result.issues.map((iss) => finalizeIssue(iss, ctx, config()))),
        }
        : { success: true, data: result.value };
};
const safeParse$1 = /* @__PURE__*/ _safeParse($ZodRealError);
const _safeParseAsync = (_Err) => async (schema, value, _ctx) => {
    const ctx = _ctx ? { ..._ctx, async: true } : { async: true };
    let result = schema._zod.run({ value, issues: [] }, ctx);
    if (result instanceof Promise)
        result = await result;
    return result.issues.length
        ? {
            success: false,
            error: new _Err(result.issues.map((iss) => finalizeIssue(iss, ctx, config()))),
        }
        : { success: true, data: result.value };
};
const safeParseAsync$1 = /* @__PURE__*/ _safeParseAsync($ZodRealError);
const _encode = (_Err) => (schema, value, _ctx) => {
    const ctx = _ctx ? { ..._ctx, direction: "backward" } : { direction: "backward" };
    return _parse(_Err)(schema, value, ctx);
};
const _decode = (_Err) => (schema, value, _ctx) => {
    return _parse(_Err)(schema, value, _ctx);
};
const _encodeAsync = (_Err) => async (schema, value, _ctx) => {
    const ctx = _ctx ? { ..._ctx, direction: "backward" } : { direction: "backward" };
    return _parseAsync(_Err)(schema, value, ctx);
};
const _decodeAsync = (_Err) => async (schema, value, _ctx) => {
    return _parseAsync(_Err)(schema, value, _ctx);
};
const _safeEncode = (_Err) => (schema, value, _ctx) => {
    const ctx = _ctx ? { ..._ctx, direction: "backward" } : { direction: "backward" };
    return _safeParse(_Err)(schema, value, ctx);
};
const _safeDecode = (_Err) => (schema, value, _ctx) => {
    return _safeParse(_Err)(schema, value, _ctx);
};
const _safeEncodeAsync = (_Err) => async (schema, value, _ctx) => {
    const ctx = _ctx ? { ..._ctx, direction: "backward" } : { direction: "backward" };
    return _safeParseAsync(_Err)(schema, value, ctx);
};
const _safeDecodeAsync = (_Err) => async (schema, value, _ctx) => {
    return _safeParseAsync(_Err)(schema, value, _ctx);
};

// import { $ZodType } from "./schemas.js";
const $ZodCheck = /*@__PURE__*/ $constructor("$ZodCheck", (inst, def) => {
    var _a;
    inst._zod ?? (inst._zod = {});
    inst._zod.def = def;
    (_a = inst._zod).onattach ?? (_a.onattach = []);
});
const $ZodCheckMaxLength = /*@__PURE__*/ $constructor("$ZodCheckMaxLength", (inst, def) => {
    var _a;
    $ZodCheck.init(inst, def);
    (_a = inst._zod.def).when ?? (_a.when = (payload) => {
        const val = payload.value;
        return !nullish(val) && val.length !== undefined;
    });
    inst._zod.onattach.push((inst) => {
        const curr = (inst._zod.bag.maximum ?? Number.POSITIVE_INFINITY);
        if (def.maximum < curr)
            inst._zod.bag.maximum = def.maximum;
    });
    inst._zod.check = (payload) => {
        const input = payload.value;
        const length = input.length;
        if (length <= def.maximum)
            return;
        const origin = getLengthableOrigin(input);
        payload.issues.push({
            origin,
            code: "too_big",
            maximum: def.maximum,
            inclusive: true,
            input,
            inst,
            continue: !def.abort,
        });
    };
});
const $ZodCheckMinLength = /*@__PURE__*/ $constructor("$ZodCheckMinLength", (inst, def) => {
    var _a;
    $ZodCheck.init(inst, def);
    (_a = inst._zod.def).when ?? (_a.when = (payload) => {
        const val = payload.value;
        return !nullish(val) && val.length !== undefined;
    });
    inst._zod.onattach.push((inst) => {
        const curr = (inst._zod.bag.minimum ?? Number.NEGATIVE_INFINITY);
        if (def.minimum > curr)
            inst._zod.bag.minimum = def.minimum;
    });
    inst._zod.check = (payload) => {
        const input = payload.value;
        const length = input.length;
        if (length >= def.minimum)
            return;
        const origin = getLengthableOrigin(input);
        payload.issues.push({
            origin,
            code: "too_small",
            minimum: def.minimum,
            inclusive: true,
            input,
            inst,
            continue: !def.abort,
        });
    };
});
const $ZodCheckLengthEquals = /*@__PURE__*/ $constructor("$ZodCheckLengthEquals", (inst, def) => {
    var _a;
    $ZodCheck.init(inst, def);
    (_a = inst._zod.def).when ?? (_a.when = (payload) => {
        const val = payload.value;
        return !nullish(val) && val.length !== undefined;
    });
    inst._zod.onattach.push((inst) => {
        const bag = inst._zod.bag;
        bag.minimum = def.length;
        bag.maximum = def.length;
        bag.length = def.length;
    });
    inst._zod.check = (payload) => {
        const input = payload.value;
        const length = input.length;
        if (length === def.length)
            return;
        const origin = getLengthableOrigin(input);
        const tooBig = length > def.length;
        payload.issues.push({
            origin,
            ...(tooBig ? { code: "too_big", maximum: def.length } : { code: "too_small", minimum: def.length }),
            inclusive: true,
            exact: true,
            input: payload.value,
            inst,
            continue: !def.abort,
        });
    };
});
const $ZodCheckOverwrite = /*@__PURE__*/ $constructor("$ZodCheckOverwrite", (inst, def) => {
    $ZodCheck.init(inst, def);
    inst._zod.check = (payload) => {
        payload.value = def.tx(payload.value);
    };
});

const version = {
    major: 4,
    minor: 4,
    patch: 3,
};

const $ZodType = /*@__PURE__*/ $constructor("$ZodType", (inst, def) => {
    var _a;
    inst ?? (inst = {});
    inst._zod.def = def; // set _def property
    inst._zod.bag = inst._zod.bag || {}; // initialize _bag object
    inst._zod.version = version;
    const checks = [...(inst._zod.def.checks ?? [])];
    // if inst is itself a checks.$ZodCheck, run it as a check
    if (inst._zod.traits.has("$ZodCheck")) {
        checks.unshift(inst);
    }
    for (const ch of checks) {
        for (const fn of ch._zod.onattach) {
            fn(inst);
        }
    }
    if (checks.length === 0) {
        // deferred initializer
        // inst._zod.parse is not yet defined
        (_a = inst._zod).deferred ?? (_a.deferred = []);
        inst._zod.deferred?.push(() => {
            inst._zod.run = inst._zod.parse;
        });
    }
    else {
        const runChecks = (payload, checks, ctx) => {
            let isAborted = aborted(payload);
            let asyncResult;
            for (const ch of checks) {
                if (ch._zod.def.when) {
                    if (explicitlyAborted(payload))
                        continue;
                    const shouldRun = ch._zod.def.when(payload);
                    if (!shouldRun)
                        continue;
                }
                else if (isAborted) {
                    continue;
                }
                const currLen = payload.issues.length;
                const _ = ch._zod.check(payload);
                if (_ instanceof Promise && ctx?.async === false) {
                    throw new $ZodAsyncError();
                }
                if (asyncResult || _ instanceof Promise) {
                    asyncResult = (asyncResult ?? Promise.resolve()).then(async () => {
                        await _;
                        const nextLen = payload.issues.length;
                        if (nextLen === currLen)
                            return;
                        if (!isAborted)
                            isAborted = aborted(payload, currLen);
                    });
                }
                else {
                    const nextLen = payload.issues.length;
                    if (nextLen === currLen)
                        continue;
                    if (!isAborted)
                        isAborted = aborted(payload, currLen);
                }
            }
            if (asyncResult) {
                return asyncResult.then(() => {
                    return payload;
                });
            }
            return payload;
        };
        const handleCanaryResult = (canary, payload, ctx) => {
            // abort if the canary is aborted
            if (aborted(canary)) {
                canary.aborted = true;
                return canary;
            }
            // run checks first, then
            const checkResult = runChecks(payload, checks, ctx);
            if (checkResult instanceof Promise) {
                if (ctx.async === false)
                    throw new $ZodAsyncError();
                return checkResult.then((checkResult) => inst._zod.parse(checkResult, ctx));
            }
            return inst._zod.parse(checkResult, ctx);
        };
        inst._zod.run = (payload, ctx) => {
            if (ctx.skipChecks) {
                return inst._zod.parse(payload, ctx);
            }
            if (ctx.direction === "backward") {
                // run canary
                // initial pass (no checks)
                const canary = inst._zod.parse({ value: payload.value, issues: [] }, { ...ctx, skipChecks: true });
                if (canary instanceof Promise) {
                    return canary.then((canary) => {
                        return handleCanaryResult(canary, payload, ctx);
                    });
                }
                return handleCanaryResult(canary, payload, ctx);
            }
            // forward
            const result = inst._zod.parse(payload, ctx);
            if (result instanceof Promise) {
                if (ctx.async === false)
                    throw new $ZodAsyncError();
                return result.then((result) => runChecks(result, checks, ctx));
            }
            return runChecks(result, checks, ctx);
        };
    }
    // Lazy initialize ~standard to avoid creating objects for every schema
    defineLazy(inst, "~standard", () => ({
        validate: (value) => {
            try {
                const r = safeParse$1(inst, value);
                return r.success ? { value: r.data } : { issues: r.error?.issues };
            }
            catch (_) {
                return safeParseAsync$1(inst, value).then((r) => (r.success ? { value: r.data } : { issues: r.error?.issues }));
            }
        },
        vendor: "zod",
        version: 1,
    }));
});
function handleArrayResult(result, final, index) {
    if (result.issues.length) {
        final.issues.push(...prefixIssues(index, result.issues));
    }
    final.value[index] = result.value;
}
const $ZodArray = /*@__PURE__*/ $constructor("$ZodArray", (inst, def) => {
    $ZodType.init(inst, def);
    inst._zod.parse = (payload, ctx) => {
        const input = payload.value;
        if (!Array.isArray(input)) {
            payload.issues.push({
                expected: "array",
                code: "invalid_type",
                input,
                inst,
            });
            return payload;
        }
        payload.value = Array(input.length);
        const proms = [];
        for (let i = 0; i < input.length; i++) {
            const item = input[i];
            const result = def.element._zod.run({
                value: item,
                issues: [],
            }, ctx);
            if (result instanceof Promise) {
                proms.push(result.then((result) => handleArrayResult(result, payload, i)));
            }
            else {
                handleArrayResult(result, payload, i);
            }
        }
        if (proms.length) {
            return Promise.all(proms).then(() => payload);
        }
        return payload; //handleArrayResultsAsync(parseResults, final);
    };
});
function handleUnionResults(results, final, inst, ctx) {
    for (const result of results) {
        if (result.issues.length === 0) {
            final.value = result.value;
            return final;
        }
    }
    const nonaborted = results.filter((r) => !aborted(r));
    if (nonaborted.length === 1) {
        final.value = nonaborted[0].value;
        return nonaborted[0];
    }
    final.issues.push({
        code: "invalid_union",
        input: final.value,
        inst,
        errors: results.map((result) => result.issues.map((iss) => finalizeIssue(iss, ctx, config()))),
    });
    return final;
}
const $ZodUnion = /*@__PURE__*/ $constructor("$ZodUnion", (inst, def) => {
    $ZodType.init(inst, def);
    defineLazy(inst._zod, "optin", () => def.options.some((o) => o._zod.optin === "optional") ? "optional" : undefined);
    defineLazy(inst._zod, "optout", () => def.options.some((o) => o._zod.optout === "optional") ? "optional" : undefined);
    defineLazy(inst._zod, "values", () => {
        if (def.options.every((o) => o._zod.values)) {
            return new Set(def.options.flatMap((option) => Array.from(option._zod.values)));
        }
        return undefined;
    });
    defineLazy(inst._zod, "pattern", () => {
        if (def.options.every((o) => o._zod.pattern)) {
            const patterns = def.options.map((o) => o._zod.pattern);
            return new RegExp(`^(${patterns.map((p) => cleanRegex(p.source)).join("|")})$`);
        }
        return undefined;
    });
    const first = def.options.length === 1 ? def.options[0]._zod.run : null;
    inst._zod.parse = (payload, ctx) => {
        if (first) {
            return first(payload, ctx);
        }
        let async = false;
        const results = [];
        for (const option of def.options) {
            const result = option._zod.run({
                value: payload.value,
                issues: [],
            }, ctx);
            if (result instanceof Promise) {
                results.push(result);
                async = true;
            }
            else {
                if (result.issues.length === 0)
                    return result;
                results.push(result);
            }
        }
        if (!async)
            return handleUnionResults(results, payload, inst, ctx);
        return Promise.all(results).then((results) => {
            return handleUnionResults(results, payload, inst, ctx);
        });
    };
});
const $ZodIntersection = /*@__PURE__*/ $constructor("$ZodIntersection", (inst, def) => {
    $ZodType.init(inst, def);
    inst._zod.parse = (payload, ctx) => {
        const input = payload.value;
        const left = def.left._zod.run({ value: input, issues: [] }, ctx);
        const right = def.right._zod.run({ value: input, issues: [] }, ctx);
        const async = left instanceof Promise || right instanceof Promise;
        if (async) {
            return Promise.all([left, right]).then(([left, right]) => {
                return handleIntersectionResults(payload, left, right);
            });
        }
        return handleIntersectionResults(payload, left, right);
    };
});
function mergeValues(a, b) {
    // const aType = parse.t(a);
    // const bType = parse.t(b);
    if (a === b) {
        return { valid: true, data: a };
    }
    if (a instanceof Date && b instanceof Date && +a === +b) {
        return { valid: true, data: a };
    }
    if (isPlainObject(a) && isPlainObject(b)) {
        const bKeys = Object.keys(b);
        const sharedKeys = Object.keys(a).filter((key) => bKeys.indexOf(key) !== -1);
        const newObj = { ...a, ...b };
        for (const key of sharedKeys) {
            const sharedValue = mergeValues(a[key], b[key]);
            if (!sharedValue.valid) {
                return {
                    valid: false,
                    mergeErrorPath: [key, ...sharedValue.mergeErrorPath],
                };
            }
            newObj[key] = sharedValue.data;
        }
        return { valid: true, data: newObj };
    }
    if (Array.isArray(a) && Array.isArray(b)) {
        if (a.length !== b.length) {
            return { valid: false, mergeErrorPath: [] };
        }
        const newArray = [];
        for (let index = 0; index < a.length; index++) {
            const itemA = a[index];
            const itemB = b[index];
            const sharedValue = mergeValues(itemA, itemB);
            if (!sharedValue.valid) {
                return {
                    valid: false,
                    mergeErrorPath: [index, ...sharedValue.mergeErrorPath],
                };
            }
            newArray.push(sharedValue.data);
        }
        return { valid: true, data: newArray };
    }
    return { valid: false, mergeErrorPath: [] };
}
function handleIntersectionResults(result, left, right) {
    // Track which side(s) report each key as unrecognized
    const unrecKeys = new Map();
    let unrecIssue;
    for (const iss of left.issues) {
        if (iss.code === "unrecognized_keys") {
            unrecIssue ?? (unrecIssue = iss);
            for (const k of iss.keys) {
                if (!unrecKeys.has(k))
                    unrecKeys.set(k, {});
                unrecKeys.get(k).l = true;
            }
        }
        else {
            result.issues.push(iss);
        }
    }
    for (const iss of right.issues) {
        if (iss.code === "unrecognized_keys") {
            for (const k of iss.keys) {
                if (!unrecKeys.has(k))
                    unrecKeys.set(k, {});
                unrecKeys.get(k).r = true;
            }
        }
        else {
            result.issues.push(iss);
        }
    }
    // Report only keys unrecognized by BOTH sides
    const bothKeys = [...unrecKeys].filter(([, f]) => f.l && f.r).map(([k]) => k);
    if (bothKeys.length && unrecIssue) {
        result.issues.push({ ...unrecIssue, keys: bothKeys });
    }
    if (aborted(result))
        return result;
    const merged = mergeValues(left.value, right.value);
    if (!merged.valid) {
        throw new Error(`Unmergable intersection. Error path: ` + `${JSON.stringify(merged.mergeErrorPath)}`);
    }
    result.value = merged.data;
    return result;
}
const $ZodEnum = /*@__PURE__*/ $constructor("$ZodEnum", (inst, def) => {
    $ZodType.init(inst, def);
    const values = getEnumValues(def.entries);
    const valuesSet = new Set(values);
    inst._zod.values = valuesSet;
    inst._zod.pattern = new RegExp(`^(${values
        .filter((k) => propertyKeyTypes.has(typeof k))
        .map((o) => (typeof o === "string" ? escapeRegex(o) : o.toString()))
        .join("|")})$`);
    inst._zod.parse = (payload, _ctx) => {
        const input = payload.value;
        if (valuesSet.has(input)) {
            return payload;
        }
        payload.issues.push({
            code: "invalid_value",
            values,
            input,
            inst,
        });
        return payload;
    };
});
const $ZodTransform = /*@__PURE__*/ $constructor("$ZodTransform", (inst, def) => {
    $ZodType.init(inst, def);
    inst._zod.optin = "optional";
    inst._zod.parse = (payload, ctx) => {
        if (ctx.direction === "backward") {
            throw new $ZodEncodeError(inst.constructor.name);
        }
        const _out = def.transform(payload.value, payload);
        if (ctx.async) {
            const output = _out instanceof Promise ? _out : Promise.resolve(_out);
            return output.then((output) => {
                payload.value = output;
                payload.fallback = true;
                return payload;
            });
        }
        if (_out instanceof Promise) {
            throw new $ZodAsyncError();
        }
        payload.value = _out;
        payload.fallback = true;
        return payload;
    };
});
function handleOptionalResult(result, input) {
    if (input === undefined && (result.issues.length || result.fallback)) {
        return { issues: [], value: undefined };
    }
    return result;
}
const $ZodOptional = /*@__PURE__*/ $constructor("$ZodOptional", (inst, def) => {
    $ZodType.init(inst, def);
    inst._zod.optin = "optional";
    inst._zod.optout = "optional";
    defineLazy(inst._zod, "values", () => {
        return def.innerType._zod.values ? new Set([...def.innerType._zod.values, undefined]) : undefined;
    });
    defineLazy(inst._zod, "pattern", () => {
        const pattern = def.innerType._zod.pattern;
        return pattern ? new RegExp(`^(${cleanRegex(pattern.source)})?$`) : undefined;
    });
    inst._zod.parse = (payload, ctx) => {
        if (def.innerType._zod.optin === "optional") {
            const input = payload.value;
            const result = def.innerType._zod.run(payload, ctx);
            if (result instanceof Promise)
                return result.then((r) => handleOptionalResult(r, input));
            return handleOptionalResult(result, input);
        }
        if (payload.value === undefined) {
            return payload;
        }
        return def.innerType._zod.run(payload, ctx);
    };
});
const $ZodExactOptional = /*@__PURE__*/ $constructor("$ZodExactOptional", (inst, def) => {
    // Call parent init - inherits optin/optout = "optional"
    $ZodOptional.init(inst, def);
    // Override values/pattern to NOT add undefined
    defineLazy(inst._zod, "values", () => def.innerType._zod.values);
    defineLazy(inst._zod, "pattern", () => def.innerType._zod.pattern);
    // Override parse to just delegate (no undefined handling)
    inst._zod.parse = (payload, ctx) => {
        return def.innerType._zod.run(payload, ctx);
    };
});
const $ZodNullable = /*@__PURE__*/ $constructor("$ZodNullable", (inst, def) => {
    $ZodType.init(inst, def);
    defineLazy(inst._zod, "optin", () => def.innerType._zod.optin);
    defineLazy(inst._zod, "optout", () => def.innerType._zod.optout);
    defineLazy(inst._zod, "pattern", () => {
        const pattern = def.innerType._zod.pattern;
        return pattern ? new RegExp(`^(${cleanRegex(pattern.source)}|null)$`) : undefined;
    });
    defineLazy(inst._zod, "values", () => {
        return def.innerType._zod.values ? new Set([...def.innerType._zod.values, null]) : undefined;
    });
    inst._zod.parse = (payload, ctx) => {
        // Forward direction (decode): allow null to pass through
        if (payload.value === null)
            return payload;
        return def.innerType._zod.run(payload, ctx);
    };
});
const $ZodDefault = /*@__PURE__*/ $constructor("$ZodDefault", (inst, def) => {
    $ZodType.init(inst, def);
    // inst._zod.qin = "true";
    inst._zod.optin = "optional";
    defineLazy(inst._zod, "values", () => def.innerType._zod.values);
    inst._zod.parse = (payload, ctx) => {
        if (ctx.direction === "backward") {
            return def.innerType._zod.run(payload, ctx);
        }
        // Forward direction (decode): apply defaults for undefined input
        if (payload.value === undefined) {
            payload.value = def.defaultValue;
            /**
             * $ZodDefault returns the default value immediately in forward direction.
             * It doesn't pass the default value into the validator ("prefault"). There's no reason to pass the default value through validation. The validity of the default is enforced by TypeScript statically. Otherwise, it's the responsibility of the user to ensure the default is valid. In the case of pipes with divergent in/out types, you can specify the default on the `in` schema of your ZodPipe to set a "prefault" for the pipe.   */
            return payload;
        }
        // Forward direction: continue with default handling
        const result = def.innerType._zod.run(payload, ctx);
        if (result instanceof Promise) {
            return result.then((result) => handleDefaultResult(result, def));
        }
        return handleDefaultResult(result, def);
    };
});
function handleDefaultResult(payload, def) {
    if (payload.value === undefined) {
        payload.value = def.defaultValue;
    }
    return payload;
}
const $ZodPrefault = /*@__PURE__*/ $constructor("$ZodPrefault", (inst, def) => {
    $ZodType.init(inst, def);
    inst._zod.optin = "optional";
    defineLazy(inst._zod, "values", () => def.innerType._zod.values);
    inst._zod.parse = (payload, ctx) => {
        if (ctx.direction === "backward") {
            return def.innerType._zod.run(payload, ctx);
        }
        // Forward direction (decode): apply prefault for undefined input
        if (payload.value === undefined) {
            payload.value = def.defaultValue;
        }
        return def.innerType._zod.run(payload, ctx);
    };
});
const $ZodNonOptional = /*@__PURE__*/ $constructor("$ZodNonOptional", (inst, def) => {
    $ZodType.init(inst, def);
    defineLazy(inst._zod, "values", () => {
        const v = def.innerType._zod.values;
        return v ? new Set([...v].filter((x) => x !== undefined)) : undefined;
    });
    inst._zod.parse = (payload, ctx) => {
        const result = def.innerType._zod.run(payload, ctx);
        if (result instanceof Promise) {
            return result.then((result) => handleNonOptionalResult(result, inst));
        }
        return handleNonOptionalResult(result, inst);
    };
});
function handleNonOptionalResult(payload, inst) {
    if (!payload.issues.length && payload.value === undefined) {
        payload.issues.push({
            code: "invalid_type",
            expected: "nonoptional",
            input: payload.value,
            inst,
        });
    }
    return payload;
}
const $ZodCatch = /*@__PURE__*/ $constructor("$ZodCatch", (inst, def) => {
    $ZodType.init(inst, def);
    inst._zod.optin = "optional";
    defineLazy(inst._zod, "optout", () => def.innerType._zod.optout);
    defineLazy(inst._zod, "values", () => def.innerType._zod.values);
    inst._zod.parse = (payload, ctx) => {
        if (ctx.direction === "backward") {
            return def.innerType._zod.run(payload, ctx);
        }
        // Forward direction (decode): apply catch logic
        const result = def.innerType._zod.run(payload, ctx);
        if (result instanceof Promise) {
            return result.then((result) => {
                payload.value = result.value;
                if (result.issues.length) {
                    payload.value = def.catchValue({
                        ...payload,
                        error: {
                            issues: result.issues.map((iss) => finalizeIssue(iss, ctx, config())),
                        },
                        input: payload.value,
                    });
                    payload.issues = [];
                    payload.fallback = true;
                }
                return payload;
            });
        }
        payload.value = result.value;
        if (result.issues.length) {
            payload.value = def.catchValue({
                ...payload,
                error: {
                    issues: result.issues.map((iss) => finalizeIssue(iss, ctx, config())),
                },
                input: payload.value,
            });
            payload.issues = [];
            payload.fallback = true;
        }
        return payload;
    };
});
const $ZodPipe = /*@__PURE__*/ $constructor("$ZodPipe", (inst, def) => {
    $ZodType.init(inst, def);
    defineLazy(inst._zod, "values", () => def.in._zod.values);
    defineLazy(inst._zod, "optin", () => def.in._zod.optin);
    defineLazy(inst._zod, "optout", () => def.out._zod.optout);
    defineLazy(inst._zod, "propValues", () => def.in._zod.propValues);
    inst._zod.parse = (payload, ctx) => {
        if (ctx.direction === "backward") {
            const right = def.out._zod.run(payload, ctx);
            if (right instanceof Promise) {
                return right.then((right) => handlePipeResult(right, def.in, ctx));
            }
            return handlePipeResult(right, def.in, ctx);
        }
        const left = def.in._zod.run(payload, ctx);
        if (left instanceof Promise) {
            return left.then((left) => handlePipeResult(left, def.out, ctx));
        }
        return handlePipeResult(left, def.out, ctx);
    };
});
function handlePipeResult(left, next, ctx) {
    if (left.issues.length) {
        // prevent further checks
        left.aborted = true;
        return left;
    }
    return next._zod.run({ value: left.value, issues: left.issues, fallback: left.fallback }, ctx);
}
const $ZodReadonly = /*@__PURE__*/ $constructor("$ZodReadonly", (inst, def) => {
    $ZodType.init(inst, def);
    defineLazy(inst._zod, "propValues", () => def.innerType._zod.propValues);
    defineLazy(inst._zod, "values", () => def.innerType._zod.values);
    defineLazy(inst._zod, "optin", () => def.innerType?._zod?.optin);
    defineLazy(inst._zod, "optout", () => def.innerType?._zod?.optout);
    inst._zod.parse = (payload, ctx) => {
        if (ctx.direction === "backward") {
            return def.innerType._zod.run(payload, ctx);
        }
        const result = def.innerType._zod.run(payload, ctx);
        if (result instanceof Promise) {
            return result.then(handleReadonlyResult);
        }
        return handleReadonlyResult(result);
    };
});
function handleReadonlyResult(payload) {
    payload.value = Object.freeze(payload.value);
    return payload;
}
const $ZodCustom = /*@__PURE__*/ $constructor("$ZodCustom", (inst, def) => {
    $ZodCheck.init(inst, def);
    $ZodType.init(inst, def);
    inst._zod.parse = (payload, _) => {
        return payload;
    };
    inst._zod.check = (payload) => {
        const input = payload.value;
        const r = def.fn(input);
        if (r instanceof Promise) {
            return r.then((r) => handleRefineResult(r, payload, input, inst));
        }
        handleRefineResult(r, payload, input, inst);
        return;
    };
});
function handleRefineResult(result, payload, input, inst) {
    if (!result) {
        const _iss = {
            code: "custom",
            input,
            inst, // incorporates params.error into issue reporting
            path: [...(inst._zod.def.path ?? [])], // incorporates params.error into issue reporting
            continue: !inst._zod.def.abort,
            // params: inst._zod.def.params,
        };
        if (inst._zod.def.params)
            _iss.params = inst._zod.def.params;
        payload.issues.push(issue(_iss));
    }
}

var _a;
class $ZodRegistry {
    constructor() {
        this._map = new WeakMap();
        this._idmap = new Map();
    }
    add(schema, ..._meta) {
        const meta = _meta[0];
        this._map.set(schema, meta);
        if (meta && typeof meta === "object" && "id" in meta) {
            this._idmap.set(meta.id, schema);
        }
        return this;
    }
    clear() {
        this._map = new WeakMap();
        this._idmap = new Map();
        return this;
    }
    remove(schema) {
        const meta = this._map.get(schema);
        if (meta && typeof meta === "object" && "id" in meta) {
            this._idmap.delete(meta.id);
        }
        this._map.delete(schema);
        return this;
    }
    get(schema) {
        // return this._map.get(schema) as any;
        // inherit metadata
        const p = schema._zod.parent;
        if (p) {
            const pm = { ...(this.get(p) ?? {}) };
            delete pm.id; // do not inherit id
            const f = { ...pm, ...this._map.get(schema) };
            return Object.keys(f).length ? f : undefined;
        }
        return this._map.get(schema);
    }
    has(schema) {
        return this._map.has(schema);
    }
}
// registries
function registry() {
    return new $ZodRegistry();
}
(_a = globalThis).__zod_globalRegistry ?? (_a.__zod_globalRegistry = registry());
const globalRegistry = globalThis.__zod_globalRegistry;

// @__NO_SIDE_EFFECTS__
function _maxLength(maximum, params) {
    const ch = new $ZodCheckMaxLength({
        check: "max_length",
        ...normalizeParams(params),
        maximum,
    });
    return ch;
}
// @__NO_SIDE_EFFECTS__
function _minLength(minimum, params) {
    return new $ZodCheckMinLength({
        check: "min_length",
        ...normalizeParams(params),
        minimum,
    });
}
// @__NO_SIDE_EFFECTS__
function _length(length, params) {
    return new $ZodCheckLengthEquals({
        check: "length_equals",
        ...normalizeParams(params),
        length,
    });
}
// @__NO_SIDE_EFFECTS__
function _overwrite(tx) {
    return new $ZodCheckOverwrite({
        check: "overwrite",
        tx,
    });
}
// @__NO_SIDE_EFFECTS__
function _array(Class, element, params) {
    return new Class({
        type: "array",
        element,
        // get element() {
        //   return element;
        // },
        ...normalizeParams(params),
    });
}
// @__NO_SIDE_EFFECTS__
function _custom(Class, fn, _params) {
    const norm = normalizeParams(_params);
    norm.abort ?? (norm.abort = true); // default to abort:false
    const schema = new Class({
        type: "custom",
        check: "custom",
        fn: fn,
        ...norm,
    });
    return schema;
}
// same as _custom but defaults to abort:false
// @__NO_SIDE_EFFECTS__
function _refine(Class, fn, _params) {
    const schema = new Class({
        type: "custom",
        check: "custom",
        fn: fn,
        ...normalizeParams(_params),
    });
    return schema;
}
// @__NO_SIDE_EFFECTS__
function _superRefine(fn, params) {
    const ch = _check((payload) => {
        payload.addIssue = (issue$1) => {
            if (typeof issue$1 === "string") {
                payload.issues.push(issue(issue$1, payload.value, ch._zod.def));
            }
            else {
                // for Zod 3 backwards compatibility
                const _issue = issue$1;
                if (_issue.fatal)
                    _issue.continue = false;
                _issue.code ?? (_issue.code = "custom");
                _issue.input ?? (_issue.input = payload.value);
                _issue.inst ?? (_issue.inst = ch);
                _issue.continue ?? (_issue.continue = !ch._zod.def.abort); // abort is always undefined, so this is always true...
                payload.issues.push(issue(_issue));
            }
        };
        return fn(payload.value, payload);
    }, params);
    return ch;
}
// @__NO_SIDE_EFFECTS__
function _check(fn, params) {
    const ch = new $ZodCheck({
        check: "custom",
        ...normalizeParams(params),
    });
    ch._zod.check = fn;
    return ch;
}

// function initializeContext<T extends schemas.$ZodType>(inputs: JSONSchemaGeneratorParams<T>): ToJSONSchemaContext<T> {
//   return {
//     processor: inputs.processor,
//     metadataRegistry: inputs.metadata ?? globalRegistry,
//     target: inputs.target ?? "draft-2020-12",
//     unrepresentable: inputs.unrepresentable ?? "throw",
//   };
// }
function initializeContext(params) {
    // Normalize target: convert old non-hyphenated versions to hyphenated versions
    let target = params?.target ?? "draft-2020-12";
    if (target === "draft-4")
        target = "draft-04";
    if (target === "draft-7")
        target = "draft-07";
    return {
        processors: params.processors ?? {},
        metadataRegistry: params?.metadata ?? globalRegistry,
        target,
        unrepresentable: params?.unrepresentable ?? "throw",
        override: params?.override ?? (() => { }),
        io: params?.io ?? "output",
        counter: 0,
        seen: new Map(),
        cycles: params?.cycles ?? "ref",
        reused: params?.reused ?? "inline",
        external: params?.external ?? undefined,
    };
}
function process$1(schema, ctx, _params = { path: [], schemaPath: [] }) {
    var _a;
    const def = schema._zod.def;
    // check for schema in seens
    const seen = ctx.seen.get(schema);
    if (seen) {
        seen.count++;
        // check if cycle
        const isCycle = _params.schemaPath.includes(schema);
        if (isCycle) {
            seen.cycle = _params.path;
        }
        return seen.schema;
    }
    // initialize
    const result = { schema: {}, count: 1, cycle: undefined, path: _params.path };
    ctx.seen.set(schema, result);
    // custom method overrides default behavior
    const overrideSchema = schema._zod.toJSONSchema?.();
    if (overrideSchema) {
        result.schema = overrideSchema;
    }
    else {
        const params = {
            ..._params,
            schemaPath: [..._params.schemaPath, schema],
            path: _params.path,
        };
        if (schema._zod.processJSONSchema) {
            schema._zod.processJSONSchema(ctx, result.schema, params);
        }
        else {
            const _json = result.schema;
            const processor = ctx.processors[def.type];
            if (!processor) {
                throw new Error(`[toJSONSchema]: Non-representable type encountered: ${def.type}`);
            }
            processor(schema, ctx, _json, params);
        }
        const parent = schema._zod.parent;
        if (parent) {
            // Also set ref if processor didn't (for inheritance)
            if (!result.ref)
                result.ref = parent;
            process$1(parent, ctx, params);
            ctx.seen.get(parent).isParent = true;
        }
    }
    // metadata
    const meta = ctx.metadataRegistry.get(schema);
    if (meta)
        Object.assign(result.schema, meta);
    if (ctx.io === "input" && isTransforming(schema)) {
        // examples/defaults only apply to output type of pipe
        delete result.schema.examples;
        delete result.schema.default;
    }
    // set prefault as default
    if (ctx.io === "input" && "_prefault" in result.schema)
        (_a = result.schema).default ?? (_a.default = result.schema._prefault);
    delete result.schema._prefault;
    // pulling fresh from ctx.seen in case it was overwritten
    const _result = ctx.seen.get(schema);
    return _result.schema;
}
function extractDefs(ctx, schema
// params: EmitParams
) {
    // iterate over seen map;
    const root = ctx.seen.get(schema);
    if (!root)
        throw new Error("Unprocessed schema. This is a bug in Zod.");
    // Track ids to detect duplicates across different schemas
    const idToSchema = new Map();
    for (const entry of ctx.seen.entries()) {
        const id = ctx.metadataRegistry.get(entry[0])?.id;
        if (id) {
            const existing = idToSchema.get(id);
            if (existing && existing !== entry[0]) {
                throw new Error(`Duplicate schema id "${id}" detected during JSON Schema conversion. Two different schemas cannot share the same id when converted together.`);
            }
            idToSchema.set(id, entry[0]);
        }
    }
    // returns a ref to the schema
    // defId will be empty if the ref points to an external schema (or #)
    const makeURI = (entry) => {
        // comparing the seen objects because sometimes
        // multiple schemas map to the same seen object.
        // e.g. lazy
        // external is configured
        const defsSegment = ctx.target === "draft-2020-12" ? "$defs" : "definitions";
        if (ctx.external) {
            const externalId = ctx.external.registry.get(entry[0])?.id; // ?? "__shared";// `__schema${ctx.counter++}`;
            // check if schema is in the external registry
            const uriGenerator = ctx.external.uri ?? ((id) => id);
            if (externalId) {
                return { ref: uriGenerator(externalId) };
            }
            // otherwise, add to __shared
            const id = entry[1].defId ?? entry[1].schema.id ?? `schema${ctx.counter++}`;
            entry[1].defId = id; // set defId so it will be reused if needed
            return { defId: id, ref: `${uriGenerator("__shared")}#/${defsSegment}/${id}` };
        }
        if (entry[1] === root) {
            return { ref: "#" };
        }
        // self-contained schema
        const uriPrefix = `#`;
        const defUriPrefix = `${uriPrefix}/${defsSegment}/`;
        const defId = entry[1].schema.id ?? `__schema${ctx.counter++}`;
        return { defId, ref: defUriPrefix + defId };
    };
    // stored cached version in `def` property
    // remove all properties, set $ref
    const extractToDef = (entry) => {
        // if the schema is already a reference, do not extract it
        if (entry[1].schema.$ref) {
            return;
        }
        const seen = entry[1];
        const { ref, defId } = makeURI(entry);
        seen.def = { ...seen.schema };
        // defId won't be set if the schema is a reference to an external schema
        // or if the schema is the root schema
        if (defId)
            seen.defId = defId;
        // wipe away all properties except $ref
        const schema = seen.schema;
        for (const key in schema) {
            delete schema[key];
        }
        schema.$ref = ref;
    };
    // throw on cycles
    // break cycles
    if (ctx.cycles === "throw") {
        for (const entry of ctx.seen.entries()) {
            const seen = entry[1];
            if (seen.cycle) {
                throw new Error("Cycle detected: " +
                    `#/${seen.cycle?.join("/")}/<root>` +
                    '\n\nSet the `cycles` parameter to `"ref"` to resolve cyclical schemas with defs.');
            }
        }
    }
    // extract schemas into $defs
    for (const entry of ctx.seen.entries()) {
        const seen = entry[1];
        // convert root schema to # $ref
        if (schema === entry[0]) {
            extractToDef(entry); // this has special handling for the root schema
            continue;
        }
        // extract schemas that are in the external registry
        if (ctx.external) {
            const ext = ctx.external.registry.get(entry[0])?.id;
            if (schema !== entry[0] && ext) {
                extractToDef(entry);
                continue;
            }
        }
        // extract schemas with `id` meta
        const id = ctx.metadataRegistry.get(entry[0])?.id;
        if (id) {
            extractToDef(entry);
            continue;
        }
        // break cycles
        if (seen.cycle) {
            // any
            extractToDef(entry);
            continue;
        }
        // extract reused schemas
        if (seen.count > 1) {
            if (ctx.reused === "ref") {
                extractToDef(entry);
                // biome-ignore lint:
                continue;
            }
        }
    }
}
function finalize(ctx, schema) {
    const root = ctx.seen.get(schema);
    if (!root)
        throw new Error("Unprocessed schema. This is a bug in Zod.");
    // flatten refs - inherit properties from parent schemas
    const flattenRef = (zodSchema) => {
        const seen = ctx.seen.get(zodSchema);
        // already processed
        if (seen.ref === null)
            return;
        const schema = seen.def ?? seen.schema;
        const _cached = { ...schema };
        const ref = seen.ref;
        seen.ref = null; // prevent infinite recursion
        if (ref) {
            flattenRef(ref);
            const refSeen = ctx.seen.get(ref);
            const refSchema = refSeen.schema;
            // merge referenced schema into current
            if (refSchema.$ref && (ctx.target === "draft-07" || ctx.target === "draft-04" || ctx.target === "openapi-3.0")) {
                // older drafts can't combine $ref with other properties
                schema.allOf = schema.allOf ?? [];
                schema.allOf.push(refSchema);
            }
            else {
                Object.assign(schema, refSchema);
            }
            // restore child's own properties (child wins)
            Object.assign(schema, _cached);
            const isParentRef = zodSchema._zod.parent === ref;
            // For parent chain, child is a refinement - remove parent-only properties
            if (isParentRef) {
                for (const key in schema) {
                    if (key === "$ref" || key === "allOf")
                        continue;
                    if (!(key in _cached)) {
                        delete schema[key];
                    }
                }
            }
            // When ref was extracted to $defs, remove properties that match the definition
            if (refSchema.$ref && refSeen.def) {
                for (const key in schema) {
                    if (key === "$ref" || key === "allOf")
                        continue;
                    if (key in refSeen.def && JSON.stringify(schema[key]) === JSON.stringify(refSeen.def[key])) {
                        delete schema[key];
                    }
                }
            }
        }
        // If parent was extracted (has $ref), propagate $ref to this schema
        // This handles cases like: readonly().meta({id}).describe()
        // where processor sets ref to innerType but parent should be referenced
        const parent = zodSchema._zod.parent;
        if (parent && parent !== ref) {
            // Ensure parent is processed first so its def has inherited properties
            flattenRef(parent);
            const parentSeen = ctx.seen.get(parent);
            if (parentSeen?.schema.$ref) {
                schema.$ref = parentSeen.schema.$ref;
                // De-duplicate with parent's definition
                if (parentSeen.def) {
                    for (const key in schema) {
                        if (key === "$ref" || key === "allOf")
                            continue;
                        if (key in parentSeen.def && JSON.stringify(schema[key]) === JSON.stringify(parentSeen.def[key])) {
                            delete schema[key];
                        }
                    }
                }
            }
        }
        // execute overrides
        ctx.override({
            zodSchema: zodSchema,
            jsonSchema: schema,
            path: seen.path ?? [],
        });
    };
    for (const entry of [...ctx.seen.entries()].reverse()) {
        flattenRef(entry[0]);
    }
    const result = {};
    if (ctx.target === "draft-2020-12") {
        result.$schema = "https://json-schema.org/draft/2020-12/schema";
    }
    else if (ctx.target === "draft-07") {
        result.$schema = "http://json-schema.org/draft-07/schema#";
    }
    else if (ctx.target === "draft-04") {
        result.$schema = "http://json-schema.org/draft-04/schema#";
    }
    else if (ctx.target === "openapi-3.0") ;
    else ;
    if (ctx.external?.uri) {
        const id = ctx.external.registry.get(schema)?.id;
        if (!id)
            throw new Error("Schema is missing an `id` property");
        result.$id = ctx.external.uri(id);
    }
    Object.assign(result, root.def ?? root.schema);
    // The `id` in `.meta()` is a Zod-specific registration tag used to extract
    // schemas into $defs — it is not user-facing JSON Schema metadata. Strip it
    // from the output body where it would otherwise leak. The id is preserved
    // implicitly via the $defs key (and via $ref paths).
    const rootMetaId = ctx.metadataRegistry.get(schema)?.id;
    if (rootMetaId !== undefined && result.id === rootMetaId)
        delete result.id;
    // build defs object
    const defs = ctx.external?.defs ?? {};
    for (const entry of ctx.seen.entries()) {
        const seen = entry[1];
        if (seen.def && seen.defId) {
            if (seen.def.id === seen.defId)
                delete seen.def.id;
            defs[seen.defId] = seen.def;
        }
    }
    // set definitions in result
    if (ctx.external) ;
    else {
        if (Object.keys(defs).length > 0) {
            if (ctx.target === "draft-2020-12") {
                result.$defs = defs;
            }
            else {
                result.definitions = defs;
            }
        }
    }
    try {
        // this "finalizes" this schema and ensures all cycles are removed
        // each call to finalize() is functionally independent
        // though the seen map is shared
        const finalized = JSON.parse(JSON.stringify(result));
        Object.defineProperty(finalized, "~standard", {
            value: {
                ...schema["~standard"],
                jsonSchema: {
                    input: createStandardJSONSchemaMethod(schema, "input", ctx.processors),
                    output: createStandardJSONSchemaMethod(schema, "output", ctx.processors),
                },
            },
            enumerable: false,
            writable: false,
        });
        return finalized;
    }
    catch (_err) {
        throw new Error("Error converting schema to JSON.");
    }
}
function isTransforming(_schema, _ctx) {
    const ctx = _ctx ?? { seen: new Set() };
    if (ctx.seen.has(_schema))
        return false;
    ctx.seen.add(_schema);
    const def = _schema._zod.def;
    if (def.type === "transform")
        return true;
    if (def.type === "array")
        return isTransforming(def.element, ctx);
    if (def.type === "set")
        return isTransforming(def.valueType, ctx);
    if (def.type === "lazy")
        return isTransforming(def.getter(), ctx);
    if (def.type === "promise" ||
        def.type === "optional" ||
        def.type === "nonoptional" ||
        def.type === "nullable" ||
        def.type === "readonly" ||
        def.type === "default" ||
        def.type === "prefault") {
        return isTransforming(def.innerType, ctx);
    }
    if (def.type === "intersection") {
        return isTransforming(def.left, ctx) || isTransforming(def.right, ctx);
    }
    if (def.type === "record" || def.type === "map") {
        return isTransforming(def.keyType, ctx) || isTransforming(def.valueType, ctx);
    }
    if (def.type === "pipe") {
        if (_schema._zod.traits.has("$ZodCodec"))
            return true;
        return isTransforming(def.in, ctx) || isTransforming(def.out, ctx);
    }
    if (def.type === "object") {
        for (const key in def.shape) {
            if (isTransforming(def.shape[key], ctx))
                return true;
        }
        return false;
    }
    if (def.type === "union") {
        for (const option of def.options) {
            if (isTransforming(option, ctx))
                return true;
        }
        return false;
    }
    if (def.type === "tuple") {
        for (const item of def.items) {
            if (isTransforming(item, ctx))
                return true;
        }
        if (def.rest && isTransforming(def.rest, ctx))
            return true;
        return false;
    }
    return false;
}
/**
 * Creates a toJSONSchema method for a schema instance.
 * This encapsulates the logic of initializing context, processing, extracting defs, and finalizing.
 */
const createToJSONSchemaMethod = (schema, processors = {}) => (params) => {
    const ctx = initializeContext({ ...params, processors });
    process$1(schema, ctx);
    extractDefs(ctx, schema);
    return finalize(ctx, schema);
};
const createStandardJSONSchemaMethod = (schema, io, processors = {}) => (params) => {
    const { libraryOptions, target } = params ?? {};
    const ctx = initializeContext({ ...(libraryOptions ?? {}), target, io, processors });
    process$1(schema, ctx);
    extractDefs(ctx, schema);
    return finalize(ctx, schema);
};

const enumProcessor = (schema, _ctx, json, _params) => {
    const def = schema._zod.def;
    const values = getEnumValues(def.entries);
    // Number enums can have both string and number values
    if (values.every((v) => typeof v === "number"))
        json.type = "number";
    if (values.every((v) => typeof v === "string"))
        json.type = "string";
    json.enum = values;
};
const customProcessor = (_schema, ctx, _json, _params) => {
    if (ctx.unrepresentable === "throw") {
        throw new Error("Custom types cannot be represented in JSON Schema");
    }
};
const transformProcessor = (_schema, ctx, _json, _params) => {
    if (ctx.unrepresentable === "throw") {
        throw new Error("Transforms cannot be represented in JSON Schema");
    }
};
// ==================== COMPOSITE TYPE PROCESSORS ====================
const arrayProcessor = (schema, ctx, _json, params) => {
    const json = _json;
    const def = schema._zod.def;
    const { minimum, maximum } = schema._zod.bag;
    if (typeof minimum === "number")
        json.minItems = minimum;
    if (typeof maximum === "number")
        json.maxItems = maximum;
    json.type = "array";
    json.items = process$1(def.element, ctx, {
        ...params,
        path: [...params.path, "items"],
    });
};
const unionProcessor = (schema, ctx, json, params) => {
    const def = schema._zod.def;
    // Exclusive unions (inclusive === false) use oneOf (exactly one match) instead of anyOf (one or more matches)
    // This includes both z.xor() and discriminated unions
    const isExclusive = def.inclusive === false;
    const options = def.options.map((x, i) => process$1(x, ctx, {
        ...params,
        path: [...params.path, isExclusive ? "oneOf" : "anyOf", i],
    }));
    if (isExclusive) {
        json.oneOf = options;
    }
    else {
        json.anyOf = options;
    }
};
const intersectionProcessor = (schema, ctx, json, params) => {
    const def = schema._zod.def;
    const a = process$1(def.left, ctx, {
        ...params,
        path: [...params.path, "allOf", 0],
    });
    const b = process$1(def.right, ctx, {
        ...params,
        path: [...params.path, "allOf", 1],
    });
    const isSimpleIntersection = (val) => "allOf" in val && Object.keys(val).length === 1;
    const allOf = [
        ...(isSimpleIntersection(a) ? a.allOf : [a]),
        ...(isSimpleIntersection(b) ? b.allOf : [b]),
    ];
    json.allOf = allOf;
};
const nullableProcessor = (schema, ctx, json, params) => {
    const def = schema._zod.def;
    const inner = process$1(def.innerType, ctx, params);
    const seen = ctx.seen.get(schema);
    if (ctx.target === "openapi-3.0") {
        seen.ref = def.innerType;
        json.nullable = true;
    }
    else {
        json.anyOf = [inner, { type: "null" }];
    }
};
const nonoptionalProcessor = (schema, ctx, _json, params) => {
    const def = schema._zod.def;
    process$1(def.innerType, ctx, params);
    const seen = ctx.seen.get(schema);
    seen.ref = def.innerType;
};
const defaultProcessor = (schema, ctx, json, params) => {
    const def = schema._zod.def;
    process$1(def.innerType, ctx, params);
    const seen = ctx.seen.get(schema);
    seen.ref = def.innerType;
    json.default = JSON.parse(JSON.stringify(def.defaultValue));
};
const prefaultProcessor = (schema, ctx, json, params) => {
    const def = schema._zod.def;
    process$1(def.innerType, ctx, params);
    const seen = ctx.seen.get(schema);
    seen.ref = def.innerType;
    if (ctx.io === "input")
        json._prefault = JSON.parse(JSON.stringify(def.defaultValue));
};
const catchProcessor = (schema, ctx, json, params) => {
    const def = schema._zod.def;
    process$1(def.innerType, ctx, params);
    const seen = ctx.seen.get(schema);
    seen.ref = def.innerType;
    let catchValue;
    try {
        catchValue = def.catchValue(undefined);
    }
    catch {
        throw new Error("Dynamic catch values are not supported in JSON Schema");
    }
    json.default = catchValue;
};
const pipeProcessor = (schema, ctx, _json, params) => {
    const def = schema._zod.def;
    const inIsTransform = def.in._zod.traits.has("$ZodTransform");
    const innerType = ctx.io === "input" ? (inIsTransform ? def.out : def.in) : def.out;
    process$1(innerType, ctx, params);
    const seen = ctx.seen.get(schema);
    seen.ref = innerType;
};
const readonlyProcessor = (schema, ctx, json, params) => {
    const def = schema._zod.def;
    process$1(def.innerType, ctx, params);
    const seen = ctx.seen.get(schema);
    seen.ref = def.innerType;
    json.readOnly = true;
};
const optionalProcessor = (schema, ctx, _json, params) => {
    const def = schema._zod.def;
    process$1(def.innerType, ctx, params);
    const seen = ctx.seen.get(schema);
    seen.ref = def.innerType;
};

const NOOP_MIDDLEWARE_FN = async (_ctx, next) => {
  const response = await next();
  response.headers.set(NOOP_MIDDLEWARE_HEADER, "true");
  return response;
};

/**
 * Copyright (C) 2017-present by Andrea Giammarchi - @WebReflection
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

const {replace} = '';
const ca = /[&<>'"]/g;

const esca = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  "'": '&#39;',
  '"': '&quot;'
};
const pe = m => esca[m];

/**
 * Safely escape HTML entities such as `&`, `<`, `>`, `"`, and `'`.
 * @param {string} es the input to safely escape
 * @returns {string} the escaped input, and it **throws** an error if
 *  the input type is unexpected, except for boolean and numbers,
 *  converted as string.
 */
const escape = es => replace.call(es, ca, pe);

function isPromise(value) {
  return !!value && typeof value === "object" && "then" in value && typeof value.then === "function";
}
async function* streamAsyncIterator(stream) {
  const reader = stream.getReader();
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) return;
      yield value;
    }
  } finally {
    reader.releaseLock();
  }
}

const escapeHTML = escape;
class HTMLBytes extends Uint8Array {
}
Object.defineProperty(HTMLBytes.prototype, Symbol.toStringTag, {
  get() {
    return "HTMLBytes";
  }
});
const htmlStringSymbol = /* @__PURE__ */ Symbol.for("astro:html-string");
class HTMLString extends String {
  [htmlStringSymbol] = true;
}
const markHTMLString = (value) => {
  if (isHTMLString(value)) {
    return value;
  }
  if (typeof value === "string") {
    return new HTMLString(value);
  }
  return value;
};
function isHTMLString(value) {
  return !!value?.[htmlStringSymbol];
}
function markHTMLBytes(bytes) {
  return new HTMLBytes(bytes);
}
function hasGetReader(obj) {
  return typeof obj.getReader === "function";
}
async function* unescapeChunksAsync(iterable) {
  if (hasGetReader(iterable)) {
    for await (const chunk of streamAsyncIterator(iterable)) {
      yield unescapeHTML(chunk);
    }
  } else {
    for await (const chunk of iterable) {
      yield unescapeHTML(chunk);
    }
  }
}
function* unescapeChunks(iterable) {
  for (const chunk of iterable) {
    yield unescapeHTML(chunk);
  }
}
function unescapeHTML(str) {
  if (!!str && typeof str === "object") {
    if (str instanceof Uint8Array) {
      return markHTMLBytes(str);
    } else if (str instanceof Response && str.body) {
      const body = str.body;
      return unescapeChunksAsync(body);
    } else if (typeof str.then === "function") {
      return Promise.resolve(str).then((value) => {
        return unescapeHTML(value);
      });
    } else if (str[/* @__PURE__ */ Symbol.for("astro:slot-string")]) {
      return str;
    } else if (Symbol.iterator in str) {
      return unescapeChunks(str);
    } else if (Symbol.asyncIterator in str || hasGetReader(str)) {
      return unescapeChunksAsync(str);
    }
  }
  return markHTMLString(str);
}

function r(e){var t,f,n="";if("string"==typeof e||"number"==typeof e)n+=e;else if("object"==typeof e)if(Array.isArray(e)){var o=e.length;for(t=0;t<o;t++)e[t]&&(f=r(e[t]))&&(n&&(n+=" "),n+=f);}else for(f in e)e[f]&&(n&&(n+=" "),n+=f);return n}function clsx(){for(var e,t,f=0,n="",o=arguments.length;f<o;f++)(e=arguments[f])&&(t=r(e))&&(n&&(n+=" "),n+=t);return n}

const htmlBooleanAttributes = /^(?:allowfullscreen|async|autofocus|autoplay|checked|controls|default|defer|disabled|disablepictureinpicture|disableremoteplayback|formnovalidate|inert|loop|muted|nomodule|novalidate|open|playsinline|readonly|required|reversed|scoped|seamless|selected|itemscope)$/i;
const AMPERSAND_REGEX = /&/g;
const DOUBLE_QUOTE_REGEX = /"/g;
const STATIC_DIRECTIVES = /* @__PURE__ */ new Set(["set:html", "set:text"]);
const INVALID_ATTR_NAME_CHAR = /[\s"'>/=]/;
const toAttributeString = (value, shouldEscape = true) => shouldEscape ? String(value).replace(AMPERSAND_REGEX, "&amp;").replace(DOUBLE_QUOTE_REGEX, "&quot;") : value;
const kebab = (k) => k.toLowerCase() === k ? k : k.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
const toStyleString = (obj) => Object.entries(obj).filter(([_, v]) => typeof v === "string" && v.trim() || typeof v === "number").map(([k, v]) => {
  if (k[0] !== "-" && k[1] !== "-") return `${kebab(k)}:${v}`;
  return `${k}:${v}`;
}).join(";");
function isCustomElement(tagName) {
  return tagName.includes("-");
}
function handleBooleanAttribute(key, value, shouldEscape, tagName) {
  if (tagName && isCustomElement(tagName)) {
    return markHTMLString(` ${key}="${toAttributeString(value, shouldEscape)}"`);
  }
  return markHTMLString(value ? ` ${key}` : "");
}
function addAttribute(value, key, shouldEscape = true, tagName = "") {
  if (value == null) {
    return "";
  }
  if (INVALID_ATTR_NAME_CHAR.test(key)) {
    return "";
  }
  if (STATIC_DIRECTIVES.has(key)) {
    console.warn(`[astro] The "${key}" directive cannot be applied dynamically at runtime. It will not be rendered as an attribute.

Make sure to use the static attribute syntax (\`${key}={value}\`) instead of the dynamic spread syntax (\`{...{ "${key}": value }}\`).`);
    return "";
  }
  if (key === "class:list") {
    const listValue = toAttributeString(clsx(value), shouldEscape);
    if (listValue === "") {
      return "";
    }
    return markHTMLString(` ${key.slice(0, -5)}="${listValue}"`);
  }
  if (key === "style" && !(value instanceof HTMLString)) {
    if (Array.isArray(value) && value.length === 2) {
      return markHTMLString(
        ` ${key}="${toAttributeString(`${toStyleString(value[0])};${value[1]}`, shouldEscape)}"`
      );
    }
    if (typeof value === "object") {
      return markHTMLString(` ${key}="${toAttributeString(toStyleString(value), shouldEscape)}"`);
    }
  }
  if (key === "className") {
    return markHTMLString(` class="${toAttributeString(value, shouldEscape)}"`);
  }
  if (htmlBooleanAttributes.test(key)) {
    return handleBooleanAttribute(key, value, shouldEscape, tagName);
  }
  if (value === "") {
    return markHTMLString(` ${key}`);
  }
  if (key === "popover" && typeof value === "boolean") {
    return handleBooleanAttribute(key, value, shouldEscape, tagName);
  }
  if (key === "download" && typeof value === "boolean") {
    return handleBooleanAttribute(key, value, shouldEscape, tagName);
  }
  if (key === "hidden" && typeof value === "boolean") {
    return handleBooleanAttribute(key, value, shouldEscape, tagName);
  }
  return markHTMLString(` ${key}="${toAttributeString(value, shouldEscape)}"`);
}
const noop = () => {
};
class BufferedRenderer {
  chunks = [];
  renderPromise;
  destination;
  /**
   * Determines whether buffer has been flushed
   * to the final destination.
   */
  flushed = false;
  constructor(destination, renderFunction) {
    this.destination = destination;
    this.renderPromise = renderFunction(this);
    if (isPromise(this.renderPromise)) {
      Promise.resolve(this.renderPromise).catch(noop);
    }
  }
  write(chunk) {
    if (this.flushed) {
      this.destination.write(chunk);
    } else {
      this.chunks.push(chunk);
    }
  }
  flush() {
    if (this.flushed) {
      throw new Error("The render buffer has already been flushed.");
    }
    this.flushed = true;
    for (const chunk of this.chunks) {
      this.destination.write(chunk);
    }
    return this.renderPromise;
  }
}
function createBufferedRenderer(destination, renderFunction) {
  return new BufferedRenderer(destination, renderFunction);
}
typeof process !== "undefined" && Object.prototype.toString.call(process) === "[object process]";

var EncodingPadding$1;
(function (EncodingPadding) {
    EncodingPadding[EncodingPadding["Include"] = 0] = "Include";
    EncodingPadding[EncodingPadding["None"] = 1] = "None";
})(EncodingPadding$1 || (EncodingPadding$1 = {}));
var DecodingPadding$1;
(function (DecodingPadding) {
    DecodingPadding[DecodingPadding["Required"] = 0] = "Required";
    DecodingPadding[DecodingPadding["Ignore"] = 1] = "Ignore";
})(DecodingPadding$1 || (DecodingPadding$1 = {}));

function decodeBase64(encoded) {
    return decodeBase64_internal(encoded, base64DecodeMap, DecodingPadding.Required);
}
function decodeBase64_internal(encoded, decodeMap, padding) {
    const result = new Uint8Array(Math.ceil(encoded.length / 4) * 3);
    let totalBytes = 0;
    for (let i = 0; i < encoded.length; i += 4) {
        let chunk = 0;
        let bitsRead = 0;
        for (let j = 0; j < 4; j++) {
            if (padding === DecodingPadding.Required && encoded[i + j] === "=") {
                continue;
            }
            if (padding === DecodingPadding.Ignore &&
                (i + j >= encoded.length || encoded[i + j] === "=")) {
                continue;
            }
            if (j > 0 && encoded[i + j - 1] === "=") {
                throw new Error("Invalid padding");
            }
            if (!(encoded[i + j] in decodeMap)) {
                throw new Error("Invalid character");
            }
            chunk |= decodeMap[encoded[i + j]] << ((3 - j) * 6);
            bitsRead += 6;
        }
        if (bitsRead < 24) {
            let unused;
            if (bitsRead === 12) {
                unused = chunk & 0xffff;
            }
            else if (bitsRead === 18) {
                unused = chunk & 0xff;
            }
            else {
                throw new Error("Invalid padding");
            }
            if (unused !== 0) {
                throw new Error("Invalid padding");
            }
        }
        const byteLength = Math.floor(bitsRead / 8);
        for (let i = 0; i < byteLength; i++) {
            result[totalBytes] = (chunk >> (16 - i * 8)) & 0xff;
            totalBytes++;
        }
    }
    return result.slice(0, totalBytes);
}
var EncodingPadding;
(function (EncodingPadding) {
    EncodingPadding[EncodingPadding["Include"] = 0] = "Include";
    EncodingPadding[EncodingPadding["None"] = 1] = "None";
})(EncodingPadding || (EncodingPadding = {}));
var DecodingPadding;
(function (DecodingPadding) {
    DecodingPadding[DecodingPadding["Required"] = 0] = "Required";
    DecodingPadding[DecodingPadding["Ignore"] = 1] = "Ignore";
})(DecodingPadding || (DecodingPadding = {}));
const base64DecodeMap = {
    "0": 52,
    "1": 53,
    "2": 54,
    "3": 55,
    "4": 56,
    "5": 57,
    "6": 58,
    "7": 59,
    "8": 60,
    "9": 61,
    A: 0,
    B: 1,
    C: 2,
    D: 3,
    E: 4,
    F: 5,
    G: 6,
    H: 7,
    I: 8,
    J: 9,
    K: 10,
    L: 11,
    M: 12,
    N: 13,
    O: 14,
    P: 15,
    Q: 16,
    R: 17,
    S: 18,
    T: 19,
    U: 20,
    V: 21,
    W: 22,
    X: 23,
    Y: 24,
    Z: 25,
    a: 26,
    b: 27,
    c: 28,
    d: 29,
    e: 30,
    f: 31,
    g: 32,
    h: 33,
    i: 34,
    j: 35,
    k: 36,
    l: 37,
    m: 38,
    n: 39,
    o: 40,
    p: 41,
    q: 42,
    r: 43,
    s: 44,
    t: 45,
    u: 46,
    v: 47,
    w: 48,
    x: 49,
    y: 50,
    z: 51,
    "+": 62,
    "/": 63
};

const initializer = (inst, issues) => {
    $ZodError.init(inst, issues);
    inst.name = "ZodError";
    Object.defineProperties(inst, {
        format: {
            value: (mapper) => formatError(inst, mapper),
            // enumerable: false,
        },
        flatten: {
            value: (mapper) => flattenError(inst, mapper),
            // enumerable: false,
        },
        addIssue: {
            value: (issue) => {
                inst.issues.push(issue);
                inst.message = JSON.stringify(inst.issues, jsonStringifyReplacer, 2);
            },
            // enumerable: false,
        },
        addIssues: {
            value: (issues) => {
                inst.issues.push(...issues);
                inst.message = JSON.stringify(inst.issues, jsonStringifyReplacer, 2);
            },
            // enumerable: false,
        },
        isEmpty: {
            get() {
                return inst.issues.length === 0;
            },
            // enumerable: false,
        },
    });
    // Object.defineProperty(inst, "isEmpty", {
    //   get() {
    //     return inst.issues.length === 0;
    //   },
    // });
};
const ZodRealError = /*@__PURE__*/ $constructor("ZodError", initializer, {
    Parent: Error,
});
// /** @deprecated Use `z.core.$ZodErrorMapCtx` instead. */
// export type ErrorMapCtx = core.$ZodErrorMapCtx;

const parse = /* @__PURE__ */ _parse(ZodRealError);
const parseAsync = /* @__PURE__ */ _parseAsync(ZodRealError);
const safeParse = /* @__PURE__ */ _safeParse(ZodRealError);
const safeParseAsync = /* @__PURE__ */ _safeParseAsync(ZodRealError);
// Codec functions
const encode = /* @__PURE__ */ _encode(ZodRealError);
const decode = /* @__PURE__ */ _decode(ZodRealError);
const encodeAsync = /* @__PURE__ */ _encodeAsync(ZodRealError);
const decodeAsync = /* @__PURE__ */ _decodeAsync(ZodRealError);
const safeEncode = /* @__PURE__ */ _safeEncode(ZodRealError);
const safeDecode = /* @__PURE__ */ _safeDecode(ZodRealError);
const safeEncodeAsync = /* @__PURE__ */ _safeEncodeAsync(ZodRealError);
const safeDecodeAsync = /* @__PURE__ */ _safeDecodeAsync(ZodRealError);

// Lazy-bind builder methods.
//
// Builder methods (`.optional`, `.array`, `.refine`, ...) live as
// non-enumerable getters on each concrete schema constructor's
// prototype. On first access from an instance the getter allocates
// `fn.bind(this)` and caches it as an own property on that instance,
// so detached usage (`const m = schema.optional; m()`) still works
// and the per-instance allocation only happens for methods actually
// touched.
//
// One install per (prototype, group), memoized by `_installedGroups`.
const _installedGroups = /* @__PURE__ */ new WeakMap();
function _installLazyMethods(inst, group, methods) {
    const proto = Object.getPrototypeOf(inst);
    let installed = _installedGroups.get(proto);
    if (!installed) {
        installed = new Set();
        _installedGroups.set(proto, installed);
    }
    if (installed.has(group))
        return;
    installed.add(group);
    for (const key in methods) {
        const fn = methods[key];
        Object.defineProperty(proto, key, {
            configurable: true,
            enumerable: false,
            get() {
                const bound = fn.bind(this);
                Object.defineProperty(this, key, {
                    configurable: true,
                    writable: true,
                    enumerable: true,
                    value: bound,
                });
                return bound;
            },
            set(v) {
                Object.defineProperty(this, key, {
                    configurable: true,
                    writable: true,
                    enumerable: true,
                    value: v,
                });
            },
        });
    }
}
const ZodType = /*@__PURE__*/ $constructor("ZodType", (inst, def) => {
    $ZodType.init(inst, def);
    Object.assign(inst["~standard"], {
        jsonSchema: {
            input: createStandardJSONSchemaMethod(inst, "input"),
            output: createStandardJSONSchemaMethod(inst, "output"),
        },
    });
    inst.toJSONSchema = createToJSONSchemaMethod(inst, {});
    inst.def = def;
    inst.type = def.type;
    Object.defineProperty(inst, "_def", { value: def });
    // Parse-family is intentionally kept as per-instance closures: these are
    // the hot path AND the most-detached methods (`arr.map(schema.parse)`,
    // `const { parse } = schema`, etc.). Eager closures here mean callers pay
    // ~12 closure allocations per schema but get monomorphic call sites and
    // detached usage that "just works".
    inst.parse = (data, params) => parse(inst, data, params, { callee: inst.parse });
    inst.safeParse = (data, params) => safeParse(inst, data, params);
    inst.parseAsync = async (data, params) => parseAsync(inst, data, params, { callee: inst.parseAsync });
    inst.safeParseAsync = async (data, params) => safeParseAsync(inst, data, params);
    inst.spa = inst.safeParseAsync;
    inst.encode = (data, params) => encode(inst, data, params);
    inst.decode = (data, params) => decode(inst, data, params);
    inst.encodeAsync = async (data, params) => encodeAsync(inst, data, params);
    inst.decodeAsync = async (data, params) => decodeAsync(inst, data, params);
    inst.safeEncode = (data, params) => safeEncode(inst, data, params);
    inst.safeDecode = (data, params) => safeDecode(inst, data, params);
    inst.safeEncodeAsync = async (data, params) => safeEncodeAsync(inst, data, params);
    inst.safeDecodeAsync = async (data, params) => safeDecodeAsync(inst, data, params);
    // All builder methods are placed on the internal prototype as lazy-bind
    // getters. On first access per-instance, a bound thunk is allocated and
    // cached as an own property; subsequent accesses skip the getter. This
    // means: no per-instance allocation for unused methods, full
    // detachability preserved (`const m = schema.optional; m()` works), and
    // shared underlying function references across all instances.
    _installLazyMethods(inst, "ZodType", {
        check(...chks) {
            const def = this.def;
            return this.clone(mergeDefs(def, {
                checks: [
                    ...(def.checks ?? []),
                    ...chks.map((ch) => typeof ch === "function" ? { _zod: { check: ch, def: { check: "custom" }, onattach: [] } } : ch),
                ],
            }), { parent: true });
        },
        with(...chks) {
            return this.check(...chks);
        },
        clone(def, params) {
            return clone(this, def, params);
        },
        brand() {
            return this;
        },
        register(reg, meta) {
            reg.add(this, meta);
            return this;
        },
        refine(check, params) {
            return this.check(refine(check, params));
        },
        superRefine(refinement, params) {
            return this.check(superRefine(refinement, params));
        },
        overwrite(fn) {
            return this.check(_overwrite(fn));
        },
        optional() {
            return optional(this);
        },
        exactOptional() {
            return exactOptional(this);
        },
        nullable() {
            return nullable(this);
        },
        nullish() {
            return optional(nullable(this));
        },
        nonoptional(params) {
            return nonoptional(this, params);
        },
        array() {
            return array(this);
        },
        or(arg) {
            return union([this, arg]);
        },
        and(arg) {
            return intersection(this, arg);
        },
        transform(tx) {
            return pipe(this, transform(tx));
        },
        default(d) {
            return _default(this, d);
        },
        prefault(d) {
            return prefault(this, d);
        },
        catch(params) {
            return _catch(this, params);
        },
        pipe(target) {
            return pipe(this, target);
        },
        readonly() {
            return readonly(this);
        },
        describe(description) {
            const cl = this.clone();
            globalRegistry.add(cl, { description });
            return cl;
        },
        meta(...args) {
            // overloaded: meta() returns the registered metadata, meta(data)
            // returns a clone with `data` registered. The mapped type picks
            // up the second overload, so we accept variadic any-args and
            // return `any` to satisfy both at runtime.
            if (args.length === 0)
                return globalRegistry.get(this);
            const cl = this.clone();
            globalRegistry.add(cl, args[0]);
            return cl;
        },
        isOptional() {
            return this.safeParse(undefined).success;
        },
        isNullable() {
            return this.safeParse(null).success;
        },
        apply(fn) {
            return fn(this);
        },
    });
    Object.defineProperty(inst, "description", {
        get() {
            return globalRegistry.get(inst)?.description;
        },
        configurable: true,
    });
    return inst;
});
const ZodArray = /*@__PURE__*/ $constructor("ZodArray", (inst, def) => {
    $ZodArray.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => arrayProcessor(inst, ctx, json, params);
    inst.element = def.element;
    _installLazyMethods(inst, "ZodArray", {
        min(n, params) {
            return this.check(_minLength(n, params));
        },
        nonempty(params) {
            return this.check(_minLength(1, params));
        },
        max(n, params) {
            return this.check(_maxLength(n, params));
        },
        length(n, params) {
            return this.check(_length(n, params));
        },
        unwrap() {
            return this.element;
        },
    });
});
function array(element, params) {
    return _array(ZodArray, element, params);
}
const ZodUnion = /*@__PURE__*/ $constructor("ZodUnion", (inst, def) => {
    $ZodUnion.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => unionProcessor(inst, ctx, json, params);
    inst.options = def.options;
});
function union(options, params) {
    return new ZodUnion({
        type: "union",
        options: options,
        ...normalizeParams(params),
    });
}
const ZodIntersection = /*@__PURE__*/ $constructor("ZodIntersection", (inst, def) => {
    $ZodIntersection.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => intersectionProcessor(inst, ctx, json, params);
});
function intersection(left, right) {
    return new ZodIntersection({
        type: "intersection",
        left: left,
        right: right,
    });
}
const ZodEnum = /*@__PURE__*/ $constructor("ZodEnum", (inst, def) => {
    $ZodEnum.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => enumProcessor(inst, ctx, json);
    inst.enum = def.entries;
    inst.options = Object.values(def.entries);
    const keys = new Set(Object.keys(def.entries));
    inst.extract = (values, params) => {
        const newEntries = {};
        for (const value of values) {
            if (keys.has(value)) {
                newEntries[value] = def.entries[value];
            }
            else
                throw new Error(`Key ${value} not found in enum`);
        }
        return new ZodEnum({
            ...def,
            checks: [],
            ...normalizeParams(params),
            entries: newEntries,
        });
    };
    inst.exclude = (values, params) => {
        const newEntries = { ...def.entries };
        for (const value of values) {
            if (keys.has(value)) {
                delete newEntries[value];
            }
            else
                throw new Error(`Key ${value} not found in enum`);
        }
        return new ZodEnum({
            ...def,
            checks: [],
            ...normalizeParams(params),
            entries: newEntries,
        });
    };
});
function _enum(values, params) {
    const entries = Array.isArray(values) ? Object.fromEntries(values.map((v) => [v, v])) : values;
    return new ZodEnum({
        type: "enum",
        entries,
        ...normalizeParams(params),
    });
}
const ZodTransform = /*@__PURE__*/ $constructor("ZodTransform", (inst, def) => {
    $ZodTransform.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => transformProcessor(inst, ctx);
    inst._zod.parse = (payload, _ctx) => {
        if (_ctx.direction === "backward") {
            throw new $ZodEncodeError(inst.constructor.name);
        }
        payload.addIssue = (issue$1) => {
            if (typeof issue$1 === "string") {
                payload.issues.push(issue(issue$1, payload.value, def));
            }
            else {
                // for Zod 3 backwards compatibility
                const _issue = issue$1;
                if (_issue.fatal)
                    _issue.continue = false;
                _issue.code ?? (_issue.code = "custom");
                _issue.input ?? (_issue.input = payload.value);
                _issue.inst ?? (_issue.inst = inst);
                // _issue.continue ??= true;
                payload.issues.push(issue(_issue));
            }
        };
        const output = def.transform(payload.value, payload);
        if (output instanceof Promise) {
            return output.then((output) => {
                payload.value = output;
                payload.fallback = true;
                return payload;
            });
        }
        payload.value = output;
        payload.fallback = true;
        return payload;
    };
});
function transform(fn) {
    return new ZodTransform({
        type: "transform",
        transform: fn,
    });
}
const ZodOptional = /*@__PURE__*/ $constructor("ZodOptional", (inst, def) => {
    $ZodOptional.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => optionalProcessor(inst, ctx, json, params);
    inst.unwrap = () => inst._zod.def.innerType;
});
function optional(innerType) {
    return new ZodOptional({
        type: "optional",
        innerType: innerType,
    });
}
const ZodExactOptional = /*@__PURE__*/ $constructor("ZodExactOptional", (inst, def) => {
    $ZodExactOptional.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => optionalProcessor(inst, ctx, json, params);
    inst.unwrap = () => inst._zod.def.innerType;
});
function exactOptional(innerType) {
    return new ZodExactOptional({
        type: "optional",
        innerType: innerType,
    });
}
const ZodNullable = /*@__PURE__*/ $constructor("ZodNullable", (inst, def) => {
    $ZodNullable.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => nullableProcessor(inst, ctx, json, params);
    inst.unwrap = () => inst._zod.def.innerType;
});
function nullable(innerType) {
    return new ZodNullable({
        type: "nullable",
        innerType: innerType,
    });
}
const ZodDefault = /*@__PURE__*/ $constructor("ZodDefault", (inst, def) => {
    $ZodDefault.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => defaultProcessor(inst, ctx, json, params);
    inst.unwrap = () => inst._zod.def.innerType;
    inst.removeDefault = inst.unwrap;
});
function _default(innerType, defaultValue) {
    return new ZodDefault({
        type: "default",
        innerType: innerType,
        get defaultValue() {
            return typeof defaultValue === "function" ? defaultValue() : shallowClone(defaultValue);
        },
    });
}
const ZodPrefault = /*@__PURE__*/ $constructor("ZodPrefault", (inst, def) => {
    $ZodPrefault.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => prefaultProcessor(inst, ctx, json, params);
    inst.unwrap = () => inst._zod.def.innerType;
});
function prefault(innerType, defaultValue) {
    return new ZodPrefault({
        type: "prefault",
        innerType: innerType,
        get defaultValue() {
            return typeof defaultValue === "function" ? defaultValue() : shallowClone(defaultValue);
        },
    });
}
const ZodNonOptional = /*@__PURE__*/ $constructor("ZodNonOptional", (inst, def) => {
    $ZodNonOptional.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => nonoptionalProcessor(inst, ctx, json, params);
    inst.unwrap = () => inst._zod.def.innerType;
});
function nonoptional(innerType, params) {
    return new ZodNonOptional({
        type: "nonoptional",
        innerType: innerType,
        ...normalizeParams(params),
    });
}
const ZodCatch = /*@__PURE__*/ $constructor("ZodCatch", (inst, def) => {
    $ZodCatch.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => catchProcessor(inst, ctx, json, params);
    inst.unwrap = () => inst._zod.def.innerType;
    inst.removeCatch = inst.unwrap;
});
function _catch(innerType, catchValue) {
    return new ZodCatch({
        type: "catch",
        innerType: innerType,
        catchValue: (typeof catchValue === "function" ? catchValue : () => catchValue),
    });
}
const ZodPipe = /*@__PURE__*/ $constructor("ZodPipe", (inst, def) => {
    $ZodPipe.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => pipeProcessor(inst, ctx, json, params);
    inst.in = def.in;
    inst.out = def.out;
});
function pipe(in_, out) {
    return new ZodPipe({
        type: "pipe",
        in: in_,
        out: out,
        // ...util.normalizeParams(params),
    });
}
const ZodReadonly = /*@__PURE__*/ $constructor("ZodReadonly", (inst, def) => {
    $ZodReadonly.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => readonlyProcessor(inst, ctx, json, params);
    inst.unwrap = () => inst._zod.def.innerType;
});
function readonly(innerType) {
    return new ZodReadonly({
        type: "readonly",
        innerType: innerType,
    });
}
const ZodCustom = /*@__PURE__*/ $constructor("ZodCustom", (inst, def) => {
    $ZodCustom.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => customProcessor(inst, ctx);
});
function custom(fn, _params) {
    return _custom(ZodCustom, fn ?? (() => true), _params);
}
function refine(fn, _params = {}) {
    return _refine(ZodCustom, fn, _params);
}
// superRefine
function superRefine(fn, params) {
    return _superRefine(fn, params);
}

// Zod 3 compat layer
/** @deprecated Use the raw string literal codes instead, e.g. "invalid_type". */
const ZodIssueCode = {
    custom: "custom",
};

const ALGORITHMS = {
  "SHA-256": "sha256-",
  "SHA-384": "sha384-",
  "SHA-512": "sha512-"
};
_enum(Object.keys(ALGORITHMS)).optional().default("SHA-256");
const ALLOWED_DIRECTIVES = [
  "base-uri",
  "child-src",
  "connect-src",
  "default-src",
  "fenced-frame-src",
  "font-src",
  "form-action",
  "frame-ancestors",
  "frame-src",
  "img-src",
  "manifest-src",
  "media-src",
  "object-src",
  "referrer",
  "report-to",
  "report-uri",
  "require-trusted-types-for",
  "sandbox",
  "trusted-types",
  "upgrade-insecure-requests",
  "worker-src"
];
custom((v) => typeof v === "string").superRefine((value, ctx) => {
  const isAllowed = ALLOWED_DIRECTIVES.some((allowedValue) => {
    return value.startsWith(allowedValue);
  });
  if (!isAllowed) {
    if (value.startsWith("script-src") || value.startsWith("style-src")) {
      ctx.addIssue({
        code: ZodIssueCode.custom,
        message: `Directives \`script-src\` and \`style-src\` are not allowed in \`security.csp.directives\`. Please use \`security.csp.scriptDirective\` and \`security.csp.styleDirective\` instead.`,
        fatal: true
      });
    } else {
      ctx.addIssue({
        code: ZodIssueCode.custom,
        message: `Invalid directive: "${value}". Allowed directives are: ${ALLOWED_DIRECTIVES.join(", ")}`,
        fatal: true
      });
    }
  }
});

const ALGORITHM = "AES-GCM";
async function decodeKey(encoded) {
  const bytes = decodeBase64(encoded);
  return crypto.subtle.importKey("raw", bytes.buffer, ALGORITHM, true, [
    "encrypt",
    "decrypt"
  ]);
}
new TextEncoder();
new TextDecoder();

markHTMLString(
  `async function replaceServerIsland(id, r) {
	let s = document.querySelector(\`script[data-island-id="\${id}"]\`);
	// If there's no matching script, or the request fails then return
	if (!s || r.status !== 200 || r.headers.get('content-type')?.split(';')[0].trim() !== 'text/html') return;
	// Load the HTML before modifying the DOM in case of errors
	let html = await r.text();
	// Remove any placeholder content before the island script
	while (s.previousSibling && s.previousSibling.nodeType !== 8 && s.previousSibling.data !== '[if astro]>server-island-start<![endif]')
		s.previousSibling.remove();
	s.previousSibling?.remove();
	// Insert the new HTML
	s.before(document.createRange().createContextualFragment(html));
	// Remove the script. Prior to v5.4.2, this was the trick to force rerun of scripts.  Keeping it to minimize change to the existing behavior.
	s.remove();
}`.split("\n").map((line) => line.trim()).filter((line) => line && !line.startsWith("//")).join(" ")
);

new TextEncoder();
new TextDecoder();
function isRenderInstance(obj) {
  return !!obj && typeof obj === "object" && "render" in obj && typeof obj.render === "function";
}

"0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_".split("").reduce((v, c) => (v[c.charCodeAt(0)] = c, v), []);
"-0123456789_".split("").reduce((v, c) => (v[c.charCodeAt(0)] = c, v), []);

function deserializeManifest(serializedManifest, routesList) {
  const routes = [];
  if (serializedManifest.routes) {
    for (const serializedRoute of serializedManifest.routes) {
      routes.push({
        ...serializedRoute,
        routeData: deserializeRouteData(serializedRoute.routeData)
      });
      const route = serializedRoute;
      route.routeData = deserializeRouteData(serializedRoute.routeData);
    }
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    rootDir: new URL(serializedManifest.rootDir),
    srcDir: new URL(serializedManifest.srcDir),
    publicDir: new URL(serializedManifest.publicDir),
    outDir: new URL(serializedManifest.outDir),
    cacheDir: new URL(serializedManifest.cacheDir),
    buildClientDir: new URL(serializedManifest.buildClientDir),
    buildServerDir: new URL(serializedManifest.buildServerDir),
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    key
  };
}
function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    // nosemgrep: javascript.lang.security.audit.detect-non-literal-regexp.detect-non-literal-regexp
    // This pattern is serialized from Astro's own route manifest.
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin,
    distURL: rawRouteData.distURL
  };
}
function deserializeRouteInfo(rawRouteInfo) {
  return {
    styles: rawRouteInfo.styles,
    file: rawRouteInfo.file,
    links: rawRouteInfo.links,
    scripts: rawRouteInfo.scripts,
    routeData: deserializeRouteData(rawRouteInfo.routeData)
  };
}

const renderers = [];

const serializedData = [{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","distURL":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/_image","component":"node_modules/.pnpm/astro@6.4.6_@netlify+blobs@10.7.9_@types+node@25.9.3_jiti@2.7.0_rollup@4.62.0_tsx@4.22.4_yaml@2.9.0/node_modules/astro/dist/assets/endpoint/generic.js","params":[],"pathname":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"type":"endpoint","prerender":false,"fallbackRoutes":[],"distURL":[],"isIndex":false,"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/notify","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/notify\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"notify","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/notify.ts","pathname":"/api/notify","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}];
				serializedData.map(deserializeRouteInfo);

const _page0 = () => import('./generic_OzeMbp_a.mjs');
const _page1 = () => import('./notify_DTDGjLPV.mjs');
const pageMap = new Map([
    ["node_modules/.pnpm/astro@6.4.6_@netlify+blobs@10.7.9_@types+node@25.9.3_jiti@2.7.0_rollup@4.62.0_tsx@4.22.4_yaml@2.9.0/node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/api/notify.ts", _page1]
]);

const _manifest = deserializeManifest(({"rootDir":"file:///Users/jeremiahugbine/Jerry%20&%20Co.%20Home%20Improvement%20LLC/jerryandco-website/jerryandco-website/","cacheDir":"file:///Users/jeremiahugbine/Jerry%20&%20Co.%20Home%20Improvement%20LLC/jerryandco-website/jerryandco-website/node_modules/.astro/","outDir":"file:///Users/jeremiahugbine/Jerry%20&%20Co.%20Home%20Improvement%20LLC/jerryandco-website/jerryandco-website/dist/","srcDir":"file:///Users/jeremiahugbine/Jerry%20&%20Co.%20Home%20Improvement%20LLC/jerryandco-website/jerryandco-website/src/","publicDir":"file:///Users/jeremiahugbine/Jerry%20&%20Co.%20Home%20Improvement%20LLC/jerryandco-website/jerryandco-website/public/","buildClientDir":"file:///Users/jeremiahugbine/Jerry%20&%20Co.%20Home%20Improvement%20LLC/jerryandco-website/jerryandco-website/dist/","buildServerDir":"file:///Users/jeremiahugbine/Jerry%20&%20Co.%20Home%20Improvement%20LLC/jerryandco-website/jerryandco-website/.netlify/build/","adapterName":"@astrojs/netlify","assetsDir":"_astro","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","distURL":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/_image","component":"node_modules/.pnpm/astro@6.4.6_@netlify+blobs@10.7.9_@types+node@25.9.3_jiti@2.7.0_rollup@4.62.0_tsx@4.22.4_yaml@2.9.0/node_modules/astro/dist/assets/endpoint/generic.js","params":[],"pathname":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"type":"endpoint","prerender":false,"fallbackRoutes":[],"distURL":[],"isIndex":false,"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/about","isIndex":false,"type":"page","pattern":"^\\/about\\/?$","segments":[[{"content":"about","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about.astro","pathname":"/about","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/notify","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/notify\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"notify","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/notify.ts","pathname":"/api/notify","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/cabinet-quiz","isIndex":false,"type":"page","pattern":"^\\/cabinet-quiz\\/?$","segments":[[{"content":"cabinet-quiz","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/cabinet-quiz.astro","pathname":"/cabinet-quiz","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/cabinet-refinishing-vs-replacement","isIndex":false,"type":"page","pattern":"^\\/cabinet-refinishing-vs-replacement\\/?$","segments":[[{"content":"cabinet-refinishing-vs-replacement","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/cabinet-refinishing-vs-replacement.astro","pathname":"/cabinet-refinishing-vs-replacement","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/colors","isIndex":false,"type":"page","pattern":"^\\/colors\\/?$","segments":[[{"content":"colors","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/colors.astro","pathname":"/colors","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/faq","isIndex":false,"type":"page","pattern":"^\\/faq\\/?$","segments":[[{"content":"faq","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/faq.astro","pathname":"/faq","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/financing","isIndex":false,"type":"page","pattern":"^\\/financing\\/?$","segments":[[{"content":"financing","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/financing.astro","pathname":"/financing","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/gallery","isIndex":false,"type":"page","pattern":"^\\/gallery\\/?$","segments":[[{"content":"gallery","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/gallery.astro","pathname":"/gallery","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/guarantee","isIndex":false,"type":"page","pattern":"^\\/guarantee\\/?$","segments":[[{"content":"guarantee","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/guarantee.astro","pathname":"/guarantee","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/our-process","isIndex":false,"type":"page","pattern":"^\\/our-process\\/?$","segments":[[{"content":"our-process","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/our-process.astro","pathname":"/our-process","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/cabinet-refinishing-[town]","isIndex":false,"type":"page","pattern":"^\\/cabinet-refinishing-([^/]+?)\\/?$","segments":[[{"content":"cabinet-refinishing-","dynamic":false,"spread":false},{"content":"town","dynamic":true,"spread":false}]],"params":["town"],"component":"src/pages/cabinet-refinishing-[town].astro","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"serverLike":true,"middlewareMode":"classic","site":"https://www.jerryandcohomeservices.com","base":"/","trailingSlash":"ignore","compressHTML":true,"experimentalQueuedRendering":{"enabled":false,"poolSize":0,"contentCache":false},"componentMetadata":[["/Users/jeremiahugbine/Jerry & Co. Home Improvement LLC/jerryandco-website/jerryandco-website/src/pages/about.astro",{"propagation":"none","containsHead":true}],["/Users/jeremiahugbine/Jerry & Co. Home Improvement LLC/jerryandco-website/jerryandco-website/src/pages/cabinet-quiz.astro",{"propagation":"none","containsHead":true}],["/Users/jeremiahugbine/Jerry & Co. Home Improvement LLC/jerryandco-website/jerryandco-website/src/pages/cabinet-refinishing-[town].astro",{"propagation":"none","containsHead":true}],["/Users/jeremiahugbine/Jerry & Co. Home Improvement LLC/jerryandco-website/jerryandco-website/src/pages/cabinet-refinishing-vs-replacement.astro",{"propagation":"none","containsHead":true}],["/Users/jeremiahugbine/Jerry & Co. Home Improvement LLC/jerryandco-website/jerryandco-website/src/pages/colors.astro",{"propagation":"none","containsHead":true}],["/Users/jeremiahugbine/Jerry & Co. Home Improvement LLC/jerryandco-website/jerryandco-website/src/pages/faq.astro",{"propagation":"none","containsHead":true}],["/Users/jeremiahugbine/Jerry & Co. Home Improvement LLC/jerryandco-website/jerryandco-website/src/pages/financing.astro",{"propagation":"none","containsHead":true}],["/Users/jeremiahugbine/Jerry & Co. Home Improvement LLC/jerryandco-website/jerryandco-website/src/pages/gallery.astro",{"propagation":"none","containsHead":true}],["/Users/jeremiahugbine/Jerry & Co. Home Improvement LLC/jerryandco-website/jerryandco-website/src/pages/guarantee.astro",{"propagation":"none","containsHead":true}],["/Users/jeremiahugbine/Jerry & Co. Home Improvement LLC/jerryandco-website/jerryandco-website/src/pages/index.astro",{"propagation":"none","containsHead":true}],["/Users/jeremiahugbine/Jerry & Co. Home Improvement LLC/jerryandco-website/jerryandco-website/src/pages/our-process.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000virtual:astro:actions/noop-entrypoint":"chunks/noop-entrypoint_BOlrdqWF.mjs","\u0000noop-middleware":"virtual_astro_middleware.mjs","\u0000virtual:astro:server-island-manifest":"chunks/_virtual_astro_server-island-manifest_CQQ1F5PF.mjs","\u0000virtual:astro:page:src/pages/about@_@astro":"chunks/about_DeiYWbL6.mjs","\u0000virtual:astro:page:src/pages/cabinet-quiz@_@astro":"chunks/cabinet-quiz_HNHv06_n.mjs","\u0000virtual:astro:page:src/pages/cabinet-refinishing-vs-replacement@_@astro":"chunks/cabinet-refinishing-vs-replacement_Cc2_rTZh.mjs","\u0000virtual:astro:page:src/pages/colors@_@astro":"chunks/colors_HgcietZC.mjs","\u0000virtual:astro:page:src/pages/faq@_@astro":"chunks/faq_DGekgQb4.mjs","\u0000virtual:astro:page:src/pages/financing@_@astro":"chunks/financing_DD2OYY53.mjs","\u0000virtual:astro:page:src/pages/gallery@_@astro":"chunks/gallery_DyBkw5Ni.mjs","\u0000virtual:astro:page:src/pages/guarantee@_@astro":"chunks/guarantee_Cethsuxs.mjs","\u0000virtual:astro:page:src/pages/our-process@_@astro":"chunks/our-process_o-dfaLvf.mjs","\u0000virtual:astro:page:src/pages/cabinet-refinishing-[town]@_@astro":"chunks/cabinet-refinishing-_town__C_dXbdgx.mjs","\u0000virtual:astro:page:src/pages/index@_@astro":"chunks/index_B34m6Csh.mjs","/Users/jeremiahugbine/Jerry & Co. Home Improvement LLC/jerryandco-website/jerryandco-website/node_modules/.pnpm/node-fetch-native@1.6.7/node_modules/node-fetch-native/dist/chunks/multipart-parser.mjs":"chunks/multipart-parser_B6JgSOMi.mjs","astro/entrypoints/prerender":"prerender-entry.B4QGpnPZ.mjs","virtual:astro:legacy-ssr-entry":"entry.mjs","\u0000virtual:astro:page:node_modules/.pnpm/astro@6.4.6_@netlify+blobs@10.7.9_@types+node@25.9.3_jiti@2.7.0_rollup@4.62.0_tsx@4.22.4_yaml@2.9.0/node_modules/astro/dist/assets/endpoint/generic@_@js":"chunks/generic_OzeMbp_a.mjs","\u0000virtual:astro:page:src/pages/api/notify@_@ts":"chunks/notify_DTDGjLPV.mjs","/Users/jeremiahugbine/Jerry & Co. Home Improvement LLC/jerryandco-website/jerryandco-website/src/components/WisetackWidget.astro?astro&type=script&index=0&lang.ts":"_astro/WisetackWidget.astro_astro_type_script_index_0_lang.l0sNRNKZ.js","/Users/jeremiahugbine/Jerry & Co. Home Improvement LLC/jerryandco-website/jerryandco-website/src/components/Accordion.astro?astro&type=script&index=0&lang.ts":"_astro/Accordion.astro_astro_type_script_index_0_lang.Cm1m7XIN.js","/Users/jeremiahugbine/Jerry & Co. Home Improvement LLC/jerryandco-website/jerryandco-website/src/components/BeforeAfter.astro?astro&type=script&index=0&lang.ts":"_astro/BeforeAfter.astro_astro_type_script_index_0_lang.BpfluCxR.js","/Users/jeremiahugbine/Jerry & Co. Home Improvement LLC/jerryandco-website/jerryandco-website/src/components/GalleryGrid.astro?astro&type=script&index=0&lang.ts":"_astro/GalleryGrid.astro_astro_type_script_index_0_lang.BCceQVaG.js","/Users/jeremiahugbine/Jerry & Co. Home Improvement LLC/jerryandco-website/jerryandco-website/src/components/Header.astro?astro&type=script&index=0&lang.ts":"_astro/Header.astro_astro_type_script_index_0_lang.CJ_o25YV.js","/Users/jeremiahugbine/Jerry & Co. Home Improvement LLC/jerryandco-website/jerryandco-website/src/components/HeroCarousel.astro?astro&type=script&index=0&lang.ts":"_astro/HeroCarousel.astro_astro_type_script_index_0_lang.DYhUEBbY.js","/Users/jeremiahugbine/Jerry & Co. Home Improvement LLC/jerryandco-website/jerryandco-website/src/components/MultiStepForm.astro?astro&type=script&index=0&lang.ts":"_astro/MultiStepForm.astro_astro_type_script_index_0_lang.DgbYjItt.js","/Users/jeremiahugbine/Jerry & Co. Home Improvement LLC/jerryandco-website/jerryandco-website/src/components/Quiz.astro?astro&type=script&index=0&lang.ts":"_astro/Quiz.astro_astro_type_script_index_0_lang.2jiZv_te.js","/Users/jeremiahugbine/Jerry & Co. Home Improvement LLC/jerryandco-website/jerryandco-website/src/layouts/Base.astro?astro&type=script&index=0&lang.ts":"_astro/Base.astro_astro_type_script_index_0_lang.Dphe_oO8.js","/Users/jeremiahugbine/Jerry & Co. Home Improvement LLC/jerryandco-website/jerryandco-website/src/pages/index.astro?astro&type=script&index=0&lang.ts":"_astro/index.astro_astro_type_script_index_0_lang.w1zaneH9.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["/Users/jeremiahugbine/Jerry & Co. Home Improvement LLC/jerryandco-website/jerryandco-website/src/components/WisetackWidget.astro?astro&type=script&index=0&lang.ts",""],["/Users/jeremiahugbine/Jerry & Co. Home Improvement LLC/jerryandco-website/jerryandco-website/src/components/Accordion.astro?astro&type=script&index=0&lang.ts","document.querySelectorAll(\".accordion-trigger\").forEach(t=>{t.dataset.aInit||(t.dataset.aInit=\"1\",t.addEventListener(\"click\",()=>{const e=t.getAttribute(\"aria-expanded\")===\"true\",n=t.getAttribute(\"aria-controls\"),a=n?document.getElementById(n):null;a&&(a.hidden=e,t.setAttribute(\"aria-expanded\",String(!e)))}))});"],["/Users/jeremiahugbine/Jerry & Co. Home Improvement LLC/jerryandco-website/jerryandco-website/src/components/BeforeAfter.astro?astro&type=script&index=0&lang.ts","function d(t){if(t.dataset.baInit)return;t.dataset.baInit=\"1\";const i=t.querySelector(\".ba-after-clip\"),o=t.querySelector(\".ba-handle\"),e=t.querySelector(\".ba-range\");function n(u){const a=Math.max(0,Math.min(100,u));i.style.clipPath=`inset(0 ${100-a}% 0 0)`,o.style.left=`${a}%`,e.setAttribute(\"aria-valuenow\",String(Math.round(a)))}e.addEventListener(\"input\",()=>n(Number(e.value)));let r=!1;e.addEventListener(\"input\",()=>{r||(r=!0,typeof window<\"u\"&&window.posthog&&window.posthog.capture(\"before_after_dragged\"))},{passive:!0}),n(50)}document.querySelectorAll(\"[data-ba-slider]\").forEach(d);"],["/Users/jeremiahugbine/Jerry & Co. Home Improvement LLC/jerryandco-website/jerryandco-website/src/components/GalleryGrid.astro?astro&type=script&index=0&lang.ts","const s=document.querySelector(\"[data-gallery-grid]\");if(s&&!s.dataset.ggInit){let r=function(){let t=0;w.forEach(n=>{const h=a===\"all\"||n.dataset.cat===a,f=l===\"all\"||n.dataset.town===l,g=h&&f;n.hidden=!g,g&&t++}),d&&(d.hidden=t>0);const e=new URL(window.location.href);a===\"all\"?e.searchParams.delete(\"cat\"):e.searchParams.set(\"cat\",a),l===\"all\"?e.searchParams.delete(\"town\"):e.searchParams.set(\"town\",l),window.history.replaceState({},\"\",e),typeof window.posthog<\"u\"&&window.posthog.capture(\"gallery_filter_used\",{cat:a,town:l,visible:t})};s.dataset.ggInit=\"1\";const i=new URLSearchParams(window.location.search);let a=i.get(\"cat\")||\"all\",l=i.get(\"town\")||\"all\";const o=s.querySelectorAll(\"[data-gg-cat]\"),c=s.querySelector(\"[data-gg-town]\"),w=s.querySelectorAll(\"[data-cat]\"),d=s.querySelector(\"[data-gg-empty]\");o.forEach(t=>{t.setAttribute(\"aria-pressed\",String(t.dataset.ggCat===a))}),c&&(c.value=l),r(),o.forEach(t=>{t.addEventListener(\"click\",()=>{a=t.dataset.ggCat||\"all\",o.forEach(e=>{e.setAttribute(\"aria-pressed\",String(e.dataset.ggCat===a))}),r()})}),c&&c.addEventListener(\"change\",()=>{l=c.value,r()})}"],["/Users/jeremiahugbine/Jerry & Co. Home Improvement LLC/jerryandco-website/jerryandco-website/src/components/Header.astro?astro&type=script&index=0&lang.ts","const t=document.getElementById(\"nav-toggle\"),a=document.getElementById(\"mobileNav\");t&&a&&(t.addEventListener(\"change\",()=>{a.style.display=t.checked?\"block\":\"none\"}),a.querySelectorAll(\"a\").forEach(e=>{e.addEventListener(\"click\",()=>{t.checked=!1,a.style.display=\"none\"})}));document.querySelectorAll(\".nav-trigger\").forEach(e=>{const n=e.closest(\".nav-item\");n&&(e.addEventListener(\"click\",()=>{const d=e.getAttribute(\"aria-expanded\")===\"true\";e.setAttribute(\"aria-expanded\",String(!d))}),n.addEventListener(\"focusout\",d=>{n.contains(d.relatedTarget)||e.setAttribute(\"aria-expanded\",\"false\")}))});"],["/Users/jeremiahugbine/Jerry & Co. Home Improvement LLC/jerryandco-website/jerryandco-website/src/components/HeroCarousel.astro?astro&type=script&index=0&lang.ts","(function(){const s=document.querySelectorAll(\".hero-slide\"),t=document.querySelectorAll(\"#carouselDots .dot\");if(!s.length||!t.length)return;let e=0,a=!1,r;function i(c){s[e].classList.remove(\"hero-slide--active\"),t[e].classList.remove(\"dot--active\"),t[e].setAttribute(\"aria-selected\",\"false\"),e=(c%s.length+s.length)%s.length,s[e].classList.add(\"hero-slide--active\"),t[e].classList.add(\"dot--active\"),t[e].setAttribute(\"aria-selected\",\"true\")}function d(){r=setInterval(()=>{a||i(e+1)},5e3)}function l(){clearInterval(r)}t.forEach((c,o)=>{c.addEventListener(\"click\",()=>{l(),i(o),d()})});const n=document.getElementById(\"top\");if(n){n.addEventListener(\"mouseenter\",()=>{a=!0}),n.addEventListener(\"mouseleave\",()=>{a=!1}),n.addEventListener(\"focusin\",()=>{a=!0}),n.addEventListener(\"focusout\",o=>{n.contains(o.relatedTarget)||(a=!1)});let c=0;n.addEventListener(\"touchstart\",o=>{c=o.touches[0].clientX},{passive:!0}),n.addEventListener(\"touchend\",o=>{const u=o.changedTouches[0].clientX-c;Math.abs(u)>40&&(l(),i(u<0?e+1:e-1),d())},{passive:!0})}d()})();(function(){document.addEventListener(\"click\",s=>{const t=s.target.closest(\"[data-ph-event]\");if(!t)return;const e=t.dataset.phEvent,a=t.dataset.phLabel;e&&typeof window.posthog<\"u\"&&window.posthog.capture(e,{label:a})})})();"],["/Users/jeremiahugbine/Jerry & Co. Home Improvement LLC/jerryandco-website/jerryandco-website/src/components/MultiStepForm.astro?astro&type=script&index=0&lang.ts","(function(){const t=document.getElementById(\"msf\");if(!t)return;const a=document.getElementById(\"msfFill\"),q=t.querySelectorAll(\"[data-step-label]\"),d=t.querySelectorAll(\".msf-step\"),s=document.getElementById(\"msfContactForm\"),r=document.getElementById(\"msfSubmit\"),o=document.getElementById(\"msfError\"),u=document.getElementById(\"msfSuccess\"),f=t.dataset.formAction??\"\";function y(e){d.forEach(n=>{n.hidden=Number(n.dataset.step)!==e}),a&&(a.style.width=`${e/4*100}%`),q.forEach(n=>{n.classList.toggle(\"msf-label--active\",Number(n.dataset.stepLabel)<=e)}),t.scrollIntoView({behavior:\"smooth\",block:\"start\"})}function m(e,n){typeof window.posthog<\"u\"&&window.posthog.capture(e,n??{})}t.querySelectorAll(\".msf-next\").forEach(e=>{e.addEventListener(\"click\",()=>{const n=e.dataset.phStep?Number(e.dataset.phStep):null;n&&m(\"form_step_completed\",{step:n}),y(Number(e.dataset.next))})}),t.querySelectorAll(\".msf-back\").forEach(e=>{e.addEventListener(\"click\",()=>y(Number(e.dataset.back)))}),s?.addEventListener(\"submit\",async e=>{e.preventDefault();const n=(s.querySelector('[name=\"name\"]')?.value??\"\").trim(),E=(s.querySelector('[name=\"phone\"]')?.value??\"\").trim(),_=(s.querySelector('[name=\"email\"]')?.value??\"\").trim();if(!n||!E||!_){o&&(o.hidden=!1,o.querySelector(\"p\").textContent=\"Please fill in all contact fields.\");return}o&&(o.hidden=!0),r&&(r.disabled=!0,r.textContent=\"Sending…\");const i=c=>t.querySelector(c)?.value??\"\",p={project_type:i('input[name=\"project_type\"]:checked'),property_type:i('input[name=\"property_type\"]:checked'),town:i('[name=\"town\"]'),timeline:i('input[name=\"timeline\"]:checked'),project_size:i('[name=\"project_size\"]'),finish_color:i('[name=\"finish_color\"]'),building_notes:t.querySelector('[name=\"building_notes\"]')?.value??\"\",name:n,phone:E,email:_};Object.entries(p).forEach(([c,v])=>{const w=s.querySelector(`input[type=\"hidden\"][name=\"${c}\"]`);w&&(w.value=v)});try{if(f){const c=await fetch(f,{method:\"POST\",headers:{\"Content-Type\":\"application/json\",Accept:\"application/json\"},body:JSON.stringify(p)});if(!c.ok)throw new Error(`HTTP ${c.status}`)}m(\"form_step_completed\",{step:4}),m(\"form_submitted\",{project_type:p.project_type}),d.forEach(c=>{c.hidden=!0}),u&&(u.hidden=!1),a&&(a.style.width=\"100%\")}catch{r&&(r.disabled=!1,r.textContent=\"Request my free video estimate\"),o&&(o.hidden=!1,o.querySelector(\"p\").innerHTML='Something went wrong — please try again or call <a href=\"tel:+13476026801\">(347) 602-6801</a>.')}});const l=new URLSearchParams(location.search),h=l.get(\"project\");if(h){const e=t.querySelector(`input[name=\"project_type\"][value=\"${h}\"]`);e&&(e.checked=!0)}const S=l.get(\"town\");if(S){const e=t.querySelector('[name=\"town\"]');e&&(e.value=S)}const g=l.get(\"type\");if(g){const e=t.querySelector(`input[name=\"property_type\"][value=\"${g}\"]`);e&&(e.checked=!0)}const b=l.get(\"timeline\");if(b){const e=t.querySelector(`input[name=\"timeline\"][value=\"${b}\"]`);e&&(e.checked=!0)}})();"],["/Users/jeremiahugbine/Jerry & Co. Home Improvement LLC/jerryandco-website/jerryandco-website/src/components/Quiz.astro?astro&type=script&index=0&lang.ts","(function(){const t=document.querySelector(\"[data-quiz]\");if(!t||t.dataset.quizInit)return;t.dataset.quizInit=\"1\";const q=t.querySelectorAll(\"[data-step]\"),y=t.querySelectorAll(\"[data-outcome]\"),d=t.querySelector(\"[data-quiz-fill]\"),f=t.querySelector(\"[data-quiz-label]\"),E=t.querySelectorAll(\"[data-quiz-restart]\"),m=6;let i=[],l=0,h=!1;function p(e){q.forEach((a,n)=>{a.hidden=n!==e}),y.forEach(a=>{a.hidden=!0});const c=Math.round(e/m*100);d&&(d.style.width=`${c}%`),f&&(f.textContent=`Question ${e+1} of ${m}`);const o=t.querySelector(\".quiz-restart\");o&&(o.hidden=!0)}function S(e){q.forEach(r=>{r.hidden=!0}),y.forEach(r=>{r.hidden=r.dataset.outcome!==e}),d&&(d.style.width=\"100%\"),f&&(f.textContent=\"Your result\");const c=t.querySelector(\".quiz-restart\");c&&(c.hidden=!1);const o=i[4]?.value??\"\",a=i[5]?.value??\"\",n=t.querySelector(`[data-outcome=\"${e}\"]`);if(!n)return;if(e!==\"c\"){const r=n.querySelector(\"[data-outcome-cta]\");if(r){const s=new URL(\"/#estimate\",window.location.origin);s.searchParams.set(\"project\",\"cabinet-refinishing\"),o&&s.searchParams.set(\"type\",o),a&&s.searchParams.set(\"timeline\",a),r.href=s.pathname+s.search+s.hash}}h&&n.querySelectorAll(\"[data-outcome-details]\").forEach(s=>{s.textContent=\"Your cabinets may be laminate or thermofoil — refinishing is possible in many cases, but depends on adhesion condition. We'll confirm compatibility during your free video walkthrough.\"});const u=window.posthog;u&&typeof u.capture==\"function\"&&u.capture(\"quiz_completed\",{outcome:e.toUpperCase(),score:i.reduce((r,s)=>r+s.score,0),property_type:o,timeline:a,laminate_flag:h}),n.scrollIntoView({behavior:\"smooth\",block:\"nearest\"})}function w(){const e=i.reduce((o,a)=>o+a.score,0),c=i.filter(o=>o.score<0).length;return e<3||c>=2?\"c\":e>=6&&c===0?\"a\":\"b\"}function g(){i=[],l=0,h=!1,t.querySelectorAll(\".quiz-answer.selected\").forEach(e=>e.classList.remove(\"selected\")),p(0)}t.querySelectorAll(\".quiz-answer\").forEach(e=>{e.addEventListener(\"click\",()=>{const c=parseInt(e.dataset.score??\"0\",10),o=e.dataset.value??\"\",a=e.dataset.flag??\"\";e.closest(\"[data-step]\")?.querySelectorAll(\".quiz-answer\").forEach(u=>u.classList.remove(\"selected\")),e.classList.add(\"selected\"),a===\"laminate\"&&(h=!0),i[l]={score:c,value:o,flag:a||void 0},setTimeout(()=>{l++,l<m?p(l):S(w())},220)})}),E.forEach(e=>e.addEventListener(\"click\",g)),p(0)})();"],["/Users/jeremiahugbine/Jerry & Co. Home Improvement LLC/jerryandco-website/jerryandco-website/src/layouts/Base.astro?astro&type=script&index=0&lang.ts","document.addEventListener(\"click\",o=>{const t=o.target?.closest(\"[data-ph-event]\");if(!t)return;const e=t.dataset.phEvent,n=t.dataset.phLabel;e&&typeof window.posthog<\"u\"&&window.posthog.capture(e,n?{label:n}:void 0)});"],["/Users/jeremiahugbine/Jerry & Co. Home Improvement LLC/jerryandco-website/jerryandco-website/src/pages/index.astro?astro&type=script&index=0&lang.ts","(function(){const c=document.querySelectorAll(\".filter-btn\"),s=document.querySelectorAll(\".gallery-item\");c.forEach(e=>{e.addEventListener(\"click\",()=>{c.forEach(t=>t.classList.remove(\"active\")),e.classList.add(\"active\");const l=e.getAttribute(\"data-filter\")??\"all\";s.forEach(t=>{const a=t.getAttribute(\"data-cat\")??\"\";l===\"all\"||a.split(\" \").includes(l)?t.classList.remove(\"hidden\"):t.classList.add(\"hidden\")})})})})();"]],"assets":["/favicon.ico","/favicon.svg","/robots.txt","/_astro/Footer.fdDz0Xq9.css","/_astro/about.CsUkuZY_.css","/_astro/cabinet-quiz.DdSxPA1M.css","/_astro/cabinet-refinishing-_town_.B4HD_U-j.css","/_astro/cabinet-refinishing-vs-replacement.gGNdiz2b.css","/_astro/colors.C41hN5qw.css","/_astro/financing.D1zuVWXn.css","/_astro/gallery.C-K1vFVQ.css","/_astro/guarantee.CJ81raCT.css","/_astro/index.CQ8SB_y0.css","/_astro/our-process.ZEt20cwi.css","/about/index.html","/cabinet-quiz/index.html","/cabinet-refinishing-vs-replacement/index.html","/colors/index.html","/faq/index.html","/financing/index.html","/gallery/index.html","/guarantee/index.html","/our-process/index.html","/index.html"],"buildFormat":"directory","checkOrigin":true,"actionBodySizeLimit":1048576,"serverIslandBodySizeLimit":1048576,"allowedDomains":[],"key":"21ZBCWAruK6UU59CfpevxhQ5MW9L0cfjH+snxV+3yF4=","sessionConfig":{"driver":"unstorage/drivers/netlify-blobs"},"image":{},"devToolbar":{"enabled":false,"debugInfoOutput":""},"logLevel":"info","shouldInjectCspMetaTags":false}));
					const manifestRoutes = _manifest.routes;
					
					const manifest = Object.assign(_manifest, {
					  renderers,
					  actions: () => import('./noop-entrypoint_BOlrdqWF.mjs'),
					  middleware: () => import('../virtual_astro_middleware.mjs'),
					  sessionDriver: () => import('./_virtual_astro_session-driver_Cu38sCNe.mjs').then(n => n._),
					  
					  serverIslandMappings: () => import('./_virtual_astro_server-island-manifest_CQQ1F5PF.mjs'),
					  routes: manifestRoutes,
					  pageMap,
					});

const _exports = createExports?.(manifest, args) || serverEntrypointModule;
const _start = "start";
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) {
  serverEntrypointModule[_start](manifest, args);
}
var legacy_default = _exports;

const _virtual_astro_legacySsrEntry = legacy_default.default;

export { HTMLString as H, _virtual_astro_legacySsrEntry as _, isHTMLString as a, isRenderInstance as b, createBufferedRenderer as c, addAttribute as d, escapeHTML as e, isPromise as i, markHTMLString as m, unescapeHTML as u };
