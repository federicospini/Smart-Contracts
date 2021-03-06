"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var conseiljs_1 = require("conseiljs");
var fs_1 = __importDefault(require("fs"));
/**
 * Deploys an instance of the Tezos Name Service Domain Manager.
 *
 * @param {string} initialStorage - The initial storage in Michelson
 * @param {string} tezosNode - The URL of the Tezos node to connect to
 * @param {KeyStore} keyStore - The sender's key store with key pair and public key hash
 * @returns {Promise<OperationResult>} The result of the operation
 */
function deployContract(initialStorage, tezosNode, keyStore) {
    if (initialStorage === void 0) { initialStorage = 'Pair "tz1WpPzK6NwWVTJcXqFvYmoA6msQeVy1YP6z" (Pair {} "Author: Teckhua Chiang, Company: Cryptonomic Inc.")'; }
    return __awaiter(this, void 0, void 0, function () {
        var contractCode;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    contractCode = fs_1.default.readFileSync(__dirname + '/tezos-name-service-domain-manager.tz', 'utf8');
                    return [4 /*yield*/, conseiljs_1.TezosNodeWriter.sendContractOriginationOperation(tezosNode, keyStore, 0, undefined, false, true, 100000, '', 1000, 100000, contractCode, initialStorage, conseiljs_1.TezosParameterFormat.Michelson)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.deployContract = deployContract;
/**
 * Entry point for a user to register a new subdomain. Default subdomain registration logic. Modify for your own purposes.
 *
 * @param {string} subdomain - A string representing the subdomain name
 * @param {string} resolver - An address representing the resolver address
 * @param {string} manager - An address representing the manager address
 * @param {number} ttlInSeconds - An int representing the time to live in seconds
 * @param {InvocationArguments} invokeArgs - The arguments for a contract invocation operation
 * @returns {Promise<OperationResult>} The result of the operation
 */
function registerSubdomain(subdomain, resolver, manager, ttlInSeconds, invokeArgs) {
    return __awaiter(this, void 0, void 0, function () {
        var parameters;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    parameters = 'Left (Pair ' + subdomain + ' (Pair ' + resolver + ' (Pair ' + manager + ' ' + ttlInSeconds + ')))';
                    return [4 /*yield*/, conseiljs_1.TezosNodeWriter.sendContractInvocationOperation(invokeArgs.tezosNode, invokeArgs.keyStore, invokeArgs.contractAddress, 0, 50000, '', 1000, 100000, parameters, conseiljs_1.TezosParameterFormat.Michelson)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.registerSubdomain = registerSubdomain;
/**
 * Entry point for a controller to transfer ownership of a subdomain to another user.
 *
 * @param {string} subdomain - A string representing the subdomain name
 * @param {string} newSubdomainOwner - An address representing the updated subdomain owner address
 * @param {InvocationArguments} invokeArgs - The arguments for a contract invocation operation
 * @returns {Promise<OperationResult>} The result of the operation
 */
function transferSubdomainOwnership(subdomain, newSubdomainOwner, invokeArgs) {
    return __awaiter(this, void 0, void 0, function () {
        var parameters;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    parameters = 'Right (Left (Pair ' + subdomain + ' ' + newSubdomainOwner + '))';
                    return [4 /*yield*/, conseiljs_1.TezosNodeWriter.sendContractInvocationOperation(invokeArgs.tezosNode, invokeArgs.keyStore, invokeArgs.contractAddress, 0, 50000, '', 1000, 100000, parameters, conseiljs_1.TezosParameterFormat.Michelson)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.transferSubdomainOwnership = transferSubdomainOwnership;
/**
 * Entry point for a subdomain owner to update the resolver address for a subdomain. Resolvers are full Tezos addresses registered as the destination of subdomains.
 *
 * @param {string} subdomain - A string representing the subdomain name
 * @param {string} resolver - An address representing the updated resolver address
 * @param {InvocationArguments} invokeArgs - The arguments for a contract invocation operation
 * @returns {Promise<OperationResult>} The result of the operation
 */
function updateResolver(subdomain, resolver, invokeArgs) {
    return __awaiter(this, void 0, void 0, function () {
        var parameters;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    parameters = 'Right (Right (Left (Pair ' + subdomain + ' ' + resolver + '))';
                    return [4 /*yield*/, conseiljs_1.TezosNodeWriter.sendContractInvocationOperation(invokeArgs.tezosNode, invokeArgs.keyStore, invokeArgs.contractAddress, 0, 50000, '', 1000, 100000, parameters, conseiljs_1.TezosParameterFormat.Michelson)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.updateResolver = updateResolver;
/**
 * Entry point for the subdomain owner to update the manager address for a subdomain. Managers are smart contracts that manage a subdomain.
 *
 * @param {string} subdomain - A string representing the subdomain name
 * @param {string} manager - An address representing the updated manager address
 * @param {InvocationArguments} invokeArgs - The arguments for a contract invocation operation
 * @returns {Promise<OperationResult>} The result of the operation
 */
function updateManager(subdomain, manager, invokeArgs) {
    return __awaiter(this, void 0, void 0, function () {
        var parameters;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    parameters = 'Right (Right (Right (Left (Pair ' + subdomain + ' ' + manager + ')))';
                    return [4 /*yield*/, conseiljs_1.TezosNodeWriter.sendContractInvocationOperation(invokeArgs.tezosNode, invokeArgs.keyStore, invokeArgs.contractAddress, 0, 50000, '', 1000, 100000, parameters, conseiljs_1.TezosParameterFormat.Michelson)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.updateManager = updateManager;
/**
 * Entry point for the subdomain owner to update the TTL for a subdomain.
 *
 * @param {string} subdomain - A string representing the subdomain name
 * @param {number} ttlInSeconds - An int representing the updated time to live in seconds
 * @param {InvocationArguments} invokeArgs - The arguments for a contract invocation operation
 * @returns {Promise<OperationResult>} The result of the operation
 */
function updateTTL(subdomain, ttlInSeconds, invokeArgs) {
    return __awaiter(this, void 0, void 0, function () {
        var parameters;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    parameters = 'Right (Right (Right (Right (Left (Pair ' + subdomain + ' ' + ttlInSeconds + ')))))';
                    return [4 /*yield*/, conseiljs_1.TezosNodeWriter.sendContractInvocationOperation(invokeArgs.tezosNode, invokeArgs.keyStore, invokeArgs.contractAddress, 0, 50000, '', 1000, 100000, parameters, conseiljs_1.TezosParameterFormat.Michelson)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.updateTTL = updateTTL;
/**
 * Entry point for a controller to delete an existing subdomain.
 *
 * @param {string} subdomain - A string representing the subdomain name
 * @param {InvocationArguments} invokeArgs - The arguments for a contract invocation operation
 * @returns {Promise<OperationResult>} The result of the operation
 */
function deleteSubdomain(subdomain, invokeArgs) {
    return __awaiter(this, void 0, void 0, function () {
        var parameters;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    parameters = 'Right (Right (Right (Right (Right ' + subdomain + '))))';
                    return [4 /*yield*/, conseiljs_1.TezosNodeWriter.sendContractInvocationOperation(invokeArgs.tezosNode, invokeArgs.keyStore, invokeArgs.contractAddress, 0, 50000, '', 1000, 100000, parameters, conseiljs_1.TezosParameterFormat.Michelson)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.deleteSubdomain = deleteSubdomain;
