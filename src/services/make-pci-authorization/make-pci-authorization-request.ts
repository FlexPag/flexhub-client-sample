import { z } from 'zod';

export const MakePCIAuthorizationRequestSchema = z.object({
  Payment: z.object({
    Card: z.object({
      Number: z.string(),
      Holder: z.string(),
      ExpirationDate: z.string(),
      SecurityCode: z.string(),
      Brand: z.string(),
    }),

    ThreeDSecure: z.optional(
      z.object({
        UserAgent: z.string(),
        Device: z.object({
          Type: z.string(),
          JavaEnabled: z.boolean(),
          Language: z.string(),
          ColorDepth: z.number(),
          ScreenHeight: z.number(),
          ScreenWidth: z.number(),
          TimeZoneOffset: z.literal(3),
        }),
      })
    ),

    FraudAnalysis: z.object({
      TotalOrderAmount: z.number(),
      Cart: z.object({
        Items: z.array(
          z.object({
            Name: z.string(),
            Quantity: z.number(),
            Sku: z.string(),
            UnitPrice: z.number(),
            Type: z.string(),
          })
        ),
      }),

      Browser: z.object({
        CookiesAccepted: z.boolean(),
        Email: z.string(),
        IpAddress: z.string(),
        Type: z.string(),
      }),

      FingerPrint: z.object({
        Reference: z.literal('CLEARSALE'),
        SessionId: z.string(),
      }),
    }),
  }),
});

export type MakePCIAuthorizationRequest = z.input<typeof MakePCIAuthorizationRequestSchema>;
