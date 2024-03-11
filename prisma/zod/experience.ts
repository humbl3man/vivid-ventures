import * as z from "zod"
import { CompleteCartItem, RelatedCartItemModel } from "./index"

export const ExperienceModel = z.object({
  id: z.bigint(),
  createdAt: z.date(),
  updatedAt: z.date(),
  name: z.string(),
  description: z.string(),
  price: z.number().int(),
  imageUrl: z.string(),
  isAvailable: z.boolean(),
})

export interface CompleteExperience extends z.infer<typeof ExperienceModel> {
  cartItem?: CompleteCartItem | null
}

/**
 * RelatedExperienceModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedExperienceModel: z.ZodSchema<CompleteExperience> = z.lazy(() => ExperienceModel.extend({
  cartItem: RelatedCartItemModel.nullish(),
}))
