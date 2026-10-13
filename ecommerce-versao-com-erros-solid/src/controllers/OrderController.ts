import { Request, Response } from 'express';
import { OrderService } from '../services/OrderService';
import { PaymentMethodFactory } from '../payments/PaymentMethodFactory';
import { AppError } from '../errors/AppError';
import logger from '../lib/logger';

export class OrderController {
  constructor(private orderService: OrderService) {}

  processOrder = async (req: Request, res: Response) => {
    try {
      const { customer, items, paymentMethod, paymentDetails } = req.body;

      const payment = PaymentMethodFactory.create(paymentMethod, paymentDetails);

      const result = await this.orderService.execute({
        customer,
        items,
        paymentMethod: payment,
      });

      return res.json({
        message: 'Pedido processado com sucesso',
        orderId: result.orderId,
        emailPreview: result.emailPreview,
      });

    } catch (error: any) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ error: error.message });
      }

      logger.error(`Erro ao processar pedido: ${error.message}`);
      return res.status(500).json({ error: 'Erro interno' });
    }
  };
}