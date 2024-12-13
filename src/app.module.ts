import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { SuppliersModule } from './suppliers/suppliers.module';
import { UsersModule } from './users/users.module';
import { DataSourceConfig } from './common/config/data.source';
import { StocksModule } from './stocks/stocks.module';
import { WarehousesModule } from './warehouses/warehouses.module';
import { AuthModule } from './auth/auth.module';
import { CustomersModule } from './customers/customers.module';
import { PurchasesModule } from './purchases/purchases.module';
import { PaymentMethodsModule } from './payment-methods/payment-methods.module';
import { ShipperModule } from './shipper/shipper.module';
import { EmployeeModule } from './employee/employee.module';
import { OrderModule } from './order/order.module';
import { OrderDetailModule } from './order-detail/order-detail.module';
import { OrderDetailsModule } from './order-details/order-details.module';

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
    UsersModule, StocksModule, WarehousesModule, AuthModule, CustomersModule, PurchasesModule, PaymentMethodsModule, ShipperModule, EmployeeModule, OrderModule, OrderDetailModule, OrderDetailsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}