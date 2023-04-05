import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { TransactionPayload } from './interface/transaction.interface';

@Controller("transaction")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getTransactions(
    @Query("search") search: string = "",
    // Use comma (,) to filter based on multiple status. eg: initiated, authorized
    @Query("status") status: string = ""
  ): TransactionPayload[] {
    return this.appService.getTransactions(search, status);
  }
}
