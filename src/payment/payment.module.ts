import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { PurchaseService } from 'src/purchase/purchase.service';
import { PaymentEntity } from './entities/payment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [PaymentController],
  providers: [PaymentService],
  imports:[TypeOrmModule.forFeature([ PaymentEntity ])],
  exports:[PaymentService],

})
export class PaymentModule {}
