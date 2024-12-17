import { Injectable } from '@nestjs/common';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as tesseract from 'node-tesseract-ocr'
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class InvoiceService {
  constructor(private readonly prisma: PrismaService){}

  config = {
    lang: 'eng',
    oem: 1,
    psm: 4,
  };

  async create(createInvoiceDto: CreateInvoiceDto) {
    const {ownerId, content} = createInvoiceDto;
    const buffer: Buffer = Buffer.from(content, 'base64')

    const text = await tesseract.recognize(buffer, this.config)
    return await this.prisma.invoice.create({
      data:{
        content: text,
        ownerId: ownerId,
        
      }
    })
  }

  async comment(createCommentDto: CreateCommentDto) {
    const {invoiceId, content} = createCommentDto;
    return await this.prisma.message.create({
      data: {
        content: content,
        invoiceId: +invoiceId,
        fromUser: true
      }
    })
  }

  async findComments(invoiceId:number){
    return await this.prisma.message.findMany({
      where: {
        invoiceId: +invoiceId,
      }
    })
  }

  async findAll(id: string) {
    return await this.prisma.invoice.findMany({
      where:{
        ownerId: +id
      }
    })
  }

  async findOne(id: string) {
    return await this.prisma.invoice.findUnique({
      where: {
        id: +id
      }
    })
  }

  update(id: number, updateInvoiceDto: UpdateInvoiceDto) {
    return `This action updates a #${id} invoice 2`;
  }

  remove(id: number) {
    return `This action removes a #${id} invoice 3`;
  }
}
