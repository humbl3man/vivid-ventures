import * as z from "zod"
import { CompleteCart, RelatedCartModel, CompleteExperience, RelatedExperienceModel } from "./index"

export const CartItemModel = z.object({
  id: z.bigint(),
  quantity: z.number().int(),
  cartId: z.bigint(),
  experienceId: z.bigint(),
})

export interface CompleteCartItem extends z.infer<typeof CartItemModel> {
  Cart: CompleteCart
  experience: CompleteExperience
}

/**
 * RelatedCartItemModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedCartItemModel: z.ZodSchema<CompleteCartItem> = z.lazy(() => CartItemModel.extend({
  Cart: RelatedCartModel,
  experience: RelatedExperienceModel,
}))
