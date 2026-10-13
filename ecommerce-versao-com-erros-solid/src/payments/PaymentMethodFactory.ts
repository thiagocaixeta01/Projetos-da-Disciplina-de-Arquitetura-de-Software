import { IPaymentMethod } from "./IPaymentMethod";
import { CreditCardPayment } from "./CreditCardPayment";
import { DebitCardPayment } from "./DebitCardPayment";
import { PixPayment } from "./PixPayment";
import { AppError } from "../errors/AppError";

export class PaymentMethodFactory {
  private static methods: Record<string, (details: any) => IPaymentMethod> = {

    credit_card: (details) => new CreditCardPayment(details),
    debit_card: (details) => new DebitCardPayment(),
    pix: (details) => new PixPayment(details)
  };

  static create(method: string, details: any): IPaymentMethod {
    
    const builder = PaymentMethodFactory.methods[method];
    if (builder === undefined) {
        throw new AppError(`Método de pagamento não suportado`)
    }
    return builder(details);
  }
}