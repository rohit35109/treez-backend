import { Injectable } from '@nestjs/common';
import { TransactionStatus } from './enum/transaction.status.enum';
import { TransactionPayload } from './interface/transaction.interface';

@Injectable()
export class AppService {
  getTransactions(
    searchedText: string = '',
    status: string = '',
  ): TransactionPayload[] {
    const statusFilter = status.split(',').map(i => i.toLowerCase());
    let records = this.getRandomData();

    // if searched text has values/not empty then it will execute this condition to filter data based on the searched text.
    if (searchedText !== '') {
      records = records.filter(
        (item) =>
          item.customer.includes(searchedText) ||
          item.external_id.includes(searchedText) ||
          item.gross_amount.toString().includes(searchedText) ||
          item.source.includes(searchedText) ||
          item.swifter_id.includes(searchedText),
      );
    }

    // if status has values then it will execute this condition to filter data based on the status
    if (status !== "" && statusFilter && statusFilter.length > 0) {
      records = records.filter((item) => statusFilter.includes(item.status.toLowerCase()));
    }

    return records;
  }

  /**
   * This funtion can be replaced by Database queries or typeorm.
   * Currently this functions generates 50 random data that will be used to populate in the UI
   * @returns TransactionPayload[]
   */
  getRandomData(): TransactionPayload[] {
    const data: TransactionPayload[] = [];
    const customerNames = [
      'Eren Akichi',
      'Mikasa Ackerman',
      'Armin Arlert',
      'Levi Ackerman',
      'Sasha Braus',
    ];
    const sources = ['Payments', 'E-commerce', 'In-Store'];
    const fixedDate = '2022-12-10T02:10:00+00:00';

    // Generate 50 random data
    for (let i = 0; i < 50; i++) {
      const timeIncrement = i * 100000000;
      const date = new Date(fixedDate);
      date.setSeconds(date.getSeconds() + timeIncrement / 1000);

      const randomData: TransactionPayload = {
        date: date.toISOString(),
        gross_amount: 1000 * i,
        status: Object.values(TransactionStatus)[Math.floor(i % 5)],
        customer: customerNames[Math.floor(i % 5)],
        swifter_id: `S123IU${i}`,
        external_id: `TA0Z123${i}`,
        source: sources[Math.floor(i % 3)],
      };

      data.push(randomData);
    }

    return data;
  }
}
