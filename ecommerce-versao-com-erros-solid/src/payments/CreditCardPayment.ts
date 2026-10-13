import { IPaymentMethod } from "./IPaymentMethod";
import logger from '../lib/logger';

export class CreditCardPayment implements IPaymentMethod {
  constructor(private details: { cardNumber: string; cvv: string }) {}

  async process(amount: number): Promise<void> {
    
    logger.info(`Processando cartão final ${this.details.cardNumber.slice(-4)}`);

    if (this.details.cvv === '000') {
      throw new Error('Cartão recusado');
    }

    logger.info(`Pagamento de cartão processado no valor de ${amount}`);
  }
}