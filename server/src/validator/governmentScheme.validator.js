import { z } from "zod"

export const createSchemeSchema = z.object({
  body: z.object({
    title: z.string().min(3, "Title is required"),

    description: z.string().min(10, "Description is required"),

    benefits: z.string().min(5, "Benefits are required"),

    eligibility: z.object({
      cropTypes: z.array(z.string()).optional(),

      landSizeMin: z.number().min(0).optional(),
      landSizeMax: z.number().min(0).optional(),

      states: z.array(z.string()).optional(),

      farmerCategory: z.enum([
        "small",
        "marginal",
        "large",
        "all"
      ]).optional()
    }),

    documentsRequired: z.array(z.string()).optional(),

    validFrom: z.coerce.date().optional(),
    validTill: z.coerce.date().optional(),

    isActive: z.boolean().optional()
  })
})

export const updateSchemeSchema = z.object({
  params: z.object({
    id: z.string().length(24, "Invalid scheme id")
  }),

  body: z.object({
    title: z.string().min(3).optional(),
    description: z.string().min(10).optional(),
    benefits: z.string().min(5).optional(),

    eligibility: z.object({
      cropTypes: z.array(z.string()).optional(),
      landSizeMin: z.number().min(0).optional(),
      landSizeMax: z.number().min(0).optional(),
      states: z.array(z.string()).optional(),
      farmerCategory: z.enum([
        "small",
        "marginal",
        "large",
        "all"
      ]).optional()
    }).optional(),

    documentsRequired: z.array(z.string()).optional(),

    validFrom: z.coerce.date().optional(),
    validTill: z.coerce.date().optional(),

    isActive: z.boolean().optional()
  })
})

export const getAllSchemesAdminSchema = z.object({
  query: z.object({
    page: z.coerce.number().min(1).optional(),
    limit: z.coerce.number().min(1).max(100).optional(),

    isActive: z.enum(["true", "false"]).optional(),

    state: z.string().optional(),
    crop: z.string().optional()
  })
})

export const toggleSchemeSchema = z.object({
  params: z.object({
    id: z.string().length(24, "Invalid scheme id")
  })
})


export const getSchemesForFarmerSchema = z.object({
  query: z.object({
    farmLandId: z.string().length(24, "Invalid farmland id")
  })
})


export const getAllSchemeFarmerSchema = z.object({
  query: z.object({
    page: z.coerce.number().min(1).optional(),
    limit: z.coerce.number().min(1).max(100).optional(),
    state: z.string().optional(),
    search: z.string().optional()
  })
})

export const getSingleSchemeValidator = z.object({
  params: z.object({
    schemeId: z.string().length(24, "Invalid scheme id")
  })
})