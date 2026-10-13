import express from 'express';
import { OrderController } from './controllers/OrderController';
import { PrismaProductRepository } from './repositories/PrismaProductRepository';
import { PrismaOrderRepository } from './repositories/PrismaOrderRepository';
import { EtherealMailProvider } from './providers/EtherealMailProvider';
import { NotificationService } from './services/NotificationService';
import { OrderService } from './services/OrderService';

const app = express();
app.use(express.json());

const productRepository = new PrismaProductRepository();       
const orderRepository = new PrismaOrderRepository();         
const mailProvider = new EtherealMailProvider();            

const notificationService = new NotificationService(mailProvider);   
const orderService = new OrderService(productRepository, orderRepository, notificationService);    

const orderController = new OrderController(orderService);           

app.post('/orders', orderController.processOrder);

export default app;