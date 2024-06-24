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
var AuthService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../user/user.service");
const jwt_1 = require("@nestjs/jwt");
const rxjs_1 = require("rxjs");
const config_1 = require("@nestjs/config");
let AuthService = AuthService_1 = class AuthService {
    constructor(userService, jwtService, confiigService) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.confiigService = confiigService;
        this.logger = new common_1.Logger(AuthService_1.name);
    }
    async validateUser(loginDto) {
        return this.userService.signIn(loginDto);
    }
    async signIn(loginDto) {
        const payload = { username: loginDto.username, env: this.confiigService.get('ENV') };
        return this.userService.signIn(loginDto).pipe((0, rxjs_1.map)((resp) => {
            if (resp.statusCode == 200) {
                return {
                    token: this.jwtService.sign(payload)
                };
            }
            return resp;
        }));
    }
};
AuthService = AuthService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService, jwt_1.JwtService, config_1.ConfigService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map