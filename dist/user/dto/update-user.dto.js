"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAuthDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const login_user_dto_1 = require("./login-user.dto");
class UpdateAuthDto extends (0, swagger_1.PartialType)(login_user_dto_1.LoginDto) {
}
exports.UpdateAuthDto = UpdateAuthDto;
//# sourceMappingURL=update-user.dto.js.map