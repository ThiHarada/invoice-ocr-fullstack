import { IsNumber, IsString } from "class-validator";

export class CreateInvoiceDto {
    @IsString()
    content: string;

    @IsNumber()
    ownerId: number;
}
