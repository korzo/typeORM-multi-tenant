import { ConfigService, registerAs } from '@nestjs/config'
import * as dotenv from 'dotenv'
import { DelayMessage } from 'src/delay-message/entities/delay-message.entity'
import { Tenant } from 'src/tenant/entities/tenant.entity'
import { readFileSync, existsSync } from 'fs'
import axios from 'axios'

dotenv.config()
const configService = new ConfigService()

export const getDatabaseSystemIds = () => {
 return String(configService.get('CUSTOMER_PREFIX')).split(',')
}

export default registerAs('orm', async () => {
 const config = {}
 getDatabaseSystemIds().forEach((systemId) => {
  console.info(`${systemId}.database.vpc.private`)
  config[systemId] = {
   type: 'postgres',
   url: process.env[systemId],
   entities: [Tenant, DelayMessage],
   synchronize: true,
   logging: 'all',
   retryAttempts: 9999,
   extra: {
    connectionTimeoutMillis: 20000,
    idleTimeoutMillis: 1500
   }
  }
 })
 return config
})
