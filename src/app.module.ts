import { Module } from '@nestjs/common';

import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { SuppliersModule } from './suppliers/suppliers.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceConfig } from './common/config/data.source';
import { WarehousesModule } from './warehouses/warehouses.module';
import { StocksModule } from './stocks/stocks.module';
import { AuthModule } from './auth/auth.module';
import { PurchaseModule } from './purchase/purchase.module';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [ 
    ConfigModule.forRoot({
      envFilePath: `.env.development`,
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(DataSourceConfig),
    ProductsModule, 
    CategoriesModule, 
    SuppliersModule, 
    UsersModule,
     WarehousesModule,
      StocksModule,
            AuthModule,
            PurchaseModule,
            PaymentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}