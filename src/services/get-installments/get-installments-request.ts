import z from 'zod';

import { DocumentSchema } from 'app/schemas';
import { formatDate } from 'app/utils';

export const GetInstallmentsRequestSchema = z.object({
  is_authenticated: z.literal(true),
  client: z.object({
    name: z.string(),
    ni: DocumentSchema,
    document_type: z.enum(['CPF', 'CNPJ']),
    email: z.string().email().optional(),
    phone: z.string().optional(),
    address: z.object({
      complement: z.string().optional(),
      street: z.string(),
      zipCode: z.string(),
      number: z.string(),
      city: z.string(),
      state: z.string(),
      district: z.string(),
    }),
  }),
  order: z.object({
    id: z.string(),
    amount: z.number(),
    account: z.array(
      z.object({
        uc: z.string(),
        invoices: z.array(
          z.object({
            invoice_id: z.string(),
            due_date: z.date().transform((d) => formatDate(d, 'dd/mm/yyyy')),
            barcode_one: z.string().optional(),
            barcode_two: z.string().optional(),
            amount: z.number(),
          })
        ),
      })
    ),
  }),
});

export type GetInstallmentsRequest = z.infer<typeof GetInstallmentsRequestSchema>;

/*
{
   "is_authenticated":true,
   "payment_module":16,
   "client":{
      "name":"Gabriel David Candez Rocha",
      "ni":"11814122770",
      "email":"gabrielcandez@gmail.com",
      "document_type":"CPF",
      "phone":"21976084346",
      "address":{
         "complement":"casa 2",
         "street":"Estrada do Rio Grande",
         "zipCode":"22720010",
         "number":"1961",
         "city":"Rio de Janeiro",
         "state":"RJ",
         "district":"Taquara"
      }
   },
   "order":{
      "id":"0847db35-1064-497a-a97f-418b3a90d7c8",
      "amount":157.25,
      "account":[
         {
            "uc":"1551",
            "invoices":[
               {
                  "invoice_id":"117624845",
                  "due_date":"18/08/2022",
                  "barcode_one":"836200000013572500052822910001551225000000000000",
                  "barcode_two":"836200000013572500052822910001551225000000000000",
                  "amount":157.25
               }
            ]
         }
      ]
   }
}
*/
