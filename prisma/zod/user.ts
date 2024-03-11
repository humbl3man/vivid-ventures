import * as z from "zod"
import { Role } from "@prisma/client"
import { CompleteSession, RelatedSessionModel, CompleteCart, RelatedCartModel } from "./index"

export const UserModel = z.object({
  id: z.string(),
  name: z.string(),
  username: z.string(),
  hashed_password: z.string(),
  role: z.nativeEnum(Role),
  avatar_url: z.string().nullish(),
})

export interface CompleteUser extends z.infer<typeof UserModel> {
  sessions: CompleteSession[]
  cart?: CompleteCart | null
}

/**
 * RelatedUserModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedUserModel: z.ZodSchema<CompleteUser> = z.lazy(() => UserModel.extend({
  sessions: RelatedSessionModel.array(),
  cart: RelatedCartModel.nullish(),
}))
