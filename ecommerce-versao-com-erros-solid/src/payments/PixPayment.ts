import { IPaymentMethod } from "./IPaymentMethod";
import logger from '../lib/logger';

export class PixPayment implements IPaymentMethod {
  constructor(private details?: { key: string }) {}

  async process(amount: number): Promise<void> {
    logger.info(`Processando Pix no valor de ${amount}`);
  }
}