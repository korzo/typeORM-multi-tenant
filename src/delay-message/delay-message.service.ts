import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common'
import { CreateDelayMessageDto } from './dto/create-delay-message.dto'
import { UpdateDelayMessageDto } from './dto/update-delay-message.dto'
import { DelayMessage } from './entities/delay-message.entity'
import { EntityManager } from 'typeorm'
import { ModuleRef } from '@nestjs/core'
import { getEntityManagerToken } from '@nestjs/typeorm'

@Injectable()
export class DelayMessageService {
 constructor(private moduleRef: ModuleRef) {}

 private async loadEntityManager(tenant: string): Promise<EntityManager> {
  try {
   return this.moduleRef.get(getEntityManagerToken(tenant), {
    strict: false
   })
  } catch (error) {
   throw new BadRequestException(`The tenant ${tenant} not found`)
  }
 }

 async findAll(tenant: string): Promise<DelayMessage[]> {
  const entityManager = await this.loadEntityManager(tenant)

  if (!entityManager) {
   throw new NotFoundException('Tenant not found')
  }

  return entityManager.find(DelayMessage, { take: 1000 })
 }

 create(createDelayMessageDto: CreateDelayMessageDto) {
  return 'This action adds a new delayMessage'
 }

 findOne(id: number) {
  return `This action returns a #${id} delayMessage`
 }

 update(id: number, updateDelayMessageDto: UpdateDelayMessageDto) {
  return `This action updates a #${id} delayMessage`
 }

 remove(id: number) {
  return `This action removes a #${id} delayMessage`
 }
}
