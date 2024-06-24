import { Test, TestingModule } from '@nestjs/testing'
import { DelayMessageService } from './delay-message.service'

describe('DelayMessageService', () => {
 let service: DelayMessageService

 beforeEach(async () => {
  const module: TestingModule = await Test.createTestingModule({
   providers: [DelayMessageService]
  }).compile()

  service = module.get<DelayMessageService>(DelayMessageService)
 })

 it('should be defined', () => {
  expect(service).toBeDefined()
 })
})
