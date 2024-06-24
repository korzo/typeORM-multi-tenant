"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var UserService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const config_1 = require("@nestjs/config");
const rxjs_1 = require("rxjs");
let UserService = UserService_1 = class UserService {
    constructor(httpService, configService) {
        this.httpService = httpService;
        this.configService = configService;
        this.logger = new common_1.Logger(UserService_1.name);
    }
    signIn(login) {
        const uri = `https://${login.tenant}.nextgen.${this.configService.get('ENV')}.mdoc.app/api/users/_login`;
        this.logger.debug(`uri: ${uri}`);
        const cfg = {
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-Requested-With': 'ms-mirth'
            },
            params: {
                username: login.username,
                password: login.password
            }
        };
        try {
            return this.httpService.post(uri, {}, cfg).pipe((0, rxjs_1.catchError)((error) => {
                if (error.code === 'ECONNREFUSED') {
                    this.logger.error(`Login failure with the username: ${login.username} in the env: ${uri}. Error: ${error}`);
                    throw new common_1.HttpException({
                        statusCode: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
                        message: `Failure on connection with the adress: ${uri}. Please check if this address is available and connecting.`,
                        error: 'Unprocessable Entity',
                        trace: error.message || null
                    }, common_1.HttpStatus.UNPROCESSABLE_ENTITY);
                }
                if (error.code === 'ECONNABORTED') {
                    this.logger.error(`Login failure with the username: ${login.username} in the env: ${uri}. Error: ${error}, ${error.code}`);
                    throw new common_1.HttpException({
                        statusCode: common_1.HttpStatus.REQUEST_TIMEOUT,
                        message: `Failure on connection with the adress: ${uri}. Please check if this address is available and connecting.`,
                        error: 'Request Timeout',
                        trace: error.message || null
                    }, common_1.HttpStatus.REQUEST_TIMEOUT);
                }
                if (error.code === 'ERR_INVALID_URL') {
                    this.logger.error(`Login failure with the username: ${login.username} in the env: ${uri}. Error: ${error}, ${error.code}`);
                    throw new common_1.HttpException({
                        statusCode: common_1.HttpStatus.BAD_REQUEST,
                        message: `Invalid URL! Please check e retry again. Your url inputed on login: ${uri}.`,
                        error: 'Bad Request',
                        trace: error.message || null
                    }, common_1.HttpStatus.BAD_REQUEST);
                }
                if (error.code === 'ENOTFOUND') {
                    this.logger.error(`Login failure with the username: ${login.username} in the env: ${uri}. Error: ${error}, ${error.code}`);
                    throw new common_1.HttpException({
                        statusCode: common_1.HttpStatus.NOT_FOUND,
                        message: `Please check your request for the environment: ${uri}.`,
                        error: 'Not Found',
                        trace: error.message || null
                    }, common_1.HttpStatus.NOT_FOUND);
                }
                if (error.code === 'ERR_BAD_REQUEST') {
                    this.logger.error(`Login failure with the username: ${login.username} in the env: ${uri}. Error: ${error}, ${error.code}`);
                    throw new common_1.HttpException({
                        statusCode: common_1.HttpStatus.UNAUTHORIZED,
                        message: 'Incorrect username or password',
                        error: 'Unauthorized',
                        trace: error.message
                    }, common_1.HttpStatus.UNAUTHORIZED);
                }
                this.logger.error(`Login failure with the username: ${login.username} in the env: ${uri}. Error: ${error}, ${error.code}`);
                throw new common_1.HttpException({
                    statusCode: common_1.HttpStatus.BAD_REQUEST,
                    message: 'Error Unknown. Please contact the support team for more details',
                    error: 'Error Unknown',
                    trace: error.code
                }, common_1.HttpStatus.BAD_REQUEST);
            }), (0, rxjs_1.map)((resp) => {
                this.logger.log(`Login successfully with the username: ${login.username} in the env: ${uri}`);
                return {
                    statusCode: resp.status,
                    text: 'Login Successfully'
                };
            }));
        }
        catch (error) {
            this.logger.error(`Login failure with the username: ${login.username} in the env: ${uri}.
    ${error}`);
            throw new common_1.HttpException(error.message || 'Internal Error', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    findAll() {
        return `This action returns all auth`;
    }
};
UserService = UserService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService, config_1.ConfigService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map