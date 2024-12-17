import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('invoice')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Post("register")
  create(@Body() createInvoiceDto: CreateInvoiceDto) {
    return this.invoiceService.create(createInvoiceDto);
  }

  @Post("comment")
  comment(@Body() createCommentDto: CreateCommentDto) {
    return this.invoiceService.comment(createCommentDto);
  }

  @Get(":id")
  findAll(@Param('id') id:string) {
    return this.invoiceService.findAll(id);
  }

  @Get("findone/:id")
  findOne(@Param('id') id:string) {
    return this.invoiceService.findOne(id)
  }

  @Get("findcomments/:id")
  findComments(@Param('id') id:number){
    return this.invoiceService.findComments(id)
  }


}
