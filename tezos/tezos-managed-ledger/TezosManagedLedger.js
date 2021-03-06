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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var conseiljs_1 = require("conseiljs");
var fs_1 = __importDefault(require("fs"));
var StorageProcessor = __importStar(require("../utilities/StorageProcessor"));
/**
 * Deploys an instance of the Tezos Managed Ledger.
 *
 * @param {string} initialStorage - The initial storage in Michelson
 * @param {string} tezosNode - The URL of the Tezos node to connect to
 * @param {KeyStore} keyStore - The sender's key store with key pair and public key hash
 * @returns {Promise<OperationResult>} The result of the operation
 */
function deployContract(initialStorage, tezosNode, keyStore) {
    if (initialStorage === void 0) { initialStorage = 'Pair {} (Pair "tz1WpPzK6NwWVTJcXqFvYmoA6msQeVy1YP6z" (Pair False 0))'; }
    return __awaiter(this, void 0, void 0, function () {
        var contractCode;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    contractCode = fs_1.default.readFileSync(__dirname + '/tezos-managed-ledger.tz', 'utf8');
                    return [4 /*yield*/, conseiljs_1.TezosNodeWriter.sendContractOriginationOperation(tezosNode, keyStore, 0, undefined, false, true, 100000, '', 1000, 100000, contractCode, initialStorage, conseiljs_1.TezosParameterFormat.Michelson)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.deployContract = deployContract;
// <!-- Implementation of FA1.2 -->
/**
 * Sends the given amount of tokens from one address to another address.
 *
 * @param {string} from - The address of the account from which the tokens are sent
 * @param {string} to - The address of the account to which the tokens are sent
 * @param {number} value - The amount of tokens to send
 * @param {InvocationArguments} invokeArgs - The arguments for a contract invocation operation
 * @returns {Promise<OperationResult>} The result of the operation
 */
function transfer(from, to, value, invokeArgs) {
    return __awaiter(this, void 0, void 0, function () {
        var parameters;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    parameters = 'Left (Pair "' + from + '" (Pair "' + to + '" ' + value + '))';
                    return [4 /*yield*/, conseiljs_1.TezosNodeWriter.sendContractInvocationOperation(invokeArgs.tezosNode, invokeArgs.keyStore, invokeArgs.contractAddress, 0, 150000, '', 5392, 144382, parameters, conseiljs_1.TezosParameterFormat.Michelson)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.transfer = transfer;
/**
 * Allows another account to withdraw from your account, multiple times, up to the given amount.
 * If this function is called again it overwrites the current allowance with the new given amount.
 *
 * @param {string} spender - The address of the account that can withdraw from your account
 * @param {number} value - The amount of allowance given to the spender
 * @param {InvocationArguments} invokeArgs - The arguments for a contract invocation operation
 * @returns {Promise<OperationResult>} The result of the operation
 */
function approve(spender, value, invokeArgs) {
    return __awaiter(this, void 0, void 0, function () {
        var parameters;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    parameters = 'Right (Left (Pair "' + spender + '" ' + value + '))';
                    return [4 /*yield*/, conseiljs_1.TezosNodeWriter.sendContractInvocationOperation(invokeArgs.tezosNode, invokeArgs.keyStore, invokeArgs.contractAddress, 0, 150000, '', 5392, 144382, parameters, conseiljs_1.TezosParameterFormat.Michelson)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.approve = approve;
/**
 * Returns the amount which an account is still allowed to withdraw from another account to a receiving smart contract.
 *
 * @param {string} owner - The address of the account providing the allowance
 * @param {string} spender - The address of the account receiving the allowance
 * @param {string} remaining - A contract of type nat
 * @param {InvocationArguments} invokeArgs - The arguments for a contract invocation operation
 * @returns {Promise<OperationResult>} The result of the operation
 */
function getAllowance(owner, spender, remaining, invokeArgs) {
    return __awaiter(this, void 0, void 0, function () {
        var parameters;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    parameters = 'Right (Right (Left (Pair (Pair "' + owner + '" "' + spender + '") ' + remaining + '))))';
                    return [4 /*yield*/, conseiljs_1.TezosNodeWriter.sendContractInvocationOperation(invokeArgs.tezosNode, invokeArgs.keyStore, invokeArgs.contractAddress, 0, 150000, '', 5392, 144382, parameters, conseiljs_1.TezosParameterFormat.Michelson)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.getAllowance = getAllowance;
/**
 * Returns the account balance of an account with the given address to a receiving smart contract.
 *
 * @param {string} owner - The address of the account from which the account balance is retrieved
 * @param {string} balance - A contract of type nat
 * @param {InvocationArguments} invokeArgs - The arguments for a contract invocation operation
 * @returns {Promise<OperationResult>} The result of the operation
 */
function getBalance(owner, balance, invokeArgs) {
    return __awaiter(this, void 0, void 0, function () {
        var parameters;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    parameters = 'Right (Right (Right (Left (Pair "' + owner + '" ' + balance + '))))';
                    return [4 /*yield*/, conseiljs_1.TezosNodeWriter.sendContractInvocationOperation(invokeArgs.tezosNode, invokeArgs.keyStore, invokeArgs.contractAddress, 0, 150000, '', 5392, 144382, parameters, conseiljs_1.TezosParameterFormat.Michelson)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.getBalance = getBalance;
/**
 * Returns the total token supply to a receiving smart contract.
 *
 * @param {number} totalSupply - A contract of type nat
 * @param {InvocationArguments} invokeArgs - The arguments for a contract invocation operation
 * @returns {Promise<OperationResult>} The result of the operation
 */
function getTotalSupply(totalSupply, invokeArgs) {
    return __awaiter(this, void 0, void 0, function () {
        var parameters;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    parameters = 'Right (Right (Right (Right (Left (Pair Unit ' + totalSupply + ')))))';
                    return [4 /*yield*/, conseiljs_1.TezosNodeWriter.sendContractInvocationOperation(invokeArgs.tezosNode, invokeArgs.keyStore, invokeArgs.contractAddress, 0, 150000, '', 5392, 144382, parameters, conseiljs_1.TezosParameterFormat.Michelson)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.getTotalSupply = getTotalSupply;
// <!-- Additional operations -->
/**
 * Pauses operations when the parameter is True, and resumes them when the parameter is False.
 * During the pause, no contract can perform transfer or approval operations.
 * The administrator is still allowed to perform his operations.
 *
 * @param {string} pause - The pause state of operations
 * @param {InvocationArguments} invokeArgs - The arguments for a contract invocation operation
 * @returns {Promise<OperationResult>} The result of the operation
 */
function setPause(pause, invokeArgs) {
    return __awaiter(this, void 0, void 0, function () {
        var input, parameters;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    input = String(pause).charAt(0).toUpperCase() + String(pause).slice(1);
                    parameters = 'Right (Right (Right (Right (Right (Left ' + input + ')))))';
                    return [4 /*yield*/, conseiljs_1.TezosNodeWriter.sendContractInvocationOperation(invokeArgs.tezosNode, invokeArgs.keyStore, invokeArgs.contractAddress, 0, 150000, '', 5392, 144382, parameters, conseiljs_1.TezosParameterFormat.Michelson)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.setPause = setPause;
/**
 * Changes the current administrator.
 *
 * @param {string} administrator - The address of the new administrator
 * @param {InvocationArguments} invokeArgs - The arguments for a contract invocation operation
 * @returns {Promise<OperationResult>} The result of the operation
 */
function setAdministrator(administrator, invokeArgs) {
    return __awaiter(this, void 0, void 0, function () {
        var parameters;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    parameters = 'Right (Right (Right (Right (Right (Right (Left "' + administrator + '"))))))';
                    return [4 /*yield*/, conseiljs_1.TezosNodeWriter.sendContractInvocationOperation(invokeArgs.tezosNode, invokeArgs.keyStore, invokeArgs.contractAddress, 0, 150000, '', 5392, 144382, parameters, conseiljs_1.TezosParameterFormat.Michelson)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.setAdministrator = setAdministrator;
/**
 * Returns the address of the current administrator to a receiving smart contract.
 *
 * @param {string} administrator - A contract of type string
 * @param {InvocationArguments} invokeArgs - The arguments for a contract invocation operation
 * @returns {Promise<OperationResult>} The result of the operation
 */
function getAdministrator(administrator, invokeArgs) {
    return __awaiter(this, void 0, void 0, function () {
        var parameters;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    parameters = 'Right (Right (Right (Right (Right (Right (Right (Left (Pair Unit "' + administrator + '"))))))))';
                    return [4 /*yield*/, conseiljs_1.TezosNodeWriter.sendContractInvocationOperation(invokeArgs.tezosNode, invokeArgs.keyStore, invokeArgs.contractAddress, 0, 150000, '', 5392, 144382, parameters, conseiljs_1.TezosParameterFormat.Michelson)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.getAdministrator = getAdministrator;
/**
 * Produces the given amount of tokens on the account associated with the given address.
 *
 * @param {string} to - The address to which the newly minted tokens are sent
 * @param {number} value - The amount of tokens to mint
 * @param {InvocationArguments} invokeArgs - The arguments for a contract invocation operation
 * @returns {Promise<OperationResult>} The result of the operation
 */
function mint(to, value, invokeArgs) {
    return __awaiter(this, void 0, void 0, function () {
        var parameters;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    parameters = 'Right (Right (Right (Right (Right (Right (Right (Right (Left (Pair "' + to + '" ' + value + ')))))))))';
                    return [4 /*yield*/, conseiljs_1.TezosNodeWriter.sendContractInvocationOperation(invokeArgs.tezosNode, invokeArgs.keyStore, invokeArgs.contractAddress, 0, 150000, '', 5392, 144382, parameters, conseiljs_1.TezosParameterFormat.Michelson)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.mint = mint;
/**
 * Destroys the given amount of tokens on the account associated with the given address.
 *
 * @param {string} from - The account from which the tokens are destroyed
 * @param {number} value - The amount of tokens to destroy
 * @param {InvocationArguments} invokeArgs - The arguments for a contract invocation operation
 * @returns {Promise<OperationResult>} The result of the operation
 */
function burn(from, value, invokeArgs) {
    return __awaiter(this, void 0, void 0, function () {
        var parameters;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    parameters = 'Right (Right (Right (Right (Right (Right (Right (Right (Right (Pair "' + from + '" ' + value + ')))))))))';
                    return [4 /*yield*/, conseiljs_1.TezosNodeWriter.sendContractInvocationOperation(invokeArgs.tezosNode, invokeArgs.keyStore, invokeArgs.contractAddress, 0, 150000, '', 5392, 144382, parameters, conseiljs_1.TezosParameterFormat.Michelson)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.burn = burn;
/**
 * Gets the entire contents of storage.
 *
 * @param {string} contractAddress - The address of a Tezos Managed Ledger smart contract
 * @param {ConseilServerInfo} conseilServer - Information for querying a Conseil server
 * @param {string} network - The Tezos network on which the Tezos Managed Ledger is deployed
 * @returns {Promise<TokenStorage>} The entire contents of storage
 */
function viewStorage(contractAddress, conseilServer, network) {
    return __awaiter(this, void 0, void 0, function () {
        var storage, formattedStorage;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, StorageProcessor.processStorage(contractAddress, conseilServer, network)];
                case 1:
                    storage = _a.sent();
                    formattedStorage = { ledger: storage[0], admin: storage[1], paused: storage[2], totalSupply: storage[3] };
                    return [2 /*return*/, formattedStorage];
            }
        });
    });
}
exports.viewStorage = viewStorage;
/**
 * Gets the token allowance permitted by a given account to the sender.
 *
 * @param {string} address - The account permitting the token allowance to the sender
 * @param {string} contractAddress - The address of a Tezos Managed Ledger smart contract
 * @param {ConseilServerInfo} conseilServer - Information for querying a Conseil server
 * @param {string} network - The Tezos network on which the Tezos Managed Ledger is deployed
 * @returns {Promise<string>} The token allowance permitted by a given account to the sender
 */
function viewAllowance(address, contractAddress, conseilServer, network) {
    return __awaiter(this, void 0, void 0, function () {
        var storage, ledger, account, allowance;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, StorageProcessor.processStorage(contractAddress, conseilServer, network)];
                case 1:
                    storage = _a.sent();
                    ledger = StorageProcessor.processMap(storage[0]);
                    account = ledger.get(address);
                    allowance = StorageProcessor.processElement(account, 1);
                    return [2 /*return*/, allowance];
            }
        });
    });
}
exports.viewAllowance = viewAllowance;
/**
 * Gets the token balance of a given account.
 *
 * @param {string} address - The account from which the token balance is retrieved
 * @param {string} contractAddress - The address of a Tezos Managed Ledger smart contract
 * @param {ConseilServerInfo} conseilServer - Information for querying a Conseil server
 * @param {string} network - The Tezos network on which the Tezos Managed Ledger is deployed
 * @returns {Promise<string>} The token balance of a given account
 */
function viewBalance(address, contractAddress, conseilServer, network) {
    return __awaiter(this, void 0, void 0, function () {
        var storage, ledger, account, balance;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, StorageProcessor.processStorage(contractAddress, conseilServer, network)];
                case 1:
                    storage = _a.sent();
                    ledger = StorageProcessor.processMap(storage[0]);
                    account = ledger.get(address);
                    balance = StorageProcessor.processElement(account, 0);
                    return [2 /*return*/, balance];
            }
        });
    });
}
exports.viewBalance = viewBalance;
/**
 * Gets the total supply of tokens.
 *
 * @param {string} contractAddress - The address of a Tezos Managed Ledger smart contract
 * @param {ConseilServerInfo} conseilServer - Information for querying a Conseil server
 * @param {string} network - The Tezos network on which the Tezos Managed Ledger is deployed
 * @returns {Promise<string>} The total supply of tokens
 */
function viewTotalSupply(contractAddress, conseilServer, network) {
    return __awaiter(this, void 0, void 0, function () {
        var storage;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, StorageProcessor.processStorage(contractAddress, conseilServer, network)];
                case 1:
                    storage = _a.sent();
                    return [2 /*return*/, storage[3]];
            }
        });
    });
}
exports.viewTotalSupply = viewTotalSupply;
/**
 * Gets the pause state.
 *
 * @param {string} contractAddress - The address of a Tezos Managed Ledger smart contract
 * @param {ConseilServerInfo} conseilServer - Information for querying a Conseil server
 * @param {string} network - The Tezos network on which the Tezos Managed Ledger is deployed
 * @returns {Promise<string>} The pause state
 */
function viewPaused(contractAddress, conseilServer, network) {
    return __awaiter(this, void 0, void 0, function () {
        var storage;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, StorageProcessor.processStorage(contractAddress, conseilServer, network)];
                case 1:
                    storage = _a.sent();
                    return [2 /*return*/, storage[2]];
            }
        });
    });
}
exports.viewPaused = viewPaused;
/**
 * Gets the address of the administrator.
 *
 * @param {string} contractAddress - The address of a Tezos Managed Ledger smart contract
 * @param {ConseilServerInfo} conseilServer - Information for querying a Conseil server
 * @param {string} network - The Tezos network on which the Tezos Managed Ledger is deployed
 * @returns {Promise<string>} The address of the administrator
 */
function viewAdministrator(contractAddress, conseilServer, network) {
    return __awaiter(this, void 0, void 0, function () {
        var storage;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, StorageProcessor.processStorage(contractAddress, conseilServer, network)];
                case 1:
                    storage = _a.sent();
                    return [2 /*return*/, storage[1]];
            }
        });
    });
}
exports.viewAdministrator = viewAdministrator;
